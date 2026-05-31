// ── Hover Panel — hiện thông tin nhanh khi ngắm tranh ────────
export const displayPaintingInfo = (info) => {
  const panel = document.getElementById('painting-info');

  panel.innerHTML = `
    <h3>${info.title}</h3>
    <p>${info.hoverText || info.description?.substring(0, 60) + '...' || ''}</p>
    <p class="hint">[ Click để xem chi tiết ]</p>
  `;
  panel.classList.add('show');
};

// ── Ẩn hover panel ─────────────────────────────────────────────
export const hidePaintingInfo = () => {
  const panel = document.getElementById('painting-info');
  panel.classList.remove('show');
};
