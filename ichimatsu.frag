#ifdef GL_ES
precision mediump float;
#endif

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

    // c is color vector (r, g, b)
    // white is (1., 1., 1.) and black is (0., 0., 0.)
    vec3 c = vec3(1., .75, .12); // r, g, b 

    // index
    // 0.:BL 1.:BR 2.:TL 3.:TR  
    if(index == 1. || index == 2.){
       c = vec3(1., .9, 0.);
    }

    gl_FragColor = vec4(c ,1.);
}

