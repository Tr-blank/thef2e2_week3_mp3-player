export const timeFormat = time => {
  const temp = Math.ceil(time)
  let minute = Math.floor(temp / 60)
  minute = (minute < 10 ? '0' : '') + minute
  let second = Math.floor(temp % 60)
  second = (second < 10 ? '0' : '') + second
  return minute + ':' + second
}
