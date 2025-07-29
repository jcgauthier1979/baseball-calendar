//import type { ComponentType } from "react";
//import type { DateHeaderProps } from "react-big-calendar";
import * as Consts from "../utils/consts";
import type { DateLocalizer } from "react-big-calendar";

export interface CustomAgendaDateProps {
  day: Date;
  label: string;
  localizer: DateLocalizer;
}

export const CustomAgendaDate: React.FC<CustomAgendaDateProps> = ({ day }) => {
  const dayNumber = Consts.localizer.format(day, 'd');
  const dayName = Consts.DAY_NAMES_SHORT[day.getDay()];
  const monthName = Consts.localizer.format(day, 'MMM', Consts.defaultLocale);
  return (
    <>
        <div className="agenda-day-name">
            {dayName}
        </div>
        <div className="agenda-day-number">
            {dayNumber}
        </div>
        <div className="agenda-month-name">
            {monthName}
        </div>
    </>
  );
};