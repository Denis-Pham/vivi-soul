// ============================================================
// VIVI SOUL — FX LAYER
// Thế giới 3D wireframe (Three.js) + scroll choreography
// (GSAP ScrollTrigger) + cuộn mượt (Lenis).
//
// Nguyên tắc an toàn:
//   - prefers-reduced-motion → tắt toàn bộ, trang tĩnh như cũ.
//   - CDN lỗi / WebGL lỗi → tự gỡ canvas, nội dung không bị ẩn.
//   - Mọi màu lấy từ palette tím/đen/gold của trang.
//
// Bố cục thế giới 3D (mỗi section một "đạo cụ", bám theo vị trí
// section trong document — camera đi xuống theo scroll):
//   hero            → đĩa vinyl wireframe gold quay chậm + nốt nhạc
//   features        → equalizer 3D (cột sóng tím nhún theo nhạc)
//   latest-release  → hai dải sóng âm sin chạy ngang
//   featured-tracks → nốt nhạc wireframe bay lơ lửng hai bên
//   closing         → 3 vòng hào quang gold/tím xoay chậm
// ============================================================
import * as THREE from 'three';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.getElementById('stage');
const hasLibs = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

if (reduced || !hasLibs || !canvas) {
  // Trang quay về trạng thái tĩnh: gỡ canvas + progress bar.
  if (canvas) canvas.remove();
  const bar = document.getElementById('progress');
  if (bar) bar.remove();
} else {
  boot();
}

function boot() {
  gsap.registerPlugin(ScrollTrigger);

  /* ---------------- Lenis — cuộn mượt ---------------- */
  // scroll-behavior:smooth của CSS xung đột với Lenis → trả về auto.
  document.documentElement.style.scrollBehavior = 'auto';
  // ScrollTrigger có thể bỏ lỡ scroll không do Lenis điều khiển
  // (kéo scrollbar, phím Page Down, scroll programmatic) → luôn tự update.
  addEventListener('scroll', () => ScrollTrigger.update(), { passive: true });

  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    // Anchor link đi qua Lenis cho mượt (trừ skip-link — giữ hành vi a11y gốc)
    document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -84, duration: 1.1 }); // chừa chỗ header cố định
      });
    });
  }

  /* ================= DOM CHOREOGRAPHY (GSAP) ================= */

  // Thanh tiến độ gold trên cùng
  gsap.to('#progress', {
    scaleX: 1, ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 }
  });

  // Hero vào trang: các khối trồi lên lần lượt
  gsap.from('.hero .eyebrow, .hero h1, .hero p.sub, .hero .cta, .hero .mood-switcher', {
    y: 46, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.09, delay: 0.15
  });

  // Hero thoát: trôi lên + mờ dần khi cuộn xuống (scrub đảo ngược được)
  gsap.to('.hero', {
    yPercent: -12, opacity: 0.2, ease: 'none',
    scrollTrigger: { trigger: '.hero-shell', start: 'top top', end: 'bottom 30%', scrub: 0.5 }
  });

  // Word-reveal cho các h2 màu phẳng (KHÔNG áp dụng heading gradient-clip —
  // tách span sẽ làm mất hiệu ứng gradient text)
  const splitTargets = document.querySelectorAll('.features h2, .how h2, .tracks h2, .faq h2, .updates h2');
  splitTargets.forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(w => `<span class="w"><span>${w}</span></span>`).join(' ');
    gsap.fromTo(el.querySelectorAll('.w > span'),
      { yPercent: 120, rotate: 5 },
      { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: 0.07,
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } });
  });

  // Reveal hàng loạt: card / step / FAQ / lede… trồi lên có stagger
  const batchItems = gsap.utils.toArray(
    '.feature, .step, .tier, .faq-list details, .latest-release-card, ' +
    '.section-header, section .lede, .logos span, .proof h2, ' +
    '.closing h2, .closing p, .closing .btn-primary'
  );
  gsap.set(batchItems, { y: 42, opacity: 0 });
  ScrollTrigger.batch(batchItems, {
    start: 'top 90%', once: true,
    onEnter: batch => gsap.to(batch, {
      y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.08, overwrite: true
    })
  });

  // Hai dải marquee trôi ngang theo scroll, ngược hướng nhau
  gsap.fromTo('#mq1 .track', { xPercent: 0 }, { xPercent: -25, ease: 'none',
    scrollTrigger: { trigger: '#mq1', start: 'top bottom', end: 'bottom top', scrub: 0.4 } });
  gsap.fromTo('#mq2 .track', { xPercent: -25 }, { xPercent: 0, ease: 'none',
    scrollTrigger: { trigger: '#mq2', start: 'top bottom', end: 'bottom top', scrub: 0.4 } });

  /* ---------------- con trỏ nốt nhạc (chỉ desktop, pointer mịn) ---------------- */
  let cursorEl = null, ringEl = null;
  const cur = { x: innerWidth / 2, y: innerHeight / 2, rx: innerWidth / 2, ry: innerHeight / 2 };
  if (matchMedia('(pointer: fine)').matches) {
    cursorEl = document.createElement('div');
    cursorEl.id = 'cursor';
    cursorEl.textContent = '♪';
    ringEl = document.createElement('div');
    ringEl.id = 'ring';
    document.body.append(cursorEl, ringEl);
    document.body.classList.add('fx-cursor');   // bật cursor:none qua CSS
    addEventListener('pointermove', e => { cur.x = e.clientX; cur.y = e.clientY; });
    // vòng tròn phóng to khi rê vào phần tử bấm được
    document.addEventListener('mouseover', e => {
      if (e.target.closest('a, button, summary')) ringEl.classList.add('hot');
      else ringEl.classList.remove('hot');
    });
  }

  /* ================= THẾ GIỚI 3D (Three.js) ================= */
  let render3D = null;
  try {
    render3D = init3D();
  } catch (err) {
    // WebGL không khả dụng → bỏ lớp 3D, các hiệu ứng GSAP vẫn chạy
    canvas.remove();
  }

  /* ---------------- vòng lặp khung hình chung ---------------- */
  // ScrollTrigger.update() gọi từ rAF khi scrollY đổi — không phụ thuộc
  // sự kiện scroll (một số môi trường không phát event khi scroll bằng code).
  let lastSeenScroll = -1;
  function loop(now) {
    if (lenis) lenis.raf(now);
    if (scrollY !== lastSeenScroll) {
      lastSeenScroll = scrollY;
      ScrollTrigger.update();
    }
    // con trỏ ♪: nốt bám sát chuột (lắc nhẹ), vòng tròn đuổi theo có độ trễ
    if (cursorEl) {
      cur.rx += (cur.x - cur.rx) * 0.18;
      cur.ry += (cur.y - cur.ry) * 0.18;
      cursorEl.style.transform =
        `translate(${cur.x - 7}px, ${cur.y - 14}px) rotate(${Math.sin(now * 0.002) * 12}deg)`;
      const half = ringEl.classList.contains('hot') ? 32 : 18;
      ringEl.style.transform = `translate(${cur.rx - half}px, ${cur.ry - half}px)`;
    }
    if (render3D) render3D();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  /* ============================================================
     init3D — dựng scene, trả về hàm render gọi mỗi frame
     ============================================================ */
  function init3D() {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    // cap 1.6 thay vì 2: màn hình HiDPI đỡ phải vẽ gấp đôi pixel → cuộn mượt hơn
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
    renderer.setSize(innerWidth, innerHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
    camera.position.z = 10;

    // Palette — trùng tokens :root trong index.html
    const GOLD = 0xd4af37, PURPLE = 0x9333d4, PURPLE_SOFT = 0xb04ae8;

    const v = (x, y, z = 0) => new THREE.Vector3(x, y, z);
    const circlePts = (r, seg = 72) => {
      const pts = [];
      for (let i = 0; i < seg; i++) {
        const a = i / seg * Math.PI * 2;
        pts.push(v(Math.cos(a) * r, Math.sin(a) * r));
      }
      return pts;
    };
    const line = (pts, m) => new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), m);
    const ring = (r, m, seg) => new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(circlePts(r, seg)), m);
    // Mỗi nhóm có bộ material RIÊNG để fade độc lập theo khoảng cách section
    const newMats = () => ({
      gold:       new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.72 }),
      goldSoft:   new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.3 }),
      purple:     new THREE.LineBasicMaterial({ color: PURPLE_SOFT, transparent: true, opacity: 0.5 }),
      purpleSoft: new THREE.LineBasicMaterial({ color: PURPLE, transparent: true, opacity: 0.26 })
    });

    // Nốt nhạc wireframe: đầu nốt elip + thân + cờ (hoặc cặp nốt nối beam)
    function buildNote(M, beamed) {
      const g = new THREE.Group();
      const head = (x, y) => {
        const pts = circlePts(1, 28).map(p => v(p.x * 0.2, p.y * 0.14));
        const h = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), M.gold);
        h.position.set(x, y, 0); h.rotation.z = -0.35;
        return h;
      };
      if (beamed) {
        g.add(head(0, 0)); g.add(head(0.85, 0.1));
        g.add(line([v(0.17, 0.05), v(0.17, 1.05)], M.gold));
        g.add(line([v(1.02, 0.15), v(1.02, 1.15)], M.gold));
        g.add(line([v(0.17, 1.05), v(1.02, 1.15)], M.gold));
        g.add(line([v(0.17, 0.88), v(1.02, 0.98)], M.goldSoft));
      } else {
        g.add(head(0, 0));
        g.add(line([v(0.17, 0.05), v(0.17, 1.0)], M.gold));
        const flag = new THREE.QuadraticBezierCurve3(v(0.17, 1.0), v(0.62, 0.86), v(0.5, 0.42));
        g.add(line(flag.getPoints(14), M.gold));
      }
      return g;
    }

    const stage = {}, fadeMats = {};
    function register(id, g, M, dim = 1) {
      stage[id] = g;
      scene.add(g);
      fadeMats[id] = Object.values(M).map(m => {
        m.userData.base = m.opacity * dim;
        return m;
      });
    }

    /* --- HERO: đĩa vinyl gold nghiêng, quay chậm + 2 nốt nhạc bay --- */
    {
      const M = newMats();
      const g = new THREE.Group();
      const vinyl = new THREE.Group();
      vinyl.add(ring(2.3, M.gold, 96));
      vinyl.add(ring(2.22, M.goldSoft, 96));
      for (let r = 1.15; r <= 2.06; r += 0.18) vinyl.add(ring(r, M.purpleSoft, 80)); // rãnh đĩa tím
      vinyl.add(ring(0.78, M.gold, 64));   // nhãn giữa
      vinyl.add(ring(0.07, M.gold, 24));   // lỗ trục
      // 3 vạch trên nhãn — để mắt thấy được chuyển động quay
      [0, 2.1, 4.2].forEach(a => {
        vinyl.add(line([v(Math.cos(a) * 0.74, Math.sin(a) * 0.74), v(Math.cos(a) * 0.5, Math.sin(a) * 0.5)], M.purple));
      });
      vinyl.rotation.x = -0.52;            // nghiêng để có chiều sâu
      g.add(vinyl);
      const n1 = buildNote(M, false); n1.position.set(-3.3, 1.6, -1);   n1.scale.setScalar(0.9);
      const n2 = buildNote(M, true);  n2.position.set(-2.5, -2.3, -1.5); n2.scale.setScalar(0.7);
      g.add(n1, n2);
      g.userData.update = (t, spin) => {
        vinyl.rotation.z = t * 0.3 + spin * 2;
        vinyl.position.y = Math.sin(t * 0.5) * 0.18;
        n1.position.y = 1.6 + Math.sin(t * 0.7) * 0.25;  n1.rotation.z = Math.sin(t * 0.4) * 0.25;
        n2.position.y = -2.3 + Math.sin(t * 0.6 + 2) * 0.3; n2.rotation.z = Math.sin(t * 0.5 + 1) * 0.3;
      };
      register('main-content', g, M);
    }

    /* --- FEATURES: equalizer 3D — 30 cột tím nhún như visualiser --- */
    let eqGeo, eqArr;
    {
      const M = newMats();
      const g = new THREE.Group();
      const N = 30, W = 13;
      eqGeo = new THREE.BufferGeometry();
      eqArr = new Float32Array(N * 2 * 3);
      for (let i = 0; i < N; i++) {
        const x = -W / 2 + i / (N - 1) * W;
        eqArr[i * 6] = x; eqArr[i * 6 + 3] = x;
      }
      eqGeo.setAttribute('position', new THREE.BufferAttribute(eqArr, 3));
      g.add(new THREE.LineSegments(eqGeo, M.purple));
      g.add(line([v(-W / 2, 0), v(W / 2, 0)], M.goldSoft)); // đường chân
      g.userData.update = t => {
        for (let i = 0; i < N; i++) {
          const h = 0.4 + Math.abs(Math.sin(t * 1.1 + i * 0.55) * Math.sin(t * 0.37 + i * 1.7)) * 2.1;
          eqArr[i * 6 + 1] = -h / 2; eqArr[i * 6 + 4] = h / 2;
        }
        eqGeo.attributes.position.needsUpdate = true;
      };
      register('features', g, M, 0.8);
    }

    /* --- LATEST RELEASE: 2 dải sóng âm sin (gold trên, tím dưới) --- */
    {
      const M = newMats();
      const g = new THREE.Group();
      const N = 130, W = 17;
      const mkWave = (m, yOff, amp, ph) => {
        const pts = [];
        for (let i = 0; i < N; i++) pts.push(v(-W / 2 + i / (N - 1) * W, 0));
        const l = line(pts, m);
        l.position.y = yOff;
        l.userData = { amp, ph };
        return l;
      };
      const w1 = mkWave(M.gold, 3.3, 0.45, 0);
      const w2 = mkWave(M.purple, -3.3, 0.55, 1.7);
      g.add(w1, w2);
      g.userData.update = t => {
        [w1, w2].forEach(l => {
          const pos = l.geometry.attributes.position;
          for (let i = 0; i < N; i++) {
            const x = pos.getX(i);
            // biên độ phình ở giữa, lịm dần hai mép
            pos.setY(i, Math.sin(x * 0.85 + t * 1.5 + l.userData.ph) * l.userData.amp * (0.35 + 0.65 * Math.sin(i / (N - 1) * Math.PI)));
          }
          pos.needsUpdate = true;
        });
      };
      register('latest-release', g, M, 0.9);
    }

    /* --- TRACKS: 6 nốt nhạc bay lơ lửng dọc hai mép section --- */
    {
      const M = newMats();
      const g = new THREE.Group();
      const defs = [
        { nx: -0.66, y: 4.6,  s: 1.3, beam: false },
        { nx:  0.62, y: 3.2,  s: 1.0, beam: true  },
        { nx: -0.60, y: 0.4,  s: 0.9, beam: true  },
        { nx:  0.68, y: -0.8, s: 1.2, beam: false },
        { nx: -0.64, y: -4.0, s: 1.1, beam: true  },
        { nx:  0.60, y: -5.2, s: 0.9, beam: false }
      ];
      const items = defs.map((d, i) => {
        const n = buildNote(M, d.beam);
        n.scale.setScalar(d.s);
        n.userData = { nx: d.nx, seed: i * 1.9, baseY: d.y };
        g.add(n);
        return n;
      });
      g.userData.items = items;
      g.userData.update = t => items.forEach(n => {
        n.position.y = n.userData.baseY + Math.sin(t * 0.5 + n.userData.seed) * 0.35;
        n.rotation.z = Math.sin(t * 0.35 + n.userData.seed) * 0.3;
        n.rotation.y = Math.sin(t * 0.25 + n.userData.seed) * 0.5;
      });
      register('featured-tracks', g, M, 0.85);
    }

    /* --- CLOSING: 3 vòng hào quang gold/tím xoay quanh CTA --- */
    {
      const M = newMats();
      const g = new THREE.Group();
      const r1 = ring(2.3, M.gold, 100);
      const r2 = ring(2.85, M.purple, 100);
      const r3 = ring(3.4, M.goldSoft, 100);
      g.add(r1, r2, r3);
      g.userData.update = t => {
        r1.rotation.x = t * 0.22;        r1.rotation.y = t * 0.13;
        r2.rotation.x = -t * 0.17;       r2.rotation.y = t * 0.21 + 1;
        r3.rotation.x = t * 0.1 + 0.6;   r3.rotation.z = t * 0.08;
      };
      register('closing', g, M, 0.9);
    }

    /* --- Bụi vàng lấp lánh rải suốt chiều dài trang --- */
    const DUST_N = 300;
    const dustGeo = new THREE.BufferGeometry();
    const dustArr = new Float32Array(DUST_N * 3);
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustArr, 3));
    scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({
      color: GOLD, size: 0.035, transparent: true, opacity: 0.4
    })));

    /* ---------- đồng bộ thế giới 3D với layout document ---------- */
    const IDS = ['main-content', 'features', 'latest-release', 'featured-tracks', 'closing'];
    let SCALE = 1, VISH = 9.3;
    function sync() {
      const visible = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      SCALE = visible / innerHeight; VISH = visible;
      const halfW = (visible * camera.aspect) / 2;
      const mob = innerWidth < 760;
      IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el && stage[id]) stage[id].position.y = -(el.offsetTop + el.offsetHeight / 2) * SCALE;
      });
      // Vinyl nằm nửa phải hero (desktop); mobile lùi sâu ra sau chữ
      stage['main-content'].position.x = mob ? 0 : halfW * 0.5;
      stage['main-content'].position.z = mob ? -3.5 : -0.5;
      stage['main-content'].scale.setScalar(mob ? 0.75 : 1);
      stage['features'].position.z = -3.2;
      stage['latest-release'].position.z = -2.6;
      stage['featured-tracks'].position.z = mob ? -4 : -2.2;
      stage['featured-tracks'].userData.items.forEach(n => { n.position.x = n.userData.nx * halfW; });
      stage['closing'].position.z = -3;
      // rải lại bụi theo chiều cao mới của trang
      const worldH = document.documentElement.scrollHeight * SCALE;
      for (let i = 0; i < DUST_N; i++) {
        dustArr[i * 3]     = (Math.random() - 0.5) * halfW * 2.4;
        dustArr[i * 3 + 1] = -Math.random() * worldH;
        dustArr[i * 3 + 2] = -1 - Math.random() * 5;
      }
      dustGeo.attributes.position.needsUpdate = true;
    }

    /* ---------- trạng thái scroll / chuột ---------- */
    let camY = 0, lastScroll = scrollY, velo = 0, spin = 0;
    const mouse = { x: 0, y: 0 };
    addEventListener('pointermove', e => {
      mouse.x = (e.clientX / innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / innerHeight - 0.5) * 2;
    });
    // (Đã BỎ hiệu ứng skew #page theo vận tốc cuộn: transform cả trang
    //  mỗi frame ép browser vẽ lại liên tục → nguyên nhân chính gây giật.)
    const clock = new THREE.Clock();

    addEventListener('resize', () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      sync();
      ScrollTrigger.refresh();
    });
    document.fonts.ready.then(() => { sync(); ScrollTrigger.refresh(); });
    sync();

    /* ---------- render mỗi frame ---------- */
    return function render() {
      const t = clock.getElapsedTime();
      // camera đi xuống theo scroll (lerp cho mượt) + parallax chuột
      camY = THREE.MathUtils.lerp(camY, -(scrollY + innerHeight / 2) * SCALE, 0.16);
      camera.position.y = camY;
      camera.position.x = mouse.x * 0.4;
      camera.rotation.y = -mouse.x * 0.018;
      camera.rotation.x = mouse.y * 0.012;

      // vận tốc cuộn → vật thể 3D xoay nhanh hơn
      const dv = scrollY - lastScroll; lastScroll = scrollY;
      velo = THREE.MathUtils.lerp(velo, THREE.MathUtils.clamp(dv, -60, 60), 0.12);
      spin = THREE.MathUtils.lerp(spin, velo * 0.0035, 0.08);

      for (const id of IDS) {
        const g = stage[id];
        if (g.userData.update) g.userData.update(t, spin);
        // mỗi đạo cụ chỉ hiện rõ trong chương của mình, mờ dần khi rời xa
        const dist = Math.abs(camY - g.position.y) / VISH;
        const f = THREE.MathUtils.clamp(1.4 - dist, 0, 1);
        for (const m of fadeMats[id]) m.opacity = m.userData.base * f;
      }

      renderer.render(scene, camera);
    };
  }
}
