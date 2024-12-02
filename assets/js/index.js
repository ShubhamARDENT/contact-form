// Functionality of the page should appear here
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const contactNo = document.getElementById("cname");
const email = document.getElementById("ename");
const output = document.getElementById("output");
const form = document.querySelector("#form");
const submitBtn = document.querySelector("#submit-btn");
const formContainer = document.querySelector(".form-container2");
const firstNameError = document.querySelector(".error-fname");
const lastNameError = document.querySelector(".error-lname");
const contactError = document.querySelector(".error-cname");
const emailError = document.querySelector(".error-ename");
const pattern = contactNo.pattern;
const emailCheck = email.required;
const table = document.querySelector(".table3");
const spans = document.querySelectorAll(".table3 span");

// Iterate through each span and set its display to 'none'

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let data = [];

  //   values
  const fname = firstName.value;
  const lname = lastName.value;
  const emailData = email.value;
  const phone = contactNo.value;

  data.push(fname);
  data.push(lname);
  data.push(emailData);
  data.push(phone);

  const phonePattern = new RegExp(pattern);

  if (fname.length < 3) {
    firstNameError.style.display = "block";
  } else if (lname.length < 3) {
    lastNameError.style.display = "block";
  } else if (!emailCheck) {
    emailError.style.display = " block";
  } else if (!phonePattern.test(phone)) {
    contactError.style.display = "block";
  } else {
    spans.forEach((span) => {
      span.style.display = "none";
    });

    let html = `<div class="table">
                <span>${fname}</span>
                <span>${lname}</span>
                <span>${emailData}</span>
                <span>${phone}</span>
              </div>
            </div>`;
    formContainer.insertAdjacentHTML("beforeend", html);
  }
});
