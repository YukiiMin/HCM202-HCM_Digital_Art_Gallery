import * as THREE from "three";
import { scene, setupScene } from "./modules/scene.js";
import { createPaintings } from "./modules/paintings.js";
import { createWalls, createPaintingFrames } from "./modules/walls.js";
import { setupLighting } from "./modules/lighting.js";
import { setupFloor } from "./modules/floor.js";
import { createCeiling } from "./modules/ceiling.js";
import { createBoundingBoxes } from "./modules/boundingBox.js";
import { setupRendering } from "./modules/rendering.js";
import { setupEventListeners } from "./modules/eventListeners.js";
import { addObjectsToScene } from "./modules/sceneHelpers.js";
import { setupPlayButton, setupAboutButton } from "./modules/menu.js";
import { setupAudio } from "./modules/audioGuide.js";
import { clickHandling } from "./modules/clickHandling.js";
import { setupVR } from "./modules/VRSupport.js";
import { loadStatueModel } from "./modules/statue.js";
import { setupInteraction, interactiveObjects } from "./src/interaction.js";
import { loadBenchModel } from "./modules/bench.js";
import { loadCeilingLampModel } from "./modules/ceilingLamp.js";
import { paintingData } from "./modules/paintingData.js";
import { setupGates } from "./modules/gates.js";

let { camera, controls, renderer } = setupScene();

setupAudio(camera);

const textureLoader = new THREE.TextureLoader();

const walls = createWalls(scene, textureLoader);
const floor = setupFloor(scene);
const ceiling = createCeiling(scene, textureLoader);
const paintings = createPaintings(scene, textureLoader);
const lighting = setupLighting(scene, paintings);

// Thêm khung tranh 3D cho tất cả hiện vật
createPaintingFrames(scene, paintingData);

// Tạo Cửa vào và Cổng ra bảo tàng
setupGates(scene);

createBoundingBoxes(walls);
createBoundingBoxes(paintings);

addObjectsToScene(scene, paintings);

setupPlayButton(controls);
setupAboutButton();

setupEventListeners(controls, camera, scene);

clickHandling(renderer, camera, paintings, controls);

  console.log("Loading Statue Model...");
  
  // Populate the shared interactiveObjects array with paintings
  interactiveObjects.push(...paintings);
  
  // Have the old statue loader push the new models into this array
  loadStatueModel(scene, interactiveObjects);

  // Setup the hover/click logic via the crosshair
  setupInteraction(camera, interactiveObjects);

  // Expose it globally so rendering.js can access it, or just let rendering.js import `updateInteraction`
  window.interactiveCamera = camera;

  setupRendering(scene, camera, renderer, paintings, controls, walls);

  // loadBenchModel(scene);
  
  // loadCeilingLampModel(scene);

setupVR(renderer);
