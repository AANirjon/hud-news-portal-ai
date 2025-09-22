import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

const PreferencesSearch = () => {
  const { user, token, loading } = useAuth();
  const [preferences, setPreferences] = useState({ topics: [], searchTerm: "", mixRatio: 50 });
  const [availableTopics, setAvailableTopics] = useState([
    "AI",
    "Machine Learning",
    "Tech News",
    "HackerNews",
    "Reddit",
    "X/Twitter",
  ]);
  const [saving, setSaving] = useState(false);

  // Load preferences from backend
  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user || !token) return;
      try {
        const res = await axios.get(`https://news-portal-server-seven-bice.vercel.app/settings/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.preferences) setPreferences(res.data.preferences);
      } catch (err) {
        console.error("Failed to load preferences:", err);
      }
    };
    fetchPreferences();
  }, [user, token]);

  const toggleTopic = (topic) => {
    setPreferences((prev) => {
      const topics = prev.topics.includes(topic)
        ? prev.topics.filter((t) => t !== topic)
        : [...prev.topics, topic];
      return { ...prev, topics };
    });
  };

  const handleSearchChange = (e) => {
    setPreferences((prev) => ({ ...prev, searchTerm: e.target.value }));
  };

  const deleteTopic = (topic) => {
    setPreferences((prev) => ({
      ...prev,
      topics: prev.topics.filter((t) => t !== topic),
    }));
  };

  const deleteSearchTerm = () => {
    setPreferences((prev) => ({ ...prev, searchTerm: "" }));
  };

  const savePreferences = async () => {
    if (!user || !token) return;
    setSaving(true);
    try {
      await axios.post(
        "https://news-portal-server-seven-bice.vercel.app/settings",
        { email: user.email, preferences },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Preferences saved!");
    } catch (err) {
      console.error("Failed to save preferences:", err);
      alert("Failed to save preferences");
    }
    setSaving(false);
  };

  if (loading) return <div className="text-green-400 text-sm">Loading...</div>;

  return (
    <div className="w-full flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Search topics..."
        value={preferences.searchTerm}
        onChange={handleSearchChange}
        className="w-full px-3 py-1 rounded border border-gray-600 bg-black text-[var(--hud-text)] focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm md:text-base"
      />

      <div className="flex flex-wrap gap-2">
        {availableTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => toggleTopic(topic)}
            className={`px-2 py-1 text-xs md:text-sm rounded-full border transition ${
              preferences.topics.includes(topic)
                ? "bg-cyan-400 border-cyan-300 text-black"
                : "border-gray-500 text-gray-300 hover:bg-gray-800"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      <button
        onClick={savePreferences}
        disabled={saving}
        className="w-full px-3 py-1 text-sm md:text-base bg-cyan-400 hover:bg-cyan-500 text-black rounded font-semibold transition"
      >
        {saving ? "Saving..." : "Save Preferences"}
      </button>

      {/* Show saved search term and selected topics with delete buttons */}
      <div className="max-h-40 md:max-h-60 overflow-y-auto mt-2 border-t border-gray-700 pt-2 space-y-2">
        {preferences.searchTerm && (
          <div className="flex items-center justify-between bg-gray-800 px-2 py-1 rounded">
            <span className="text-xs md:text-sm text-yellow-400 font-semibold truncate">
              Search: {preferences.searchTerm}
            </span>
            <button
              onClick={deleteSearchTerm}
              className="ml-2 text-red-500 font-bold px-1 hover:text-red-400"
            >
              ×
            </button>
          </div>
        )}

        {preferences.topics.length === 0 && (
          <p className="text-gray-400 text-sm">No preferences selected.</p>
        )}
        {preferences.topics.map((topic) => (
          <div
            key={topic}
            className="flex items-center justify-between bg-gray-800 px-2 py-1 rounded"
          >
            <span className="text-xs md:text-sm text-cyan-400 font-semibold truncate">
              {topic}
            </span>
            <button
              onClick={() => deleteTopic(topic)}
              className="ml-2 text-red-500 font-bold px-1 hover:text-red-400"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreferencesSearch;
