/**
 * @method formatHour
 * @description Formats date parts lesser than 10
 * @param {any[]} number
 * @returns {any[]} - full hour
 */
export default function(arg) {
  let fullArg

  if (arg < 10) {
    fullArg = `0${arg}`
  } else {
    fullArg = arg
  }

  return fullArg
}
