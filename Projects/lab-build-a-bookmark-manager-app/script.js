const mainSection = document.getElementById("main-section");
const categoryDropdown = document.getElementById("category-dropdown");
const categoryNameEles = document.querySelectorAll(".category-name");
const viewCategoryBtn = document.getElementById("view-category-button");
const addBookmarkBtn = document.getElementById("add-bookmark-button");

const formSection = document.getElementById("form-section");
const bookmarkForm = document.getElementById("bookmark-form");
const inputName = document.getElementById("name");
const inputUrl = document.getElementById("url");
const closeFormBtn = document.getElementById("close-form-button");
const addBookmarkBtnForm = document.getElementById("add-bookmark-button-form");

const bookmarkListSection = document.getElementById("bookmark-list-section");
const categoryList = document.getElementById("category-list");
const closeListBtn = document.getElementById("close-list-button");
const deleteBookmarkBtn = document.getElementById("delete-bookmark-button");

const statusOk = document.getElementById("status-ok");
const statusError = document.getElementById("status-error");
const statusTimers = new WeakMap();
const statusDuration = 6000;
const getTransitionDuration = (ele) => {
  const statusTransitionDurationStr =
    getComputedStyle(ele).transitionDuration.split(",")[0];

  if (statusTransitionDurationStr.endsWith("ms")) {
    return Number.parseFloat(statusTransitionDurationStr);
  } else if (statusTransitionDurationStr.endsWith("s")) {
    return Number.parseFloat(statusTransitionDurationStr) * 1000;
  } else {
    console.error("Error parsing transition-duration property");
    return 0;
  }
};

const getBookmarks = () => {
  let storedBookmarks;
  try {
    storedBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } catch (err) {
    console.error("bad jason... " + err);
    return [];
  }

  const isValid = (arr) => {
    if (!Array.isArray(arr)) return false;
    if (arr.length < 1) return false;

    return arr.every((obj) => {
      if (!obj) return false;
      if (typeof obj !== "object") return false;
      const keys = Object.keys(obj);
      const values = Object.values(obj);

      return (
        keys.includes("name") &&
        keys.includes("category") &&
        keys.includes("url") &&
        values.every((v) => v)
      );
    });
  };

  return isValid(storedBookmarks) ? storedBookmarks : [];
};

const updateCategoryName = () => {
  categoryNameEles.forEach((ele) => (ele.innerText = categoryDropdown.value));
};

const displayOrCloseForm = () => {
  mainSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
};

const showStatusMsg = (statusEle) => {
  const statusEles = document.querySelectorAll(".status-message");
  statusEles.forEach((ele) => {
    const timers = statusTimers.get(ele);
    // cancel all delayed timers for a status message element
    clearTimeout(timers?.fadeTimeout);
    clearTimeout(timers?.hideTimeout);
    // hide all status eles
    ele.hidden = true;
    // cancel fade class, making sure opacity and position are reset
    ele.classList.remove("fade-down");
  });

  // start showing the status message
  statusEle.hidden = false;

  // timer to auto-hide the status message
  const fadeTimeout = setTimeout(
    () => {
      statusEle.classList.add("fade-down");
    },
    statusDuration - getTransitionDuration(statusEle),
  );

  const hideTimeout = setTimeout(() => {
    statusEle.hidden = true;
    statusEle.classList.remove("fade-down");
  }, statusDuration);

  // store timeouts in a WeakMap
  statusTimers.set(statusEle, { fadeTimeout, hideTimeout });
};

const pushNewBookmark = () => {
  const obj = {
    name: inputName.value,
    url: inputUrl.value,
    category: categoryDropdown.value,
  };

  if (!obj.name || !obj.url) {
    statusError.textContent = "Please provide valid Name and URL";
    showStatusMsg(statusError);
    return false;
  }

  const bookmarks = getBookmarks();

  bookmarks.push(obj);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  statusOk.textContent = "Bookmark added";
  showStatusMsg(statusOk);

  return true;
};

const resetForm = () => {
  inputName.value = "";
  inputUrl.value = "";
};

const displayOrHideCategory = () => {
  mainSection.classList.toggle("hidden");
  bookmarkListSection.classList.toggle("hidden");
};

const updateCategoryList = () => {
  const currCategory = categoryDropdown.value;
  const bookmarks = getBookmarks();
  const currCategoryBookmarks = bookmarks.filter(
    (bookmark) => bookmark.category === currCategory,
  );

  if (currCategoryBookmarks.length < 1) {
    const msg = document.createElement("p");
    msg.textContent = "No Bookmarks Found";

    categoryList.replaceChildren(msg);
  } else {
    categoryList.replaceChildren();

    currCategoryBookmarks.forEach((bookmark) => {
      const wrapper = document.createElement("div");
      const radio = wrapper.appendChild(document.createElement("input"));
      const label = wrapper.appendChild(document.createElement("label"));
      const anchor = label.appendChild(document.createElement("a"));

      wrapper.classList.add("flex");
      radio.type = "radio";
      radio.name = "bookmarks";
      radio.id = bookmark.name;
      radio.value = bookmark.name;
      label.htmlFor = radio.id;
      // change href to plain assignment without validity check if it doesn't pass the test.
      // anchor.href = bookmark.url.startsWith("https://")
      //   ? bookmark.url
      //   : "https://" + bookmark.url;
      //
      // yeah actually failed the test so let's stick with this dumb line:
      anchor.href = bookmark.url;
      anchor.textContent = bookmark.name;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";

      categoryList.append(wrapper);
    });
  }
};

const deleteBookmark = () => {
  const selected = categoryList.querySelector(
    'input[name="bookmarks"]:checked',
  );

  if (!selected) {
    statusError.textContent = "No bookmark selected";
    showStatusMsg(statusError);
  } else {
    const bookmarks = getBookmarks();
    const bookmarkIndex = bookmarks.findIndex(
      (obj) =>
        obj.category === categoryDropdown.value && obj.name === selected.id,
    );

    // start deleting the object from temp array
    bookmarks.splice(bookmarkIndex, 1);
    // let's push to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    statusOk.textContent = "Bookmark deleted";
    showStatusMsg(statusOk);

    updateCategoryList();
  }
};

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  formSection.classList.add("hidden");
  bookmarkListSection.classList.add("hidden");
  mainSection.classList.remove("hidden");
});

viewCategoryBtn.addEventListener("click", () => {
  updateCategoryName();
  displayOrHideCategory();
  updateCategoryList();
});

addBookmarkBtn.addEventListener("click", () => {
  updateCategoryName();
  displayOrCloseForm();
});

bookmarkForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const pushSuccess = pushNewBookmark();

  if (pushSuccess) {
    resetForm();
    displayOrCloseForm();
  }
});

closeFormBtn.addEventListener("click", displayOrCloseForm);

addBookmarkBtnForm.addEventListener("click", (e) => {
  e.preventDefault();
  bookmarkForm.requestSubmit();
});

closeListBtn.addEventListener("click", displayOrHideCategory);

deleteBookmarkBtn.addEventListener("click", deleteBookmark);
