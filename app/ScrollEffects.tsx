"use client";

import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealSelectors = [
      ".hero-kicker",
      ".hero h1 span",
      ".hero-bottom p",
      ".round-link",
      ".hero-marquee",
      ".motivation-layout",
      ".section-heading",
      ".project-meta",
      ".project-intro",
      ".project-visual",
      ".project-details",
      ".gallery-intro",
      ".project-detail-images figure",
      ".experience-grid",
      ".page-title > p",
      ".page-title h2",
      ".page-title > span",
      ".personal-grid article",
      ".profile-grid > div",
      ".about-copy",
      ".principles article",
    ];

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors.join(",")));
    const rowItems = Array.from(document.querySelectorAll<HTMLElement>([
      ".project-details li",
      ".bio-ia-notes article",
      ".compact-projects > a",
      ".promise-block li",
      ".award-block li",
      ".future-block li",
    ].join(",")));
    const workflowSteps = Array.from(document.querySelectorAll<HTMLElement>(".ai-flow-steps article"));
    const workflowChannels = Array.from(document.querySelectorAll<HTMLElement>(".ai-channel-grid article"));
    const sectionAnchor = document.querySelector<HTMLElement>(".section-anchor");
    const anchorLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".section-anchor a"));
    const anchorTargets = anchorLinks
      .map((link) => {
        const target = document.querySelector<HTMLElement>(link.hash);
        return target ? { link, target } : null;
      })
      .filter((item): item is { link: HTMLAnchorElement; target: HTMLElement } => item !== null);
    const anchorEndSection = document.querySelector<HTMLElement>("#personal");
    const mobileAnchorQuery = window.matchMedia("(max-width: 640px)");
    let anchorTimer: number | undefined;
    let scrollWatchFrame: number | undefined;
    let lastScrollY = window.scrollY;

    revealItems.forEach((item) => {
      item.classList.add("scroll-reveal");
    });

    document.querySelectorAll(".project").forEach((project) => {
      project.querySelector<HTMLElement>(".project-meta")?.style.setProperty("--reveal-delay", "0ms");
      project.querySelector<HTMLElement>(".project-intro")?.style.setProperty("--reveal-delay", "90ms");
      project.querySelector<HTMLElement>(".project-visual")?.style.setProperty("--reveal-delay", "180ms");
      project.querySelector<HTMLElement>(".project-details")?.style.setProperty("--reveal-delay", "70ms");
    });

    document.querySelectorAll(".gallery-section").forEach((section) => {
      section.querySelector<HTMLElement>(".gallery-intro")?.style.setProperty("--reveal-delay", "0ms");
      section.querySelectorAll<HTMLElement>(".project-detail-images figure").forEach((item, index) => {
        item.style.setProperty("--reveal-delay", `${120 + Math.min(index, 4) * 70}ms`);
      });
    });

    document.querySelectorAll<HTMLElement>(".hero-kicker, .hero h1 span, .hero-bottom p, .round-link, .hero-marquee").forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${index * 90}ms`);
    });

    document.querySelectorAll(".page-title").forEach((title) => {
      title.querySelector<HTMLElement>("p")?.style.setProperty("--reveal-delay", "0ms");
      title.querySelector<HTMLElement>("h2")?.style.setProperty("--reveal-delay", "80ms");
      title.querySelector<HTMLElement>("span")?.style.setProperty("--reveal-delay", "150ms");
    });

    document.querySelectorAll<HTMLElement>(".personal-grid article, .profile-grid > div, .principles article").forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 80}ms`);
    });

    rowItems.forEach((row) => {
      row.classList.add("scroll-reveal", "row-reveal");
    });

    const rowGroups = [
      ".project-details ul",
      ".bio-ia-notes",
      ".compact-projects",
      ".promise-block ul",
      ".award-block ol",
      ".future-block ul",
    ];

    rowGroups.forEach((selector) => {
      document.querySelectorAll(selector).forEach((group) => {
        group.querySelectorAll<HTMLElement>(".row-reveal").forEach((row, index) => {
          row.style.setProperty("--reveal-delay", `${index * 120}ms`);
        });
      });
    });

    workflowSteps.forEach((item, index) => {
      item.classList.add("scroll-reveal");
      item.style.setProperty("--reveal-delay", `${index * 150}ms`);
    });

    workflowChannels.forEach((item, index) => {
      item.classList.add("scroll-reveal");
      item.style.setProperty("--reveal-delay", `${620 + index * 90}ms`);
    });

    const syncAnchorState = () => {
      if (!anchorTargets.length) return;
      const anchorLine = window.innerHeight * 0.34;
      const pageAnchorLine = window.scrollY + anchorLine;
      const anchorEnd = anchorEndSection ? anchorEndSection.offsetTop + anchorEndSection.offsetHeight : Number.POSITIVE_INFINITY;
      sectionAnchor?.classList.toggle("is-outside", window.scrollY <= 2 || pageAnchorLine > anchorEnd);
      const activeItem = anchorTargets.reduce((current, item) => {
        const rect = item.target.getBoundingClientRect();
        if (rect.top <= anchorLine && rect.bottom > anchorLine) return item;
        return current;
      }, anchorTargets[0]);

      anchorTargets.forEach(({ link }) => {
        link.classList.toggle("is-active", link === activeItem.link);
      });
    };

    const revealAnchorAfterScroll = () => {
      if (!sectionAnchor || !mobileAnchorQuery.matches) return;
      sectionAnchor.classList.add("is-hidden");
      if (anchorTimer) window.clearTimeout(anchorTimer);
      anchorTimer = window.setTimeout(() => {
        sectionAnchor.classList.remove("is-hidden");
      }, 500);
    };

    if (reduceMotion) {
      [...revealItems, ...rowItems, ...workflowSteps, ...workflowChannels].forEach((item) => item.classList.add("is-visible"));
      syncAnchorState();
      return;
    }

    const showVisibleItems = () => {
      const viewportHeight = window.innerHeight || 1;

      [...revealItems, ...rowItems, ...workflowSteps, ...workflowChannels].forEach((item) => {
        if (item.classList.contains("is-visible")) return;
        const rect = item.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.9 && rect.bottom > viewportHeight * 0.05) {
          item.classList.add("is-visible");
        }
      });

      syncAnchorState();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 }
    );

    [...revealItems, ...rowItems, ...workflowSteps, ...workflowChannels].forEach((item) => observer.observe(item));

    showVisibleItems();
    syncAnchorState();
    const handleScroll = () => {
      showVisibleItems();
      revealAnchorAfterScroll();
    };
    const handleAnchorMove = () => {
      revealAnchorAfterScroll();
    };
    const watchScrollPosition = () => {
      if (window.scrollY !== lastScrollY) {
        lastScrollY = window.scrollY;
        showVisibleItems();
        revealAnchorAfterScroll();
      }
      scrollWatchFrame = window.requestAnimationFrame(watchScrollPosition);
    };
    const initialTimers = [
      window.setTimeout(showVisibleItems, 120),
      window.setTimeout(showVisibleItems, 420),
    ];
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleAnchorMove, { passive: true });
    window.addEventListener("touchmove", handleAnchorMove, { passive: true });
    window.addEventListener("resize", showVisibleItems);
    scrollWatchFrame = window.requestAnimationFrame(watchScrollPosition);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleAnchorMove);
      window.removeEventListener("touchmove", handleAnchorMove);
      window.removeEventListener("resize", showVisibleItems);
      initialTimers.forEach((timer) => window.clearTimeout(timer));
      if (anchorTimer) window.clearTimeout(anchorTimer);
      if (scrollWatchFrame) window.cancelAnimationFrame(scrollWatchFrame);
    };
  }, []);

  return null;
}
