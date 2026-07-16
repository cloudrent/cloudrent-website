import * as migration_20260319_035712_video_thumbnail from './20260319_035712_video_thumbnail';
import * as migration_20260630_235735_roadmap_items from './20260630_235735_roadmap_items';
import * as migration_20260716_052634_quick_links from './20260716_052634_quick_links';
import * as migration_20260716_053000_seed_quick_links from './20260716_053000_seed_quick_links';

export const migrations = [
  {
    up: migration_20260319_035712_video_thumbnail.up,
    down: migration_20260319_035712_video_thumbnail.down,
    name: '20260319_035712_video_thumbnail',
  },
  {
    up: migration_20260630_235735_roadmap_items.up,
    down: migration_20260630_235735_roadmap_items.down,
    name: '20260630_235735_roadmap_items',
  },
  {
    up: migration_20260716_052634_quick_links.up,
    down: migration_20260716_052634_quick_links.down,
    name: '20260716_052634_quick_links'
  },
  {
    up: migration_20260716_053000_seed_quick_links.up,
    down: migration_20260716_053000_seed_quick_links.down,
    name: '20260716_053000_seed_quick_links'
  },
];
