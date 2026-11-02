import { createTimer, utils, animate, eases, createTimeline, stagger } from '../vendor/animejs@4.5.0/dist/modules/index.js';

var SponsorsList = class extends HTMLElement {
  constructor() {
    super();
    this.abortController = null;
  }
  static get observedAttributes() {
    return ["path", "location"];
  }
  connectedCallback() {
    this.loadSponsors();
  }
  disconnectedCallback() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }
  attributeChangedCallback(t, e, i) {
    if (e !== i) {
      this.loadSponsors();
    }
  }
  get path() {
    return this.getAttribute("path") || "github-sponsors";
  }
  get location() {
    return this.getAttribute("location") || "home";
  }
  async loadSponsors() {
    if (this.abortController) {
      this.abortController.abort();
    }
    this.abortController = new AbortController();
    try {
      let t = await fetch(window.paths[this.path], {
        signal: this.abortController.signal
      });
      if (!t.ok) {
        throw new Error(`HTTP error! status: ${t.status}`);
      }
      let e = await t.text();
      this.innerHTML = e;
      let i = this.querySelectorAll(".sponsor");
      let n = this.location === "docs";
      for (let o = 0, r = i.length; o < r; o++) {
        let a = i[o];
        let l = a.dataset.urlParams;
        let c = a.dataset.urlParamsDocs;
        let d = "?ref=animejs" + (n && c ? c : l);
        a.href += d;
      }
      this.abortController = null;
    } catch (t) {
      if (t.name === "AbortError") {
        return null;
      }
      console.error("Error loading sponsors:", t);
      this.innerHTML = "";
      this.abortController = null;
    }
  }
};
customElements.define("sponsors-list", SponsorsList);
var SponsorButton = class extends HTMLElement {
  constructor() {
    super();
    this.heartsAnimation = null;
    this.pointerAnimation = null;
    this.iconAnimation = null;
    this.pointerX = 0;
    this.pointerY = 0;
    this.spread = 16;
    this.$svg = null;
    this.interval = 100;
    this.duration = 1200;
    this.randomTimer = null;
    this.autoplay = false;
    this.isHovering = false;
    this.isVisible = false;
    this.observer = null;
    this.particlePool = [];
    this.poolSize = 24;
  }
  connectedCallback() {
    let t = this.querySelector("svg.icon");
    if (t) {
      this.$svg = t;
    } else {
      let e = document.createElement("div");
      e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><g id="sponsor" fill="none" fill-rule="evenodd"><path fill="currentColor" fill-rule="nonzero" d="M12 18.445a.778.778 0 0 1-.34-.078C11.39 18.235 5 15.077 5 9.889a3.889 3.889 0 0 1 6.638-2.75L12 7.5l.362-.361A3.889 3.889 0 0 1 19 9.889c0 5.17-6.387 8.344-6.66 8.478a.778.778 0 0 1-.34.078z"></path></g></svg>';
      this.$svg = e.querySelector("svg");
    }
    if (!this.getAttribute("data-color")) {
      this.setAttribute("data-color", "0");
    }
    if (this.getAttribute("interval")) {
      this.interval = +this.getAttribute("interval");
    }
    if (this.getAttribute("duration")) {
      this.duration = +this.getAttribute("duration");
    }
    this.initParticlePool();
    this.heartsAnimation = createTimer({
      autoplay: false,
      duration: this.interval,
      loop: true,
      onLoop: () => this.emitParticle()
    });
    this.autoplay = this.getAttribute("autoplay") !== null;
    if (this.autoplay) {
      this.initObserver();
    }
    this.addEventListener("mouseenter", this);
    this.addEventListener("mousemove", this);
    this.addEventListener("mouseleave", this);
  }
  initObserver() {
    this.observer = new IntersectionObserver(t => {
      let e = t[0];
      this.isVisible = e.isIntersecting;
      if (this.isVisible && !this.isHovering) {
        this.startRandomAnimation();
      } else {
        if (!this.isVisible) {
          this.stopRandomAnimation();
        }
      }
    }, {
      threshold: 0
    });
    this.observer.observe(this);
  }
  initParticlePool() {
    for (let t = 0; t < this.poolSize; t++) {
      let e = this.$svg.cloneNode(true);
      e.style.cssText = "position: absolute; top: -12px; left: -12px; mix-blend-mode: plus-lighter; visibility: hidden;";
      e.classList.add("particle");
      this.appendChild(e);
      this.particlePool.push({
        el: e,
        inUse: false
      });
    }
  }
  getParticle() {
    let t = this.particlePool.find(e => !e.inUse);
    return t ? (t.inUse = true, t.el.style.visibility = "visible", t) : null;
  }
  releaseParticle(t) {
    t.inUse = false;
    t.el.style.visibility = "hidden";
  }
  emitParticle() {
    let t = this.getParticle();
    if (!t) {
      return;
    }
    let e = t.el;
    let i = utils.randomPick(["-=", "+="]);
    let n = i === "-=" ? "+=" : "-=";
    animate(e, {
      opacity: {
        to: [0, 1],
        duration: 150
      },
      translateX: [this.pointerX + utils.random(-this.spread, this.spread), i + (5 + utils.random(-2, 2, 2)), n + (6 + utils.random(-2, 2, 2)), i + (4 + utils.random(-2, 2, 2))],
      translateY: [{
        from: this.pointerY + utils.random(-5, 5),
        to: "-=" + utils.random(30, 50)
      }],
      scale: [{
        from: 0,
        to: .85
      }, {
        to: 0
      }],
      duration: this.duration,
      onComplete: () => this.releaseParticle(t)
    });
  }
  startRandomAnimation() {
    if (this.isHovering || !this.isVisible) {
      return;
    }
    let {
      width: t,
      height: e
    } = this.getBoundingClientRect();
    if (this.pointerAnimation) {
      this.pointerAnimation.revert();
    }
    let i = utils.randomPick([0, 1]);
    let n = (1 - eases.out(2)(utils.random(0, 1, 3))) * t * .5;
    let o = i === 0 ? n : t - n;
    let r = utils.random(e * 1.2, 0);
    this.pointerAnimation = animate(this, {
      pointerX: [o, o],
      pointerY: [r, r],
      ease: "linear",
      duration: this.interval,
      onBegin: () => this.heartsAnimation.play(),
      onComplete: () => {
        this.heartsAnimation.pause();
        this.randomTimer = createTimer({
          duration: 10,
          onComplete: () => this.startRandomAnimation()
        });
      }
    });
  }
  stopRandomAnimation() {
    if (this.randomTimer) {
      this.randomTimer.revert();
      this.randomTimer = null;
    }
    if (this.pointerAnimation) {
      this.pointerAnimation.revert();
      this.pointerAnimation = null;
    }
    this.heartsAnimation?.pause();
  }
  disconnectedCallback() {
    this.removeEventListener("mouseenter", this);
    this.removeEventListener("mousemove", this);
    this.removeEventListener("mouseleave", this);
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.stopRandomAnimation();
    if (this.heartsAnimation) {
      this.heartsAnimation.revert();
    }
    if (this.iconAnimation) {
      this.iconAnimation.revert();
    }
    this.particlePool = [];
    utils.remove(this.$svg);
  }
  mousemove(t) {
    let {
      width: e,
      height: i,
      left: n,
      top: o
    } = this.getBoundingClientRect();
    this.pointerX = utils.clamp(t.clientX - n, this.spread, e - this.spread);
    this.pointerY = utils.clamp(t.clientY - o, 0, i);
  }
  mouseenter(t) {
    this.isHovering = true;
    this.stopRandomAnimation();
    this.mousemove(t);
    if (this.iconAnimation) {
      this.iconAnimation.revert();
    }
    this.iconAnimation = animate(this.$svg, {
      scale: [1, 1.25, 1],
      loop: true,
      duration: 900
    });
    this.heartsAnimation.play();
  }
  mouseleave() {
    this.isHovering = false;
    if (this.iconAnimation) {
      this.iconAnimation.revert();
    }
    this.iconAnimation = animate(this.$svg, {
      scale: 1,
      duration: 500
    });
    this.heartsAnimation.pause();
    if (this.autoplay && this.isVisible) {
      this.startRandomAnimation();
    }
  }
  handleEvent(t) {
    if (this[t.type]) {
      this[t.type](t);
    }
  }
};
customElements.define("sponsor-button", SponsorButton);
var FundingLevel = class extends HTMLElement {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["path", "goal"];
  }
  connectedCallback() {
    this.innerHTML = `
      <div class="box-heading">
        <h3>Funding goal</h3>
        <div class="funding-level-status"><span class="percents">0%</span></div>
      </div>
      <div class="chart">
        <div style="width: 0%" class="chart-bar color-red"></div>
      </div>
      <div class="sponsors-list">Loading sponsors...</div>
      <p>
        Support the project, <sponsor-button><a href="https://github.com/sponsors/juliangarnier" target="_blank">become a sponsor</a></sponsor-button>.
      </p>
    `;
    this.$percents = this.querySelector(".percents");
    this.$chartBar = this.querySelector(".chart-bar");
    this.$sponsorsList = this.querySelector(".sponsors-list");
    this.loadSponsors();
  }
  get path() {
    return this.getAttribute("path") || "github-sponsors";
  }
  get goal() {
    return this.getAttribute("goal") || "500";
  }
  async loadSponsors() {
    try {
      let t = await fetch(window.paths[this.path]);
      if (!t.ok) {
        throw new Error(`HTTP error! status: ${t.status}`);
      }
      let e = await t.text();
      let i = document.createElement("div");
      i.innerHTML = e;
      let n = i.querySelectorAll(".sponsor");
      let o = n.length;
      let r = +this.goal;
      let a = o > 50 ? 50 : o;
      let l = o / r * 100 + "%";
      this.$percents.innerHTML = l;
      this.$chartBar.style.width = l;
      this.$sponsorsList.innerHTML = "";
      for (let c = 0; c < a; c++) {
        this.$sponsorsList.appendChild(n[c]);
      }
      createTimeline().add(this.$chartBar, {
        width: {
          from: "0%"
        }
      }).add(this.$percents, {
        innerHTML: {
          from: "0%"
        },
        modifier: utils.round(0)
      }, 0).add(this.$sponsorsList.querySelectorAll(".sponsor"), {
        opacity: {
          to: [0, 1],
          duration: 1500,
          ease: "linear"
        },
        scale: [{
          from: .9,
          to: 1.2,
          duration: 250
        }, {
          to: 1
        }],
        delay: stagger(1)
      }, 0).init();
    } catch (t) {
      this.innerHTML = `Error loading sponsors: ${t.message}`;
    }
  }
};
customElements.define("funding-level", FundingLevel);
