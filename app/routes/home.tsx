import type { Route } from "./+types/home";
import { useHackerNews } from "../hooks/useHackerNews";
import { StoryList } from "../components/StoryList";
import { TabSelector } from "../components/TabSelector";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nicer Hacker News" },
    { name: "description", content: "A modern Hacker News client" },
  ];
}

export default function Home() {
  const {
    stories,
    loading,
    error,
    hasMore,
    filter,
    changeFilter,
    loadMore
  } = useHackerNews();

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">
          Nicer Hacker News
        </h1>
        <TabSelector
          currentFilter={filter}
          onFilterChange={changeFilter}
        />
      </header>

      <StoryList
        stories={stories}
        loading={loading}
        error={error}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </main>
  );
}
