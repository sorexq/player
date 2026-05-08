export const getPlyrOptions = () => ({
  keyboard: { space: false },
  muted: false,
  autoplay: false,
  controls: ['play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'captions', 'settings', 'fullscreen'],
  settings: ['captions', 'audioTrack', 'speed']
});

export const initLongPressSpacebar = (player: any) => {
  let isLongPress = false;
  let pressTimer: NodeJS.Timeout;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space' && e.target === document.body) {
      e.preventDefault();
      if (!isLongPress) {
        pressTimer = setTimeout(() => {
          isLongPress = true;
          player.speed(2);
        }, 500);
      }
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'Space' && e.target === document.body) {
      e.preventDefault();
      clearTimeout(pressTimer);
      if (isLongPress) {
        player.speed(1);
        isLongPress = false;
      } else {
        player.paused ? player.play() : player.pause();
      }
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
    clearTimeout(pressTimer);
  };
};
