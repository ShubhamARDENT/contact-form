// Functionality of the page should appear here
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const contactNo = document.getElementById("cname");
const email = document.getElementById("ename");
const subjectElement = document.getElementById("subject");
const grid = document.querySelector(".name-wrapper");
const submitBtn = document.querySelector("#submit-btn");
const outputContainer = document.querySelector(".output-display");
const contacts = document.querySelector(".contact-list");
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
  const namePattern = /^[a-zA-Z]+$/;
  //values
  let fname = firstName.value;
  let lname = lastName.value;
  let subject = subjectElement.value;
  let emailData = email.value;
  let phone = contactNo.value;

  const isEmailValid = emailPattern.test(emailData);
  const isPhoneValid = phonePattern.test(phone);
  const isNameValid1 = namePattern.test(fname);
  const isNameValid2 = namePattern.test(lname);

  let isValid = true;

  if (fname.length < 3) {
    firstNameError.classList.add("visible");
    isValid = false;
  } else if (!isNameValid1) {
    firstNameError.classList.add("visible");
    isValid = false;
  } else {
    firstNameError.classList.remove("visible");
  }

  if (lname.length < 3) {
    lastNameError.classList.add("visible");
    isValid = false;
  } else if (!isNameValid2) {
    lastNameError.classList.add("visible");
    isValid = false;
  } else {
    lastNameError.classList.remove("visible");
  }

  if (subject === "") {
    subjectError.classList.add("visible");
    isValid = false;
  } else {
    subjectError.classList.remove("visible");
  }

  if (!isPhoneValid) {
    isValid = false;
    contactError.classList.add("visible");
  } else {
    contactError.classList.remove("visible");
  }

  if (!isEmailValid) {
    emailError.classList.add("visible");
    isValid = false;
  } else {
    emailError.classList.remove("visible");
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
    console.log(data, "after pushing in data array");
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

// renders data
function dataRender() {
  contacts.innerHTML = "";
  const contactDetails = JSON.parse(localStorage.getItem("contacts"));
  console.log(contactDetails, "from local storage");
  
  if (contactDetails.length !== 0) {
    outputContainer.style.display = "flex";
  }

  contactDetails.map((item, index) => {
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

// localStorage.clear();
