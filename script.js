// ============================================================
// Fox Innovation & Technologies — page interactions
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile nav after clicking a link
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Header shadow / active link on scroll ---------- */
  var navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute('href');
    var target = document.querySelector(id);
    if (target) sections.push({ link: link, target: target });
  });

  function updateActiveLink() {
    var scrollPos = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function (item) {
      if (item.target.offsetTop <= scrollPos) current = item;
    });
    navLinks.forEach(function (l) { l.classList.remove('active'); });
    if (current) current.link.classList.add('active');
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---------- FAQ accordion ---------- */
  var triggers = document.querySelectorAll('.accordion-trigger');

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var item = trigger.closest('.accordion-item');
      var panel = item.querySelector('.accordion-panel');
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other panels (single-open accordion)
      triggers.forEach(function (t) {
        if (t !== trigger) {
          t.setAttribute('aria-expanded', 'false');
          var otherPanel = t.closest('.accordion-item').querySelector('.accordion-panel');
          otherPanel.style.maxHeight = null;
        }
      });

      if (isOpen) {
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Video play button ---------- */
  var videoFrame = document.getElementById('videoFrame');
  var playBtn = document.getElementById('playBtn');

  function handlePlay() {
    if (!videoFrame) return;
    // Placeholder behaviour: this is where a real <video> or embed
    // would be swapped in. For now we just indicate "playing" state.
    videoFrame.classList.toggle('is-playing');
    playBtn.setAttribute('aria-label',
      videoFrame.classList.contains('is-playing') ? 'Pause video' : 'Play video'
    );
  }

  if (videoFrame) {
    videoFrame.addEventListener('click', handlePlay);
    videoFrame.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePlay();
      }
    });
  }

  /* ---------- Smooth scroll for same-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          var headerOffset = 80;
          var top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

});

// ============================================================
// Services page — flip card toggle (Engineering Services grid)
// ============================================================
document.addEventListener('DOMContentLoaded', function () {

  var flipTriggers = document.querySelectorAll('.flip-card-trigger');

  flipTriggers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.flip-card');
      if (card) {
        card.classList.toggle('is-flipped');
      }
    });
  });

});
