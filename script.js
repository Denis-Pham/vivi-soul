// ===========================================
// VIVI SOUL — Nội dung + logic tương tác
// (Theo Vivi Soul Design System — xem DESIGN.md)
// ===========================================

// Reusable YouTube logo SVG (used by every Listen button)
const YT_ICON_SVG = '<svg class="yt-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>';

// Waveform glyph — motif thương hiệu trên mood chip + poster fallback
const WAVE_SVG = '<svg class="mood-chip-wave" width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden="true"><line x1="2" x2="2" y1="6" y2="12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="6" x2="6" y1="2" y2="16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="10" x2="10" y1="4" y2="14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="14" x2="14" y1="1" y2="17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="18" x2="18" y1="5" y2="13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
const POSTER_SVG = '<svg width="46" height="30" viewBox="0 0 46 30" fill="none" aria-hidden="true"><line x1="3" x2="3" y1="12" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="8" x2="8" y1="9" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="13" x2="13" y1="5" y2="25" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18" x2="18" y1="10" y2="20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="23" x2="23" y1="3" y2="27" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="28" x2="28" y1="11" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="33" x2="33" y1="7" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="38" x2="38" y1="4" y2="26" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="43" x2="43" y1="11.5" y2="18.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

// ===========================================
// 0) NGÔN NGỮ (i18n) — song ngữ Anh / Việt
// -------------------------------------------
// • Chữ tĩnh trong index.html: data-i18n / data-i18n-html /
//   data-i18n-aria / data-i18n-alt (alt của ảnh).
// • Chữ động (track card, mood) đọc trực tiếp từ `currentLang`.
// • Lựa chọn lưu ở localStorage('viviLang'); mặc định theo trình duyệt.
// • QUAN TRỌNG: script.js chạy TRƯỚC fx.js.
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
    'doc.title': 'Vivi Soul — AI music for the gentle hours',
    'skip': 'Skip to content',

    'nav.moods': 'Moods',
    'nav.releases': 'Releases',
    'nav.story': 'Story',
    'nav.listen': 'How to listen',
    'nav.faq': 'FAQ',
    'nav.subscribe': 'Subscribe',
    'nav.close': 'Close',

    'hero.eyebrow': 'An AI-assisted music channel',
    'hero.title': 'AI music for the gentle hours.',
    'hero.sub': 'Cinematic, soulful compositions for deep focus, late-night reflection, healing, and the bittersweet beauty of memories. Press play — and let the world soften.',
    'hero.cta.primary': 'Listen to the latest release',
    'hero.cta.secondary': 'Subscribe on YouTube',
    'hero.latest': 'Latest release',

    'moods.eyebrow': 'What kind of hour is this?',
    'moods.title': 'Start with a mood.',
    'moods.sub': "Not a genre, not an algorithm — a feeling. Choose the hour you're in and Vivi finds the sound for it.",
    'moods.recommended': 'Recommended for this hour',
    'moods.listen': 'Listen on YouTube',

    'latest.kicker': 'Latest release',
    'latest.title': 'The newest quiet hour.',
    'latest.sub': 'Press play and let the evening drift in.',

    'releases.eyebrow': 'The archive',
    'releases.title': 'A small collection for slow hours.',
    'releases.sub': 'Soft lo-fi soul, healing ambient, and cinematic pieces. Pick the hour that fits yours — each one opens on YouTube.',

    'why.eyebrow': 'Why Vivi Soul',
    'why.title': 'Made for emotion, not for the feed.',
    'why.p1.num': '01',
    'why.p1.title': 'Cinematic by design',
    'why.p1.body': 'Every track is structured like a short film — quiet openings, slow swells, and resolutions that linger. Not background noise.',
    'why.p2.num': '02',
    'why.p2.title': 'Emotional soundscapes',
    'why.p2.body': 'Soft piano, warm ambience, and gentle textures made for late-night calm, focused work, and recovering days.',
    'why.p3.num': '03',
    'why.p3.title': 'AI-assisted, human-curated',
    'why.p3.body': 'AI tools help shape each idea, but the arrangement, selection, editing, and emotional curation are human work. The feeling is chosen, not generated.',

    'story.eyebrow': 'Meet Vivi',
    'story.title': 'The quiet companion behind every release.',
    'story.body': 'Vivi is present in the room, never demanding attention, always holding the mood. Not a mascot and not a brand face — a feeling that stays with you across different hours: the warm lamp left on after midnight, the calm on the far side of a heavy day.',
    'story.body2': 'The channel exists for the moments music is really for — focusing, resting, recovering, remembering. Sound and image are made as one world so that pressing play feels less like opening an app and more like stepping into a room that was left warm for you.',
    'story.emblemAlt': 'Vivi Soul emblem held in a soft rose glow',
    'story.caption': 'Vivi keeps the hour with you.',

    'listen.eyebrow': 'How to listen',
    'listen.title': 'Three steps. No app to install.',
    'listen.s1.title': 'Choose your hour',
    'listen.s1.body': 'Focus, late-night, healing, a rainy window — pick the mood that fits the moment.',
    'listen.s2.title': 'Press play',
    'listen.s2.body': 'One track opens on YouTube. No app to install, no account required.',
    'listen.s3.title': 'Let the room soften',
    'listen.s3.body': 'Dim the lights, breathe out, and stay as long as you need. Subscribing is optional.',

    'faq.eyebrow': 'Questions & trust',
    'faq.title': 'The things people ask.',
    'faq.q1': 'Is the music created with AI?',
    'faq.a1': 'Yes. Every track is composed with AI tools, then arranged, mixed, and curated by a human ear so the emotion lands. Think of it as a co-creation — the machine helps, the taste is human.',
    'faq.q2': 'Is listening free?',
    'faq.a2': 'Always. The music lives on YouTube and will never sit behind a paywall. YouTube itself may show platform ads depending on your account and region. "Free to listen", though, is not the same as "free to reuse".',
    'faq.q3': 'How often are new tracks released?',
    'faq.a3': 'New pieces arrive regularly, usually late in the evening. Subscribe with the bell on so the quieter releases still find you.',
    'faq.q4': 'Can I use the music in my own videos?',
    'faq.a4': 'Please contact Vivi Soul before reusing music in videos, streams, client work, or commercial projects. Permission and credit requirements may vary by track — and AI assistance does not automatically determine licensing rights.',
    'faq.q5': 'How do I request commercial use or a collaboration?',
    'faq.a5': "Reach out through the channel's About page with a short note about your project. Vivi Soul reads every message and replies to genuine collaboration and licensing requests.",

    'updates.eyebrow': 'Quiet mail',
    'updates.title': 'Quiet mail, not noise.',
    'updates.lede': 'One gentle email when a new track drops. No spam, no daily digests — unsubscribe anytime.',
    'updates.aria': 'Email address',
    'updates.button': 'Notify me',
    'updates.success': "Thank you — you're on the list. New releases will find you.",

    'cta.title': 'Stay close to the soul.',
    'cta.sub': 'Subscribe on YouTube and the next quiet hour will find you.',
    'cta.primary': 'Subscribe on YouTube',
    'cta.secondary': 'Explore the latest release',
    'cta.collab': 'Collaboration & music use',

    'footer.tagline': 'AI music for the gentle hours.',
    'footer.free': 'Free on YouTube',
    'footer.nav': 'Explore',
    'footer.connect': 'Connect',
    'footer.contact': 'Contact via YouTube',
    'footer.usage': 'Free to listen on YouTube. Free to listen is not free to reuse — please ask before using any track in your own videos, streams, or projects.',
    'footer.rights': 'All rights reserved.',

    'tracks.watch': 'Watch on YouTube',
    'tracks.preview': 'Preview',
    'tracks.watchAria': 'Watch {title} on YouTube',
    'tracks.previewAria': 'Play a short preview of {title}'
  },
  vi: {
    'doc.title': 'Vivi Soul — Nhạc AI cho những giờ dịu êm',
    'skip': 'Tới nội dung chính',

    'nav.moods': 'Tâm trạng',
    'nav.releases': 'Bản nhạc',
    'nav.story': 'Câu chuyện',
    'nav.listen': 'Cách nghe',
    'nav.faq': 'Hỏi đáp',
    'nav.subscribe': 'Đăng ký',
    'nav.close': 'Đóng',

    'hero.eyebrow': 'Một kênh nhạc được AI hỗ trợ',
    'hero.title': 'Nhạc AI cho những giờ dịu êm.',
    'hero.sub': 'Những bản nhạc giàu cảm xúc, đậm chất điện ảnh — cho lúc tập trung sâu, suy tư đêm khuya, hồi phục sau một ngày dài và vẻ đẹp man mác của ký ức. Nhấn phát, để thế giới dịu lại.',
    'hero.cta.primary': 'Nghe bản phát hành mới nhất',
    'hero.cta.secondary': 'Đăng ký trên YouTube',
    'hero.latest': 'Bản mới nhất',

    'moods.eyebrow': 'Đây là giờ phút như thế nào?',
    'moods.title': 'Bắt đầu bằng một tâm trạng.',
    'moods.sub': 'Không phải thể loại, không phải thuật toán — mà là một cảm xúc. Chọn giờ phút bạn đang ở, Vivi tìm âm thanh cho nó.',
    'moods.recommended': 'Gợi ý cho giờ phút này',
    'moods.listen': 'Nghe trên YouTube',

    'latest.kicker': 'Mới ra mắt',
    'latest.title': 'Giờ tĩnh lặng mới nhất.',
    'latest.sub': 'Nhấn phát và để buổi tối nhẹ trôi vào.',

    'releases.eyebrow': 'Kho nhạc',
    'releases.title': 'Một tuyển tập nhỏ cho những giờ chậm.',
    'releases.sub': 'Lo-fi soul êm dịu, ambient chữa lành và những bản cinematic. Chọn giờ phút hợp với bạn — mỗi bản đều mở trên YouTube.',

    'why.eyebrow': 'Vì sao chọn Vivi Soul',
    'why.title': 'Tạo ra vì cảm xúc, không vì lượt xem.',
    'why.p1.num': '01',
    'why.p1.title': 'Đậm chất điện ảnh',
    'why.p1.body': 'Mỗi bản nhạc được dựng như một phim ngắn — mở đầu tĩnh lặng, cao trào chậm rãi, và đoạn kết còn vương vấn. Không phải tiếng ồn nền.',
    'why.p2.num': '02',
    'why.p2.title': 'Âm cảnh giàu cảm xúc',
    'why.p2.body': 'Tiếng dương cầm êm, không gian ấm áp và những lớp âm nhẹ nhàng — dành cho đêm bình yên, lúc làm việc tập trung và những ngày hồi phục.',
    'why.p3.num': '03',
    'why.p3.title': 'AI hỗ trợ, con người chọn lọc',
    'why.p3.body': 'Công cụ AI giúp định hình mỗi ý tưởng, nhưng việc phối khí, chọn lọc, biên tập và chăm chút cảm xúc là do con người. Cảm xúc được chọn lựa, không phải sinh ra tự động.',

    'story.eyebrow': 'Gặp Vivi',
    'story.title': 'Người bạn lặng lẽ sau mỗi bản nhạc.',
    'story.body': 'Vivi hiện diện trong căn phòng, không bao giờ đòi hỏi sự chú ý, luôn giữ lấy tâm trạng. Không phải một linh vật, cũng không phải gương mặt thương hiệu — mà là một cảm xúc ở lại với bạn qua những giờ khác nhau: ngọn đèn ấm còn sáng sau nửa đêm, sự bình yên ở phía bên kia một ngày nặng nề.',
    'story.body2': 'Kênh tồn tại cho những khoảnh khắc mà âm nhạc thật sự dành cho — tập trung, nghỉ ngơi, hồi phục, hoài niệm. Âm thanh và hình ảnh được tạo nên như một thế giới, để việc nhấn phát bớt giống mở một ứng dụng, mà giống bước vào một căn phòng đã được giữ ấm sẵn cho bạn.',
    'story.emblemAlt': 'Biểu tượng Vivi Soul trong quầng sáng hồng dịu',
    'story.caption': 'Vivi giữ lấy giờ phút cùng bạn.',

    'listen.eyebrow': 'Cách nghe',
    'listen.title': 'Ba bước. Không cần cài ứng dụng.',
    'listen.s1.title': 'Chọn giờ của bạn',
    'listen.s1.body': 'Tập trung, đêm khuya, chữa lành, một ô cửa mưa — chọn tâm trạng hợp với khoảnh khắc này.',
    'listen.s2.title': 'Nhấn phát',
    'listen.s2.body': 'Một bản nhạc mở ra trên YouTube. Không cần cài ứng dụng, không cần tài khoản.',
    'listen.s3.title': 'Để căn phòng dịu lại',
    'listen.s3.body': 'Giảm đèn, thở ra, và ở lại bao lâu tùy bạn. Việc đăng ký là tùy chọn.',

    'faq.eyebrow': 'Câu hỏi & tin cậy',
    'faq.title': 'Những điều mọi người hay hỏi.',
    'faq.q1': 'Nhạc có được tạo ra bằng AI không?',
    'faq.a1': 'Đúng vậy. Mỗi bản nhạc được sáng tác bằng công cụ AI, rồi được tai người phối khí, mix và chọn lọc để cảm xúc chạm tới bạn. Hãy xem đó là sự đồng sáng tạo — máy móc hỗ trợ, gu thẩm mỹ là của con người.',
    'faq.q2': 'Nghe có miễn phí không?',
    'faq.a2': 'Luôn luôn. Nhạc nằm trên YouTube và sẽ không bao giờ bị chặn sau tường phí. Bản thân YouTube có thể hiển thị quảng cáo tùy theo tài khoản và khu vực của bạn. Tuy nhiên, "miễn phí để nghe" không đồng nghĩa với "miễn phí để dùng lại".',
    'faq.q3': 'Bao lâu thì có bản nhạc mới?',
    'faq.a3': 'Bản nhạc mới ra đều đặn, thường vào buổi tối muộn. Hãy đăng ký và bật chuông để cả những bản lặng lẽ nhất cũng tìm được đến bạn.',
    'faq.q4': 'Tôi có thể dùng nhạc trong video của mình không?',
    'faq.a4': 'Vui lòng liên hệ Vivi Soul trước khi dùng lại nhạc trong video, livestream, dự án khách hàng hay mục đích thương mại. Yêu cầu về quyền và ghi nguồn có thể khác nhau tùy từng bản — và việc có AI hỗ trợ không tự động quyết định quyền cấp phép.',
    'faq.q5': 'Làm sao để xin dùng thương mại hoặc hợp tác?',
    'faq.a5': 'Hãy liên hệ qua trang Giới thiệu của kênh kèm một ghi chú ngắn về dự án của bạn. Vivi Soul đọc mọi tin nhắn và phản hồi những đề nghị hợp tác, cấp phép thật lòng.',

    'updates.eyebrow': 'Thư yên tĩnh',
    'updates.title': 'Thư yên tĩnh, không phải tiếng ồn.',
    'updates.lede': 'Một email nhẹ nhàng mỗi khi có bản nhạc mới. Không spam, không bản tin hằng ngày — hủy đăng ký bất cứ lúc nào.',
    'updates.aria': 'Địa chỉ email',
    'updates.button': 'Báo cho tôi',
    'updates.success': 'Cảm ơn bạn — bạn đã có trong danh sách. Bản nhạc mới sẽ tìm đến bạn.',

    'cta.title': 'Ở gần với tâm hồn.',
    'cta.sub': 'Đăng ký trên YouTube, và giờ tĩnh lặng tiếp theo sẽ tìm đến bạn.',
    'cta.primary': 'Đăng ký trên YouTube',
    'cta.secondary': 'Khám phá bản mới nhất',
    'cta.collab': 'Hợp tác & sử dụng nhạc',

    'footer.tagline': 'Nhạc AI cho những giờ dịu êm.',
    'footer.free': 'Miễn phí trên YouTube',
    'footer.nav': 'Khám phá',
    'footer.connect': 'Kết nối',
    'footer.contact': 'Liên hệ qua YouTube',
    'footer.usage': 'Nghe miễn phí trên YouTube. Miễn phí để nghe không có nghĩa là miễn phí để dùng lại — vui lòng hỏi trước khi dùng bất kỳ bản nhạc nào trong video, livestream hay dự án của bạn.',
    'footer.rights': 'Bảo lưu mọi quyền.',

    'tracks.watch': 'Xem trên YouTube',
    'tracks.preview': 'Nghe thử',
    'tracks.watchAria': 'Xem {title} trên YouTube',
    'tracks.previewAria': 'Nghe thử một đoạn ngắn của {title}'
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
// Toàn bộ nội dung track nằm ở đây. Latest Release + Archive
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
//   Mẹo: muốn giữ video cũ lại trong Archive,
//   hãy chèn THÊM một object mới lên ĐẦU mảng thay vì ghi đè.
// ===========================================
//
// `videoId` là phần sau "v=" trong link YouTube.
// ORDER MATTERS: featuredTracks[0] hiển thị làm Latest Release;
// các track còn lại nằm ở mục Archive ("A small collection…").
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

// ===========================================
// 2) MOODS — 7 "giờ phút", mỗi mood gắn 1 video THẬT trên kênh
// (mood selector "What kind of hour is this?")
// ===========================================
const MOODS = [
  {
    key: 'focus', name: 'Deep Focus', nameVi: 'Tập trung sâu', videoId: 'QWEDrddBqEg',
    desc: 'For the long stretch of work that needs a clear, quiet mind. Nothing pulling at you — only room to think.',
    descVi: 'Cho quãng làm việc dài cần một tâm trí trong và tĩnh. Không gì kéo sự chú ý của bạn — chỉ còn khoảng lặng để suy nghĩ.'
  },
  {
    key: 'late', name: 'Late-night Soul', nameVi: 'Tâm hồn đêm khuya', videoId: 'gJwebqoc5fg',
    desc: 'For the hour the city finally goes quiet. Warm keys, slow breath, and space to feel.',
    descVi: 'Cho giờ khắc thành phố cuối cùng cũng lặng yên. Phím đàn ấm, hơi thở chậm, và khoảng trống để cảm nhận.'
  },
  {
    key: 'healing', name: 'Healing', nameVi: 'Chữa lành', videoId: 'ACCAJRzoAHU',
    desc: 'For the evening after a heavy day. Let your shoulders drop — nothing here asks anything of you.',
    descVi: 'Cho buổi tối sau một ngày nặng nề. Buông lỏng đôi vai — ở đây không điều gì đòi hỏi ở bạn.'
  },
  {
    key: 'morning', name: 'Quiet Morning', nameVi: 'Buổi sáng tĩnh lặng', videoId: '7wLPLBYkHs4',
    desc: 'For beginning the day without rushing. Soft light, a slow start, one breath at a time.',
    descVi: 'Cho lúc bắt đầu ngày mới không vội vã. Ánh sáng dịu, khởi đầu chậm rãi, từng hơi thở một.'
  },
  {
    key: 'rain', name: 'Rainy Window', nameVi: 'Ô cửa mưa', videoId: 'k8bmgboWxus',
    desc: 'For grey afternoons and rain drying on the glass. Slow thoughts, no hurry.',
    descVi: 'Cho những buổi chiều xám và giọt mưa khô dần trên kính. Suy nghĩ chậm lại, không vội vàng.'
  },
  {
    key: 'nostalgic', name: 'Nostalgic', nameVi: 'Hoài niệm', videoId: 'gYsWF2XzSiU',
    desc: 'For the ache of good memories. Empty streets, warm neon, and everyone you used to know.',
    descVi: 'Cho nỗi nhớ dịu dàng về những điều đẹp đẽ. Phố vắng, ánh neon ấm, và những người ta từng quen.'
  },
  {
    key: 'strength', name: 'Inner Strength', nameVi: 'Sức mạnh nội tâm', videoId: 'pV3QkZVC2aI',
    desc: 'For the quiet resolve you build alone. Slow swells that hold you steady.',
    descVi: 'Cho sự vững vàng lặng lẽ bạn tự dựng nên. Những cao trào chậm giữ bạn đứng yên.'
  }
];

let currentMoodKey = 'late';

const trackById = Object.fromEntries(featuredTracks.map(tr => [tr.videoId, tr]));
const watchUrl = id => `https://www.youtube.com/watch?v=${id}`;

// Mood + description hiển thị theo ngôn ngữ hiện tại.
function trackMood(track) { return currentLang === 'vi' && track.moodVi ? track.moodVi : track.mood; }
function trackDesc(track) { return currentLang === 'vi' && track.descVi ? track.descVi : track.description; }
function moodName(m) { return currentLang === 'vi' && m.nameVi ? m.nameVi : m.name; }
function moodDesc(m) { return currentLang === 'vi' && m.descVi ? m.descVi : m.desc; }

// Escape chuỗi trước khi chèn vào attribute HTML (title có thể chứa dấu ")
function escAttr(s) { return String(s).replace(/"/g, '&quot;'); }

// ===========================================
// 3) IMAGE SLOT — thumbnail không bao giờ để lỗ trống
// Chuỗi fallback: sddefault → hqdefault → poster thương hiệu
// (CSS hiện .slot-poster khi data-state="broken")
// ===========================================
function slotHTML(videoId, alt, big) {
  const src = `https://img.youtube.com/vi/${videoId}/${big ? 'maxresdefault' : 'sddefault'}.jpg`;
  const fallback = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const safeAlt = escAttr(alt);
  return `
    <span class="slot">
      <img src="${src}" alt="${safeAlt}" loading="lazy"
           onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='${fallback}';}else{this.closest('.slot').dataset.state='broken';}">
      <span class="slot-poster" aria-hidden="true">${POSTER_SVG}<span class="slot-poster-label">${safeAlt}</span></span>
    </span>`;
}

// ===========================================
// 4) RENDER — Archive ("A small collection for slow hours")
// ===========================================
function renderFeaturedTracks() {
  const grid = document.getElementById('tracks-grid');
  if (!grid) return;

  grid.innerHTML = '';

  // Bỏ track đầu — đã hiển thị làm Latest Release phía trên.
  featuredTracks.slice(1).forEach(track => {
    const card = document.createElement('article');
    card.className = 'rel';
    card.innerHTML = `
      <a class="rel-media" href="${track.url}" target="_blank" rel="noopener noreferrer"
         aria-label="${escAttr(t('tracks.watchAria').replace('{title}', track.title))}">
        ${slotHTML(track.videoId, track.title, false)}
        <span class="play-badge" aria-hidden="true"></span>
      </a>
      <div class="rel-body">
        <span class="tag">${trackMood(track)}</span>
        <h3 class="rel-title">${track.title}</h3>
        <p class="rel-desc">${trackDesc(track)}</p>
        ${track.previewSrc ? `
        <button class="btn btn-secondary btn-sm preview-btn" data-preview="${track.previewSrc}" aria-label="${escAttr(t('tracks.previewAria').replace('{title}', track.title))}" style="width: 100%;">
          <span class="preview-icon" aria-hidden="true">▶</span> ${t('tracks.preview')}
        </button>` : ''}
        <div class="rel-actions">
          <a class="btn btn-secondary" href="${track.url}" target="_blank" rel="noopener noreferrer">
            ${YT_ICON_SVG}${t('tracks.watch')}
          </a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  bindPreviewButtons();
}

// ===========================================
// 5) RENDER — Latest Release (featured card 2 cột, featuredTracks[0])
// ===========================================
function renderLatestRelease() {
  const container = document.getElementById('latest-release-card');
  if (!container) return;

  const latest = featuredTracks[0];

  container.innerHTML = `
    <article class="rel rel--featured">
      <a class="rel-media" href="${latest.url}" target="_blank" rel="noopener noreferrer"
         aria-label="${escAttr(t('tracks.watchAria').replace('{title}', latest.title))}">
        ${slotHTML(latest.videoId, latest.title, true)}
        <span class="rel-badge"><span class="badge"><span class="badge-dot" aria-hidden="true"></span>${t('latest.kicker')}</span></span>
        <span class="play-badge play-badge--lg" aria-hidden="true"></span>
      </a>
      <div class="rel-body">
        <span class="tag">${trackMood(latest)}</span>
        <h3 class="rel-title">${latest.title}</h3>
        <p class="rel-desc">${trackDesc(latest)}</p>
        <div class="rel-actions">
          <a class="btn btn-primary" href="${latest.url}" target="_blank" rel="noopener noreferrer">
            ${YT_ICON_SVG}${t('tracks.watch')}
          </a>
        </div>
      </div>
    </article>
  `;

  // Hero: nút "Listen to the latest release" + chip now-playing + CTA cuối trang
  const heroBtn = document.getElementById('heroListenBtn');
  if (heroBtn) heroBtn.href = latest.url;
  const ctaBtn = document.getElementById('ctaLatestBtn');
  if (ctaBtn) ctaBtn.href = latest.url;
  const now = document.getElementById('heroNow');
  const nowTitle = document.getElementById('heroNowTitle');
  if (now && nowTitle) {
    nowTitle.textContent = latest.title;
    now.href = latest.url;
    now.hidden = false;
  }
}

// ===========================================
// 6) RENDER — Mood selector (chips + feature panel)
// ===========================================
function renderMoodChips() {
  const list = document.getElementById('moodList');
  if (!list) return;
  list.innerHTML = '';
  MOODS.forEach(m => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'mood-chip';
    chip.setAttribute('role', 'tab');
    chip.setAttribute('aria-selected', String(m.key === currentMoodKey));
    chip.setAttribute('aria-controls', 'moodFeature');
    chip.innerHTML = `${WAVE_SVG}<span><span class="mood-chip-name">${moodName(m)}</span></span>`;
    chip.addEventListener('click', () => {
      if (currentMoodKey === m.key) return;
      currentMoodKey = m.key;
      renderMoodChips();
      renderMoodFeature();
    });
    list.appendChild(chip);
  });
}

function renderMoodFeature() {
  const panel = document.getElementById('moodFeature');
  if (!panel) return;
  const mood = MOODS.find(m => m.key === currentMoodKey) || MOODS[0];
  const track = trackById[mood.videoId];
  if (!track) return;
  const url = watchUrl(mood.videoId);

  panel.innerHTML = `
    <span class="tag">${trackMood(track)}</span>
    <p class="mood-feature-desc">${moodDesc(mood)}</p>
    <a class="mood-feature-thumb" href="${url}" target="_blank" rel="noopener noreferrer"
       aria-label="${escAttr(t('moods.listen') + ': ' + track.title)}">
      ${slotHTML(mood.videoId, track.title, false)}
      <span class="play-badge play-badge--lg" aria-hidden="true"></span>
    </a>
    <div class="mood-feature-foot">
      <div>
        <p class="mood-feature-reco">${t('moods.recommended')}</p>
        <p class="mood-feature-track">${track.title}</p>
      </div>
      <a class="btn btn-secondary" href="${url}" target="_blank" rel="noopener noreferrer">
        ${YT_ICON_SVG}${t('moods.listen')}
      </a>
    </div>
  `;
}

// ===========================================
// 7) Auto-update footer year
// ===========================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===========================================
// 8) FAQ accordion — mở mục này thì đóng mục khác
// (<details> thuần nên không có JS vẫn mở/đóng được)
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
// 9) HEADER — thu gọn khi cuộn + mobile menu sheet
// ===========================================
(function setupHeader() {
  const header = document.querySelector('header.topnav');
  if (header) {
    const onScroll = () => header.setAttribute('data-scrolled', String(scrollY > 24));
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
  }

  const sheet = document.getElementById('mobileNav');
  const openBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('menuCloseBtn');
  if (!sheet || !openBtn) return;

  function setMenu(open) {
    const wasOpen = sheet.getAttribute('data-open') === 'true';
    sheet.setAttribute('data-open', String(open));
    openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    // Focus: mở → vào nút đóng; đóng → trả về nút mở (a11y dialog)
    if (open && closeBtn) closeBtn.focus();
    else if (wasOpen && !open) openBtn.focus();
  }
  openBtn.addEventListener('click', () => setMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => setMenu(false));
  sheet.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => {
    if (sheet.getAttribute('data-open') !== 'true') return;
    if (e.key === 'Escape') { setMenu(false); return; }
    // Focus trap: Tab quay vòng trong sheet khi đang mở
    if (e.key === 'Tab') {
      const focusables = sheet.querySelectorAll('a[href], button:not([disabled])');
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  // Màn hình phóng rộng qua breakpoint desktop → sheet tự đóng
  const desktopMQ = matchMedia('(min-width: 861px)');
  const closeOnDesktop = () => { if (desktopMQ.matches) setMenu(false); };
  if (desktopMQ.addEventListener) desktopMQ.addEventListener('change', closeOnDesktop);
  else if (desktopMQ.addListener) desktopMQ.addListener(closeOnDesktop);
})();

// ===========================================
// 10) APPLY LANGUAGE — đổi toàn bộ chữ + render lại phần động
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
  // Chữ có thẻ HTML (innerHTML)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const k = el.getAttribute('data-i18n-html');
    if (dict[k] != null) el.innerHTML = dict[k];
  });
  // aria-label
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const k = el.getAttribute('data-i18n-aria');
    if (dict[k] != null) el.setAttribute('aria-label', dict[k]);
  });
  // alt của ảnh
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const k = el.getAttribute('data-i18n-alt');
    if (dict[k] != null) el.setAttribute('alt', dict[k]);
  });

  if (dict['doc.title']) document.title = dict['doc.title'];

  // Phần động: render lại theo ngôn ngữ mới
  renderFeaturedTracks();
  renderLatestRelease();
  renderMoodChips();
  renderMoodFeature();

  // Cập nhật MỌI cụm nút chuyển ngữ (header, mobile sheet, footer)
  document.querySelectorAll('.lang-switch button[data-lang]').forEach(b => {
    b.setAttribute('aria-pressed', String(b.dataset.lang === currentLang));
  });

  // Báo fx.js đo lại layout (chiều cao section đổi theo độ dài chữ)
  dispatchEvent(new Event('vivi:layout'));
}

// Wiring mọi nút chuyển ngữ (header + mobile + footer)
document.querySelectorAll('.lang-switch button[data-lang]').forEach(b => {
  b.addEventListener('click', () => applyLanguage(b.dataset.lang));
});

// ===========================================
// 11) SCROLL REVEAL — nhẹ nhàng, an toàn tuyệt đối
// -------------------------------------------
// Design system yêu cầu: nội dung HIỂN THỊ MẶC ĐỊNH, chuyển động
// chỉ là lớp phủ. Class .reveal do JS thêm (không JS = không ẩn gì),
// IntersectionObserver bật .is-visible, kèm safety timeout 1800ms
// phòng khi observer không chạy.
// GỌI SAU applyLanguage() đầu tiên — card động phải render xong
// thì querySelectorAll mới bắt được (.rel, .mood-layout…).
// ===========================================
function setupScrollReveal() {
  const prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll(
    '#moods .section-head, #moods .mood-layout, ' +
    '#latest-release .section-head, #latest-release-card, ' +
    '#releases .section-head, #releases .rel, ' +
    '#why .section-head, .why-card, ' +
    '#story .story-grid, ' +
    '#listen .section-head, .step, ' +
    '#faq .section-head, .faq-list, ' +
    '#updates .section-head, .email-form, ' +
    '.closing-inner'
  );
  if (!targets.length) return;

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(el => observer.observe(el));

  // Lưới an toàn: sau 1.8s mọi thứ buộc phải hiện (đề phòng observer treo)
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => el.classList.add('is-visible'));
  }, 1800);
}

// ===========================================
// 12) EMAIL CAPTURE — Formspree, with graceful hiding
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
// 13) AUDIO PREVIEW — play 15–30s snippets on track cards
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
    btn.addEventListener('click', async () => {
      if (activePreviewBtn === btn) { stopPreview(); return; }   // tap again = stop
      stopPreview();
      previewPlayer.src = btn.dataset.preview;
      activePreviewBtn = btn;
      try {
        await previewPlayer.play();
      } catch (err) {
        if (activePreviewBtn === btn) stopPreview();
        return;
      }
      if (activePreviewBtn !== btn) return;
      btn.classList.add('playing');
      const icon = btn.querySelector('.preview-icon');
      if (icon) icon.textContent = '❚❚';
    });
  });
}

// ===========================================
// 14) KHỞI TẠO — áp ngôn ngữ ban đầu (render lần đầu nằm trong đây),
// SAU ĐÓ mới gắn scroll reveal (cần card động đã render).
// Chạy TRƯỚC fx.js → nội dung + chữ đã đúng ngữ khi fx.js đo layout.
// ===========================================
applyLanguage(currentLang);
setupScrollReveal();
