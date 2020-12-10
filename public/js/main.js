document.querySelector('.fetch-btn').addEventListener('click', e=>{
  showGreeting();
})

const showGreeting = () => {
  const today = new Date();
  fetch('/api/greetings').then(res => {
    return res.json();
  }).then(greetings=>{
    console.log(greetings);
    // document.querySelector('.greeting').textContent = greetings[today.getDay()];
  });
}

const submitBtn = document.querySelector(".custom-greeting button");
const formInput = document.querySelector(".custom-greeting input");
formInput.addEventListener('keyup', e=>{
  if (!checkUserInput(e.target.value)) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
})
