import { throttle } from 'lodash';

const FORM_KEY = 'feedback-form-state';
const form = document.querySelector('form.feedback-form');
const emailIinput = document.querySelector('input[name="email"]');
const textarea = document.querySelector('textarea[name="message"]');

form.addEventListener('submit', submitForm);
form.addEventListener('input', throttle(onInputForm, 500));

function onInputForm() {
  const formObj = { email: emailIinput.value, message: textarea.value };
  localStorage.setItem(FORM_KEY, JSON.stringify(formObj));
}

function submitForm(event) {
  event.preventDefault();
  if (emailIinput.value.trim() === '' || textarea.value.trim() === '') {
    alert('Please fill all fields');
  } else {
    const formData = { email: emailIinput.value, message: textarea.value };
    console.log(formData);
    form.reset();
    localStorage.removeItem(FORM_KEY);
  }
}

function onPageReload() {
  const savedMessage = JSON.parse(localStorage.getItem(FORM_KEY));
  if (savedMessage) {
    emailIinput.value = savedMessage.email;
    textarea.value = savedMessage.message;
  }
}
onPageReload();
