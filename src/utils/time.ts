import dayjs from 'dayjs'

const renderDateAsHour = (date: dayjs.Dayjs) => {
  return dayjs(date).format('HH:mm')
}

// export const parseISODateString = (date: string) => {
//   return dayjs(date)
// }

export const renderDateRangeAsHour = (
  startdate: dayjs.Dayjs,
  enddate: dayjs.Dayjs
) => {
  return `${renderDateAsHour(startdate)} - ${renderDateAsHour(enddate)}`
}
