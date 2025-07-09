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

  // Other
  name = name.replace(" - Terrain Baseball", "");
  name = name.replace(" - Cage frappeurs", " (Cage)");

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