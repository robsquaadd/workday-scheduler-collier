var calendarEl = document.getElementById("calendar");
var currentDayEl = document.getElementById("currentDay");
var taskInfoArray = [];
var clearButtonEl = document.getElementById("clear-button");

const clearSchedule = () => {
  var confirmClear = confirm("Are you sure that you want to clear all events?");
  if (confirmClear) {
    localStorage.removeItem("calendarEvents");
    var inputElArray = document.querySelectorAll(".eventInput");
    for (i = 0; i < inputElArray.length; i++) {
      inputElArray[i].value = "";
    }
  }
};

const populateInfo = () => {
  var storedTaskInfoArray = JSON.parse(localStorage.getItem("calendarEvents"));
  if (storedTaskInfoArray) {
    taskInfoArray = storedTaskInfoArray;
    for (i = 0; i < taskInfoArray.length; i++) {
      var inputEl = document.getElementById(`hourInput${i}`);
      inputEl.value = taskInfoArray[i];
    }
  }
};

const setCurrentDay = () => {
  var currentDay = moment().format("dddd, MMM Do, YYYY");
  currentDayEl.textContent = currentDay;
};

//dynamically generate each element and add event listeners on the save button.

const generateHours = () => {
  for (i = 0; i < 9; i++) {
    var hourBlockEl = document.createElement("div");
    hourBlockEl.classList = "row my-1";
    calendarEl.appendChild(hourBlockEl);
    var hourTextEl = document.createElement("p");
    hourTextEl.classList = "col-2 hour";
    if (i + 9 < 12) {
      hourTextEl.textContent = `${i + 9} AM`;
    } else if (i + 9 == 12) {
      hourTextEl.textContent = `${i + 9} PM`;
    } else {
      hourTextEl.textContent = `${i - 3} PM`;
    }
    var eventEl = document.createElement("input");
    eventEl.classList = "col-7 eventInput";
    eventEl.setAttribute("id", `hourInput${i}`);
    var saveButtonEl = document.createElement("button");
    saveButtonEl.classList = "col-2 btn-primary mx-1";
    saveButtonEl.textContent = "Save";
    saveButtonEl.setAttribute("data-blockHour", i);
    saveButtonEl.addEventListener("click", (event) => {
      var clickedButtonEl = event.target;
      var hourIndex = clickedButtonEl.getAttribute("data-blockHour");
      var inputEl = document.getElementById(`hourInput${hourIndex}`);
      taskInfoArray[hourIndex] = inputEl.value;
      storeEvents();
    });
    hourBlockEl.appendChild(hourTextEl);
    hourBlockEl.appendChild(eventEl);
    hourBlockEl.appendChild(saveButtonEl);
  }
};

//save the task to localStorage if the save button is clicked. ensure that localStorage gets saved events.
const storeEvents = () => {
  localStorage.setItem("calendarEvents", JSON.stringify(taskInfoArray));
};

//use bootstrap to change the color of the hour elements if that time is in the past, present, or future
const relativeTime = () => {
  var currentHour = moment().hour();
  var inputElArray = document.querySelectorAll(".eventInput");
  for (i = 0; i < inputElArray.length; i++) {
    var inputElementId = inputElArray[i].getAttribute("id");
    var inputElementHour = inputElementId.replace("hourInput", "");
    var hourInteger = parseInt(inputElementHour);
    if (currentHour > hourInteger + 9) {
      $(inputElArray[i]).addClass("past");
    } else if (currentHour == hourInteger + 9) {
      $(inputElArray[i]).addClass("present");
    } else {
      $(inputElArray[i]).addClass("future");
    }
  }
};

const loadPage = () => {
  setCurrentDay();
  generateHours();
  relativeTime();
  populateInfo();
};

loadPage();
clearButtonEl.addEventListener("click", clearSchedule);
