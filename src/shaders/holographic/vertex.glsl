varying vec3  vPosition;
varying vec3 vNormal;

void main()
{
   

    // Position
     vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Final position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Model normal
    vec4 modelNormal = modelMatrix * vec4(normal,0.0); // (x,y,z,0)表示方向向量
    

    // Varyings
    vPosition = modelPosition.xyz;
    vNormal=modelNormal.xyz;
    
}