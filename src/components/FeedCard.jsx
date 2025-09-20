// src/components/FeedCard.jsx
import React from "react";
import dayjs from "dayjs";

export default function FeedCard({ item, onBookmark, isHighlighted }) {
  return (
    <article
      className={`w-full max-w-3xl p-6 rounded-2xl glass-backdrop drop-shadow-lg transform transition-transform ${
        isHighlighted ? "scale-102 border-2 border-opacity-40" : "scale-100"
      }`}
      role="article"
      aria-label={item.title}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="text-xs uppercase tracking-wider text-neon-200/80 mb-2">{item.source}</div>
          <h2 className="text-2xl font-semibold leading-tight text-white">{item.title}</h2>
          <p className="mt-3 text-sm text-gray-100/80 line-clamp-3">{item.body}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-right text-xs text-gray-300">{dayjs(item.published_at).fromNow()}</div>
          <div className="flex gap-2">
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs px-3 py-2 rounded-md bg-white/6 hover:bg-white/10 transition"
            >
              Open
            </a>
            <button
              onClick={() => onBookmark(item)}
              className="text-xs px-3 py-2 rounded-md bg-white/6 hover:bg-white/10 transition"
            >
              Bookmark
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
