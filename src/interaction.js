import * as THREE from 'three';
import { showModal, hideModal, showHoverInfo, hideHoverInfo } from './ui.js';
import { deskLampRef } from '../modules/lighting.js';

let raycaster;
let mouse;
export let interactiveObjects = [];
let hoveredObject = null;

export const isHovering = () => hoveredObject !== null;

// Scale multiplier for hovering
const HOVER_SCALE = 1.05;

// Interactive Desk Objects States
let isTypewriterActive = false;
let typewriterAudio = null;
let radioAudio = null;
let isRadioPlaying = false;
let isLampOn = false;

// Exit Hold Timer States
let exitHoldTimer = null;
const EXIT_HOLD_DURATION = 1500; // 1.5 seconds hold is perfect and punchy

export function setupInteraction(camera, objects) {
    interactiveObjects = objects;
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2(0, 0); // Center of the screen
    
    // Initialize audio elements
    initInteractionAudio();

    // Click handler for toggleable objects (Lamp, Radio)
    document.addEventListener('click', () => {
        if (!document.pointerLockElement) return; // Only interact when mouse is locked (playing)
        if (hoveredObject) {
            triggerInteraction(hoveredObject);
        }
    });

    // MouseDown handler for typewriter click-and-hold
    document.addEventListener('mousedown', (e) => {
        if (!document.pointerLockElement) return;
        if (e.button === 0 && hoveredObject) { // Left-click
            const name = hoveredObject.userData.interactiveName || hoveredObject.name.toLowerCase();
            if (name.includes('typewriter')) {
                isTypewriterActive = true;
                if (typewriterAudio) {
                    typewriterAudio.play().catch(err => console.log('[Typewriter] Play error:', err));
                }
            }
        }
    });

    // MouseUp handler to release typewriter typing sound
    document.addEventListener('mouseup', (e) => {
        if (e.button === 0) {
            if (isTypewriterActive) {
                isTypewriterActive = false;
                if (typewriterAudio) {
                    typewriterAudio.pause();
                }
            }
        }
    });

    // Keydown handler for opening historical modals with custom inspect key
    document.addEventListener('keydown', (e) => {
        if (!document.pointerLockElement) return;
        const inspectKey = (window.customKeys?.inspectObject || 't').toLowerCase();
        if (e.key.toLowerCase() === inspectKey) {
            if (hoveredObject) {
                showHistoricalInfoModal(hoveredObject);
            }
        }
    });
}

function initInteractionAudio() {
    if (!typewriterAudio) {
        typewriterAudio = new Audio('/sounds/effects/freesound_community-typewriter-machine-64191.mp3');
        typewriterAudio.loop = true;
    }
    if (!radioAudio) {
        radioAudio = new Audio('/sounds/Tuyen_ngon_doc_lap_103854.mp3');
        radioAudio.volume = 0.8;
        radioAudio.addEventListener('ended', () => {
            console.log('[Radio] Speech ended, turning off emissive.');
            isRadioPlaying = false;
            // Find radio model to disable its emissive glow
            const radioObj = interactiveObjects.find(obj => {
                const name = obj.userData.interactiveName || obj.name.toLowerCase();
                return name.includes('radio') || name.includes('vintage_radio');
            });
            if (radioObj) {
                toggleRadioState(radioObj, false);
            }
        });
    }
}

function openHistoricalModal(info) {
    const modal = document.getElementById('infoModal');
    const content = document.getElementById('modalContent');
    if (!modal || !content) return;

    const quoteHTML = info.quote
      ? `<blockquote class="modal-quote">${info.quote.replace(/\n/g, '<br>')}</blockquote>`
      : '';

    content.innerHTML = `
      <div class="modal-tag">${info.tag || 'Hiện vật tương tác'}</div>
      <h2>${info.title}</h2>
      <p class="modal-meta">${info.meta || ''}</p>
      <div class="modal-divider"></div>
      <p class="modal-body">${(info.description || '').replace(/\n/g, '<br><br>')}</p>
      ${quoteHTML}
    `;

    modal.classList.add('active');
    modal.style.display = 'flex';

    // Release pointer lock so user can interact with the modal and use mouse cursor
    document.exitPointerLock();
}

function showHistoricalInfoModal(object) {
    const name = object.userData.interactiveName || object.name.toLowerCase();

    if (name.includes('radio') || name.includes('vintage_radio')) {
        openHistoricalModal({
            title: 'Radio Cổ — Nhịp Đập Lịch Sử & Nghệ Thuật Lan Tỏa',
            tag: 'Kỷ vật lịch sử',
            meta: 'Làn sóng phát thanh · Ngày 2 tháng 9 năm 1945',
            description: 'Đài phát thanh (Radio) chính là phương tiện kỳ diệu để kết nối tư tưởng của Lãnh tụ với hàng triệu con tim Việt Nam. Vào buổi sáng mùa thu ngày 2 tháng 9 năm 1945, qua chiếc Radio cổ kính, giọng nói ấm áp và vang vọng của Bác đọc bản Tuyên Ngôn Độc Lập tại Quảng trường Ba Đình đã được phát đi khắp mọi miền Tổ quốc và vươn tầm ra thế giới.\n\nKhông chỉ truyền tải các tin tức cách mạng chính luận, sóng Radio còn là cầu nối âm nhạc, mang những áng thơ chúc Tết mộc mạc của Người và những ca khúc nghệ thuật hào hùng do các nhạc sĩ Việt Nam và quốc tế viết về Người (như Chu Minh, Ewan MacColl) đi sâu vào lòng quần chúng nhân dân, biến âm nhạc và nghệ thuật thành sức mạnh đoàn kết toàn dân tộc.',
            quote: '“Tôi nói đồng bào nghe rõ không?”\n— Trích lời Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, 2/9/1945'
        });
    } else if (name.includes('typewriter')) {
        // Stop typing sound if it's currently active before opening the modal
        if (isTypewriterActive) {
            isTypewriterActive = false;
            if (typewriterAudio) typewriterAudio.pause();
        }
        openHistoricalModal({
            title: 'Máy Đánh Chữ Cổ — Thanh Âm Của Sáng Tạo Cách Mạng',
            tag: 'Kỷ vật lịch sử',
            meta: 'Công cụ soạn thảo · Thập niên 1940',
            description: 'Chiếc máy đánh chữ chính là người bạn đồng hành thầm lặng của Bác Hồ qua những năm tháng kháng chiến gian khổ. Trong hang đá Pác Bó lạnh thấu xương hay những căn lán rợp bóng cây ở chiến khu Việt Bắc, tiếng gõ máy chữ lách cách liên tục vang lên xuyên đêm chính là thanh âm của tư duy vĩ đại đang vận hành.\n\nBác đã tự tay gõ máy để biên soạn các văn kiện chỉ đạo kháng chiến, dịch các tài liệu lý luận cách mạng và viết các bài báo đanh thép trên báo Việt Nam Độc Lập hay tờ Cứu Quốc. Mỗi dòng chữ được in từ chiếc máy đánh chữ thô sơ này đã góp phần giác ngộ cách mạng cho hàng triệu đồng bào, biến ngòi bút nghệ thuật chính luận thành vũ khí đấu tranh giải phóng dân tộc đắc lực nhất.',
            quote: '“Nay quyết chí ghi ba chữ: Học, Học nữa, Học mãi! Để tiến bộ và cống hiến.”\n— Hồ Chí Minh'
        });
    } else if (name.includes('lamp')) {
        openHistoricalModal({
            title: 'Ngọn Đèn Bàn Ấm Áp — Nguồn Cảm Hứng Nghệ Thuật Bất Hủ',
            tag: 'Biểu tượng nghệ thuật',
            meta: 'Ánh sáng tư duy · Đêm khuya sáng tác',
            description: 'Hình ảnh Bác Hồ ngồi làm việc thâu đêm bên ngọn đèn bàn ấm áp đã đi sâu vào tâm thức và trở thành nguồn cảm hứng nghệ thuật bất hủ của nhiều thế hệ họa sĩ, nhà thơ, nhạc sĩ Việt Nam. Đó là ánh sáng đại diện cho tinh thần lao động trí tuệ bền bỉ, sự tĩnh lặng và chiều sâu tư tưởng của một Danh nhân Văn hóa kiệt xuất.\n\nKhi ngắm nhìn ngọn đèn bàn nhỏ tỏa bóng xuống mặt bàn gỗ cổ kính, ta như cảm nhận được không gian sáng tác nghệ thuật dung dị của Người ngày xưa — nơi những vần thơ trong Nhật ký trong tù hay những trang viết tràn đầy tình yêu thương đồng bào được phác thảo. Ánh sáng vàng dịu gợi lên cảm giác ấm cúng, truyền đi ngọn lửa của lý tưởng và khát vọng tự do.',
            quote: '“Sáng ra bờ suối tối vào hang\nCháo bẹ rau măng vẫn sẵn sàng\nBàn đá chông chênh dịch sử Đảng\nCuộc đời cách mạng thật là sang!”\n— Tức Cảnh Pác Bó, Hồ Chí Minh, 1941'
        });
    }
}

function toggleLampState(object, turnOn) {
    object.traverse((child) => {
        if (child.isMesh && child.material && child.material.emissive) {
            if (!child.userData.originalEmissive) {
                child.userData.originalEmissive = child.material.emissive.clone();
            }
            if (turnOn) {
                // Set the base originalEmissive to a warm yellow/orange glow
                child.userData.originalEmissive.setHex(0xffaa44);
            } else {
                // Restore to unlit
                child.userData.originalEmissive.setHex(0x000000);
            }
            // Update material emissive immediately if not currently hovered
            if (hoveredObject !== object) {
                child.material.emissive.copy(child.userData.originalEmissive);
            }
        }
    });
}

function toggleRadioState(object, turnOn) {
    object.traverse((child) => {
        if (child.isMesh && child.material && child.material.emissive) {
            if (!child.userData.originalEmissive) {
                child.userData.originalEmissive = child.material.emissive.clone();
            }
            if (turnOn) {
                // Set the base originalEmissive to a soft golden glow representing radio tuning light
                child.userData.originalEmissive.setHex(0xccaa44);
            } else {
                // Restore to unlit
                child.userData.originalEmissive.setHex(0x000000);
            }
            if (hoveredObject !== object) {
                child.material.emissive.copy(child.userData.originalEmissive);
            }
        }
    });
}

function startExitHolding() {
    resetExitHolding(); // Safety clear
    
    const progressContainer = document.getElementById('exit-hold-progress-container');
    const progressBar = document.getElementById('exit-hold-progress-bar');
    if (progressContainer) progressContainer.style.display = 'block';

    const startTime = performance.now();

    function updateExitProgress() {
        if (!document.pointerLockElement || !hoveredObject) {
            resetExitHolding();
            return;
        }
        const currentName = hoveredObject.userData.interactiveName || hoveredObject.name.toLowerCase();
        if (!currentName.includes('exit_gate')) {
            resetExitHolding();
            return;
        }

        const elapsed = performance.now() - startTime;
        const pct = Math.min(100, (elapsed / EXIT_HOLD_DURATION) * 100);
        
        if (progressBar) progressBar.style.width = `${pct}%`;

        if (elapsed >= EXIT_HOLD_DURATION) {
            resetExitHolding();
            // Trigger the ending!
            import('../modules/gates.js').then(module => {
                module.triggerEndingModal();
            });
        } else {
            exitHoldTimer = requestAnimationFrame(updateExitProgress);
        }
    }
    exitHoldTimer = requestAnimationFrame(updateExitProgress);
}

function resetExitHolding() {
    if (exitHoldTimer) {
        cancelAnimationFrame(exitHoldTimer);
        exitHoldTimer = null;
    }
    const progressContainer = document.getElementById('exit-hold-progress-container');
    const progressBar = document.getElementById('exit-hold-progress-bar');
    if (progressContainer) progressContainer.style.display = 'none';
    if (progressBar) progressBar.style.width = '0%';
}

function getInteractiveRoot(object) {
    let root = object;
    while (root.parent && root.parent.type !== 'Scene' && !root.userData?.interactive) {
        root = root.parent;
    }
    if (root.userData?.interactive) {
        return root;
    }
    return object;
}

export function updateInteraction(camera) {
    if (interactiveObjects.length === 0) return;

    // Only allow interactions when pointer lock is active
    if (!document.pointerLockElement) {
        if (hoveredObject) {
            if (isTypewriterActive) {
                isTypewriterActive = false;
                if (typewriterAudio) typewriterAudio.pause();
            }
            resetExitHolding();
            resetHoverEffect(hoveredObject);
            hoveredObject = null;
        }
        return;
    }

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(interactiveObjects, true);

    const validIntersects = intersects.filter(intersect => intersect.distance < 20);

    if (validIntersects.length > 0) {
        const hitMesh = validIntersects[0].object;
        const target = getInteractiveRoot(hitMesh);

        if (hoveredObject !== target) {
            // Stop typewriter typing and exit holding if crosshair leaves it
            if (isTypewriterActive) {
                isTypewriterActive = false;
                if (typewriterAudio) typewriterAudio.pause();
            }
            resetExitHolding();
            
            resetHoverEffect(hoveredObject);
            hoveredObject = target;
            applyHoverEffect(hoveredObject);
        }
    } else {
        if (hoveredObject) {
            // Stop typewriter typing and exit holding if crosshair leaves it
            if (isTypewriterActive) {
                isTypewriterActive = false;
                if (typewriterAudio) typewriterAudio.pause();
            }
            resetExitHolding();
            
            resetHoverEffect(hoveredObject);
            hoveredObject = null;
        }
    }
}

function applyHoverEffect(object) {
    if (!object) return;
    
    if (!object.userData.originalScale) {
        object.userData.originalScale = object.scale.clone();
    }
    // Scale up slightly for feedback based on original scale, prevent infinite scaling
    object.scale.copy(object.userData.originalScale).multiplyScalar(HOVER_SCALE);
    
    const name = object.userData.interactiveName || object.name.toLowerCase();

    object.traverse((child) => {
        if (child.isMesh && child.material && child.material.emissive) {
            if (!child.userData.originalEmissive) {
                child.userData.originalEmissive = child.material.emissive.clone();
            }
            
            // Premium hover highlight blending with glowing elements
            if (name.includes('lamp') && isLampOn) {
                child.material.emissive.setHex(0xffcc66); // Brighter golden glow on hover
            } else if ((name.includes('radio') || name.includes('vintage_radio')) && isRadioPlaying) {
                child.material.emissive.setHex(0xffdd66); // Brighter amber glow on hover
            } else {
                child.material.emissive.setHex(0x333333); // Normal hover feedback
            }
        }
    });

    // —— Crosshair: chuyển vàng khi hover ——
    const crosshair = document.getElementById('crosshair');
    if (crosshair) crosshair.classList.add('hovering');

    const inspectKeyText = (window.customKeys?.inspectObject || 't').toUpperCase();
    if (name.includes('radio') || name.includes('vintage_radio')) {
        showHoverInfo('Radio cổ', `Click: Bật/tắt phát thanh · Nhấn [${inspectKeyText}]: Xem câu chuyện lịch sử`);
    } else if (name.includes('typewriter')) {
        showHoverInfo('Máy đánh chữ', `Giữ chuột trái: Gõ chữ · Nhấn [${inspectKeyText}]: Xem câu chuyện lịch sử`);
    } else if (name.includes('paper') || name.includes('báo')) {
        showHoverInfo('Báo chí cách mạng', 'Các tờ báo như Dân Chúng, Dân Nguyện góp phần tuyên truyền phong trào dân chủ.');
    } else if (name.includes('lamp')) {
        showHoverInfo('Đèn bàn', `Click: Bật/tắt ánh sáng · Nhấn [${inspectKeyText}]: Xem câu chuyện lịch sử`);
    } else if (name.includes('exit_gate')) {
        showHoverInfo('Cổng lối ra (Exit)', 'Click chuột trái: Kết thúc chuyến tham quan');
    } else if (name.includes('window')) {
        showHoverInfo('Đấu xảo 1938', 'Viewing the 1938 Mass Rally at Đấu xảo.');
    }
}

function resetHoverEffect(object) {
    if (!object) return;
    
    if (object.userData.originalScale) {
        object.scale.copy(object.userData.originalScale);
    }
    
    object.traverse((child) => {
        if (child.isMesh && child.material && child.material.emissive && child.userData.originalEmissive) {
            child.material.emissive.copy(child.userData.originalEmissive);
        }
    });

    // —— Crosshair: về trắng khi không hover ——
    const crosshair = document.getElementById('crosshair');
    if (crosshair) crosshair.classList.remove('hovering');

    hideHoverInfo();
}

function triggerInteraction(object) {
    const name = object.userData.interactiveName || object.name.toLowerCase();
    
    if (name.includes('radio') || name.includes('vintage_radio')) {
        isRadioPlaying = !isRadioPlaying;
        console.log(`[Interaction] Radio playing state: ${isRadioPlaying ? 'ON' : 'OFF'}`);
        if (radioAudio) {
            if (isRadioPlaying) {
                radioAudio.play().catch(err => console.log('[Radio] Play error:', err));
            } else {
                radioAudio.pause();
            }
        }
        toggleRadioState(object, isRadioPlaying);
    } else if (name.includes('typewriter')) {
        // Handled via MouseDown/MouseUp for continuous click-and-hold interaction
        console.log('[Interaction] Typewriter clicked (MouseDown/MouseUp handles continuous sound).');
    } else if (name.includes('paper') || name.includes('báo')) {
        console.log('Play paper rustle sound here.');
    } else if (name.includes('lamp')) {
        isLampOn = !isLampOn;
        console.log(`[Interaction] Desk Lamp switch toggle: ${isLampOn ? 'ON' : 'OFF'}`);
        if (deskLampRef) {
            deskLampRef.intensity = isLampOn ? 1.8 : 0;
        } else {
            console.warn('[Interaction] deskLampRef is not initialized in lighting.js');
        }
        toggleLampState(object, isLampOn);
    } else if (name.includes('exit_gate')) {
        import('../modules/gates.js').then(module => {
            module.triggerEndingModal();
        });
    } else {
        console.log('Interacted with ' + object.name);
    }
}
