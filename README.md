# Yassine Ikoubazene — engineering platform

A Next.js App Router site for Yassine's engineering projects, case studies, IkoSoft initiative, and a YouTube based Academy.

## Local development

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run lint`, `npx tsc --noEmit`, and `npm run build` before deploying. `npm run test:smoke` checks the built site in Chromium, including navigation, project filtering, an Academy lesson, saved progress, and responsive overflow.

## Verified content

Curated project records live in `app/data/projects.ts`. The public GitHub repository archive is fetched on the server and revalidated every six hours. It excludes forks, empty repositories, private repositories, and curated duplicates. If GitHub is unavailable or rate limited, curated work and the GitHub archive link remain visible. `GITHUB_TOKEN` is optional and server only.

The portrait at `public/images/profile/yassine.jpg` comes from Yassine's public IkoSoftCompany repository. Project screenshots of Elite 1337, IkoSoft, and YT Focus Mode were captured from public pages. Other project visuals are labeled illustrations based on repository content. The verified live links are `https://www.elite-1337.app/`, `https://ikosoft.vercel.app/`, and `https://focus-1337.vercel.app/`. The supplied `https://elite1337.app/` currently returns 404; the verified `www.elite-1337.app` address is used instead.

## Academy

The channel linked from the public IkoSoftCompany repository is `https://www.youtube.com/@IkoSoftCompany`, currently titled **yassin codes**. `app/data/academy.ts` contains a verified public playlist and lesson snapshot. With no API key, the Academy works from that snapshot. Set server only `YOUTUBE_API_KEY` to refresh public playlists and lessons with YouTube Data API v3 every six hours. `YOUTUBE_CHANNEL_ID` optionally overrides the verified default channel ID. API failures fall back to the snapshot. Lessons embed from YouTube's privacy enhanced domain and always offer the original watch link. Completion and last visited lesson are stored only in the visitor's browser; there is no account or cross device sync.

## Deployment

Import the repository into Vercel or another Node compatible Next.js host. Use `npm run build` and `npm run start`. Set `GITHUB_TOKEN` and `YOUTUBE_API_KEY` only if needed. Never prefix either secret with `NEXT_PUBLIC_` or commit it. The canonical URL and sitemap use `https://ikoubazen.vercel.app`; update `app/layout.js`, `app/robots.js`, and `app/sitemap.js` if the production domain changes.

The Academy also shows a verified snapshot of the latest public channel uploads. With `YOUTUBE_API_KEY`, it refreshes this list from the channel uploads playlist. The snapshot was checked on 29 October 2026.
