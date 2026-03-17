import { t } from '@/services/i18n';
import { getDismissed, setDismissed } from '@/utils/cross-domain-storage';

const DISMISSED_KEY = 'veritas-access-widget-dismissed';
const CONTACT_URL = 'https://veritasglobal.co/contact';

export function mountCommunityWidget(): void {
  if (getDismissed(DISMISSED_KEY)) return;
  if (document.querySelector('.community-widget')) return;

  const widget = document.createElement('div');
  widget.className = 'community-widget';
  widget.innerHTML = `
    <div class="cw-pill">
      <div class="cw-dot"></div>
      <span class="cw-text">Need deeper intelligence coverage?</span>
      <a class="cw-cta" href="${CONTACT_URL}" target="_blank" rel="noopener">Request Access</a>
      <button class="cw-close" aria-label="${t('common.close')}">&times;</button>
    </div>
    <button class="cw-dismiss">${t('components.community.dontShowAgain')}</button>
  `;

  const dismiss = () => {
    widget.classList.add('cw-hiding');
    setTimeout(() => widget.remove(), 300);
  };

  widget.querySelector('.cw-close')!.addEventListener('click', dismiss);

  widget.querySelector('.cw-dismiss')!.addEventListener('click', () => {
    setDismissed(DISMISSED_KEY);
    dismiss();
  });

  document.body.appendChild(widget);
}
