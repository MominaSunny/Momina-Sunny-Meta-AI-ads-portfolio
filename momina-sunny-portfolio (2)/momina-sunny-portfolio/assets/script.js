// ============================================================
// Momina Sunny — Portfolio interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Nav scroll state ---------- */
  const nav = document.querySelector('.nav');
  if (nav){
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks){
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Demo videos: play only while in view ---------- */
  const demoVideos = document.querySelectorAll('video[data-autoplay]');
  if ('IntersectionObserver' in window && demoVideos.length){
    const vio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const v = entry.target;
        if (entry.isIntersecting){
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.35 });
    demoVideos.forEach(v => vio.observe(v));
  }

  /* ---------- Hero intro video: click-to-play with sound ---------- */
  const heroFrame = document.querySelector('.hero-video-frame');
  if (heroFrame){
    const video = heroFrame.querySelector('video');
    const playBtn = heroFrame.querySelector('.hero-play');
    const muteBtn = heroFrame.querySelector('.mute-toggle');

    if (playBtn && video){
      playBtn.addEventListener('click', () => {
        video.muted = false;
        video.play();
        heroFrame.classList.add('is-playing');
        if (muteBtn) muteBtn.textContent = '\u25D0  Mute';
      });
    }
    if (muteBtn && video){
      muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.textContent = video.muted ? '\u25D1  Unmute' : '\u25D0  Mute';
      });
    }
    video && video.addEventListener('ended', () => {
      heroFrame.classList.remove('is-playing');
    });
  }

});
