var count_value = 0;
var count_suffix = "";
var add_count = 1;
var running = true;

var operations = {
  "add": true,
  "multiply": false,
}

var research = {}

var upgrades = {}

function initialize_operations() {
  // TODO
}

function initialize_all() {
  initialize_operations();
}

function update_counts() {
  document.getElementById("count-value").innerHTML = "" + count_value + count_suffix; 
}

function update_all() {
  update_counts();
}

function reset() {
  count_value = 0;
  count_suffix = "";
  add_count = 1;
  update_all();
}

function add_operation(key) {
  state = operations[key];
  if (state == undefined) {
    console.log("Attempted to add invalid operation: " + key)
    return;
  }
  if (state == true) {
    console.log("Attempted to add duplicate operation: " + key)
    return;
  }
  operations[key] = true;
  let button_to_add = document.createElement("button");
  button_to_add.innerHTML = key;
  button_to_add.onclick = str(key)+"()";
  button_to_add.id = str(key)+"-button";
  document.getElementById("operations").appendChild(button_to_add);
}

function add() { 
 //This function is what makes the button add!
 console.log("Adding: " + add_count)
 count_value+=add_count;
 update();
}

function save() {
  // TODO: implement save
}

function load(){
  // TODO: implement load
}

function pause(){
  running = false;
  document.getElementById("pause-button").classList.add("paused")
  document.getElementById("run-button").classList.remove("running")
}

function run(){
  running = true;
  document.getElementById("pause-button").classList.remove("paused")
  document.getElementById("run-button").classList.add("running")
}

function startup() {
 run()
 // load_cookie()
 initialize_all()
}