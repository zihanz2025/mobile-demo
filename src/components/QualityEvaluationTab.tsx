import { useState } from "react";
import { TrendAnalysisCard } from "./TrendAnalysisCard"; // Import first card
import { MultiStationAnalysisCard } from "./MultiStationAnalysisCard"; // Import second card

export function QualityEvaluationTab() {
  const [parameter, setParameter] = useState("waterTemp");
  const [parameter2, setParameter2] = useState("permanganate");
  const [indicator, setIndicator] = useState("chlorophyll");
  const [period, setPeriod] = useState("week");
  const [site, setSite] = useState("taocha");
  const [section, setSection] = useState("zhongxian");

  return (
    <div className="space-y-6">
      {/* Render first card */}
      <TrendAnalysisCard
        parameter={parameter}
        setParameter={setParameter}
        indicator={indicator}
        setIndicator={setIndicator}
        period={period}
        setPeriod={setPeriod}
        site={site}
        setSite={setSite}
      />

      {/* Render second card */}
      <MultiStationAnalysisCard
        parameter={parameter2}
        setParameter={setParameter2}
        period={period}
        setPeriod={setPeriod}
        section={section}
        setSection={setSection}
      />
    </div>
  );
}
