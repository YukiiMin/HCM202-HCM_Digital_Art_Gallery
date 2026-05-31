import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export const loadStatueModel = (scene, interactiveObjects = []) => {
  const loader = new GLTFLoader();
  const FLOOR_Y = -Math.PI; // -3.14

  function processModel(model, name, initialPos, initialScale, isInteractive) {
      model.name = name;
      model.position.copy(initialPos);
      model.scale.copy(initialScale);
      
      const params = { emissive: 0x333333 };

      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
              child.material.metalness = 0.0;
              child.material.roughness = 1.0;
              
              if (!child.material.emissive) child.material.emissive = new THREE.Color();
              child.material.emissive.setHex(params.emissive);
              
              if (child.material.map) {
                  child.material.map.colorSpace = THREE.SRGBColorSpace;
              }
              child.material.needsUpdate = true;
          }
        }
      });
      
      if (isInteractive) {
          model.userData.interactive = true;
          interactiveObjects.push(model);
      }
      scene.add(model);
  }

  // 1. Load Desk (Center)
  loader.load("/models2/antique_office_desk.glb", (gltf) => {
      const desk = gltf.scene;
      processModel(desk, 'desk', new THREE.Vector3(0, -3.1, 0), new THREE.Vector3(2, 2, 2), false);
      desk.rotation.y = 0;
  });

  // 2. Load Typewriter (Middle of the vertical line)
  loader.load("/models2/typewriter.glb", (gltf) => {
      const typewriter = gltf.scene;
      processModel(typewriter, 'typewriter', new THREE.Vector3(0.0, 1.0, 0.0), new THREE.Vector3(3, 3, 3), true);
      typewriter.rotation.y = 0;
  });

  // 3. Load Radio (Back of the vertical line, near the chair)
  loader.load("/models2/vintage_radio.glb", (gltf) => {
      const radio = gltf.scene;
      processModel(radio, 'vintage_radio', new THREE.Vector3(0.0, 1.6, 1.8), new THREE.Vector3(1, 1, 1), true);
      radio.rotation.y = 0; // Xoay thẳng dọc theo bàn
  });

  // 4. Load Lamp (Front of the vertical line, near the visitor)
  loader.load("/models2/old_vintage_desk_lamp.glb", (gltf) => {
      const lamp = gltf.scene;
      processModel(lamp, 'lamp', new THREE.Vector3(0.0, 1.0, -1.8), new THREE.Vector3(1.5, 1.5, 1.5), true);
      lamp.rotation.y = 0; // Hướng thẳng
  });
};

