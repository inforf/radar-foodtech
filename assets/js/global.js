// Recursos globais: consentimento de privacidade e carregamento do Microsoft Clarity.
(function () {
  'use strict';

  const CONSENT_KEY = 'radar-foodtech-clarity-consent';
  const CLARITY_ID = 'ym3ipytmvs';

  const cookieBanner = document.querySelector('.cookie-banner');
  const privacyPanel = document.querySelector('.privacy-panel');
  const privacyCard = document.querySelector('.privacy-card');
  const openPrivacyButtons = document.querySelectorAll('[data-open-privacy]');
  const closePrivacyButtons = document.querySelectorAll('[data-close-privacy]');
  const consentButtons = document.querySelectorAll('[data-consent]');

  let clarityLoaded = false;
  let lastFocusedElement = null;

  function readConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (_error) {
      return null;
    }
  }

  function storeConsent(choice) {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch (_error) {
      // Se o armazenamento estiver bloqueado, a escolha vale apenas nesta página.
    }
  }

  function updateClarityConsent(analyticsStorage) {
    if (typeof window.clarity !== 'function') return;

    window.clarity('consentv2', {
      ad_Storage: 'denied',
      analytics_Storage: analyticsStorage
    });
  }

  function loadClarity() {
    if (clarityLoaded) {
      updateClarityConsent('granted');
      return;
    }

    clarityLoaded = true;

    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () {
        (c[a].q = c[a].q || []).push(arguments);
      };

      t = l.createElement(r);
      t.async = true;
      t.src = 'https://www.clarity.ms/tag/' + i;

      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);

    updateClarityConsent('granted');
  }

  function openPrivacy() {
    if (!privacyPanel) return;

    lastFocusedElement = document.activeElement;
    privacyPanel.hidden = false;
    document.body.classList.add('privacy-open');

    const closeButton = privacyPanel.querySelector('[data-close-privacy]');
    if (closeButton) closeButton.focus();
  }

  function closePrivacy() {
    if (!privacyPanel) return;

    privacyPanel.hidden = true;
    document.body.classList.remove('privacy-open');

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function applyConsent(choice) {
    storeConsent(choice);

    if (choice === 'accepted') {
      loadClarity();
    } else {
      updateClarityConsent('denied');
    }

    if (cookieBanner) cookieBanner.hidden = true;
    closePrivacy();
  }

  function trapFocus(event) {
    if (event.key !== 'Tab' || !privacyPanel || privacyPanel.hidden || !privacyCard) return;

    const focusable = Array.from(
      privacyCard.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  openPrivacyButtons.forEach((button) => {
    button.addEventListener('click', openPrivacy);
  });

  closePrivacyButtons.forEach((button) => {
    button.addEventListener('click', closePrivacy);
  });

  consentButtons.forEach((button) => {
    button.addEventListener('click', () => applyConsent(button.dataset.consent));
  });

  if (privacyPanel) {
    privacyPanel.addEventListener('click', (event) => {
      if (event.target === privacyPanel) closePrivacy();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && privacyPanel && !privacyPanel.hidden) {
      closePrivacy();
    }

    trapFocus(event);
  });

  const savedConsent = readConsent();

  if (savedConsent === 'accepted') {
    loadClarity();
  } else if (savedConsent !== 'rejected' && cookieBanner) {
    cookieBanner.hidden = false;
  }
})();
