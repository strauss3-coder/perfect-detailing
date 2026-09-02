import type { AppearanceSettings } from "@/content/types";

/**
 * The loading overlay, as server-rendered HTML.
 *
 * This is the fix for the flash of homepage on first load. The previous
 * implementation was a React component that rendered nothing on the server, so
 * the browser painted the hero, then spent a few hundred milliseconds fetching
 * and hydrating the bundle, and only then could the loader appear on top of a
 * page the visitor had already seen.
 *
 * Here the overlay is markup in the document, styled by the render-blocking
 * stylesheet, positioned before any page content. It is therefore on the
 * browser's very first paint. React never mounts it and never owns it — the
 * controller only changes one attribute on <html> to dismiss it.
 */
export function BootLoader({ appearance }: { appearance: AppearanceSettings }) {
  const { loader, motion } = appearance;

  /* Runs synchronously while the parser is still at the top of <body>, so the
     decision is made before a single pixel of the page is laid out.

     Deliberately conservative: it writes the attribute only when it is sure it
     should. No scripting, storage blocked, reduced motion, or the loader
     switched off in the portal all leave the attribute unwritten and the site
     renders immediately, which is the right way for this to fail. */
  const bootScript = `(function(){try{
var d=document.documentElement;
if(${motion.loadingScreen ? "false" : "true"})return;
if(location.pathname.indexOf('/portal')!==-1)return;
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var seen=false;try{seen=sessionStorage.getItem('pd-loaded')==='1';}catch(e){}
if(seen)return;
d.setAttribute('data-boot','loading');
window.__pdBootStart=Date.now();
}catch(e){}})();`;

  if (!motion.loadingScreen) return null;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootScript }} />

      <div className="pd-boot" aria-hidden="true">
        <span className="pd-boot__key" />

        <div className="pd-boot__stack">
          <svg className="pd-boot__mark" viewBox="0 0 64 64" fill="none">
            <defs>
              <linearGradient id="pd-boot-bead" x1="18" y1="18" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8FF4FF" />
                <stop offset="0.45" stopColor="#38E8FF" />
                <stop offset="1" stopColor="#1B6BFF" />
              </linearGradient>
            </defs>
            <path
              className="pd-boot__rule"
              d="M6 46H58"
              stroke="#C9D4DE"
              strokeOpacity="0.55"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <g className="pd-boot__bead">
              <path
                d="M22 46C14.6 43.4 16.2 26.4 32 19.5C47.8 26.4 49.4 43.4 42 46C37 47.8 27 47.8 22 46Z"
                fill="url(#pd-boot-bead)"
              />
              <path
                d="M24.6 33.4C25.2 28 28 24 31.4 22.6C28.6 25.9 27.2 29.4 27.2 33.4C27.2 34.5 25.9 35 24.6 33.4Z"
                fill="#F6F9FB"
                fillOpacity="0.85"
              />
            </g>
          </svg>

          <div>
            <p className="pd-boot__word">{loader.headline}</p>
            <p className="pd-boot__sub">{loader.subline}</p>
          </div>

          <div className="pd-boot__ticks">
            <span className="pd-boot__tick" />
            <span className="pd-boot__bar" />
            <span className="pd-boot__tick" />
          </div>
        </div>
      </div>
    </>
  );
}
