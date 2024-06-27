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


// JAVASCRIPT CODE

window.addEventListener('load', function() {
    console.log("WEBSITE LOADED!!!")
    const resolver = {
        resolve: function resolve(options, callback) {
            const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
            const combinedOptions = Object.assign({}, options, { resolveString: resolveString });
            
            function getRandomInteger(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            
            function randomCharacter(characters) {
                return characters[getRandomInteger(0, characters.length - 1)];
            }
            
            function doRandomiserEffect(options, callback) {
                const characters = options.characters;
                const timeout = options.timeout;
                const element = options.element;
                const partialString = options.partialString;
                let iterations = options.iterations;
                
                setTimeout(() => {
                    if (iterations >= 0) {
                        const nextOptions = Object.assign({}, options, { iterations: iterations - 1 });
                        
                        if (iterations === 0) {
                            element.textContent = partialString;
                        } else {
                            element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
                        }
                        
                        doRandomiserEffect(nextOptions, callback);
                    } else if (typeof callback === "function") {
                        callback();
                    }
                }, options.timeout);
            }
            
            function doResolverEffect(options, callback) {
                const resolveString = options.resolveString;
                const offset = options.offset;
                const partialString = resolveString.substring(0, offset);
                const combinedOptions = Object.assign({}, options, { partialString: partialString });
                
                doRandomiserEffect(combinedOptions, () => {
                    const nextOptions = Object.assign({}, options, { offset: offset + 1 });
                    
                    if (offset <= resolveString.length) {
                        doResolverEffect(nextOptions, callback);
                    } else if (typeof callback === "function") {
                        callback();
                    }
                });
            }
            
            doResolverEffect(combinedOptions, callback);
        }
    }
    
    const strings = [
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
        'Nemo enim ipsam voluptatem, quia voluptas sit aspernatur'
    ];
    
    let counter = 0;
    
    const options = {
        offset: 0,
        timeout: 5,
        iterations: 10,
        characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
        resolveString: strings[counter],
        element: document.querySelector('[data-target-resolver]')
    }
    
    function callback() {
        setTimeout(() => {
            counter++;
            
            if (counter >= strings.length) {
                counter = 0;
            }
            
            let nextOptions = Object.assign({}, options, { resolveString: strings[counter] });
            resolver.resolve(nextOptions, callback);
        }, 1000);
    }
    
    resolver.resolve(options, callback);
});

// SCROLL ANIMATION
var scrolled = false;

window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    const linksElement = document.querySelector('.links');
    
    if (linksElement) {
        if (scrollPosition > 480 && !scrolled) {
            linksElement.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
            linksElement.classList.add('navbar-scrolled');
            scrolled = true;
        } else if (scrollPosition < 480) {
            linksElement.style.backgroundColor = 'transparent';
            linksElement.classList.remove('navbar-scrolled');
            scrolled = false;
        }
    }
});

window.addEventListener('scroll', function() {
    const textContainer = document.querySelector('.text-container');
    if (textContainer) {
        if (window.scrollY > 100) {
            textContainer.classList.add('hidden');
        } else {
            textContainer.classList.remove('hidden');
        }
    }
});

// ON SCROLL
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    rootMargin: '0px 0px -50% 0px'
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// ABOUT SECTION ANIMATION
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    rootMargin: '0px 0px 0% 0px'
});

const aboutElement = document.querySelector('.about.hidden');
if (aboutElement) {
    aboutObserver.observe(aboutElement);
}

// BACKGROUND ANIMATION
const root = document.documentElement;
const urls = [
  'url(../img/img1.jpg)',
  'url(../img/img2.jpg)',
  'url(../img/img3.jpg)',
  'url(../img/img4.jpg)'
];
let currentIndex = 0;

function changeBackground() {
  currentIndex = (currentIndex + 1) % urls.length;
  const newUrl = urls[currentIndex];

  // Update CSS variable
  root.style.setProperty('--url1', newUrl);
}

// Change background every 5 seconds
setInterval(changeBackground, 5000);
