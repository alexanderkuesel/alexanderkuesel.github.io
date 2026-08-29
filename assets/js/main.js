/* Small, dependency-free enhancements. The page works fine without any of it. */
(function () {
  "use strict";

  /* ---- colour theme: system by default, remembered once toggled ---- */
  var root = document.documentElement;
  var STORE_KEY = "ak-theme";

  function storedTheme() {
    try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  }
  function storeTheme(value) {
    try { localStorage.setItem(STORE_KEY, value); } catch (e) { /* private mode */ }
  }

  var saved = storedTheme();
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  var themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var current = root.getAttribute("data-theme") || (systemDark ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      storeTheme(next);
    });
  }

  /* ---- mobile menu ---- */
  var navToggle = document.querySelector(".nav__toggle");
  var navMenu = document.getElementById("nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navMenu.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- header hairline once the page has scrolled ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- highlight the section currently in view ---- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__menu a[href^="#"]'));
  var sections = links
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---- footer year ---- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
