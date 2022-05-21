var calendarEl = document.getElementById("calendar");
var currentDayEl = document.getElementById("currentDay");
var taskInfoArray = [];
//line of code is to retrieve item from local storage.
var storedTaskInfoArray = JSON.parse(localStorage.getItem("calendarEvents"));

//JSON.parse takes our string in local storage from
// a string '['','','','Coding Hello World,'','']' to an array ['','','','Coding Hello World,'','']
//display the current date at the top of the page using moment.js

const setCurrentDay = () => {
  var currentDay = moment().format("dddd, MMM Do, YYYY");
  currentDayEl.textContent = currentDay;
};

//dynamically generate each element and add event listeners on the save button.

const generateHours = () => {
  for (i = 0; i < 9; i++) {
    var hourBlockEl = document.createElement("div");
    hourBlockEl.classList = "row";
    calendarEl.appendChild(hourBlockEl);
    var hourTextEl = document.createElement("p");
    hourTextEl.classList = "col-2";
    if (i + 9 < 12) {
      hourTextEl.textContent = `${i + 9} AM`;
    } else if (i + 9 == 12) {
      hourTextEl.textContent = `${i + 9} PM`;
    } else {
      hourTextEl.textContent = `${i - 3} PM`;
    }
    var eventEl = document.createElement("input");
    eventEl.classList = "col-8";
    eventEl.setAttribute("id", `hourInput${i}`);
    var saveButtonEl = document.createElement("button");
    saveButtonEl.classList = "col-2 btn-primary";
    saveButtonEl.textContent = "Save";
    saveButtonEl.setAttribute("data-blockHour", i);
    saveButtonEl.addEventListener("click", (event) => {
      //stored the button I clicked on as a variable
      var clickedButtonEl = event.target;
      //set my hourIndex variable to the custom attribute that I created on each save button
      var hourIndex = clickedButtonEl.getAttribute("data-blockHour");
      //grabbed the input element that corresponds to the save button that I clicked.
      var inputEl = document.getElementById(`hourInput${hourIndex}`);
      //stored the text content of the input element to the taskInfoArray.
      console.log(inputEl);
      taskInfoArray[hourIndex] = inputEl.value;
      console.log(taskInfoArray);
      //called the storeEvents function to store the events in local storage.
      storeEvents();
    });
    hourBlockEl.appendChild(hourTextEl);
    hourBlockEl.appendChild(eventEl);
    hourBlockEl.appendChild(saveButtonEl);
  }
};

//i is a counter. it is equal to the number of times the code has looped + the initial the value of i.

//save the task to localStorage if the save button is clicked. ensure that localStorage gets saved events.
const storeEvents = () => {
  localStorage.setItem("calendarEvents", JSON.stringify(taskInfoArray));
};

// local storage has two parts -- setItem and getItem
// setItem saves the value to localStorage
// getItem retrieves the item from localStorage

//use bootstrap to change the color of the hour elements if that time is in the past, present, or future

setCurrentDay();
generateHours();
