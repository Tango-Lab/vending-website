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
