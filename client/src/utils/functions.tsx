export const formatDateFromString = (dateStr: string | undefined) => {
  if (dateStr === undefined) return ''
  const trimmedString = dateStr.split(' ').slice(1, 4).join(' ')
  return trimmedString
}
