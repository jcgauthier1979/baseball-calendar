import React, { useEffect, useState } from "react";
import { Calendar, Views, type NavigateAction, type View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Checkbox from '@mui/material/Checkbox';
import { Button, FormControlLabel, FormGroup, useMediaQuery, useTheme  } from "@mui/material";
import * as Consts from "./utils/consts";
import * as Types from "./utils/types";
import * as Helpers from "./utils/helpers";
import * as Data from "./utils/data";
import { CustomAgendaEvent } from "./components/customAgendaEvent";
import { CustomAgendaDate } from "./components/customAgendaDate";

function App() {
  const [events, setEvents] = useState<Types.CalendarEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Types.CalendarEvent[]>([]);
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState<Date>(new Date());
  const [monthViewDate, setMonthViewDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const uid : string = Date.now().toString();

  const [isVisibleLongueAllee, setIsVisibleLongueAllee] = useState<boolean>(true);
  const [isVisibleLongueAlleeTimeslot, setIsVisibleLongueAlleeTimeslot] = useState<boolean>(false);
  const [isVisibleThibault, setIsVisibleThibault] = useState<boolean>(true);
  const [isVisibleThibaultTimeslot, setIsVisibleThibaultTimeslot] = useState<boolean>(false);
  const [isVisiblePerkins, setIsVisiblePerkins] = useState<boolean>(true);
  const [isVisiblePerkinsTimeslot, setIsVisiblePerkinsTimeslot] = useState<boolean>(false);
  const [isVisiblePerkinsCage, setIsVisiblePerkinsCage] = useState<boolean>(true);

  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState<boolean>(false);

  const theme = useTheme();
  const isAgendaView = useMediaQuery( theme.breakpoints.down('sm') );

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingMessage("Chargement des matchs...");
        const parsedGameEvents = await Data.loadEvents("games.csv", uid, Consts.GAME_EVENT_TYPE);
        setLoadingMessage("Chargement des pratiques...");
        const parsedPracticesEvents = await Data.loadEvents("practices.csv", uid, Consts.PRACTICE_EVENT_TYPE);

        var parsedGameEventsMap = new Map(parsedGameEvents.map(g => [g.uid, g]));
        var parsedPracticesEventsMap = new Map(parsedPracticesEvents.map(p => [p.uid, p]));

        setLoadingMessage(`Chargement des plages horaires de ${Helpers.filterVenue(Consts.VENUE_LONGUEALLEE)}...`);
        const longuealleeTimeslotsEvents = await Data.loadVenueTimeslots(Consts.VENUE_LONGUEALLEE, "timeslots-longueallee.csv", uid, parsedGameEventsMap, parsedPracticesEventsMap);

        setLoadingMessage(`Chargement des plages horaires de ${Helpers.filterVenue(Consts.VENUE_THIBAULT)}...`);
        const thibaultTimeslotsEvents = await Data.loadVenueTimeslots(Consts.VENUE_THIBAULT, "timeslots-thibault.csv", uid, parsedGameEventsMap, parsedPracticesEventsMap);

        setLoadingMessage(`Chargement des plages horaires de ${Helpers.filterVenue(Consts.VENUE_PERKINS)}...`);
        const perkinsTimeslotsEvents = await Data.loadVenueTimeslots(Consts.VENUE_PERKINS, "timeslots-perkins.csv", uid, parsedGameEventsMap, parsedPracticesEventsMap);

        const timeslotsEvents = ([...longuealleeTimeslotsEvents, ...thibaultTimeslotsEvents, ...perkinsTimeslotsEvents]);
        setEvents([...parsedGameEvents, ...parsedPracticesEvents, ...timeslotsEvents]);

        setLoadingMessage("Chargement du calendrier...");
        setFilteredEvents([...parsedGameEvents, ...parsedPracticesEvents]
        );
      } catch (err: any) {
        console.error('Erreur de chargement : ', err);
        setError(err.message || 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    loadData();   

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  // When a venue is checked or unchecked
  useEffect(() => {
    setFilteredEvents(events.filter(e => (!isVisibleLongueAllee ? e.venue != Consts.VENUE_LONGUEALLEE : e)
      && (!isVisibleLongueAlleeTimeslot ? e.venue != Consts.VENUE_LONGUEALLEE_TIMESLOT : e)
      && (!isVisibleThibault ? e.venue != Consts.VENUE_THIBAULT : e)
      && (!isVisibleThibaultTimeslot ? e.venue != Consts.VENUE_THIBAULT_TIMESLOT : e)
      && (!isVisiblePerkins ? e.venue != Consts.VENUE_PERKINS : e)
      && (!isVisiblePerkinsTimeslot ? e.venue != Consts.VENUE_PERKINS_TIMESLOT : e)
      && (!isVisiblePerkinsCage ? e.venue != Consts.VENUE_PERKINSCAGE : e)
      ));
  }, [
    isVisibleLongueAllee,
    isVisibleThibault,
    isVisiblePerkins,
    isVisiblePerkinsCage,
    isVisibleLongueAlleeTimeslot,
    isVisibleThibaultTimeslot,
    isVisiblePerkinsTimeslot
  ]);

  useEffect(() => {
    if (isAgendaView) {
      // Keep for later
      setMonthViewDate(date);
      setDate(Helpers.dateMonthStart(date));
    }
    else {
      // Restore
      setDate(monthViewDate);
    }
  }, [isAgendaView]);

  const handleScroll = () => {
    if (window.pageYOffset > 96) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const eventPropGetter = (event: any) => {
    let classNameVenue = Consts.VENUE_CLASS.get(event.venue) || Consts.VENUE_CLASS.get("");
    let classNameType = "";

    switch(event.type) {
      case Consts.GAME_EVENT_TYPE:
        classNameType = Consts.CLASS_NAME_GAME;
        break;
      case Consts.PRACTICE_EVENT_TYPE:
        classNameType = Consts.CLASS_NAME_PRACTICE;
        break;
      default:
        classNameType = Consts.CLASS_NAME_TIMESLOT;
    }

    return {
      className: `${classNameType} ${classNameVenue}`
    };
  };

  const EventComponent: React.FC<{ event: Types.CalendarEvent }> = ({ event }) => (
    <>
      {event.type == 'timeslot' && (
        <>
          <em>Disponible</em>
          <br />
        </>
      )}
      {event.name && event.name.trim() !== '' && (
        <>
          <span>{event.name}</span>
          <br />
        </>
      )}
      {event.awayTeam && event.awayTeam.trim() !== '' && (
        <>
          <span>{event.awayTeam}</span>
          <br />
        </>
      )}
      {event.homeTeam && event.homeTeam.trim() !== '' && (
        <>
          <span>{event.homeTeam}</span>
          <br />
        </>
      )}
      {Helpers.filterVenue(event.venue ?? "")}<br />
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
    </>
  );

  const handleViewChange = (view: View) => {
    setView(view);
  };

    const handleNavigate = (action: NavigateAction) => {
    let newDate = new Date(date);

    switch (action) {
      case 'NEXT':
        if (view === 'month') newDate.setMonth(newDate.getMonth() + 1);
        if (view === 'agenda') newDate.setMonth(newDate.getMonth() + 1);
        //if (view === 'week') newDate.setDate(newDate.getDate() + 7);
        //if (view === 'day') newDate.setDate(newDate.getDate() + 1);
        break;
      case 'PREV':
        if (view === 'month') newDate.setMonth(newDate.getMonth() - 1);
        if (view === 'agenda') newDate.setMonth(newDate.getMonth() - 1);
        //if (view === 'week') newDate.setDate(newDate.getDate() - 7);
        //if (view === 'day') newDate.setDate(newDate.getDate() - 1);
        break;
      case 'TODAY':
        newDate = new Date();
        break;
    }

    setDate(newDate);
    setMonthViewDate(newDate);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  if (loading) return (
    <div className="loading">
      <span className="loader"></span>
      <p><strong>Chargement en cours...</strong></p>
      <p>{loadingMessage}</p>
    </div>
  );
  if (error) return (
    <div className="loading">
      <span className="material-icons-outlined error-icon">error</span>
        <p><strong>Erreur de chargement:</strong> {error}</p>
    </div>
  );
  
  return (
    <div>
      <div id="h-menu" onClick={() => toggleMenu()}>
        {
          showMenu && <span className="material-icons-outlined">close</span>
        }
        {
          !showMenu && <span className="material-icons-outlined">menu</span>
        }
      </div>
      <div id="filters" className={(showMenu ? 'h-menu-open ' : '') + (isSticky ? 'sticky ' : '')}>
        <FormGroup row sx={{ justifyContent: 'center', alignItems: 'center', gap: 2, '& .MuiSvgIcon-root': { fontSize: 24 } }}>
          <div className="toolbar-nav">
            
            <div className="mx-2 font-bold toolbar-nav-month">
              <span className="material-icons-outlined toolbar-nav-month-icon">date_range</span>
              <span className="toolbar-nav-month-label">{Consts.localizer.format(date, 'MMMM yyyy', "fr-CA")}</span>
            </div>

            <Button variant="contained" onClick={() => handleNavigate('PREV')}>
              <span className="material-icons-outlined">chevron_left</span>
            </Button>
            <Button variant="contained" onClick={() => handleNavigate('NEXT')}>
              <span className="material-icons-outlined">chevron_right</span>
            </Button>

          </div>
          <div className="venue-group">
            <div className="venue-name">Longue-Allée</div>
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox defaultChecked onChange={(e) => setIsVisibleLongueAllee(e.target.checked)}
              sx={{ color: Consts.COLOR_LONGUEALLEE, '&.Mui-checked': { color: Consts.COLOR_LONGUEALLEE, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event</span></>}
            />
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox onChange={(e) => setIsVisibleLongueAlleeTimeslot(e.target.checked)}
              sx={{ color: Consts.COLOR_LONGUEALLEE, '&.Mui-checked': { color: Consts.COLOR_LONGUEALLEE, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event_available</span></>}
            />
          </div>
          <div className="venue-group">
            <div className="venue-name">Thibault</div>
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox defaultChecked onChange={(e) => setIsVisibleThibault(e.target.checked)}
              sx={{ color: Consts.COLOR_THIBAULT, '&.Mui-checked': { color: Consts.COLOR_THIBAULT, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event</span></>}
            />
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox onChange={(e) => setIsVisibleThibaultTimeslot(e.target.checked)}
              sx={{ color: Consts.COLOR_THIBAULT, '&.Mui-checked': { color: Consts.COLOR_THIBAULT, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event_available</span></>}
            />
          </div>
          <div className="venue-group">
            <div className="venue-name">Perkins</div>
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox defaultChecked onChange={(e) => setIsVisiblePerkins(e.target.checked)}
              sx={{ color: Consts.COLOR_PERKINS, '&.Mui-checked': { color: Consts.COLOR_PERKINS, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event</span></>}
            />
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox onChange={(e) => setIsVisiblePerkinsTimeslot(e.target.checked)}
              sx={{ color: Consts.COLOR_PERKINS, '&.Mui-checked': { color: Consts.COLOR_PERKINS, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event_available</span></>}
            />
          </div>
          
          <div className="venue-group">
            <div className="venue-name">Perkins (cage)</div>
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox defaultChecked onChange={(e) => setIsVisiblePerkinsCage(e.target.checked)}
              sx={{ color: Consts.COLOR_PERKINSCAGE, '&.Mui-checked': { color: Consts.COLOR_PERKINSCAGE, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event</span></>}
            />
          </div>
        </FormGroup>
      </div>
      <div id="main" className={isSticky ? 'pushed' : '' }>
        <Calendar
          showAllEvents={true}
          localizer={Consts.localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ minHeight: 600 }}
          eventPropGetter={eventPropGetter}
          components={{ event: EventComponent, toolbar: () => null, agenda: {
              event: CustomAgendaEvent,
              date: CustomAgendaDate as unknown as React.ComponentType<{}>,
            },
          }}
          culture="fr-CA"
          views={[Views.MONTH, Views.AGENDA]}
          defaultView={Views.MONTH}
          view={isAgendaView ? Views.AGENDA : view}
          date={date}
          onView={handleViewChange}
          onNavigate={(date) => { setDate(new Date(date)); }}
          messages={Consts.CALENDAR_MESSAGES}
        />
      </div>
    </div>
  );
}

export default App
