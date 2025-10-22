import axios from 'axios';
import type { HackerNewsAPI, Item, Story, User } from '../types/hackernews';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export class HackerNewsService implements HackerNewsAPI {
  private readonly PAGE_SIZE = 30;

  private async fetchJson<T>(path: string): Promise<T> {
    const response = await axios.get<T>(`${BASE_URL}${path}.json`);
    return response.data;
  }

  async getTopStories(): Promise<number[]> {
    return this.fetchJson<number[]>('/topstories');
  }

  async getNewStories(): Promise<number[]> {
    return this.fetchJson<number[]>('/newstories');
  }

  async getItem(id: number): Promise<Item> {
    return this.fetchJson<Item>(`/item/${id}`);
  }

  async getUser(id: string): Promise<User> {
    return this.fetchJson<User>(`/user/${id}`);
  }

  // Helper method to fetch multiple stories in parallel
  async getStories(ids: number[], limit: number = this.PAGE_SIZE): Promise<Story[]> {
    // Take only the first 'limit' stories
    const storyIds = ids.slice(0, limit);
    
    // Fetch all stories in parallel
    const stories = await Promise.all(
      storyIds.map(id => this.getItem(id))
    );

    // Filter out non-story items and items that are deleted or dead
    return stories.filter((item): item is Story => 
      item.type === 'story' && 
      !item.deleted && 
      !item.dead
    );
  }

  // Convenience method for pagination
  async getStoriesPage(page: number = 1, filter: 'top' | 'new'): Promise<{ stories: Story[]; total: number }> {
    console.log('getStoriesPage called with page:', page, 'filter:', filter);
    const allIds = filter === 'top' 
      ? await this.getTopStories()
      : await this.getNewStories();
    const start = (page - 1) * this.PAGE_SIZE;
    const pageIds = allIds.slice(start, start + this.PAGE_SIZE);
    const stories = await this.getStories(pageIds);
    return { stories, total: allIds.length };
  }
}