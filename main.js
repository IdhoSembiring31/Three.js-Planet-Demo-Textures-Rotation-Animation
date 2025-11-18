import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {Pane} from 'tweakpane';


const scene = new THREE.Scene();


//install pane
const pane = new Pane();
// add objects to the scene
// const triangleGeometry = new THREE.BufferGeometry();
// const vertices = new Float32Array([0, 0,0, 0,2,0,2,0,0]);
// triangleGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
// const cubeGeometry = new THREE.BoxGeometry(1,1,1,10,10,0)

// const  geometry= new THREE.SphereGeometry(1,50,50)
const  torusGeometry= new THREE.TorusKnotGeometry(1,0.3,200,100,2,5)
// const GeoPlane = new THREE.PlaneGeometry(1,1)
const geometry = new THREE.BoxGeometry(1,1,1);

// const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red",transparent:true,opacity:0.5,side:THREE.DoubleSide });
// cubeMaterial.transparent = true;
// cubeMaterial.opacity = 0.5
//cubeMaterial.color = new THREE.Color("blue")
// cubeMaterial.side = THREE.DoubleSide;

const cubeMaterial = new THREE.MeshBasicMaterial()
const cubeMaterial2 = new THREE.MeshLambertMaterial();
const cubeMaterial1 = new THREE.MeshPhongMaterial();
// pane.addBinding(cubeMaterial1, 'shininess' ,{
//   min:0,
//   max:1000,
//   step:1
// })

// const cubeMaterial4 = new THREE.MeshStandardMaterial()//ini hany untu rough dan metel ,di bawahnya saya langsung mau ubah ke pyhsical
const cubeMaterial4 = new THREE.MeshPhysicalMaterial()
pane.addBinding(cubeMaterial4, "roughness",{
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






const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);
const cubeMesh2 = new THREE.Mesh(torusGeometry, cubeMaterial2);
const cubeMesh3 = new THREE.Mesh(torusGeometry, cubeMaterial1);
const cubeMesh4 = new THREE.Mesh(torusGeometry, cubeMaterial4);


cubeMesh2.position.x = 3
cubeMesh3.position.x = 7
cubeMesh4.position.x = -3
// const Plane = new THREE.Mesh(GeoPlane,cubeMaterial);
// Plane.position.x = -7


scene.add(cubeMesh);
scene.add(cubeMesh2)
scene.add(cubeMesh3)
scene.add(cubeMesh4);
// scene.add(Plane)
// scene.background = new THREE.Color(0xffffff)
// scene.fog = new THREE.Fog(0xffffff,1,10);



const light = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(light)
const poinlight = new THREE.PointLight(0xffffff, 100);
poinlight.position.set(5,5,5);
scene.add(poinlight)
// initialize the camera
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// const aspectRatio = window.innerWidth / window.innerHeight;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   200
// );

camera.position.z = 8;

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

// render the scene
const renderloop = () => {
  controls.update();  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};
renderloop();
