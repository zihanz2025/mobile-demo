import { useEffect, useRef, useState, useMemo } from "react";
import { MapPin, X, Filter, RefreshCcw } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";

declare global {
  interface Window {
    AMap: any;
  }
}

export interface MapLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type?: string; // e.g. "I类", "II类"...
  region?: string;
  details?: Record<string, string | number>;
}

interface InteractiveMapAmapProps {
  locations: MapLocation[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  showLegend?: boolean;
  typeColors: Record<string, string>;
}

export function InteractiveMapAmap({
  locations,
  center,
  zoom = 10,
  height = "600px",
  showLegend = true,
  typeColors,
}: InteractiveMapAmapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<MapLocation | null>(null);
  const [legendExpanded, setLegendExpanded] = useState(true);
  const [regionFilters, setRegionFilters] = useState<
    Set<string>
  >(new Set(["东线", "中线"]));
  const allRegions = ["东线", "中线"]; // predefined list

  // Unique types
  // ✅ Order types by typeColors key order
  const uniqueTypes = useMemo(() => {
    const present = new Set(
      locations.map((l) => l.type).filter(Boolean) as string[],
    );
    const ordered = Object.keys(typeColors).filter((t) =>
      present.has(t),
    );
    const extras = Array.from(present).filter(
      (t) => !ordered.includes(t),
    );
    return [...ordered, ...extras];
  }, [locations, typeColors]);

  const [typeFilters, setTypeFilters] = useState<
    Set<string | undefined>
  >(new Set());

  useEffect(() => {
    if (uniqueTypes.length > 0) {
      setTypeFilters(new Set(uniqueTypes)); // ✅ default all selected
    }
  }, [uniqueTypes]);
  useEffect(() => {
    if (map && markers.length > 0) {
      map.setFitView(markers); // ✅ keep full view on mount / data load
    }
  }, [map, markers]);

  const filteredLocations = useMemo(() => {
    return locations.filter(
      (loc) =>
        (!loc.type || typeFilters.has(loc.type)) &&
        (!loc.region || regionFilters.has(loc.region)),
    );
  }, [locations, typeFilters, regionFilters]);

  // === Initialize map ===
  useEffect(() => {
    if (!mapRef.current) return;

    const loadMap = () => {
      const AMap = window.AMap;
      if (!AMap) return;

      const mapInstance = new AMap.Map(mapRef.current, {
        zoom,
        zooms: [4, 18],
        center: center || [
          locations[0]?.lng || 116.4,
          locations[0]?.lat || 39.9,
        ],
      });

      const newMarkers = renderMarkers(
        mapInstance,
        filteredLocations,
      );
      mapInstance.setFitView(newMarkers);

      setMap(mapInstance);
      setMarkers(newMarkers);
    };

    if (!window.AMap) {
      const script = document.createElement("script");
      script.src =
        "https://webapi.amap.com/maps?v=2.0&key=96b2b538108e34ae892db24274b11abf&plugin=AMap.Marker";
      script.async = true;
      script.onload = loadMap;
      document.body.appendChild(script);
    } else {
      loadMap();
    }

    return () => {
      if (map && map.destroy) map.destroy();
    };
  }, [locations]);

  // === Render markers ===
  const renderMarkers = (
    mapInstance: any,
    locs: MapLocation[],
  ) => {
    const AMap = window.AMap;
    if (!AMap) return [];

    const hasPixel = typeof AMap.Pixel === "function";

    const newMarkers = locs
      .filter(
        (loc) =>
          typeof loc.lat === "number" &&
          typeof loc.lng === "number" &&
          !isNaN(loc.lat) &&
          !isNaN(loc.lng),
      )
      .map((loc) => {
        const color =
          typeColors[loc.type || "未知"] || "#3b82f6";

        // 🧤 Safe fallback if Pixel is not ready
        const offset = hasPixel
          ? new AMap.Pixel(-10, -10)
          : [0, 0];

        const marker = new AMap.Marker({
          position: [loc.lng, loc.lat],
          title: loc.name,
          offset,
          content: `<div style="
            background:${color};
            width:14px;
            height:14px;
            border-radius:50%;
            border:2px solid white;
            box-shadow:0 0 4px rgba(0,0,0,0.3);
          "></div>`,
        });

        marker.on("click", () => setSelectedLocation(loc));
        mapInstance.add(marker);
        return marker;
      });

    return newMarkers;
  };

  // === Update markers when filters change ===
  useEffect(() => {
    if (!map) return;
    markers.forEach((m) => m.setMap(null));

    const newMarkers = renderMarkers(map, filteredLocations);
    setMarkers(newMarkers);
  }, [filteredLocations, map]);

  // === Toggle type filter ===
  const toggleTypeFilter = (type?: string) => {
    if (!type) return;
    const newFilters = new Set(typeFilters);
    newFilters.has(type)
      ? newFilters.delete(type)
      : newFilters.add(type);
    setTypeFilters(newFilters);
  };
  // === Toggle region filter ===
  const toggleRegionFilter = (region?: string) => {
    if (!region) return;
    const newFilters2 = new Set(regionFilters);
    newFilters2.has(region)
      ? newFilters2.delete(region)
      : newFilters2.add(region);
    setRegionFilters(newFilters2);
  };

  // === Turn all filters on/off ===
  const toggleAllFilters = (selectAll: boolean) => {
    if (selectAll) {
      setTypeFilters(new Set(uniqueTypes));
    } else {
      setTypeFilters(new Set());
    }
  };

  // === Reset map view ===
  const resetView = () => {
    if (map && markers.length > 0) {
      map.setFitView(markers);
    }
  };

  /* useEffect(() => {
  if (!map || !window.AMap) return;

  // WMS base URL with credentials
  const wmsBaseUrl =
  "http://admin:beik@1q2w3e@dev.beiktech.com:8605/geoserver/tif/wms";


  const layers = [
    {
      name:"东线一期工程受水区" ,
      layer:"tif:jtsz_dxyqgcssq",
    },
    {
      name:"中线线一期工程受水区" ,
      layer:"tif:jtsz_zxyqgcssq",
    },
    {
      name: "中线一期工程输水路线",
      layer: "tif:jtsz_zxyqgcsslx",
    },
    {
      name: "东线一期工程输水路线",
      layer: "tif:jtsz_dxyqgcsslx",
    }
  ];

  layers.forEach(({ name, layer }) => {
    const wmsLayer = new window.AMap.TileLayer.WMS({
      url: wmsBaseUrl,
      blend: false,
      params: {
        LAYERS: layer,
        SRS: "EPSG:4326",
        FORMAT: "image/png",
        TILED: true,
        transparent: true,
      },
      tileSize: 256,
      zIndex: 100,
    });

    wmsLayer.setMap(map);
  });
}, [map]);
 */

  return (
    <div className="relative w-full">
      {/* Map */}
      <div
        ref={mapRef}
        style={{
          height,
          width: "100%",
          borderRadius: "0.75rem",
        }}
        className="overflow-hidden"
      ></div>

      {/* === Legend === */}
      {showLegend && uniqueTypes.length > 0 && (
        <div className="absolute top-3 left-3 bg-white/95 rounded-lg shadow-lg pointer-events-auto max-w-[220px] z-[999]">
          <div className="flex items-center justify-between p-2 border-b">
            <button
              onClick={() => setLegendExpanded(!legendExpanded)}
              className="text-gray-500 hover:text-gray-700"
            >
              {legendExpanded ? (
                <X className="w-3.5 h-3.5" />
              ) : (
                <Filter className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {legendExpanded && (
            <div className="p-2 space-y-2 max-h-[300px] overflow-y-auto">
              {/* Reset view button */}
              <Button
                onClick={resetView}
                variant="outline"
                size="sm"
                className="h-6 px-2 text-xs"
              >
                重置视图
              </Button>

              {/* Region Filters */}
              {allRegions.map((region) => (
                <label
                  key={region}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={regionFilters.has(region)}
                    onCheckedChange={() =>
                      toggleRegionFilter(region)
                    }
                    className="h-3.5 w-3.5 data-[state=checked]:bg-gray-500 data-[state=checked]:border-gray-500 data-[state=checked]:text-black"
                  />
                  <span className="text-xs text-gray-700">
                    {region}
                  </span>
                </label>
              ))}
              <hr />
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={
                    typeFilters.size === uniqueTypes.length
                  }
                  indeterminate={
                    typeFilters.size > 0 &&
                    typeFilters.size < uniqueTypes.length
                  }
                  onCheckedChange={(checked:boolean) => {
                    if (checked) {
                      setTypeFilters(new Set(uniqueTypes));
                    } else {
                      setTypeFilters(new Set());
                    }
                  }}
                  className="h-3.5 w-3.5 data-[state=checked]:bg-gray-500 data-[state=checked]:border-gray-500 data-[state=checked]:text-black"
                />
                <span className="text-xs font-medium text-gray-700">
                  全选
                </span>
              </label>

              {/* Type filters */}
              {uniqueTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={typeFilters.has(type)}
                    onCheckedChange={() =>
                      toggleTypeFilter(type)
                    }
                    className="h-3.5 w-3.5 data-[state=checked]:bg-gray-500 data-[state=checked]:border-gray-500 data-[state=checked]:text-black"
                  />
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        background:
                          typeColors[type || "未知"] ||
                          "#3b82f6",
                      }}
                    />
                    <span className="text-xs text-gray-700">
                      {type}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* === Popup Details === */}
      {selectedLocation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
          <Card className="p-3 relative animate-in zoom-in-95 max-w-sm w-full pointer-events-auto shadow-2xl">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={() => setSelectedLocation(null)}
            >
              <X className="w-4 h-4" />
            </Button>

            <div className="pr-8">
              <div className="flex items-start gap-2.5 mb-2.5">
                <div
                  className="text-white rounded-full p-1.5 flex-shrink-0"
                  style={{
                    background:
                      typeColors[
                        selectedLocation.type || "未知"
                      ] || "#3b82f6",
                  }}
                >
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium mb-1 text-sm">
                    {selectedLocation.name}
                  </h4>
                  {selectedLocation.type && (
                    <Badge
                      variant="outline"
                      className="text-xs px-1.5 py-0.5"
                    >
                      {selectedLocation.type}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                {selectedLocation.details &&
                  Object.entries(selectedLocation.details).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between gap-2"
                      >
                        <span className="text-gray-600">
                          {key}:
                        </span>
                        <span>{value}</span>
                      </div>
                    ),
                  )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}