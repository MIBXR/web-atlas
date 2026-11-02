
var EmailSignup = class extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.url = this.getAttribute("url") || "";
    this.setupFormListener();
  }
  setupFormListener() {
    let t = this.querySelector("form");
    let e = this.querySelector(".email-signup-fields");
    let i = this.querySelector(".email-signup-success");
    let n = this.querySelector(".email-signup-error");
    if (t) {
      t.addEventListener("submit", o => {
        o.preventDefault();
        t.classList.add("is-pending");
        let r = this.querySelector('input[type="email"]');
        let a = r ? r.value : "";
        let l = new FormData();
        l.append("email", a);
        fetch(this.url, {
          method: "POST",
          body: l
        }).then(c => {
          if (c.ok) {
            i.classList.add("is-active");
            t.classList.remove("is-pending");
            e.classList.remove("is-active");
          } else {
            throw new Error("Network response was not ok");
          }
        }).catch(c => {
          n.classList.add("is-active");
          t.classList.remove("is-pending");
          e.classList.remove("is-active");
          setTimeout(() => {
            n.classList.remove("is-active");
            t.classList.remove("is-pending");
            e.classList.add("is-active");
          }, 2e4);
        });
      });
    }
  }
};
customElements.define("email-signup", EmailSignup);
const carbonPlaceholder = document.getElementById('carbon-responsive');
carbonPlaceholder.style.height = '161.40625px';
carbonPlaceholder.style.maxWidth = '400px';
