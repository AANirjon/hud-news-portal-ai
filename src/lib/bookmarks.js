
const STORAGE_KEY = "hud_bookmarks_v1";

export function loadBookmarks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveBookmark(item) {
  const bs = loadBookmarks();
  const exists = bs.find((b) => b.id === item.id);
  if (exists) return bs;
  const next = [{ ...item, saved_at: new Date().toISOString() }, ...bs];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function removeBookmark(id) {
  const bs = loadBookmarks();
  const next = bs.filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
