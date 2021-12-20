import { Timestamp } from "@firebase/firestore";

/**
 * generates a firestore auto id (a uuid) for use in setting a new doc when you
 * don't care what the doc.id is.
 *
 * @returns an autoID for use in setting a new doc.
 */
export function firestoreAutoId(): string {
  const CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let autoId = "";

  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return autoId;
}

/**
 * Takes an output from Timestamp.getTime().toDate().getHours().toString()
 * and converts that output from 24h time format to 12h time format.
 *
 * @param hoursString <string> corresponding to hours in 24h format
 * @returns <string> the hour string converted to 12h format
 */
export function convert24hTime(hoursString: string) {
  const hoursNum = parseInt(hoursString);
  if (["0", "24"].indexOf(hoursString) > -1) {
    return "12";
  }
  if (hoursNum < 12) return hoursNum.toString();
  return (hoursNum - 12).toString();
}
/**
 * Takes an arbitrary number of milliseconds and returns a string that says
 * how many seconds/hours/minutes/days ago the number of milliseconds represents.
 *
 * Examples:
 * ```
 * convertMillisToTimeAgo(12): "now"
 * convertMillisToTimeAgo(122): "now"
 * convertMillisToTimeAgo(1222): "1s ago"
 * convertMillisToTimeAgo(12222): "12s ago"
 * convertMillisToTimeAgo(122222): "2m ago"
 * etc...
 * ```
 *
 * @param seconds <number> number of milliseconds to convert
 * @returns <string> a string representing how many s/m/h/d the
 * milliseconds number is plus "[s|m|h|d] ago"
 */
export function convertMillisToTimeAgo(milliseconds: number) {
  if (milliseconds < 0) throw Error("number of seconds must be greater than 0");
  const asSeconds = Math.round(milliseconds / 1000);
  const asMinutes = Math.round(asSeconds / 60);
  const asHours = Math.round(asMinutes / 60);
  const asDays = Math.round(asHours / 24);
  if (asDays < 1) {
    if (asHours < 1) {
      if (asMinutes < 1) {
        if (asSeconds < 1) {
          return `now`;
        }
        return `${asSeconds}s ago`;
      }
      return `${asMinutes}m ago`;
    }
    return `${asHours}h ago`;
  }
  return `${asDays}d ago`;
}

/**
 * returns the milliseconds time value for a Timestamp. i.e. returns `{Timestamp}.toDate().getTime()`.
 *
 * @param timestamp <Timestamp> a Timestamp object.
 * @returns <number> the milliseconds time value for the Timestamp.
 */
export function getTimeInMillis(timestamp: Timestamp | any) {
  return timestamp.toDate().getTime();
}

/**
 * creates a nested field path string from passed args.
 * example:
 * `nestedFieldPath(['path','to','field'])
 *    => 'path.to.field'
 * `
 * @param params <string[]> a list of path names to join
 * @returns a nested field path string
 */
export function nestedFieldPath([...args]: string[]) {
  return [...args].join(".");
}
