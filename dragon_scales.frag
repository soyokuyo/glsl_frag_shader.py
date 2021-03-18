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

    float t;
    float d;
    if ((d = distance(vec2(0., 0.), st)) < 1.){
        t = abs(sin(d*3.15*PI));
   }
    else{
        t = abs(sin(distance(vec2(1., st.y), vec2(st.x, 1.))*3.15*PI));
    }
    vec3 c = vec3(1., 0., 0.);
    if (t > 0.5){
        c = vec3(0., 0., 0.);
    }
    gl_FragColor = vec4(c ,1.);
}

