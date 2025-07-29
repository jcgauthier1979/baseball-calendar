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

export const COLOR_LONGUEALLEE: string ="#0066cc";
export const COLOR_THIBAULT: string = "#339933";
export const COLOR_PERKINS: string = "#9900ff";
export const COLOR_PERKINSCAGE: string = "#cc3300";

export const CLASS_NAME_GAME: string ="event-game";
export const CLASS_NAME_PRACTICE: string ="event-practice";
export const CLASS_NAME_TIMESLOT: string ="event-timeslot";

export const VENUE_LONGUEALLEE: string = "Parc Longue-Allée - Terrain Longue-Allée";
export const VENUE_THIBAULT: string = "Parc Thibault - Terrain Thibault";
export const VENUE_PERKINS: string = "Parc J. A. Perkins - Terrain J. A. Perkins";
export const VENUE_PERKINSCAGE: string = "Parc J. A. Perkins - Cage";

export const VENUE_CLASS = new Map<string, string>(
    [
      [VENUE_LONGUEALLEE, "venue-blue"],
      [VENUE_THIBAULT, "venue-green"],
      [VENUE_PERKINS, "venue-purple"],
      [VENUE_PERKINSCAGE, "venue-red"],
      ["", "venue-default"],
    ]
  );

  export const VENUE_COLORS = new Map<string, string>(
    [
      [VENUE_LONGUEALLEE, COLOR_LONGUEALLEE],
      [VENUE_THIBAULT, COLOR_THIBAULT],
      [VENUE_PERKINS, COLOR_PERKINS],
      [VENUE_PERKINSCAGE, COLOR_PERKINSCAGE],
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