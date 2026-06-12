# 📜 CHANGELOG — Vivi Soul Landing Page

> File ghi lịch sử update của project. **Mọi AI agent / Claude session làm việc trên project này BẮT BUỘC đọc file này trước khi sửa code, và ghi log vào đây sau khi hoàn thành thay đổi.**

---

## 🎯 Mục tiêu project

Xây dựng landing page hoàn chỉnh để giới thiệu và kéo traffic cho kênh YouTube **Vivi Soul** — kênh nhạc AI cinematic / chill / healing.
🔗 Kênh: [youtube.com/@ViviSoulmusic](https://www.youtube.com/@ViviSoulmusic)
🔗 Repo: [github.com/Denis-Pham/vivi-soul](https://github.com/Denis-Pham/vivi-soul) — deploy qua GitHub Pages.

## 🗂 Kết cấu project (cập nhật 2026-06-10)

| File | Vai trò |
|---|---|
| `index.html` | Khung trang + toàn bộ style chính (inline `<style>`, theme tokens ở `:root`). Sections: Hero (mood switcher + dual CTA) → Logo wall → 3 Feature cards → "How to drift" → Latest Release → Featured Tracks → FAQ → Closing CTA → Footer |
| `script.js` | **Toàn bộ nội dung track nằm ở đây** — mảng `featuredTracks` là single source of truth: phần tử `[0]` = Latest Release, phần còn lại đổ vào grid "Also from the channel". Kèm: FAQ accordion, mood switcher (5 moods), scroll reveal fallback (IntersectionObserver — chỉ chạy khi CDN GSAP bị chặn), auto year |
| `fx.js` | **Lớp 3D + chuyển động** (ES module): thế giới wireframe Three.js bám theo scroll (vinyl, sóng âm, equalizer, nốt nhạc, vòng hào quang), GSAP ScrollTrigger (word-reveal, batch reveal, marquee, progress bar), Lenis smooth scroll. Tự tắt hoàn toàn khi reduced-motion / CDN lỗi / WebGL lỗi |
| `style.css` | Style phụ: thumbnail cards, Latest Release section, animations |
| `DESIGN.md` | Design system tham chiếu (Lamborghini, từ getdesign.md) — đọc trước khi sửa UI để giữ ngôn ngữ thiết kế nhất quán |
| `README.md` | Hướng dẫn gốc: chạy local, deploy GitHub Pages, bài học khi build |
| `CHANGELOG.md` | File này — lịch sử update + quy ước làm việc |

**Stack:** HTML + CSS + JavaScript thuần — không framework, không build tool. Thư viện hiệu ứng load qua CDN (GSAP 3.12 + ScrollTrigger, Lenis 1.1, Three.js 0.170 qua importmap) — trang vẫn hoạt động đầy đủ nếu CDN bị chặn. Chạy local: `python3 -m http.server 5173`.

**Theme:** dark cinematic — tím / đen / vàng gold. Tokens: `--bg`, `--surface`, `--fg`, `--muted`, `--accent` (gold `#d4af37`), `--accent-2`… đều ở `:root` trong `index.html`.

## 📋 Quy ước cho AI agents

1. **Đọc `CHANGELOG.md` này trước** khi thay đổi bất cứ thứ gì.
2. Sau mỗi thay đổi, **thêm 1 entry mới lên ĐẦU mục "Lịch sử update"** theo format mẫu bên dưới.
3. Track / video mới: sửa mảng `featuredTracks` trong `script.js` — **không hard-code nội dung track vào HTML**. Video mới nhất luôn chèn lên **đầu** mảng (hướng dẫn chi tiết ngay trong comment ở `script.js`).
4. Màu sắc / theme: sửa qua CSS variables ở `:root` trong `index.html` — không hard-code màu rải rác.
5. **KHÔNG dùng iframe embed YouTube** — kênh từng dính Error 153 (embed bị chặn). Luôn dùng thumbnail `img.youtube.com/vi/<videoId>/...` + link mở YouTube (pattern có sẵn trong `script.js`).
6. Không thêm framework / build tool — giữ project deploy thẳng lên GitHub Pages.
7. Dùng **đường dẫn tương đối** (`href="style.css"`, không có `/` đầu) — site chạy ở subfolder `/vivi-soul/` trên GitHub Pages.
8. Sau khi sửa xong: commit với message rõ ràng, push lên `origin main` để Pages tự redeploy.

### Format entry mẫu

```markdown
## [YYYY-MM-DD] — Tiêu đề ngắn gọn
**Agent/Người thực hiện:** (vd: Claude Code, GPT agent, Denis)
**Files thay đổi:** index.html, script.js
**Nội dung:**
- Mô tả thay đổi 1
- Mô tả thay đổi 2
**Lý do / ghi chú:** (nếu có)
```

## ✅ Việc còn tồn đọng (TODO)

- [ ] **Bật form email**: tạo form miễn phí tại formspree.io → thay `FORM_ID_TODO` trong action của `#emailForm` (`index.html`) bằng ID thật. Section "Quiet mail, not noise." đang TỰ ẨN cho tới khi có ID (logic trong `script.js`)
- [ ] **Bật audio nghe thử**: Denis export snippet MP3 15–30s cho từng track → bỏ vào folder `audio/` → thêm field `previewSrc: 'audio/<file>.mp3'` vào track tương ứng trong `featuredTracks` — nút Preview tự hiện (KHÔNG rip audio từ YouTube — vi phạm ToS)
- [x] ~~Kiểm tra GitHub Pages~~ — ĐÃ LIVE tại `https://denis-pham.github.io/vivi-soul/` (xác nhận 2026-06-10, bản deploy đúng code mới nhất)
- [x] ~~Đổi `og:url` + `canonical` sang URL Pages thật~~ — xong 2026-06-10
- [ ] Thêm track mới vào `featuredTracks` khi kênh đăng video mới (4 video thật chưa dùng đến: `3HdXLkwtBgQ`, `5sqcEcJcU9A`, `_udLB3fXaAA`, `yovAJN75jsU`, `whgbcx-VqrY`)
- [ ] Khi kênh có comment thật từ khán giả: thêm section testimonial (2–3 comment) thay thế hoặc bổ sung cho khối "For fans of"
- [x] ~~Sửa git config email~~ — xong 2026-06-10: set `manhduc1703@gmail.com` cho cả repo lẫn global (trước đó cả hai đều là placeholder `you@example.com`)
- [ ] (Tuỳ chọn) Custom domain trỏ về GitHub Pages

---

# 📅 Lịch sử update

## [2026-06-12] — Header ghim cố định (logo + nút Subscribe luôn hiển thị khi cuộn)
**Agent/Người thực hiện:** Claude Code
**Files thay đổi:** index.html, fx.js, CHANGELOG.md
**Nội dung:**
- Denis phản hồi: tiêu đề + nút Subscribe vàng biến mất khi cuộn xuống → chuyển `header.topnav` sang `position: fixed` trên cùng, nền kính mờ `rgba(3,1,7,0.72)` + backdrop blur 12px, hairline đáy
- **Quan trọng:** header phải đặt NGOÀI `<main id="page">` — `#page` có transform (skew theo vận tốc cuộn từ fx.js), mà `position:fixed` bên trong ancestor có transform sẽ bị ghim theo ancestor thay vì viewport. Agent sau đừng đưa phần tử fixed nào vào trong `#page`
- Markup nav chuyển từ trong `.hero-shell > .wrap` ra ngay sau `#progress`, bọc bằng `.topnav-inner` (max-width 1080 căn giữa); `.hero-shell` thêm padding-top 72px nhường chỗ
- Anchor không bị header che: `scroll-margin-top: 90px` (fallback) + Lenis scrollTo offset -16 → -84 trong fx.js
- Verify local: cuộn tới 4000px header vẫn top:0, nút Subscribe luôn trong viewport, hero không bị đè, 0 lỗi console
**Lý do / ghi chú:** CTA Subscribe là mục tiêu chuyển đổi số 1 của trang — phải luôn trong tầm mắt.

## [2026-06-12] — Nâng cấp 3D + chuyển động toàn trang (Three.js + GSAP + Lenis)
**Agent/Người thực hiện:** Claude Code
**Files thay đổi:** fx.js (mới), index.html, script.js, CHANGELOG.md
**Nội dung:**
- Denis yêu cầu trang "lên 3D và có sự chuyển động", tham khảo 2 portfolio mẫu (scroll-driven 3D wireframe + GSAP choreography). Áp công thức đó nhưng đổi chất liệu sang ÂM NHẠC, giữ nguyên palette tím/đen/gold
- **`fx.js` (mới):** thế giới 3D wireframe bám theo scroll — camera đi xuống theo trang, mỗi section một "đạo cụ": hero = đĩa vinyl gold quay chậm (rãnh tím) + 2 nốt nhạc bay · features = equalizer 3D 30 cột tím nhún · latest-release = 2 dải sóng âm sin gold/tím · tracks = 6 nốt nhạc lơ lửng hai mép · closing = 3 vòng hào quang xoay quanh CTA · bụi vàng lấp lánh rải suốt trang. Vật thể chỉ hiện rõ trong "chương" của mình (fade theo khoảng cách), xoay nhẹ theo vận tốc cuộn, parallax theo chuột
- **GSAP ScrollTrigger:** hero intro trồi lên lần lượt + hero exit mờ dần khi cuộn; word-reveal từng từ cho h2 (trừ heading gradient-text); batch reveal có stagger cho card/step/FAQ/logos; progress bar gold trên cùng; nội dung skew rất nhẹ theo vận tốc cuộn (desktop)
- **2 dải marquee** chữ Cormorant lớn (outline gold xen kẽ) trôi ngang ngược hướng nhau theo scroll — đặt sau Features và sau Tracks
- **Lenis smooth scroll** + anchor link đi qua Lenis (trừ skip-link, giữ a11y); `ScrollTrigger.update()` gọi từ rAF khi scrollY đổi (không phụ thuộc scroll event — có môi trường không phát event khi scroll bằng code)
- `index.html`: thêm canvas #stage (z-0) + #progress, bọc nội dung trong `<main id="page">` (z-10), section `.features/.tracks` nền trong suốt + `.proof/.how/.faq/.updates` mờ 88% để lộ lớp 3D, `.closing` bỏ nền đặc để lộ vòng hào quang
- `script.js`: scroll reveal IntersectionObserver cũ chuyển thành FALLBACK — chỉ chạy khi GSAP CDN bị chặn
- **An toàn:** prefers-reduced-motion → fx tắt hẳn (canvas + progress tự gỡ, trang tĩnh như cũ); CDN/WebGL lỗi → tự gỡ canvas, nội dung không bao giờ bị ẩn
- Verify local (port 5174): 0 lỗi console, WebGL render thật, marquee/reveal/progress chạy đúng theo scroll, mobile vinyl lùi sâu sau chữ
**Lý do / ghi chú:** Màu chủ đạo tím/đen/gold giữ nguyên (vật thể 3D dùng đúng token `#d4af37` / `#9333d4`). Agent sau: hiệu ứng mới thêm vào `fx.js`, đừng đụng `script.js` (chỉ chứa nội dung/logic dữ liệu).

## [2026-06-10] — Nâng cấp dark-luxury theo design system Lamborghini (getdesign.md)
**Agent/Người thực hiện:** Claude Code
**Files thay đổi:** index.html, style.css, DESIGN.md (mới), CHANGELOG.md
**Nội dung:**
- Denis yêu cầu chọn 1 web cùng tông màu trên getdesign.md để nâng cấp trang → chọn **Lamborghini** (đen tuyền + gold, dark cinematic luxury — trùng 2/3 palette; Superhuman bị loại vì thân trang chuyển nền trắng). File DESIGN.md đầy đủ đã lưu vào repo
- **Tokens:** nền hạ sâu `#06030d → #030107` (gần đen tuyền), surface phân tầng `#0b0813 / #140e20` — elevation bằng LỚP MÀU sáng dần thay vì shadow; border đổi từ gold-tint sang hairline trắng trung tính (gold chỉ dành cho CTA + accent nhỏ); thêm `--accent-deep` cho hover gold
- **Buttons:** `.btn-primary` đổi từ gradient TÍM → **gold đặc chữ đen** (hover sậm màu, không transform); `.btn-secondary` thành ghost viền trắng 40%; mọi nút góc vuông (radius 0), hover chỉ đổi màu
- **Typography:** hero h1 uppercase, scale tới 96px, line-height 0.98; mọi section h2 uppercase line-height 1.1; bỏ italic ở heading (tracks, closing) theo nguyên tắc "luôn thẳng đứng"
- **Cards:** feature/tier/latest-release góc vuông, bỏ shadow + glow tím/gold, hover = nền sáng lên 1 tầng surface; play badge radius 14→4px; mood tag radius 999→2px
- **Hexagon motif:** step circle tròn gradient → **lục giác gold** (clip-path) — DNA hình học của Lamborghini
- **Hero:** min-height 72vh căn giữa dọc, hairline đáy + vạch gold 140px (nhại progress bar của Lambo); blob aurora tím GIẢM opacity (~40%) để bóng tối làm canvas chính, tím vẫn giữ làm chất riêng
- Verify local (port 5174): 0 lỗi console, 7/7 thumbnail load, section email ẩn đúng, responsive mobile OK
**Lý do / ghi chú:** Tím/đen/gold vẫn là palette gốc — chỉ thay đổi cách phân phối (đen làm nền tuyệt đối, gold đắt giá hơn vì chỉ dành cho hành động chính). Agent sau: đọc `DESIGN.md` trước khi sửa UI.

## [2026-06-10] — Xác nhận site LIVE trên GitHub Pages + chốt canonical/og:url
**Agent/Người thực hiện:** Claude Code
**Files thay đổi:** index.html, CHANGELOG.md
**Nội dung:**
- Kiểm tra qua GitHub API: Pages đã bật sẵn (`has_pages: true`), site live HTTP 200 tại `https://denis-pham.github.io/vivi-soul/`
- Verify bản live: đã serve đúng code mới nhất (7 video thật, sub_confirmation, section email ẩn)
- `canonical` + `og:url` đổi từ link YouTube → URL Pages thật (canonical phải trỏ về chính trang)
- Quyết định của Denis: form email Formspree CHƯA bật lúc này — section vẫn tự ẩn, bật sau khi cần
**Lý do / ghi chú:** Site chính thức live. Push lên `main` là tự redeploy (~1-2 phút).

## [2026-06-10] — Thay video chết bằng 7 video thật + gói cải tiến chuyển đổi
**Agent/Người thực hiện:** Claude Code
**Files thay đổi:** index.html, script.js, style.css, CHANGELOG.md
**Nội dung:**
- 🔴 `featuredTracks` viết lại hoàn toàn: 7 video THẬT từ kênh (Latest = `gJwebqoc5fg` When the City Finally Sleeps; grid 6 video lo-fi soul/ambient/cinematic) — đã verify từng videoId + thumbnail qua API trước khi dùng
- 🔴 Copy sửa đúng thực tế kênh: lede + note của "Also from the channel" bỏ hết nội dung TikTok Remix; FAQ tần suất đăng đổi thành "regularly" (không claim cụ thể chưa kiểm chứng)
- 🔴 `og:image` / `twitter:image` trỏ thumbnail video thật `gJwebqoc5fg`
- 🟡 3 nút Subscribe (nav, hero, closing) thêm `?sub_confirmation=1`
- 🟡 Logo wall "Heard alongside" → "For fans of" (định vị gu nhạc trung thực, không phải claim hợp tác). Không bịa testimonial — kênh chưa có comment thật (đã thử lấy qua API)
- 🟢 Mood switcher nâng cấp: mỗi mood gắn 1 video thật + link "Listen →" tự đổi theo mood (map trong `script.js`)
- 🟢 Section email capture "#updates" (Formspree) — TỰ ẨN cho tới khi điền Form ID thật, không bao giờ lộ form hỏng
- 🟢 Hạ tầng audio preview: track có `previewSrc` sẽ tự hiện nút Preview (1 player dùng chung, bấm track khác tự dừng track cũ) — chờ Denis cung cấp file MP3
- Fix nhỏ: mood-switcher trên mobile đổi border-radius 999px → 24px (hết hình quả trứng khi stack dọc)
- Verify local: 0 lỗi console, 7/7 thumbnail load ảnh thật, mood switcher + link đổi đúng, section email ẩn đúng
**Lý do / ghi chú:** Thực hiện cả 3 nhóm roadmap audit 2026-06-10 theo yêu cầu Denis. Màu chủ đạo tím/đen/gold giữ nguyên.

## [2026-06-10] — Audit toàn trang + nghiên cứu landing page mẫu (chưa sửa code)
**Agent/Người thực hiện:** Claude Code
**Files thay đổi:** CHANGELOG.md (ghi log audit + TODO mới)
**Nội dung:**
- Chạy trang local (port 5174): render OK, không lỗi console, responsive hoạt động, scroll reveal + mood switcher chạy đúng
- 🔴 **Phát hiện nghiêm trọng:** cả 3 videoId trong `featuredTracks` không tồn tại trên YouTube → Latest Release + 2 track cards link vào video chết, thumbnail hiện ảnh xám mặc định, `og:image` 404. Kênh thật có 12 video lo-fi soul/ambient (danh sách ID thật ở mục TODO)
- 🔴 Copy sai thực tế: trang nói kênh có "TikTok Remix energetic" — kênh thật toàn nhạc calm lo-fi soul
- 🟡 Logo wall là claim chưa kiểm chứng; thiếu social proof thật, email capture, multi-platform links, audio nghe thử
- Nghiên cứu trang mẫu (Lofi Girl, Yamê Molazone, Feature.fm, Lapa Ninja music…): hướng cải tiến chính — grid playlist theo mood kiểu Lofi Girl, CTA kèm `?sub_confirmation=1`, testimonial từ comment thật, audio snippet nghe ngay trên trang. Chi tiết đã báo cáo Denis (chat 2026-06-10)
**Lý do / ghi chú:** Audit làm cơ sở roadmap trước khi commit + đưa đội agents vào build. Màu chủ đạo tím/đen/gold GIỮ NGUYÊN theo yêu cầu Denis.

## [2026-06-10] — Khởi tạo CHANGELOG + rà soát kết cấu project
**Agent/Người thực hiện:** Claude Code
**Files thay đổi:** CHANGELOG.md (mới)
**Nội dung:**
- Rà soát toàn bộ kết cấu: 4 files tĩnh, git repo đã có remote `Denis-Pham/vivi-soul`, mới 1 commit gốc
- Phát hiện 3 file (`index.html` +142, `script.js` +101, `style.css` +176 dòng) **đang sửa dở, CHƯA commit** — chi tiết ở entry bên dưới
- Tạo CHANGELOG.md làm điểm đồng bộ chung cho đội AI agents
**Lý do / ghi chú:** Chuẩn bị đưa đội AI agents + Claude vào hoàn thiện landing page cho kênh YouTube.

## [Trước 2026-06-10] — Đợt nâng cấp SEO + accessibility (CHƯA COMMIT)
**Agent/Người thực hiện:** Claude (session trước)
**Files thay đổi:** index.html, script.js, style.css (đang nằm ở working tree, chưa commit)
**Nội dung:**
- `index.html`: thêm meta description, Open Graph + Twitter card, favicon SVG inline (chữ V gold), JSON-LD `MusicGroup`, preconnect fonts; skip-link + focus ring cho keyboard navigation; nâng độ sáng `--muted` cho dễ đọc; gỡ style `.tier.featured` / `.status-badge` / `.cover-*` cũ (placeholder gradient không còn dùng)
- `script.js`: render Latest Release từ `featuredTracks[0]`; grid dùng `slice(1)`; thumbnail sddefault/maxresdefault + fallback hqdefault; scroll reveal bằng IntersectionObserver (tôn trọng `prefers-reduced-motion`)
- `style.css`: style cho thumbnail cards, Latest Release section, reveal animations
**Lý do / ghi chú:** Đợt nâng cấp chất lượng trước khi mở rộng. ⚠️ Agent tiếp theo: commit đợt này trước khi sửa tiếp để tránh lẫn thay đổi.

## [Trước 2026-06-10] — Khởi tạo project từ template
**Agent/Người thực hiện:** Claude (skill music-channel-landing)
**Files thay đổi:** index.html, style.css, script.js, README.md
**Nội dung:**
- Tạo landing page dark cinematic cho kênh nhạc: hero + mood switcher, logo wall, feature cards, how-to, Latest Release, Featured Tracks (data-driven), FAQ accordion, dual YouTube CTA
- Commit gốc `a8cba31`, push lên `origin/main`
**Lý do / ghi chú:** Nền tảng ban đầu của project.
