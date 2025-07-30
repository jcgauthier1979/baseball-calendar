// Constants
import { dateFnsLocalizer } from "react-big-calendar";
import frCA from "date-fns/locale/fr-CA";
import { parse, startOfWeek, getDay, format } from "date-fns";

export const GAME_EVENT_TYPE : string = "game";
export const PRACTICE_EVENT_TYPE : string = "practice";
export const TIMESLOT_EVENT_TYPE : string = "timeslot";
export const APP_PATH : string = import.meta.env.VITE_APP_PATH;

export const COLOR_GAME: string ="#fefefe";
export const COLOR_PRACTICE: string ="#e6f2ff";
export const COLOR_TIMESLOT: string ="#fff2cc";

export const CLASS_NAME_GAME: string ="event-game";
export const CLASS_NAME_PRACTICE: string ="event-practice";
export const CLASS_NAME_TIMESLOT: string ="event-timeslot";

export const COLOR_RUSSELMARTIN: string ="#0066cc";
export const VENUE_RUSSELMARTIN: string = "Parc Russell Martin - Terrain Russell Martin";

export const VENUE_CLASS = new Map<string, string>(
    [
      [VENUE_RUSSELMARTIN, "venue-blue"],
      ["", "venue-default"],
    ]
  );

  export const VENUE_COLORS = new Map<string, string>(
    [
      [VENUE_RUSSELMARTIN, COLOR_RUSSELMARTIN],
      ["", "#000"],
    ]
  );

export const CALENDAR_MESSAGES = {
  previous: 'Précédant',
  next: 'Suivant',
  today: 'Aujourd\'hui',
  month: 'Mois',
  week: 'Semaine',
  day: 'Jour',
  agenda: 'Agenda',
  noEventsInRange: 'Aucun évènement pour ce mois.'
};

export const DAY_NAMES_SHORT = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export const defaultLocale = "fr-CA";

export const locales = {
  "fr-CA": frCA
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales
});