import GUI from "lil-gui"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import holographicVertexShader from './shaders/holographic/vertex.glsl'
import holographicFragmentShader from "./shaders/holographic/fragment.glsl"






// Debug
const gui=new GUI()
// gui.hide()
let onOff=true
window.addEventListener("keydown",(e)=>{
    if(e.key ==="h" || e.key==="H"){
        onOff=!onOff
        gui.show(onOff)
    }
})

// Scene
const scene = new THREE.Scene()

// Size
const sizes={
    width:window.innerWidth,
    height:window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(25,sizes.width/sizes.height,0.1,100)

camera.position.set(7,7,7)
scene.add(camera)



//  Renderer
const renderer=new THREE.WebGLRenderer({
    antialias:true
})
document.body.appendChild(renderer.domElement)
renderer.setSize(sizes.width,sizes.height)
renderer.setClearColor('#1d1f2a')
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

// Controls
const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping=true


// Update
window.addEventListener("resize",()=>{
    // Update sizes
    sizes.width=window.innerWidth
    sizes.height=window.innerHeight

    // Update camera 
    camera.aspect=sizes.width/sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width,sizes.height)
    renderer.render(scene,camera)  
})
 
// Loaders
const gltfLoader = new GLTFLoader()

//#region  Material
const materialParameters={}
materialParameters.color="#70c1ff"

gui
    .addColor(materialParameters,"color")
    .onChange(()=>{
        material.uniforms.uColor.value.set(materialParameters.color)
    })




const material = new THREE.ShaderMaterial({
    vertexShader:holographicVertexShader,
    fragmentShader:holographicFragmentShader,
    uniforms:{
        uTime: new THREE.Uniform(0),
        uColor: new THREE.Uniform(new THREE.Color(materialParameters.color))
    },
    transparent:true,
    side:THREE.DoubleSide,
    depthWrite:false,
    blending:THREE.AdditiveBlending
})

//#endregion

//#region Mesh

let suzanne = null
gltfLoader.load(
    './resources/suzanne.glb',
    (gltf) =>
    {
        suzanne = gltf.scene
        suzanne.traverse((child) =>
        {
            if(child.isMesh)
                child.material = material
        })
        scene.add(suzanne)
    }
)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(),
    material
)

scene.add(sphere)
sphere.position.x=-3

const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32),
    material
)

scene.add(torusKnot)
torusKnot.position.x=3
//#endregion


// Animate

const clock = new THREE.Clock()

function animate(){

    const elapsedTime = clock.getElapsedTime()

    // Update material
    material.uniforms.uTime.value = elapsedTime

    
    if(suzanne){ // make sure the 3D object is loaded
        suzanne.rotation.x=-elapsedTime * 0.1
        suzanne.rotation.y= elapsedTime * 0.2
    } 
    sphere.rotation.y=-elapsedTime * 0.1
    sphere.rotation.x=elapsedTime * 0.2

    torusKnot.rotation.y=-elapsedTime * 0.1
    torusKnot.rotation.x=elapsedTime * 0.2

    // Update controls
    controls.update()
    
    // Render
    renderer.render(scene,camera)
}

renderer.setAnimationLoop(animate)



