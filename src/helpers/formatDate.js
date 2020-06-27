// 2020-06-27T22:15:06.247Z
// 01234567890123456789
export function FormatDate(date) {
  const monthName = new Map();

  monthName["01"] = "January";
  monthName["02"] = "February";
  monthName["03"] = "March";
  monthName["04"] = "April";
  monthName["05"] = "May";
  monthName["06"] = "June";
  monthName["07"] = "July";
  monthName["08"] = "August";
  monthName["09"] = "September";
  monthName["10"] = "October";
  monthName["11"] = "November";
  monthName["12"] = "December";

  this.year = date.substring(0, 4);
  this.month = date.substring(5, 7);
  this.monthString = monthName[this.month];
  this.day = date.substring(8, 10);
  this.time = date.substring(11, 16);
  this.date = `${this.day} ${this.monthString} ${this.year}`;
  this.dateTime = `${this.date} at ${this.time}`;

  return this;
}
