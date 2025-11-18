/* import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {Pane} from 'tweakpane';


const textureLoader = new THREE.TextureLoader()

const scene = new THREE.Scene();
scene.background = new THREE.Color("grey")
const pane = new Pane();

const spherGeometry = new THREE.SphereGeometry(1,50,50)
const  torusGeometry= new THREE.TorusKnotGeometry(1,0.3,200,100,2,5)
const GeoPlane = new THREE.PlaneGeometry(1,1)
const geometry = new THREE.BoxGeometry(1,1,1);
const cylinderGeometry = new THREE.CylinderGeometry(0.5,0.5,1,32)


// const textureTest = textureLoader.load("/textures/leafy-grass2-bl/leafy-grass2-bl/leafy-grass2-albedo.png");
const grassTexture = textureLoader.load(
  "/textures/leafy-grass2-bl/leafy-grass2-bl/leafy-grass2-albedo.png",
  () => console.log("Texture Loaded"),
  undefined,
  (err) => console.log("Failed Loading Texture!", err)
);

grassTexture.repeat.set(100,100)
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
//repeat saja itu seperti buat gambar dari x ke z kemudian di ualngi dari x ke z,,sedangkan mirror itu dari xke zkemudian dari z ke x
grassTexture.wrapS = THREE.MirroredRepeatWrapping
grassTexture.wrapT = THREE.MirroredRepeatWrapping;

const cubeMaterial = new THREE.MeshBasicMaterial()
const cubeMaterial2 = new THREE.MeshLambertMaterial();
const cubeMaterial3 = new THREE.MeshPhongMaterial(); //{side:THREE.DoubleSide} ku offkan kerna tidak lagi di butuhkan
const cubeMaterial4 = new THREE.MeshPhysicalMaterial()
// cubeMaterial.map = textureTest;
// cubeMaterial4.map = textureTest;
// cubeMaterial2.map = textureTest;
cubeMaterial3.map = grassTexture;
cubeMaterial.color = new THREE.Color("yellow")


pane.addBinding(cubeMaterial4 ,"roughness",{
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




const group = new THREE.Group();

const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);
const cubeMesh2 = new THREE.Mesh(torusGeometry, cubeMaterial2);
const cubeMesh3 = new THREE.Mesh(GeoPlane, cubeMaterial3);
cubeMesh3.rotation.x = -(Math.PI * 0.5);
cubeMesh3.position.x = 2.5
cubeMesh3.scale.set(100,100);

const cubeMesh4 = new THREE.Mesh(cylinderGeometry, cubeMaterial4);
const cubeMesh5 = new THREE.Mesh(spherGeometry, cubeMaterial4)


// cubeMesh2.position.x = 2.5
// cubeMesh4.position.x = -2.5
// cubeMesh5.position.y= -2.5




// group.add(cubeMesh,cubeMesh2,cubeMesh3,cubeMesh4,cubeMesh5);  //karena ingin coba repeat di plan
group.add(cubeMesh3)
scene.add(group)


const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light)
const poinlight = new THREE.PointLight(0xffffff, 50)
poinlight.position.set(5,5,5);
scene.add(poinlight)
// initialize the camera
const camera = new THREE.PerspectiveCamera(100,window.innerWidth / window.innerHeight,0.01,1000);



camera.position.z = 8;
camera.position.y = 10

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = true;
renderer.outputColorSpace = THREE.SRGBColorSpace;

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener('resize', () =>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight);
})

// const time = new THREE.Clock();
// let previous = 0
// render the scene
const renderloop = () => {
    // const currentTime = time.getElapsedTime();
    // const delta = currentTime - previous;
    // previous = currentTime;

//     scene.children.forEach((child)=>{  //kalau gini jika jumlah child sebanyak ratusan maka akan berantakan kerna kita tidak akan tau yang mana yang akan kita kerjakan maka buat dalam (group)\selected
//         if(child instanceof THREE.Mesh){
//             child.rotation.y += 0.01
//         }
//     });

  // group.children.forEach((child)=>{  //off kan kerna lagi tidak perlu
  //       if(child instanceof THREE.Mesh){
  //           child.rotation.y += 0.01
  //       }
  //   });
    controls.update();  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};
renderloop();
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {Pane} from "tweakpane";

const pane = new Pane();

const textureLoader = new THREE.TextureLoader()

const scene = new THREE.Scene();
scene.background = new THREE.Color('grey');
scene.fog = new THREE.FogExp2('grey', 0.002)


const camera = new THREE.PerspectiveCamera(70, window.innerWidth/ window.innerHeight, 0.01, 1000) 
camera.position.z = 10;
camera.position.y= 8;

const greenLand = textureLoader.load("/textures/spaceship-panels-bl/spaceship-panels-bl/spaceship-panels1-roughness.png")
greenLand.repeat.set(100,100)
greenLand.wrapS = THREE.RepeatWrapping;
greenLand.wrapT = THREE.RepeatWrapping;

pane.addBinding(greenLand,'offset',{
  x:{
    min:-1,
    max:1,
    step:0.001
  },
  y:{
    min:-1,
    max:1,
    step:0.001
  }

}

)

const go0 = new THREE.PlaneGeometry(1,1);
const ma0 = new THREE.MeshPhysicalMaterial({flatShading:true,color:'silver'});

ma0.map = greenLand;




const mesh = new THREE.Mesh(go0,ma0);
mesh.rotation.x = -(Math.PI * 0.5)
mesh.scale.set(100,100);
scene.add(mesh);

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light)
const poinlight = new THREE.PointLight(0xffffff, 50)
poinlight.position.set(5,5,5);
scene.add(poinlight)

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () =>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight);
})

const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true
controls.dampingFactor = 0.5;

function rendererLoop(){
  controls.update();
  renderer.render(scene,camera)
  window.requestAnimationFrame(rendererLoop)
}
rendererLoop()
