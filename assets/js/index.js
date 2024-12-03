// Functionality of the page should appear here
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const contactNo = document.getElementById("cname");
const subjectElement = document.getElementById("subject");
const email = document.getElementById("ename");
const grid = document.querySelector(".name-wrapper");
const form = document.querySelector("#form");
const submitBtn = document.querySelector("#submit-btn");
const formContainer = document.querySelector(".form-container2");

// errors
const firstNameError = document.querySelector(".error-fname");
const lastNameError = document.querySelector(".error-lname");
const contactError = document.querySelector(".error-cname");
const emailError = document.querySelector(".error-ename");
const subjectError = document.querySelector(".error-subject");

// Iterate through each span and set its display to 'none'

let data = [];

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  //   values
  const fname = firstName.value;
  const lname = lastName.value;
  const subject = subjectElement.value;
  const emailData = email.value;
  const phone = contactNo.value;

  data.push(fname);
  data.push(lname);
  data.push(subject);
  data.push(emailData);
  data.push(phone);

  // use flag
  if (fname.length < 3) {
    firstNameError.classList.add("visible");
    firstName.classList.add("error");
  } else {
    firstNameError.classList.remove("visible");
    firstName.classList.remove("error");
  }

  if (lname.length < 3) {
    lastNameError.classList.add("visible");
    lastName.classList.add("error");
  } else {
    lastNameError.classList.remove("visible");
    lastName.classList.remove("error");
  }

  if (subject === "") {
    subjectError.classList.add("visible");
    subjectElement.classList.add("error");
  } else {
    subjectError.classList.remove("visible");
    subjectElement.classList.remove("error");
  }

  const phonePattern = /^(?:\+91|91)?[6-9][0-9]{9}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isEmailValid = emailPattern.test(emailData);

  const isPhoneValid = phonePattern.test(phone);

  if (isPhoneValid && isEmailValid) {
    // data
    formContainer.style.display = "flex";
    let html = `<div class="table">
                    <span>${fname}</span>
                    <span>${lname}</span>
                    <span>${subject}</span>
                    <span>${emailData}</span>
                    <span>${phone}</span>
                  </div>`;
    formContainer.insertAdjacentHTML("beforeend", html);
  } else {
    contactError.classList.add("visible");
    contactNo.classList.add("error");
    emailError.classList.add("visible");
    email.classList.add("error");
  }
});

// to do
// fix row gap
// fix error messages
// check email validation
