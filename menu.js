/* Slide-in menu for the legal pages — same behaviour as index.html:
   closes on Esc, scrim tap or link tap; traps focus while open. */
(() => {
  const menu = document.getElementById("menu-panel");
  const scrim = document.getElementById("menu-scrim");
  const openBtn = document.getElementById("menu-open");
  const closeBtn = document.getElementById("menu-close");

  function openMenu() {
    menu.hidden = scrim.hidden = false;
    requestAnimationFrame(() => { menu.classList.add("is-open"); scrim.classList.add("is-open"); });
    openBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }
  function closeMenu(returnFocus = true) {
    menu.classList.remove("is-open"); scrim.classList.remove("is-open");
    openBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => { menu.hidden = scrim.hidden = true; }, reduce ? 0 : 200);
    if (returnFocus) openBtn.focus();
  }

  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", () => closeMenu());
  scrim.addEventListener("click", () => closeMenu());
  menu.addEventListener("click", e => { if (e.target.closest("a")) closeMenu(false); });
  document.addEventListener("keydown", e => {
    if (menu.hidden) return;
    if (e.key === "Escape") { closeMenu(); return; }
    if (e.key === "Tab") {
      const f = [...menu.querySelectorAll("a, button")];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
