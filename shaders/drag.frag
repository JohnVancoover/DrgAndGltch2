precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;
uniform sampler2D uSampler;

uniform float time;
uniform vec2 resolution;

uniform vec2 brushPosition;
uniform vec2 brushDrag;
uniform float brushStrength;
uniform float brushRadius;
uniform float brushInverse;
uniform float brushSoftness;

void main (void)
{
	vec2 uv = vTextureCoord;
	vec2 pixelUnit = 1. / resolution;
	vec2 center = uv - brushPosition / resolution;
	float radius = brushRadius / resolution.y;
	float dist = smoothstep(0.0, radius, length(center));
	dist = mix(1.0 - dist, dist, brushInverse);
	dist = mix(step(0.01, dist), dist, brushSoftness);

	uv = uv - brushDrag * dist * pixelUnit * brushStrength;
	uv = mod(abs(uv + 1.0), 1.0);

	vec4 color = texture2D(uSampler, uv);

	gl_FragColor = color;
}