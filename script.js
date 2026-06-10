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

// ===========================================
// ▶ CÁCH CẬP NHẬT "LATEST RELEASE" KHI CÓ VIDEO MỚI:
//   featuredTracks[0] (object ĐẦU TIÊN bên dưới) = Latest Release.
//   Khi đăng video mới trên YouTube, chỉ cần:
//     1) Mở video trên YouTube, copy phần sau "v=" trong link
//        (vd https://www.youtube.com/watch?v=ABC123 → videoId là 'ABC123')
//     2) Dán vào `videoId` VÀ `url` của object đầu tiên.
//     3) (tùy chọn) sửa title / mood / description cho khớp.
//   Lưu file → refresh trình duyệt. Ảnh thumbnail tự lấy từ YouTube.
//
//   Mẹo: muốn giữ video cũ lại trong "Also from the channel",
//   hãy chèn THÊM một object mới lên ĐẦU mảng thay vì ghi đè.
// ===========================================
//
// `videoId` là phần sau "v=" trong link YouTube.
// ORDER MATTERS: featuredTracks[0] hiển thị làm Latest Release;
// các track còn lại nằm ở mục "Also from the channel".
const featuredTracks = [
  {
    title: 'Nhạc Electronic Buổi Tối Đáng Nghe Nhất',
    mood: 'Chill Electronic · Evening',
    description: 'A relaxing electronic track for night listening — soft synths, slow build, perfect for late-evening wind-down.',
    videoId: '1ZVPYNQAwX4',
    url: 'https://www.youtube.com/watch?v=1ZVPYNQAwX4'
  },
  {
    title: 'Nhạc TikTok Remix Gây Nghiện — Version 1',
    mood: 'TikTok Remix · Energetic',
    description: 'An upbeat remix for short-form dance content and high-energy moments.',
    videoId: 'x1pfDBt1AwM',
    url: 'https://www.youtube.com/watch?v=x1pfDBt1AwM'
  },
  {
    title: 'Nhạc TikTok Remix Gây Nghiện — Version 2',
    mood: 'TikTok Remix · Dance',
    description: 'A second upbeat Vivi Soul remix in the same energetic series.',
    videoId: 'Or2S37veLn8',
    url: 'https://www.youtube.com/watch?v=Or2S37veLn8'
  }
];

// Render the cards into <div id="tracks-grid"> by looping through the array.
function renderFeaturedTracks() {
  const grid = document.getElementById('tracks-grid');
  if (!grid) return;

  // Clear whatever might be in the grid first.
  grid.innerHTML = '';

  // Skip the first track — it's already shown as Latest Release above.
  // Remaining tracks (TikTok remixes, etc.) appear in this "Also from the channel" grid.
  featuredTracks.slice(1).forEach(track => {
    // YouTube hosts several thumbnail sizes at predictable URLs.
    // sddefault (640×480) is noticeably sharper than hqdefault for these cards;
    // if a video has no sddefault, onerror falls back to hqdefault.
    const thumbnailSrc = `https://img.youtube.com/vi/${track.videoId}/sddefault.jpg`;
    const thumbnailFallback = `https://img.youtube.com/vi/${track.videoId}/hqdefault.jpg`;

    // Create a new <div> in memory and fill it with the card markup.
    const card = document.createElement('div');
    card.className = 'tier';
    card.innerHTML = `
      <a class="track-thumbnail"
         href="${track.url}" target="_blank" rel="noopener noreferrer"
         aria-label="Watch ${track.title} on YouTube">
        <img src="${thumbnailSrc}" alt="${track.title}" loading="lazy"
             onerror="this.onerror=null;this.src='${thumbnailFallback}';">
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

  // Latest Release is the hero card, so use the largest thumbnail (1280×720).
  // maxresdefault doesn't exist for every video — onerror falls back to hqdefault.
  const thumbnailSrc = `https://img.youtube.com/vi/${latestTrack.videoId}/maxresdefault.jpg`;
  const thumbnailFallback = `https://img.youtube.com/vi/${latestTrack.videoId}/hqdefault.jpg`;

  container.innerHTML = `
    <a class="latest-release-thumbnail"
       href="${latestTrack.url}" target="_blank" rel="noopener noreferrer"
       aria-label="Watch ${latestTrack.title} on YouTube">
      <img src="${thumbnailSrc}" alt="${latestTrack.title}" loading="lazy"
           onerror="this.onerror=null;this.src='${thumbnailFallback}';">
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

// ===========================================
// 5) SCROLL REVEAL — sections fade + rise into view
// -------------------------------------------
// Progressive enhancement: we add the `.reveal` class with JS,
// so if JS is off (or fails) everything stays fully visible.
// Users with "reduce motion" are skipped — CSS keeps them visible.
// ===========================================
(function setupScrollReveal() {
  const prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sections we want to animate as they enter the viewport.
  const targets = document.querySelectorAll(
    '.features, .how, .latest-release-section, .tracks, .faq, .closing'
  );
  if (!targets.length) return;

  // No IntersectionObserver support (or reduced motion) → leave content visible.
  if (prefersReduced || !('IntersectionObserver' in window)) return;

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);   // animate once, then stop watching
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(el => observer.observe(el));
})();
