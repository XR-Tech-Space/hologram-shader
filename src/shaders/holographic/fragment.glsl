varying vec3 vPosition;
uniform float uTime;

void main(){

    // Stripes
    float stripes = vPosition.y;
    stripes = mod((vPosition.y-uTime*0.02)*10.0,1.0);
    // -uTime 条纹产生上移效果，反之下移
    stripes = pow(stripes,3.0); //延缓数值陡升，让条纹渐变更明显 （0-1）

    // Final color
    gl_FragColor = vec4(stripes,stripes,stripes,1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>

}