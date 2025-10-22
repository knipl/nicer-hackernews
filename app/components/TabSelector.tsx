import type { StoryFilter } from '../types/hackernews';

interface TabSelectorProps {
  currentFilter: StoryFilter;
  onFilterChange: (filter: StoryFilter) => void;
}

export function TabSelector({ currentFilter, onFilterChange }: TabSelectorProps) {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
      <button
        onClick={() => onFilterChange('top')}
        className={`px-4 py-2 rounded-md transition-colors ${
          currentFilter === 'top'
            ? 'bg-white text-orange-600 shadow'
            : 'text-gray-600 hover:text-orange-600'
        }`}
      >
        Top Stories
      </button>
      <button
        onClick={() => onFilterChange('new')}
        className={`px-4 py-2 rounded-md transition-colors ${
          currentFilter === 'new'
            ? 'bg-white text-orange-600 shadow'
            : 'text-gray-600 hover:text-orange-600'
        }`}
      >
        New Stories
      </button>
    </div>
  );
}