import * as Types from "../utils/types";
import * as Helpers from "../utils/helpers";

export const CustomAgendaEvent: React.FC<{ event: Types.CalendarEvent }> = ({ event }) => {
  return (
    <div className="rbc-agenda-event-cell-content">
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
    </div>
  );
};
