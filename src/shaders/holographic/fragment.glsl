varying vec3 vPosition;
uniform float uTime;
varying vec3 vNormal;
uniform vec3 uColor;

void main(){

    // Stripes
    float stripes = vPosition.y;
    stripes = mod((vPosition.y-uTime*0.03)*20.0,1.0);
    // -uTime 条纹产生上移效果，反之下移
    stripes = pow(stripes,2.0); //延缓数值陡升，让条纹渐变更明显 （0-1）


    // Fresnel
    vec3 viewDirection = normalize(vPosition-cameraPosition); 
    //V=normalize(eyePosition−fragmentPosition)

    vec3 normal=normalize(vNormal);
    if(!gl_FrontFacing){
        normal*=-1.0;
    }
    float fresnel = dot(viewDirection,normal)+1.0;
    //判断角度 垂直=0，钝角>0,锐角<0

    fresnel = pow(fresnel,2.0);


    // Falloff   边缘虚化
    float falloff = smoothstep(0.8,0.0,fresnel);

    // Holographic
    float holographic = stripes * fresnel;
    holographic += fresnel * 1.25;
    holographic *= falloff;

    // Final color
    gl_FragColor = vec4(uColor,holographic);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>

}