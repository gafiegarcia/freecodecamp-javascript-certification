const forumLatest =
  "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://cdn.freecodecamp.org/curriculum/forum-latest";

const allCategories = {
  299: { category: "Career Advice", className: "career" },
  409: { category: "Project Feedback", className: "feedback" },
  417: { category: "freeCodeCamp Support", className: "support" },
  421: { category: "JavaScript", className: "javascript" },
  423: { category: "HTML - CSS", className: "html-css" },
  424: { category: "Python", className: "python" },
  432: { category: "You Can Do This!", className: "motivation" },
  560: { category: "Back-End Development", className: "backend" },
};

const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

function timeAgo(eventTimestamp) {
  const eventTime = new Date(eventTimestamp).getTime();
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - eventTime;

  let result;
  if (timeDiff < 60 * MINUTE_MS) {
    result = `${Math.floor(timeDiff / MINUTE_MS)}m`;
  } else if (timeDiff < 24 * HOUR_MS) {
    result = `${Math.floor(timeDiff / HOUR_MS)}h`;
  } else {
    result = `${Math.floor(timeDiff / DAY_MS)}d`;
  }

  return result + " ago";
}

function viewCount(views) {
  if (views >= 1000) {
    return String(Math.floor(views / 1000)) + "k";
  }
  return views;
}

function forumCategory(categoryId) {
  // don't know what to do yet if it it's *not* in allCategories, so storing it for now
  const isInAllCategories = Object.hasOwn(allCategories, categoryId);

  
}

async function fetchData() {
  try {
    const response = await fetch(forumLatest);
    if (!response.ok) {
      throw new Error(
        `Fetch failed, status: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}
