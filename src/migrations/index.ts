import * as migration_20260319_035712_video_thumbnail from './20260319_035712_video_thumbnail';

export const migrations = [
  {
    up: migration_20260319_035712_video_thumbnail.up,
    down: migration_20260319_035712_video_thumbnail.down,
    name: '20260319_035712_video_thumbnail'
  },
];
