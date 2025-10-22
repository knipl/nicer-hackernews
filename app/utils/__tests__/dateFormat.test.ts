import { describe, expect, it, vi, beforeEach } from 'vitest';
import formatTimeAgo from '../dateFormat';

describe('formatTimeAgo', () => {
  beforeEach(() => {
    // Mock Date.now() to return a fixed timestamp for consistent testing
    vi.spyOn(Date, 'now').mockImplementation(() => new Date('2025-10-22').getTime());
  });

  it('should format seconds correctly', () => {
    const now = Date.now() / 1000;
    expect(formatTimeAgo(now - 1)).toBe('1 seconds ago');
    expect(formatTimeAgo(now - 30)).toBe('30 seconds ago');
    expect(formatTimeAgo(now - 59)).toBe('59 seconds ago');
  });

  it('should format minutes correctly', () => {
    const now = Date.now() / 1000;
    expect(formatTimeAgo(now - 60)).toBe('1 minutes ago');
    expect(formatTimeAgo(now - 30 * 60)).toBe('30 minutes ago');
    expect(formatTimeAgo(now - 59 * 60)).toBe('59 minutes ago');
  });

  it('should format hours correctly', () => {
    const now = Date.now() / 1000;
    expect(formatTimeAgo(now - 60 * 60)).toBe('1 hours ago');
    expect(formatTimeAgo(now - 12 * 60 * 60)).toBe('12 hours ago');
    expect(formatTimeAgo(now - 23 * 60 * 60)).toBe('23 hours ago');
  });

  it('should format days correctly', () => {
    const now = Date.now() / 1000;
    expect(formatTimeAgo(now - 24 * 60 * 60)).toBe('1 days ago');
    expect(formatTimeAgo(now - 15 * 24 * 60 * 60)).toBe('15 days ago');
    expect(formatTimeAgo(now - 29 * 24 * 60 * 60)).toBe('29 days ago');
  });

  it('should format months correctly', () => {
    const now = Date.now() / 1000;
    expect(formatTimeAgo(now - 30 * 24 * 60 * 60)).toBe('1 months ago');
    expect(formatTimeAgo(now - 6 * 30 * 24 * 60 * 60)).toBe('6 months ago');
    expect(formatTimeAgo(now - 11 * 30 * 24 * 60 * 60)).toBe('11 months ago');
  });

  it('should format years correctly', () => {
    const now = Date.now() / 1000;
    expect(formatTimeAgo(now - 365 * 24 * 60 * 60)).toBe('1 years ago');
    expect(formatTimeAgo(now - 2 * 365 * 24 * 60 * 60)).toBe('2 years ago');
    expect(formatTimeAgo(now - 5 * 365 * 24 * 60 * 60)).toBe('5 years ago');
  });

  it('should handle boundary conditions correctly', () => {
    const now = Date.now() / 1000;
    
    // Just before transitioning to the next unit
    expect(formatTimeAgo(now - 59)).toBe('59 seconds ago');
    expect(formatTimeAgo(now - 59 * 60)).toBe('59 minutes ago');
    expect(formatTimeAgo(now - 23 * 60 * 60)).toBe('23 hours ago');
    expect(formatTimeAgo(now - 29 * 24 * 60 * 60)).toBe('29 days ago');
    expect(formatTimeAgo(now - 11 * 30 * 24 * 60 * 60)).toBe('11 months ago');
  });
});