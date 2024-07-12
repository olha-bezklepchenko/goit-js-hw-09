let formData = { email: '', message: '' };

const form = document.querySelector('.feedback-form');

form.addEventListener('input', handlerInput);
form.addEventListener('submit', handlerSubmit);
populateForm();

function handlerInput(event) {
  const value = event.target.value.trim();
  const key = event.target.name;
  formData[key] = value;

  try {
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  } catch (err) {
    console.error(err);
  }
}

function populateForm() {
  try {
    const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
    if (savedData) {
      formData = savedData;
      for (const key in formData) {
        if (formData[key]) {
          form.elements[key].value = formData[key];
        }
      }
    }
  } catch (err) {
    console.error(err);
    return;
  }
}

function handlerSubmit(event) {
  event.preventDefault();

  if (
    !form.elements.email.value.trim() ||
    !form.elements.message.value.trim()
  ) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form data submitted:', formData);

  localStorage.removeItem('feedback-form-state');
  formData = { email: '', message: '' };
  form.reset();
}
