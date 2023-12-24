import * as THREE from 'three';
import "./style.css"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene()


const geometry = new THREE.BoxGeometry(1, 1, 1)
const matrial = new THREE.MeshBasicMaterial({
  color: '#00ff83',
})

const group = new THREE.Group();

const loader = new GLTFLoader();

loader.load('scene.glb', function (glb) {

  group.add(glb.scene);
  glb.scene.rotation.x = -Math.PI / 20
  glb.scene.rotation.y = -Math.PI / 4
  glb.scene.rotation.z = -Math.PI / 10

}, undefined, function (error) {
  console.error(error);
});
scene.add(group);

const sizes = {
  width: window.innerWidth,
  Height: window.innerHeight,
}
const mloc = {
  x: 0,
  y: 0
}


const axisHelper = new THREE.AxesHelper(5)
scene.add(axisHelper)

const light = new THREE.PointLight(0xffffff, 1000, 500)
light.position.set(0, 10, 10)
scene.add(light)

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.Height)
camera.position.z = 10
scene.add(camera)

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.Height)
renderer.render(scene, camera)

window.addEventListener("mousemove", () => {
  group.rotation.reorder('YZX')
  group.rotation.x = -Math.cos((event.clientY/sizes.width)*Math.PI) + Math.PI/8
  group.rotation.y = -Math.cos((event.clientX/sizes.width)*Math.PI)
  console.log()

})

const loop = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()