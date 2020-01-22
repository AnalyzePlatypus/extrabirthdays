/*

1m, 34h

1 minute, 34 hours

1m ago, 1m from now

options.amountOnly
options.displayMode = "full" | "short" | "tiny"
options.sign = "none" -> "1 week" | "1 week"
               "math" -> "+ 1 week" | "- 1 week"
               "text" -> "in 1 week" | "1 week ago"

*/


// Matches:
// YYYY-MM-DDTHH:MM
// YYYY-MM-DDTHH:MM:SS
// YYYY-MM-DDTHH:MM:SS+HH:MM
const VALID_DATETIME_STRING_REGEX = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}(:[0-9]{2})?(\+[0-9]{2}:[0-9]{2})?/


const timePeriods = {
  MINUTE: {
    full: " minute",
    short: " min.",
    tiny: "m"
  },
  HOUR: {
    full: " hour",
    short: " hr.",
    tiny: "h"
  },
  DAY: {
    full: " day",
    short: " d",
    tiny: "d"
  },
  WEEK: {
    full: " week",
    short: " week",
    tiny: "w"
  },
  MONTH: {
    full: " month",
    short: " mo.",
    tiny: "mo."
  },
  YEAR: {
    full: " year",
    short: " yr.",
    tiny: "y"
  }
}

const defaultOptions = {
  amountOnly: false,
  displayMode: "short"
}


function format(amount, unit, options) {

  amount = Math.round(amount)
  // const isPlural = (!options.displayMode === "tiny" && (
  //   options.displayMode === "full" || unit === "DAY" || unit === "WEEK" || unit === "YEAR")
  //  ) &&  amount > 1;
  const isPlural = (amount > 1) && (options.displayMode === "full");

  const formattedUnit = timePeriods[unit][options.displayMode] + (isPlural ? "s" : "");
  return amount + formattedUnit;
}


// Takes two `Date`, (or parsable date-strings. Converted with `new Date()`) and an options object
export function timeDifference(previous, current, options) {
  
  if(!(current instanceof Date)) {
    //if(!current.match(VALID_DATETIME_STRING_REGEX)) throw "Invalid datetime string \"" + current + "\"";
    current = new Date(current);
  }
  if(!(previous instanceof Date)) {
    //if(!previous.match(VALID_DATETIME_STRING_REGEX)) throw "Invalid datetime string \"" + previous +  "\"";
    previous = new Date(previous);
  }

  options = {
    ...defaultOptions,
    ...options
  }

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerWeek = msPerDay * 7;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;


  let isFuture = (current - previous) < 0;
  const isPast = !isFuture;

  let elapsedMs = Math.abs(current - previous);
  let amountAndUnit;
  
  if (elapsedMs < msPerMinute) {
      //  return Math.round(elapsedMs/1000) + 's ago';   
      return "Just now";
  }

  else if (elapsedMs < msPerHour) {
    amountAndUnit = format(elapsedMs/msPerMinute, "MINUTE", options);
  }

  else if (elapsedMs < msPerDay ) {
    amountAndUnit = format(elapsedMs/msPerHour, "HOUR", options);
  }

  else if (elapsedMs < msPerWeek ) {
    amountAndUnit = format(elapsedMs/msPerDay, "DAY", options);
  }

  else if (elapsedMs < msPerMonth) {
    amountAndUnit = format(elapsedMs/msPerWeek, "WEEK", options);
  }

  else if (elapsedMs < msPerYear) {
    amountAndUnit = format(elapsedMs/msPerMonth, "MONTH", options);
  }

  else {
    amountAndUnit = format(elapsedMs/msPerYear, "YEAR", options);
  }

  if(options && options.amountOnly) {
    return amountAndUnit;
  }

  const hasMathSign = options.sign === 'math';
  const hasTextSign = options.sign === 'text';

  const mathSign = hasMathSign ? (isPast ? "-" : "+") : "";
  const textPastSign = hasTextSign && isPast ? " ago" : "";
  const textFutureSign = hasTextSign && isFuture ? "in " : "";

  return textFutureSign + mathSign + amountAndUnit + textPastSign
}

export default timeDifference;