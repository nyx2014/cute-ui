import { useEffect, useId, useMemo, useSyncExternalStore } from "react";
import type { HTMLAttributes } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import islandSvg from "../../assets/island.svg?raw";
import "./loading-island.css";

gsap.registerPlugin(MotionPathPlugin);

export type LoadingIslandMotion = "auto" | "full" | "reduced";

export interface LoadingIslandProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible status text. */
  label?: string;
  motion?: LoadingIslandMotion;
  size?: "small" | "medium" | "large";
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot(): boolean {
  return (
    typeof window !== "undefined" &&
    Boolean(window.matchMedia?.(REDUCED_MOTION_QUERY).matches)
  );
}

function namespaceSvg(markup: string, namespace: string): string {
  return markup
    .replace(
      /\bid="([^"]+)"/g,
      (_match, id: string) => `id="${namespace}-${id}" data-cute-part="${id}"`,
    )
    .replace(/url\(#([^)]+)\)/g, `url(#${namespace}-$1)`)
    .replace(/href="#([^"]+)"/g, `href="#${namespace}-$1"`);
}

export function LoadingIsland({
  className,
  label = "正在加载",
  motion = "auto",
  size = "medium",
  ...divProps
}: LoadingIslandProps) {
  const systemPrefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
  const reducedMotion =
    motion === "reduced" || (motion === "auto" && systemPrefersReducedMotion);
  const generatedId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const namespace = `cute-island-${generatedId}`;
  const svgMarkup = useMemo(
    () => namespaceSvg(islandSvg, namespace),
    [namespace],
  );

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const root = document.getElementById(namespace);
    if (!root) {
      return;
    }

    const part = (name: string) =>
      root.querySelector<SVGGraphicsElement>(`[data-cute-part="${name}"]`);
    const to = (name: string, vars: gsap.TweenVars): void => {
      const target = part(name);
      if (target) {
        gsap.to(target, vars);
      }
    };

    const context = gsap.context(() => {
      to("whole-island", {
        transformOrigin: "bottom center",
        y: -15,
        rotation: 1,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      const tree = part("tree");
      if (tree) {
        gsap.fromTo(
          tree,
          { transformOrigin: "bottom center", rotation: -6 },
          {
            transformOrigin: "bottom center",
            rotation: 5,
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          },
        );
      }

      to("leaf1", {
        transformOrigin: "center right",
        y: -3,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      to("leaf2", {
        transformOrigin: "bottom right",
        rotation: -4,
        x: -3,
        y: -3,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      to("leaf3", {
        transformOrigin: "bottom center",
        rotation: -6,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      to("leaf4", {
        transformOrigin: "bottom left",
        rotation: -6,
        y: -3,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      to("leaf5", {
        transformOrigin: "top left",
        y: -3,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      to("water-circle1", {
        transformOrigin: "center center",
        scaleX: 1.2,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      to("water-circle2", {
        transformOrigin: "center center",
        scaleX: 0.8,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: -0.5,
      });

      const frontWave = part("tri-wave1");
      const backWave = part("tri-wave2");
      if (frontWave) {
        gsap.fromTo(
          frontWave,
          { x: -60 },
          { x: 20, duration: 6, repeat: -1, ease: "none" },
        );
      }
      if (backWave) {
        gsap.fromTo(
          backWave,
          { x: -10 },
          { x: 50, duration: 6, repeat: -1, ease: "none" },
        );
      }

      const triangles = root.querySelectorAll(
        '[data-cute-part="tri-wave1"] > path, [data-cute-part="tri-wave2"] > path',
      );
      gsap.fromTo(
        triangles,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          repeat: -1,
          yoyo: true,
          transformOrigin: "bottom center",
        },
      );

      const sineWaves = root.querySelectorAll(
        '[data-cute-part="sine-wave-group"] > *',
      );
      gsap.fromTo(
        sineWaves,
        { x: 0 },
        { x: 75, repeat: -1, duration: 2, ease: "none" },
      );
      gsap.fromTo(
        sineWaves,
        { scaleY: 0.8, transformOrigin: "bottom center" },
        {
          scaleY: 1.2,
          transformOrigin: "bottom center",
          repeat: -1,
          duration: 1,
          yoyo: true,
          ease: "sine.inOut",
        },
      );

      const fish = part("fish");
      const fishPath = root.querySelector<SVGPathElement>(
        '[data-cute-part="fish-path"]',
      );
      if (fish && fishPath) {
        gsap.set(fishPath, {
          scaleX: 1.3,
          scaleY: 1.3,
          transformOrigin: "bottom left",
        });
        gsap.to(fish, {
          duration: 3,
          repeat: -1,
          repeatDelay: 4,
          ease: "slow(0.3, 0.7, false)",
          motionPath: {
            path: fishPath,
            align: fishPath,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: 0,
            end: 1,
          },
        });
      }
    }, root);

    return () => context.revert();
  }, [namespace, reducedMotion]);

  const classes = [
    "cute-loading-island",
    `cute-loading-island--${size}`,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      {...divProps}
      id={namespace}
      className={classes}
      role="status"
      aria-label={label}
      aria-live="polite"
      data-motion={reducedMotion ? "reduced" : "full"}
    >
      <div
        className="cute-loading-island__svg"
        aria-hidden="true"
        // The markup is a fixed, repository-owned asset. Namespacing its IDs is
        // required so multiple component instances never share SVG references.
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
      <span className="cute-visually-hidden">{label}</span>
    </div>
  );
}

/** @deprecated Prefer the descriptive LoadingIsland name. */
export const Loading = LoadingIsland;
