const VERTEX = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

// Height-field scene: flat ground at z=0, the word cut into it down to z=-depth.
// Primary rays are perspective, so the pit walls are visible; one point light
// (the mouse) lights the floor and walls with soft shadows cast by the rim.
const FRAGMENT = `#version 300 es
precision highp float;

uniform sampler2D u_mask;
uniform vec2 u_res;
uniform float u_scale;
uniform float u_depth;
uniform vec3 u_light;
uniform vec3 u_bg;
uniform vec3 u_rock;
uniform float u_ambient;
out vec4 outColor;

float mask(vec2 p, float lod) {
  return textureLod(u_mask, p / u_res, lod).r;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float hash3(vec3 p) {
  return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(
      mix(hash3(i), hash3(i + vec3(1.0, 0.0, 0.0)), f.x),
      mix(hash3(i + vec3(0.0, 1.0, 0.0)), hash3(i + vec3(1.0, 1.0, 0.0)), f.x),
      f.y
    ),
    mix(
      mix(hash3(i + vec3(0.0, 0.0, 1.0)), hash3(i + vec3(1.0, 0.0, 1.0)), f.x),
      mix(hash3(i + vec3(0.0, 1.0, 1.0)), hash3(i + vec3(1.0, 1.0, 1.0)), f.x),
      f.y
    ),
    f.z
  );
}

float fbm(vec3 p) {
  float a = 0.5;
  float s = 0.0;
  for (int i = 0; i < 4; i++) {
    s += a * vnoise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return s;
}

float surfaceZ(vec2 p) {
  return -u_depth * smoothstep(0.3, 0.7, mask(p, 1.0));
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
  float edge = mask(p, 0.0);
  if (edge < 0.2) {
    outColor = vec4(u_bg, 1.0);
    return;
  }

  vec2 cam = u_res * 0.5;
  float camHeight = u_res.x * 1.3;
  vec2 dir = (p - cam) / camHeight;

  const int STEPS = 40;
  float sPrev = 0.0;
  float sHit = u_depth;
  bool wall = false;
  for (int i = 1; i <= STEPS; i++) {
    float s = u_depth * float(i) / float(STEPS);
    if (mask(p + dir * s, 0.0) < 0.5) {
      float lo = sPrev;
      float hi = s;
      for (int j = 0; j < 6; j++) {
        float mid = 0.5 * (lo + hi);
        if (mask(p + dir * mid, 0.0) < 0.5) hi = mid; else lo = mid;
      }
      sHit = hi;
      wall = true;
      break;
    }
    sPrev = s;
  }

  vec2 xy = p + dir * sHit;
  vec3 pos = vec3(xy, -sHit);

  vec3 n = vec3(0.0, 0.0, 1.0);
  if (wall) {
    float h = 2.0 * u_scale;
    vec2 g = vec2(
      mask(xy + vec2(h, 0.0), 1.0) - mask(xy - vec2(h, 0.0), 1.0),
      mask(xy + vec2(0.0, h), 1.0) - mask(xy - vec2(0.0, h), 1.0)
    );
    if (length(g) > 1e-4) n = vec3(normalize(g), 0.0);
  }

  vec3 q = pos / (6.0 * u_scale);
  float e = 0.35;
  vec3 bump = vec3(
    fbm(q + vec3(e, 0.0, 0.0)) - fbm(q - vec3(e, 0.0, 0.0)),
    fbm(q + vec3(0.0, e, 0.0)) - fbm(q - vec3(0.0, e, 0.0)),
    fbm(q + vec3(0.0, 0.0, e)) - fbm(q - vec3(0.0, 0.0, e))
  );
  vec3 nb = normalize(n + bump * 1.6);

  vec3 start = pos + n * 2.0 * u_scale;
  vec3 toLight = u_light - start;
  float dist = length(toLight);
  vec3 l = toLight / dist;

  float shadow = 1.0;
  const int SHADOW_STEPS = 28;
  for (int i = 1; i <= SHADOW_STEPS; i++) {
    float t = dist * float(i) / float(SHADOW_STEPS + 1);
    vec3 s = start + l * t;
    float clear = s.z - surfaceZ(s.xy);
    shadow = min(shadow, clamp(7.0 * clear / t, 0.0, 1.0));
  }
  shadow = smoothstep(0.0, 1.0, shadow);

  float diffuse = max(dot(nb, l), 0.0);
  float falloff = 1.0 / (1.0 + pow(dist / (u_depth * 5.0), 2.0));

  float open = mask(xy, 4.5);
  float depthFrac = sHit / u_depth;
  float ao = 1.0 - 0.6 * depthFrac * (1.0 - 0.5 * open);

  float grain = 0.8 + 0.4 * fbm(pos / (14.0 * u_scale)) + 0.12 * (hash(floor(xy / u_scale)) - 0.5);
  vec3 albedo = u_rock * grain;

  vec3 ambient = u_ambient * ao * vec3(0.85, 0.9, 1.0);
  vec3 direct = vec3(1.0, 0.93, 0.82) * 3.2 * diffuse * falloff * shadow;
  vec3 color = albedo * (ambient + direct);
  color = 1.0 - exp(-1.5 * color);
  color = pow(color, vec3(1.0 / 2.2));
  color += (hash(gl_FragCoord.xy) - 0.5) / 255.0;

  outColor = vec4(mix(u_bg, color, smoothstep(0.2, 0.5, edge)), 1.0);
}`;

const hexToRgb = (value: string): [number, number, number] => {
  const n = parseInt(value.trim().replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const toLinear = (c: [number, number, number]): [number, number, number] => [
  c[0] ** 2.2,
  c[1] ** 2.2,
  c[2] ** 2.2,
];

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
};

/** Draws `heading`'s text as a pit cut into the page. Returns a disposer, or null without WebGL2. */
export const startEtchedName = (
  canvas: HTMLCanvasElement,
  hero: HTMLElement,
  heading: HTMLElement,
): (() => void) | null => {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    powerPreference: "low-power",
  });
  if (!gl) return null;

  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const u = {
    res: uniform("u_res"),
    scale: uniform("u_scale"),
    depth: uniform("u_depth"),
    light: uniform("u_light"),
    bg: uniform("u_bg"),
    rock: uniform("u_rock"),
    ambient: uniform("u_ambient"),
  };

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  let width = 1;
  let height = 1;
  let scale = 1;
  let depth = 40;
  let light: [number, number] | null = null;
  let frame = 0;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const buildMask = () => {
    const box = hero.getBoundingClientRect();
    const head = heading.getBoundingClientRect();
    const style = getComputedStyle(heading);

    scale = Math.min(window.devicePixelRatio || 1, 2);
    const maxPixels = 2.5e6;
    if (box.width * box.height * scale * scale > maxPixels) {
      scale = Math.sqrt(maxPixels / (box.width * box.height));
    }
    width = Math.max(1, Math.round(box.width * scale));
    height = Math.max(1, Math.round(box.height * scale));
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);

    const flat = document.createElement("canvas");
    flat.width = width;
    flat.height = height;
    const ctx = flat.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#fff";

    const fontSize = parseFloat(style.fontSize) * scale;
    ctx.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
    ctx.textBaseline = "alphabetic";
    const spacing = (parseFloat(style.letterSpacing) || 0) * scale;
    const text = (heading.textContent ?? "").trim();
    const metrics = ctx.measureText(text);
    const baseline =
      (head.top - box.top + head.height / 2) * scale +
      (metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2;
    let x = (head.left - box.left) * scale;
    for (const char of text) {
      ctx.fillText(char, x, baseline);
      x += ctx.measureText(char).width + spacing;
    }

    depth = fontSize * 0.26;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, flat);
    gl.generateMipmap(gl.TEXTURE_2D);
  };

  const draw = () => {
    frame = 0;
    const root = getComputedStyle(document.documentElement);
    const bg = hexToRgb(root.getPropertyValue("--background"));
    const text = hexToRgb(root.getPropertyValue("--text"));
    const mix = (i: number) => bg[i] + (text[i] - bg[i]) * 0.4;
    const rock = toLinear([mix(0), mix(1), mix(2)]);
    const lx = light ? light[0] * scale : width * 0.15;
    const ly = light ? light[1] * scale : height * 0.2;

    gl.uniform2f(u.res, width, height);
    gl.uniform1f(u.scale, scale);
    gl.uniform1f(u.depth, depth);
    gl.uniform3f(u.light, lx, ly, depth * 2.2);
    gl.uniform3f(u.bg, bg[0], bg[1], bg[2]);
    gl.uniform3f(u.rock, rock[0], rock[1], rock[2]);
    gl.uniform1f(u.ambient, darkQuery.matches ? 0.16 : 0.32);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(draw);
  };

  const onPointer = (event: PointerEvent) => {
    const box = hero.getBoundingClientRect();
    light = [event.clientX - box.left, event.clientY - box.top];
    schedule();
  };
  const rebuild = () => {
    buildMask();
    schedule();
  };

  const observer = new ResizeObserver(rebuild);
  observer.observe(hero);
  window.addEventListener("pointermove", onPointer);
  darkQuery.addEventListener("change", schedule);
  rebuild();

  return () => {
    observer.disconnect();
    window.removeEventListener("pointermove", onPointer);
    darkQuery.removeEventListener("change", schedule);
    cancelAnimationFrame(frame);
  };
};
