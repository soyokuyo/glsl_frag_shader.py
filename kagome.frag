#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float cross(vec2 v1, vec2 v2) {
    return v1.x*v2.y - v1.y*v2.x;
}

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st.x *= 10.;
    st.y *= 6.;
    st = fract(st);
    st *= 2.;
    float index = 0.;
    index += step(1., mod(st.x,2.));
    index += step(1., mod(st.y,2.))*2.;
    st = fract(st);
    st -= 0.5;

    // index
    // 0.:BL 1.:BR 2.:TL 3.:TR  
    if(index == 1. || index == 2.){
        st.x = -st.x;
    }

    float l1=abs(cross(st,normalize(vec2(1.,1.))));
    float l2=length(vec2(0., st.y));

    // c is color vector (r, g, b)
    // white is (1., 1., 1.) and black is (0., 0., 0.)
    vec3 c = vec3(1., .25, .25);
    if (l1 < .12 || l2 < .07){
       c = vec3(1., 1., .5);
    }
    gl_FragColor = vec4(c ,1.);
}

