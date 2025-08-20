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

// Based on the EN version
export type TimeSlotCsvRow = {
  Date: string;
  "Start Time": string;
  "End Time": string;
  "Field (Alias)": string;
  Field: string;
  Venue: string;
  "Event Type": string;
  Identifier: string;
  Organisation: string;
  "Secondary Organization": string
  Schedule: string;
  Category: string;
  "Home Team": string;
  "Visitor Team": string;
  "Practice Teams": string;
  "Practice Type": string;
  "Timeslot Type": string;
  "Timeslot Sub Type": string;
  "Timeslot Shared League": string;
  "Timeslot Category Restrictions": string;
  Comments: string;
  Notes: string;
}

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