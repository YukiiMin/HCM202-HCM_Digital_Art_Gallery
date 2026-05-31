import * as THREE from 'three';

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

let controlsRef = null; // Lưu tham chiếu controls toàn cục cho module

// ── Mở Modal với nội dung storytelling đầy đủ ────────────────
function openModal(info) {
  const modal = document.getElementById('infoModal');
  const content = document.getElementById('modalContent');

  // Build HTML nội dung Modal theo chuẩn design system
  const quoteHTML = info.quote
    ? `<blockquote class="modal-quote">${info.quote.replace(/\n/g, '<br>')}</blockquote>`
    : '';

  content.innerHTML = `
    <div class="modal-tag">${info.tag || 'Hiện vật trưng bày'}</div>
    <h2>${info.title}</h2>
    <p class="modal-meta">${info.artist || ''} · ${info.year || ''}</p>
    <div class="modal-divider"></div>
    <p class="modal-body">${(info.description || '').replace(/\n/g, '<br><br>')}</p>
    ${quoteHTML}
  `;

  modal.classList.add('active');
  modal.style.display = 'flex';

  // CHỦ ĐỘNG nhả khóa chuột (unlock pointer) để con trỏ chuột xuất hiện tương tác tự do
  if (controlsRef) {
    controlsRef.unlock();
  }

  // Đóng khi click nền tối (Click ra ngoài hộp nội dung)
  modal.addEventListener('click', function closeOnBackdrop(e) {
    if (e.target === modal) {
      closeModal();
      modal.removeEventListener('click', closeOnBackdrop);
    }
  });
}

function closeModal() {
  const modal = document.getElementById('infoModal');
  if (modal && modal.style.display === 'flex') {
    modal.style.display = 'none';
    modal.classList.remove('active');
    
    // Tự động khóa lại con trỏ chuột di chuyển tiếp
    if (controlsRef) {
      setTimeout(() => {
        controlsRef.lock();
      }, 100); // Delay nhẹ 100ms để trình duyệt nhả Pointer Lock mượt mà
    }
  }
}

// ── Setup click events ─────────────────────────────────────────
function clickHandling(renderer, camera, paintings, controls) {
  controlsRef = controls; // Lưu trữ tham chiếu

  // Nút đóng modal
  const closeBtn = document.getElementById('close-modal-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  renderer.domElement.addEventListener('click', (event) => {
    // Chỉ xử lý khi đang trong chế độ pointer lock (đang tham quan)
    if (!document.pointerLockElement) return;

    // Trong FPS mode, raycast từ chính giữa màn hình (crosshair)
    mouse.x = 0;
    mouse.y = 0;
    onClick(camera, paintings);
  }, false);

  // Lắng nghe chuột phải trên chính Modal để đóng nhanh và khóa chuột di chuyển tiếp
  const modal = document.getElementById('infoModal');
  if (modal) {
    modal.addEventListener('contextmenu', (e) => {
      if (modal.style.display === 'flex') {
        e.preventDefault(); // Chặn menu mặc định của trình duyệt
        closeModal();
      }
    }, false);
  }

  // Dự phòng chuột phải trên window toàn cục
  window.addEventListener('contextmenu', (e) => {
    if (modal && modal.style.display === 'flex') {
      e.preventDefault();
      closeModal();
    }
  }, false);
}

function onClick(camera, paintings) {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(paintings);

  if (intersects.length > 0) {
    const painting = intersects[0].object;
    const info = painting.userData.info;

    if (info) {
      console.log('Clicked artwork:', info.title);
      openModal(info);
    }
  }
}

export { clickHandling };

