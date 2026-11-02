import { utils } from '../vendor/animejs@4.5.0/dist/modules/index.js';
import { WebGLRenderer, SRGBColorSpace, Scene, Color, PerspectiveCamera, AmbientLight, DirectionalLight } from 'three';
import { CSS3DRenderer } from '../vendor/three@0.172.0/examples/jsm/renderers/CSS3DRenderer.js';
import { CSS2DRenderer } from '../vendor/three@0.172.0/examples/jsm/renderers/CSS2DRenderer.js';

var ConnectorLine = class {
  constructor(connector1, connector2, flipped) {
    this.$connector1 = connector1;
    this.$connector2 = connector2;
    this.$el = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    this.$el.setAttribute("points", "0 0 32 0 64 32");
    this.$el.style.stroke = "var(--hex-fg-4)";
    this.$el.style.fill = "none";
    this.$el.style.strokeWidth = "1px";
    this.$el.style.strokeLinejoin = "square";
    this.flipped = flipped;
    this.rect1 = this.$connector1.getBoundingClientRect();
    this.rect2 = this.$connector2.getBoundingClientRect();
    this.gap = 4;
    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.renders = 0;
  }
  updatePoints(item2, index2, total, total2, total3, total4) {
    this.$el.setAttribute("points", `${item2} ${index2} ${total} ${total2} ${total3} ${total4}`);
  }
  updateConnector1Dimensions() {
    this.rect1 = this.$connector1.getBoundingClientRect();
  }
  updateCoords() {
    if (!this.renders) {
      let value4 = this.$connector2.style.transform;
      if (value4) {
        let value3 = value4.split(") translate(");
        if (value3.length) {
          let value2 = value3[1].split(", ");
          if (value2.length) {
            this.targetX = parseFloat(value2[0]);
            this.targetY = parseFloat(value2[1]);
            if (!this.x && !this.y) {
              this.x = this.targetX;
              this.y = this.targetY;
            }
          }
        }
      }
    }
    this.x = utils.lerp(this.x, this.targetX, .25);
    this.y = utils.lerp(this.y, this.targetY, .25);
    this.renders++;
    if (this.renders > 3) {
      this.renders = 0;
    }
    let value21 = this.rect1.height / 2 + 1;
    let value22 = this.rect1.top;
    let value23 = this.y;
    let value24 = value23 + value21 - (value22 + value21);
    if (this.flipped) {
      let value5 = this.rect1.left - this.gap;
      let value6 = value22 + value21;
      let value7 = this.x;
      let value8 = value23 + value21;
      let value9 = Math.abs(value24);
      let value10 = value5 - value7;
      if (value9 > value10) {
        value9 = Math.max(0, value10);
      }
      let value11 = value7 + value9;
      let value12 = value6;
      this.updatePoints(value5, value6, value11, value12, value7, value8);
    } else {
      let value13 = this.gap + this.rect1.right;
      let value14 = value22 + value21;
      let value15 = this.x;
      let value16 = value23 + value21;
      let value17 = Math.abs(value24);
      let value18 = value15 - value13;
      if (value17 > value18) {
        value17 = Math.max(0, value18);
      }
      let value19 = value15 - value17;
      let value20 = value14;
      this.updatePoints(value13, value14, value19, value20, value15, value16);
    }
  }
};
var ConnectorOverlay = class {
  constructor(parent) {
    let value25 = document.createElement("div");
    value25.innerHTML = `
    <svg id="path-animation" viewBox="0 0 0 0"></svg>
    `;
    this.$el = value25.firstElementChild;
    this.$path = this.$el.querySelector("polyline");
    this.lines = [];
    this.$parent = parent;
    this.$parent.appendChild(this.$el);
    this.updateDimensions();
  }
  createLine(connector1, connector2, flipped, colorClass) {
    let connectorLine = new ConnectorLine(connector1, connector2, flipped);
    if (colorClass) {
      connectorLine.$el.classList.add(colorClass);
    }
    this.$el.appendChild(connectorLine.$el);
    this.lines.push(connectorLine);
  }
  update() {
    for (let value26 = 0, value27 = this.lines.length; value26 < value27; value26++) {
      this.lines[value26].updateCoords();
    }
  }
  updateDimensions() {
    let value28 = this.$parent.offsetWidth;
    let value29 = this.$parent.offsetHeight;
    this.$el.setAttribute("viewBox", `0 0 ${value28} ${value29}`);
    this.lines.forEach(item3 => item3.updateConnector1Dimensions());
  }
};
var Stage = class {
  constructor() {
    this.domViewportEl = document.getElementById("engine");
    this.renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: false,
      alpha: false,
      stencil: false,
      depth: false
    });
    this.renderer.setPixelRatio(1);
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.domElement.id = "renderer";
    this.renderer.info.autoReset = false;
    this.CSSRenderer = new CSS3DRenderer();
    this.CSSRenderer.domElement.id = "css-renderer";
    this.labelsRenderer = new CSS2DRenderer();
    this.labelsRenderer.domElement.id = "labels-renderer";
    this.width = this.domViewportEl.offsetWidth;
    this.height = this.domViewportEl.offsetHeight;
    this.aspectRatio = this.width / this.height;
    this.lines = new ConnectorOverlay(this.labelsRenderer.domElement);
    this.scene = new Scene();
    this.scene.background = new Color(16777215);
    this.fov = 40;
    this.camera = new PerspectiveCamera(this.fov, this.aspectRatio, 1, 1e3);
    this.$output = document.createElement("div");
    let raw = String.raw;
    this.$output.innerHTML = raw`
      <svg class="output-progress-bg" viewBox="0 0 614 614">
        <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="5">
          <path d="M310.500816,16.5151574 C388.463924,17.3029412 459.084769,48.7495124 510.882318,99.3738384"></path>
          <path d="M515.130663,103.611934 C565.939831,155.348014 597.563252,225.989466 598.479596,304.014416"></path>
          <path d="M598.488972,310.001429 C597.830864,388.162526 566.358163,458.974586 515.625661,510.882819"></path>
          <path d="M511.387565,515.131164 C459.543848,566.04604 388.716012,597.695256 310.497994,598.484871"></path>
          <path d="M304.498499,598.484829 C226.280452,597.694123 155.454223,566.04513 103.611433,515.131164" ></path>
          <path d="M99.3733373,510.882819 C48.6401567,458.973892 17.1672932,388.160634 16.51,309.998296"></path>
          <path d="M16.5201414,303.999 C17.4402555,225.979392 49.06279,155.344325 99.8683349,103.611934"></path>
          <path d="M104.11668,99.3738384 C155.911216,48.7524579 226.526856,17.3066006 304.484574,16.5150897"></path>
        </g>
      </svg>
      <svg class="output-progress" viewBox="0 0 614 614">
        <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="5">
          <path d="M310.500816,16.5151574 C388.463924,17.3029412 459.084769,48.7495124 510.882318,99.3738384"></path>
          <path d="M515.130663,103.611934 C565.939831,155.348014 597.563252,225.989466 598.479596,304.014416"></path>
          <path d="M598.488972,310.001429 C597.830864,388.162526 566.358163,458.974586 515.625661,510.882819"></path>
          <path d="M511.387565,515.131164 C459.543848,566.04604 388.716012,597.695256 310.497994,598.484871"></path>
          <path d="M304.498499,598.484829 C226.280452,597.694123 155.454223,566.04513 103.611433,515.131164" ></path>
          <path d="M99.3733373,510.882819 C48.6401567,458.973892 17.1672932,388.160634 16.51,309.998296"></path>
          <path d="M16.5201414,303.999 C17.4402555,225.979392 49.06279,155.344325 99.8683349,103.611934"></path>
          <path d="M104.11668,99.3738384 C155.911216,48.7524579 226.526856,17.3066006 304.484574,16.5150897"></path>
        </g>
      </svg>

      <div id="intuitive-demo" class="feature-demo">
        <div class="shape square fill"></div>
      </div>

      <div id="additive-demo" class="feature-demo">
        <div class="shape circle"></div>
        <div class="shape square"></div>
        <div class="shape circle fill"></div>
        <div class="shape square fill"></div>
        <div class="shape circle"></div>
        <div class="shape square"></div>
        <div class="shape circle fill"></div>
        <div class="shape square fill"></div>
        <div class="shape circle"></div>
        <div class="shape square"></div>
        <div class="shape circle fill"></div>
        <div class="shape square fill"></div>
      </div>

      <div id="scrollable-demo" class="feature-demo">
        <svg id="sphere-animation" viewBox="0 0 402 402">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M342.057269,342.05826 C317.650269,366.46626 290.938269,379.32826 282.395269,370.78526 C273.853269,362.24226 286.714269,335.53026 311.121269,311.12226 C335.529269,286.71526 362.241269,273.85326 370.784269,282.39626 C379.326269,290.93926 366.465269,317.65126 342.057269,342.05826 L342.057269,342.05826 Z" fill-rule="nonzero" stroke-dasharray="280.7113952636719"></path>
            <path d="M341.173269,341.17426 C305.294269,377.05426 265.919269,395.85126 253.227269,383.15926 C240.535269,370.46726 259.332269,331.09226 295.212269,295.21226 C331.091269,259.33326 370.466269,240.53626 383.158269,253.22826 C395.850269,265.92026 377.053269,305.29526 341.174269,341.17426 L341.173269,341.17426 Z" fill-rule="nonzero" stroke-dasharray="413.3923645019531"></path>
            <path d="M337.638269,337.63926 C292.728269,382.54926 243.262269,405.89726 227.153269,389.78826 C211.043269,373.67826 234.391269,324.21326 279.302269,279.30326 C324.212269,234.39326 373.678269,211.04426 389.787269,227.15326 C405.897269,243.26326 382.548269,292.72926 337.638269,337.63926 Z" fill-rule="nonzero" stroke-dasharray="518.689697265625"></path>
            <path d="M331.451269,331.45226 C278.241269,384.66126 219.872269,412.55926 201.078269,393.76526 C182.284269,374.97226 210.183269,316.60226 263.392269,263.39326 C316.601269,210.18326 374.971269,182.28526 393.765269,201.07926 C412.559269,219.87326 384.660269,278.24326 331.451269,331.45226 L331.451269,331.45226 Z" fill-rule="nonzero" stroke-dasharray="612.8993530273438"></path>
            <path d="M323.496269,323.49726 C263.696269,383.29626 198.204269,414.75726 177.213269,393.76526 C156.223269,372.77526 187.683269,307.28226 247.482269,247.48326 C307.281269,187.68326 372.774269,156.22326 393.765269,177.21426 C414.755269,198.20426 383.295269,263.69826 323.495269,323.49726 L323.496269,323.49726 Z" fill-rule="nonzero" stroke-dasharray="688.08056640625"></path>
            <path d="M315.099269,315.10026 C249.930269,380.26926 178.402269,414.40026 155.337269,391.33526 C132.272269,368.26926 166.403269,296.74226 231.572269,231.57326 C296.741269,166.40426 368.269269,132.27326 391.334269,155.33826 C414.399269,178.40326 380.268269,249.93126 315.099269,315.10026 Z" fill-rule="nonzero" stroke-dasharray="750.9237060546875"></path>
            <path d="M305.376269,305.37726 C235.570269,375.18326 158.996269,411.78826 134.345269,387.13726 C109.693269,362.48526 146.298269,285.91126 216.104269,216.10526 C285.910269,146.29926 362.484269,109.69426 387.135269,134.34526 C411.787269,158.99826 375.182269,235.57126 305.376269,305.37726 Z" fill-rule="nonzero" stroke-dasharray="804.0537109375"></path>
            <path d="M293.443269,293.44526 C220.221269,366.66826 139.888269,405.05426 114.015269,379.18126 C88.143269,353.30926 126.529269,272.97626 199.752269,199.75326 C272.975269,126.53026 353.308269,88.1442597 379.181269,114.01626 C405.053269,139.88926 366.667269,220.22126 293.444269,293.44526 L293.443269,293.44526 Z" fill-rule="nonzero" stroke-dasharray="843.49072265625"></path>
            <path d="M280.628269,280.62826 C204.719269,356.53726 121.518269,396.40626 94.791269,369.68026 C68.065269,342.95326 107.934269,259.75126 183.842269,183.84326 C259.750269,107.93526 342.952269,68.0652597 369.679269,94.7922597 C396.405269,121.51826 356.536269,204.72026 280.628269,280.62826 L280.628269,280.62826 Z" fill-rule="nonzero" stroke-dasharray="873.8916015625"></path>
            <path d="M265.160269,265.16026 C187.543269,342.77726 102.857269,383.93326 76.008269,357.08426 C49.160269,330.23626 90.316269,245.55026 167.932269,167.93426 C245.549269,90.3162597 330.235269,49.1602597 357.083269,76.0082597 C383.932269,102.85726 342.776269,187.54326 265.160269,265.15926 L265.160269,265.16026 Z" fill-rule="nonzero" stroke-dasharray="890.8994140625"></path>
            <path d="M249.692269,248.80926 C171.587269,326.91326 86.505269,368.46526 59.657269,341.61626 C32.808269,314.76826 74.360269,229.68626 152.464269,151.58126 C230.569269,73.4772597 315.651269,31.9252597 342.499269,58.7742597 C369.348269,85.6222597 327.796269,170.70426 249.692269,248.80926 L249.692269,248.80926 Z" fill-rule="nonzero" stroke-dasharray="895.5676879882812"></path>
            <path d="M233.340269,233.34026 C155.723269,310.95826 71.037269,352.11426 44.189269,325.26626 C17.340269,298.41626 58.496269,213.73026 136.113269,136.11326 C213.729269,58.4972597 298.415269,17.3412597 325.263269,44.1902597 C352.113269,71.0382597 310.956269,155.72426 233.340269,233.34026 Z" fill-rule="nonzero" stroke-dasharray="890.8988037109375"></path>
            <path d="M217.430269,217.43026 C141.522269,293.34026 58.320269,333.20926 31.593269,306.48326 C4.86726902,279.75626 44.736269,196.55526 120.645269,120.64626 C196.553269,44.7382597 279.755269,4.86925972 306.481269,31.5962597 C333.208269,58.3222597 293.338269,141.52426 217.430269,217.43226 L217.430269,217.43026 Z" fill-rule="nonzero" stroke-dasharray="873.893798828125"></path>
            <path d="M201.520269,201.52026 C128.297269,274.74526 47.963269,313.13026 22.092269,287.25926 C-3.78073098,261.38626 34.605269,181.05326 107.828269,107.83026 C181.053269,34.6062597 261.384269,-3.77974028 287.257269,22.0922597 C313.129269,47.9652597 274.743269,128.29826 201.520269,201.52126 L201.520269,201.52026 Z" fill-rule="nonzero" stroke-dasharray="843.4929809570312"></path>
            <path d="M185.610269,185.61026 C115.804269,255.41726 39.230269,292.02226 14.579269,267.37026 C-10.072731,242.71826 26.532269,166.14526 96.338269,96.3392597 C166.144269,26.5322597 242.718269,-10.0717403 267.369269,14.5792597 C292.021269,39.2312597 255.416269,115.80526 185.610269,185.61126 L185.610269,185.61026 Z" fill-rule="nonzero" stroke-dasharray="804.0543212890625"></path>
            <path d="M169.700269,169.70126 C104.531269,234.87026 33.004269,269.00126 9.93826902,245.93626 C-13.126731,222.87126 21.004269,151.34326 86.173269,86.1742597 C151.342269,21.0052597 222.870269,-13.1257403 245.935269,9.93925972 C269.000269,33.0042597 234.869269,104.53226 169.700269,169.70126 Z" fill-rule="nonzero" stroke-dasharray="750.9235229492188"></path>
            <path d="M153.790269,153.79126 C93.991269,213.59126 28.498269,245.05126 7.50826902,224.06026 C-13.482731,203.07026 17.978269,137.57626 77.776269,77.7772597 C137.576269,17.9782597 203.068269,-13.4827403 224.059269,7.50825972 C245.049269,28.4992597 213.589269,93.9922597 153.790269,153.79126 L153.790269,153.79126 Z" fill-rule="nonzero" stroke-dasharray="688.0787353515625"></path>
            <path d="M137.880269,137.88126 C84.671269,191.09126 26.302269,218.98926 7.50826902,200.19526 C-11.285731,181.40126 16.612269,123.03126 69.821269,69.8222597 C123.031269,16.6132597 181.401269,-11.2857403 200.194269,7.50825972 C218.988269,26.3022597 191.089269,84.6722597 137.880269,137.88126 Z" fill-rule="nonzero" stroke-dasharray="612.899169921875"></path>
            <path d="M121.970269,121.97126 C77.060269,166.88126 27.594269,190.23026 11.485269,174.12126 C-4.62473098,158.01126 18.724269,108.54526 63.635269,63.6352597 C108.545269,18.7252597 158.010269,-4.62274028 174.120269,11.4852597 C190.229269,27.5952597 166.880269,77.0612597 121.970269,121.97126 Z" fill-rule="nonzero" stroke-dasharray="518.690673828125"></path>
            <path d="M106.061269,106.06126 C70.181269,141.94126 30.806269,160.73826 18.114269,148.04626 C5.42226902,135.35426 24.219269,95.9792597 60.099269,60.0992597 C95.978269,24.2202597 135.353269,5.42325972 148.045269,18.1152597 C160.737269,30.8072597 141.940269,70.1822597 106.061269,106.06126 Z" fill-rule="nonzero" stroke-dasharray="413.3919372558594"></path>
            <path d="M90.151269,90.1522597 C65.743269,114.55926 39.031269,127.42026 30.488269,118.87826 C21.946269,110.33526 34.807269,83.6232597 59.215269,59.2162597 C83.622269,34.8082597 110.335269,21.9462597 118.877269,30.4892597 C127.420269,39.0322597 114.558269,65.7442597 90.151269,90.1522597 Z" fill-rule="nonzero" stroke-dasharray="280.7110900878906"></path>
          </g>
        </svg>
      </div>

      <div id="staggering-demo" class="feature-demo">
      </div>

      <div id="drawable-demo" class="feature-demo">
        <div class="svg-tracks">
          <svg class="svg-track svg-track-bg" opacity=".4" viewBox="0 0 304 112"><g stroke="none" fill="none" fill-rule="evenodd"><path d="M189.142857,4 C227.456875,4 248.420457,4.00974888 256.864191,4.00974888 C263.817211,4.00974888 271.61219,3.69583517 274.986231,6.63061513 C276.382736,7.84531176 279.193529,11.3814152 280.479499,13.4815847 C281.719344,15.5064248 284.841964,20.3571626 275.608629,20.3571626 C265.817756,20.3571626 247.262478,19.9013915 243.955117,19.9013915 C239.27946,19.9013915 235.350655,24.7304885 228.6344,24.7304885 C224.377263,24.7304885 219.472178,21.0304113 214.535324,21.0304113 C207.18393,21.0304113 200.882842,30.4798911 194.124187,30.4798911 C186.992968,30.4798911 182.652552,23.6245972 173.457298,23.6245972 C164.83277,23.6245972 157.191045,31.5424105 157.191045,39.1815359 C157.191045,48.466779 167.088672,63.6623005 166.666679,66.9065088 C166.378668,69.1206889 155.842137,79.2568633 151.508744,77.8570506 C145.044576,75.7689355 109.126667,61.6405346 98.7556561,52.9785141 C96.4766876,51.0750861 89.3680347,39.5769094 83.4195005,38.5221785 C80.6048001,38.0231057 73.0179337,38.7426555 74.4158694,42.6956376 C76.7088819,49.1796531 86.3280337,64.1214904 87.1781062,66.9065088 C88.191957,70.2280995 86.4690152,77.0567847 82.2060607,79.2503488 C79.2489435,80.7719756 73.1324132,82.8858479 64.7015706,83.0708761 C55.1604808,83.2802705 44.4254811,80.401884 39.1722168,80.401884 C25.7762119,80.401884 24.3280517,89.1260466 22.476679,94.4501705 C21.637667,96.8629767 20.4337535,108 33.2301959,108 C37.8976087,108 45.0757044,107.252595 53.4789069,103.876424 C61.8821095,100.500252 122.090049,78.119656 128.36127,75.3523302 C141.413669,69.5926477 151.190142,68.4987755 147.018529,52.0784879 C143.007818,36.291544 143.396957,23.4057975 145.221196,19.6589263 C146.450194,17.1346449 148.420955,14.8552817 153.206723,15.7880203 C155.175319,16.1716965 155.097637,15.0525421 156.757598,11.3860986 C158.417558,7.71965506 161.842736,4.00974888 167.736963,4.00974888 C177.205308,4.00974888 184.938832,4 189.142857,4 Z" stroke="currentColor" stroke-width="6"></path></g></svg>
          <svg class="svg-track svg-track-higlight" viewBox="0 0 304 112"><g stroke="none" fill="none" fill-rule="evenodd"><path d="M189.142857,4 C227.456875,4 248.420457,4.00974888 256.864191,4.00974888 C263.817211,4.00974888 271.61219,3.69583517 274.986231,6.63061513 C276.382736,7.84531176 279.193529,11.3814152 280.479499,13.4815847 C281.719344,15.5064248 284.841964,20.3571626 275.608629,20.3571626 C265.817756,20.3571626 247.262478,19.9013915 243.955117,19.9013915 C239.27946,19.9013915 235.350655,24.7304885 228.6344,24.7304885 C224.377263,24.7304885 219.472178,21.0304113 214.535324,21.0304113 C207.18393,21.0304113 200.882842,30.4798911 194.124187,30.4798911 C186.992968,30.4798911 182.652552,23.6245972 173.457298,23.6245972 C164.83277,23.6245972 157.191045,31.5424105 157.191045,39.1815359 C157.191045,48.466779 167.088672,63.6623005 166.666679,66.9065088 C166.378668,69.1206889 155.842137,79.2568633 151.508744,77.8570506 C145.044576,75.7689355 109.126667,61.6405346 98.7556561,52.9785141 C96.4766876,51.0750861 89.3680347,39.5769094 83.4195005,38.5221785 C80.6048001,38.0231057 73.0179337,38.7426555 74.4158694,42.6956376 C76.7088819,49.1796531 86.3280337,64.1214904 87.1781062,66.9065088 C88.191957,70.2280995 86.4690152,77.0567847 82.2060607,79.2503488 C79.2489435,80.7719756 73.1324132,82.8858479 64.7015706,83.0708761 C55.1604808,83.2802705 44.4254811,80.401884 39.1722168,80.401884 C25.7762119,80.401884 24.3280517,89.1260466 22.476679,94.4501705 C21.637667,96.8629767 20.4337535,108 33.2301959,108 C37.8976087,108 45.0757044,107.252595 53.4789069,103.876424 C61.8821095,100.500252 122.090049,78.119656 128.36127,75.3523302 C141.413669,69.5926477 151.190142,68.4987755 147.018529,52.0784879 C143.007818,36.291544 143.396957,23.4057975 145.221196,19.6589263 C146.450194,17.1346449 148.420955,14.8552817 153.206723,15.7880203 C155.175319,16.1716965 155.097637,15.0525421 156.757598,11.3860986 C158.417558,7.71965506 161.842736,4.00974888 167.736963,4.00974888 C177.205308,4.00974888 184.938832,4 189.142857,4 Z" stroke="currentColor" stroke-width="2"></path></g></svg>
          <div class="svg-track">
            <div class="svg-car"></div>
          </div>
        </div>
      </div>

      <div class="feature-demo"></div>

      <div id="precise-demo" class="feature-demo">
        <svg class="clock-grid" width="400px" height="400px" viewBox="0 0 400 400">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g class="circle-grid-drawable" opacity="1" transform="translate(18.9387, 18.9387)" stroke="currentColor" stroke-linecap="butt" stroke-linejoin="square" stroke-width="5">
              <path d="M287.120579,74.9885455 C259.976449,47.8478276 222.479216,31.0612724 181.061272,31.0612724" id="0.0_0.125"></path>
              <path d="M362.123934,149.987156 C334.979804,122.846438 297.482571,106.059883 256.064627,106.059883" id="0.0_0.125" transform="translate(309.0943, 128.0235) rotate(45) translate(-309.0943, -128.0235)"></path>
              <path d="M362.127289,256.054562 C334.983159,228.913845 297.485926,212.127289 256.067982,212.127289" id="0.0_0.125" transform="translate(309.0976, 234.0909) rotate(90) translate(-309.0976, -234.0909)"></path>
              <path d="M287.128679,331.057917 C259.984549,303.917199 222.487315,287.130644 181.069372,287.130644" id="0.0_0.125" transform="translate(234.099, 309.0943) rotate(135) translate(-234.099, -309.0943)"></path>
              <path d="M181.061272,331.061272 C153.917142,303.920554 116.419909,287.133999 75.0019654,287.133999" id="0.0_0.125" transform="translate(128.0316, 309.0976) rotate(180) translate(-128.0316, -309.0976)"></path>
              <path d="M106.057917,256.062662 C78.9137868,228.921944 41.4165536,212.135389 -0.00138957053,212.135389" id="0.0_0.125" transform="translate(53.0283, 234.099) rotate(225) translate(-53.0283, -234.099)"></path>
              <path d="M106.054562,149.995255 C78.9104318,122.854538 41.4131986,106.067982 -0.00474459127,106.067982" id="0.0_0.125" transform="translate(53.0249, 128.0316) rotate(270) translate(-53.0249, -128.0316)"></path>
              <path d="M181.053173,74.9919005 C153.909042,47.8511826 116.411809,31.0646274 74.9938656,31.0646274" id="0.0_0.125" transform="translate(128.0235, 53.0283) rotate(315) translate(-128.0235, -53.0283)"></path>
            </g>
          </g>
        </svg>
        <div class="timeline-playhead"></div>
      </div>
      <div id="responsive-demo" class="feature-demo">
        <div class="responsive-viewport">
          <div class="shape"><div class="circle"></div></div>
          <div class="shape"><div class="circle"></div></div>
          <div class="shape"><div class="circle"></div></div>
          <div class="shape"><div class="circle"></div></div>
          <div class="shape"><div class="circle"></div></div>
        </div>
      </div>
    `;
    this.$output.classList.add("output");
    this.$output.style.pointerEvents = "none";
    this.CSSRenderer.domElement.appendChild(this.$output);
    this.domViewportEl.appendChild(this.renderer.domElement);
    this.domViewportEl.appendChild(this.CSSRenderer.domElement);
    this.domViewportEl.appendChild(this.labelsRenderer.domElement);
    this.updateDimensions();
  }
  updateDimensions() {
    this.width = this.domViewportEl.offsetWidth & -2;
    this.height = this.domViewportEl.offsetHeight & -2;
    this.aspectRatio = this.width / this.height;
    this.camera.aspect = this.aspectRatio;
    this.camera.fov = this.fov * ((this.height >= 1e3 ? this.height : 1e3) / 1e3);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.renderer.domElement.style.position = "absolute";
    this.renderer.domElement.style.top = "0px";
    this.renderer.domElement.style.left = "0px";
    this.CSSRenderer.setSize(this.width, this.height);
    this.CSSRenderer.domElement.style.position = "absolute";
    this.CSSRenderer.domElement.style.top = "0px";
    this.CSSRenderer.domElement.style.left = "0px";
    this.labelsRenderer.setSize(this.width, this.height);
    this.labelsRenderer.domElement.style.position = "absolute";
    this.labelsRenderer.domElement.style.top = "0px";
    this.labelsRenderer.domElement.style.left = "0px";
    this.lines.updateDimensions();
  }
};
var StageLights = class {
  constructor(stage) {
    this.ambientLight = new AmbientLight(16777215, 2);
    this.directionalLight = new DirectionalLight(16777215, 1);
    this.directionalLight.castShadow = true;
    let frustumSize = 16;
    this.directionalLight.shadow.mapSize.width = 1024 * 8;
    this.directionalLight.shadow.mapSize.height = 1024 * 8;
    this.directionalLight.shadow.camera.near = 1;
    this.directionalLight.shadow.camera.far = 1e3;
    this.directionalLight.shadow.bias = -3e-5;
    this.directionalLight.shadow.radius = 1;
    this.directionalLight.shadow.camera.left = -frustumSize;
    this.directionalLight.shadow.camera.right = frustumSize;
    this.directionalLight.shadow.camera.top = frustumSize;
    this.directionalLight.shadow.camera.bottom = -frustumSize;
    this.stage = stage;
  }
  _setLightsPosition(axis, value) {
    this.directionalLight.position[axis] = value;
    this.stage.renderer.shadowMap.needsUpdate = true;
  }
  get x() {
    return this.directionalLight.position.x;
  }
  set x(item4) {
    this._setLightsPosition("x", item4);
    this.directionalLight.lookAt(this.stage.scene.position);
  }
  get y() {
    return this.directionalLight.position.y;
  }
  set y(item5) {
    this._setLightsPosition("y", item5);
    this.directionalLight.lookAt(this.stage.scene.position);
  }
  get z() {
    return this.directionalLight.position.z;
  }
  set z(item6) {
    this._setLightsPosition("z", item6);
    this.directionalLight.lookAt(this.stage.scene.position);
  }
};

export { ConnectorLine, ConnectorOverlay, Stage, StageLights };
