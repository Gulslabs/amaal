export function getWeekBounds(givenDate: Date): {
  startOfWeek: string;
  endOfWeek: string;
} {
  // input dateString expected format: '2024-05-29';
  const inputDate = new Date(givenDate); // Clone the input date to avoid mutating the original date
  const dayOfWeek = inputDate.getDay(); //Get the day of the week (0 = Sunday, 6 = Saturday)

  const startOfWeek = new Date(inputDate);
  startOfWeek.setDate(inputDate.getDate() - dayOfWeek);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return {
    startOfWeek: formatDate(startOfWeek),
    endOfWeek: formatDate(endOfWeek),
  };
}

/**
 * Utility function to format dates to "yyyy-mm-dd"
 * @param date
 * @returns
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
