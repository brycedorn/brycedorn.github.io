const LIGHT_COLORS = ["#dc241f", "#0019a8", "#f2b800", "#007229", "#6950a1"];
const DARK_COLORS = ["#ff5f57", "#6a98ff", "#ffd426", "#3ddc84", "#a58cf0"];

type Loop = { x: Float32Array; y: Float32Array };
type Line = { loop: Loop; letter: number; stops: number[]; trains: number };

/** Marching squares at 0.5 over a w*h coverage grid (red channel). Returns closed outlines in grid coordinates. */
const traceOutlines = (rgba: Uint8ClampedArray, w: number, h: number): [number, number][][] => {
  const at = (x: number, y: number) => rgba[(y * w + x) * 4] / 255;
  const hEdge = (x: number, y: number) => (y * w + x) * 2;
  const vEdge = (x: number, y: number) => (y * w + x) * 2 + 1;
  const points = new Map<number, [number, number]>();
  const links = new Map<number, number[]>();

  const hPoint = (x: number, y: number) => {
    const a = at(x, y);
    const b = at(x + 1, y);
    const id = hEdge(x, y);
    if (!points.has(id)) points.set(id, [x + 0.5 + (0.5 - a) / (b - a), y + 0.5]);
    return id;
  };
  const vPoint = (x: number, y: number) => {
    const a = at(x, y);
    const b = at(x, y + 1);
    const id = vEdge(x, y);
    if (!points.has(id)) points.set(id, [x + 0.5, y + 0.5 + (0.5 - a) / (b - a)]);
    return id;
  };
  const join = (a: number, b: number) => {
    links.set(a, [...(links.get(a) ?? []), b]);
    links.set(b, [...(links.get(b) ?? []), a]);
  };

  for (let y = 0; y < h - 1; y++) {
    for (let x = 0; x < w - 1; x++) {
      const tl = at(x, y) >= 0.5;
      const tr = at(x + 1, y) >= 0.5;
      const br = at(x + 1, y + 1) >= 0.5;
      const bl = at(x, y + 1) >= 0.5;
      const code = (tl ? 1 : 0) | (tr ? 2 : 0) | (br ? 4 : 0) | (bl ? 8 : 0);
      if (code === 0 || code === 15) continue;
      const T = () => hPoint(x, y);
      const B = () => hPoint(x, y + 1);
      const L = () => vPoint(x, y);
      const R = () => vPoint(x + 1, y);
      const centerIn = (at(x, y) + at(x + 1, y) + at(x + 1, y + 1) + at(x, y + 1)) / 4 >= 0.5;
      switch (code) {
        case 1: case 14: join(L(), T()); break;
        case 2: case 13: join(T(), R()); break;
        case 3: case 12: join(L(), R()); break;
        case 4: case 11: join(R(), B()); break;
        case 6: case 9: join(T(), B()); break;
        case 7: case 8: join(L(), B()); break;
        case 5:
          if (centerIn) { join(T(), R()); join(L(), B()); }
          else { join(L(), T()); join(R(), B()); }
          break;
        case 10:
          if (centerIn) { join(L(), T()); join(R(), B()); }
          else { join(T(), R()); join(L(), B()); }
          break;
      }
    }
  }

  const visited = new Set<number>();
  const loops: [number, number][][] = [];
  for (const start of links.keys()) {
    if (visited.has(start)) continue;
    const loop: [number, number][] = [];
    let current: number | undefined = start;
    while (current !== undefined && !visited.has(current)) {
      visited.add(current);
      const point = points.get(current);
      if (point) loop.push(point);
      current = links.get(current)?.find((next) => !visited.has(next));
    }
    loops.push(loop);
  }
  return loops;
};

/** Evenly spaced points (`step` apart) around a closed outline. */
const resample = (outline: [number, number][], step: number): Loop | null => {
  const n = outline.length;
  const cumulative = [0];
  for (let i = 0; i < n; i++) {
    const [ax, ay] = outline[i];
    const [bx, by] = outline[(i + 1) % n];
    cumulative.push(cumulative[i] + Math.hypot(bx - ax, by - ay));
  }
  const total = cumulative[n];
  const count = Math.round(total / step);
  if (count < 12) return null;
  const x = new Float32Array(count);
  const y = new Float32Array(count);
  let seg = 0;
  for (let i = 0; i < count; i++) {
    const s = (i / count) * total;
    while (cumulative[seg + 1] < s) seg++;
    const [ax, ay] = outline[seg];
    const [bx, by] = outline[(seg + 1) % n];
    const t = (s - cumulative[seg]) / (cumulative[seg + 1] - cumulative[seg] || 1);
    x[i] = ax + (bx - ax) * t;
    y[i] = ay + (by - ay) * t;
  }
  return { x, y };
};

const nearestPair = (a: Loop, b: Loop): [number, number] => {
  let best = Infinity;
  let pair: [number, number] = [0, 0];
  for (let i = 0; i < a.x.length; i++) {
    for (let j = 0; j < b.x.length; j++) {
      const d = (a.x[i] - b.x[j]) ** 2 + (a.y[i] - b.y[j]) ** 2;
      if (d < best) {
        best = d;
        pair = [i, j];
      }
    }
  }
  return pair;
};

const arcPoints = (loop: Loop, from: number, count: number): [number, number][] => {
  const n = loop.x.length;
  return Array.from({ length: count }, (_, k) => [loop.x[(from + k) % n], loop.y[(from + k) % n]]);
};

const toTrack = (points: [number, number][]): Loop => ({
  x: Float32Array.from(points, (p) => p[0]),
  y: Float32Array.from(points, (p) => p[1]),
});

/** Where a letter's gaps open: the outline point indices to cut at. Each cut splits off another track. */
type Cut = (loop: Loop, em: number) => number[];

/** The outline point farthest in direction (dx, dy). */
const farthest =
  (dx: number, dy: number): Cut =>
  (loop) => {
    let far = 0;
    for (let i = 1; i < loop.x.length; i++) {
      if (loop.x[i] * dx + loop.y[i] * dy > loop.x[far] * dx + loop.y[far] * dy) far = i;
    }
    return [far];
  };

/** The left edge of the stem, part way down. */
const stemLeft: Cut = (loop, em) => {
  const top = Math.min(...loop.y);
  const y = top + (Math.max(...loop.y) - top) * 0.6;
  const near = Array.from(loop.y, (_, i) => i).filter((i) => Math.abs(loop.y[i] - y) < em * 0.02);
  return [near.reduce((best, i) => (loop.x[i] < loop.x[best] ? i : best), near[0])];
};

/** Rounds corners in points[from..to] by repeatedly averaging each point with its neighbors. */
const smoothRange = (points: [number, number][], from: number, to: number, passes: number) => {
  const lo = Math.max(1, from);
  const hi = Math.min(points.length - 2, to);
  for (let pass = 0; pass < passes; pass++) {
    const before = points.map(([x, y]): [number, number] => [x, y]);
    for (let i = lo; i <= hi; i++) {
      points[i] = [
        (before[i - 1][0] + 2 * before[i][0] + before[i + 1][0]) / 4,
        (before[i - 1][1] + 2 * before[i][1] + before[i + 1][1]) / 4,
      ];
    }
  }
};

/** Opens a letter's closed outlines into tracks with end points. A counter joins the outer outline by a short bridge, so one track runs counter, bridge, outer, with a gap between its two ends. */
const buildTracks = (loops: Loop[], step: number, em: number, smoothJoin: boolean, cut: Cut): Loop[] => {
  const [outer, hole, ...extra] = [...loops].sort((a, b) => b.x.length - a.x.length);
  if (!outer) return [];
  const gapFor = (loop: Loop) => Math.max(2, Math.min(Math.round((0.12 * em) / step), Math.floor(loop.x.length / 3)));
  const openAt = (loop: Loop) => {
    const gap = gapFor(loop);
    const cuts = cut(loop, em).sort((a, b) => a - b);
    return cuts.map((at, k) => {
      const start = at + Math.ceil(gap / 2);
      const next = k + 1 < cuts.length ? cuts[k + 1] : cuts[0] + loop.x.length;
      return toTrack(arcPoints(loop, start, next - Math.floor(gap / 2) - start));
    });
  };

  const tracks: Loop[] = [];
  if (!hole) {
    tracks.push(...openAt(outer));
  } else {
    const [i, j] = nearestPair(hole, outer);
    const holePoints = arcPoints(hole, i + gapFor(hole), hole.x.length - gapFor(hole) + 1);
    const outerPoints = arcPoints(outer, j, outer.x.length - gapFor(outer) + 1);
    const [fx, fy] = holePoints[holePoints.length - 1];
    const [tx, ty] = outerPoints[0];
    const pieces = Math.max(1, Math.round(Math.hypot(tx - fx, ty - fy) / step));
    const bridge: [number, number][] = [];
    for (let k = 1; k < pieces; k++) bridge.push([fx + ((tx - fx) * k) / pieces, fy + ((ty - fy) * k) / pieces]);
    const joined = [...holePoints, ...bridge, ...outerPoints];
    const spread = Math.round((0.2 * em) / step);
    if (smoothJoin) {
      smoothRange(joined, 1, holePoints.length, 40);
      smoothRange(joined, holePoints.length - spread, holePoints.length + bridge.length + spread, 40);
    }
    tracks.push(toTrack(joined));
  }
  for (const loop of extra) tracks.push(...openAt(loop));
  return tracks;
};

/** Station indices along an open track: both ends, sharp corners, then fill long gaps so trains always have a short hop. */
const pickStops = (loop: Loop, step: number, em: number, corners: boolean): number[] => {
  const n = loop.x.length;
  const reach = Math.max(2, Math.round((0.1 * em) / step));
  const turn = new Float32Array(n);
  for (let i = reach; i < n - reach; i++) {
    const ax = loop.x[i] - loop.x[i - reach];
    const ay = loop.y[i] - loop.y[i - reach];
    const bx = loop.x[i + reach] - loop.x[i];
    const by = loop.y[i + reach] - loop.y[i];
    const cos = (ax * bx + ay * by) / (Math.hypot(ax, ay) * Math.hypot(bx, by) || 1);
    turn[i] = Math.acos(Math.max(-1, Math.min(1, cos)));
  }
  const ranked: number[] = [];
  for (let i = reach; i < n - reach; i++) {
    let peak = turn[i] > 0.8;
    for (let k = -reach; peak && k <= reach; k++) if (turn[i + k] > turn[i]) peak = false;
    if (peak && corners) ranked.push(i);
  }
  ranked.sort((a, b) => turn[b] - turn[a]);

  const minGap = Math.round((0.22 * em) / step);
  const maxGap = Math.round((0.5 * em) / step);
  const stops = [0, n - 1];
  for (const i of ranked) {
    if (stops.every((s) => Math.abs(i - s) >= minGap)) stops.push(i);
  }
  stops.sort((a, b) => a - b);

  const filled: number[] = [];
  for (let k = 0; k + 1 < stops.length; k++) {
    const from = stops[k];
    const to = stops[k + 1];
    filled.push(from);
    const pieces = Math.ceil((to - from) / maxGap);
    for (let p = 1; p < pieces; p++) filled.push(Math.round(from + ((to - from) * p) / pieces));
  }
  filled.push(stops[stops.length - 1]);
  return filled;
};

const ease = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeOutBack = (t: number) => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2;

// Intro: each letter's line draws itself on, stops pop in as it passes, then the train arrives.
const DRAW_DELAY = 0.12;
const DRAW_TIME = 0.8;
const TRAIN_FADE = 0.4;

/** Seconds a train waits after leg `leg`, varied per line and leg, and longer at a terminal. */
const dwellAt = (line: number, leg: number, terminal: boolean) => {
  const noise = Math.sin((line + 1) * 12.9898 + (leg + 1) * 78.233) * 43758.5453;
  return (terminal ? 1.2 : 0.15) + 2 * (noise - Math.floor(noise));
};

/** Draws `heading`'s letters as tube lines with stops and trains. Returns a disposer, or null without 2D canvas. */
export const startSubwayName = (
  canvas: HTMLCanvasElement,
  hero: HTMLElement,
  heading: HTMLElement,
): (() => void) | null => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  let width = 1;
  let height = 1;
  let em = 80;
  let step = 2;
  let lines: Line[] = [];
  let ink = "#17181a";
  let palette = LIGHT_COLORS;
  let frame = 0;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const readColors = () => {
    const root = getComputedStyle(document.documentElement);
    ink = root.getPropertyValue("--text").trim() || ink;
    palette = darkQuery.matches ? DARK_COLORS : LIGHT_COLORS;
  };

  // Stops from different letters that nearly touch are dropped, so no station sits where outlines overlap.
  const dropOverlaps = () => {
    const reach = em * 0.09;
    const all = lines.flatMap((line, l) => line.stops.map((index) => ({ l, index, x: line.loop.x[index], y: line.loop.y[index] })));
    const overlapping = all.filter((a) => all.some((b) => b.l !== a.l && Math.hypot(b.x - a.x, b.y - a.y) < reach));
    for (const [l, line] of lines.entries()) {
      const last = line.loop.x.length - 1;
      const kept = line.stops.filter((index) => index === 0 || index === last || !overlapping.some((o) => o.l === l && o.index === index));
      if (kept.length >= 2) line.stops = kept;
    }
  };

  const build = () => {
    const box = hero.getBoundingClientRect();
    const head = heading.getBoundingClientRect();
    const style = getComputedStyle(heading);
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    // Glyph ink can overhang the heading box (the b's left serif), so the canvas extends past the hero.
    const margin = Math.round(parseFloat(style.fontSize) * 0.3);
    canvas.style.inset = `${-margin}px`;
    canvas.style.width = `${box.width + 2 * margin}px`;
    canvas.style.height = `${box.height + 2 * margin}px`;
    width = Math.max(1, Math.round((box.width + 2 * margin) * scale));
    height = Math.max(1, Math.round((box.height + 2 * margin) * scale));
    canvas.width = width;
    canvas.height = height;

    em = parseFloat(style.fontSize) * scale;
    step = Math.max(1.5, em * 0.012);
    const font = `${style.fontWeight} ${em}px ${style.fontFamily}`;
    const spacing = (parseFloat(style.letterSpacing) || 0) * scale;
    const text = (heading.textContent ?? "").trim();

    const measure = document.createElement("canvas").getContext("2d");
    if (!measure) return;
    measure.font = font;
    const whole = measure.measureText(text);
    const baseline =
      (head.top - box.top + margin + head.height / 2) * scale +
      (whole.actualBoundingBoxAscent - whole.actualBoundingBoxDescent) / 2;

    lines = [];
    let x = (head.left - box.left + margin) * scale;
    let letter = 0;
    for (const char of text) {
      const m = measure.measureText(char);
      const advance = m.width + spacing;
      const pad = 3;
      const x0 = Math.floor(x - m.actualBoundingBoxLeft) - pad;
      const y0 = Math.floor(baseline - m.actualBoundingBoxAscent) - pad;
      const w = Math.ceil(m.actualBoundingBoxLeft + m.actualBoundingBoxRight) + pad * 2 + 1;
      const h = Math.ceil(m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) + pad * 2 + 1;
      const glyphX = x;
      x += advance;
      if (w <= pad * 2 + 1 || h <= pad * 2 + 1) continue;

      const mask = document.createElement("canvas");
      mask.width = w;
      mask.height = h;
      const mctx = mask.getContext("2d", { willReadFrequently: true });
      if (!mctx) continue;
      mctx.fillStyle = "#000";
      mctx.fillRect(0, 0, w, h);
      mctx.fillStyle = "#fff";
      mctx.font = font;
      mctx.textBaseline = "alphabetic";
      mctx.fillText(char, glyphX - x0, baseline - y0);

      const loops = traceOutlines(mctx.getImageData(0, 0, w, h).data, w, h)
        .map((outline) => resample(outline.map(([px, py]): [number, number] => [px + x0, py + y0]), step))
        .filter((loop): loop is Loop => loop !== null);
      for (const loop of buildTracks(loops, step, em, char === "e", char === "c" ? farthest(-1, 0) : char === "r" ? stemLeft : farthest(1, 0))) {
        lines.push({ loop, letter, stops: pickStops(loop, step, em, !"cey".includes(char)), trains: 1 });
      }
      letter++;
    }
    dropOverlaps();
  };

  // Past either end the track continues straight, so a train can sit on a terminal.
  const pointAt = (loop: Loop, f: number): [number, number] => {
    const a = Math.max(0, Math.min(loop.x.length - 2, Math.floor(f)));
    const t = f - a;
    return [loop.x[a] + (loop.x[a + 1] - loop.x[a]) * t, loop.y[a] + (loop.y[a + 1] - loop.y[a]) * t];
  };

  const trace = (loop: Loop, from: number, to: number, samples: number) => {
    for (let i = 0; i <= samples; i++) {
      const [px, py] = pointAt(loop, from + ((to - from) * i) / samples);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
  };

  // At a terminal the nose stops at the far edge of the station circle instead of running past it.
  const stationHead = (loop: Loop, stop: number) => {
    const reach = (em * 0.08) / step - (em * 0.03) / step;
    return Math.max(reach, Math.min(loop.x.length - 1 - reach, stop));
  };

  // A train is the track stroked wide, which bends smoothly around corners. Each end gets a small rounded-corner tab on top of the stroke.
  const drawTrain = (loop: Loop, head: number) => {
    const half = (em * 0.08) / step;
    const radius = em * 0.01;
    const tab = (radius * 3) / step;
    const from = head - half;
    const to = head + half;
    const bodyFrom = from + tab / 2;
    const bodyTo = to - tab / 2;
    ctx.beginPath();
    ctx.moveTo(...pointAt(loop, bodyFrom));
    for (let i = Math.floor(bodyFrom) + 1; i < bodyTo; i++) ctx.lineTo(...pointAt(loop, i));
    ctx.lineTo(...pointAt(loop, bodyTo));
    ctx.strokeStyle = ink;
    ctx.fillStyle = ink;
    ctx.lineWidth = em * 0.05;
    ctx.lineCap = "butt";
    ctx.lineJoin = "round";
    ctx.stroke();
    for (const [end, inward] of [[from, tab], [to, -tab]]) {
      const [x, y] = pointAt(loop, end);
      const [ix, iy] = pointAt(loop, end + inward);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.atan2(iy - y, ix - x));
      ctx.beginPath();
      ctx.roundRect(0, (-em * 0.05) / 2, tab * step, em * 0.05, [radius, 0, 0, radius]);
      ctx.fill();
      ctx.restore();
    }
  };

  const draw = (age: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    const colorOf = (line: Line) => palette[line.letter % palette.length];

    const progressOf = (line: Line) => easeOut(clamp01((age - line.letter * DRAW_DELAY) / DRAW_TIME));

    for (const line of lines) {
      const reached = (line.loop.x.length - 1) * progressOf(line);
      if (reached <= 0) continue;
      ctx.beginPath();
      trace(line.loop, 0, reached, Math.max(1, Math.ceil(reached)));
      ctx.strokeStyle = colorOf(line);
      ctx.lineWidth = em * 0.028;
      ctx.stroke();
    }

    const popLength = (em * 0.1) / step;
    for (const line of lines) {
      // Runs popLength past the line's end so the last stop gets its full pop.
      const reached = (line.loop.x.length - 1 + popLength) * progressOf(line);
      ctx.fillStyle = colorOf(line);
      for (const stop of line.stops) {
        const pop = clamp01((reached - stop) / popLength);
        if (pop <= 0) continue;
        ctx.beginPath();
        ctx.arc(line.loop.x[stop], line.loop.y[stop], em * 0.03 * easeOutBack(pop), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const travel = 1.2;
    lines.forEach((line, index) => {
      const stops = line.stops;
      // Trains run stop to stop, then turn around at the end of the track.
      const legs = 2 * (stops.length - 1);
      const arrived = clamp01((age - line.letter * DRAW_DELAY - DRAW_TIME) / TRAIN_FADE);
      if (arrived <= 0) return;
      ctx.globalAlpha = arrived;
      for (let k = 0; k < line.trains; k++) {
        // The clock starts when the train arrives, so it is already leaving a stop as it fades in.
        const clock = Number.isFinite(age) ? age - line.letter * DRAW_DELAY - DRAW_TIME : 0;
        const dwells = Array.from({ length: legs }, (_, i) => dwellAt(index, i, i === stops.length - 2 || i === legs - 1));
        const period = dwells.reduce((sum, d) => sum + travel + d, 0);
        let local = (((clock + (k * period) / line.trains) % period) + period) % period;
        let passed = 0;
        while (local >= travel + dwells[(passed + index) % legs]) local -= travel + dwells[(passed++ + index) % legs];
        const leg = (passed + index) % legs;
        const forward = leg < stops.length - 1;
        const from = stops[forward ? leg : legs - leg];
        const to = stops[forward ? leg + 1 : legs - leg - 1];
        const start = stationHead(line.loop, from);
        drawTrain(line.loop, start + (stationHead(line.loop, to) - start) * ease(Math.min(local / travel, 1)));
      }
      ctx.globalAlpha = 1;
    });
  };

  const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let born = -1;
  const loop = (now: number) => {
    frame = requestAnimationFrame(loop);
    if (born < 0) born = now / 1000;
    draw(now / 1000 - born);
  };
  const redrawStatic = () => {
    readColors();
    if (!animate) draw(Infinity);
  };
  const rebuild = () => {
    readColors();
    build();
    if (!animate) draw(Infinity);
  };

  const observer = new ResizeObserver(rebuild);
  observer.observe(hero);
  darkQuery.addEventListener("change", redrawStatic);
  rebuild();
  if (animate) frame = requestAnimationFrame(loop);

  return () => {
    observer.disconnect();
    darkQuery.removeEventListener("change", redrawStatic);
    cancelAnimationFrame(frame);
  };
};
