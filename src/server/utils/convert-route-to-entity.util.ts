const mapping: Record<string, string> = {
  analysts: 'analyst',
  blogs: 'blog',
  'cricket-stats': 'cricket_stat',
  'live-scores': 'live_score',
  organizations: 'organization',
  users: 'user',
  'youtube-streams': 'youtube_stream',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
