// src/lib/fetchers.js
// NOTE: front-end should NOT call provider APIs directly in production (CORS, rate limits, API secrets).
// Use a small server/proxy or Next.js API routes to call external APIs securely.
// This file contains example client-side fetchers and mock fallback.

import axios from "axios";
import dayjs from "dayjs";

/**
 * Normalize into FeedItem:
 * {
 *   id, source, title, body, url, published_at, metrics: {...}
 * }
 */

export async function fetchHackerNewsTop({ limit = 10 } = {}) {
  // Use Algolia HN Search API (no key needed). Example endpoint:
  // https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=10
  try {
    const res = await axios.get(
      `https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=${limit}`
    );
    const items = (res.data.hits || []).map((h) => ({
      id: `hn_${h.objectID}`,
      source: "hackernews",
      title: h.title,
      body: h.text || h.story_text || "",
      url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
      published_at: h.created_at,
      metrics: { points: h.points || 0, comments: h.num_comments || 0 },
    }));
    return items;
  } catch (e) {
    console.error("HN fetch error", e);
    // fallback mock
    return mockFeed("hackernews", limit);
  }
}

export async function fetchRedditSubreddit({ subreddit = "technology", limit = 10 } = {}) {
  try {
    const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=${limit}`;
    const res = await axios.get(url);
    const items = (res.data.data.children || []).map((c) => {
      const d = c.data;
      return {
        id: `reddit_${d.id}`,
        source: "reddit",
        title: d.title,
        body: d.selftext || "",
        url: `https://reddit.com${d.permalink}`,
        published_at: dayjs.unix(d.created_utc).toISOString(),
        metrics: { upvotes: d.ups, comments: d.num_comments },
      };
    });
    return items;
  } catch (e) {
    console.error("Reddit fetch error", e);
    return mockFeed("reddit", limit);
  }
}

export async function fetchXUser({ username = "elonmusk", limit = 10 } = {}) {
  // NOTE: X API requires auth and rate limits. Use server side.
  // Provide a mock until you add a server proxy.
  return mockFeed("x", limit);
}

export async function fetchNewsletterRSS({ feedUrl, limit = 10 } = {}) {
  // In browser you may have CORS issues. Use server-side RSS parser.
  return mockFeed("newsletter", limit);
}

function mockFeed(source, limit) {
  const now = new Date();
  return Array.from({ length: limit }).map((_, i) => ({
    id: `${source}_mock_${i}`,
    source,
    title: `${source.toUpperCase()} mock headline #${i + 1}`,
    body: `This is a mocked ${source} item used as fallback. Add real fetcher on server to replace.`,
    url: "#",
    published_at: new Date(now - i * 1000 * 60 * 10).toISOString(),
    metrics: { score: Math.round(Math.random() * 100) },
  }));
}

export async function fetchMixedBatch({ limit = 12 } = {}) {
  // simple aggregator: fetch from HN + Reddit + newsletter mocks
  const [hn, reddit] = await Promise.all([fetchHackerNewsTop({ limit: 6 }), fetchRedditSubreddit({ limit: 6 })]);
  const mix = [...hn, ...reddit].slice(0, limit);
  // attach a computed popularity score (front-end simple heuristic; backend should compute properly)
  return mix.map((it) => ({
    ...it,
    popularity: ((it.metrics.points || it.metrics.upvotes || it.metrics.score || 1) / 100) || 0,
  }));
}
