import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { usePreferences } from "../PreferencesContext";

const PreferencesSearch = () => {
  const { user, token, loading } = useAuth();
  const { topics, tags, updatePreferences } = usePreferences();
  const [availableTopics] = useState([
    "AI",
    "Machine Learning",
    "Tech News",
    "HackerNews",
    "Reddit",
    "X/Twitter",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [saving, setSaving] = useState(false);

  // ---------------- Load Preferences ----------------
  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user || !token) return;
      try {
        const res = await axios.get(
          `https://news-portal-server-seven-bice.vercel.app/settings/${user.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        updatePreferences(res.data.topics || [], res.data.tags || []);
      } catch (err) {
        console.error("Failed to load preferences:", err);
      }
    };
    fetchPreferences();
  }, [user, token]);

  const savePreferences = async (newTopics, newTags) => {
    if (!user || !token) return;
    setSaving(true);
    try {
      await axios.post(
        "https://news-portal-server-seven-bice.vercel.app/settings",
        { email: user.email, topics: newTopics, tags: newTags },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updatePreferences(newTopics, newTags); // updates context and triggers HUDNewsFeed reload
    } catch (err) {
      console.error("Failed to save preferences:", err);
    }
    setSaving(false);
  };

  const toggleTopic = (topic) => {
    const updatedTopics = topics.includes(topic)
      ? topics.filter((t) => t !== topic)
      : [...topics, topic];
    savePreferences(updatedTopics, tags);
  };

  const addSearchTag = () => {
    const trimmed = searchTerm.trim();
    if (trimmed && !tags.includes(trimmed)) {
      savePreferences(topics, [...tags, trimmed]);
      setSearchTerm("");
    }
  };

  const deleteItem = (type, item) => {
    if (type === "topic") savePreferences(topics.filter((t) => t !== item), tags);
    else savePreferences(topics, tags.filter((t) => t !== item));
  };

  if (loading) return <div className="text-green-400 text-sm">Loading...</div>;

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="flex-col gap-2">
        <input
          type="text"
          placeholder="Search topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-1 rounded border border-gray-600 bg-black text-[var(--hud-text)] focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm md:text-base w-full mb-2"
        />
        <button
          onClick={addSearchTag}
          className="px-3 py-1 text-sm md:text-base bg-cyan-400 hover:bg-cyan-500 text-black rounded font-semibold transition w-full"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {availableTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => toggleTopic(topic)}
            className={`px-2 py-1 text-xs md:text-sm rounded-full border transition ${topics.includes(topic)
                ? "bg-cyan-400 border-cyan-300 text-black"
                : "border-gray-500 text-gray-300 hover:bg-gray-800"
              }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {saving && (
        <p className="text-xs text-yellow-400 font-medium">Saving preferences...</p>
      )}

      <div className="max-h-40 md:max-h-60 overflow-y-auto mt-2 border-t border-gray-700 pt-2 space-y-2">
        {topics.length === 0 && tags.length === 0 && (
          <p className="text-gray-400 text-sm">No preferences selected.</p>
        )}

        {topics.map((topic) => (
          <div
            key={topic}
            className="flex items-center justify-between bg-gray-800 px-2 py-1 rounded"
          >
            <p className="text-xs md:text-sm text-cyan-400 font-semibold">{topic}</p>
            <button
              onClick={() => deleteItem("topic", topic)}
              className="text-red-400 hover:text-red-600 text-xs"
            >
              ✕
            </button>
          </div>
        ))}

        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center justify-between bg-gray-800 px-2 py-1 rounded"
          >
            <p className="text-xs md:text-sm text-yellow-400 font-semibold">{tag}</p>
            <button
              onClick={() => deleteItem("tag", tag)}
              className="text-red-400 hover:text-red-600 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreferencesSearch;
