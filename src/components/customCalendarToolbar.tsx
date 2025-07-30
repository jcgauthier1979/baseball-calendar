// This component is not used but is kept as a example.
import { type ComponentType } from "react";
import type { ToolbarProps, View } from 'react-big-calendar';
import type { CalendarEvent } from "../utils/types";

export const CustomCalendarToolbar: ComponentType<ToolbarProps<CalendarEvent, object>> | undefined = ({ label, onNavigate, onView, views, view }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
      <div className="space-x-2">
        <button onClick={() => onNavigate('PREV')}>← Prev</button>
        <span className="font-bold">{label}</span>
        <button onClick={() => onNavigate('NEXT')}>Next →</button>
      </div>

      <div className="space-x-1">
        {Object.keys(views).map((key) => (
          <button
            key={key}
            onClick={() => onView(key as View)}
            className={view === key ? 'font-bold underline' : ''}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};
