import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Views, type View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { parse, startOfWeek, getDay, format } from "date-fns";
import frCA from "date-fns/locale/fr-CA";
import Papa from "papaparse";
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup } from "@mui/material";

const locales = {
  "fr-CA": frCA
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales
});

type CsvRow = {
  Date: string;
  "Start Time": string;
  "End Time": string;
  "Home Team Name": string;
  "Away Team Name": string;
  Venue: string;
  Status: string;
  Comments: string;
};

type PracticesCsvRow = {
  "Team IDs": string;
  "Team Names": string;
  "Team Registry IDs": string;
  "Name": string;
  Type: string,
  Venue: string;
  Date: string;
  "Start Time": string;
  "End Time": string;
  Status: string;
  Comments: string;
};

interface CalendarEvent {
  type: string;
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  resource?: {
    status: string;
    comments: string;
  };
}

const messages = {
  previous: 'Précédant',
  next: 'Suivant',
  today: 'Aujourd\'hui',
  month: 'Mois',
  week: 'Semaine',
  day: 'Jour',
  agenda: 'Agenda',
};

function filterTeamName(name : string) {
  var separatorPos = name.indexOf(",");
  var secondName = "";

  if (separatorPos > 0) {
    var posSecondTeam = name.indexOf(" - Masculin", separatorPos);
    if (posSecondTeam > 0) {
      secondName = "<br />" + name.substring(separatorPos + 1, posSecondTeam);
    }
  }
  
  var pos = name.indexOf(" - Masculin");
  if (pos > 0) {
    name = name.substring(0, pos);
  }

  name = name.replace(",", "")
  return `${name}${secondName}`;
}

function filterVenue(name : string) {
  // Remove venue specific prefix
  name = name.replace(" - Terrain Russell Martin", "")
  // Remove generic prefix
  name = name.replace("Parc ", "")
  return name;
}

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const uid : string = Date.now().toString();

  const [isVisibleRusselMartin, setIsVisibleRusselMartin] = useState<boolean>(true);

  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch('/calendrier-chelsea/games.csv?' + uid);
        if (!response.ok) throw new Error('Failed to fetch CSV');

        const csvText = await response.text();
        const parsed =  Papa.parse<CsvRow>(csvText, {
          header: true
        });

        if (parsed.errors.length) {
          throw new Error(parsed.errors.map(e => e.message).join(', '));
        }

        const parsedGameEvents: CalendarEvent[] = parsed.data.map((row, index) => {
          const start = new Date(`${row.Date}T${row["Start Time"]}:00`);
          const end = new Date(`${row.Date}T${row["End Time"]}:00`);

          return {
            type: "game",
            id: index,
            title: `${row["Home Team Name"]}\n${row["Away Team Name"]}`,
            homeTeam: filterTeamName(row["Home Team Name"]),
            awayTeam: filterTeamName(row["Away Team Name"]),
            start: start,
            end: end,
            allDay: false,
            venue: row["Venue"],
            resource: {
              status: row.Status,
              comments: row.Comments
            }
          };
        });

        // Practices
        const practicesResponse = await fetch('/calendrier-chelsea/practices.csv?' + uid);
        if (!practicesResponse.ok) throw new Error('Failed to fetch CSV');

        const practicesCsvText = await practicesResponse.text();
        const parsedPractices =  Papa.parse<PracticesCsvRow>(practicesCsvText, {
          header: true
        });

        if (parsedPractices.errors.length) {
          throw new Error(parsedPractices.errors.map(e => e.message).join(', '));
        }

        const parsedPracticesEvents: CalendarEvent[] = parsedPractices.data.map((row, index) => {
          const start = new Date(`${row.Date}T${row["Start Time"]}:00`);
          const end = new Date(`${row.Date}T${row["End Time"]}:00`);

          return {
            type: "practice",
            id: index,
            title: filterTeamName(row["Team Names"]),
            homeTeam: filterTeamName(row["Team Names"]),
            awayTeam: "",
            start: start,
            end: end,
            allDay: false,
            venue: row["Venue"],
            resource: {
              status: row.Status,
              comments: row.Comments
            }
          };
        });

        setEvents([...parsedGameEvents, ...parsedPracticesEvents]);
        setFilteredEvents([...parsedGameEvents, ...parsedPracticesEvents]);
      } catch (err: any) {
        console.error('CSV load error:', err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadCSV();   
  }, []);

  // When a venue is checked or unchecked
  useEffect(() => {
    setFilteredEvents(events.filter(e => (!isVisibleRusselMartin ? e.venue != venueRusselMartin : e)
      ));
  }, [
    isVisibleRusselMartin
  ]);

  const eventTypeGame: string ="game";
  //const eventTypePractice: string ="practice";

  const colorGame: string ="#fefefe";
  const colorPractice: string ="#e6f2ff";

  const colorRusselMartin: string ="#0066cc";
  const venueRusselMartin: string = "Parc Russell Martin - Terrain Russell Martin";
 

  const venueColors: Record<string, string> = {
    "Parc Russell Martin - Terrain Russell Martin": colorRusselMartin,
    "Default": "#000",
  };

  const eventPropGetter = (event: any) => {
    let borderLeftColor = venueColors[event.venue] || venueColors.Default;
    let backgroundColor = event.type == eventTypeGame ?  colorGame : colorPractice;
  
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        color: '#333',
        borderLeft: `15px solid ${borderLeftColor}`,
        borderTop: `1px solid ${borderLeftColor}`,
        borderRight: `1px solid ${borderLeftColor}`,
        borderBottom: `1px solid ${borderLeftColor}`,
        display: 'block',
      },
    };
  };

  const EventComponent: React.FC<{ event: CalendarEvent }> = ({ event }) => (
    <>
    
      {/* {event.type == 'game' && (
        <>
          <strong>MATCH</strong>
          <br />
        </>
      )}
      {event.type == 'practice' && (
        <>
          <strong>PRATIQUE</strong>
          <br />
        </>
      )} */}
      {event.awayTeam && event.awayTeam.trim() !== '' && (
        <>
          <span dangerouslySetInnerHTML={{__html: event.awayTeam}} />
          <br />
        </>
      )}
      {event.homeTeam && event.homeTeam.trim() !== '' && (
        <>
          <span dangerouslySetInnerHTML={{__html: event.homeTeam}} />
          <br />
        </>
      )}
      {filterVenue(event.venue ?? "")}<br />
      {
        event.start.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
        })
      } - {event.end.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
        })
      } 
      {/* {event.resource?.comments && event.resource?.comments.trim() !== '' && (
        <>
        <br />
          <em>{event.resource?.comments}</em>
          <br />
        </>
      )} */}
      
    </>
  );

  const handleViewChange = (view: View) => {
    setView(view);
  };

  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>Erreur de chargement: {error}</p>;
  
  return (
    <div>
      <div id="filters">
        <FormGroup row sx={{ justifyContent: 'center', alignItems: 'center', gap: 2, '& .MuiSvgIcon-root': { fontSize: 24 } }}>
          <FormControlLabel label="Russell Martin" className="checkbox-venue"
            control={<Checkbox defaultChecked onChange={(e) => setIsVisibleRusselMartin(e.target.checked)}
              sx={{ color: colorRusselMartin, '&.Mui-checked': { color: colorRusselMartin, class: 'checkbox-venue-checked' } }} />}
          />
        </FormGroup>
      </div>
      <div id="main">
        <Calendar
          showAllEvents={true}
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ minHeight: 600 }}
          eventPropGetter={eventPropGetter}
          components={{ event: EventComponent }}
          culture="fr-CA"
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          defaultView={Views.MONTH}
          view={view}
          date={date}
          onView={handleViewChange}
          onNavigate={(date) => { setDate(new Date(date)); }}
          messages={messages}
        />
      </div>
    </div>
  );
}

export default App
