/* ════════════════════════════════════════
 *  브라우저 안내 모달 호출기
 *  - showBrowserNotice() 호출 시 browser-notice.html 불러와 표시
 * ════════════════════════════════════════ */
window.showBrowserNotice = async function () {
  // 중복 방지
  if (document.getElementById('bn-overlay')) return;

  try {
    const res = await fetch('browser-notice.html', { cache: 'no-cache' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const html = await res.text();

    // 임시 컨테이너에 파싱 후 body로 이동
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    const overlay = document.getElementById('bn-overlay');
    if (!overlay) return;

    // 페이드인
    requestAnimationFrame(() => overlay.classList.add('show'));

    // 닫기
    const okBtn = document.getElementById('bn-ok');
    if (okBtn) {
      okBtn.addEventListener('click', () => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 250);
      });
    }
  } catch (e) {
    console.warn('[browser-notice] 로드 실패:', e);
  }
};
