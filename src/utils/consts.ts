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

export const COLOR_SC1: string ="#000445";
export const COLOR_SC2: string ="#004B94";
export const COLOR_SC3: string ="#0066cc";
export const COLOR_SC4: string ="#0099cc";
export const COLOR_SC5: string ="#7DBBFF";
export const COLOR_SCC1: string ="#7D96AD";
export const COLOR_SCC2: string ="#BDC7DB";
export const COLOR_STRENE: string = "#339933";
export const COLOR_RIVIERA: string = "#cc3300";
export const COLOR_LIMBOUR: string = "#9900ff";
export const COLOR_RACICOT: string = "#ffc107";
export const COLOR_LP: string = "#FF8069";
export const COLOR_BELISLE: string = "#FFADF6";
export const COLOR_M1: string = "#75FF7A";
export const COLOR_M2: string = "#ADFFB0";
export const COLOR_MG: string = "#ADADAD";


export const VENUE_SC1: string = "Parc Sanscartier - Terrain 1";
export const VENUE_SC2: string = "Parc Sanscartier - Terrain 2";
export const VENUE_SC3: string = "Parc Sanscartier - Terrain 3";
export const VENUE_SC4: string = "Parc Sanscartier - Terrain 4";
export const VENUE_SC5: string = "Parc Sanscartier - Terrain 5";
export const VENUE_SCC1: string = "Parc Sanscartier - Cage Frappeurs 1";
export const VENUE_SCC2: string = "Parc Sanscartier - Cage Frappeurs 2";
export const VENUE_STRENE: string = "Parc St-René";
export const VENUE_RIVIERA: string = "Parc Riviera";
export const VENUE_LIMBOUR: string = "Parc Limbour";
export const VENUE_RACICOT: string = "Parc Racicot";
export const VENUE_LP: string = "Parc Louis-Phillion";
export const VENUE_BELISLE: string = "Parc Bélisle";
export const VENUE_M1: string = "80 rue Moreau - Terrain 1";
export const VENUE_M2: string = "80 rue Moreau - Terrain 2";
export const VENUE_MG: string = "Parc Marcel-Gladu";

export const VENUE_CLASS = new Map<string, string>(
    [
      [VENUE_SC1, "venue-blue"],
      [VENUE_SC2, "venue-blue-2"],
      [VENUE_SC3, "venue-blue-3"],
      [VENUE_SC4, "venue-blue-4"],
      [VENUE_SC5, "venue-blue-5"],
      [VENUE_SCC1, "venue-blue-6"],
      [VENUE_SCC2, "venue-blue-7"],
      [VENUE_STRENE, "venue-green"],
      [VENUE_RIVIERA, "venue-red"],
      [VENUE_LIMBOUR, "venue-purple"],
      [VENUE_RACICOT, "venue-yellow"],
      [VENUE_LP, "venue-salmon"],
      [VENUE_BELISLE, "venue-lyla"],
      [VENUE_M1, "venue-light-green-1"],
      [VENUE_M2, "venue-light-green-2"],
      [VENUE_MG, "venue-light-grey"],
      ["", "venue-default"],
    ]
  );

  export const VENUE_COLORS = new Map<string, string>(
    [
      [VENUE_SC1, COLOR_SC1],
      [VENUE_SC2, COLOR_SC2],
      [VENUE_SC3, COLOR_SC3],
      [VENUE_SC4, COLOR_SC4],
      [VENUE_SC5, COLOR_SC5],
      [VENUE_SCC1, COLOR_SCC1],
      [VENUE_SCC2, COLOR_SCC2],
      [VENUE_RIVIERA, COLOR_RIVIERA],
      [VENUE_LIMBOUR, COLOR_LIMBOUR],
      [VENUE_RACICOT, COLOR_RACICOT],
      [VENUE_BELISLE, COLOR_BELISLE],
      [VENUE_M1, COLOR_M1],
      [VENUE_M2, COLOR_M2],
      [VENUE_MG, COLOR_MG],
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