import React, { useEffect, useState } from "react";
import { Calendar, Views, type NavigateAction, type View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Checkbox from '@mui/material/Checkbox';
import { Button, FormControlLabel, FormGroup } from "@mui/material";
import * as Consts from "./utils/consts";
import * as Types from "./utils/types";
import * as Helpers from "./utils/helpers";
import * as Data from "./utils/data";

function App() {
  const [events, setEvents] = useState<Types.CalendarEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Types.CalendarEvent[]>([]);
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const uid : string = Date.now().toString();

  const [isVisibleAllen, setIsVisibleAllen] = useState<boolean>(true);
  const [isVisibleAydelu, setIsVisibleAydelu] = useState<boolean>(true);
  const [isVisibleAydeluCage, setIsVisibleAydeluCage] = useState<boolean>(true);
  const [isVisibleMoussette, setIsVisibleMoussette] = useState<boolean>(false);
  const [isVisibleBosco, setIsVisibleBosco] = useState<boolean>(false);

  const [isVisibleAllenTimeslot, setIsVisibleAllenTimeslot] = useState<boolean>(false);
  const [isVisibleAydeluTimeslot, setIsVisibleAydeluTimeslot] = useState<boolean>(false);
  const [isVisibleAydeluCageTimeslot, setIsVisibleAydeluCageTimeslot] = useState<boolean>(false);
  const [isVisibleMoussetteTimeslot, setIsVisibleMoussetteTimeslot] = useState<boolean>(false);
  const [isVisibleBoscoTimeslot, setIsVisibleBoscoTimeslot] = useState<boolean>(false);

  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingMessage("Chargement des matchs...");
        const parsedGameEvents = await Data.loadEvents("games.csv", uid, Consts.GAME_EVENT_TYPE);
        setLoadingMessage("Chargement des pratiques...");
        const parsedPracticesEvents = await Data.loadEvents("practices.csv", uid, Consts.PRACTICE_EVENT_TYPE);

        var parsedGameEventsMap = new Map(parsedGameEvents.map(g => [g.uid, g]));
        var parsedPracticesEventsMap = new Map(parsedPracticesEvents.map(p => [p.uid, p]));

        setLoadingMessage(`Chargement des plages horaires de ${Helpers.filterVenue(Consts.VENUE_ALLEN)}...`);
        const allenTimeslotsEvents = await Data.loadVenueTimeslots(Consts.VENUE_ALLEN, "timeslots-allen.json", uid, parsedGameEventsMap, parsedPracticesEventsMap);

        setLoadingMessage(`Chargement des plages horaires de ${Helpers.filterVenue(Consts.VENUE_AYDELU)}...`);
        const aydeluTimeslotsEvents = await Data.loadVenueTimeslots(Consts.VENUE_AYDELU, "timeslots-aydelu.json", uid, parsedGameEventsMap, parsedPracticesEventsMap);

        setLoadingMessage(`Chargement des plages horaires de ${Helpers.filterVenue(Consts.VENUE_AYDELU_CAGE)}...`);
        const aydeluCageTimeslotsEvents = await Data.loadVenueTimeslots(Consts.VENUE_AYDELU_CAGE, "timeslots-aydelucage.json", uid, parsedGameEventsMap, parsedPracticesEventsMap);

        setLoadingMessage(`Chargement des plages horaires de ${Helpers.filterVenue(Consts.VENUE_MOUSSETTE)}...`);
        const moussetteTimeslotsEvents = await Data.loadVenueTimeslots(Consts.VENUE_MOUSSETTE, "timeslots-moussette.json", uid, parsedGameEventsMap, parsedPracticesEventsMap);

        setLoadingMessage(`Chargement des plages horaires de ${Helpers.filterVenue(Consts.VENUE_BOSCO)}...`);
        const boscoTimeslotsEvents = await Data.loadVenueTimeslots(Consts.VENUE_BOSCO, "timeslots-stjeanbosco.json", uid, parsedGameEventsMap, parsedPracticesEventsMap);

        const timeslotsEvents = ([...allenTimeslotsEvents, ...aydeluTimeslotsEvents, ...aydeluCageTimeslotsEvents, ...moussetteTimeslotsEvents, ...boscoTimeslotsEvents]);
        setEvents([...parsedGameEvents, ...parsedPracticesEvents, ...timeslotsEvents]);

        setLoadingMessage("Chargement du calendrier...");
        setFilteredEvents([...parsedGameEvents, ...parsedPracticesEvents]
          .filter(e => e.venue != Consts.VENUE_MOUSSETTE && e.venue != Consts.VENUE_BOSCO)
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
    setFilteredEvents(events.filter(e => (!isVisibleAllen ? e.venue != Consts.VENUE_ALLEN : e)
      && (!isVisibleAydelu ? e.venue != Consts.VENUE_AYDELU : e)
      && (!isVisibleAydeluCage ? e.venue != Consts.VENUE_AYDELU_CAGE : e)
      && (!isVisibleMoussette ? e.venue != Consts.VENUE_MOUSSETTE : e)
      && (!isVisibleBosco ? e.venue != Consts.VENUE_BOSCO : e)
      && (!isVisibleAllenTimeslot ? e.venue != Consts.VENUE_ALLEN_TIMESLOT : e)
      && (!isVisibleAydeluTimeslot ? e.venue != Consts.VENUE_AYDELU_TIMESLOT : e)
      && (!isVisibleAydeluCageTimeslot ? e.venue != Consts.VENUE_AYDELU_CAGE_TIMESLOT : e)
      && (!isVisibleMoussetteTimeslot ? e.venue != Consts.VENUE_MOUSSETTE_TIMESLOT : e)
      && (!isVisibleBoscoTimeslot ? e.venue != Consts.VENUE_BOSCO_TIMESLOT : e)
      ));
  }, [
    isVisibleAllen,
    isVisibleAydelu,
    isVisibleAydeluCage,
    isVisibleMoussette,
    isVisibleBosco,
    isVisibleAllenTimeslot,
    isVisibleAydeluTimeslot,
    isVisibleAydeluCageTimeslot,
    isVisibleMoussetteTimeslot,
    isVisibleBoscoTimeslot,
  ]);

  const handleScroll = () => {
    if (window.pageYOffset > 96) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const eventPropGetter = (event: any) => {
    let borderLeftColor = Consts.VENUE_COLORS.get(event.venue) || Consts.VENUE_COLORS.get("");
    let backgroundColor = event.type == Consts.GAME_EVENT_TYPE ?  Consts.COLOR_GAME : Consts.COLOR_PRACTICE;

    switch(event.type) {
      case Consts.GAME_EVENT_TYPE:
        backgroundColor = Consts.COLOR_GAME;
        break;
      case Consts.PRACTICE_EVENT_TYPE:
        backgroundColor = Consts.COLOR_PRACTICE;
        break;
      default:
        backgroundColor = Consts.COLOR_TIMESLOT;
    }

    type BorderStyle = | 'dotted' | 'solid';
    let borderStyle: BorderStyle  = event.type == Consts.TIMESLOT_EVENT_TYPE ? 'dotted' : 'solid';
  
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        color: '#333',
        borderLeft: `15px solid ${borderLeftColor}`,
        borderTop: `1px ${borderStyle} ${borderLeftColor}`,
        borderRight: `1px ${borderStyle} ${borderLeftColor}`,
        borderBottom: `1px ${borderStyle} ${borderLeftColor}`,
        display: 'block',
      },
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
        if (view === 'week') newDate.setDate(newDate.getDate() + 7);
        if (view === 'day') newDate.setDate(newDate.getDate() + 1);
        break;
      case 'PREV':
        if (view === 'month') newDate.setMonth(newDate.getMonth() - 1);
        if (view === 'week') newDate.setDate(newDate.getDate() - 7);
        if (view === 'day') newDate.setDate(newDate.getDate() - 1);
        break;
      case 'TODAY':
        newDate = new Date();
        break;
    }

    setDate(newDate);
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
            <div className="venue-name">Allen</div>
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox defaultChecked onChange={(e) => setIsVisibleAllen(e.target.checked)}
              sx={{ color: Consts.COLOR_ALLEN, '&.Mui-checked': { color: Consts.COLOR_ALLEN, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event</span></>}
            />
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox onChange={(e) => setIsVisibleAllenTimeslot(e.target.checked)}
              sx={{ color: Consts.COLOR_ALLEN, '&.Mui-checked': { color: Consts.COLOR_ALLEN, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event_available</span></>}
            />
          </div>
          <div className="venue-group">
            <div className="venue-name">Aydelu</div>
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox defaultChecked onChange={(e) => setIsVisibleAydelu(e.target.checked)}
              sx={{ color: Consts.COLOR_AYDELU, '&.Mui-checked': { color: Consts.COLOR_AYDELU, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event</span></>}
            />
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox onChange={(e) => setIsVisibleAydeluTimeslot(e.target.checked)}
              sx={{ color: Consts.COLOR_AYDELU, '&.Mui-checked': { color: Consts.COLOR_AYDELU, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event_available</span></>}
            />
          </div>
          <div className="venue-group">
            <div className="venue-name">Aydelu (Cage)</div>
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox defaultChecked onChange={(e) => setIsVisibleAydeluCage(e.target.checked)}
              sx={{ color: Consts.COLOR_AYDELU_CAGE, '&.Mui-checked': { color: Consts.COLOR_AYDELU_CAGE, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event</span></>}
            />
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox onChange={(e) => setIsVisibleAydeluCageTimeslot(e.target.checked)}
              sx={{ color: Consts.COLOR_AYDELU_CAGE, '&.Mui-checked': { color: Consts.COLOR_AYDELU_CAGE, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event_available</span></>}
            />
          </div>
          <div className="venue-group">
            <div className="venue-name">Moussette</div>
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox onChange={(e) => setIsVisibleMoussette(e.target.checked)}
              sx={{ color: Consts.COLOR_MOUSSETTE, '&.Mui-checked': { color: Consts.COLOR_MOUSSETTE, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event</span></>}
            />
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox onChange={(e) => setIsVisibleMoussetteTimeslot(e.target.checked)}
              sx={{ color: Consts.COLOR_MOUSSETTE, '&.Mui-checked': { color: Consts.COLOR_MOUSSETTE, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event_available</span></>}
            />
          </div>
          <div className="venue-group">
            <div className="venue-name">St-Jean-Bosco</div>
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox onChange={(e) => setIsVisibleBosco(e.target.checked)}
              sx={{ color: Consts.COLOR_BOSCO, '&.Mui-checked': { color: Consts.COLOR_BOSCO, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event</span></>}
            />
            <FormControlLabel label="" className="checkbox-venue"
              control={<><Checkbox onChange={(e) => setIsVisibleBoscoTimeslot(e.target.checked)}
              sx={{ color: Consts.COLOR_BOSCO, '&.Mui-checked': { color: Consts.COLOR_BOSCO, class: 'checkbox-venue-checked' } }} /><span className="material-icons-outlined">event_available</span></>}
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
          components={{ event: EventComponent, toolbar: () => null }}
          culture="fr-CA"
          views={[Views.MONTH]}
          defaultView={Views.MONTH}
          view={view}
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
