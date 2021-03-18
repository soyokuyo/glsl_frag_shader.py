#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float lengthN(vec2 v, float n){
  vec2 tmp = pow(abs(v), vec2(n));
  return pow(tmp.x+tmp.y, 1.0/n);
}

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
    if(index == 1.){
        st.x = 1.-st.x;
    }
    if(index == 2.){
        st.y = 1.-st.y;
    }
    if(index == 3.){
        st.x = 1.-st.x;
        st.y = 1.-st.y;
    }
    st *= 0.5;

    // c is color vector (r, g, b)
    // white is (1., 1., 1.) and black is (0., 0., 0.)
    vec3 c = vec3(1., 0., 0.);
    if (   (lengthN(st, .7) > 1.0 && lengthN(st, .7) < 1.2)
        || (lengthN(st-.5, .7) > 1.0 && lengthN(st-.5, .7) < 1.2)){
       c = vec3(1., 1., 0.);
    }
    gl_FragColor = vec4(c ,1.);
}

