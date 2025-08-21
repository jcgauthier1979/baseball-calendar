// Helpers
import * as Consts from "./consts";

export function filterTeamName(name : string) {
  var separatorPos = name.indexOf(",");

  // Ignore second team name
  if (separatorPos > 0) {
    name = name.substring(0, separatorPos);
  }
  
  var pos = name.indexOf(" - Masculin");
  if (pos > 0) {
    name = name.substring(0, pos);
  }

  return name;
}

export function filterSecondTeamName(name : string) {
  var separatorPos = name.indexOf(",");

  if (separatorPos > 0) {
    name = name.substring(separatorPos + 1);

    var pos = name.indexOf(" - Masculin");
    if (pos > 0) {
      name = name.substring(0, pos);
    }
  }
  else {
    name = "";
  }

  return name;
}

export function filterVenue(name : string) {
  // Remove venue specific prefix
  var pos = name.lastIndexOf("Parc ");

  if (pos != -1) {
    name = name.substring(pos + 5);
  }

  // Custom
  name = name.replace(" - Terrain Longue-Allée", "");
  name = name.replace(" - Terrain Thibault", "");
  name = name.replace(" - Terrain J. A. Perkins", "");

  // Remove timeslot suffix
  name = name.replace(Consts.TIMESLOT_EVENT_TYPE, "");
  return name;
}

export function formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');

  return `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`;
}

export function formatISODate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function dateMonthStart(date: Date): Date {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  return new Date(`${year}-${month}-01T00:00:00.000-04:00`);
}

export function getCsvDate(rawDate: string) : string {
  if (rawDate.includes("/")) {
    // Convert
    rawDate = `${rawDate.substring(6, 10)}-${rawDate.substring(3, 5)}-${rawDate.substring(0, 2)}`
  }
  return  rawDate;
}

export function removeFirstLine(text: string): string {
  const firstNewlineIndex = text.indexOf('\n');

  if (firstNewlineIndex === -1) {
    // If no newline character is found, the string has only one line or is empty
    return ''; 
  } else {
    // Return the string starting from the character after the first newline
    return text.slice(firstNewlineIndex + 1);
  }
}