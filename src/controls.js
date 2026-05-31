import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export let controls;
export const velocity = new THREE.Vector3();
export const direction = new THREE.Vector3();

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

const speed = 40.0;

// Room boundaries
const ROOM_MIN_X = -18;
const ROOM_MAX_X = 18;
const ROOM_MIN_Z = -18;
const ROOM_MAX_Z = 18;

// Camera vertical coordinate offset (since the floor is at -Math.PI)
const CAMERA_HEIGHT = -Math.PI + 1.6;

import { deskBox } from '../modules/office.js';

export function setupControls(camera, renderer) {
    controls = new PointerLockControls(camera, document.body);

    const onKeyDown = function (event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;
        }
    };

    const onKeyUp = function (event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;
        }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return controls;
}

export function updateMovement(delta, camera) {
    if (!controls.isLocked) return;

    // Apply friction/drag
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    
    // Normalize direction to ensure diagonal movement isn't faster
    direction.normalize(); 

    if (moveForward || moveBackward) velocity.z -= direction.z * speed * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * speed * delta;

    // Store previous position for collision response
    const previousPosition = camera.position.clone();

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);

    // Collision checking
    camera.position.y = CAMERA_HEIGHT; // lock camera height

    // Clamp to room bounds
    camera.position.x = Math.max(ROOM_MIN_X, Math.min(ROOM_MAX_X, camera.position.x));
    camera.position.z = Math.max(ROOM_MIN_Z, Math.min(ROOM_MAX_Z, camera.position.z));

    // Desk collision check: revert position if standing inside the desk bounds
    if (!deskBox.isEmpty() && deskBox.containsPoint(camera.position)) {
        camera.position.copy(previousPosition);
    }
}
