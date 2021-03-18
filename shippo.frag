#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st *= 5.;
    st = fract(st);
    st *= 2.;
    float index = 0.;
    index += step(1., mod(st.x,2.));
    index += step(1., mod(st.y,2.))*2.;
    st = fract(st);

    // index
    // 0.:BL 1.:BR 2.:TL 3.:TR  
    if(index == 1. || index == 2.){
        st.x = 1.-st.x;
    }

    // c is color vector (r, g, b)
    // white is (1., 1., 1.) and black is (0., 0., 0.)
    vec3 c = vec3(1., 0., 0.);
    float d;
    if ((distance(vec2(0., 0.), st)) < 1. && (distance(vec2(1., 1.), st)) < 1.){
       c = vec3(1., 1., 0.);
    }
    gl_FragColor = vec4(c ,1.);
}

