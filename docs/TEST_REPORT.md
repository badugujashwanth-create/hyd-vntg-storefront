# Test report

Audit date: 2026-07-21

Branch: `phase3-hyd-vntg-completion`

## Targeted implementation evidence

| Check | Result | Evidence |
|---|---|---|
| Unit rules | Pass | 9 tests cover handoff validation/opening, message construction, fail-closed login/session, server-assigned admin role, corrupt catalog recovery, local mutations, and SQL policy structure |
| Desktop browser | Pass | Category filter, product dialog, focused close control, size/details entry, local message preview, and zero popup handoff |
| Admin browser | Pass | Unconfigured admin status visible and sign-in rejected |
| Mobile browser | Pass | Menu opens and 390×844 viewport has no horizontal overflow |
| Production build | Pass | Vite compiled the storefront after the safe handoff/session changes |
| Dependency audit | Pass | 0 known vulnerabilities at `--audit-level=low` |

## Final repository gate

| Check | Result | Evidence |
|---|---|---|
| Unit suite | Pass | Vitest: 3 files, 9 tests passed |
| Production build | Pass | Vite 7.3.6: 1,685 modules transformed; 421.85 kB JavaScript / 121.18 kB gzip |
| Browser suite | Pass | Playwright: 3 applicable tests passed; 3 complementary viewport cases intentionally skipped |
| Dependency audit | Pass | `npm audit --audit-level=low`: 0 vulnerabilities |
| Secret pattern scan | Pass | No private-key, provider-token, or credential-assignment candidates in tracked text files |
| Diff hygiene | Pass | `git diff --check` reported no whitespace errors |
| Media structure | Pass | MP4 H.264/AAC 1280x720 183.120 s; WebM VP8/Opus 1280x720 182.452 s; PNG poster 1280x720; WebVTT captions through 182.300 s |
| Sampled-frame inspection | Pass | Frames contain only synthetic values and visibly show local-preview/disabled-provider boundaries |
| Runtime catalog assets | Pass | No runtime Unsplash, Pexels, or Cloudinary reference remains in source/public/docs |

The first browser-gate attempt found a stale local Vite preview holding port 4173. The exact repository-owned process was identified and stopped; the browser suite then passed without repeating the already-green unit/build checks.

## Public release gate

| Check | Result | Evidence |
|---|---|---|
| Pull request | Pass | PR #2 merged as `3aff4b0` after `Storefront CI / verify` passed on `75dcfd8` |
| Release | Pass | Public v1.0.0 includes MP4, WebM, WebVTT, and PNG assets |
| Asset identity | Pass | Release API sizes, media metadata, and SHA-256 digests match the reviewed local files |
| Logged-out HTTP | Pass | Release page, four assets, and completion report return HTTP 200 |
| Desktop playback | Pass | Public MP4 ready state 4, 183.12 s; 1280x720 poster decoded; 7 caption cues showing |
| Mobile playback | Pass | Public MP4 ready state 4, 183.12 s; 1280x720 poster decoded; 7 caption cues showing |

GitHub intentionally returns release downloads as attachments and raw video content with a generic wire type even though the release API stores `video/mp4` and `video/webm`. Playback was tested in Chromium rather than assumed from the header. The synchronized portfolio now supplies native browser MIME delivery; logged-out desktop and mobile checks passed at 183.12 seconds with all seven caption cues.
