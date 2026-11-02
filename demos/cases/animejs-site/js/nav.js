import { createScope, utils, createTimeline, createDraggable, animate } from '../vendor/animejs@4.5.0/dist/modules/index.js';

var mediaQueries = {
  minM: "(min-width: 900px)",
  isM: "(min-width: 900px) and (max-width: 1199px)",
  minL: "(min-width: 1200px)"
};
await document.fonts.ready;
var navigationScope = createScope({
  mediaQueries: mediaQueries
});
navigationScope.add(s => {
  let t = document.querySelector("#site-header");
  let e = document.querySelector("#site-menu");
  let i = document.querySelector("#toggle-site-menu");
  s.add("preventDefault", n => {
    if (!t.contains(n.target)) {
      n.preventDefault();
      s.methods.closeSiteMenu();
    }
  });
  s.add("preventScroll", () => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    document.addEventListener("touchstart", s.methods.preventDefault, {
      passive: false
    });
  });
  s.add("allowScroll", () => {
    let n = document.body.style.top;
    document.removeEventListener("touchstart", s.methods.preventDefault);
    document.documentElement.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(n || "0") * -1);
  });
  if (!s.matches.minL) {
    let [n, o] = i.querySelectorAll("rect");
    let {
      offsetWidth: r,
      offsetHeight: a
    } = e;
    utils.set(e, {
      width: r * 2,
      willChange: "transform"
    });
    let l = createTimeline({
      defaults: {
        duration: 250
      },
      autoplay: false
    }).add(n, {
      rotate: ["45deg", "0deg"],
      y: [12, 8]
    }, 0).add(o, {
      rotate: ["-45deg", "0deg"],
      y: [12, 14]
    }, 0).add(t, {
      "--overlay-opacity": [1, 0]
    }, 0);
    s.data.draggable = createDraggable(e, {
      container: [0, r * 2, a, r],
      x: {
        snap: r
      },
      y: false,
      velocityMultiplier: 4,
      minVelocity: 2,
      onUpdate: c => {
        l.progress = c.progressX;
        let d = c.progressX === 0;
        let u = c.progressX === 1;
        e.classList.toggle("is-active", d);
        if (d) {
          s.methods.preventScroll();
        }
        if (u) {
          s.methods.allowScroll();
        }
      }
    });
    s.data.draggable.progressX = 1;
  }
  s.add("openSiteMenu", () => {
    if (!(s.matches.minL || e.classList.contains("is-active"))) {
      animate(s.data.draggable, {
        progressX: 0,
        ease: "outElastic(.75, 1.25)",
        duration: 500
      });
    }
  });
  s.add("closeSiteMenu", () => {
    if (!(s.matches.minL || !e.classList.contains("is-active"))) {
      animate(s.data.draggable, {
        progressX: 1,
        ease: "inOut(2.5)",
        duration: 250
      });
    }
  });
  s.add("toggleSiteMenu", () => {
    if (s.matches.minL || !e) {
      return;
    }
    if (e.classList.contains("is-active")) {
      s.methods.closeSiteMenu();
    } else {
      s.methods.openSiteMenu();
    }
  });
  return () => {
    if (e) {
      e.classList.remove("is-active");
      s.methods.allowScroll();
    }
  };
});
function handleKeyUp(s) {
  s.preventDefault();
  let t = s.ctrlKey;
  if (s.key === "g" && t) {
    document.body.classList.toggle("show-grid");
  }
}
function handleDocumentClick(s) {
  let t = s.target;
  let e = t.closest("#toggle-site-menu");
  if (e) {
    navigationScope.methods.toggleSiteMenu(e);
  }
  if (!document.getElementById("site-menu").contains(t) && !e) {
    navigationScope.methods.closeSiteMenu();
  }
}
document.addEventListener("keyup", handleKeyUp, false);
document.addEventListener("click", handleDocumentClick, false);
function changeDocumentationVersion() {
  let s = this.value;
  if (s) {
    window.location.href = s;
  }
}
var versionSelect = document.querySelector("#docs-versions select");
var versionOptions = document.querySelectorAll("#docs-versions option");
versionOptions[0].textContent = window.AnimeJS[0].version;
versionSelect.addEventListener("change", changeDocumentationVersion, false);

export { mediaQueries };
