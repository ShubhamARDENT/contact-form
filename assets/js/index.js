// Functionality of the page should appear here
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const contactNo = document.getElementById("cname");
const email = document.getElementById("ename");
const subjectElement = document.getElementById("subject");

const submitBtn = document.querySelector("#submit-btn");
const outputContainer = document.querySelector(".output-display");
const contacts = document.querySelector(".contact-list");
// errors
const firstNameError = document.querySelector(".error-fname");
const lastNameError = document.querySelector(".error-lname");
const contactError = document.querySelector(".error-cname");
const emailError = document.querySelector(".error-ename");
const subjectError = document.querySelector(".error-subject");

// validation errors

const form = document.querySelector(".contactform");

let data = JSON.parse(localStorage.getItem("contacts")) || [];
// localStorage.clear();

// disable submit btn

form.addEventListener("submit", (event) => {
  event.preventDefault();

  //values
  let fname = firstName.value;
  let lname = lastName.value;
  let subject = subjectElement.value;
  let emailData = email.value;
  let phone = contactNo.value;

  const {
    fnameValid,
    lnameValid,
    subValid,
    emailValid,
    isPhoneValid,
    isEmailExist,
    isPhoneExist,
  } = ValidateForm();

  console.log(
    fnameValid,
    lnameValid,
    subValid,
    emailValid,
    "emailvalid",
    isPhoneValid,
    "phonevalid",
    isEmailExist,
    isPhoneExist,
    "before submit"
  );

  if (
    fnameValid &&
    lnameValid &&
    subValid &&
    emailValid &&
    isPhoneValid &&
    isEmailExist &&
    isPhoneExist
  ) {
    // data
    const Details = {
      firstName: fname,
      lastName: lname,
      email: emailData,
      contactNumber: phone,
      subjectData: subject,
    };

    data.push(Details);
    // console.log(data, "before pushing in local storage array");
    localStorage.setItem("contacts", JSON.stringify(data));

    //render data fromm validated data
    dataRender();

    // make form values empty
    firstName.value = "";
    lastName.value = "";
    subjectElement.value = "";
    email.value = "";
    contactNo.value = "";
  }
});

//called to not let list disappear
dataRender();

// renders data
function dataRender() {
  contacts.innerHTML = "";
  const contactDetails = JSON.parse(localStorage.getItem("contacts")) || [];
  // console.log(contactDetails, "from where data renders");
  // console.log(contactDetails.length);
  if (contactDetails.length >= 1) {
    outputContainer.style.display = "flex";
  }

  contactDetails.forEach((item, index) => {
    // list creation
    const listitem = document.createElement("li");
    // adding class to each list
    listitem.className = "heading";
    listitem.innerHTML = `<span>${item.firstName}</span>
                          <span>${item.lastName}</span>
                          <span>${item.email}</span>
                          <span>${item.contactNumber}</span>`;

    contacts.appendChild(listitem);
  });
}

function ValidateForm() {
  const phonePattern = /^(?:\+91|91)?[6-9][0-9]{9}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const namePattern = /^[a-zA-Z]+$/;

  let fname = firstName.value;
  let lname = lastName.value;
  let emailData = email.value;
  let phone = contactNo.value;
  let subject = subjectElement.value;

  const isEmailValid = emailPattern.test(emailData);
  console.log(isEmailValid);
  const isPhoneValid = phonePattern.test(phone);
  console.log(isPhoneValid);
  const isNameValid1 = namePattern.test(fname);
  const isNameValid2 = namePattern.test(lname);

  // flags
  let fnameValid = false;
  let lnameValid = false;
  let subValid = false;
  let emailValid = false;

  // console.log(emailValid, "inital");
  if (fname.length < 3) {
    showErrorMessage(firstNameError, "please enter more than 3 letters");
    fnameValid = false;
  } else if (!isNameValid1) {
    fnameValid = false;
    showErrorMessage(firstNameError, "only alphabets allowed");
  } else {
    hideErrorMessage(firstNameError, "");
    fnameValid = true;
  }

  if (lname.length < 3) {
    showErrorMessage(lastNameError, "please enter more than 3 letters");
    lnameValid = false;
  } else if (!isNameValid2) {
    showErrorMessage(lastNameError, "only alphabets allowed");
    lnameValid = false;
  } else {
    hideErrorMessage(lastNameError, "");
    lnameValid = true;
  }

  if (subject === "") {
    showErrorMessage(subjectError, "subject cannot be empty");
    subValid = false;
  } else {
    showErrorMessage(subjectError, "");
    subValid = true;
  }

  if (!isPhoneValid) {
    showErrorMessage(contactError, "Please enter a valid contact No");
  } else {
    hideErrorMessage(contactError, "");
  }

  if (!isEmailValid) {
    showErrorMessage(emailError, "please enter a valid email");
    emailValid = false;
  } else {
    hideErrorMessage(emailError, "");
    emailValid = true;
  }

  // for existing data
  const ExistingData = JSON.parse(localStorage.getItem("contacts")) || [];
  let isPhoneExist = true;
  let isEmailExist = true;

  ExistingData.forEach((item) => {
    if (emailData == item.email) {
      showErrorMessage(emailError, "email already exists");
      isEmailExist = false;
    }

    if (phone == item.contactNo) {
      showErrorMessage(contactError, "phone no already exists");
      isPhoneExist = false;
    }
  });

  return {
    fnameValid,
    lnameValid,
    subValid,
    emailValid,
    isPhoneValid,
    isEmailExist,
    isPhoneExist,
  };
}

function showErrorMessage(element, text) {
  element.classList.add("visible");
  element.innerHTML = text;
}

function hideErrorMessage(element, text) {
  element.classList.remove("visible");
  element.innerHTML = text;
}

firstName.onblur = ValidateForm;
lastName.onblur = ValidateForm;

subjectElement.onchange = ValidateForm;

firstName.onkeyup = ValidateForm;
lastName.onkeyup = ValidateForm;
email.onkeyup = ValidateForm;
contactNo.onkeyup = ValidateForm;

// console.log(JSON.parse(localStorage.getItem("contacts")));
