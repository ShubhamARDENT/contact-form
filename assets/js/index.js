// Functionality of the page should appear here
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const contactNo = document.getElementById("cname");
const subjectElement = document.getElementById("subject");
const email = document.getElementById("ename");
const grid = document.querySelector(".name-wrapper");
const submitBtn = document.querySelector("#submit-btn");
const formContainer = document.querySelector(".form-container2");

// errors
const firstNameError = document.querySelector(".error-fname");
const lastNameError = document.querySelector(".error-lname");
const contactError = document.querySelector(".error-cname");
const emailError = document.querySelector(".error-ename");
const subjectError = document.querySelector(".error-subject");

const form = document.querySelector(".contactform");
let data = [];

form.addEventListener("click", (event) => {
  event.preventDefault();

  const phonePattern = /^(?:\+91|91)?[6-9][0-9]{9}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   values
  const fname = firstName.value;
  const lname = lastName.value;
  const subject = subjectElement.value;
  const emailData = email.value;
  const phone = contactNo.value;
  const isEmailValid = emailPattern.test(emailData);

  const isPhoneValid = phonePattern.test(phone);
  // use flag

  let isValid = false;

  if (fname.length < 3) {
    firstNameError.classList.add("visible");
    isValid = false;
  } else {
    firstNameError.classList.remove("visible");
    isValid = true;
  }

  if (lname.length < 3) {
    lastNameError.classList.add("visible");
    isValid = false;
  } else {
    firstNameError.classList.remove("visible");
    isValid = true;
  }

  if (!isPhoneValid) {
    //
    contactError.classList.add("visible");
  } else {
    //
    contactError.classList.remove("visible");
    isValid = false;
  }

  if (!isEmailValid) {
    emailError.classList.add("visible");
    isValid = true;
  } else {
    emailError.classList.remove("visible");
    isValid = false;
  }

  // saving data in array
  if (isValid) {
    // data
    const Details = {
      firstName: fname,
      lastName: lname,
      email: emailData,
      contactNumber: phone,
      subjectData: subject,
    };

    data.push(Details);
  }

  console.log(data);
});

// formContainer.style.display = "flex";
//     let html = `<div class="table">
//                     <span>${fname}</span>
//                     <span>${lname}</span>
//                     <span>${subject}</span>
//                     <span>${emailData}</span>
//                     <span>${phone}</span>
//                   </div>`;
//     formContainer.insertAdjacentHTML("beforeend", html);
