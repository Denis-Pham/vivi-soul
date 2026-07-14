# Vivi Soul Design System

> **Nguồn chuẩn (source of truth):** project "Vivi Soul Design System" trên claude.ai
> (https://claude.ai/design/p/75ce1ee9-9118-43d8-8f40-4dcdee862f87) — 144 tokens,
> 12 components, UI kit homepage đầy đủ. File này là bản spec rút gọn để agent
> làm việc offline. **Áp dụng cho site từ 2026-07-14.**
>
> ⚠️ Hệ cũ "Lamborghini" (đen tuyền + all-caps + góc 0px) đã **ngừng áp dụng** —
> đừng khôi phục các quy tắc đó. Bản redesign này thay thế toàn bộ.

## 1. Tinh thần

**"Cinematic emotional listening journal"** — không phải landing page marketing
thông thường. Trang phải gợi cảm giác: căn phòng yên tĩnh sau nửa đêm, ánh đèn ấm
qua ô cửa mưa, một bộ sưu tập đĩa nhạc cá nhân, tạp chí âm nhạc editorial.

Tính từ cốt lõi: soulful · cinematic · intimate · warm · reflective · poetic ·
quietly premium · human.

**Tránh:** gradient SaaS tím generic, glassmorphism tràn lan, neon cyberpunk,
card bo tròn khắp nơi, khối đen trống rỗng khổng lồ, hiệu ứng hạt ngẫu nhiên,
con trỏ tùy biến, chữ tách từng ký tự, autoplay âm thanh, scroll hijacking,
**nội dung ẩn chờ hiệu ứng mới hiện ra**.

## 2. Màu (tokens — giá trị nguyên văn)

```css
/* Ink & plum ramp (nền → bề mặt; elevation = làm SÁNG bề mặt, không đổ bóng nặng) */
--ink-900: #050308;   /* nền sâu nhất — KHÔNG dùng #000 */
--ink-800: #0B0611;
--plum-900: #16091F;  /* bề mặt chính */
--plum-800: #1F0E2C;  /* card */
--plum-700: #2A1339;  /* hover */
--violet-700: #32104A;
--violet-600: #45215F;

/* Chữ — KHÔNG dùng trắng tinh #fff trên diện rộng */
--ivory: #F3EEE4;       /* chữ chính (warm ivory) */
--ivory-dim: #DAD3C6;
--lavender: #B9AFBF;    /* chữ phụ */
--lavender-mut: #9A8FA6;/* chữ muted (đạt AA trên plum) */
--smoke: #6E6577;       /* faint / disabled */

/* Antique gold — hành động */
--gold: #D5AE36;        /* accent chính */
--gold-soft: #E8CE7A;   /* hover */
--gold-ember: #A97720;  /* pressed */
--on-gold: #1A0E05;     /* chữ trên nền gold */

/* Nhấn cảm xúc */
--rose: #C77B86;  --rose-soft: #E3A9AF;  --burgundy: #5E2130;

/* Hairline ấm */
--border: rgba(243,238,228,.10);
--border-strong: rgba(243,238,228,.22);
--border-gold: rgba(213,174,54,.32);

/* Status (trầm, không neon) */
--status-success: #7FB08A;  --status-error: #D98A8A;

/* Glow khí quyển */
--glow-violet: rgba(120,58,180,.28);  --glow-gold: rgba(213,174,54,.14);
--glow-rose: rgba(199,123,134,.16);
--scrim: rgba(5,3,8,.72);  --scrim-strong: rgba(5,3,8,.88);
```

## 3. Typography

- **Display:** Cormorant Garamond (500–600, *italic* cho tên mood/caption) —
  hero, tiêu đề section, quote, tên track. **Sentence case, KHÔNG all-caps.**
- **UI/body:** Manrope (300–700) — nav, metadata, controls, body. (Đổi từ Inter
  ở bản redesign — giọng riêng hơn, hỗ trợ tiếng Việt tốt.)
- UPPERCASE nhỏ + tracking rộng **chỉ** cho eyebrow / label / nút.
- Scale fluid (clamp): hero 44→104 · display 36→72 · title 30→52 · heading 24→38
  · subheading 21→27 · lead 17→19 · body 16 · sm 14 · xs 12.5 · eyebrow 12 · micro 11.
- Line-height: display 1.02 · tight 1.12 · heading 1.22 · body 1.65 · relaxed 1.78
  (tiếng Việt dài hơn tiếng Anh — cho phép heading xuống dòng, đo bằng cả 2 ngữ).
- Tracking: eyebrow .28em · wide .16em (nút) · display -0.01em.

## 4. Hình khối & elevation

- Khung chữ nhật editorial kiềm chế, hairline mảnh, **bo góc nhỏ**: 2px (tag/badge),
  4px (nút/input/card). KHÔNG bo tròn mọi thứ. Pill 999px chỉ cho equalizer/dot.
- Card: nền plum-800, hairline ivory 10% (hover ấm lên 22% / gold 32%), radius 4px.
- Elevation: ink → plum → violet (sáng dần) + shadow ấm mờ
  (`0 10px 30px rgba(5,3,8,.45)`) + glow gold/violet khi cần.
- Blur (backdrop) CHỈ ở header sticky + mobile sheet (14px).

## 5. Motion — "breathing, not performing"

- Được phép: glow trôi chậm (16s), reveal nhẹ **gated IntersectionObserver với
  nội dung HIỂN THỊ MẶC ĐỊNH** (class .reveal do JS thêm + safety timeout 1.8s),
  hover đổi màu + nhích 1px, sóng âm mảnh, parallax rất nhẹ trên lớp trang trí.
- Cấm: scroll hijacking, nội dung vô hình chờ trigger, tách chữ, marquee,
  con trỏ tùy biến, autoplay âm thanh, hiệu ứng hạt dày đặc.
- `prefers-reduced-motion: reduce` → tắt hết (canvas + progress tự gỡ).
- Duration: fast 220ms · base 400ms · reveal 900ms; ease `cubic-bezier(.22,.61,.36,1)`.
- Lớp 3D (fx.js): vinyl/equalizer/sóng/nốt/vòng wireframe mảnh — đúng motif
  waveform/orbit của brand, opacity thấp, tự tắt khi CDN/WebGL lỗi.

## 6. Components (trạng thái chuẩn)

- **Button primary:** nền gold, chữ on-gold, label uppercase .16em 13px semibold,
  h 48px (sm 38 / lg 56), radius 4px. Hover: gold-soft + glow + translateY(-1px).
  Press: gold-ember. **Secondary:** ghost hairline ivory 22% → hover chữ gold-soft
  + viền gold + wash gold 6%.
- **Tag:** micro uppercase, viền gold 32%, nền gold 5%, radius 2px.
- **Badge:** nền gold đặc (hoặc success 16%), chữ on-gold, dot phát sáng.
- **MoodChip:** frame editorial + glyph waveform, tên serif 1.15rem; selected =
  viền gold + wash gold 7%.
- **ReleaseCard:** thumbnail 16/9 + play button "glass" (scrim + viền ivory,
  hiện khi hover) + tag mood + title serif + desc sm + nút watch full-width.
  Featured = 2 cột, badge gold, nút primary.
- **ImageSlot:** ảnh KHÔNG bao giờ để lỗ trống — sd → hq → poster thương hiệu
  (radial violet + waveform glyph gold + label). CSS: `.slot[data-state="broken"]`.
- **Accordion (FAQ):** `<details>` thuần — câu hỏi serif, icon +/× gold xoay,
  hairline giữa mục, không cần JS vẫn chạy.
- **LanguageSwitch:** khung vuông 2px, segment active tô gold — EN/VI ngang hàng,
  có ở header + mobile sheet + footer.

## 7. Nội dung & song ngữ

- Giọng: nhẹ nhàng, trực tiếp, thơ nhưng dễ hiểu. Viết về KHOẢNH KHẮC cụ thể
  (thành phố lặng yên, ngọn đèn sau nửa đêm, mưa khô trên kính) — không slogan.
- Cấm sáo ngữ: "embark on a journey", "unlock the power of…", "immerse yourself…",
  "healing frequencies" (không có căn cứ).
- EN và VI viết **độc lập**, không dịch máy; title track giữ tiếng Anh (khớp
  video thật). VI dài hơn EN — layout phải chịu được.
- Tin cậy: "miễn phí để nghe" ≠ "miễn phí để dùng lại" — mọi chỗ nói về reuse
  đều dẫn về trang About của kênh. Không claim y khoa/chữa bệnh tuyệt đối.
- Không emoji trong copy chính.

## 8. IA trang chủ (thứ tự section)

header sticky (thu gọn khi cuộn) → hero "the current hour" (chữ + CTA + chip
bản mới nhất | emblem Vivi trong orbit) → mood selector (7 mood: Deep Focus,
Late-night Soul, Healing, Quiet Morning, Rainy Window, Nostalgic, Inner Strength
— mỗi mood 1 track thật) → latest release (featured card) → archive (6 card)
→ why (3 nguyên tắc, #3 = "AI-assisted, human-curated") → meet Vivi/story →
how to listen (3 bước) → FAQ (5 câu, có câu licensing) → email capture (ẩn tới
khi có Formspree ID) → final CTA → footer (3 cột + usage note + lang switch).

## 9. Vivi identity

- Emblem thật của kênh: `assets/vivi-soul-logo.jpg` (V tím + gold + ngôi sao +
  vòng orbit) — dùng ở header, hero (trong orbit rings), story, footer, OG image.
- **Chưa có art chân dung Vivi** — không tự vẽ/generate. Slot story dùng emblem
  trong orbit sắc hồng; khi Denis có art thật thì thay vào `.story-portrait`.
- Motif brand: waveform · orbit rings · equalizer · ánh đèn ấm.
