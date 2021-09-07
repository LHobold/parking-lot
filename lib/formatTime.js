export default function formatTime(timeInMiliseconds) {
  let h, m;
  h = Math.floor(timeInMiliseconds / 1000 / 60 / 60);
  m = Math.floor((timeInMiliseconds / 1000 / 60 / 60 - h) * 60);
  m = `${m < 10 ? '0' : ''}${m}`;
  h = `${h < 10 ? '0' : ''}${h}`;

  return `${h}:${m}`;
}
