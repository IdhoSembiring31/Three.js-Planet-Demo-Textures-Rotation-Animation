import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";



const scene = new THREE.Scene();



//add textureLoader
const textureLoader = new THREE.TextureLoader();

const cubeTextureLoader = new THREE.CubeTextureLoader()
cubeTextureLoader.setPath("/cube/")
//load texture

/* const earthTexture = textureLoader.load("/8k_sun.jpg",
  ()=>{
  console.log("success")},
  undefined,
  (err)=> {console.log("failed",THREE.err)
}
);  */
const sunTexture = textureLoader.load("/8k_sun.jpg");
const earthTexture = textureLoader.load("/8k_earth_daymap.jpg");
const marsTexture = textureLoader.load("/8k_mars.jpg");
const moonTexture = textureLoader.load("/8k_moon.jpg");
const venusTexture = textureLoader.load("/8k_venus_surface.jpg");
const mercuryTexture = textureLoader.load("/8k_mercury.jpg");
const phobosTexture = textureLoader.load("/phobos_texture_map_by_askaniy_dcyuzcx-pre.jpg");
const DeimosTexture = textureLoader.load("/phobos_and_deimos_textures_by_planetmapmaker_djov1j9-250t-2x.png");
const backgroundCubemap = cubeTextureLoader.load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);
scene.background =backgroundCubemap
// add all here
const  sphereGeometry= new THREE.SphereGeometry(1,50,50)

//add materials
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map:mercuryTexture
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map:venusTexture
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map:earthTexture
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map:marsTexture
});
const moonMaterial = new THREE.MeshStandardMaterial({
  map:moonTexture
});
const phobosMaterial = new THREE.MeshStandardMaterial({
  map:phobosTexture
});
const DeimosMaterial = new THREE.MeshStandardMaterial({
  map:DeimosTexture
});


//add stuff here
const sunMaterial = new THREE.MeshBasicMaterial({
    map:sunTexture
})

const sun = new THREE.Mesh(sphereGeometry,sunMaterial);
sun.scale.setScalar(6);
scene.add(sun)

const planets = [
{
  name:'Mercury',
  radius:0.5,
  distance:10,
  speed:0.01,
  material:mercuryMaterial,
  moons:[],
},
{
  name:'Venus',
  radius:0.8,
  distance:15,
  speed:0.007,
  material:venusMaterial,
  moons:[],
},
{
  name:'Earth',
  radius:1,
  distance:20,
  speed:0.005,
  material:earthMaterial,
  moons:[
    {
    name:'Moon',
    material:moonMaterial,
    radius: 0.3,
    distance:3,
    speed:0.015,
  }]
},
{
  name:'Mars',
  radius:0.7,
  distance:25,
  speed:0.003,
  material:marsMaterial,
  moons:[
    {
      name:"phobos",
      radius:0.1,
      speed:0.02,
      distance:2,
      material:phobosMaterial
    },
    {
      name:"Deimos",
      radius:0.2,
      speed:0.015,
      distance:3,
      color:0xfffffff,
      material:DeimosMaterial
    }
  ],
},
]

const createPlanet = (planet)=>{
   const planetMesh = new THREE.Mesh(
    sphereGeometry,
    planet.material
  )
  planetMesh.scale.setScalar(planet.radius)
  planetMesh.position.x = planet.distance
  return planetMesh
}
const createMoon = (moon)=>{
    const moonMesh = new THREE.Mesh(
      sphereGeometry,
      moon.material
    )
    moonMesh.scale.setScalar(moon.radius)
    moonMesh.position.x = moon.distance
    return moonMesh
}


const planetMeshs = planets.map((planet) =>{
  const  planetMesh = createPlanet(planet)
  scene.add(planetMesh)

  planet.moons.forEach((moon)=>{
    const moonMesh = createMoon(moon)
  planetMesh.add(moonMesh)
  })
  return planetMesh//untuk di gunakan scene, dan ke-2 unutk menyimpan data di map untuk di gunakan nanti 
  })


/* //earth
const earthMaterial = new THREE.MeshBasicMaterial({color:"blue"})
// earthMaterial.map = earthAlbedo
const earth = new THREE.Mesh(sphereGeometry,earthMaterial)
earth.position.x= 10
earth.scale.setScalar(2)
scene.add(earth)

//moon
const moonMaterial = new THREE.MeshBasicMaterial({color:'grey'})
const moon = new THREE.Mesh(sphereGeometry,moonMaterial)
moon.position.x= 2
moon.scale.setScalar(0.5)
earth.add(moon) */
//light
const light = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(light)
/* const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(5,5,5);
scene.add(pointLight)
 */


const pointLight = new THREE.PointLight(0xffff00, 200);

scene.add(pointLight)
// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z =85;
camera.position.y = 9

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  powerPreference: "high-performance",
  antialias:true
 
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

// render the scene
/*  const clock = new THREE.Clock();
 let previous = 0 */
const renderLoop = () => {

  planetMeshs.forEach((planet, planetIndex)=>{
    planet.rotation.y += planets[planetIndex].speed
    planet.position.x = Math.sin(planet.rotation.y) * planets[planetIndex].distance
    planet.position.z = Math.cos(planet.rotation.y) * planets[planetIndex].distance
    planet.children.forEach((moon, moonIndex)=>{
      moon.rotation.y += planets[planetIndex].moons[moonIndex].speed
      moon.position.x = Math.sin(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
      moon.position.z = Math.cos(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
    })
  })
 /*  const currentTime = clock.getElapsedTime()
  const delta = currentTime - previous;
  previous = currentTime
    earth.rotation.y += 0.01
    earth.position.x = Math.sin(currentTime) * 14
    earth.position.z = Math.cos(currentTime) * 14

    moon.position.x = Math.sin(currentTime) * 2
    moon.position.z = Math.cos(currentTime) * 2
 */
  controls.update();  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};
renderLoop();
