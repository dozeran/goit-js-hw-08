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

savedInputsValue();

function onFormSubmit(e) {
  e.preventDefault();

  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  e.target.reset();
  localStorage.removeItem('feedback-form-state');
}

function savedInputsValue() {
  if (localStorage.getItem('feedback-form-state')) {
    const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
    if (savedData.email) {
      refs.email.value = savedData.email;
    }
    if (savedData.message) {
      refs.textarea.value = savedData.message;
    }
  }
}
