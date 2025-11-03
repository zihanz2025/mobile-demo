import { useState } from "react";
import { AlertEventList, AlertEvent } from "./AlertEventList";
import { AlertEventDetail } from "./AlertEventDetail";

export function AlertTab() {
  const [selectedEvent, setSelectedEvent] =
    useState<AlertEvent | null>(null);

  if (selectedEvent) {
    return (
      <div className="space-y-6">
        <AlertEventDetail
          event={selectedEvent}
          onBack={() => setSelectedEvent(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AlertEventList onEventClick={setSelectedEvent} />
    </div>
  );
}