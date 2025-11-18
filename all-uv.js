import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {Pane} from 'tweakpane';


const textureLoader = new THREE.TextureLoader()

const scene = new THREE.Scene();
scene.background = new THREE.Color("grey")
const pane = new Pane();

const Geometry1 = new THREE.SphereGeometry(1,50,50);
const uv2_Geometry1= new THREE.BufferAttribute(Geometry1.attributes.uv.array, 2);
Geometry1.setAttribute('uv2', uv2_Geometry1)




const badlandsNormal = textureLoader.load("/textures/badlands-boulders-bl/badlands-boulders-bl/badlands-boulders_normal-ogl.png")
const badlandsAO = textureLoader.load("/textures/badlands-boulders-bl/badlands-boulders-bl/badlands-boulders_ao.png")
const badlandsHeight = textureLoader.load("/textures/badlands-boulders-bl/badlands-boulders-bl/badlands-boulders_height.png")
const badlandsMetallic = textureLoader.load("/textures/badlands-boulders-bl/badlands-boulders-bl/badlands-boulders_metallic.png")
const badlandsAlbedo = textureLoader.load("/textures/badlands-boulders-bl/badlands-boulders-bl/badlands-boulders_albedo.png")
const badlandsRoughness = textureLoader.load("/textures/badlands-boulders-bl/badlands-boulders-bl/badlands-boulders_roughness.png")

const metalNormal = textureLoader.load("/textures/spaceship-panels-bl/spaceship-panels-bl/spaceship-panels1-normal-ogl.png")
const metalAo = textureLoader.load("/textures/spaceship-panels-bl/spaceship-panels-bl/spaceship-panels1-ao.png")
const metalHeight = textureLoader.load("/textures/spaceship-panels-bl/spaceship-panels-bl/spaceship-panels1-height.png")
const metalMetallic =textureLoader.load("/textures/spaceship-panels-bl/spaceship-panels-bl/spaceship-panels1-metallic.png")
const metalAlbedo = textureLoader.load("/textures/spaceship-panels-bl/spaceship-panels-bl/spaceship-panels1-albedo.png")
const metalRoughness =  textureLoader.load("/textures/spaceship-panels-bl/spaceship-panels-bl/spaceship-panels1-roughness.png")

const grassNormal = textureLoader.load("/textures/leafy-grass2-bl/leafy-grass2-bl/leafy-grass2-normal-ogl.png");
const grassAO = textureLoader.load("/textures/leafy-grass2-bl/leafy-grass2-bl/leafy-grass2-ao.png");
const grassHeight = textureLoader.load("/textures/leafy-grass2-bl/leafy-grass2-bl/leafy-grass2-height.png");
const grassMetallic = textureLoader.load("/textures/leafy-grass2-bl/leafy-grass2-bl/leafy-grass2-metallic.png");
const grassAlbedo = textureLoader.load("/textures/leafy-grass2-bl/leafy-grass2-bl/leafy-grass2-albedo.png");
const grassRoughness = textureLoader.load("/textures/leafy-grass2-bl/leafy-grass2-bl/leafy-grass2-roughness.png")

const grassPane = pane.addFolder({
    title:'Grass Material',
    expanded:true
})


const grassMaterial = new THREE.MeshStandardMaterial()
grassMaterial.map = grassAlbedo;
grassMaterial.roughnessMap = grassRoughness;
grassMaterial.metalnessMap = grassMetallic;
grassMaterial.normalMap = grassNormal;
grassMaterial.displacementMap = grassHeight;
grassMaterial.aoMap = grassAO;

grassPane.addBinding(grassMaterial, "metalness", {min:0,max:1,step:0.01});
grassPane.addBinding(grassMaterial, "roughness", {min:0,max:1,step:0.01});
grassPane.addBinding(grassMaterial, "displacementScale", {min:0,max:1,step:0.01});
grassPane.addBinding(grassMaterial, "aoMapIntensity", {min:0,max:1,step:0.01});


const metalPane = pane.addFolder({
    title:'Metal Material',
    expanded:true
})



const metalMaterial = new THREE.MeshStandardMaterial();
metalMaterial.map = metalAlbedo;
metalMaterial.roughnessMap = metalRoughness;
metalMaterial.metalnessMap = metalMetallic;
metalMaterial.normalMap = metalNormal;
metalMaterial.displacementMap = metalHeight;
metalMaterial.aoMap = metalAo;

metalPane.addBinding(metalMaterial, "metalness", {min:0,max:1,step:0.01});
metalPane.addBinding(metalMaterial, "roughness", {min:0,max:1,step:0.01});
metalPane.addBinding(metalMaterial, "displacementScale", {min:0,max:1,step:0.01});
metalPane.addBinding(metalMaterial, "aoMapIntensity", {min:0,max:1,step:0.01});

const badlandsPane = pane.addFolder({
    title:'badlands Material',
    expanded:true
})



const badlandsMaterial = new THREE.MeshStandardMaterial();
badlandsMaterial.map = badlandsAlbedo;
badlandsMaterial.roughnessMap = badlandsRoughness;
badlandsMaterial.metalnessMap = badlandsMetallic;
badlandsMaterial.normalMap = grassNormal;
badlandsMaterial.displacementMap = badlandsHeight;
badlandsMaterial.aoMap = badlandsAO;

badlandsPane.addBinding(badlandsMaterial, "metalness", {min:0,max:1,step:0.01});
badlandsPane.addBinding(badlandsMaterial, "roughness", {min:0,max:1,step:0.01});
badlandsPane.addBinding(badlandsMaterial, "displacementScale", {min:0,max:1,step:0.01});
badlandsPane.addBinding(badlandsMaterial, "aoMapIntensity", {min:0,max:1,step:0.01});


const group = new THREE.Group();

const cubeMesh = new THREE.Mesh(Geometry1, grassMaterial);
const cubeMesh2 = new THREE.Mesh(Geometry1, metalMaterial);
const cubeMesh3 = new THREE.Mesh(Geometry1, badlandsMaterial);

cubeMesh.position.x = 0
cubeMesh2.position.x = 6.5
cubeMesh3.position.x = -6.5




group.add(cubeMesh,cubeMesh2,cubeMesh3);  

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
 /*  group.children.forEach((child)=>{  
        if(child instanceof THREE.Mesh){
            child.rotation.y += 0.01
        }
    }); */
    group.rotation.y += 0.01
    controls.update();  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};
renderloop();
