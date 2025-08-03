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

  const [isVisibleSC1, setIsVisibleSC1] = useState<boolean>(true);
  const [isVisibleSC2, setIsVisibleSC2] = useState<boolean>(true);
  const [isVisibleSC3, setIsVisibleSC3] = useState<boolean>(true);
  const [isVisibleSC4, setIsVisibleSC4] = useState<boolean>(true);
  const [isVisibleSC5, setIsVisibleSC5] = useState<boolean>(true);
  const [isVisibleSCC1, setIsVisibleSCC1] = useState<boolean>(true);
  const [isVisibleSCC2, setIsVisibleSCC2] = useState<boolean>(true);
  const [isVisibleStRene, setIsVisibleStRene] = useState<boolean>(true);
  const [isVisibleRiviera, setIsVisibleRiviera] = useState<boolean>(true);
  const [isVisibleLimbour, setIsVisibleLimbour] = useState<boolean>(true);
  const [isVisibleRacicot, setIsVisibleRacicot] = useState<boolean>(true);
  const [isVisibleLP, setIsVisibleLP] = useState<boolean>(true);
  const [isVisibleBelisle, setIsVisibleBelisle] = useState<boolean>(true);
  const [isVisibleM1, setIsVisibleM1] = useState<boolean>(true);
  const [isVisibleM2, setIsVisibleM2] = useState<boolean>(true);
  const [isVisibleMG, setIsVisibleMG] = useState<boolean>(true);

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

        setEvents([...parsedGameEvents, ...parsedPracticesEvents ]);

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
    setFilteredEvents(events.filter(e => (!isVisibleSC1 ? e.venue != Consts.VENUE_SC1 : e)
    && (!isVisibleSC2 ? e.venue != Consts.VENUE_SC2 : e)
    && (!isVisibleSC3 ? e.venue != Consts.VENUE_SC3 : e)
    && (!isVisibleSC4 ? e.venue != Consts.VENUE_SC4 : e)
    && (!isVisibleSC5 ? e.venue != Consts.VENUE_SC5 : e)
    && (!isVisibleSCC1 ? e.venue != Consts.VENUE_SCC1 : e)
    && (!isVisibleSCC2 ? e.venue != Consts.VENUE_SCC2 : e)
    && (!isVisibleStRene ? e.venue != Consts.VENUE_STRENE : e)
    && (!isVisibleRiviera ? e.venue != Consts.VENUE_RIVIERA : e)
    && (!isVisibleLimbour ? e.venue != Consts.VENUE_LIMBOUR : e)
    && (!isVisibleRacicot ? e.venue != Consts.VENUE_RACICOT : e)
    && (!isVisibleLP ? e.venue != Consts.VENUE_LP : e)
    && (!isVisibleBelisle ? e.venue != Consts.VENUE_BELISLE : e)
    && (!isVisibleM1 ? e.venue != Consts.VENUE_M1 : e)
    && (!isVisibleM2 ? e.venue != Consts.VENUE_M2 : e)
    && (!isVisibleMG ? e.venue != Consts.VENUE_MG : e)
      ));
  }, [
    isVisibleSC1,
    isVisibleSC2,
    isVisibleSC3,
    isVisibleSC4,
    isVisibleSC5,
    isVisibleSCC1,
    isVisibleSCC2,
    isVisibleStRene,
    isVisibleRiviera,
    isVisibleLimbour,
    isVisibleRacicot,
    isVisibleLP,
    isVisibleBelisle,
    isVisibleM1,
    isVisibleM2,
    isVisibleMG,
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
          
          <div className="venue-stack-group">
            <FormControlLabel label="Sanscartier 1" className="checkbox-venue"
              control={<Checkbox defaultChecked onChange={(e) => setIsVisibleSC1(e.target.checked)}
              sx={{ color: Consts.COLOR_SC1, '&.Mui-checked': { color: Consts.COLOR_SC1, class: 'checkbox-venue-checked' } }} />}
            />
            <FormControlLabel label="Sanscartier 2" className="checkbox-venue"
              control={<Checkbox defaultChecked onChange={(e) => setIsVisibleSC2(e.target.checked)}
              sx={{ color: Consts.COLOR_SC2, '&.Mui-checked': { color: Consts.COLOR_SC2, class: 'checkbox-venue-checked' } }} />}
            />
            <FormControlLabel label="Sanscartier 3" className="checkbox-venue"
              control={<Checkbox defaultChecked onChange={(e) => setIsVisibleSC3(e.target.checked)}
              sx={{ color: Consts.COLOR_SC3, '&.Mui-checked': { color: Consts.COLOR_SC3, class: 'checkbox-venue-checked' } }} />}
            />
            <FormControlLabel label="Sanscartier 4" className="checkbox-venue"
              control={<Checkbox defaultChecked onChange={(e) => setIsVisibleSC4(e.target.checked)}
              sx={{ color: Consts.COLOR_SC4, '&.Mui-checked': { color: Consts.COLOR_SC4, class: 'checkbox-venue-checked' } }} />}
            />
            <FormControlLabel label="Sanscartier 5" className="checkbox-venue"
              control={<Checkbox defaultChecked onChange={(e) => setIsVisibleSC5(e.target.checked)}
              sx={{ color: Consts.COLOR_SC5, '&.Mui-checked': { color: Consts.COLOR_SC5, class: 'checkbox-venue-checked' } }} />}
            />
            <FormControlLabel label="SC - Cage 1" className="checkbox-venue"
              control={<Checkbox defaultChecked onChange={(e) => setIsVisibleSCC1(e.target.checked)}
              sx={{ color: Consts.COLOR_SCC1, '&.Mui-checked': { color: Consts.COLOR_SCC1, class: 'checkbox-venue-checked' } }} />}
            />
            <FormControlLabel label="SC - Cage 2" className="checkbox-venue"
              control={<Checkbox defaultChecked onChange={(e) => setIsVisibleSCC2(e.target.checked)}
              sx={{ color: Consts.COLOR_SCC2, '&.Mui-checked': { color: Consts.COLOR_SCC2, class: 'checkbox-venue-checked' } }} />}
            />
            <FormControlLabel label="St-René" className="checkbox-venue"
              control={<Checkbox defaultChecked onChange={(e) => setIsVisibleStRene(e.target.checked)}
              sx={{ color: Consts.COLOR_STRENE, '&.Mui-checked': { color: Consts.COLOR_STRENE, class: 'checkbox-venue-checked' } }} />}
            />
            <FormControlLabel label="Riviera" className="checkbox-venue"
              control={<Checkbox defaultChecked onChange={(e) => setIsVisibleRiviera(e.target.checked)}
              sx={{ color: Consts.COLOR_RIVIERA, '&.Mui-checked': { color: Consts.COLOR_RIVIERA, class: 'checkbox-venue-checked' } }} />}
            />
            <FormControlLabel label="Limbour" className="checkbox-venue"
              control={<Checkbox defaultChecked onChange={(e) => setIsVisibleLimbour(e.target.checked)}
              sx={{ color: Consts.COLOR_LIMBOUR, '&.Mui-checked': { color: Consts.COLOR_LIMBOUR, class: 'checkbox-venue-checked' } }} />}
            />
            <FormControlLabel label="Racicot" className="checkbox-venue"
              control={<Checkbox defaultChecked onChange={(e) => setIsVisibleRacicot(e.target.checked)}
              sx={{ color: Consts.COLOR_RACICOT, '&.Mui-checked': { color: Consts.COLOR_RACICOT, class: 'checkbox-venue-checked' } }} />}
            />
            <FormControlLabel label="Louis-Phillion" className="checkbox-venue"
              control={<Checkbox defaultChecked onChange={(e) => setIsVisibleLP(e.target.checked)}
              sx={{ color: Consts.COLOR_LP, '&.Mui-checked': { color: Consts.COLOR_LP, class: 'checkbox-venue-checked' } }} />}
            />
            <FormControlLabel label="Bélisle" className="checkbox-venue"
              control={<Checkbox defaultChecked onChange={(e) => setIsVisibleBelisle(e.target.checked)}
              sx={{ color: Consts.COLOR_BELISLE, '&.Mui-checked': { color: Consts.COLOR_BELISLE, class: 'checkbox-venue-checked' } }} />}
            />
            <FormControlLabel label="Moreau 1" className="checkbox-venue"
              control={<Checkbox defaultChecked onChange={(e) => setIsVisibleM1(e.target.checked)}
              sx={{ color: Consts.COLOR_M1, '&.Mui-checked': { color: Consts.COLOR_M1, class: 'checkbox-venue-checked' } }} />}
            />
            <FormControlLabel label="Moreau 2" className="checkbox-venue"
              control={<Checkbox defaultChecked onChange={(e) => setIsVisibleM2(e.target.checked)}
              sx={{ color: Consts.COLOR_M2, '&.Mui-checked': { color: Consts.COLOR_M2, class: 'checkbox-venue-checked' } }} />}
            />
            <FormControlLabel label="Marcel-Gladu" className="checkbox-venue"
              control={<Checkbox defaultChecked onChange={(e) => setIsVisibleMG(e.target.checked)}
              sx={{ color: Consts.COLOR_MG, '&.Mui-checked': { color: Consts.COLOR_MG, class: 'checkbox-venue-checked' } }} />}
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
