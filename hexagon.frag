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
//    if(index == 0.0){
//        st.x = st.x-1.0;
//        st.y = st.y-1.0;
//    }
//    if(index == 1.0){
//        st.y = st.y-1.0;
//    }
//    if(index == 2.0){
//        st.x = st.x-1.0;
//    }
    st = (st -0.5) * 2.0;
//    vec3 col = vec3(0);
    vec2 p = abs(st);
    float d = dot(p, normalize(vec2(1.0, 1.73205080756887729353)));
    d = max(d, p.x);
    vec3 col = vec3(0.4, 0.4, 0.4);
    if (d < 0.6){
        float l = (sqrt(1.-min(pow(length(st*3.), 2.),1.))+1.0)/2.;
        col = vec3(l, l, l);
    }
    gl_FragColor = vec4(col ,1.);
}

