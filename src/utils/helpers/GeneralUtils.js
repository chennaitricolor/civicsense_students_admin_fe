import moment from 'moment';

export function formatDateToMMDDYYYYFormat(date) {
  if (date === null || date === undefined) {
    return '';
  }
  return moment(date).format('MM/DD/YYYY');
}

export function formatDateToDDMMYYYYFormat(date) {
  if (date === null || date === undefined) {
    return '';
  }
  return moment(date).format('DD-MM-YYYY');
}

export const isSameDates = (date1, date2) => {
  return moment(date1).isSame(date2);
};
