import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { createPaintings } from '../modules/paintings.js';
import { createWalls } from '../modules/walls.js';
import { setupLighting } from '../modules/lighting.js';
import { setupFloor } from '../modules/floor.js';
import { createCeiling } from '../modules/ceiling.js';
import { createBoundingBoxes } from '../modules/boundingBox.js';
import { addObjectsToScene } from '../modules/sceneHelpers.js';
import { loadOfficeModels } from '../modules/office.js';

import { setupControls, updateMovement, controls } from './controls.js';
import { setupInteraction, updateInteraction, interactiveObjects } from './interaction.js';
import { setupUI } from './ui.js';

let scene, camera, renderer;
let prevTime = performance.now();

// Original floor coordinate offset
const FLOOR_Y = -Math.PI;

init();
animate();

function init() {
    scene = new THREE.Scene();
    window.scene = scene; // Expose for debugging
    
    
    // Add Sky Sphere (Environment)
    const skyLoader = new THREE.TextureLoader();
    const texture = skyLoader.load("/images/museum-hall.png");
    texture.colorSpace = THREE.SRGBColorSpace;
    const sphereGeometry = new THREE.SphereGeometry(50, 60, 40); 
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    });
    const skySphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(skySphere);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Move starting position away from the center a bit (near the door) so you walk in
    camera.position.set(0, FLOOR_Y + 1.6, 15); 

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);

    const textureLoader = new THREE.TextureLoader();

    // Reconstruct the original room
    const walls = createWalls(scene, textureLoader);
    const floor = setupFloor(scene);
    const ceiling = createCeiling(scene, textureLoader);
    const paintings = createPaintings(scene, textureLoader);
    
    // Ensure paintings are interactive 
    paintings.forEach(painting => {
        painting.userData.interactive = true; 
        // We will push them to interactive objects inside processModel
        interactiveObjects.push(painting);
    });

    const lighting = setupLighting(scene, paintings);

    createBoundingBoxes(walls);
    createBoundingBoxes(paintings);
    addObjectsToScene(scene, paintings);

    // Helper functions for FPS
    setupControls(camera, renderer);
    setupUI(controls);
    setupInteraction(camera, interactiveObjects);

    // Load new models into the room
    loadOfficeModels(scene, interactiveObjects);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    const time = performance.now();
    const delta = (time - prevTime) / 1000;

    updateMovement(delta, camera);
    updateInteraction(camera);

    renderer.render(scene, camera);
    prevTime = time;
}
