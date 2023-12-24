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


// const axisHelper = new THREE.AxesHelper(5)
// scene.add(axisHelper)

const light = new THREE.PointLight(0xffffff, 1000, 500)
light.position.set(0, 10, 10)
scene.add(light)

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.Height)
camera.position.z = 10
scene.add(camera)

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas, alpha : true },)
renderer.setSize(sizes.width, sizes.Height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

window.addEventListener("mousemove", () => {
  group.rotation.reorder('YZX')
  group.rotation.x = -Math.cos((event.clientY/sizes.width)*Math.PI) + Math.PI/6
  group.rotation.y = -Math.cos((event.clientX/sizes.width)*Math.PI)
  console.log()

})

const loop = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()







// UPDATE: I was able to get this working again... Enjoy!

var cursor = document.querySelector('.cursor');
var cursorinner = document.querySelector('.cursor2');
var a = document.querySelectorAll('a');

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + 'px';
  cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function(){
  cursor.classList.add('click');
  cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function(){
  cursor.classList.remove('click')
  cursorinner.classList.remove('cursorinnerhover')
});

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
})