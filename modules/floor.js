import * as THREE from "three";

function drawEncausticPattern(ctx, cx, cy, size) {
  ctx.save();
  ctx.translate(cx, cy);

  // 1. Vòng tròn trung tâm (Medallion)
  ctx.strokeStyle = '#dfcbb5'; // Vàng kem nhạt quý phái
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.35, 0, Math.PI * 2);
  ctx.stroke();

  // 2. Hoa văn cánh hoa đối xứng ở trung tâm (Quatrefoil / 8-pointed star)
  ctx.fillStyle = '#c4a882'; // Màu vàng cổ
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    // Vẽ cánh hoa thon thả tinh tế đặc trưng Indochine
    ctx.quadraticCurveTo(-size * 0.08, size * 0.15, 0, size * 0.3);
    ctx.quadraticCurveTo(size * 0.08, size * 0.15, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.rotate(Math.PI / 4);
  }

  // 3. Đường tròn nhỏ làm nhụy hoa ở tâm
  ctx.fillStyle = '#dfcbb5';
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.06, 0, Math.PI * 2);
  ctx.fill();

  // 4. Hoa văn góc (Corner scrolls) để ghép nối bốn viên gạch thành hoa văn đối xứng liên tục
  ctx.fillStyle = '#dfcbb5';
  const cornerSize = size * 0.18;
  
  // Top-Left
  ctx.beginPath();
  ctx.moveTo(-size/2, -size/2);
  ctx.lineTo(-size/2 + cornerSize, -size/2);
  ctx.quadraticCurveTo(-size/2 + cornerSize/2, -size/2 + cornerSize/2, -size/2, -size/2 + cornerSize);
  ctx.closePath();
  ctx.fill();

  // Top-Right
  ctx.beginPath();
  ctx.moveTo(size/2, -size/2);
  ctx.lineTo(size/2 - cornerSize, -size/2);
  ctx.quadraticCurveTo(size/2 - cornerSize/2, -size/2 + cornerSize/2, size/2, -size/2 + cornerSize);
  ctx.closePath();
  ctx.fill();

  // Bottom-Left
  ctx.beginPath();
  ctx.moveTo(-size/2, size/2);
  ctx.lineTo(-size/2 + cornerSize, size/2);
  ctx.quadraticCurveTo(-size/2 + cornerSize/2, size/2 - cornerSize/2, -size/2, size/2 - cornerSize);
  ctx.closePath();
  ctx.fill();

  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(size/2, size/2);
  ctx.lineTo(size/2 - cornerSize, size/2);
  ctx.quadraticCurveTo(size/2 - cornerSize/2, size/2 - cornerSize/2, size/2, size/2 - cornerSize);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function createMuseumTileTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const tileSize = 128; // 4x4 tiles per 512px canvas

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const x = col * tileSize, y = row * tileSize;
      
      // Nền gạch đan xen hai màu nâu trầm Đông Dương cổ điển
      ctx.fillStyle = (row + col) % 2 === 0 ? '#4A3118' : '#5E4023';
      ctx.fillRect(x, y, tileSize, tileSize);
      
      // Viền gạch màu vàng cát sang trọng
      ctx.strokeStyle = '#C4A882';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(x + 1.5, y + 1.5, tileSize - 3, tileSize - 3);
      
      // Hoa văn gạch bông Đông Dương quý phái
      drawEncausticPattern(ctx, x + tileSize/2, y + tileSize/2, tileSize);
    }
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 12); // Lặp lại gạch đều khắp phòng
  return texture;
}

export const setupFloor = (scene) => {
  const floorTexture = createMuseumTileTexture();

  const planeGeometry = new THREE.PlaneGeometry(45, 45);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    roughness: 0.35, // Độ bóng phản xạ cao cấp
    metalness: 0.15,
    side: THREE.DoubleSide,
  });

  const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
  floorPlane.rotation.x = Math.PI / 2;
  floorPlane.position.y = -Math.PI; // -3.14

  scene.add(floorPlane);
};
