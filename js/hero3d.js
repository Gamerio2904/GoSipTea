/* ==========================================================================
   GoSipTea — Hero3D (index.html only, ES module loaded via importmap)
   A true 3D teacup + GPU steam particles (three.js), replacing the flat SVG
   cup whenever WebGL is available:

     - reads the SAME scroll progress (--p) that js/hero.js writes, so the
       3D steam dissolves exactly while the "GoSipTea" lettering materializes
     - mouse parallax + float bob + slow drift = the "high end vibe" layer
     - reduced motion  → no-op (SVG static hero stays)
     - any failure (no WebGL, CDN blocked) → SVG fallback stays untouched

   After successful boot it adds `.gl-ok` to #cup-hero; css/home.css then
   fades out the SVG cup but keeps its layout space (no reflow).
   ========================================================================== */

const hero = document.getElementById("cup-hero");
const canvas = document.getElementById("gl-hero");

const reducedMotion = window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (hero && canvas && !reducedMotion) {
  try {
    const THREE = await import("three");
    boot(THREE);
  } catch {
    /* CDN blocked or WebGL unavailable → keep SVG hero */
  }
}

function boot(THREE) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas, antialias: true, alpha: true, powerPreference: "high-performance"
    });
  } catch {
    return; /* no WebGL context → SVG fallback */
  }
  renderer.setClearColor(0x000000, 0);

  /* ---------------- scene & camera ---------------- */
  const scene = new THREE.Scene();
  const CAM_Z = 7.4;
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
  camera.position.set(0, 0.55, CAM_Z);
  camera.lookAt(0, 0.12, 0);

  /* ---------------- materials ---------------- */
  const ceramic = new THREE.MeshPhysicalMaterial({
    color: 0x17301f, roughness: 0.34, metalness: 0.05,
    clearcoat: 0.55, clearcoatRoughness: 0.3
  });
  const ceramicDark = new THREE.MeshPhysicalMaterial({
    color: 0x0d1f14, roughness: 0.44, clearcoat: 0.35, clearcoatRoughness: 0.42
  });
  const gold = new THREE.MeshStandardMaterial({
    color: 0xdcb676, roughness: 0.28, metalness: 0.9
  });

  /* ---------------- cup group ---------------- */
  const cup = new THREE.Group();

  const profile = [
    [0.0, 0.0], [0.58, 0.0], [0.74, 0.045], [0.9, 0.2],
    [1.0, 0.5], [1.06, 0.86], [1.09, 1.1]
  ].map(([x, y]) => new THREE.Vector2(x, y));
  cup.add(new THREE.Mesh(new THREE.LatheGeometry(profile, 72), ceramic));

  /* tea surface */
  const tea = new THREE.Mesh(
    new THREE.CircleGeometry(1.02, 48),
    new THREE.MeshStandardMaterial({
      color: 0xb26f1a, roughness: 0.22,
      emissive: 0x5a3002, emissiveIntensity: 0.4
    })
  );
  tea.rotation.x = -Math.PI / 2;
  tea.position.y = 1.04;
  cup.add(tea);

  /* gold rim */
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1.09, 0.016, 12, 72), gold);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 1.1;
  cup.add(rim);

  /* handle */
  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.34, 0.085, 16, 40, Math.PI * 1.35), ceramic
  );
  handle.position.set(1.22, 0.62, 0);
  handle.rotation.z = Math.PI * 0.82;
  cup.add(handle);

  /* saucer */
  const sProfile = [
    [0.0, 0.0], [0.9, 0.0], [1.42, 0.05], [1.66, 0.14],
    [1.72, 0.22], [1.45, 0.13], [0.0, 0.05]
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const saucer = new THREE.Mesh(new THREE.LatheGeometry(sProfile, 72), ceramicDark);
  saucer.position.y = -0.06;
  cup.add(saucer);

  cup.position.y = -0.45;
  scene.add(cup);

  /* ---------------- lights ---------------- */
  scene.add(new THREE.AmbientLight(0xfff1d8, 0.55));
  const key = new THREE.DirectionalLight(0xffd9a0, 1.5);
  key.position.set(2.6, 3.2, 2.2);
  scene.add(key);
  const rimLight = new THREE.DirectionalLight(0x9fd0aa, 0.9);
  rimLight.position.set(-3, 1.6, -2.4);
  scene.add(rimLight);
  const underGlow = new THREE.PointLight(0xdcb676, 0.5, 6);
  underGlow.position.set(0, -0.5, 1.8);
  scene.add(underGlow);

  /* ---------------- GPU steam particles ---------------- */
  function steamTexture() {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(32, 32, 2, 32, 32, 30);
    grad.addColorStop(0, "rgba(255,250,238,0.85)");
    grad.addColorStop(0.4, "rgba(244,238,224,0.35)");
    grad.addColorStop(1, "rgba(244,238,224,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }

  const isMobile = window.matchMedia("(max-width: 760px)").matches;
  const COUNT = isMobile ? 200 : 430;
  const pos = new Float32Array(COUNT * 3);
  const seed = new Float32Array(COUNT);
  const speed = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    seed[i] = Math.random() * Math.PI * 2;
    speed[i] = 0.35 + Math.random() * 0.75;
    pos[i * 3] = (Math.random() - 0.5) * 0.7;
    pos[i * 3 + 1] = 0.6 + Math.random() * 2.4;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 0.7;
  }
  const steamGeo = new THREE.BufferGeometry();
  steamGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const steamMat = new THREE.PointsMaterial({
    map: steamTexture(), size: 0.26, transparent: true, opacity: 0.5,
    depthWrite: false, blending: THREE.AdditiveBlending,
    sizeAttenuation: true, color: 0xf0ebdd
  });
  const steam = new THREE.Points(steamGeo, steamMat);
  scene.add(steam);

  /* ---------------- scroll progress (same --p as js/hero.js) ---------------- */
  const smooth = (v, a, b) => {
    const x = Math.min(1, Math.max(0, (v - a) / (b - a)));
    return x * x * (3 - 2 * x);
  };
  const progress = () => parseFloat(hero.style.getPropertyValue("--p")) || 0;

  /* ---------------- mouse parallax ---------------- */
  let tx = 0, ty = 0, cx = 0, cy = 0;
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    if (!r.height) return;
    tx = ((e.clientX - r.left) / r.width - 0.5) * 0.5;
    ty = ((e.clientY - r.top) / r.height - 0.5) * 0.22;
  }, { passive: true });
  hero.addEventListener("pointerleave", () => { tx = 0; ty = 0; }, { passive: true });

  /* ---------------- resize ---------------- */
  function resize() {
    const r = canvas.parentElement.getBoundingClientRect();
    const w = Math.max(1, r.width), h = Math.max(1, r.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize, { passive: true });

  /* ---------------- render loop (paused off-screen) ---------------- */
  const clock = new THREE.Clock();
  let raf = 0, visible = true, t = 0;

  function loop() {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(clock.getDelta(), 0.05);
    t += dt;
    const p = progress();

    cx += (tx - cx) * 0.05;
    cy += (ty - cy) * 0.05;
    cup.rotation.y = t * 0.22 + cx;
    cup.rotation.x = cy * 0.6 - p * 0.12;
    cup.rotation.z = -p * 0.16;
    cup.position.y = -0.45 + Math.sin(t * 0.85) * 0.05 + p * 0.5;
    camera.position.z = CAM_Z - p * 0.9;
    camera.lookAt(0, 0.12 + p * 0.2, 0);

    const fade = 1 - smooth(p, 0.05, 0.55) * 0.96;
    steamMat.opacity = 0.5 * fade;
    steam.visible = fade > 0.02;
    if (steam.visible) {
      const arr = steamGeo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        let y = arr[i * 3 + 1] + speed[i] * dt;
        if (y > 3.05) y = 0.6;
        arr[i * 3 + 1] = y;
        const rise = Math.min(1, (y - 0.6) / 2.4);
        const spread = 0.1 + rise * 0.85;
        arr[i * 3] = Math.sin(t * 1.05 + seed[i]) * spread +
                     Math.sin(t * 0.35 + seed[i] * 2.1) * 0.08;
        arr[i * 3 + 2] = Math.cos(t * 0.9 + seed[i] * 1.7) * spread * 0.6;
      }
      steamGeo.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }

  function start() { if (!raf) { clock.getDelta(); raf = requestAnimationFrame(loop); } }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }

  new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    visible ? start() : stop();
  }, { threshold: 0.02 }).observe(hero);

  resize();
  start();

  /* 3D is live → fade out the SVG cup, keep layout space */
  hero.classList.add("gl-ok");
}
