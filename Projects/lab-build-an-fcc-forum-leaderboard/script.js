const postsContainer = document.getElementById("posts-container");

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
  // may be missing, so value may be `undefined`
  const currentCategory = allCategories[categoryId];

  const categoryName = currentCategory?.category ?? "General";
  const categoryClass = `${currentCategory?.className ?? "general"}`;
  const href = `${forumCategoryUrl}${categoryClass}/${categoryId}`;
  return `<a class="category ${categoryClass}" href="${href}">${categoryName}</a>`;
}

function avatars(posters, users) {
  const result = posters.reduce((imgElesHTML, poster) => {
    const user = users.find((user) => user.id === poster.user_id);
    const avatarTemplate = user.avatar_template.replace("{size}", 30);
    const imgSrc = avatarTemplate.startsWith("/")
      ? avatarUrl + avatarTemplate
      : avatarTemplate;
    return `${imgElesHTML}<img src="${imgSrc}" alt="${user.name}"/>`;
  }, "");

  return result;
}

function showLatestPosts(object) {
  const users = object.users;
  const topics = object.topic_list.topics;
  postsContainer.innerHTML = topics.reduce(
    (tableRowsHTML, topic) =>
      `${tableRowsHTML}
      <tr>
        <td>
          <a class="post-title" href="${forumTopicUrl}${topic.slug}/${topic.id}">${topic.title}</a>
          ${forumCategory(topic.category_id)}
        </td>
        <td><div class="avatar-container">${avatars(topic.posters, users)}</div></td>
        <td>${topic.posts_count - 1}</td>
        <td>${viewCount(topic.views)}</td>
        <td>${timeAgo(topic.bumped_at)}</td>
      </tr>`,
    "",
  );
}

async function fetchData() {
  try {
    const response = await fetch(forumLatest);
    if (!response.ok) {
      throw new Error(
        `Fetch failed, status: ${response.status} ${response.statusText}`,
      );
    }

    showLatestPosts(await response.json());
  } catch (e) {
    console.log(e);
  }
}

fetchData();
