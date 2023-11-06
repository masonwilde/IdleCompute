const UI_INTERVAL = 500;
const SIM_INTERVAL = 100;
const NOTIFICATION_TIMEOUT = 3000;

const ALL_TABS = ["notepad", "automation", "research", "upgrades", "settings"];

const ALL_OPERATIONS = {
  increment: {
    name: "increment",
    equation: function () {
      let term1 = getRandomNumber();
      return `${term1}++ == ${term1 + 1}`
    }
  },
  add: {
    name: "add",
    equation: function () {
      let term1 = getRandomNumber();
      let term2 = getRandomNumber();
      return `${term1} + ${term2} == ${term1 + term2}`
    }
  }, 
  multiply: {
    name: "multiply",
    equation: function () {
      let term1 = getRandomNumber();
      let term2 = getRandomNumber();
      return `${term1} * ${term2} == ${term1 * term2}`
    }
  },
  exponentiate: {
    name: "exponentiate",
    equation: function () {
      let term1 = getRandomNumber();
      let term2 = getRandomNumber();
      return `${term1}<sup>${term2}</sup> == ${term1 ** term2}`
    }
  },
  tetrate: {
    name: "tetrate",
    equation: function () {
      let term1 = getRandomNumber();
      let term2 = getRandomNumber();
      return `<sup>${term2}</sup>${term1} == ${(term1 ** term1 ** term1).toExponential(2)}`
    }
  },
  pentate: {
    name: "pentate",
    equation: function () {
      let term1 = getRandomNumber();
      let term2 = getRandomNumber();
      return `${term1}[5]${term2} == ${(term1 ** term1 ** term1 ** term1 ** term1).toExponential(2)}`
    }
  },
  hexate: {
    name: "hexate",
    equation: function () {
      let term1 = getRandomNumber();
      let term2 = getRandomNumber();
      return `${term1}[6]${term2} == ${(term1 ** term1 ** term1 ** term1 ** term1 ** term1).toExponential(2)}`
    }
  },
  log2: {
    name: "log2",
    equation: function () {
      let term1 = getRandomNumber();
      return `log<sub>2</sub>(${term1}) == ${Math.log2(term1)}`
    }
  },
}

const NumTypes = {
  Natural: "natural",
  Whole: "whole",
  Integer: "integer",
  Rational: "rational",
  Irrational: "irrational",
  Real: "real",
  Complex: "complex",
  Quaternion: "quaternions",
};

const NotepadDomains = {
  Arithmetic: "arithmetic",
  Geometry: "geometry",
  Algebra: "algebra",
  Trigonometry: "trigonometry",
  Calculus: "calculus",
  NumberTheory: "number theory",
  Topology: "topology",
};

const ArithmeticOperations = {
  Increment: "increment",
  Add: "add",
  Multiply: "multiply",
  Exponentiate: "exponentiate",
  Tetrate: "tetrate",
  Pentate: "pentate",
  Hexate: "hexate",
};

const START_STATE = {
  settings: {
    scribbles: true,
  },
  calculations: 0,
  intuition: 0,
  manualAdditive: 0,
  manualMultiplier: 1.0,
  autoAdditive: 0,
  autoMultiplier: 1.0,
  running: false,
  debug: true, // TODO: change for prod.
  capabilities: {
    magnitude: 1,
    bits: 1,
    dimensions: 2,
  },
  operations: [
    "increment",
  ],
  activeTab : "notepad",
  tabs: [
    "notepad",
    "settings",
  ],
  research: [
  ],
  upgrades: [
  ],
  devices: [
  ],
};

// state s truly initialized in initialize().
var s = JSON.parse(JSON.stringify(START_STATE));

function dlog(message) {
  if (s.debug) {
    console.log(message);
  }
}

function notify(message) {
  notifications.push(message);
}

function logit(message) {
  log.push(message);
  addLog(message);
}

function pow2(n) {
  return 1 << n;
}

function getRandomNumber() {
  return Math.round(Math.random() * 100);
  // baseNum = Math.random()*Math.pow(10,capabilities);
}

const KNOWLEDGE = {
  notepad: {
    unlocked: () => {
      return s.knowledge.notepad.unlocked;
    },
    requirement: () => {
      return true;
    },
    domains: {
      arithmetic: {
        unlocked: () => s.notepad.domains.arithmetic.unlocked,
        requirement: () => true,
        operations: {
          increment: {
            name: "increment",
            level: () =>
              s.notepad.domains.arithmetic.operations.increment.level,
            strength: 0,
            curve() {
              return this.level() * 2 ** this.strength;
            },
            op() {
              logit("Incrementing: 1 + " + getRandomNumber());
              s.calculations += this.curve();
              s.cycles += this.curve();
            },
          },
          add: {
            name: "add",
            level: () => s.notepad.domains.arithmetic.operations.add.level,
            strength: 1,
            curve() {
              return this.level() * 2 ** this.strength;
            },
            op() {
              logit("Adding: " + getRandomNumber() + " + " + getRandomNumber());
              dlog("Adding: " + this.curve());
              s.calculations += this.curve();
              s.cycles += this.curve();
            },
          },
          multiply: {
            name: "multiply",
            level: () => s.notepad.domains.arithmetic.operations.multiply.level,
            strength: 2,
            curve: function () {
              return this.level() * 2 ** this.strength;
            },
            op: function () {
              logit(
                "Multiplying: " + getRandomNumber() + " * " + getRandomNumber()
              );
              s.calculations += this.curve();
              s.cycles += this.curve();
            },
          },
          exponentiate: {
            name: "exponentiate",
            level: () =>
              s.notepad.domains.arithmetic.operations.exponentiate.level,
            strength: 3,
            curve: function () {
              return this.level() * 2 ** this.strength;
            },
            op: function () {
              logit(
                "Exponentiating: " +
                  getRandomNumber() +
                  "<sup>" +
                  getRandomNumber() +
                  "</sup>"
              );
              s.calculations += this.curve();
              s.cycles += this.curve();
            },
          },
          tetrate: {
            name: "tetrate",
            level: () => s.notepad.domains.arithmetic.operations.tetrate.level,
            strength: 4,
            curve: function () {
              return this.level() * 2 ** this.strength;
            },
            op: function () {
              logit(
                "Tetrating: <sup>" +
                  getRandomNumber() +
                  "</sup>" +
                  getRandomNumber()
              );
              s.calculations += this.curve();
              s.cycles += this.curve();
            },
          },
          pentate: {
            name: "pentate",
            level: () => s.notepad.domains.arithmetic.operations.pentate.level,
            strength: 5,
            curve: function () {
              return this.level() * 2 ** this.strength;
            },
            op: function () {
              logit(
                "Pentating: " + getRandomNumber() + "[5]" + getRandomNumber()
              );
              s.calculations += this.curve();
              s.cycles += this.curve();
            },
          },
          hexate: {
            name: "hexate",
            level: () => s.notepad.domains.arithmetic.operations.hexate.level,
            strength: 6,
            curve: function () {
              return (this.level() * 10) ^ this.strength;
            },
            op: function () {
              logit(
                "Hexating: " + getRandomNumber() + "[6]" + getRandomNumber()
              );
              s.calculations += this.curve();
              s.cycles += this.curve();
            },
          },
        }, // end aritmetic operations.
      }, // end arithmetic.
      geometry: {
        unlocked: () => s.knowledge.geometry.unlocked,
        requirement: () => true,
        operations: {}, // end geometry operations.
      }, // end geometry.
      algebra: {
        unlocked: () => s.notepad.domains.algebra.unlocked,
        requirement: () => true,
        operations: {}, // end algebra operations.
      }, // end algebra.
      trigonometry: {
        unlocked: () => s.notepad.domains.trigonometry.unlocked,
        requirement: () => true,
        operations: {}, // end trigonometry operations.
      }, // end trigonometry.
      calculus: {
        unlocked: () => s.notepad.domains.calculus.unlocked,
        requirement: () => true,
        operations: {}, // end calculus operations.
      }, // end calculus.
      numberTheory: {
        unlocked: () => s.notepad.domains.numberTheory.unlocked,
        requirement: () => true,
        operations: {}, // end numberTheory operations.
      }, // end numberTheory.
      topology: {
        unlocked: () => s.notepad.domains.topology.unlocked,
        requirement: () => true,
        operations: {}, // end topology operations.
      }, // end topology.
    }, // end notepad domains
  }, // end notepad.
  computer: {
    unlocked: false,
  },
};

var research = {};

var upgrades = {};

var completedBreakpoints = [];

var breakpoints = [
  [
    () => s.calculations > 10,
    () => {
      let but = document.getElementById("research-button")
      but.style.visibility = "visible";
      but.style.display = "inline";
    },
],
];

var notifications = [];
var log = [];

function initNotepadTab() {
  let button_to_add = document.createElement("button");
  button_to_add.innerHTML = "COMPUTE";
  button_to_add.addEventListener("click", function () {compute()});
  button_to_add.id = "compute-button";
  button_to_add.classList.add("bigclick");
  let div = document.getElementById('notepad')
  div.classList.add("center-all")
  div.style.overflow = "hidden"
  div.appendChild(button_to_add);
}

function initResearchTab() {
  let div = document.getElementById('research')
  div.innerHTML = "Research"
}

function initSettingsTab() {
  let div = document.getElementById('settings')
  div.innerHTML = "Settings"
}

function openTab(tabName) {
  console.log ("opening tab: " + tabName)
  if (s.activeTab != tabName) {
    old_tab = document.getElementById(s.activeTab)
    old_tab.style.visibility = "hidden"
    old_tab.style.display = "fixed"
    old_tab.classList.remove("flex-vert-filler")
  }
  let div = document.getElementById(tabName)
  div.style.visibility = "visible"
  div.style.display = "flex"
  div.classList.add("flex-vert-filler")
  s.activeTab = tabName
}

function initTabPanel() {
  for (tab of ALL_TABS) {
    let button_to_add = document.createElement("button");
    show = s.tabs.includes(tab)
    button_to_add.style.visibility = (show) ? "visible" : "hidden";
    button_to_add.style.display = (show) ? "inline" : "none";
    button_to_add.innerHTML = tab;
    let tabName = tab;
    button_to_add.addEventListener("click", function () {openTab(tabName)});
    button_to_add.id = tab + "-button";
    document.getElementById('tab-panel').appendChild(button_to_add);
  }
}

function initUi() {
  // notepad
  for (tab of ALL_TABS) {
    let div_to_add = document.createElement("div");
    div_to_add.id = tab;
    document.getElementById("workspace").appendChild(div_to_add);
    div_to_add.style.visibility = "hidden";
    div_to_add.style.display = "fixed";
    div_to_add.style.width = "100%";
  }
  initNotepadTab();
  initResearchTab();
  initSettingsTab();
  initTabPanel();
  openTab(s.activeTab)
}

function updateCountUi() {
  calculations = String(s.calculations);
  if (s.calculations > 100) {
    calculations = s.calculations.toExponential(2);
  }
  document.getElementById("calculations-val").innerHTML = String(
    calculations
  );
  intuition = s.intuition.toExponential(2);
  document.getElementById("intuition-val").innerHTML = intuition;
}

function updateNotificationUi() {
  for (note of notifications) {
    let note_to_add = document.createElement("div");
    note_to_add.innerHTML = note;
    note_to_add.classList.add("notification");
    document.getElementById("notifications").prepend(note_to_add);
    setTimeout(() => {
      note_to_add.remove();
    }, NOTIFICATION_TIMEOUT);
  }
  notifications = [];
}

function updateUi() {
  updateCountUi();
  updateNotificationUi();
}

function updateSimulation() {
  if (!s.running) return;
  s.intuition = (s.calculations == 0 ? 0 : Math.log2(s.calculations));
  checkBreakpoints();
}

function checkBreakpoints() {
  for (let i = 0; i < breakpoints.length; i++) {
    if (breakpoints[i][0]()) {
      breakpoints[i][1]();
      completedBreakpoints.push(breakpoints.splice(i, 1));
      i--; // Don't skip an element.
    }
  }
}

function reset() {
  s = JSON.parse(JSON.stringify(START_STATE));
}

function makeEquation() {
  let equation = "";
      

  return equation;
}

function scribble() {
  let operation = s.operations[Math.floor(Math.random() * s.operations.length)];
  let equation = ALL_OPERATIONS[operation].equation();
  let scrib = document.createElement("p");
  scrib.innerHTML = equation;
  scrib.classList.add("scribble");
  length = equation.length;
  notepad = document.getElementById("notepad")
  font = parseFloat(getComputedStyle(notepad).fontSize);
  console.log(font);
  padding = 100 * (length * font) / notepad.offsetWidth;
  console.log(padding);
  scrib.style.left = 5 + Math.random() * Math.floor(90-(padding)) + "%";
  scrib.style.top = 5+ Math.random() * 90 +  "%";
  scrib.style.transform = "rotate(" + (-15 + (Math.random() * 30)) + "deg)";
  notepad.appendChild(scrib);
  setTimeout(() => {
    scrib.remove();
  }, 5000);
}

function compute() {
  s.calculations += 1;
  s.cycles += 1;
  updateCountUi();
  if (s.settings.scribbles) {
    scribble();
  }
}

function save() {
  // TODO: implement save
}

function load() {
  // TODO: implement load
}

function togglePlay() {
  s.running = !s.running;
  but = document.getElementById("playpause-button");
  but.classList.toggle("running");
  but.innerHTML = s.running ? "Running" : "Paused";
}

function initialize() {
  // check for cookie save
  s = JSON.parse(JSON.stringify(START_STATE));
  // initKnowledge();
  initUi();
}

function run() {
  togglePlay();
  setInterval(updateUi, UI_INTERVAL);
  setInterval(updateSimulation, SIM_INTERVAL);
}

function startup() {
  // load_cookie()
  initialize();
  run();
}
