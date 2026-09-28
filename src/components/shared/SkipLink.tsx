"use client";

/**
 * Keyboard-only "skip to main content" link. Targets #main-content, but
 * during the phased page migration (see WHATS91_UI_ROLLOUT_PLAN.md) not
 * every page exposes that id yet, so the click handler falls back to the
 * page's <main> element so the link stays functional on every route.
 * When a page adds id="main-content" (see WHATS91_PAGE_MIGRATION_GUIDE.md),
 * this becomes a plain, no-JS-required anchor jump.
 */
export function SkipLink() {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const target =
      document.getElementById("main-content") ?? document.querySelector("main");
    if (!target) return;

    event.preventDefault();
    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
    }
    (target as HTMLElement).focus();
    target.scrollIntoView({ block: "start" });
  }

  return (
    <a href="#main-content" onClick={handleClick} className="skip-link">
      Skip to main content
    </a>
  );
}
