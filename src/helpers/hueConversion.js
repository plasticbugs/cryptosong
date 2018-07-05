
const momentHoliday = require('moment-holiday');

const daysIntoYear = (date) => {
  // Jan 1 is day 1. And if there's a leap day... it figures it out
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

const rootDir = __dirname + "/../../";
const layers = rootDir + "build/artlayers"; 

const whichYear = (date) => {
  // Determine which year it is. Simple math because it started in 2009
  const theYear = date.getFullYear();
  return (theYear + 1) - 2009;
}

const leapYear = (date) => {
  //   If there is a feb 29th... it's a leap year
  const year = date.getFullYear();
  const result = new Date(year, 1, 29).getMonth() == 1;
  return result
 }

momentHoliday.modifyHolidays.add({
  "Birthday": {
    date: '4/9',
    keywords: ['my', 'birthday']
  }
});

 
 module.exports.getHueForDate = (date) => {
  const year = whichYear(date)
  const dayOfYear = daysIntoYear(date)
  let holidays;
  let isLeapYear;
  let holiday;
  if (leapYear(date)) {
    holidays = [100];
    isLeapYear = 1;
  } else {
    // standard holiday days
    holidays = [99];
    isLeapYear = 0;
  }
  //check for holidays
  if (momentHoliday(date).isHoliday('Birthday')){
    return layers + "/special_birthday.png";
  }
  if (momentHoliday(date).isHoliday('Thanksgiving')){
    return layers + "/special_thanksgiving.png";
  }
  if (momentHoliday(date).isHoliday('Halloween')){
    return layers + "/special_halloween.png";
  }
  if (momentHoliday(date).isHoliday('Christmas')){
    return layers + "/special_christmas.png";
  }
  if (momentHoliday(date).isHoliday('New Years Eve')){
    return layers + "/special_newyearseve.png";
  }

  let dayOfYearAdjusted = dayOfYear;
  if ( dayOfYear > 60 && isLeapYear ) {
    // If it's a leap year, after Feb 29th, add a day?
    dayOfYearAdjusted = dayOfYearAdjusted - isLeapYear
  }
  if ( dayOfYear > 99 + isLeapYear ) {
    dayOfYearAdjusted = dayOfYearAdjusted - 1
  }
  if ( dayOfYear > 185 + isLeapYear ) {
    dayOfYearAdjusted = dayOfYearAdjusted - 1
  }
  if ( dayOfYear > 304 + isLeapYear ) {
    dayOfYearAdjusted = dayOfYearAdjusted - 1
  }
  if ( dayOfYear > 359 + isLeapYear ) {
    dayOfYearAdjusted = dayOfYearAdjusted - 1
  }
  if ( dayOfYear > 365 + isLeapYear ) {
    // This shouldn't happen
    dayOfYearAdjusted = dayOfYearAdjusted - 1
  }
  return `hsl(${359 - ( dayOfYearAdjusted + 119 ) % 360}), 100%, 90%`;

}
