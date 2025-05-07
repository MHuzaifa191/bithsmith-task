"use client";

import { useEffect, useState } from 'react';

// Define Story type
type Story = {
  id: number;
  title: string;
  url: string;
  by: string;
  time: number;
  score: number;
  descendants: number;
};

const HomePage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        // Fetch top story IDs from HackerNews
        const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
        const topStoryIds: number[] = await res.json();
        
        // Fetch details of the first 18 top stories
        const storyPromises = topStoryIds.slice(0, 18).map(async (id) => {
          const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
          return await res.json();
        });
        
        const fetchedStories = await Promise.all(storyPromises);
        setStories(fetchedStories);
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Format timestamp to "X hours/minutes ago"
  const formatTime = (timestamp: number) => {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;
    
    if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diff / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  // Extract domain from URL
  const getDomain = (url: string) => {
    try {
      if (!url) return '';
      const domain = new URL(url).hostname;
      return `(${domain})`;
    } catch {
      return '';
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen font-sans pt-4">
      <div className="w-full max-w-4xl bg-gray-10">
      {/* Header */}
      <div className="bg-orange-500 flex items-center p-1">
        <div className="flex items-center">
          <div className="bg-white border border-white w-5 h-5 flex items-center justify-center text-orange-500 font-bold mx-1">Y</div>
          <span className="font-bold">Hacker News</span>
        </div>
        <nav className="ml-2 flex space-x-2 text-sm">
          <a href="#" className="hover:underline">new</a>
          <span>|</span>
          <a href="#" className="hover:underline">past</a>
          <span>|</span>
          <a href="#" className="hover:underline">comments</a>
          <span>|</span>
          <a href="#" className="hover:underline">ask</a>
          <span>|</span>
          <a href="#" className="hover:underline">show</a>
          <span>|</span>
          <a href="#" className="hover:underline">jobs</a>
          <span>|</span>
          <a href="#" className="hover:underline">submit</a>
        </nav>
        <div className="ml-auto">
          <a href="#" className="text-sm hover:underline">login</a>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 bg-gray-50">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ol className="list-decimal list-inside">
            {stories.map((story, index) => (
              <li key={story.id} className="text-sm my-1 ml-3">
                <div className="inline-block align-top">
                  <a href={story.url} className="text-black font-medium hover:underline">
                    {story.title}
                  </a>
                  {story.url && <span className="text-gray-500 text-xs ml-1">{getDomain(story.url)}</span>}
                </div>
                <div className="text-xs text-gray-500 ml-6">
                  {story.score} points by {story.by} {formatTime(story.time)} | hide | {story.descendants || 0} comments
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
      </div>
    </div>
  );
};

export default HomePage;