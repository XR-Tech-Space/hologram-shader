varying vec3 vPosition;

void main(){

    // Stripes
    float stripes = vPosition.y;
    stripes = mod(vPosition.y*15.0,1.0);
    stripes = pow(stripes,3.0); //延缓数值陡升，让条纹渐变更明显 （0-1）

    // Final color
    gl_FragColor = vec4(stripes,stripes,stripes,1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>

}