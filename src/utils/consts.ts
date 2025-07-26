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

export const COLOR_ALLEN: string ="#0066cc";
export const COLOR_AYDELU: string = "#339933";
export const COLOR_AYDELU_CAGE: string = "#ffc107";
export const COLOR_MOUSSETTE: string = "#9900ff";
export const COLOR_BOSCO: string = "#cc3300";

export const CLASS_NAME_GAME: string ="event-game";
export const CLASS_NAME_PRACTICE: string ="event-practice";
export const CLASS_NAME_TIMESLOT: string ="event-timeslot";

export const VENUE_ALLEN: string = "Parc Allen - Allen";
export const VENUE_AYDELU: string = "Parc Aydelu - Terrain Baseball";
export const VENUE_AYDELU_CAGE: string = "Parc Aydelu - Cage frappeurs";
export const VENUE_MOUSSETTE: string = "Parc Moussette";
export const VENUE_BOSCO: string = "Parc St-Jean-De-Bosco - Parc St-Jean-Bosco";

export const VENUE_ALLEN_TIMESLOT: string = VENUE_ALLEN + TIMESLOT_EVENT_TYPE;
export const VENUE_AYDELU_TIMESLOT: string = VENUE_AYDELU + TIMESLOT_EVENT_TYPE;
export const VENUE_AYDELU_CAGE_TIMESLOT: string = VENUE_AYDELU_CAGE + TIMESLOT_EVENT_TYPE;
export const VENUE_MOUSSETTE_TIMESLOT: string = VENUE_MOUSSETTE + TIMESLOT_EVENT_TYPE;
export const VENUE_BOSCO_TIMESLOT: string = VENUE_BOSCO + TIMESLOT_EVENT_TYPE;

export const VENUE_CLASS = new Map<string, string>(
    [
      [VENUE_ALLEN, "venue-blue"],
      [VENUE_AYDELU, "venue-green"],
      [VENUE_MOUSSETTE, "venue-purple"],
      [VENUE_BOSCO, "venue-red"],
      [VENUE_AYDELU_CAGE, "venue-yellow"],
      [VENUE_ALLEN_TIMESLOT, "venue-blue"],
      [VENUE_AYDELU_TIMESLOT, "venue-green"],
      [VENUE_MOUSSETTE_TIMESLOT, "venue-purple"],
      [VENUE_BOSCO_TIMESLOT, "venue-red"],
      [VENUE_AYDELU_CAGE_TIMESLOT, "venue-yellow"],
      ["", "venue-default"],
    ]
  );

  export const VENUE_COLORS = new Map<string, string>(
    [
      [VENUE_ALLEN, COLOR_ALLEN],
      [VENUE_AYDELU, COLOR_AYDELU],
      [VENUE_AYDELU_CAGE, COLOR_AYDELU_CAGE],
      [VENUE_MOUSSETTE, COLOR_MOUSSETTE],
      [VENUE_BOSCO, COLOR_BOSCO],
      [VENUE_ALLEN_TIMESLOT, COLOR_ALLEN],
      [VENUE_AYDELU_TIMESLOT, COLOR_AYDELU],
      [VENUE_AYDELU_CAGE_TIMESLOT, COLOR_AYDELU_CAGE],
      [VENUE_MOUSSETTE_TIMESLOT, COLOR_MOUSSETTE],
      [VENUE_BOSCO_TIMESLOT, COLOR_BOSCO],
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