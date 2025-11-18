import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {Pane} from 'tweakpane';


const textureLoader = new THREE.TextureLoader()

const scene = new THREE.Scene();
scene.background = new THREE.Color("grey")
const pane = new Pane();

const spherGeometry = new THREE.SphereGeometry(1,50,50);
const uv2spherGeometry= new THREE.BufferAttribute(spherGeometry.attributes.uv.array, 2);
spherGeometry.setAttribute('uv2', uv2spherGeometry)

const  torusGeometry= new THREE.TorusKnotGeometry(1,0.3,200,100,2,5)
const uv2torusGeometry = new THREE.BufferAttribute(torusGeometry.attributes.uv.array, 2);
torusGeometry.setAttribute('uv2', uv2torusGeometry)

const GeoPlane = new THREE.PlaneGeometry(1,1,200,200)
const uv2GeoPlane = new THREE.BufferAttribute(GeoPlane.attributes.uv.array, 2);
GeoPlane.setAttribute('uv2', uv2GeoPlane)

const geometry = new THREE.BoxGeometry(1,1,1,10,10,10);
const uv2geometry = new THREE.BufferAttribute(geometry.attributes.uv.array, 2);
geometry.setAttribute('uv2', uv2geometry)

const cylinderGeometry = new THREE.CylinderGeometry(0.5,0.5,1,32)
const uv2cylinderGeometry = new THREE.BufferAttribute(cylinderGeometry.attributes.uv.array, 2);
cylinderGeometry.setAttribute('uv2', uv2cylinderGeometry)



// const textureTest = textureLoader.load("/textures/leafy-grass2-bl/leafy-grass2-bl/leafy-grass2-albedo.png");
/* const grassTexture = textureLoader.load(
  "/textures/leafy-grass2-bl/leafy-grass2-bl/leafy-grass2-albedo.png",
  () => console.log("Texture Loaded"),
  undefined,
  (err) => console.log("Failed Loading Texture!", err)
); */
const grassNormal = textureLoader.load("/textures/leafy-grass2-bl/leafy-grass2-bl/leafy-grass2-normal-ogl.png");
const grassAO = textureLoader.load("/textures/leafy-grass2-bl/leafy-grass2-bl/leafy-grass2-ao.png");
const grassHeight = textureLoader.load("/textures/leafy-grass2-bl/leafy-grass2-bl/leafy-grass2-height.png");
const grassMetallic = textureLoader.load("/textures/leafy-grass2-bl/leafy-grass2-bl/leafy-grass2-metallic.pn  g");
const grassAlbedo = textureLoader.load("/textures/leafy-grass2-bl/leafy-grass2-bl/leafy-grass2-albedo.png");
const grassRoughness = textureLoader.load("/textures/leafy-grass2-bl/leafy-grass2-bl/leafy-grass2-roughness.png")

// grassTexture.repeat.set(100,100)
// grassTexture.wrapS = THREE.RepeatWrapping;
// grassTexture.wrapT = THREE.RepeatWrapping;
//repeat saja itu seperti buat gambar dari x ke z kemudian di ualngi dari x ke z,,sedangkan mirror itu dari xke zkemudian dari z ke x
// grassTexture.wrapS = THREE.MirroredRepeatWrapping
// grassTexture.wrapT = THREE.MirroredRepeatWrapping;

const cubeMaterial = new THREE.MeshStandardMaterial()
const cubeMaterial2 = new THREE.MeshLambertMaterial();
const cubeMaterial3 = new THREE.MeshPhongMaterial(); //{side:THREE.DoubleSide} ku offkan kerna tidak lagi di butuhkan
const cubeMaterial4 = new THREE.MeshPhysicalMaterial()
cubeMaterial4.map = grassAlbedo;
cubeMaterial4.roughnessMap = grassRoughness;
cubeMaterial4.roughness = 0.1

// cubeMaterial.metalnessMap = grassMetallic;
cubeMaterial4.metalness = 0.2

cubeMaterial4.normalMap = grassNormal;
cubeMaterial4.normalScale.set(5,5)

cubeMaterial4.displacementMap = grassHeight;
cubeMaterial4.displacementScale = 0.1

cubeMaterial4.aoMap = grassAO;
pane.addBinding(cubeMaterial4, "aoMapIntensity",{min:0, max:1, step:0.01})
// cubeMaterial4.map = grassTexture;
// cubeMaterial2.map = grassTexture;
// cubeMaterial3.map = grassTexture;



/* pane.addBinding(cubeMaterial4 ,"roughness",{
  min:0,
  max:1,
  step:0.01
})

pane.addBinding(cubeMaterial4, "metalness",{
  min:0,
  max:1,
  step:0.01
})
pane.addBinding(cubeMaterial4, "reflectivity",{
  min:0,
  max:1,
  step:0.01
})


pane.addBinding(cubeMaterial4, "clearcoat",{
  min:0,
  max:1,
  step:0.01
})
 */



const group = new THREE.Group();

const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);
const cubeMesh2 = new THREE.Mesh(torusGeometry, cubeMaterial2);
const cubeMesh3 = new THREE.Mesh(GeoPlane, cubeMaterial);
const cubeMesh4 = new THREE.Mesh(cylinderGeometry, cubeMaterial4);
const cubeMesh5 = new THREE.Mesh(spherGeometry, cubeMaterial4)

cubeMesh.position.x = 0
cubeMesh2.position.x = 2.5
cubeMesh3.position.y = 2.5
cubeMesh4.position.x = -2.5
cubeMesh5.position.y= -2.5




group.add(cubeMesh,cubeMesh2,cubeMesh3,cubeMesh4,cubeMesh5);  
group.scale.setScalar(2);
scene.add(group)


const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light)
const poinlight = new THREE.PointLight(0xffffff, 50)
poinlight.position.set(5,5,5);
scene.add(poinlight)
// initialize the camera
const camera = new THREE.PerspectiveCamera(100,window.innerWidth / window.innerHeight,0.01,1000);



camera.position.z = 5;
camera.position.y = 5

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


window.addEventListener('resize', () =>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight);
})


const renderloop = () => {
  group.children.forEach((child)=>{  
        if(child instanceof THREE.Mesh){
            child.rotation.y += 0.01
        }
    });
    controls.update();  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};
renderloop();
