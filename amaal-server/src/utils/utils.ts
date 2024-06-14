export function getAllDatesBetweenInclusive(
  startDateStr: string,
  endDateStr: string,
): Date[] {
  const startDate = parseDateString(startDateStr);
  const endDate = parseDateString(endDateStr);
  if (startDate > endDate) {
    throw new Error('Start date must be earlier than or equal to the end date');
  }
  const dates: Date[] = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

/**
 *
 * @param startOfWeekStr: Sunday Date of any week.
 * @param pastWeeks: number of weeks to go backward; while deciding if its an active week.
 */
export function isActiveWeek(
  startOfWeekStr: string,
  pastWeeks: number,
): boolean {
  const startOfWeek = parseDateString(startOfWeekStr);
  // get the Current Week's Start of date
  const currentWeekStart = getStartOfWeek(new Date());
  // Initialize past week's start-of-date as current week's start-of-date.
  const pastWeeksStart = new Date(currentWeekStart);
  // going back number of days based of passWeeks parameter to determine past's start of week.
  pastWeeksStart.setDate(currentWeekStart.getDate() - pastWeeks * 7);
  // determine if given startofWeek falls under the two start of week date and only then its active.
  return startOfWeek >= pastWeeksStart && startOfWeek <= currentWeekStart;
}

/**
 *
 * @param date
 */
function getStartOfWeek(date: Date): Date {
  // always safe to copy.
  const startOfWeek = new Date(date);
  const dayOfWeek = startOfWeek.getDay();
  // this will ensure we return Sunday's Date i.e start of Week.
  startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
  return startOfWeek;
}

/**
 * No Validations peformed.
 * @param dateStr Only works for yyyy-mm-dd format.
 */
export function parseDateString(dateStr: string) {
  const parts = dateStr.split('-');
  return new Date(
    parseInt(parts[0]),
    parseInt(parts[1]) - 1,
    parseInt(parts[2]),
  );
}
//  Utility function to format dates to "yyyy-mm-dd"
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const dateStr = new Date(date).toLocaleDateString(undefined, options);
  const parts = dateStr.split('/');
  const result = `${parts[2]}-${parts[1]}-${parts[0]}`;
  return result;
}

export function initials(firstName: string, lastName: string): string {
  return firstName.at(0).toUpperCase()+lastName.at(0).toUpperCase()
}
