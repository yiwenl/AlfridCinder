module.exports = `
#version 150 core

in vec4 ciPosition;
in vec3 ciNormal;
in vec2 ciTexCoord0;

uniform mat3 ciNormalMatrix;
uniform mat4 ciModelViewProjection;

out vec4	vPosition;
out vec3	vNormal;
out vec2	vTexCoord0;

void main() {

    gl_Position		= ciModelViewProjection * ciPosition;
	vNormal			= normalize( ciNormalMatrix * ciNormal );
    vTexCoord0 		= ciTexCoord0;

}
`