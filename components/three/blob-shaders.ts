export const blobVertexShader = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
uniform float uFrequency;
uniform float uAmplitude;

varying vec2 vMatcapUv;
varying vec2 vBlobUv;
varying vec3 vEyeVector;
varying vec3 vWorldNormal;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(
    permute(
      permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) +
      i.y + vec4(0.0, i1.y, i2.y, 1.0)
    ) +
    i.x + vec4(0.0, i1.x, i2.x, 1.0)
  );
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(
    vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3))
  );
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(
    0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)),
    0.0
  );
  m *= m;
  return 42.0 * dot(
    m * m,
    vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3))
  );
}

vec3 orthogonal(vec3 value) {
  return normalize(
    abs(value.x) > abs(value.z)
      ? vec3(-value.y, value.x, 0.0)
      : vec3(0.0, -value.z, value.y)
  );
}

vec3 distorted(vec3 point) {
  float noise = snoise(
    point * uFrequency + vec3(uTime * uSpeed, uTime * uSpeed * 0.7, 0.0)
  );
  return point * (1.0 + noise * 0.05 * uAmplitude);
}

void main() {
  vec3 displaced = distorted(position);
  vec3 tangent1 = orthogonal(normal);
  vec3 tangent2 = normalize(cross(normal, tangent1));
  vec3 displaced1 = distorted(position + tangent1 * 0.005);
  vec3 displaced2 = distorted(position + tangent2 * 0.005);
  vec3 displacedNormal = normalize(
    cross(displaced1 - displaced, displaced2 - displaced)
  );

  vec4 basePosition = vec4(position, 1.0);
  vec3 viewPosition = normalize(vec3(modelViewMatrix * basePosition));
  vec3 viewNormal = normalize(normalMatrix * displacedNormal);
  vec3 reflection = reflect(viewPosition, viewNormal);
  float matcapScale = 2.0 * sqrt(
    reflection.x * reflection.x +
    reflection.y * reflection.y +
    (reflection.z + 1.0) * (reflection.z + 1.0)
  );
  vMatcapUv = reflection.xy / matcapScale + 0.5;
  vBlobUv = displaced.xy / 6.0 + 0.5;

  vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
  vEyeVector = normalize(worldPosition.xyz - cameraPosition);
  vWorldNormal = normalize(mat3(modelMatrix) * displacedNormal);

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

export const blobFragmentShader = /* glsl */ `
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uTextureSize;
uniform vec3 uReflectionColor;
uniform float uIor;
uniform float uLightFactor;

varying vec2 vMatcapUv;
varying vec2 vBlobUv;
varying vec3 vEyeVector;
varying vec3 vWorldNormal;

vec2 coverUv(vec2 uv) {
  float canvasAspect = uResolution.x / max(uResolution.y, 1.0);
  float textureAspect = uTextureSize.x / max(uTextureSize.y, 1.0);
  vec2 scale = canvasAspect > textureAspect
    ? vec2(1.0, textureAspect / canvasAspect)
    : vec2(canvasAspect / textureAspect, 1.0);
  return (uv - 0.5) * scale + 0.5;
}

float fresnel(vec3 eyeVector, vec3 worldNormal) {
  return pow(1.0 + dot(eyeVector, worldNormal), 3.0);
}

void main() {
  vec3 normal = normalize(vWorldNormal);
  vec3 refracted = refract(normalize(vEyeVector), normal, 1.0 / uIor);
  vec2 textureUv = clamp(vBlobUv + refracted.xy * 0.08, 0.0, 1.0);
  vec4 imageColor = texture2D(uTexture, textureUv);
  float logoMask = smoothstep(
    0.12,
    0.34,
    length(imageColor.rgb - vec3(0.96))
  );

  float edge = clamp(fresnel(normalize(vEyeVector), normal), 0.0, 1.0);
  float matcapLight = smoothstep(0.05, 0.95, vMatcapUv.y) * 0.34 + 0.72;
  vec3 refractedColor = imageColor.rgb * matcapLight;
  vec3 glassColor = mix(refractedColor, uReflectionColor, edge * 0.62);
  vec3 logoColor = imageColor.rgb * (0.9 + matcapLight * 0.1);
  vec3 color = mix(glassColor, logoColor, logoMask * 0.94);
  color *= uLightFactor;

  gl_FragColor = vec4(color, 0.98);
}
`;
