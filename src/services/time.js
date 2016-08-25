export function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000)
}

export function getDateFromTimestamp(timestamp) {
  const date = new Date(timestamp*1000)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const year = date.getFullYear()
  const month = months[date.getMonth()]
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = `0${date.getMinutes()}`

  return `${day}/${month}/${year} ${hours}:${minutes.substr(-2)}`
}
