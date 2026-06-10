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
| `script.js` | **Toàn bộ nội dung track nằm ở đây** — mảng `featuredTracks` là single source of truth: phần tử `[0]` = Latest Release, phần còn lại đổ vào grid "Also from the channel". Kèm: FAQ accordion, mood switcher (5 moods), scroll reveal (IntersectionObserver), auto year |
| `style.css` | Style phụ: thumbnail cards, Latest Release section, animations |
| `README.md` | Hướng dẫn gốc: chạy local, deploy GitHub Pages, bài học khi build |
| `CHANGELOG.md` | File này — lịch sử update + quy ước làm việc |

**Stack:** HTML + CSS + JavaScript thuần — không framework, không build tool. Chạy local: `python3 -m http.server 5173`.

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

- [ ] 🔴 **KHẨN — thay 3 videoId chết trong `featuredTracks` (`script.js`)**: cả 3 ID hiện tại (`1ZVPYNQAwX4`, `x1pfDBt1AwM`, `Or2S37veLn8`) đều KHÔNG tồn tại trên YouTube (oembed trả 404). Kênh thật có 12 video — ID thật mới nhất: `gJwebqoc5fg` (When the City Finally Sleeps), `gYsWF2XzSiU` (Quiet Diner at 2AM); còn lại: `ACCAJRzoAHU`, `3HdXLkwtBgQ`, `k8bmgboWxus`, `5sqcEcJcU9A`, `_udLB3fXaAA`, `7wLPLBYkHs4`, `yovAJN75jsU`, `pV3QkZVC2aI`, `whgbcx-VqrY`, `QWEDrddBqEg`
- [ ] 🔴 **Sửa copy sai thực tế**: trang mô tả các track là "TikTok Remix / energetic" nhưng kênh thật 100% là lo-fi soul / ambient / healing — viết lại title/mood/description trong `featuredTracks` + lede của section "Also from the channel" + ghi chú `tracks-note`
- [ ] 🔴 **Sửa `og:image` / `twitter:image` trong `index.html`**: đang trỏ thumbnail của video chết → share Facebook/Zalo sẽ hiện ảnh vỡ. Trỏ sang `https://img.youtube.com/vi/gJwebqoc5fg/hqdefault.jpg` (video thật)
- [ ] 🟡 Thêm `?sub_confirmation=1` vào các link Subscribe (bật popup xác nhận đăng ký khi khách bấm sang YouTube)
- [ ] 🟡 Xem lại logo wall "Heard alongside: Lofi Girl, ChillHop, Calm, Headspace…" — claim chưa kiểm chứng, nên thay bằng social proof thật (comment thật từ video / số liệu kênh)
- [ ] 🟡 Xem lại FAQ "one to two new pieces a week" — xác nhận tần suất đăng thật với Denis trước khi giữ
- [ ] **Commit + push 3 file đang sửa dở** (`index.html`, `script.js`, `style.css` — đợt nâng cấp SEO/accessibility, xem entry 2026-06-10 bên dưới)
- [ ] Kiểm tra GitHub Pages đã bật chưa + xác nhận URL live `https://denis-pham.github.io/vivi-soul/`
- [ ] Khi site live: đổi `og:url` + `canonical` trong `index.html` từ link YouTube sang URL Pages thật
- [ ] Thêm track mới vào `featuredTracks` khi kênh đăng video mới
- [ ] (Tuỳ chọn) Form capture email (Formspree) cho người đăng ký nhận nhạc mới
- [ ] (Tuỳ chọn) Custom domain trỏ về GitHub Pages

---

# 📅 Lịch sử update

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
