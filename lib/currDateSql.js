export default function currDateSql() {
  const pad = function (num) {
    return ('00' + num).slice(-2);
  };

  let date;
  date = new Date();
  date =
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    ' ' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds());

  return date;
}
