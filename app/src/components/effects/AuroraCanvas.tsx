import { useEffect, useRef } from 'react';

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }
  // Handle 3-digit hex
  const short = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex);
  if (short) {
    return {
      r: parseInt(short[1] + short[1], 16),
      g: parseInt(short[2] + short[2], 16),
      b: parseInt(short[3] + short[3], 16),
    };
  }
  return { r: 0, g: 0, b: 0 };
}

function lerpColor(a: { r: number; g: number; b: number }, b: { r: number; g: number; b: number }, t: number) {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

function getColor(colors: { r: number; g: number; b: number }[], t: number) {
  const index = t * 3;
  const i = Math.floor(index);
  const f = index - i;
  if (i >= 3) return colors[3];
  return lerpColor(colors[i], colors[i + 1], f);
}

// Simplex noise implementation
function createSimplexNoise() {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  // Fisher-Yates shuffle
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const grad2: [number, number][] = [
    [1, 1], [-1, 1], [1, -1], [-1, -1],
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ];

  function snoise2D(x: number, y: number) {
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const G2 = (3 - Math.sqrt(3)) / 6;

    const s = (x + y) * F2;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = x - X0;
    const y0 = y - Y0;

    let i1: number, j1: number;
    if (x0 > y0) {
      i1 = 1; j1 = 0;
    } else {
      i1 = 0; j1 = 1;
    }

    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;

    const ii = i & 255;
    const jj = j & 255;

    let n0 = 0, n1 = 0, n2 = 0;

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) {
      t0 *= t0;
      const gi0 = perm[ii + perm[jj]] % 8;
      n0 = t0 * t0 * (grad2[gi0][0] * x0 + grad2[gi0][1] * y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) {
      t1 *= t1;
      const gi1 = perm[ii + i1 + perm[jj + j1]] % 8;
      n1 = t1 * t1 * (grad2[gi1][0] * x1 + grad2[gi1][1] * y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) {
      t2 *= t2;
      const gi2 = perm[ii + 1 + perm[jj + 1]] % 8;
      n2 = t2 * t2 * (grad2[gi2][0] * x2 + grad2[gi2][1] * y2);
    }

    return 70 * (n0 + n1 + n2);
  }

  function fbm(x: number, y: number, octaves: number) {
    let value = 0;
    let amplitude = 0.5;
    let frequency = 1.0;
    for (let i = 0; i < octaves; i++) {
      value += amplitude * snoise2D(x * frequency, y * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  return { snoise2D, fbm };
}

export default function AuroraCanvas() {
  const baseCanvasRef = useRef<HTMLCanvasElement>(null);
  const postCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, rx: 0.5, ry: 0.5 });
  const noiseRef = useRef(createSimplexNoise());
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const baseCanvas = baseCanvasRef.current;
    const postCanvas = postCanvasRef.current;
    if (!baseCanvas || !postCanvas) return;

    const baseCtx = baseCanvas.getContext('2d', { willReadFrequently: true });
    const postCtx = postCanvas.getContext('2d', { willReadFrequently: true });
    if (!baseCtx || !postCtx) return;

    const noise = noiseRef.current;

    // Palette colors
    const palette = [
      hexToRgb('#1a0a2e'),
      hexToRgb('#16213e'),
      hexToRgb('#0f3460'),
      hexToRgb('#0a4a3f'),
    ];

    const plasmaPalette = [
      hexToRgb('#7c3aed'),
      hexToRgb('#0ea5e9'),
      hexToRgb('#14b8a6'),
      hexToRgb('#f59e0b'),
    ];

    let time = 0;
    let lastTime = 0;

    const W = window.innerWidth;
    const H = window.innerHeight;

    // Use half resolution for performance on large screens
    const scaleFactor = W > 1920 ? 0.5 : W > 1440 ? 0.6 : 0.75;
    const renderW = Math.floor(W * scaleFactor);
    const renderH = Math.floor(H * scaleFactor);

    baseCanvas.width = renderW;
    baseCanvas.height = renderH;
    postCanvas.width = renderW;
    postCanvas.height = renderH;

    const lensStrength = 0.03;
    const lensRadius = 180 * scaleFactor;

    // Initialize mouse to center
    mouseRef.current = {
      x: renderW / 2,
      y: renderH / 2,
      rx: 0.5,
      ry: 0.5,
    };

    function renderAurora(now: number, width: number, height: number) {
      const imageData = baseCtx!.createImageData(width, height);
      const data = imageData.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const nx = x / width;
          const ny = y / height;

          const flowX = nx * 0.3 + now * 0.05;
          const flowY = ny * 0.3 + now * 0.03;

          const aurora = noise.fbm(flowX, flowY, 4);
          const aurora2 = noise.fbm(flowX + 1.5, flowY + 1.3, 4);
          const auroraBlend = (aurora + aurora2 * 0.5) / 1.5;
          const auroraVal = (auroraBlend + 1) * 0.5;

          let gradientT = ny + auroraVal * 0.3;
          gradientT = Math.max(0, Math.min(1, gradientT));

          const baseColor = getColor(palette, gradientT);

          const plasmaX = nx * 2.0 + now * 0.1;
          const plasmaY = ny * 2.0 - now * 0.07;
          const plasma = noise.fbm(plasmaX, plasmaY, 3);
          const plasmaT = (plasma + 1) * 0.5;
          const plasmaColor = getColor(plasmaPalette, plasmaT);

          let finalR = baseColor.r * 0.7 + plasmaColor.r * 0.3;
          let finalG = baseColor.g * 0.7 + plasmaColor.g * 0.3;
          let finalB = baseColor.b * 0.7 + plasmaColor.b * 0.3;

          const gamma = 0.9;
          finalR = Math.pow(finalR / 255, gamma) * 255;
          finalG = Math.pow(finalG / 255, gamma) * 255;
          finalB = Math.pow(finalB / 255, gamma) * 255;

          const idx = (y * width + x) * 4;
          data[idx] = Math.max(0, Math.min(255, finalR)) | 0;
          data[idx + 1] = Math.max(0, Math.min(255, finalG)) | 0;
          data[idx + 2] = Math.max(0, Math.min(255, finalB)) | 0;
          data[idx + 3] = 255;
        }
      }

      baseCtx!.putImageData(imageData, 0, 0);
    }

    function renderLens(width: number, height: number, mouse: { x: number; y: number }) {
      const sourceData = baseCtx!.getImageData(0, 0, width, height);
      const source = sourceData.data;
      const output = postCtx!.createImageData(width, height);
      const outData = output.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const idx = (y * width + x) * 4;

          if (dist < lensRadius && dist > 0) {
            const lensDist = lensStrength * Math.pow(Math.sin((1 - dist / lensRadius) * Math.PI / 2), 2);
            const sourceX = Math.max(0, Math.min(width - 1, x - dx / dist * lensRadius * lensDist));
            const sourceY = Math.max(0, Math.min(height - 1, y - dy / dist * lensRadius * lensDist));
            const srcIdx = (Math.floor(sourceY) * width + Math.floor(sourceX)) * 4;
            outData[idx] = source[srcIdx];
            outData[idx + 1] = source[srcIdx + 1];
            outData[idx + 2] = source[srcIdx + 2];
            outData[idx + 3] = source[srcIdx + 3];
          } else {
            outData[idx] = source[idx];
            outData[idx + 1] = source[idx + 1];
            outData[idx + 2] = source[idx + 2];
            outData[idx + 3] = source[idx + 3];
          }
        }
      }

      postCtx!.putImageData(output, 0, 0);
    }

    let frameCount = 0;
    function animate(timestamp: number) {
      if (lastTime === 0) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      // Skip frames if running slow
      if (delta > 33) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      time += delta * 0.0005;

      // Render aurora every frame, lens every other frame for performance
      renderAurora(time, renderW, renderH);
      frameCount++;
      if (frameCount % 2 === 0) {
        renderLens(renderW, renderH, mouseRef.current);
      } else if (baseCanvas && postCtx) {
        postCtx.drawImage(baseCanvas, 0, 0);
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = {
        x: (e.clientX / W) * renderW,
        y: (e.clientY / H) * renderH,
        rx: e.clientX / W,
        ry: e.clientY / H,
      };
    }

    function handleMouseLeave() {
      mouseRef.current = {
        x: renderW / 2,
        y: renderH / 2,
        rx: 0.5,
        ry: 0.5,
      };
    }

    function handleResize() {
      if (!baseCanvas || !postCanvas) return;
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      const newScale = newW > 1920 ? 0.5 : newW > 1440 ? 0.6 : 0.75;
      const newRenderW = Math.floor(newW * newScale);
      const newRenderH = Math.floor(newH * newScale);

      baseCanvas.width = newRenderW;
      baseCanvas.height = newRenderH;
      postCanvas.width = newRenderW;
      postCanvas.height = newRenderH;
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={baseCanvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          imageRendering: 'pixelated',
        }}
      />
      <canvas
        ref={postCanvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          imageRendering: 'pixelated',
        }}
      />
    </>
  );
}
