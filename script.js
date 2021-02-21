const work_time_in_mins = 25;
const short_break_time_in_mins = 5;
const times = {
  "Work": work_time_in_mins,
  "Short Break": short_break_time_in_mins,
};

let current_time = "Work";
let time = times[current_time] * 60;
let tick = 0;
let tasks_completed = 0;

const minutes_tag = document.getElementById("minutes");
const seconds_tag = document.getElementById("seconds");
const progress_bar = document.getElementById("progress-bar")
const task_tags = document.getElementsByClassName("task");
const toggle_countdown_button = document.getElementById("toggle-countdown");

toggle_countdown_button.addEventListener('click', toggle_countdown);

function countdown() {
  minutes_tag.innerHTML = Math.floor(time / 60);
  seconds_tag.innerHTML = `${time % 60}`.padEnd(2, "0");
  progress_bar.setAttribute("value", getPercentage());
  time -= tick;

  if (time < 1) reset();
}

function toggle_countdown() {
  tick = tick == 1 ? 0 : 1;
  toggle_countdown_button.innerHTML = toggle_countdown_button.innerHTML == "Pause" ? "Play" : "Pause";
}

function getPercentage() {
  return ((times[current_time] * 60 - time) / (times[current_time] * 60)) * 100;
}

function resetBlocks() {
  tasks_completed = 0
  for (let i=0; i<task_tags.length; i++) {
    task_tags[i].classList.remove("has-background-grey");
    task_tags[i].classList.remove("has-background-primary");
    task_tags[i].classList.remove("has-text-white");
    task_tags[0].classList.add("has-background-grey");
    task_tags[0].classList.add("has-text-white");
  }
}

function updateBlocks() {
  task_tags[tasks_completed - 1].classList.remove("has-background-grey");
  task_tags[tasks_completed - 1].classList.add("has-background-primary");
  task_tags[tasks_completed].classList.add("has-background-grey");
  task_tags[tasks_completed].classList.add("has-text-white");
}

function reset() {
  current_time = current_time == "Work" ? "Short Break" : "Work";
  time = times[current_time] * 60;
  tasks_completed += 1;
  if (tasks_completed < 4) {
    updateBlocks();
  } else {
    toggle_countdown();
    resetBlocks();
  }
}

setInterval(countdown, 1);
