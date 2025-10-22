import type { Story } from '../types/hackernews';
import { StoryCard } from './StoryCard';

interface StoryListProps {
  stories: Story[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function StoryList({ stories, loading, error, hasMore, onLoadMore }: StoryListProps) {
  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded">
        Error loading stories: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {stories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>

      {loading && (
        <div className="p-4 text-center text-gray-600">
          Loading more stories...
        </div>
      )}

      {!loading && hasMore && (
        <div className="text-center pt-4">
          <button
            onClick={onLoadMore}
            className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors"
          >
            Load More Stories
          </button>
        </div>
      )}

      {!loading && !hasMore && stories.length > 0 && (
        <div className="p-4 text-center text-gray-600">
          No more stories to load
        </div>
      )}
    </div>
  );
}