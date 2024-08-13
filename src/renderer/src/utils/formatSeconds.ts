
export default function formatSeconds(totalSeconds: number) {
  totalSeconds = Math.round(totalSeconds);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  let minStr = hours ? `${String(minutes).padStart(2, '0')}:` : `${minutes}:`;
  let secStr = String(seconds).padStart(2, '0');

  return `${hours ? `${hours}:` : ''}${minStr}${secStr}`;
}