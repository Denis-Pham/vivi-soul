// ===========================================
// VIVI SOUL — Small interactive touches
// ===========================================

// ===========================================
// 1) FEATURED TRACKS — single source of truth
// -------------------------------------------
// All track data lives here. The Featured Tracks
// section in index.html is rendered from this array.
//
// To update or add a track later:
//   - Edit one object below (title / mood / description / url)
//   - Save the file and refresh the browser. Done.
// ===========================================

// Reusable YouTube logo SVG (used by every Listen button)
const YT_ICON_SVG = '<svg class="yt-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>';

// The real track data — Vivi Soul YouTube releases.
// `videoId` is the part after "v=" in the YouTube URL.
// We use it to build the /embed/ link for the in-page player.
const featuredTracks = [
  {
    title: 'Nhạc TikTok Remix Gây Nghiện — Version 1',
    mood: 'TikTok Remix / Energetic',
    description: 'A catchy remix track for short-form dance and high-energy vibes.',
    videoId: 'x1pfDBt1AwM',
    url: 'https://www.youtube.com/watch?v=x1pfDBt1AwM'
  },
  {
    title: 'Nhạc TikTok Remix Gây Nghiện — Version 2',
    mood: 'TikTok Remix / Dance',
    description: 'A second upbeat VibeSoul remix test track for the channel.',
    videoId: 'Or2S37veLn8',
    url: 'https://www.youtube.com/watch?v=Or2S37veLn8'
  },
  {
    title: '[Chill VibeSoul] Nhạc Electronic Buổi Tối Đáng Nghe Nhất',
    mood: 'Chill Electronic / Evening',
    description: 'A relaxing electronic track for night listening and chill moments.',
    videoId: '1ZVPYNQAwX4',
    url: 'https://www.youtube.com/watch?v=1ZVPYNQAwX4'
  }
];

// Render the cards into <div id="tracks-grid"> by looping through the array.
function renderFeaturedTracks() {
  const grid = document.getElementById('tracks-grid');
  if (!grid) return;

  // Clear whatever might be in the grid first.
  grid.innerHTML = '';

  // For each track in the array, build one card and add it to the grid.
  featuredTracks.forEach(track => {
    // YouTube hosts a thumbnail for every video at a predictable URL.
    // We just plug the videoId into this pattern — no embed permissions needed.
    const thumbnailSrc = `https://img.youtube.com/vi/${track.videoId}/hqdefault.jpg`;

    // Create a new <div> in memory and fill it with the card markup.
    const card = document.createElement('div');
    card.className = 'tier';
    card.innerHTML = `
      <a class="track-thumbnail"
         href="${track.url}" target="_blank" rel="noopener noreferrer"
         aria-label="Watch ${track.title} on YouTube">
        <img src="${thumbnailSrc}" alt="${track.title}" loading="lazy">
        <span class="play-badge" aria-hidden="true"></span>
      </a>
      <span class="mood">${track.mood}</span>
      <h3>${track.title}</h3>
      <p class="desc">${track.description}</p>
      <a class="btn btn-secondary" style="width: 100%;"
         href="${track.url}" target="_blank" rel="noopener noreferrer">
        ${YT_ICON_SVG}Watch on YouTube
      </a>
    `;

    // Attach the finished card to the grid in the page.
    grid.appendChild(card);
  });
}

renderFeaturedTracks();

// ===========================================
// Render the Latest Release card (uses featuredTracks[0])
// -------------------------------------------
// We reuse the same data array — the first item is treated
// as "newest". When you publish a new track, add it to the
// TOP of featuredTracks and this section auto-updates.
// ===========================================
function renderLatestRelease() {
  const container = document.getElementById('latest-release-card');
  if (!container) return;

  // Grab the first track from the array — this is our "latest".
  const latestTrack = featuredTracks[0];

  // Build the thumbnail URL from the videoId (same pattern as Featured Tracks).
  const thumbnailSrc = `https://img.youtube.com/vi/${latestTrack.videoId}/hqdefault.jpg`;

  container.innerHTML = `
    <a class="latest-release-thumbnail"
       href="${latestTrack.url}" target="_blank" rel="noopener noreferrer"
       aria-label="Watch ${latestTrack.title} on YouTube">
      <img src="${thumbnailSrc}" alt="${latestTrack.title}" loading="lazy">
      <span class="play-badge" aria-hidden="true"></span>
    </a>
    <div class="latest-release-content">
      <span class="mood">${latestTrack.mood}</span>
      <h3>${latestTrack.title}</h3>
      <p>${latestTrack.description}</p>
      <div class="latest-release-actions">
        <a class="btn btn-primary"
           href="${latestTrack.url}" target="_blank" rel="noopener noreferrer">
          ${YT_ICON_SVG}Watch Latest on YouTube
        </a>
      </div>
    </div>
  `;
}

renderLatestRelease();

// ===========================================
// 2) Auto-update footer year
// ===========================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===========================================
// 3) FAQ accordion — close other items when one opens
// ===========================================
const allDetails = document.querySelectorAll('.faq-list details');
allDetails.forEach(d => {
  d.addEventListener('toggle', () => {
    if (d.open) {
      allDetails.forEach(other => { if (other !== d) other.open = false; });
    }
  });
});

// ===========================================
// 4) MOOD SWITCHER — cycle through 5 moods on click
// ===========================================
const moods = [
  'Late-night soul',
  'Healing rain',
  'Cinematic memories',
  'Deep focus',
  'Nostalgic love'
];

let currentMood = 0;
const moodText = document.getElementById('moodText');
const moodBtn = document.getElementById('moodBtn');

if (moodBtn && moodText) {
  moodBtn.addEventListener('click', () => {
    currentMood = (currentMood + 1) % moods.length;
    moodText.classList.add('fade');
    setTimeout(() => {
      moodText.textContent = moods[currentMood];
      moodText.classList.remove('fade');
    }, 250);
  });
}
