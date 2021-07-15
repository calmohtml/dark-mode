"use strict";

const API = "https://api.github.com/users/calmohtml";
const body = document.body;
const container = document.querySelector(".container");
const button = container.querySelector("#button");
let switcher = 1;

const fetchData = async () => {
  try {
    const response = await fetch(API);
    const userData = await response.json();
    const date = new Date(userData.created_at);
    const dateFormatted = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
    }).format(date);
    console.log(date);

    const user = `
      <section class="user__container">
        <figure>
          <img 
            src="${userData.avatar_url}" 
            alt="Image of the GitHub user ${userData.login}" 
          />
        </figure>
        <div class="user__info">
          <h2>@${userData.login}</h2>
          <p>Located at: ${userData.location}</p>
          <p>Bio: ${userData.bio}</p>
          <p>Created at: ${dateFormatted}</p>
          <p>Repos.: ${userData.public_repos}</p>
        </div>
      </section>
    `;
    container.insertAdjacentHTML("beforeend", user);
    console.log(userData);
  } catch (error) {
    console.error(error);
  }
};

fetchData();

button.addEventListener("click", () => {
  const colorManager = () => {
    if (switcher == 1) {
      body.classList.add("dark");
      button.classList.add("darkMode__on");
      return (switcher -= 1);
    } else if (switcher == 0) {
      body.classList.remove("dark");
      button.classList.remove("darkMode__on");
      return (switcher += 1);
    }
  };
  colorManager();
});
