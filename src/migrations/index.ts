import * as migration_20260319_035712_video_thumbnail from './20260319_035712_video_thumbnail';
import * as migration_20260612_215231_scorecard_leads from './20260612_215231_scorecard_leads';

export const migrations = [
  {
    up: migration_20260319_035712_video_thumbnail.up,
    down: migration_20260319_035712_video_thumbnail.down,
    name: '20260319_035712_video_thumbnail',
  },
  {
    up: migration_20260612_215231_scorecard_leads.up,
    down: migration_20260612_215231_scorecard_leads.down,
    name: '20260612_215231_scorecard_leads'
  },
];
