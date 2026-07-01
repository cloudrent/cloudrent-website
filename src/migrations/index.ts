import * as migration_20260319_035712_video_thumbnail from './20260319_035712_video_thumbnail';
import * as migration_20260630_235735_roadmap_items from './20260630_235735_roadmap_items';

export const migrations = [
  {
    up: migration_20260319_035712_video_thumbnail.up,
    down: migration_20260319_035712_video_thumbnail.down,
    name: '20260319_035712_video_thumbnail',
  },
  {
    up: migration_20260630_235735_roadmap_items.up,
    down: migration_20260630_235735_roadmap_items.down,
    name: '20260630_235735_roadmap_items'
  },
];
