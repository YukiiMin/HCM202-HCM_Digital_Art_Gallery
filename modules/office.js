import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export let deskBox = new THREE.Box3();

const FLOOR_Y = -Math.PI;

function processModel(model, isInteractive, interactiveObjects, castShadow=true, receiveShadow=true) {
    model.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = castShadow;
            child.receiveShadow = receiveShadow;
        }
    });
    if (isInteractive) {
        model.userData.interactive = true;
        interactiveObjects.push(model);
    }
}

export const loadOfficeModels = (scene, interactiveObjects) => {
    const loader = new GLTFLoader();

    // Desk
    loader.load('/models2/antique_office_desk.glb', (gltf) => {
        const desk = gltf.scene;
        desk.name = 'desk';
        processModel(desk, false, interactiveObjects);
        
        // Desk sits on the floor at the center
        desk.position.set(0, FLOOR_Y, 0);
        // Turn the desk
        desk.rotation.y = Math.PI; 
        
        // The scale might be too small
        desk.scale.set(6, 6, 6);
        
        // Compute bounding box for collision after scale and position
        desk.updateMatrixWorld();
        const box = new THREE.Box3().setFromObject(desk);
        box.expandByScalar(0.5); // padding so player doesn't clip into it
        deskBox.copy(box);
        
        scene.add(desk);
    });

    // Typewriter
    loader.load('/models2/typewriter.glb', (gltf) => {
        const typewriter = gltf.scene;
        typewriter.name = 'typewriter';
        processModel(typewriter, true, interactiveObjects);
        
        // Position relative to scaled desk
        // If desk is scale 6, desk height might be ~6 units tall if original was 1 unit.
        // Or if original is normal cm scale, 6 is huge. 
        // Let's assume desk top is ~4.5 units above FLOOR_Y for testing. We can tweak.
        typewriter.position.set(0, FLOOR_Y + 4.5, 0.3); 
        scene.add(typewriter);
    });

    // Radio
    loader.load('/models2/vintage_radio.glb', (gltf) => {
        const radio = gltf.scene;
        radio.name = 'vintage_radio';
        processModel(radio, true, interactiveObjects);

        radio.position.set(1.5, FLOOR_Y + 4.5, 0);
        
        scene.add(radio);
    });

    // Lamp
    loader.load('/models2/old_vintage_desk_lamp.glb', (gltf) => {
        const lamp = gltf.scene;
        lamp.name = 'lamp';
        processModel(lamp, false, interactiveObjects);
        
        lamp.position.set(-1.0, FLOOR_Y + 4.5, 0);
        lamp.scale.set(1.5, 1.5, 1.5);
        scene.add(lamp);
    });

    // Window frame (optional decoration)
    loader.load('/models2/victorian_triple_window_frame_mri_-1.glb', (gltf) => {
        const windowFrame = gltf.scene;
        windowFrame.name = 'window';
        processModel(windowFrame, true, interactiveObjects);

        // Position on a wall (e.g. back wall behind desk)
        windowFrame.position.set(0, FLOOR_Y + 4, -19.5);
        scene.add(windowFrame);
    });
};
