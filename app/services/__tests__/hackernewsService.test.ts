import { describe, expect, it, vi, beforeEach } from 'vitest';
import { HackerNewsService } from '../hackernewsService';
import type { Story, Item } from '../../types/hackernews';

describe('HackerNewsService', () => {
  let service: HackerNewsService;

  beforeEach(() => {
    service = new HackerNewsService();
    vi.clearAllMocks();
  });

  describe('getStories', () => {
    it('should fetch and filter stories correctly', async () => {
      // Mock implementation
      const mockStory: Story = {
        id: 1,
        title: 'Test Story',
        type: 'story',
        time: 1234567890,
        by: 'testuser',
        url: 'http://example.com',
        score: 100,
        descendants: 0
      };

      const mockComment: Item = {
        id: 2,
        title: 'Test Comment',
        type: 'comment',
        time: 1234567890,
        by: 'testuser',
        score: 0,
        descendants: 0
      };

      const mockDeadStory: Story = {
        ...mockStory,
        id: 3,
        dead: true
      };

      // Mock getItem to return different types of items
      vi.spyOn(service, 'getItem')
        .mockResolvedValueOnce(mockStory)         // Valid story
        .mockResolvedValueOnce(mockComment)       // Comment (should be filtered)
        .mockResolvedValueOnce(mockDeadStory);    // Dead story (should be filtered)

      const result = await service.getStories([1, 2, 3]);

      // Should only return valid stories
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockStory);
      expect(service.getItem).toHaveBeenCalledTimes(3);
    });

    it('should respect the limit parameter', async () => {
      // Mock implementation
      const mockStory: Story = {
        id: 1,
        title: 'Test Story',
        type: 'story',
        time: 1234567890,
        by: 'testuser',
        url: 'http://example.com',
        score: 100,
        descendants: 0
      };

      vi.spyOn(service, 'getItem').mockResolvedValue(mockStory);

      const result = await service.getStories([1, 2, 3, 4, 5], 2);

      expect(result).toHaveLength(2);
      expect(service.getItem).toHaveBeenCalledTimes(2);
    });
  });

  describe('getStoriesPage', () => {
    it('should fetch and paginate top stories correctly', async () => {
      // Mock stories list
      const mockIds = Array.from({ length: 100 }, (_, i) => i + 1);
      vi.spyOn(service, 'getTopStories').mockResolvedValue(mockIds);

      // Mock story content
      const mockStory: Story = {
        id: 1,
        title: 'Test Story',
        type: 'story',
        time: 1234567890,
        by: 'testuser',
        url: 'http://example.com',
        score: 100,
        descendants: 0
      };

      // Mock getItem to always return a valid story
      vi.spyOn(service, 'getItem').mockResolvedValue(mockStory);

      // Get second page (should get items 30-59)
      const result = await service.getStoriesPage(2, 'top');

      expect(result.total).toBe(100); // Total number of stories
      expect(result.stories).toHaveLength(30); // Page size
      expect(service.getTopStories).toHaveBeenCalledTimes(1);
      expect(service.getItem).toHaveBeenCalledTimes(30);
    });

    it('should fetch and paginate new stories correctly', async () => {
      // Mock stories list
      const mockIds = Array.from({ length: 50 }, (_, i) => i + 1);
      vi.spyOn(service, 'getNewStories').mockResolvedValue(mockIds);

      // Mock story content
      const mockStory: Story = {
        id: 1,
        title: 'Test Story',
        type: 'story',
        time: 1234567890,
        by: 'testuser',
        url: 'http://example.com',
        score: 100,
        descendants: 0
      };

      // Mock getItem to always return a valid story
      vi.spyOn(service, 'getItem').mockResolvedValue(mockStory);

      // Get first page
      const result = await service.getStoriesPage(1, 'new');

      expect(result.total).toBe(50); // Total number of stories
      expect(result.stories).toHaveLength(30); // Page size
      expect(service.getNewStories).toHaveBeenCalledTimes(1);
      expect(service.getItem).toHaveBeenCalledTimes(30);
    });
  });
});


