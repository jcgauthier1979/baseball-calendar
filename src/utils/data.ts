// Data
import * as Consts from "./consts";
import * as Types from "./types";
import * as Helpers from "./helpers";
import Papa from "papaparse";

export async function loadEvents(fileName: string, fileUid: string, eventType: string) {
  const response = await fetch(`${Consts.APP_PATH}/${fileName}?${fileUid}`);
  if (!response.ok) throw new Error('Failed to fetch events CSV');

  const csvText = await response.text();
  const parsed =  Papa.parse<Types.CsvRow>(csvText, {
    header: true
  });

  if (parsed.errors.length) {
    throw new Error(parsed.errors.map(e => e.message).join(', '));
  }

  const parsedEvents: Types.CalendarEvent[] = parsed.data.map((row, index) => {
    const itemDate = Helpers.getCsvDate(row.Date);
    const start = new Date(`${itemDate}T${row["Start Time"]}:00`);
    const end = new Date(`${itemDate}T${row["End Time"]}:00`);
    const uid = row["Venue"] + `${itemDate}T${row["Start Time"]}:00` + `${itemDate}T${row["End Time"]}:00`;
    const title = eventType == Consts.GAME_EVENT_TYPE ?
      `${row["Home Team Name"]}\n${row["Away Team Name"]}` : Helpers.filterTeamName(row["Team Names"]);
    const homeTeam = eventType == Consts.GAME_EVENT_TYPE ?
      Helpers.filterTeamName(row["Home Team Name"]) : Helpers.filterTeamName(row["Team Names"]);
    const awayTeam = eventType == Consts.GAME_EVENT_TYPE ?
      Helpers.filterTeamName(row["Away Team Name"]) : Helpers.filterSecondTeamName(row["Team Names"]);;

    return {
      type: eventType,
      id: index,
      uid: uid,
      title: title,
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      name: row["Name"],
      start: start,
      end: end,
      allDay: false,
      venue: row["Venue"],
      status: row.Status,
      comments: row.Comments
    };
  });

  return parsedEvents;
}

/**
 * Obsolete: Was used before it was possible to export as CSV.
 * @param venueName 
 * @param fileName 
 * @param fileUid 
 * @param parsedGameEventsMap 
 * @param parsedPracticesEventsMap 
 * @returns 
 */
export async function loadVenueTimeslotsJson(venueName: string, fileName: string, fileUid: string,
  parsedGameEventsMap: Map<string, Types.CalendarEvent>,
  parsedPracticesEventsMap: Map<string, Types.CalendarEvent>) {

  const timeslotsResponse = await fetch(Consts.APP_PATH + '/' + fileName + '?' + fileUid);
  if (!timeslotsResponse.ok) throw new Error('Failed to fetch timeslots JSON');

  const timeslotsJsonText : Types.TimeslotItem[] = JSON.parse(await timeslotsResponse.text());
  const parsedTimeslotsEvents: Types.CalendarEvent[] = timeslotsJsonText.map((row, index) => {
    const start = new Date(`${row.startTime}`);
    const end = new Date(`${row.endTime}`);
    const uid = venueName + `${Helpers.formatDate(start)}` + `${Helpers.formatDate(end)}`;

    return {
      type: Consts.TIMESLOT_EVENT_TYPE,
      id: index,
      uid: uid,
      title: "",
      homeTeam: "",
      awayTeam: "",
      name: "",
      start: start,
      end: end,
      allDay: false,
      venue: venueName + Consts.TIMESLOT_EVENT_TYPE,
      status: "",
      comments: ""
    };
  });

  const now = new Date();
  const filteredParsedTimeslotsEvents = parsedTimeslotsEvents.filter(
    ts => (
      !parsedGameEventsMap.has(ts.uid)
      && !parsedPracticesEventsMap.has(ts.uid)
      && ts.start > now
    )
  );
  return filteredParsedTimeslotsEvents;
}

export async function loadVenueTimeslots(venueName: string, fileName: string, fileUid: string,
  parsedGameEventsMap: Map<string, Types.CalendarEvent>,
  parsedPracticesEventsMap: Map<string, Types.CalendarEvent>) {

  const timeslotsResponse = await fetch(Consts.APP_PATH + '/' + fileName + '?' + fileUid);
  if (!timeslotsResponse.ok) throw new Error('Failed to fetch timeslots CSV');

  var csvText = await timeslotsResponse.text();
  // Replace header in case export was not in EN
  csvText = Helpers.removeFirstLine(csvText);
  csvText = `${Consts.TIMESLOTS_CSV_HEADER}\n${csvText}`;

  const parsed =  Papa.parse<Types.TimeSlotCsvRow>(csvText, {
    header: true
  });

  if (parsed.errors.length) {
    throw new Error(parsed.errors.map(e => e.message).join(', '));
  }

  const parsedTimeslotsItems : Types.CalendarEvent[] = parsed.data.map((row, index) => {
    const itemDate = Helpers.getCsvDate(row.Date);
    const start = new Date(`${itemDate}T${row["Start Time"]}:00`);
    const end = new Date(`${itemDate}T${row["End Time"]}:00`);
    const uid = row.Venue + `${itemDate}T${row["Start Time"]}:00` + `${itemDate}T${row["End Time"]}:00`;

    return {
      type: Consts.TIMESLOT_EVENT_TYPE,
      id: index,
      uid: uid,
      title: "",
      homeTeam: "",
      awayTeam: "",
      name: "",
      start: start,
      end: end,
      allDay: false,
      venue: venueName + Consts.TIMESLOT_EVENT_TYPE,
      status: "",
      comments: ""
    };
  });

  const now = new Date();
  const filteredParsedTimeslotsEvents = parsedTimeslotsItems.filter(
    ts => (
      !parsedGameEventsMap.has(ts.uid)
      && !parsedPracticesEventsMap.has(ts.uid)
      && ts.start > now
    )
  );
  return filteredParsedTimeslotsEvents;
}