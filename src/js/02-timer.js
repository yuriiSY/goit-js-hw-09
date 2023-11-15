// Описаний в документації
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const button = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(new Date());
    console.log(selectedDates[0]);
    if (new Date() > selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  },
};

let date = flatpickr('#datetime-picker', options);

button.addEventListener('click', function () {
  const futureDate = date.selectedDates[0].getTime();
  const timerId = setInterval(function () {
    const currentDate = new Date();
    if (futureDate - currentDate < 1000) {
      clearInterval(timerId);
    }
    const dif = futureDate - currentDate;
    console.log(futureDate);
    console.log(currentDate);
    console.log(dif);
    if (dif === 0) clearInterval(timerId);
    console.log(dif);
    const { days, hours, minutes, seconds } = convertMs(dif);
    dataDays.innerHTML = addLeadingZero(days);
    dataHours.innerHTML = addLeadingZero(hours);
    dataMinutes.innerHTML = addLeadingZero(minutes);
    dataSeconds.innerHTML = addLeadingZero(seconds);
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
