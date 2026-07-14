// ============================================================
// VIVI SOUL — FX LAYER (Vivi Soul Design System)
// Thế giới 3D wireframe (Three.js) + cuộn mượt (Lenis).
//
// Nguyên tắc motion của design system: "breathing, not performing"
//   - KHÔNG ẩn nội dung chờ hiệu ứng (reveal do script.js đảm nhận,
//     nội dung hiển thị mặc định).
//   - KHÔNG con trỏ tùy biến, KHÔNG tách chữ, KHÔNG marquee.
//   - Lớp 3D chỉ là trang trí sau nội dung: vật thể wireframe
//     mảnh, trôi chậm, mờ dần khi rời "chương" của mình.
//
// An toàn:
//   - prefers-reduced-motion → tắt toàn bộ, trang tĩnh như cũ.
//   - CDN lỗi / WebGL lỗi → tự gỡ canvas, nội dung không bị ẩn.
//   - Mọi màu lấy từ palette Vivi Soul (DESIGN.md).
//
// Bố cục thế giới 3D (mỗi section một "đạo cụ", camera đi xuống
// theo scroll):
//   hero (#main-content) → đĩa vinyl wireframe gold quay chậm + nốt nhạc
//   #moods              → equalizer 3D (cột violet nhún nhẹ)
//   #latest-release     → hai dải sóng âm sin (gold / violet)
//   #releases           → nốt nhạc wireframe bay lơ lửng hai mép
//   #subscribe          → 3 vòng hào quang gold / rose xoay chậm
// ============================================================
import * as THREE from 'three';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.getElementById('stage');

if (reduced || !canvas) {
  // Trang quay về trạng thái tĩnh: gỡ canvas + progress bar.
  if (canvas) canvas.remove();
  const bar = document.getElementById('progress');
  if (bar) bar.remove();
} else {
  boot();
}

function boot() {
  /* ---------------- Lenis — cuộn mượt (tùy chọn, CDN) ---------------- */
  let lenis = null;
  if (window.Lenis) {
    // scroll-behavior:smooth của CSS xung đột với Lenis → trả về auto.
    document.documentElement.style.scrollBehavior = 'auto';
    lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
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

  /* ---------------- Progress bar — vạch gold mảnh trên cùng ---------------- */
  const progressBar = document.getElementById('progress');

  /* ---------------- Marquee — 2 dải chữ trôi ngang theo scroll ----------------
     mq chẵn trôi sang trái (0 → -25%), mq lẻ trôi sang phải (-25% → 0)
     theo tiến độ dải băng đi qua viewport. Không fx → đứng yên, chữ vẫn hiện. */
  const marquees = [...document.querySelectorAll('.marquee')].map((el, i) => ({
    el, track: el.querySelector('.track'), dir: i % 2 === 0 ? 1 : -1
  })).filter(m => m.track);
  function updateMarquees() {
    for (const m of marquees) {
      const rect = m.el.getBoundingClientRect();
      const total = innerHeight + rect.height;
      const p = Math.min(Math.max((innerHeight - rect.top) / total, 0), 1);
      const x = m.dir === 1 ? -25 * p : -25 * (1 - p);
      m.track.style.transform = `translateX(${x}%)`;
    }
  }
  addEventListener('resize', updateMarquees);
  addEventListener('vivi:layout', updateMarquees);
  updateMarquees();

  /* ---------------- Thế giới 3D ---------------- */
  let render3D = null;
  try {
    render3D = init3D();
  } catch (err) {
    // WebGL không khả dụng → bỏ lớp 3D, trang vẫn nguyên vẹn
    canvas.remove();
  }

  /* ---------------- vòng lặp khung hình chung ---------------- */
  let lastMqScroll = -1;
  function loop(now) {
    if (lenis) lenis.raf(now);
    if (progressBar) {
      const max = document.documentElement.scrollHeight - innerHeight;
      progressBar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
    }
    if (scrollY !== lastMqScroll) {
      lastMqScroll = scrollY;
      updateMarquees();
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
    // cap 1.6: màn hình HiDPI đỡ phải vẽ gấp đôi pixel → cuộn mượt hơn
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
    renderer.setSize(innerWidth, innerHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
    camera.position.z = 10;

    // Palette — trùng tokens :root (DESIGN.md): antique gold, violet glow, dusk rose
    const GOLD = 0xd5ae36, VIOLET = 0x9b6bd0, VIOLET_DEEP = 0x783ab4, ROSE = 0xc77b86;

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
    // Mỗi nhóm có bộ material RIÊNG để fade độc lập theo khoảng cách section.
    // Opacity hạ nhẹ so với bản cũ — lớp 3D là hơi thở, không phải sân khấu.
    const newMats = () => ({
      gold:       new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.6 }),
      goldSoft:   new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.26 }),
      violet:     new THREE.LineBasicMaterial({ color: VIOLET, transparent: true, opacity: 0.42 }),
      violetSoft: new THREE.LineBasicMaterial({ color: VIOLET_DEEP, transparent: true, opacity: 0.22 }),
      rose:       new THREE.LineBasicMaterial({ color: ROSE, transparent: true, opacity: 0.4 })
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
      for (let r = 1.15; r <= 2.06; r += 0.18) vinyl.add(ring(r, M.violetSoft, 80)); // rãnh đĩa violet
      vinyl.add(ring(0.78, M.gold, 64));   // nhãn giữa
      vinyl.add(ring(0.07, M.gold, 24));   // lỗ trục
      // 3 vạch trên nhãn — để mắt thấy được chuyển động quay
      [0, 2.1, 4.2].forEach(a => {
        vinyl.add(line([v(Math.cos(a) * 0.74, Math.sin(a) * 0.74), v(Math.cos(a) * 0.5, Math.sin(a) * 0.5)], M.violet));
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

    /* --- MOODS: equalizer 3D — 30 cột violet nhún như visualiser --- */
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
      g.add(new THREE.LineSegments(eqGeo, M.violet));
      g.add(line([v(-W / 2, 0), v(W / 2, 0)], M.goldSoft)); // đường chân
      g.userData.update = t => {
        for (let i = 0; i < N; i++) {
          const h = 0.4 + Math.abs(Math.sin(t * 1.1 + i * 0.55) * Math.sin(t * 0.37 + i * 1.7)) * 2.1;
          eqArr[i * 6 + 1] = -h / 2; eqArr[i * 6 + 4] = h / 2;
        }
        eqGeo.attributes.position.needsUpdate = true;
      };
      register('moods', g, M, 0.8);
    }

    /* --- LATEST RELEASE: 2 dải sóng âm sin (gold trên, violet dưới) --- */
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
      const w2 = mkWave(M.violet, -3.3, 0.55, 1.7);
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

    /* --- RELEASES: 6 nốt nhạc bay lơ lửng dọc hai mép section --- */
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
      register('releases', g, M, 0.85);
    }

    /* --- SUBSCRIBE (final CTA): 3 vòng hào quang gold / rose xoay chậm --- */
    {
      const M = newMats();
      const g = new THREE.Group();
      const r1 = ring(2.3, M.gold, 100);
      const r2 = ring(2.85, M.rose, 100);   // dusk rose — nhấn cảm xúc
      const r3 = ring(3.4, M.goldSoft, 100);
      g.add(r1, r2, r3);
      g.userData.update = t => {
        r1.rotation.x = t * 0.22;        r1.rotation.y = t * 0.13;
        r2.rotation.x = -t * 0.17;       r2.rotation.y = t * 0.21 + 1;
        r3.rotation.x = t * 0.1 + 0.6;   r3.rotation.z = t * 0.08;
      };
      register('subscribe', g, M, 0.9);
    }

    /* --- Bụi vàng lấp lánh rải suốt chiều dài trang --- */
    const DUST_N = 300;
    const dustGeo = new THREE.BufferGeometry();
    const dustArr = new Float32Array(DUST_N * 3);
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustArr, 3));
    scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({
      color: GOLD, size: 0.035, transparent: true, opacity: 0.3
    })));

    /* ---------- đồng bộ thế giới 3D với layout document ---------- */
    const IDS = ['main-content', 'moods', 'latest-release', 'releases', 'subscribe'];
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
      stage['moods'].position.z = -3.2;
      stage['latest-release'].position.z = -2.6;
      stage['releases'].position.z = mob ? -4 : -2.2;
      stage['releases'].userData.items.forEach(n => { n.position.x = n.userData.nx * halfW; });
      stage['subscribe'].position.z = -3;
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
    const clock = new THREE.Clock();

    addEventListener('resize', () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      sync();
    });
    document.fonts.ready.then(sync);
    // script.js phát 'vivi:layout' sau khi đổi ngôn ngữ / render lại nội dung
    addEventListener('vivi:layout', sync);
    // Nội dung động (mood panel, cards) render xong mới đo — chờ 1 nhịp
    setTimeout(sync, 300);
    sync();

    /* ---------- render mỗi frame ---------- */
    return function render() {
      const t = clock.getElapsedTime();
      // camera đi xuống theo scroll (lerp cho mượt) + parallax chuột rất nhẹ
      camY = THREE.MathUtils.lerp(camY, -(scrollY + innerHeight / 2) * SCALE, 0.16);
      camera.position.y = camY;
      camera.position.x = mouse.x * 0.4;
      camera.rotation.y = -mouse.x * 0.018;
      camera.rotation.x = mouse.y * 0.012;

      // vận tốc cuộn → vật thể 3D xoay nhanh hơn một chút
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
