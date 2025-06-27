import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 3);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0, 20, 0);
scene.add(light);

// Load GLB Model
const loader = new GLTFLoader();
loader.load(
  './model.glb', // path to your .glb file
  gltf => {
    scene.add(gltf.scene);
  },
  xhr => {
    console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}%`);
  },
  error => {
    console.error('An error occurred loading the GLB:', error);
  }
);

// Handle Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
