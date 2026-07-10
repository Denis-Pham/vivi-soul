// ===========================================
// VIVI SOUL — Small interactive touches
// ===========================================

// Reusable YouTube logo SVG (used by every Listen button)
const YT_ICON_SVG = '<svg class="yt-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>';

// ===========================================
// 0) NGÔN NGỮ (i18n) — song ngữ Anh / Việt
// -------------------------------------------
// • Mọi chữ tĩnh trong index.html mang thuộc tính:
//     data-i18n="key"        → đổi textContent
//     data-i18n-html="key"   → đổi innerHTML (chữ có thẻ, vd <em>)
//     data-i18n-aria="key"   → đổi aria-label
// • Chữ động (track card, mood) đọc trực tiếp từ `currentLang` bên dưới.
// • Lựa chọn lưu ở localStorage('viviLang'); mặc định: theo trình duyệt,
//   nếu không phải tiếng Việt thì English.
// • QUAN TRỌNG: script.js chạy TRƯỚC fx.js, nên khi applyLanguage()
//   đổi text các <h2> xong thì fx.js mới tách từ → word-reveal đúng ngữ.
// ===========================================
let currentLang = (function detectLang() {
  try {
    const saved = localStorage.getItem('viviLang');
    if (saved === 'vi' || saved === 'en') return saved;
  } catch (e) { /* localStorage bị chặn → bỏ qua */ }
  return (navigator.language || '').toLowerCase().startsWith('vi') ? 'vi' : 'en';
})();

const TRANSLATIONS = {
  en: {
    'doc.title': 'Vivi Soul — Emotional AI music for the gentle hours',

    'nav.features': 'Features',
    'nav.how': 'How it works',
    'nav.tracks': 'Tracks',
    'nav.faq': 'FAQ',
    'nav.subscribe': 'Subscribe',

    'hero.eyebrow': '— AI Music Channel —',
    'hero.title': 'AI music for the gentle hours.',
    'hero.sub': 'Cinematic, soulful compositions for deep focus, late-night reflection, healing, and the bittersweet beauty of memories. Press play — and let the world soften.',
    'hero.cta.subscribe': 'Subscribe on YouTube',
    'hero.cta.explore': 'Explore latest release →',
    'mood.label': "Tonight's mood:",
    'mood.button': 'Change Mood ↻',
    'mood.listen': 'Listen →',

    'proof.title': 'For fans of',

    'features.title': 'Why Vivi Soul',
    'features.lede': 'Music designed for emotion, not algorithms. Three things we care about.',
    'features.f1.num': '01 — Composition',
    'features.f1.title': 'Cinematic by design',
    'features.f1.body': 'Every track is structured like a short film — quiet openings, slow swells, and resolutions that linger. Not background noise.',
    'features.f2.num': '02 — Mood',
    'features.f2.title': 'Healing soundscapes',
    'features.f2.body': 'Soft piano, warm ambience, and gentle textures tuned for late-night calm, focused work, and recovering days.',
    'features.f3.num': '03 — Access',
    'features.f3.title': 'Free to stream on YouTube',
    'features.f3.body': 'No paywalls of any kind — the music lives on YouTube and is free to listen anywhere, anytime. (YouTube may show platform ads depending on your account and region.)',

    'mq1': 'deep focus — <em>late-night soul</em> — healing rain — <em>cinematic memories</em> — nostalgic love —&nbsp;',
    'mq2': 'press play — <em>let the world soften</em> — drift — <em>breathe</em> — stay close to the soul —&nbsp;',

    'how.title': 'How to drift',
    'how.lede': 'Three steps. No app to install.',
    'how.s1.title': 'Subscribe',
    'how.s1.body': 'Follow Vivi Soul on YouTube to get every new track the moment it drops.',
    'how.s2.title': 'Pick a mood',
    'how.s2.body': 'Focus, healing, late-night, nostalgic — choose the soundscape that fits the hour.',
    'how.s3.title': 'Drift',
    'how.s3.body': 'Press play, dim the lights, and let the music carry you for as long as you need.',

    'latest.kicker': 'Latest Release',
    'latest.title': 'Newest Release',
    'latest.sub': 'Press play and let the evening drift in.',
    'latest.watch': 'Watch Latest on YouTube',

    'tracks.title': 'Also from the channel',
    'tracks.lede': 'Soft lo-fi soul, healing ambient, and cinematic pieces from the channel — pick the hour that fits yours. Tap to watch on YouTube.',
    'tracks.note': 'New releases land here as they drop — subscribe so you never miss the quiet ones.',
    'tracks.watch': 'Watch on YouTube',
    'tracks.preview': 'Preview',
    'tracks.watchAria': 'Watch {title} on YouTube',
    'tracks.previewAria': 'Play a short preview of {title}',

    'faq.title': 'Questions',
    'faq.lede': 'Things people often ask.',
    'faq.q1': 'Is the music really AI-generated?',
    'faq.a1': 'Yes. Every track on Vivi Soul is composed with AI tools, then arranged, mixed, and curated by a human ear so the emotion lands. Think of it as a co-creation — machine + soul.',
    'faq.q2': 'Is it free to listen?',
    'faq.a2': 'Always. The channel lives on YouTube and the music itself will never sit behind a paywall. If you want to support, subscribing and sharing means more than money.',
    'faq.q3': 'How often do new tracks drop?',
    'faq.a3': "New pieces arrive regularly, usually late in the evening. Subscribe with the bell on so you don't miss the quieter releases.",
    'faq.q4': 'Can I use the music in my own videos?',
    'faq.a4': 'Reach out before commercial use. For personal projects, study sessions, and journaling streams — go ahead, just credit Vivi Soul in the description.',

    'updates.title': 'Quiet mail, not noise.',
    'updates.lede': 'One gentle email when a new track drops. No spam, no daily digests — unsubscribe anytime.',
    'updates.aria': 'Email address',
    'updates.button': 'Notify me',
    'updates.success': "Thank you — you're on the list. New releases will find you. 🤍",

    'closing.title': 'Stay close to the soul.',
    'closing.sub': 'Subscribe on YouTube — never miss a new release.',
    'closing.cta': 'Subscribe on YouTube',

    'footer.faq': 'FAQ',
    'footer.contact': 'Contact via YouTube'
  },
  vi: {
    'doc.title': 'Vivi Soul — Nhạc AI giàu cảm xúc cho những giờ dịu êm',

    'nav.features': 'Nổi bật',
    'nav.how': 'Cách nghe',
    'nav.tracks': 'Bản nhạc',
    'nav.faq': 'Hỏi đáp',
    'nav.subscribe': 'Đăng ký',

    'hero.eyebrow': '— Kênh nhạc AI —',
    'hero.title': 'Nhạc AI cho những giờ dịu êm.',
    'hero.sub': 'Những bản nhạc giàu cảm xúc, đậm chất điện ảnh — cho lúc tập trung sâu, suy tư đêm khuya, chữa lành và vẻ đẹp man mác của ký ức. Nhấn phát, để thế giới dịu lại.',
    'hero.cta.subscribe': 'Đăng ký trên YouTube',
    'hero.cta.explore': 'Nghe bản mới nhất →',
    'mood.label': 'Tâm trạng tối nay:',
    'mood.button': 'Đổi tâm trạng ↻',
    'mood.listen': 'Nghe →',

    'proof.title': 'Dành cho người yêu thích',

    'features.title': 'Vì sao chọn Vivi Soul',
    'features.lede': 'Âm nhạc tạo ra vì cảm xúc, không vì thuật toán. Ba điều chúng tôi luôn chú tâm.',
    'features.f1.num': '01 — Sáng tác',
    'features.f1.title': 'Đậm chất điện ảnh',
    'features.f1.body': 'Mỗi bản nhạc được dựng như một phim ngắn — mở đầu tĩnh lặng, cao trào chậm rãi, và đoạn kết còn vương vấn. Không phải tiếng ồn nền.',
    'features.f2.num': '02 — Tâm trạng',
    'features.f2.title': 'Âm cảnh chữa lành',
    'features.f2.body': 'Tiếng dương cầm êm dịu, không gian ấm áp và những lớp âm nhẹ nhàng — dành cho đêm bình yên, lúc làm việc tập trung và những ngày hồi phục.',
    'features.f3.num': '03 — Tiếp cận',
    'features.f3.title': 'Nghe miễn phí trên YouTube',
    'features.f3.body': 'Không hề có tường phí — toàn bộ nhạc nằm trên YouTube, nghe miễn phí mọi lúc mọi nơi. (YouTube có thể hiển thị quảng cáo tùy theo tài khoản và khu vực của bạn.)',

    'mq1': 'tập trung sâu — <em>tâm hồn đêm khuya</em> — mưa chữa lành — <em>ký ức điện ảnh</em> — tình yêu hoài niệm —&nbsp;',
    'mq2': 'nhấn phát — <em>để thế giới dịu lại</em> — thả trôi — <em>hít thở</em> — ở gần với tâm hồn —&nbsp;',

    'how.title': 'Cách thả trôi',
    'how.lede': 'Ba bước. Không cần cài ứng dụng.',
    'how.s1.title': 'Đăng ký',
    'how.s1.body': 'Theo dõi Vivi Soul trên YouTube để nhận mọi bản nhạc mới ngay khi ra mắt.',
    'how.s2.title': 'Chọn tâm trạng',
    'how.s2.body': 'Tập trung, chữa lành, đêm khuya, hoài niệm — chọn âm cảnh hợp với giờ phút của bạn.',
    'how.s3.title': 'Thả trôi',
    'how.s3.body': 'Nhấn phát, giảm đèn, và để âm nhạc đưa bạn đi xa bao lâu tùy thích.',

    'latest.kicker': 'Mới ra mắt',
    'latest.title': 'Bản phát hành mới nhất',
    'latest.sub': 'Nhấn phát và để buổi tối nhẹ trôi vào.',
    'latest.watch': 'Xem bản mới trên YouTube',

    'tracks.title': 'Cũng từ kênh',
    'tracks.lede': 'Lo-fi soul êm dịu, ambient chữa lành và những bản cinematic từ kênh — chọn giờ phút hợp với bạn. Chạm để xem trên YouTube.',
    'tracks.note': 'Bản mới sẽ xuất hiện ở đây ngay khi ra mắt — đăng ký để không bỏ lỡ những bản lặng lẽ nhất.',
    'tracks.watch': 'Xem trên YouTube',
    'tracks.preview': 'Nghe thử',
    'tracks.watchAria': 'Xem {title} trên YouTube',
    'tracks.previewAria': 'Nghe thử một đoạn ngắn của {title}',

    'faq.title': 'Câu hỏi',
    'faq.lede': 'Những điều mọi người hay hỏi.',
    'faq.q1': 'Nhạc có thật sự do AI tạo ra không?',
    'faq.a1': 'Đúng vậy. Mỗi bản nhạc trên Vivi Soul được sáng tác bằng công cụ AI, rồi được tai người phối khí, mix và chọn lọc để cảm xúc chạm tới bạn. Hãy xem đó là sự đồng sáng tạo — máy móc + tâm hồn.',
    'faq.q2': 'Nghe có miễn phí không?',
    'faq.a2': 'Luôn luôn. Kênh nằm trên YouTube và âm nhạc sẽ không bao giờ bị chặn sau tường phí. Nếu muốn ủng hộ, việc đăng ký và chia sẻ còn ý nghĩa hơn cả tiền bạc.',
    'faq.q3': 'Bao lâu thì có bản nhạc mới?',
    'faq.a3': 'Bản nhạc mới ra đều đặn, thường vào buổi tối muộn. Hãy đăng ký và bật chuông để không bỏ lỡ những bản lặng lẽ.',
    'faq.q4': 'Tôi có thể dùng nhạc trong video của mình không?',
    'faq.a4': 'Hãy liên hệ trước nếu dùng cho mục đích thương mại. Với dự án cá nhân, buổi học hay stream viết lách — cứ tự nhiên, chỉ cần ghi nguồn Vivi Soul trong phần mô tả.',

    'updates.title': 'Thư yên tĩnh, không phải tiếng ồn.',
    'updates.lede': 'Một email nhẹ nhàng mỗi khi có bản nhạc mới. Không spam, không bản tin hằng ngày — hủy đăng ký bất cứ lúc nào.',
    'updates.aria': 'Địa chỉ email',
    'updates.button': 'Báo cho tôi',
    'updates.success': 'Cảm ơn bạn — bạn đã có trong danh sách. Bản nhạc mới sẽ tìm đến bạn. 🤍',

    'closing.title': 'Ở gần với tâm hồn.',
    'closing.sub': 'Đăng ký trên YouTube — không bỏ lỡ bản nhạc nào.',
    'closing.cta': 'Đăng ký trên YouTube',

    'footer.faq': 'Hỏi đáp',
    'footer.contact': 'Liên hệ qua YouTube'
  }
};

// Lấy 1 chuỗi đã dịch theo ngôn ngữ hiện tại (fallback về English nếu thiếu).
function t(key) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  if (dict[key] != null) return dict[key];
  return TRANSLATIONS.en[key] != null ? TRANSLATIONS.en[key] : key;
}

// ===========================================
// 1) FEATURED TRACKS — single source of truth
// -------------------------------------------
// Toàn bộ nội dung track nằm ở đây. Section Featured Tracks
// trong index.html được render từ mảng này.
//
// Thêm / sửa track:
//   - Sửa 1 object bên dưới (title / mood / description / url).
//   - Phần song ngữ: thêm `moodVi` + `descVi` cho tiếng Việt.
//     (title GIỮ tiếng Anh — đúng với tên video thật trên YouTube.)
//   - Lưu file → refresh trình duyệt. Xong.
// ===========================================

// ===========================================
// ▶ CÁCH CẬP NHẬT "LATEST RELEASE" KHI CÓ VIDEO MỚI:
//   featuredTracks[0] (object ĐẦU TIÊN bên dưới) = Latest Release.
//   Khi đăng video mới trên YouTube, chỉ cần:
//     1) Mở video trên YouTube, copy phần sau "v=" trong link
//        (vd https://www.youtube.com/watch?v=ABC123 → videoId là 'ABC123')
//     2) Dán vào `videoId` VÀ `url` của object đầu tiên.
//     3) (tùy chọn) sửa title / mood / description (+ moodVi / descVi) cho khớp.
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
    moodVi: 'Soft Soul · Đêm tĩnh lặng',
    description: 'A soft soul piece for the hour the city finally goes quiet — warm keys, slow breath, and room to feel.',
    descVi: 'Một bản soft soul cho khoảnh khắc thành phố cuối cùng cũng lặng yên — phím đàn ấm áp, hơi thở chậm rãi, và khoảng lặng để cảm nhận.',
    videoId: 'gJwebqoc5fg',
    url: 'https://www.youtube.com/watch?v=gJwebqoc5fg'
  },
  {
    title: 'Quiet Diner at 2AM',
    mood: 'Lo-Fi Soul · After Midnight',
    moodVi: 'Lo-Fi Soul · Quá nửa đêm',
    description: 'Late-night lo-fi soul for empty streets and warm neon — quiet company for whoever is still awake.',
    descVi: 'Lo-fi soul đêm khuya cho những con phố vắng và ánh neon ấm — người bạn lặng lẽ cho ai vẫn còn thức.',
    videoId: 'gYsWF2XzSiU',
    url: 'https://www.youtube.com/watch?v=gYsWF2XzSiU'
  },
  {
    title: 'Coming Home Slowly',
    mood: 'Lo-Fi Soul · Healing',
    moodVi: 'Lo-Fi Soul · Chữa lành',
    description: 'Gentle, unhurried lo-fi soul for quiet healing — the sound of finally letting your shoulders drop.',
    descVi: 'Lo-fi soul dịu dàng, thong thả cho sự chữa lành lặng lẽ — âm thanh của khoảnh khắc cuối cùng cũng buông lỏng đôi vai.',
    videoId: 'ACCAJRzoAHU',
    url: 'https://www.youtube.com/watch?v=ACCAJRzoAHU'
  },
  {
    title: 'Blue Hour Drizzle',
    mood: 'Lo-Fi Soul · After Rain',
    moodVi: 'Lo-Fi Soul · Sau cơn mưa',
    description: 'Soft lo-fi soul for the blue hour after rain — fresh air, wet streets, and slow thoughts.',
    descVi: 'Lo-fi soul êm dịu cho giờ xanh sau mưa — không khí trong lành, phố ướt, và những suy nghĩ chậm rãi.',
    videoId: 'k8bmgboWxus',
    url: 'https://www.youtube.com/watch?v=k8bmgboWxus'
  },
  {
    title: 'When Morning Finds Me',
    mood: 'Lo-Fi Soul · Gentle Reset',
    moodVi: 'Lo-Fi Soul · Khởi đầu nhẹ nhàng',
    description: 'A gentle morning reset — soft keys for starting the day kindly instead of loudly.',
    descVi: 'Một khởi đầu buổi sáng nhẹ nhàng — phím đàn êm để bắt đầu ngày mới dịu dàng thay vì ồn ã.',
    videoId: '7wLPLBYkHs4',
    url: 'https://www.youtube.com/watch?v=7wLPLBYkHs4'
  },
  {
    title: 'Quiet Fire',
    mood: 'Cinematic · Inner Strength',
    moodVi: 'Cinematic · Sức mạnh nội tâm',
    description: 'A cinematic song about quiet inner strength — slow swells that hold you steady.',
    descVi: 'Một bản cinematic về sức mạnh nội tâm lặng lẽ — những cao trào chậm rãi giữ bạn vững vàng.',
    videoId: 'pV3QkZVC2aI',
    url: 'https://www.youtube.com/watch?v=pV3QkZVC2aI'
  },
  {
    title: 'A Quiet Room for Slowing Down',
    mood: 'Lo-Fi Ambient · Late Night',
    moodVi: 'Lo-Fi Ambient · Đêm muộn',
    description: 'Soft late-night ambient for slowing down — a quiet room you can step into anytime.',
    descVi: 'Ambient đêm muộn êm dịu để sống chậm lại — một căn phòng tĩnh lặng bạn có thể bước vào bất cứ lúc nào.',
    videoId: 'QWEDrddBqEg',
    url: 'https://www.youtube.com/watch?v=QWEDrddBqEg'
  }
];

// Mood + description hiển thị theo ngôn ngữ hiện tại.
function trackMood(track) { return currentLang === 'vi' && track.moodVi ? track.moodVi : track.mood; }
function trackDesc(track) { return currentLang === 'vi' && track.descVi ? track.descVi : track.description; }

// Render the cards into <div id="tracks-grid"> by looping through the array.
function renderFeaturedTracks() {
  const grid = document.getElementById('tracks-grid');
  if (!grid) return;

  // Clear whatever might be in the grid first.
  grid.innerHTML = '';

  // Skip the first track — it's already shown as Latest Release above.
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
         aria-label="${t('tracks.watchAria').replace('{title}', track.title)}">
        <img src="${thumbnailSrc}" alt="${track.title}" loading="lazy"
             onerror="this.onerror=null;this.src='${thumbnailFallback}';">
        <span class="play-badge" aria-hidden="true"></span>
      </a>
      <span class="mood">${trackMood(track)}</span>
      <h3>${track.title}</h3>
      <p class="desc">${trackDesc(track)}</p>
      ${track.previewSrc ? `
      <button class="preview-btn" data-preview="${track.previewSrc}" aria-label="${t('tracks.previewAria').replace('{title}', track.title)}">
        <span class="preview-icon" aria-hidden="true">▶</span> ${t('tracks.preview')}
      </button>` : ''}
      <a class="btn btn-secondary" style="width: 100%;"
         href="${track.url}" target="_blank" rel="noopener noreferrer">
        ${YT_ICON_SVG}${t('tracks.watch')}
      </a>
    `;

    // Attach the finished card to the grid in the page.
    grid.appendChild(card);
  });

  // Re-bind audio preview buttons (cards were just regenerated).
  bindPreviewButtons();
}

// ===========================================
// Render the Latest Release card (uses featuredTracks[0])
// ===========================================
function renderLatestRelease() {
  const container = document.getElementById('latest-release-card');
  if (!container) return;

  const latestTrack = featuredTracks[0];

  // Latest Release is the hero card, so use the largest thumbnail (1280×720).
  // maxresdefault doesn't exist for every video — onerror falls back to hqdefault.
  const thumbnailSrc = `https://img.youtube.com/vi/${latestTrack.videoId}/maxresdefault.jpg`;
  const thumbnailFallback = `https://img.youtube.com/vi/${latestTrack.videoId}/hqdefault.jpg`;

  container.innerHTML = `
    <a class="latest-release-thumbnail"
       href="${latestTrack.url}" target="_blank" rel="noopener noreferrer"
       aria-label="${t('tracks.watchAria').replace('{title}', latestTrack.title)}">
      <img src="${thumbnailSrc}" alt="${latestTrack.title}" loading="lazy"
           onerror="this.onerror=null;this.src='${thumbnailFallback}';">
      <span class="play-badge" aria-hidden="true"></span>
    </a>
    <div class="latest-release-content">
      <span class="mood">${trackMood(latestTrack)}</span>
      <h3>${latestTrack.title}</h3>
      <p>${trackDesc(latestTrack)}</p>
      <div class="latest-release-actions">
        <a class="btn btn-primary"
           href="${latestTrack.url}" target="_blank" rel="noopener noreferrer">
          ${YT_ICON_SVG}${t('latest.watch')}
        </a>
      </div>
    </div>
  `;
}

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
// Mỗi mood gắn 1 video THẬT trên kênh nên "Listen →" luôn
// dẫn tới chỗ hợp vibe. `labelVi` cho nhãn tiếng Việt.
// ===========================================
const moods = [
  { label: 'Late-night soul',    labelVi: 'Tâm hồn đêm khuya', url: 'https://www.youtube.com/watch?v=gJwebqoc5fg' }, // When the City Finally Sleeps
  { label: 'Healing rain',       labelVi: 'Mưa chữa lành',     url: 'https://www.youtube.com/watch?v=k8bmgboWxus' }, // Blue Hour Drizzle
  { label: 'Cinematic memories', labelVi: 'Ký ức điện ảnh',    url: 'https://www.youtube.com/watch?v=pV3QkZVC2aI' }, // Quiet Fire
  { label: 'Deep focus',         labelVi: 'Tập trung sâu',     url: 'https://www.youtube.com/watch?v=QWEDrddBqEg' }, // A Quiet Room for Slowing Down
  { label: 'Nostalgic love',     labelVi: 'Tình yêu hoài niệm', url: 'https://www.youtube.com/watch?v=ACCAJRzoAHU' }  // Coming Home Slowly
];

let currentMood = 0;
const moodText = document.getElementById('moodText');
const moodBtn = document.getElementById('moodBtn');
const moodLink = document.getElementById('moodLink');

function applyMood(index) {
  const mood = moods[index];
  if (moodText) moodText.textContent = currentLang === 'vi' && mood.labelVi ? mood.labelVi : mood.label;
  if (moodLink) moodLink.href = mood.url;
}

if (moodBtn && moodText) {
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
// 5) APPLY LANGUAGE — đổi toàn bộ chữ + render lại phần động
// ===========================================
function applyLanguage(lang) {
  if (lang !== 'vi' && lang !== 'en') lang = 'en';
  currentLang = lang;
  try { localStorage.setItem('viviLang', lang); } catch (e) { /* bị chặn → bỏ qua */ }

  document.documentElement.lang = lang;
  const dict = TRANSLATIONS[lang];

  // Chữ thuần (textContent)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (dict[k] != null) el.textContent = dict[k];
  });
  // Chữ có thẻ HTML (innerHTML) — vd marquee với <em>
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const k = el.getAttribute('data-i18n-html');
    if (dict[k] != null) el.innerHTML = dict[k];
  });
  // aria-label
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const k = el.getAttribute('data-i18n-aria');
    if (dict[k] != null) el.setAttribute('aria-label', dict[k]);
  });

  if (dict['doc.title']) document.title = dict['doc.title'];

  // Phần động: render lại theo ngôn ngữ mới
  renderFeaturedTracks();
  renderLatestRelease();
  applyMood(currentMood);

  // Cập nhật nút chuyển ngữ
  document.querySelectorAll('#langSwitch button[data-lang]').forEach(b => {
    b.setAttribute('aria-pressed', String(b.dataset.lang === currentLang));
  });

  // GSAP word-reveal (fx.js) đọc lại textContent — nếu đã tách từ trước đó,
  // báo nó refresh để các <h2> vừa đổi chữ hiển thị đúng.
  if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === 'function') {
    window.ScrollTrigger.refresh();
  }
}

// Wiring nút chuyển ngữ trong nav
document.querySelectorAll('#langSwitch button[data-lang]').forEach(b => {
  b.addEventListener('click', () => applyLanguage(b.dataset.lang));
});

// ===========================================
// 6) SCROLL REVEAL — fallback khi GSAP (fx.js) bị chặn
// ===========================================
(function setupScrollReveal() {
  const prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // fx.js (GSAP ScrollTrigger) đảm nhận reveal khi CDN tải được —
  // khối này chỉ còn là fallback khi GSAP bị chặn / offline.
  if (window.gsap && window.ScrollTrigger && !prefersReduced) return;

  const targets = document.querySelectorAll(
    '.features, .how, .latest-release-section, .tracks, .faq, .updates, .closing'
  );
  if (!targets.length) return;

  if (prefersReduced || !('IntersectionObserver' in window)) return;

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(el => observer.observe(el));
})();

// ===========================================
// 7) EMAIL CAPTURE — Formspree, with graceful hiding
// -------------------------------------------
// ▶ CÁCH BẬT FORM EMAIL:
//   1) Tạo form miễn phí tại https://formspree.io → copy Form ID (vd 'xkgwabcd')
//   2) Trong index.html, thay FORM_ID_TODO trong action của #emailForm
//      bằng ID thật → section tự hiện ra.
// Khi action còn chứa FORM_ID_TODO, cả section được ẩn đi.
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
// 8) AUDIO PREVIEW — play 15–30s snippets on track cards
// -------------------------------------------
// Cards chỉ hiện nút Preview khi track có `previewSrc`.
// `bindPreviewButtons()` gọi lại sau mỗi lần render (kể cả khi đổi ngôn ngữ)
// nên nút luôn có listener; cờ data-bound chống gắn trùng.
// ===========================================
const previewPlayer = new Audio();
let activePreviewBtn = null;

function stopPreview() {
  previewPlayer.pause();
  previewPlayer.currentTime = 0;
  if (activePreviewBtn) {
    activePreviewBtn.classList.remove('playing');
    const icon = activePreviewBtn.querySelector('.preview-icon');
    if (icon) icon.textContent = '▶';
    activePreviewBtn = null;
  }
}
previewPlayer.addEventListener('ended', stopPreview);

function bindPreviewButtons() {
  document.querySelectorAll('.preview-btn').forEach(btn => {
    if (btn.dataset.bound) return;   // tránh gắn listener trùng
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      if (activePreviewBtn === btn) { stopPreview(); return; }   // tap again = stop
      stopPreview();
      previewPlayer.src = btn.dataset.preview;
      previewPlayer.play();
      btn.classList.add('playing');
      const icon = btn.querySelector('.preview-icon');
      if (icon) icon.textContent = '❚❚';
      activePreviewBtn = btn;
    });
  });
}

// ===========================================
// 9) KHỞI TẠO — áp ngôn ngữ ban đầu (render lần đầu nằm trong đây)
// Chạy TRƯỚC fx.js → các <h2> đã đúng ngữ khi fx.js tách từ word-reveal.
// ===========================================
applyLanguage(currentLang);
