var isRunning;
var timeOut;
var execution_counter = 0;


ons.ready(function () {
  document.getElementById("help").onclick = showhelp;
  document.getElementById("bnt_start").onclick = startstop;
  document.getElementById("rn_prep").onclick = setRngPrep;
  document.getElementById("rn_fluke").onclick = setRngFluke;
  document.getElementById("rn_exe").onclick = setRngExe;
  document.getElementById("rn_reps").onclick = setRngReps;
  isRunning = false;
  setRngPrep();
  setRngFluke();
  setRngExe();
  setRngReps();
  startstop();
});

function showhelp() {
  ons.notification.alert('Help???');
}
function setRngPrep() {
  var x = document.getElementById("rn_prep").value;
  document.getElementById('lb_prep').innerHTML = x + ' sec';
};
function setRngFluke() {
  var x = document.getElementById("rn_fluke").value;
  document.getElementById('lb_fluke').innerHTML = x + ' sec';
};
function setRngExe() {
  var x = document.getElementById("rn_exe").value;
  document.getElementById('lb_exe').innerHTML = x + ' sec';
};
function setRngReps() {
  var x = document.getElementById("rn_reps").value;
  document.getElementById('lb_reps').innerHTML = x + ' x';
};


function setProgress() {
  var bar = document.getElementById("bar_prog");
  var proz = 100 / document.getElementById("rn_reps").value * execution_counter;
  if (proz > 100) {
    proz = 100;
  }
  bar.value = proz;
  if (execution_counter == 1) {
    document.getElementById('lb_prog').innerHTML = 'Progress: ' + execution_counter + ' Rep';
  } else {
    document.getElementById('lb_prog').innerHTML = 'Progress: ' + execution_counter + ' Reps';
  }
}


function PlaySound(filename) {
  var audio = new Audio(filename);
  audio.play();
}

function ShowCommand(txt) {
  document.getElementById('status').innerHTML = '<b>Command:</b> ' + txt;
}


function firePrepTimeout() {
  var should = document.getElementById("rn_reps").value;
  if (execution_counter >= should) {
    document.getElementById('lb_prog').innerHTML = 'Progress: done';
    startstop();
  } else {
    execution_counter += 1;
    var x = document.getElementById("rn_prep").value;
    x = x * 1000 + 1;
    setProgress();
    timeOut = window.setTimeout(fireFlukeTimeout, x);
    ShowCommand('Make Ready!');
  }
};

function fireFlukeTimeout() {
  var x = document.getElementById("rn_fluke").value;
  x = (2 + (x - 2) * Math.random()) * 1000
  PlaySound('img/soundReady.mp3');
  timeOut = window.setTimeout(fireDrillTimeout, x);
  ShowCommand('Are you Ready?');
};


function fireDrillTimeout() {
  var x = document.getElementById("rn_exe").value;
  x *= 1000;
  PlaySound('img/soundBeep.mp3');
  timeOut = window.setTimeout(fireDrillStopTimeout, x);
  ShowCommand('Go!');
};

function fireDrillStopTimeout() {
  PlaySound('img/soundBeep.mp3');
  timeOut = window.setTimeout(firePrepTimeout, 1);
  ShowCommand('Done');
};

function stopTimeout() {
  window.clearTimeout(timeOut);
}


function startstop() {
  if (isRunning) {
    isRunning = false;
    document.querySelector('ons-icon').setAttribute('icon', 'md-pause-circle');
    //ons.notification.alert('start');
    firePrepTimeout();
  } else {
    isRunning = true;
    document.querySelector('ons-icon').setAttribute('icon', 'md-play-circle');
    //ons.notification.alert('stop');
    stopTimeout();
  }
};
