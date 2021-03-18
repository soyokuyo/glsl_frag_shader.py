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

    // index
    // 0.:BL 1.:BR 2.:TL 3.:TR  
    if(index == 0.0){
        st.x = st.x-1.0;
        st.y = st.y-1.0;
    }
    if(index == 1.0){
        st.y = st.y-1.0;
    }
    if(index == 2.0){
        st.x = st.x-1.0;
    }

    st *= 1.3;
    st.y += 0.3;
    vec3 temp = vec3(1., .25, .25);
    float d1 = pow(st.x, 2.)+pow(st.y-sqrt(abs(st.x)), 2.);
    if (d1 > 1.0){
       temp = vec3(1., 1., .5);
    }
    gl_FragColor = vec4(temp ,1.);
}

