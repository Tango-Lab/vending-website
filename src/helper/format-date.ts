import moment from 'moment';

export function formatDisplayDate(date: string | null, format = 'DD-MM-YYYY') {
  if (isValidDate(date)) {
    return '';
  }
  return moment(date).format(format);
}

export function formatDateForForm(date: string | null, format = 'YYYY-MM-DD') {
  if (isValidDate(date)) {
    return '';
  }
  return moment(date).format(format);
}

function isValidDate(date: string | null) {
  return !date || !moment(date).isValid;
}

export function getWeekRange(date: Date): { start: string; end: string } {
  const dayOfWeek = date.getDay();

  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - dayOfWeek);
  const start = formatDisplayDate(String(startOfWeek));

  const endOfWeek = new Date(date);
  endOfWeek.setDate(date.getDate() + (6 - dayOfWeek));
  const end = formatDisplayDate(String(endOfWeek));

  return { start: start, end: end };
}

export function getMonthRange(date: Date): { start: string; end: string } {
  const year = date.getFullYear();
  const month = date.getMonth();

  const startOfMonth = new Date(year, month, 1);
  const start = String(startOfMonth);
  const endOfMonth = new Date(year, month + 1, 0);
  const end = String(endOfMonth);

  return {
    start: formatDisplayDate(start),
    end: formatDisplayDate(end),
  };
}
