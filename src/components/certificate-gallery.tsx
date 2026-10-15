"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import { MotionConfig } from "motion/react";
import { ExternalLink } from "lucide-react";
import { CERTIFICATE_GROUPS } from "@/data/certificates";
import { createExpandableCards } from "@/components/vendor/aceternity/expandable-cards";
import styles from "./certificate-gallery.module.css";

const groups = CERTIFICATE_GROUPS.map((group) => ({
  title: group.title,
  // The upstream demo keys caption animations by description + useId().
  // One stable instance per certificate keeps repeated captions independent.
  cards: group.cards.map((card) => ({
    title: card.title,
    Card: createExpandableCards([
      {
        ...card,
        ctaText: <ExternalLink className="size-4" aria-hidden="true" />,
        ctaLink: card.src,
      },
    ]),
  })),
}));

function CertificateGroup({ title, cards }: (typeof groups)[number]) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current!;
    let currentModal: HTMLElement | null = null;
    let previousFocus: HTMLElement | null = null;
    const enhance = () => {
      element.querySelectorAll<HTMLElement>("ul > div").forEach((card) => {
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute(
          "aria-label",
          `Expand ${card.querySelector("h3")?.textContent || "certificate"}`,
        );
      });
      const modal = element.querySelector<HTMLElement>("div.fixed.grid");
      if (modal && modal !== currentModal) {
        previousFocus = document.activeElement as HTMLElement;
        currentModal = modal;
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute(
          "aria-label",
          modal.querySelector("h3")?.textContent || "Certificate",
        );
        const close = modal.querySelector<HTMLButtonElement>("button");
        close?.setAttribute("aria-label", "Close certificate");
        close?.focus({ preventScroll: true });
        const link = modal.querySelector<HTMLAnchorElement>("a");
        link?.setAttribute("aria-label", "Open certificate in a new tab");
        link?.setAttribute("title", "Open certificate in a new tab");
        link?.setAttribute("rel", "noopener noreferrer");
      } else if (!modal && currentModal) {
        currentModal = null;
        previousFocus?.focus({ preventScroll: true });
      }
    };
    const observer = new MutationObserver(enhance);
    observer.observe(element, { childList: true, subtree: true });
    enhance();
    return () => {
      observer.disconnect();
      if (currentModal) document.body.style.overflow = "";
    };
  }, []);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const modal = root.current?.querySelector<HTMLElement>("[role=dialog]");
    if (modal && event.key === "Tab") {
      const controls = [
        ...modal.querySelectorAll<HTMLElement>("button, a[href]"),
      ].filter((control) => control.getClientRects().length);
      const first = controls[0],
        last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
      return;
    }
    if (!modal && (event.key === "Enter" || event.key === " ")) {
      const card = (event.target as HTMLElement).closest<HTMLElement>(
        "ul > div",
      );
      if (card) {
        event.preventDefault();
        card.click();
      }
    }
  }

  return (
    <section className="flex flex-col gap-3" data-certificate-group={title}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div
        ref={root}
        className={styles.cards}
        data-certificate-cards
        onKeyDown={onKeyDown}
      >
        {cards.map(({ title, Card }) => (
          <Card key={title} />
        ))}
      </div>
    </section>
  );
}

export function CertificateGallery() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col gap-8">
        {groups.map((group) => (
          <CertificateGroup key={group.title} {...group} />
        ))}
      </div>
    </MotionConfig>
  );
}
