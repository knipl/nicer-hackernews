/**
 * HackerNews API Types
 * Based on https://github.com/HackerNews/API
 */

export type ItemType = 'job' | 'story' | 'comment' | 'poll' | 'pollopt';

export interface Item {
  id: number;
  deleted?: boolean;
  type: ItemType;
  by: string;
  time: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
}

export interface Story extends Item {
  type: 'story';
  title: string;
  score: number;
  descendants: number;
  url?: string;
}

export interface Comment extends Item {
  type: 'comment';
  text: string;
  parent: number;
}

export interface User {
  id: string;
  created: number;
  karma: number;
  about?: string;
  submitted?: number[];
}

export interface APIResponse<T> {
  data: T;
  error?: string;
  loading?: boolean;
}

// API Service Types
export interface HackerNewsAPI {
  getTopStories(): Promise<number[]>;
  getNewStories(): Promise<number[]>;
  getItem(id: number): Promise<Item>;
  getUser(id: string): Promise<User>;
}

// State Types
export interface StoryState {
  stories: Story[];
  loading: boolean;
  error: string | null;
  page: number;
  totalStories: number;
}

export type StoryFilter = 'top' | 'new';