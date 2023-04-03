export function getDateToday() {
  const today = new Date();
  const month =
    today.getMonth() < 9
      ? `0${today.getMonth() + 1}`
      : `${today.getMonth() + 1}`;
  const day =
    today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`;
  return `${today.getFullYear()}-${month}-${day}`;
}
