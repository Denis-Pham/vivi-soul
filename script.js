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
// `previewSrc` (tùy chọn): đường dẫn file MP3 snippet 15–30s tự host
// (vd 'audio/quiet-fire-preview.mp3') → card sẽ hiện nút nghe thử.
const featuredTracks = [
  {
    title: 'When the City Finally Sleeps',
    mood: 'Soft Soul · Quiet Nights',
    description: 'A soft soul piece for the hour the city finally goes quiet — warm keys, slow breath, and room to feel.',
    videoId: 'gJwebqoc5fg',
    url: 'https://www.youtube.com/watch?v=gJwebqoc5fg'
  },
  {
    title: 'Quiet Diner at 2AM',
    mood: 'Lo-Fi Soul · After Midnight',
    description: 'Late-night lo-fi soul for empty streets and warm neon — quiet company for whoever is still awake.',
    videoId: 'gYsWF2XzSiU',
    url: 'https://www.youtube.com/watch?v=gYsWF2XzSiU'
  },
  {
    title: 'Coming Home Slowly',
    mood: 'Lo-Fi Soul · Healing',
    description: 'Gentle, unhurried lo-fi soul for quiet healing — the sound of finally letting your shoulders drop.',
    videoId: 'ACCAJRzoAHU',
    url: 'https://www.youtube.com/watch?v=ACCAJRzoAHU'
  },
  {
    title: 'Blue Hour Drizzle',
    mood: 'Lo-Fi Soul · After Rain',
    description: 'Soft lo-fi soul for the blue hour after rain — fresh air, wet streets, and slow thoughts.',
    videoId: 'k8bmgboWxus',
    url: 'https://www.youtube.com/watch?v=k8bmgboWxus'
  },
  {
    title: 'When Morning Finds Me',
    mood: 'Lo-Fi Soul · Gentle Reset',
    description: 'A gentle morning reset — soft keys for starting the day kindly instead of loudly.',
    videoId: '7wLPLBYkHs4',
    url: 'https://www.youtube.com/watch?v=7wLPLBYkHs4'
  },
  {
    title: 'Quiet Fire',
    mood: 'Cinematic · Inner Strength',
    description: 'A cinematic song about quiet inner strength — slow swells that hold you steady.',
    videoId: 'pV3QkZVC2aI',
    url: 'https://www.youtube.com/watch?v=pV3QkZVC2aI'
  },
  {
    title: 'A Quiet Room for Slowing Down',
    mood: 'Lo-Fi Ambient · Late Night',
    description: 'Soft late-night ambient for slowing down — a quiet room you can step into anytime.',
    videoId: 'QWEDrddBqEg',
    url: 'https://www.youtube.com/watch?v=QWEDrddBqEg'
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
      ${track.previewSrc ? `
      <button class="preview-btn" data-preview="${track.previewSrc}" aria-label="Play a short preview of ${track.title}">
        <span class="preview-icon" aria-hidden="true">▶</span> Preview
      </button>` : ''}
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
// -------------------------------------------
// Each mood now points at a REAL video on the channel,
// so "Listen →" always lands somewhere that matches the vibe.
// ===========================================
const moods = [
  { label: 'Late-night soul',  url: 'https://www.youtube.com/watch?v=gJwebqoc5fg' }, // When the City Finally Sleeps
  { label: 'Healing rain',     url: 'https://www.youtube.com/watch?v=k8bmgboWxus' }, // Blue Hour Drizzle
  { label: 'Cinematic memories', url: 'https://www.youtube.com/watch?v=pV3QkZVC2aI' }, // Quiet Fire
  { label: 'Deep focus',       url: 'https://www.youtube.com/watch?v=QWEDrddBqEg' }, // A Quiet Room for Slowing Down
  { label: 'Nostalgic love',   url: 'https://www.youtube.com/watch?v=ACCAJRzoAHU' }  // Coming Home Slowly
];

let currentMood = 0;
const moodText = document.getElementById('moodText');
const moodBtn = document.getElementById('moodBtn');
const moodLink = document.getElementById('moodLink');

function applyMood(index) {
  const mood = moods[index];
  if (moodText) moodText.textContent = mood.label;
  if (moodLink) moodLink.href = mood.url;
}

if (moodBtn && moodText) {
  applyMood(currentMood);   // sync link with the initial mood on load
  moodBtn.addEventListener('click', () => {
    currentMood = (currentMood + 1) % moods.length;
    moodText.classList.add('fade');
    setTimeout(() => {
      applyMood(currentMood);
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

  // fx.js (GSAP ScrollTrigger) đảm nhận reveal khi CDN tải được —
  // khối này chỉ còn là fallback khi GSAP bị chặn / offline.
  if (window.gsap && window.ScrollTrigger && !prefersReduced) return;

  // Sections we want to animate as they enter the viewport.
  const targets = document.querySelectorAll(
    '.features, .how, .latest-release-section, .tracks, .faq, .updates, .closing'
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

// ===========================================
// 6) EMAIL CAPTURE — Formspree, with graceful hiding
// -------------------------------------------
// ▶ CÁCH BẬT FORM EMAIL:
//   1) Tạo form miễn phí tại https://formspree.io → copy Form ID (vd 'xkgwabcd')
//   2) Trong index.html, thay FORM_ID_TODO trong action của #emailForm
//      bằng ID thật → section tự hiện ra.
// Khi action còn chứa FORM_ID_TODO, cả section được ẩn đi
// để khách không bao giờ thấy một form chưa hoạt động.
// ===========================================
(function setupEmailCapture() {
  const form = document.getElementById('emailForm');
  const section = document.getElementById('updates');
  if (!form || !section) return;

  if (form.action.includes('FORM_ID_TODO')) {
    section.hidden = true;          // not configured yet → hide entirely
    return;
  }

  const successMsg = document.getElementById('emailSuccess');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error('submit failed');
      form.hidden = true;
      if (successMsg) successMsg.hidden = false;
    } catch (err) {
      button.disabled = false;
      form.submit();                // network/JS hiccup → plain POST fallback
    }
  });
})();

// ===========================================
// 7) AUDIO PREVIEW — play 15–30s snippets on track cards
// -------------------------------------------
// Cards only show a Preview button when their track has a
// `previewSrc` (see featuredTracks above). One shared <audio>
// element: starting a preview stops any other one playing.
// ===========================================
(function setupAudioPreviews() {
  const buttons = document.querySelectorAll('.preview-btn');
  if (!buttons.length) return;

  const player = new Audio();
  let activeBtn = null;

  function stop() {
    player.pause();
    player.currentTime = 0;
    if (activeBtn) {
      activeBtn.classList.remove('playing');
      activeBtn.querySelector('.preview-icon').textContent = '▶';
      activeBtn = null;
    }
  }

  player.addEventListener('ended', stop);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (activeBtn === btn) { stop(); return; }   // tap again = stop
      stop();
      player.src = btn.dataset.preview;
      player.play();
      btn.classList.add('playing');
      btn.querySelector('.preview-icon').textContent = '❚❚';
      activeBtn = btn;
    });
  });
})();
