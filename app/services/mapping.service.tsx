import moment from 'moment';

export function toDateTime(date?: any) {
  if (!date) return;
  const newDate = date?.toDate ? date?.toDate() : date;
  let dateFormat1 = moment(newDate).format('DD MMM YYYY');
  return dateFormat1;
}
