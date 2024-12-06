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


  if (ValidateForm()) {
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

  let isValid = true;
  let fname = firstName.value;
  let lname = lastName.value;
  let emailData = email.value;
  let phone = contactNo.value;
  let subject = subjectElement.value;

  const isEmailValid = emailPattern.test(emailData);
  const isPhoneValid = phonePattern.test(phone);
  const isNameValid1 = namePattern.test(fname);
  const isNameValid2 = namePattern.test(lname);

  if (fname.length < 3) {
    firstNameError.innerHTML = "Please enter more than three letters";
    console.log(firstNameError);
    firstNameError.classList.add("visible");
    isValid = false;
  } else if (!isNameValid1) {
    firstNameError.classList.add("visible");
    firstNameError.innerHTML = "Only Alphabets allowed";
    isValid = false;
  } else {
    firstNameError.classList.remove("visible");
    firstNameError.innerHTML = "";
    isValid = true;
  }

  if (lname.length < 3) {
    lastNameError.classList.add("visible");
    lastNameError.innerHTML = "Please enter more than three letters";
    isValid = false;
  } else if (!isNameValid2) {
    lastNameError.classList.add("visible");
    lastNameError.innerHTML = "Only Alphabets allowed";
    isValid = false;
  } else {
    lastNameError.innerHTML = "";
    lastNameError.classList.remove("visible");
    isValid = true;
  }

  if (subject === "") {
    subjectError.classList.add("visible");
    isValid = false;
  } else {
    subjectError.classList.remove("visible");
    isValid = true;
  }

  if (!isPhoneValid) {
    isValid = false;
    contactError.classList.add("visible");
  } else {
    contactError.classList.remove("visible");
    isValid = true;
  }

  if (!isEmailValid) {
    emailError.classList.add("visible");
    isValid = false;
  } else {
    emailError.classList.remove("visible");
    isValid = true;
  }

  //get exisitng contacts form local storage

  const ExistingData = JSON.parse(localStorage.getItem("contacts")) || [];
  console.log(ExistingData, "exisitng data in local storage");
  // check if data exists

  for (let i = 0; i < ExistingData.length; i++) {
    let ExistingEmail = ExistingData[i].email;
    let ExistingContact = ExistingData[i].phone;
    if (emailData === ExistingEmail) {
      emailError.classList.add("visible");
      emailError.innerHTML = "email already Exists";
      isValid = false;
    } else {
      emailError.classList.remove("visible");
      isValid = true;
    }
    break;
  }

  return isValid;
}

firstName.onblur = ValidateForm;
lastName.onblur = ValidateForm;

subjectElement.onchange = ValidateForm;

firstName.onkeyup = ValidateForm;
lastName.onkeyup = ValidateForm;
email.onkeyup = ValidateForm;
contactNo.onkeyup = ValidateForm;

// console.log(JSON.parse(localStorage.getItem("contacts")));
