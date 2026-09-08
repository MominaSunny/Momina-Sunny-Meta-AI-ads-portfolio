(function () {
  "use strict";

  /* ---------------------------------------------
     HEADER SCROLL STATE
  --------------------------------------------- */
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------
     MOBILE MENU
  --------------------------------------------- */
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  function closeMobileMenu() {
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function openMobileMenu() {
    menuToggle.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    mobileNav.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.contains("is-open");
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  document.querySelectorAll(".mobile-link, .mobile-cta").forEach((el) => {
    el.addEventListener("click", closeMobileMenu);
  });

  /* ---------------------------------------------
     ACTIVE NAV LINK ON SCROLL
  --------------------------------------------- */
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = "#" + entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle("active-link", link.getAttribute("href") === id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((sec) => navObserver.observe(sec));

  /* ---------------------------------------------
     SCROLL REVEAL
  --------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    ".capability-card, .project-card, .process-step, .featured-item, .approach-card, .about-body-col, .about-heading-col"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ---------------------------------------------
     PROJECT CARD VIDEO — PLAY ON HOVER / VIEWPORT (MOBILE)
  --------------------------------------------- */
  document.querySelectorAll(".project-media").forEach((media) => {
    const video = media.querySelector("video");
    if (!video) return;
    media.addEventListener("mouseenter", () => video.play().catch(() => {}));
    media.addEventListener("mouseleave", () => video.pause());
  });

  /* ---------------------------------------------
     FILTER SYSTEM
  --------------------------------------------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");

      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        const cats = card.dataset.category.split(" ");
        const show = filter === "all" || cats.includes(filter);
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------------------------------------------
     PROJECT DATA (no invented stats — only provided info)
  --------------------------------------------- */
  const PROJECTS = {
    "software-house": {
      title: "Software House Advertisement",
      category: "AI Video Ad — Meta, Instagram, Facebook",
      video: "assets/videos/software-house.mp4",
      objective: "Promote a software house with a modern, technology-forward advertising concept.",
      concept: "A promotional AI video concept combining modern technology visuals with cinematic storytelling and a contemporary advertising direction.",
      audience: "Businesses and decision-makers exploring software development partners on social platforms.",
      hook: "An opening visual built to signal innovation and technical credibility within the first seconds.",
      visual: "Cinematic, tech-forward visuals paired with a contemporary, confident advertising tone.",
      cta: "Introduce the software house's capability and prompt further interest.",
      tools: "AI video generation, prompt engineering, video editing",
    },
    "music-app": {
      title: "Music App Advertisement",
      category: "AI Video Ad — Meta, Instagram",
      video: "assets/videos/music-app-ad.mp4",
      objective: "Communicate a modern music application's experience through visual storytelling.",
      concept: "A short-form promotional concept using cinematic AI-generated visuals to convey the feel of the app.",
      audience: "Social media users discovering new music and lifestyle apps.",
      hook: "A visually immersive opening designed to convey mood and energy quickly.",
      visual: "Cinematic, rhythm-driven visuals suited to a modern music brand.",
      cta: "Invite viewers to experience the app for themselves.",
      tools: "AI video generation, creative direction, video editing",
    },
    perfume: {
      title: "Luxury Perfume Advertisement",
      category: "Product Advertisement — Instagram, Facebook",
      video: "assets/videos/perfume-ad.mp4",
      objective: "Present a luxury perfume with an elegant, premium advertising treatment.",
      concept: "A cinematic luxury product advertisement focused on elegant product presentation and premium visual direction.",
      audience: "Consumers of premium fragrance and luxury lifestyle products.",
      hook: "A slow, elegant reveal designed to convey exclusivity from the first frame.",
      visual: "Refined, editorial lighting and composition with a premium, memorable tone.",
      cta: "Position the fragrance as a desirable, premium choice.",
      tools: "AI video generation, prompt engineering, creative direction",
    },
    "nail-oil": {
      title: "Nail Oil Advertisement",
      category: "Beauty Product Ad — Meta, Instagram",
      video: "assets/videos/nail-oil-ad.mp4",
      objective: "Showcase a nail oil product with a clean, premium beauty advertising approach.",
      concept: "A beauty product advertising concept focused on clean product visuals and premium presentation.",
      audience: "Beauty and self-care audiences active on Instagram and Facebook.",
      hook: "A clean, close-up opening that draws attention to the product's texture and quality.",
      visual: "Minimal, well-lit product visuals with a short-form social storytelling structure.",
      cta: "Highlight the product's benefit and encourage viewers to explore further.",
      tools: "AI video generation, product visualization, video editing",
    },
  };

  /* ---------------------------------------------
     MODAL
  --------------------------------------------- */
  const overlay = document.getElementById("modalOverlay");
  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modalClose");
  const modalVideo = document.getElementById("modalVideo");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalObjective = document.getElementById("modalObjective");
  const modalConcept = document.getElementById("modalConcept");
  const modalAudience = document.getElementById("modalAudience");
  const modalHook = document.getElementById("modalHook");
  const modalVisual = document.getElementById("modalVisual");
  const modalCta = document.getElementById("modalCta");
  const modalTools = document.getElementById("modalTools");

  let lastFocusedEl = null;

  function openModal(key) {
    const data = PROJECTS[key];
    if (!data) return;

    lastFocusedEl = document.activeElement;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalObjective.textContent = data.objective;
    modalConcept.textContent = data.concept;
    modalAudience.textContent = data.audience;
    modalHook.textContent = data.hook;
    modalVisual.textContent = data.visual;
    modalCta.textContent = data.cta;
    modalTools.textContent = data.tools;

    modalVideo.querySelector("source") ||
      modalVideo.appendChild(document.createElement("source"));
    let source = modalVideo.querySelector("source");
    if (!source) {
      source = document.createElement("source");
      modalVideo.appendChild(source);
    }
    source.src = data.video;
    source.type = "video/mp4";
    modalVideo.load();

    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    modalClose.focus();

    document.addEventListener("keydown", onModalKeydown);
  }

  function closeModal() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    modalVideo.pause();
    document.removeEventListener("keydown", onModalKeydown);
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function onModalKeydown(e) {
    if (e.key === "Escape") {
      closeModal();
      return;
    }
    if (e.key === "Tab") {
      const focusables = modal.querySelectorAll(
        'button, [href], video, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  document.querySelectorAll(".view-project-btn, .project-media").forEach((el) => {
    el.addEventListener("click", (e) => {
      const card = e.currentTarget.closest(".project-card");
      if (card) openModal(card.dataset.project);
    });
  });

  modalClose.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
})();
