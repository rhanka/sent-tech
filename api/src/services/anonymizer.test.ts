import { describe, it, expect } from 'vitest';
import { anonymizeText } from './anonymizer.js';

describe('anonymizeText', () => {
  it('replaces patterns with defaults', () => {
    const result = anonymizeText('Projet pour Jean Dupont à Paris avec budget 100k€');
    expect(result.text).not.toContain('Jean Dupont');
    expect(result.substitutions.length).toBeGreaterThan(0);
  });
});
