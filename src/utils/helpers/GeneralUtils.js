import moment from 'moment';

export function formatDateToMMDDYYYYFormat(date) {
  if (date === null || date === undefined) {
    return '';
  }
  return moment(date).format('MM/DD/YYYY');
}
