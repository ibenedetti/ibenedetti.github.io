import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Initialize the renderer and set its properties
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.domElement.id = 'three-canvas';
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Transparent background
renderer.alpha = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Append the renderer's DOM element to the container
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create a scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 5, 11);

// Set up controls for the camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false; // Disable zoom
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = true; 
controls.autoRotateSpeed = 1.0; 
controls.target = new THREE.Vector3(0, 1, 0); 
controls.update();

// HANDLE USER INTERACTION TO PAUSE AND RESUME AUTO-ROTATION
let userInteracted = false;
let timeoutId;

function resumeAutoRotate() {
    userInteracted = false;
    controls.autoRotate = true;
    controls.update(); 
}

function handleUserInteraction() {
    if (!userInteracted) {
        userInteracted = true;
        controls.autoRotate = false;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(resumeAutoRotate, 1000); // Resume auto-rotate after 1 second of inactivity
    }
}

document.addEventListener('mousedown', handleUserInteraction);
document.addEventListener('touchstart', handleUserInteraction);

// Add ambient and directional lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Adjust intensity as needed
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Load the 3D model
const loader = new GLTFLoader().setPath('CSS/3D models/screen/');
loader.load('scene.gltf', (gltf) => {
    const mesh = gltf.scene;

    mesh.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    const modelScale = 0.75; // Adjust as needed
    mesh.scale.set(modelScale, modelScale, modelScale);

    // Center the model in the scene
    const boundingBox = new THREE.Box3().setFromObject(mesh);
    const center = boundingBox.getCenter(new THREE.Vector3());
    mesh.position.sub(center);

    // Move the model so that its center is at the origin
    const modelCenter = new THREE.Vector3();
    mesh.getWorldPosition(modelCenter);
    mesh.position.sub(modelCenter);

    mesh.position.set(0, 1.05, -1); 
    scene.add(mesh);

    document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
    console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
    console.error(error);
});

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

