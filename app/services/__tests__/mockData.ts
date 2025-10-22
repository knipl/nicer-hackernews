import type { Story } from "~/types/hackernews";

export const mockStoryIds = [1, 2, 3, 4, 5];

export const mockStory: Story = {
  id: 1,
  title: "Test Story",
  url: "https://example.com",
  score: 100,
  by: "testuser",
  time: Math.floor(Date.now() / 1000),
  descendants: 50,
  type: "story"
};

export const mockStories: Story[] = [
  mockStory,
  {
    ...mockStory,
    id: 2,
    title: "Another Test Story",
    score: 200
  },
  {
    ...mockStory,
    id: 3,
    title: "Yet Another Test Story",
    score: 300
  }
];