import { channelId, verifiedCourses, type Course, type Lesson } from '../data/academy';

const endpoint = 'https://www.googleapis.com/youtube/v3/';
async function request(path: string, params: Record<string, string>) {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error('YouTube API key is not configured');
  const url = new URL(path, endpoint);
  Object.entries({ ...params, key }).forEach(([name, value]) => url.searchParams.set(name, value));
  const response = await fetch(url, { next: { revalidate: 21600 }, signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`YouTube API returned ${response.status}`);
  return response.json();
}

export async function getCourses(): Promise<Course[]> {
  if (!process.env.YOUTUBE_API_KEY) return verifiedCourses;
  try {
    const list = await request('playlists', { part: 'snippet,contentDetails', channelId: process.env.YOUTUBE_CHANNEL_ID || channelId, maxResults: '50' });
    if (!Array.isArray(list.items)) return verifiedCourses;
    const live: Course[] = await Promise.all(list.items.map(async (item: { id: string; snippet?: { title?: string; thumbnails?: { high?: { url: string }; medium?: { url: string } } }; contentDetails?: { itemCount?: number } }) => {
      const result = await request('playlistItems', { part: 'snippet,contentDetails', playlistId: item.id, maxResults: '50' });
      const lessons: Lesson[] = Array.isArray(result.items) ? result.items.flatMap((entry: { snippet?: { title?: string; thumbnails?: { high?: { url: string }; medium?: { url: string } }; resourceId?: { videoId?: string }; description?: string }; contentDetails?: { videoId?: string } }) => {
        const id = entry.contentDetails?.videoId || entry.snippet?.resourceId?.videoId;
        const title = entry.snippet?.title;
        return id && title && title !== 'Private video' && title !== 'Deleted video' ? [{ id, title, thumbnail: entry.snippet?.thumbnails?.high?.url || entry.snippet?.thumbnails?.medium?.url || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, description: entry.snippet?.description }] : [];
      }) : [];
      const known = verifiedCourses.find(course => course.id === item.id);
      return { id: item.id, slug: known?.slug || `course-${item.id.toLowerCase().slice(-12)}`, title: item.snippet?.title || known?.title || 'Untitled playlist', category: known?.category || 'Programming', thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || known?.thumbnail || lessons[0]?.thumbnail || '/images/academy/playlist-fallback.svg', lessons, url: `https://www.youtube.com/playlist?list=${item.id}` };
    }));
    return live.filter(course => course.lessons.length > 0);
  } catch {
    return verifiedCourses;
  }
}

export async function getLatestVideos(): Promise<Lesson[]> {
  const { verifiedLatestVideos } = await import('../data/academy');
  if (!process.env.YOUTUBE_API_KEY) return verifiedLatestVideos;
  try {
    const uploadsId = `UU${(process.env.YOUTUBE_CHANNEL_ID || channelId).slice(2)}`;
    const result = await request('playlistItems', { part: 'snippet,contentDetails', playlistId: uploadsId, maxResults: '8' });
    const items: Lesson[] = Array.isArray(result.items) ? result.items.flatMap((entry: { snippet?: { title?: string; description?: string; thumbnails?: { high?: { url: string }; medium?: { url: string } }; resourceId?: { videoId?: string } }; contentDetails?: { videoId?: string } }) => {
      const id = entry.contentDetails?.videoId || entry.snippet?.resourceId?.videoId;
      const title = entry.snippet?.title;
      return id && title && title !== 'Private video' && title !== 'Deleted video' ? [{ id, title, thumbnail: entry.snippet?.thumbnails?.high?.url || entry.snippet?.thumbnails?.medium?.url || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, description: entry.snippet?.description }] : [];
    }) : [];
    return items.length ? items : verifiedLatestVideos;
  } catch { return verifiedLatestVideos; }
}
