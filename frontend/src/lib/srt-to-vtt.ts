export function srtToVtt(srt: string): string {
  let vtt = 'WEBVTT\n\n';
  const lines = srt.split('\n');
  let i = 0;

  while (i < lines.length) {
    if (lines[i].trim() === '') {
      i++;
      continue;
    }

    // Skip sequence number
    i++;

    const timeLine = lines[i];
    if (!timeLine) break;
    
    const timeParts = timeLine.replace(',', '.').split(' --> ');
    if (timeParts.length !== 2) {
      i++;
      continue;
    }
    
    const startTime = timeParts[0];
    const endTime = timeParts[1];
    i++;

    let text = '';
    while (i < lines.length && lines[i].trim() !== '') {
      text += lines[i] + '\n';
      i++;
    }

    vtt += `${startTime} --> ${endTime}\n${text}\n`;
  }

  return vtt;
}
