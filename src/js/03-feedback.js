import throttle from 'lodash.throttle';

const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);

refs.form.addEventListener(
  'input',
  throttle(e => {
    formData[e.target.name] = e.target.value;
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }, 500)
);

refs.email.setAttribute('required', 'on');
refs.textarea.setAttribute('required', 'on');

if (localStorage.getItem('feedback-form-state')) {
  savedInputsValue();
}

function savedInputsValue() {
  if (JSON.parse(localStorage.getItem('feedback-form-state')).email) {
    refs.email.value = JSON.parse(
      localStorage.getItem('feedback-form-state')
    ).email;
  }
  if (JSON.parse(localStorage.getItem('feedback-form-state')).message) {
    refs.textarea.value = JSON.parse(
      localStorage.getItem('feedback-form-state')
    ).message;
  }
}

function onFormSubmit(e) {
  e.preventDefault();

  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  e.target.reset();
  localStorage.removeItem('feedback-form-state');
}
