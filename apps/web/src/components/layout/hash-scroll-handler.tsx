"use client";

import { useEffect } from "react";

function scrollToCurrentHash() {
  const rawHash = window.location.hash.slice(1);
  if (!rawHash) return;

  const target = document.getElementById(decodeURIComponent(rawHash));
  if (!target) return;

  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  // Override the global smooth scroll for this corrective jump. Cross-route
  // navigation can otherwise preserve an old scroll position while React
  // mounts the destination page.
  root.style.scrollBehavior = "auto";
  target.scrollIntoView({ block: "start" });
  root.style.scrollBehavior = previousScrollBehavior;
}

export function HashScrollHandler() {
  useEffect(() => {
    let frame = 0;
    let active = true;

    const scheduleScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(scrollToCurrentHash);
    };

    scheduleScroll();
    window.addEventListener("hashchange", scheduleScroll);

    // Font metrics can make a long landing page shift after hydration. Correct
    // the anchor once more when fonts settle so the target remains precise.
    void document.fonts.ready.then(() => {
      if (active) scheduleScroll();
    });

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scheduleScroll);
    };
  }, []);

  return null;
}
