let bannerEl: HTMLElement | null = null;

const DISMISS_KEY = 'veritas-tier-banner-dismissed';
const DISMISS_MS = 7 * 24 * 60 * 60 * 1000;

function isDismissed(): boolean {
  const ts = localStorage.getItem(DISMISS_KEY);
  if (!ts) return false;
  if (Date.now() - Number(ts) > DISMISS_MS) {
    localStorage.removeItem(DISMISS_KEY);
    return false;
  }
  return true;
}

function dismiss(): void {
  if (!bannerEl) return;
  bannerEl.classList.add('pro-banner-out');
  setTimeout(() => {
    bannerEl?.remove();
    bannerEl = null;
  }, 300);
  localStorage.setItem(DISMISS_KEY, String(Date.now()));
}

export function showProBanner(container: HTMLElement): void {
  if (bannerEl) return;
  if (isDismissed()) return;
  if (window.self !== window.top) return;

  const banner = document.createElement('div');
  banner.className = 'pro-banner';
  banner.innerHTML = `
    <span class="pro-banner-badge">PUBLIC</span>
    <span class="pro-banner-text">
      You are viewing the <strong>public monitoring layer</strong>. Request access for full analytical capabilities, intelligence briefs, and risk assessments.
    </span>
    <a class="pro-banner-cta" href="https://veritasglobal.co/contact" target="_blank" rel="noopener">Request Access →</a>
    <button class="pro-banner-close" aria-label="Dismiss">&times;</button>
  `;

  banner.querySelector('.pro-banner-close')!.addEventListener('click', (e) => {
    e.preventDefault();
    dismiss();
  });

  const header = container.querySelector('.header');
  if (header) {
    header.before(banner);
  } else {
    container.prepend(banner);
  }

  bannerEl = banner;
  requestAnimationFrame(() => banner.classList.add('pro-banner-in'));
}

export function hideProBanner(): void {
  if (!bannerEl) return;
  bannerEl.classList.add('pro-banner-out');
  setTimeout(() => {
    bannerEl?.remove();
    bannerEl = null;
  }, 300);
}

export function isProBannerVisible(): boolean {
  return bannerEl !== null;
}
