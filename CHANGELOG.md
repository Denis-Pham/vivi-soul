# 📜 CHANGELOG — Vivi Soul Landing Page

> File ghi lịch sử update của project. **Mọi AI agent / Claude session làm việc trên project này BẮT BUỘC đọc file này trước khi sửa code, và ghi log vào đây sau khi hoàn thành thay đổi.**

---

## 🎯 Mục tiêu project

Xây dựng landing page hoàn chỉnh để giới thiệu và kéo traffic cho kênh YouTube **Vivi Soul** — kênh nhạc AI cinematic / chill / healing.
🔗 Kênh: [youtube.com/@ViviSoulmusic](https://www.youtube.com/@ViviSoulmusic)
🔗 Repo: [github.com/Denis-Pham/vivi-soul](https://github.com/Denis-Pham/vivi-soul) — deploy qua GitHub Pages.

## 🗂 Kết cấu project (cập nhật 2026-07-14)

| File | Vai trò |
|---|---|
| `index.html` | Khung trang + tokens design system ở `:root` + layout (inline `<style>`). Sections: Header sticky glass → Hero "the current hour" (chữ + CTA + chip bản mới nhất \| emblem Vivi trong orbit) → Mood selector (7 mood) → Latest Release → Archive → Why (3 nguyên tắc) → Meet Vivi/Story → How to listen → FAQ (5 câu) → Email capture (ẩn) → Final CTA → Footer 3 cột + usage note |
| `script.js` | **Toàn bộ nội dung track nằm ở đây** — mảng `featuredTracks` là single source of truth: `[0]` = Latest Release, còn lại đổ vào Archive. Kèm: mảng `MOODS` (7 mood cho mood selector, mỗi mood gắn 1 video thật); **i18n Anh/Việt** — `TRANSLATIONS` + `applyLanguage()` (thêm `data-i18n-alt`); render mood chips + feature panel; image fallback 3 tầng (sd → hq → poster thương hiệu `.slot[data-state="broken"]`); header thu gọn khi cuộn; mobile menu sheet (dialog + focus trap); scroll reveal an toàn (nội dung hiển thị mặc định, gọi SAU render đầu); FAQ single-open; email capture; audio preview |
| `fx.js` | **Lớp 3D** (ES module): thế giới wireframe Three.js bám theo scroll (vinyl @hero, equalizer @moods, sóng âm @latest-release, nốt nhạc @releases, vòng hào quang @subscribe) + Lenis smooth scroll + progress bar. **GSAP đã gỡ** (2026-07-14) — motion "breathing, not performing". Tự tắt hoàn toàn khi reduced-motion / CDN lỗi / WebGL lỗi. Nghe event `vivi:layout` để đo lại khi đổi ngôn ngữ |
| `style.css` | Component styles theo design system: atmosphere glows + film grain, buttons, tags, badges, mood chips, release cards, image-slot poster, play button glass, equalizer, accordion (details), lang switch, email form |
| `assets/` | `vivi-soul-logo.jpg` (emblem thật của kênh — header/hero/story/footer), `og-image.jpg` (OG 1200×630 branded) |
| `DESIGN.md` | **Vivi Soul Design System** (spec rút gọn từ project claude.ai) — đọc trước khi sửa UI. Hệ Lamborghini cũ đã ngừng áp dụng |
| `robots.txt` / `sitemap.xml` | SEO (phát huy đầy đủ khi có custom domain) |
| `README.md` | Hướng dẫn gốc: chạy local, deploy GitHub Pages, bài học khi build |
| `CHANGELOG.md` | File này — lịch sử update + quy ước làm việc |

**Stack:** HTML + CSS + JavaScript thuần — không framework, không build tool. Thư viện hiệu ứng load qua CDN (Lenis 1.1, Three.js 0.170 qua importmap; GSAP đã gỡ 2026-07-14) — trang vẫn hoạt động đầy đủ nếu CDN bị chặn. Chạy local: `python3 -m http.server 5173`.

**Theme (Vivi Soul Design System, 2026-07-14):** warm cinematic dark — ink & plum canvas, chữ warm ivory, hành động antique gold, nhấn cảm xúc dusk rose. Tokens: `--bg` (`#050308`), `--surface` (`#16091F`), `--fg` (ivory `#F3EEE4`), `--muted` (lavender `#B9AFBF`), `--accent` (gold `#D5AE36`), `--rose` (`#C77B86`)… đều ở `:root` trong `index.html`. Font: Cormorant Garamond (display, sentence case — KHÔNG all-caps) + Manrope (UI/body).

## 📋 Quy ước cho AI agents

1. **Đọc `CHANGELOG.md` này trước** khi thay đổi bất cứ thứ gì.
2. Sau mỗi thay đổi, **thêm 1 entry mới lên ĐẦU mục "Lịch sử update"** theo format mẫu bên dưới.
3. Track / video mới: sửa mảng `featuredTracks` trong `script.js` — **không hard-code nội dung track vào HTML**. Video mới nhất luôn chèn lên **đầu** mảng (hướng dẫn chi tiết ngay trong comment ở `script.js`).
4. Màu sắc / theme: sửa qua CSS variables ở `:root` trong `index.html` — không hard-code màu rải rác.
5. **KHÔNG dùng iframe embed YouTube** — kênh từng dính Error 153 (embed bị chặn). Luôn dùng thumbnail `img.youtube.com/vi/<videoId>/...` + link mở YouTube (pattern có sẵn trong `script.js`).
6. Không thêm framework / build tool — giữ project deploy thẳng lên GitHub Pages.
7. Dùng **đường dẫn tương đối** (`href="style.css"`, không có `/` đầu) — site chạy ở subfolder `/vivi-soul/` trên GitHub Pages.
8. Sau khi sửa xong: commit với message rõ ràng, push lên `origin main` để Pages tự redeploy.
9. **Song ngữ (i18n):** mọi chữ TĨNH mới thêm vào `index.html` phải gắn `data-i18n="key"` (hoặc `data-i18n-html` cho chữ có thẻ, `data-i18n-aria` cho aria-label) VÀ thêm key đó vào CẢ `en` lẫn `vi` trong object `TRANSLATIONS` (`script.js`). Chữ ĐỘNG (track) thêm field `moodVi` + `descVi`; mood switcher thêm `labelVi`. Title track GIỮ tiếng Anh (khớp tên video thật trên YouTube). Lưu ý: `applyLanguage()` chạy TRƯỚC `fx.js` nên word-reveal của `<h2>` tách từ đúng ngữ.

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
- [ ] **Art chân dung Vivi**: khi Denis có art thật (Vivi bên ô cửa mưa, đèn ấm, tai nghe — brief trong design system), thay emblem-in-orbit ở section `#story` (`.story-portrait` trong index.html). KHÔNG tự generate art
- [ ] Khi kênh có comment thật từ khán giả: thêm section testimonial (2–3 comment) thay thế hoặc bổ sung cho khối "For fans of"
- [x] ~~Sửa git config email~~ — xong 2026-06-10: set `manhduc1703@gmail.com` cho cả repo lẫn global (trước đó cả hai đều là placeholder `you@example.com`)
- [ ] (Tuỳ chọn) Custom domain trỏ về GitHub Pages

---

# 📅 Lịch sử update

## [2026-07-18] — Đề xuất mô tả YouTube cho kênh và 12 video
**Agent/Người thực hiện:** Hermes Agent (kanban task t_ca94e1e1) → Claude Code review PASS (0 chuỗi cấm, 12/12 đạt acceptance criteria) + merge → Denis duyệt
**Files thay đổi:** docs/youtube/descriptions-proposal.md (mới), CHANGELOG.md
**Nội dung:**
- Soạn Channel About mới bằng tiếng Anh (kèm bản dịch VI tham khảo), sửa đúng định vị cinematic mood music / calm lo-fi soul / healing / quiet focus và đề xuất gắn website chính thức
- Chuẩn hoá template mô tả video với hook, `Use it for`, website, subscribe CTA, usage note, brand boilerplate và hashtag
- Soạn đủ 12 mô tả tiếng Anh sẵn dán; giữ lại hook/quote/bullets tốt từ audit và `script.js`, loại bỏ metadata quy trình nội bộ, thêm nguồn hook bằng HTML comment cho từng video
- Ghi riêng các điểm Denis cần xác nhận: chính sách disclosure AI, link mạng xã hội, wording quyền sử dụng và nhận xét title ngoài phạm vi thay đổi
**Lý do / ghi chú:** Bộ đề xuất nội dung dựa duy nhất trên audit YouTube 2026-07-18 và copy đã duyệt trong repo; không sửa code website hoặc title video. Denis dán vào YouTube Studio thủ công (agent không tự sửa YouTube).

## [2026-07-18] — Audit mô tả kênh YouTube (docs-only, không sửa site)
**Agent/Người thực hiện:** Claude Code (phối hợp Hermes theo cơ chế collab)
**Files thay đổi:** docs/youtube/audit-2026-07-18.md (mới), CHANGELOG.md
**Nội dung:**
- Denis nêu: mô tả video còn thiếu và chưa liên kết với website. Claude đọc trực tiếp 12/12 video của kênh @ViviSoulmusic (InnerTube API) + tab About, lưu hiện trạng nguyên văn vào `docs/youtube/audit-2026-07-18.md`
- 🔴 Phát hiện chính: 0/12 video có bất kỳ URL nào trong mô tả; 4 video lộ chữ "Private review upload"/mã nội bộ VS-00x; mô tả kênh (About) sai định vị hoàn toàn (nói dance/electronic/house — kênh thật là calm lo-fi soul/healing); About không gắn link website
- Bước tiếp: giao Hermes task soạn `docs/youtube/descriptions-proposal.md` (mô tả mới 12 video + channel description + links About) trên branch `hermes/youtube-desc` — Denis là người dán vào YouTube Studio, agent không tự sửa YouTube
**Lý do / ghi chú:** Audit này chỉ thêm docs — KHÔNG đổi code/nội dung site. Không push origin (GitHub) trong bước này.

## [2026-07-14] — Khôi phục 2 dải marquee chữ trôi ngang (feedback Denis)
**Agent/Người thực hiện:** Claude Code (feedback Denis: "dải chữ chạy ngang cũng đẹp sao bỏ mất rồi")
**Files thay đổi:** index.html, style.css, script.js, fx.js, DESIGN.md, CHANGELOG.md
**Nội dung:**
- 🟢 **2 dải marquee quay lại**, đúng cơ chế cũ (trôi theo scroll, ngược chiều nhau) nhưng driver mới KHÔNG cần GSAP: fx.js tính tiến độ dải băng qua viewport trong vòng lặp rAF sẵn có (`updateMarquees()` — mq1 trôi 0→-25%, mq2 -25%→0), cập nhật khi scrollY đổi + resize + `vivi:layout`
- 🟢 **Nội dung nâng theo hệ mới**: mq1 = đủ 7 mood của mood selector (deep focus → inner strength, EN+VI); mq2 giữ lời mời cũ (press play — let the world soften…). Vị trí: mq1 giữa #moods và #latest-release, mq2 giữa #listen và #faq
- 🟢 Style theo palette mới: Cormorant italic, chữ warm ivory, em words outline antique gold `#D5AE36`; thêm fallback `@supports not (-webkit-text-stroke)` → em tô gold đặc (không tàng hình); reduced-motion → dải đứng yên
- 📝 DESIGN.md: chuyển marquee từ mục "Cấm" sang "Được phép" (brand element Denis yêu cầu giữ — trang trí thuần aria-hidden, không fx thì đứng yên, chữ vẫn hiện đủ)
- ✅ Verify local: 0 lỗi console; transform đổi đúng 2 chiều khi cuộn; EN↔VI đổi chữ marquee đúng; parity 80/80. ⚠️ Lưu ý khi test local: fx.js hay bị **HTTP cache** giữ bản cũ — hard reload (`fetch(..., {cache:'reload'})` hoặc Ctrl+F5) trước khi kết luận
**Lý do / ghi chú:** Marquee là chi tiết Denis thích từ bản 2026-06-12. Bỏ đi trong redesign là quá tay — giữ lại dưới dạng "parallax nhẹ trên lớp trang trí" (được phép trong motion rules), không ẩn nội dung, không hijack scroll.

## [2026-07-14] — Bỏ logo lớn ở hero, chỉ giữ 1 emblem nhỏ ở Meet Vivi (feedback Denis)
**Agent/Người thực hiện:** Claude Code (feedback trực tiếp từ Denis: "2 tấm logo vivi soul bự ở trang đầu và trang meet vivi nhìn choáng chỗ")
**Files thay đổi:** index.html, script.js, CHANGELOG.md
**Nội dung:**
- 🔧 **Hero bỏ hẳn cột emblem** — quay về một cột chữ thoáng (min-height 62vh, căn giữa dọc), vai trò visual trả cho đĩa vinyl 3D phía sau (layout Denis đã duyệt hồi tháng 6). Bỏ `.hero-grid`/`.hero-visual`/`.vivi-portrait`
- 🔧 **Meet Vivi giữ đúng 1 emblem nhưng nhỏ lại rõ rệt**: khung vuông 1:1 tối đa 400px (mobile 360px), emblem 36% (~143px, trước ~230px), story-grid đổi tỷ lệ 1.2/0.8 (chữ rộng hơn), caption nghiêng "Vivi giữ lấy giờ phút cùng bạn." chuyển vào khung này
- 🔧 i18n: bỏ key `hero.caption`/`hero.emblemAlt`, thêm `story.caption` (EN+VI) — parity máy check 78/78
- ✅ Verify local: 0 lỗi console; cả trang còn đúng 1 emblem (ngoài logo 34px ở header/footer); VI/EN đổi caption + alt đúng; chip "bản mới nhất" giữ nguyên
**Lý do / ghi chú:** Emblem đặt 2 chỗ là giải pháp tạm khi chưa có art chân dung Vivi (design system cấm tự chế art). Denis thấy lặp + choáng chỗ → logo lớn giờ CHỈ ở section nói về Vivi. Khi có art thật: thay vào `.story-portrait` (TODO).

## [2026-07-14] — Redesign toàn trang theo Vivi Soul Design System (thay hệ Lamborghini)
**Agent/Người thực hiện:** Claude Code (theo yêu cầu Denis, design system từ project claude.ai của Denis)
**Files thay đổi:** index.html, style.css, script.js, fx.js, DESIGN.md, CHANGELOG.md + mới: assets/vivi-soul-logo.jpg, assets/og-image.jpg, robots.txt, sitemap.xml
**Nội dung:**
- 🎨 **Áp dụng Vivi Soul Design System** (https://claude.ai/design/p/75ce1ee9-9118-43d8-8f40-4dcdee862f87 — 144 tokens, 12 components, UI kit homepage; đọc qua DesignSync). Tinh thần: "cinematic emotional listening journal" — ấm, thân mật, editorial. Thay toàn bộ hệ Lamborghini cũ (đen tuyền + all-caps + góc 0px)
- 🎨 **Tokens mới:** ink `#050308` / plum `#16091F` / violet `#32104A`, chữ warm ivory `#F3EEE4` (bỏ trắng tinh), lavender `#B9AFBF`, antique gold `#D5AE36` (hover `#E8CE7A`, press `#A97720`), dusk rose `#C77B86`; hairline ivory 10/22%, gold 32%; radius 2/4px; font UI đổi Inter → **Manrope**, giữ Cormorant Garamond cho display; **heading sentence case** (bỏ uppercase)
- 🏗 **IA mới theo design:** hero 2 cột (chữ + CTA + chip bản mới nhất | **emblem thật của kênh trong vòng orbit**) → **Mood selector 7 mood** (Deep Focus, Late-night Soul, Healing, Quiet Morning, Rainy Window, Nostalgic, Inner Strength — mỗi mood 1 video thật, thay mood switcher 5 mood cũ) → Latest Release (featured card 2 cột) → Archive → Why (nguyên tắc #3 mới: "AI-assisted, human-curated") → **Meet Vivi/Story (mới)** → How to listen → **FAQ 5 câu** (thêm câu licensing; sửa a2/a4: "miễn phí để nghe" ≠ "miễn phí để dùng lại") → Final CTA (+link Hợp tác & sử dụng nhạc → About kênh) → **Footer 3 cột + usage note** (bỏ logo wall "For fans of")
- 🖼 **Ảnh không bao giờ để lỗ trống:** fallback 3 tầng sd → hq → poster thương hiệu (radial violet + waveform glyph); OG image mới `assets/og-image.jpg` 1200×630 branded (compose bằng System.Drawing — hết phụ thuộc thumbnail YouTube)
- 🎬 **Motion "breathing, not performing":** GỠ GSAP + ScrollTrigger (bỏ word-reveal tách chữ, batch reveal ẩn nội dung, marquee, con trỏ ♪, skew) — nội dung **hiển thị mặc định**, reveal nhẹ bằng IntersectionObserver (class .reveal do JS thêm + safety timeout 1.8s). Giữ Lenis + lớp 3D wireframe nhưng retint sang palette mới, giảm opacity; fx.js nghe `vivi:layout` để đo lại khi đổi ngôn ngữ
- 📱 **Mobile menu sheet mới** (hamburger → dialog fullscreen, focus trap, Escape, tự đóng khi phóng qua 860px); header sticky glass thu gọn khi cuộn; lang switch EN/VI giờ có ở header + mobile sheet + footer (đồng bộ cả 3)
- 🔍 SEO: robots.txt + sitemap.xml (đầy đủ tác dụng khi có custom domain), apple-touch-icon = emblem, favicon recolor
- ✅ Verify local (port 5174): 0 lỗi console; EN→VI→EN round-trip đủ (title/hero/nav/mood/FAQ/footer, i18n parity 79/79 key máy check); mood switch đổi track+link+tag đúng, giữ selection khi đổi ngữ; 6 card archive + latest render đúng; updates ẩn đúng; mobile 375px: hamburger + sheet mở/đóng + khóa scroll OK, grid về 1 cột; 7/7 thumbnail YouTube HTTP 200; code-reviewer agent: 0 critical/high, 4 finding medium/low đã sửa hết (reveal ordering, escape title trong attribute, dialog semantics + focus trap, auto-close sheet)
- ⚠️ Quirk pane preview (đã biết từ 2026-06): rAF bị suspend → không chụp screenshot/không render 3D được trong pane; verify bằng eval + computed style. Trên browser thật không bị
**Lý do / ghi chú:** Denis gửi link design system tự build trên claude.ai và yêu cầu nâng cấp trang theo hệ này. Agent sau: đọc `DESIGN.md` mới (spec đầy đủ) — ĐỪNG khôi phục quy tắc Lamborghini (uppercase, đen tuyền, radius 0). Track/mood data vẫn chỉ nằm ở `script.js`.
## [2026-07-10] — 2 bug fix từ audit độc lập của Hermes Agent (pilot collab)
**Agent/Người thực hiện:** Hermes Agent (audit + fix, kanban task t_027ddf70) → Claude Code review + merge → Denis duyệt
**Files thay đổi:** script.js, CHANGELOG.md
**Nội dung:**
- 🔧 **Localize aria-label động** (`be29d42`): 3 chỗ card render động (thumbnail Featured/Latest, nút Preview) hardcode aria-label tiếng Anh — đổi sang VI thì chữ hiển thị đổi nhưng accessible name vẫn EN. Thêm 2 key `tracks.watchAria`/`tracks.previewAria` (EN+VI) render qua helper `t()` sẵn có
- 🔧 **Xử lý Promise của `Audio.play()`** (`22e3f18`): trước đây bỏ qua Promise — preview lỗi/bị chặn autoplay thì UI kẹt trạng thái "đang phát" + unhandled rejection. Giờ await, reset UI khi reject, guard chống race khi click nút khác giữa chừng. (Hiện chưa track nào có `previewSrc` nên nút Preview chưa render — fix phòng thủ cho feature sẵn có)
- ✅ Verify: Hermes chạy `node --check` script.js/fx.js PASS, i18n parity 67/67; Claude verify độc lập syntax + soi race case; diff chỉ chạm script.js (+16/−6)
**Lý do / ghi chú:** Task thật đầu tiên của cơ chế collab Claude Code + Hermes (git sync qua bare repo `E:\HerBot\data\projects` + kanban board `project-x` — spec ở `Project X/docs/superpowers/specs/2026-07-10-claude-hermes-collab-design.md`). Hermes làm trên branch `hermes/site-audit`, Claude review, Denis duyệt merge. Lưu ý cho task sau: body task giao Hermes trên repo này PHẢI dặn đọc + ghi CHANGELOG.md (lần này Claude ghi bù).

## [2026-06-21] — Thêm bộ chuyển ngữ Anh/Việt + dịch toàn bộ landing page
**Agent/Người thực hiện:** Claude Code
**Files thay đổi:** index.html, script.js, CHANGELOG.md
**Nội dung:**
- 🟢 **Nút chuyển ngữ EN / VI** trong nav (góc vuông, ngôn ngữ đang chọn tô gold — đúng phong cách Lamborghini). Dùng `<button>` (không phải `<a>`) nên KHÔNG bị rule ẩn link trên mobile; vẫn hiện trên điện thoại
- 🟢 **Hệ i18n nhẹ, thuần JS** trong `script.js`: object `TRANSLATIONS` (en/vi) + `applyLanguage(lang)` quét `data-i18n` (textContent), `data-i18n-html` (chữ có `<em>`, dùng cho 2 marquee), `data-i18n-aria` (aria-label); đổi luôn `<html lang>` + `document.title`
- 🟢 **Dịch toàn bộ landing page sang tiếng Việt:** nav, hero, mood switcher, logo wall, 3 feature card, "Cách thả trôi", Latest Release, Featured Tracks, FAQ (4 cặp Q&A), section email (đang ẩn), closing CTA, footer, + 2 dải marquee
- 🟢 **Track song ngữ:** mỗi track thêm `moodVi` + `descVi`; mood switcher thêm `labelVi`. **Title track GIỮ tiếng Anh** (khớp tên video thật trên YouTube để người xem bấm vào thấy đúng video)
- 🟢 **Ghi nhớ lựa chọn:** lưu `localStorage('viviLang')`; lần đầu tự nhận diện trình duyệt tiếng Việt → VI, còn lại mặc định EN (SEO/meta tĩnh vẫn English)
- 🔧 Tương thích lớp 3D: `applyLanguage()` chạy TRƯỚC `fx.js` nên word-reveal tách từ `<h2>` đúng ngữ; đổi ngữ lúc đang chạy thì gọi `ScrollTrigger.refresh()`. Nút Preview audio chuyển sang `bindPreviewButtons()` (gắn lại sau mỗi lần render, cờ chống trùng listener)
- ✅ Verify local (port 5174): 0 lỗi console; EN init → VI → EN round-trip đổi đúng toàn bộ (nav, hero, track, marquee, mood, h2 word-reveal, footer); localStorage lưu đúng; lớp 3D giữ nguyên, 6 track card render OK
**Lý do / ghi chú:** Denis yêu cầu thêm chuyển ngữ tiếng Việt cho trang. Screenshot tool bị timeout do `fx.js` chạy rAF Three.js vô hạn (trang không "đứng yên") — đã verify đầy đủ bằng eval + a11y snapshot thay thế.

## [2026-06-12] — Cuộn mượt hơn + con trỏ nốt nhạc + tiêu đề gradient trắng→vàng
**Agent/Người thực hiện:** Claude Code
**Files thay đổi:** fx.js, index.html, style.css, CHANGELOG.md
**Nội dung:**
- Denis phản hồi 3 ý: cuộn chưa mượt, chuột chưa thành hình nhạc, tiêu đề trắng trơn nhìn chưa đẹp
- **Cuộn mượt:** BỎ hẳn hiệu ứng skew `#page` theo vận tốc cuộn (transform cả trang ~13k px mỗi frame ép browser repaint liên tục — nguyên nhân chính gây giật); cap pixel ratio render 3D 2 → 1.6; Lenis lerp 0.095 → 0.08. ⚠️ Agent sau: ĐỪNG thêm transform vào `#page` — phá position:fixed của phần tử con
- **Con trỏ nốt nhạc** (chỉ desktop pointer mịn): fx.js tạo `#cursor` (♪ gold, lắc nhẹ theo thời gian, bám sát chuột) + `#ring` (vòng gold đuổi theo có độ trễ, phóng to khi hover link/nút/summary); `body.fx-cursor` bật `cursor:none`; pointer thô (mobile) tự ẩn; reduced-motion không tạo
- **Tiêu đề section gradient trắng→vàng** (giống hero): áp cho h2 của features/how/tracks/faq/updates — gradient đặt cả ở h2 LẪN từng từ `.w > span` (sau khi word-split mỗi span có background riêng nên giữ hiệu ứng khi chữ chuyển động); cập nhật fallback `@supports not background-clip` trong style.css để chữ không tàng hình trên browser cũ
- Verify local: con trỏ ♪ + ring tạo đúng, hover Subscribe ring phóng to, span gradient + fill transparent đúng, `#page` hết transform, 0 lỗi console. (Quirk máy local: rAF của cửa sổ preview hay bị suspend — không tái hiện trên browser thật)
**Lý do / ghi chú:** Phản hồi trực tiếp từ Denis sau khi xem bản live 3D đầu tiên.

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
