const UI_INTERVAL = 500;
const SIM_INTERVAL = 100;
const NOTIFICATION_TIMEOUT = 3000;

const NumTypes = {
	Natural: "natural",
  Whole: "whole",
  Integer: "integer",
  Rational: "rational",
  Irrational: "irrational",
  Real: "real",
  Complex: "complex",
  Quaternion: "quaternions",
}

const NotepadDomains = {
  Arithmetic: "arithmetic",
  Geometry: "geometry",
  Algebra: "algebra",
  Trigonometry: "trigonometry",
  Calculus: "calculus",
  NumberTheory: "number theory",
  Topology: "topology"
}

const ArithmeticOperations = {
  Increment: "increment",
  Add: "add",
  Multiply: "multiply",
  Exponentiate: "exponentiate",
  Tetrate: "tetrate",
  Pentate: "pentate",
  Hexate: "hexate",
}

const START_STATE = {
  calculations: 0,
  cycles: 0,
  countMagnitude: 0,
  cyclesMagnitude: 0,
  running: false,
  debug: true, // TODO: change for prod.
  capabilities: {
    magnitude: 1,
    bits: 1,
    dimensions: 2,
  },
  notepad: {
    unlocked: true,
    domains: {
      arithmetic: {
        unlocked: true,
        operations: {
          increment: {
            level: 1,
          },
          add: {
            level: 0,
          },
          multiply: {
            level: 0,
          },
          exponentiate: {
            level: 0,
          },
          tetrate: {
            level: 0,
          },
          pentate: {
            level: 0,
          },
          hexate: {
            level: 0,
          },
        }, // end aritmetic operations.
      }, // end arithmetic.
      geometry: {
        unlocked: false,
        operations: {
        } // end geometry operations.
      }, // end geometry.
      algebra: {
        unlocked: false,
        operations: {
        } // end algebra operations.
      }, // end algebra.
      trigonometry: {
        unlocked: false,
        operations: {
        } // end trigonometry operations.
      }, // end trigonometry.
      calculus: {
        unlocked: false,
        operations: {
        } // end calculus operations.
      }, // end calculus.
      numberTheory: {
        unlocked: false,
        operations: {
        } // end numberTheory operations.
      }, // end numberTheory.
      topology: {
        unlocked: false,
        operations: {
        } // end topology operations.
      }, // end topology.
    }, // end notepad domains
  }, // end notepad
  computer: {
    unlocked: false,
    domains: {
      // TODO: add domains
    }
  }
}

// state s truly initialized in initialize().
var s = JSON.parse(JSON.stringify(START_STATE));

var capabilities = {
  magnitude: 1,
  bits: 1,
  dimensions: 2,
}

var running = false;
var debug = true;

function dlog(message) {
  if (debug) {
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
  return Math.round(Math.random()*100);
  // baseNum = Math.random()*Math.pow(10,capabilities);
}

const KNOWLEDGE = {
  notepad: {
    unlocked: ()=>s.knowledge.notepad.unlocked,
    requirement:()=>true,
    domains: {
      arithmetic: {
        unlocked: ()=>s.notepad.domains.arithmetic.unlocked,
        requirement: ()=>true,
        operations: {
          increment: {
            name: "increment",
            level: s.notepad.domains.arithmetic.operations.increment.level,
            strength: 0,
            curve() {return (this.level * 10**this.strength)},
            op() {
              logit("Incrementing: 1 + " + getRandomNumber())
              s.calculations += this.curve();
              s.cycles += this.curve();
            },
          },
          add: {
            name: "add",
            level: ()=>s.notepad.domains.arithmetic.operations.add.level,
            strength: 1,
            
            curve() {return (this.level * 10^this.strength)},
            op() {
              log("Adding: " + getRandomNumber() + " + " + getRandomNumber());
              s.calculations += this.curve();
              s.cycles += this.curve();
            },
          },
          multiply: {
            name: "multiply",
            level: s.notepad.domains.arithmetic.operations.multiply.level,
            strength: 2,
            curve: function() {
              return this.level * 10^this.strength;
            },
            op: function() {
              s.calculations += this.curve();
              s.cycles += this.curve();
            },
          },
          exponentiate: {
            name: "exponentiate",
            level: s.notepad.domains.arithmetic.operations.exponentiate.level,
            strength: 3,
            curve: function() {
              return this.level * 10^this.strength;
            },
            op: function() {
              s.calculations += this.curve();
              s.cycles += this.curve();
            },
          },
          tetrate: {
            name: "tetrate",
            level: s.notepad.domains.arithmetic.operations.tetrate.level,
            strength: 4,
            curve: function() {
              return this.level * 10^this.strength;
            },
            op: function() {
              s.calculations += this.curve();
              s.cycles += this.curve();
            },
          },
          pentate: {
            name: "pentate",
            level: s.notepad.domains.arithmetic.operations.pentate.level,
            strength: 5,
            curve: function() {
              return this.level * 10^this.strength;
            },
            op: function() {
              s.calculations += this.curve();
              s.cycles += this.curve();
            },
          },
          hexate: {
            name: "hexate",
            level: s.notepad.domains.arithmetic.operations.hexate.level,
            strength: 6,
            curve: function() {
              return this.level * 10^this.strength;
            },
            op: function() {
              s.calculations += this.curve();
              s.cycles += this.curve();
            },
          },
        }, // end aritmetic operations.
      }, // end arithmetic.
      geometry: {
        unlocked: ()=>s.knowledge.geometry.unlocked,
        requirement: ()=>true,
        operations: {
        } // end geometry operations.
      }, // end geometry.
      algebra: {
        unlocked: ()=>s.notepad.domains.algebra.unlocked,
        requirement: ()=>true,
        operations: {
        } // end algebra operations.
      }, // end algebra.
      trigonometry: {
        unlocked: ()=>s.notepad.domains.trigonometry.unlocked,
        requirement: ()=>true,
        operations: {
        } // end trigonometry operations.
      }, // end trigonometry.
      calculus: {
        unlocked: ()=>s.notepad.domains.calculus.unlocked,
        requirement: ()=>true,
        operations: {
        } // end calculus operations.
      }, // end calculus.
      numberTheory: {
        unlocked: ()=>s.notepad.domains.numberTheory.unlocked,
        requirement: ()=>true,
        operations: {
        } // end numberTheory operations.
      }, // end numberTheory.
      topology: {
        unlocked: ()=>s.notepad.domains.topology.unlocked,
        requirement: ()=>true,
        operations: {
        } // end topology operations.
      }, // end topology.
    }, // end notepad domains
  }, // end notepad.
  computer: {
    unlocked: false,
  }
};

var research = {};

var upgrades = {};

var completedBreakpoints = [];

var breakpoints = [
  [
    function () {
      return count >= 10;
    },
    () => {
      enableOperation("multiply");
    },
  ],
];

var notifications = [];
var log = [];

function initNotepadArithmeticUi() {
  arith = document.getElementById("notepadepad-arithmetic");
  if (KNOWLEDGE.notepad.domains.arithmetic.operations.increment.level > 0) {
    enableOperationButton("notepad", "arithmetic", "increment");
  }
}

function initNotepadUi() {
  notepad = document.getElementById("notepad");
  if (KNOWLEDGE.notepad.domains.arithmetic.unlocked) {
    domain_to_add = document.createElement("div");
    domain_to_add.id= "notepad-arithmetic";
    domain_to_add.classList.add("flex-vert-filler");
    domain_to_add.classList.add("center-all");
    notepad.appendChild(domain_to_add);
    initNotepadArithmeticUi();
  }
  // TODO: add other domains.
}

function initUi() {
  // notepad
  if (KNOWLEDGE.notepad.unlocked) {
    div_to_add = document.createElement("div");
    div_to_add.id= "notepad";
    div_to_add.classList.add("flex-vert-filler");
    div_to_add.classList.add("center-all");
    document.getElementById("workspace").appendChild(div_to_add);
    initNotepadUi();
  }
  // computer
  if (KNOWLEDGE.computer.unlocked) {
    div_to_add = document.createElement("div");
    div_to_add.id= "computer";
    div_to_add.classList.add("flex-vert-filler");
    div_to_add.classList.add("center-all");
    document.getElementById("workspace").appendChild(div_to_add);
    initComputerUi();
  }
}

function initialize() {
  // check for cookie save
  s = JSON.parse(JSON.stringify(START_STATE));
  // initKnowledge();
  initUi();
}

function updateCountUi() {
  document.getElementById("count-value").innerHTML =
    String(s.calculations);
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

function addLog(log) {
  let log_to_add = document.createElement("div");
  log_to_add.innerHTML = log;
  log_to_add.classList.add("log-line");
  document.getElementById("log").prepend(log_to_add);
}

function updateUi() {
  updateCountUi();
  updateNotificationUi();
}

function updateSimulation() {
  if (!running) return;
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

function enableOperationButton(workspace, domain, operation) {

  if (document.getElementById([workspace, domain, operation, "button"].join("-"))) {
    dlog("Attempted to add duplicate button: " + KNOWLEDGE[workspace][domain].operations[opertion].name);
    return;
  }
  let button_to_add = document.createElement("button");
  button_to_add.innerHTML = KNOWLEDGE[workspace].domains[domain].operations[operation].name;
  button_to_add.addEventListener('click', function(){
    KNOWLEDGE[workspace].domains[domain].operations[operation].op();
});
  button_to_add.id = String(KNOWLEDGE[workspace].domains[domain].operations[operation].name) + "-button";
  document.getElementById(workspace+"-"+domain).appendChild(button_to_add);
}

function enableOperation(workspace, domain, operation) {
  dlog("Adding operation: " + KNOWLEDGE[workspace].domains[domain].operations[operation].name);
  if (s[workspace][domain].operations[operation].level == 0) {
    s[workspace][domain].operations[operation].level = 1;
  }
  enableOperationButton(workspace, domain, operation);
}

function save() {
  // TODO: implement save
}

function load() {
  // TODO: implement load
}

function pause() {
  if (!running) return;
  dlog("paused");
  running = false;
  document.getElementById("pause-button").classList.add("paused");
  document.getElementById("play-button").classList.remove("playing");
}

function play() {
  if (running) return;
  dlog("play");
  running = true;
  document.getElementById("pause-button").classList.remove("paused");
  document.getElementById("play-button").classList.add("playing");
}

function startup() {
  // load_cookie()
  initialize();
  run();
}

function run() {
  play();
  setInterval(updateUi, UI_INTERVAL);
  setInterval(updateSimulation, SIM_INTERVAL);
}
