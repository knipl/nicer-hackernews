import formatTimeAgo from '../utils/dateFormat';
import type { Story } from '../types/hackernews';

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const hostname = story.url ? new URL(story.url).hostname : null;
  const timeAgo = formatTimeAgo(story.time);

  return (
    <article className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {story.url ? (
              <a 
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-600 transition-colors"
              >
                {story.title}
              </a>
            ) : (
              <span>{story.title}</span> // No link available
            )}
          </h2>
          
          <div className="mt-1 text-sm text-gray-500 space-x-2">
            <span>{story.score} points</span>
            <span>•</span>
            <span>by {story.by}</span>
            <span>•</span>
            <span>{timeAgo}</span>
            {hostname && (
              <>
                <span>•</span>
                <span className="text-gray-400">{hostname}</span>
              </>
            )}
          </div>
          
          <div className="mt-2 text-sm">
            {story.descendants !== undefined && (
              <a 
                href={`https://news.ycombinator.com/item?id=${story.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                {story.descendants} comments
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}