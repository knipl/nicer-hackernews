import { useEffect, useState } from 'react';
import type { Story, StoryFilter, StoryState } from '../types/hackernews';
import { HackerNewsService } from '../services/hackernewsService';

const hackerNewsService = new HackerNewsService();

export function useHackerNews(initialFilter: StoryFilter = 'top') {
  console.log('Hook rendering...');

  const [state, setState] = useState<StoryState>({
    stories: [],
    loading: false,
    error: null,
    page: 1,
    totalStories: 0,
  });

  const [filter, setFilter] = useState<StoryFilter>(initialFilter);

  const loadStories = async (reset: boolean = false) => {
    console.log('loadStories called with reset:', reset);
    const newPage = reset ? 1 : state.page;
    
    if (!reset && state.stories.length >= state.totalStories) return;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      console.log('Fetching stories for page:', newPage, 'filter:', filter);
      const result = await hackerNewsService.getStoriesPage(newPage, filter)

      setState(prev => ({
        stories: reset ? result.stories : [...prev.stories, ...result.stories],
        loading: false,
        error: null,
        page: newPage + 1,
        totalStories: result.total,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load stories',
      }));
    }
  };

  const changeFilter = (newFilter: StoryFilter) => {
    console.log('changeFilter called with:', newFilter);
    setFilter(newFilter);
    setState(prev => ({ ...prev, stories: [], page: 1, totalStories: 0 }));
  };

  // Load stories on initial mount
  useEffect(() => {
    loadStories(true)
  }, [filter]);


  // Compute hasMore based on current stories count vs total available
  const hasMore = state.stories.length < state.totalStories;

  return {
    ...state,
    filter,
    hasMore,
    changeFilter,
    loadMore: () => loadStories(false),
    refresh: () => loadStories(true),
  };
}