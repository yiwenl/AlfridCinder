// copy.frag

in vec2	vTexCoord0;

out vec4 fragColor;

void main()
{
	fragColor = vec4(vTexCoord0, 0.0, 1.0);
}
