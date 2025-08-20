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

export const COLOR_STEBERNADETTE: string ="#0066cc";
export const COLOR_MOUSSETTE: string = "#339933";
export const COLOR_FONTAINE: string = "#9900ff";
export const COLOR_BOSCO: string = "#cc3300";
export const COLOR_JOLICOEUR: string = "#ffc107";

export const VENUE_STEBERNADETTE: string = "Parc Ste-Bernadette";
export const VENUE_MOUSSETTE: string = "Parc Moussette";
export const VENUE_FONTAINE: string = "Parc Fontaine";
export const VENUE_BOSCO: string = "Parc St-Jean-De-Bosco - Parc St-Jean-Bosco";
export const VENUE_JOLICOEUR: string = "Parc Jolicoeur";

export const VENUE_STEBERNADETTE_TIMESLOT: string = VENUE_STEBERNADETTE + TIMESLOT_EVENT_TYPE;
export const VENUE_MOUSSETTE_TIMESLOT: string = VENUE_MOUSSETTE + TIMESLOT_EVENT_TYPE;
export const VENUE_FONTAINE_TIMESLOT: string = VENUE_FONTAINE + TIMESLOT_EVENT_TYPE;
export const VENUE_BOSCO_TIMESLOT: string = VENUE_BOSCO + TIMESLOT_EVENT_TYPE;
export const VENUE_JOLICOEUR_TIMESLOT: string = VENUE_JOLICOEUR + TIMESLOT_EVENT_TYPE;

export const VENUE_CLASS = new Map<string, string>(
    [
      [VENUE_STEBERNADETTE, "venue-blue"],
      [VENUE_MOUSSETTE, "venue-green"],
      [VENUE_FONTAINE, "venue-purple"],
      [VENUE_BOSCO, "venue-red"],
      [VENUE_JOLICOEUR, "venue-yellow"],
      [VENUE_STEBERNADETTE_TIMESLOT, "venue-blue"],
      [VENUE_MOUSSETTE_TIMESLOT, "venue-green"],
      [VENUE_FONTAINE_TIMESLOT, "venue-purple"],
      [VENUE_BOSCO_TIMESLOT, "venue-red"],
      [VENUE_JOLICOEUR_TIMESLOT, "venue-yellow"],
      ["", "venue-default"],
    ]
  );

  export const VENUE_COLORS = new Map<string, string>(
    [
      [VENUE_MOUSSETTE, COLOR_MOUSSETTE],
      [VENUE_STEBERNADETTE, COLOR_STEBERNADETTE],
      [VENUE_FONTAINE, COLOR_FONTAINE],
      [VENUE_BOSCO, COLOR_BOSCO],
      [VENUE_JOLICOEUR, COLOR_JOLICOEUR],
      [VENUE_MOUSSETTE_TIMESLOT, COLOR_MOUSSETTE],
      [VENUE_STEBERNADETTE_TIMESLOT, COLOR_STEBERNADETTE],
      [VENUE_FONTAINE_TIMESLOT, COLOR_FONTAINE],
      [VENUE_BOSCO_TIMESLOT, COLOR_BOSCO],
      [VENUE_JOLICOEUR_TIMESLOT, COLOR_JOLICOEUR],
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

export const TIMESLOTS_CSV_HEADER = "Date,Start Time,End Time,Field (Alias),Field,Venue,Event Type,Identifier,Organization,Secondary Organization,Schedule,Category,Home Team,Away Team,Practice Teams,Practice Type,Timeslot Type,Timeslot Sub Type,Timeslot Shared Leagues,Timeslot Category Restrictions,Comments,Notes";
