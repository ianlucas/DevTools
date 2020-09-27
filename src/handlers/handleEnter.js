export default function handleEnter (fn) {
  return function (e) {
    if (e.key === 'Enter') {
      return fn(e)
    }
  }
}
