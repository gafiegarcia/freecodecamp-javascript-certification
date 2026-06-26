// VARIABLES INIT

const theForm = document.getElementById("form");
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const orderNo = document.getElementById("order-no");
const productCode = document.getElementById("product-code");
const quantity = document.getElementById("quantity");
const complaintsGroup = document.getElementById("complaints-group");
const complaintsGroupEles = {
  dP: document.getElementById("damaged-product"),
  ncP: document.getElementById("nonconforming-product"),
  dD: document.getElementById("delayed-dispatch"),
  o: document.getElementById("other-complaint"),
};
const complaintDescriptionContainer = document.getElementById("complaint-description-container")
const complaintDescription = document.getElementById("complaint-description");
const solutionsGroup = document.getElementById("solutions-group")
const solutionsGroupEles = {
  r: document.getElementById("refund"),
  e: document.getElementById("exchange"),
  o: document.getElementById("other-solution"),
};
const solutionDescriptionContainer = document.getElementById("solution-description-container")
const solutionDescription = document.getElementById("solution-description");

const highlightEles = [
  fullName,
  email,
  orderNo,
  productCode,
  quantity,
  complaintsGroup,
  complaintDescription,
  solutionsGroup,
  solutionDescription,
]

const submitBtn = document.getElementById("submit-btn");
const messageBox = document.getElementById("message-box");

// EVENT LISTENERS

theForm.addEventListener("submit", (e) => {
  // added this preventDefault line after submission, because previously this event listener
  // was attached to submitBtn with "click" method, and it didn't satisfy the last seemingly easy test suite:
  // "You should call isValid when you try to submit the form." because I think fcc programmatically dispatch a submit event
  // rather than actually clicking the button
  // What happens after this change is that the highlightForm in the loop just doesn't seem to work.
  // So I: 1. add `novalidate` on the form element (which make the highlight works again
  // but no "Please fill out this field" built-in browser warning) and
  // 2. add this preventDefault below so the page doesn't reload.
  // read the rest of the notes at the bottom of this file
  e.preventDefault();
  const formState = validateForm();
  if (!isValid(formState)) {
    for (const ele of highlightEles) {
      highlightForm(ele, formState)
    }
  }
});

// handling hidden description textarea
complaintsGroup.addEventListener("input", (e) => {
  const isOther = complaintsGroupEles.o.checked;
  complaintDescriptionContainer.hidden = !isOther;
})
solutionsGroup.addEventListener("input", (e) => {
  const isOther = solutionsGroupEles.o.checked;
  solutionDescriptionContainer.hidden = !isOther;
})

// handling auto highlight as user types in the field !TODO!
highlightEles.forEach(ele => {
  ele.addEventListener("change", () => {
    highlightForm(ele, validateForm());
  })
})

// FUNCTIONS

function highlightForm(ele, formState) {
  if (formState[ele.id]) {
    ele.style.borderColor = "green";
  } else {
    ele.style.borderColor = "red";
  }
}

function isValid(obj) {
  let result = true;

  if (Object.values(obj).includes(false)) {
    result = false;
  }

  return result;
}

function validateForm() {
  const complaintState = validateComplaints();
  const solutionState = validateSolution();

  const formState = {
    "full-name": !fullName.validity.valueMissing,
    "email": validateEmail(),
    "order-no": orderNo.checkValidity(),
    "product-code": productCode.checkValidity(),
    "quantity": quantity.checkValidity(),
    "complaints-group": complaintState.cG,
    "complaint-description": complaintState.cD,
    "solutions-group": solutionState.sG,
    "solution-description": solutionState.sD,
  };

  return formState;
}

function validateEmail() {
  let isWrong = false;
  const eV = email.validity;

  if (eV.valueMissing || eV.typeMismatch) isWrong = true;

  return !isWrong;
}

// for both complaints and solutions group, assuming "other" is always the last option
function validateComplaints() {
  const cGValues = Object.values(complaintsGroupEles).map(ele => ele.checked);

  return {
    cG: cGValues.includes(true),
    cD: cGValues[cGValues.length - 1]
      ? complaintDescription.value.length >= 20
      : true
  };
}

function validateSolution() {
  const sGValues = Object.values(solutionsGroupEles).map(ele => ele.checked)

  return {
    sG: sGValues.includes(true),
    sD: sGValues[sGValues.length - 1]
      ? solutionDescription.value.length >= 20
      : true
  }
}

// NOTES & REVIEW
// read line 45
//
// I haven't made use of the message-box at all. for once, I was being lazy on this fcc project
// I spent some time on the CSS (of course, bcs I like it) then realized my pattern of avoiding the real work at hand
// so I jumped to the JS not long after with the intention of FINISHING IT AS QUICKLY AS POSSIBLE
//
// This led to some bad things:
//
// 1. I didn't stick to patterns I created myself during coding,
// making me go back and forth so many times to undo the sloppy code organization
//
// 2. Care more about it passing the tests more than how the it feels from a user POV
// this is the first time I didn't spawn any live server to check how it'd look outside fcc small preview window
// this led to
//
// 3. some minor aesthetic mistakes (like no margin and padding at the bottom of the page), AND
//
// 4. dumb js mistakes that I shouldn't have done if I didn't start the project with that mindset of just
// "getting it done ASAP": uncaught wrong data type, writing multiple logics without checking/logging each step, etc. etc.
//
// I should be more careful, while somehow still being mindful of the time spent....
//
//
// from Claude
// -----------
//
// I used mostly HTML attributes for the validity logic anyway, and these three things are basically doing the same thing
// "full-name":    !fullName.validity.valueMissing,   // only checks "is it empty"
// "email":        validateEmail(),                    // custom 6-line function
// "order-no":     orderNo.checkValidity(),            // the real deal
// could've just stick to .checkValidity for most of validateForm() output props
//
// ## BUGS etc.:
//
// > Your full-name pattern rejects normal names. index.html:17 has pattern="\w+", but \w is [A-Za-z0-9_] — no spaces.
// > The pattern attribute implicitly anchors the whole value, so "John Doe" (your own placeholder!) fails it.
// > You don't notice because your JS only checks !valueMissing, never the pattern.
//
// I never really tested any of the field. now that I got `novalidate` on the `<form>`, the highlighting may work BUT I'm actually
// losing all the built-in browser validation message.
//
// > pattern on quantity does nothing. the pattern attribute only applies to text, search, url, tel, email, password.
// the `min="1"` attribute is what actually validate the thing, not the pattern regex I set.
//
// ## Readability
//
// > The cryptic keys are the main offender: dP, ncP, dD, o and cG, cD, sG, sD and eV.
// > Six months from now (or to any reviewer) these are noise
//
// > fragile logic cGValues[cGValues.length - 1] only enforced with a comment "other always comes last"
// I should've just used the named thing directly complaintsGroupEles.o.checked.
//
// ## Inline styles → CSS classes
//
// > ele.style.borderColor = "red" works, but you're hard-coding presentation into logic.
// BUT I can just toggle a class, duh. separation, separation...



// This is arguably my worst code I ever did since I started fcc. I was so focused on just passing the test and should've done better.
// So many other projects I did for fcc are at least "functional" or enjoyable to use. Knowing I won't ever use a "user complaint form"
// made me not motivated to give my all. Bad mindset: aiming to write good code will give me space to learn more...
