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
    st -= 0.5;
    st *= 2.0;
    // index
    // 0.:BL 1.:BR 2.:TL 3.:TR  
    if(index == 1.0 || index == 2.0){
//    if(index == 1.0){
//        st.x = -st.x;
//        st.y = -st.y;
    }
//    if(index == 1.0){
//        st.y = st.y-1.0;
//    }
//    if(index == 2.0){
//        st.x = st.x-1.0;
//    }

//    st *= 1.3;
//    st.y += 0.3;
    vec3 temp = vec3(0., 0., 0.);
    float a = 20.0;
    float b = 38.8;
//    float b = 40.0;
    float c = 20.0;


    float d1 = a*pow(st.x-1., 2.)-b*(st.x-1.)*(st.y-1.)+c*pow(st.y-1., 2.);
    float d2 = a*pow(st.x+1., 2.)-b*(st.x+1.)*(st.y+1.)+c*pow(st.y+1., 2.);
    float d3 = a*pow(st.x-1., 2.)-b*(st.x-1.)*(st.y+1.)+c*pow(st.y+1., 2.);
    float d4 = a*pow(st.x+1., 2.)-b*(st.x+1.)*(st.y-1.)+c*pow(st.y-1., 2.);

    float d5 = a*pow(st.x, 2.)+b*st.x*st.y+c*pow(st.y, 2.);
    float d6 = a*pow(st.x-1., 2.)+b*(st.x-1.)*(st.y-1.)+c*pow(st.y-1., 2.);
    float d7 = a*pow(st.x+1., 2.)+b*(st.x+1.)*(st.y+1.)+c*pow(st.y+1., 2.);

    if (d1 < 1.0){
       c = 1.0 - sqrt(d1);
       temp = vec3(c, c, c);
    }
    else if (d2 < 1.0){
       c = 1.0 - sqrt(d2);
       temp = vec3(c, c, c);
    }
    else if (d3 < 1.0){
       c = 1.0 - sqrt(d3);
       temp = vec3(c, c, c);
    }
    else if (d4 < 1.0){
       c = 1.0 - sqrt(d4);
       temp = vec3(c, c, c);
    }
    else if (d5 < 1.0){
       c = 1.0 - sqrt(d5);
       temp = vec3(c, c, c);
    }
    else if (d6 < 1.0){
       c = 1.0 - sqrt(d6);
       temp = vec3(c, c, c);
    }
    else if (d7 < 1.0){
       c = 1.0 - sqrt(d7);
       temp = vec3(c, c, c);
    }

    gl_FragColor = vec4(temp ,1.);
}

