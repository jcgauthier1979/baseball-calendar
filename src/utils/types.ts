// Types

export type CsvRow = {
  Date: string;
  "Start Time": string;
  "End Time": string;
  "Home Team Name": string;
  "Away Team Name": string;
  "Name": string;
  Venue: string;
  Status: string;
  Comments: string;
  "Team Names": string;
};

export type TimeslotItem = {
  venue: string;
  date: string;
  "startTime": string;
  "endTime": string;
};

export interface CalendarEvent {
  type: string;
  id: number;
  uid: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  homeTeam: string;
  awayTeam: string;
  name: string;
  venue: string;
  status: string;
  comments: string;
}