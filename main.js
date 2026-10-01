/* =========================================================
   Pattabi Ram S - Portfolio
   Minimal progressive enhancement: the site works without JS.
   ========================================================= */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Smooth inertia scroll (Lenis) ---------- */
  var lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })();
  }

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.hidden = true;
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  }
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      var open = mobileMenu.hidden;
      mobileMenu.hidden = !open;
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------- Reveal on scroll (with gentle per-section stagger) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    // Stagger: delay each revealing element by its order within its section
    document.querySelectorAll("section").forEach(function (sec) {
      var items = sec.querySelectorAll(".reveal");
      items.forEach(function (el, i) { el.style.transitionDelay = (Math.min(i, 8) * 0.11) + "s"; });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Parallax on marked elements ---------- */
  var parEls = document.querySelectorAll("[data-parallax]");
  if (!reduce && parEls.length) {
    var ticking = false;
    var applyParallax = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      parEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.08;
        var offset = (r.top + r.height / 2) - vh / 2;
        el.style.transform = "translateY(" + (offset * -speed).toFixed(1) + "px)";
      });
      ticking = false;
    };
    var requestParallax = function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(applyParallax); }
    };
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax, { passive: true });
    applyParallax();
  }

  /* ---------- Skill bars fill when in view ---------- */
  var skills = document.querySelectorAll(".skill");
  function fill(skill) {
    var lvl = parseInt(skill.getAttribute("data-level"), 10) || 0;
    var bar = skill.querySelector(".skill__fill");
    if (bar) bar.style.width = Math.max(0, Math.min(100, lvl)) + "%";
  }
  if (reduce || !("IntersectionObserver" in window)) {
    skills.forEach(fill);
  } else {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { fill(entry.target); sio.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    skills.forEach(function (s) { sio.observe(s); });
  }

  /* ---------- Count-up on real stat numbers ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = target + suffix; return; }
    var start = null, dur = 1100;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var val = Math.round((1 - Math.pow(1 - p, 3)) * target);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (reduce || !("IntersectionObserver" in window)) {
    counters.forEach(countUp);
  } else {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { countUp(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ---------- Scrollspy: highlight current section in nav ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("#navLinks a"));
  var byId = {};
  var sections = [];
  navLinks.forEach(function (a) {
    var id = a.getAttribute("href").slice(1);
    var sec = document.getElementById(id);
    if (sec) { byId[id] = a; sections.push(sec); }
  });
  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove("is-active"); });
          var link = byId[entry.target.id];
          if (link) link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Nav solid-on-scroll ---------- */
  var navEl = document.getElementById("nav");
  if (navEl) {
    var onScroll = function () {
      navEl.classList.toggle("is-scrolled", (window.scrollY || 0) > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Anchor links routed through Lenis ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -80 });
      else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      closeMenu();
    });
  });

  /* ---------- Hero content drift + fade on scroll ---------- */
  var heroInner = document.querySelector(".hero__inner");
  var heroCue = document.querySelector(".hero__scroll");
  if (!reduce && heroInner) {
    var hTicking = false;
    var heroDrift = function () {
      var vh = window.innerHeight || 800;
      var y = window.scrollY || window.pageYOffset || 0;
      if (y <= vh) {
        heroInner.style.transform = "translateY(" + (y * 0.35).toFixed(1) + "px)";
        heroInner.style.opacity = String(Math.max(0, 1 - y / (vh * 0.7)));
        if (heroCue) heroCue.style.opacity = String(Math.max(0, 1 - y / 160));
      }
      hTicking = false;
    };
    var reqHero = function () { if (!hTicking) { hTicking = true; requestAnimationFrame(heroDrift); } };
    window.addEventListener("scroll", reqHero, { passive: true });
    reqHero();
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
