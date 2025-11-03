import { describe, it, expect } from 'vitest';
import { missionSchema } from './mission.js';

describe('missionSchema', () => {
  it('validates mission data', () => {
    const parsed = missionSchema.parse({ title: 'Mission' });
    expect(parsed.title).toBe('Mission');
  });
});
