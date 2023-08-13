const personalOverviewElement = document.querySelector(".overview");
const username = "bbuglz81";
const repoList = document.querySelector(".repo-list");
const repoElement = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const getGithubInfo = async function () {
    const infoRequest = await fetch(`https://api.github.com/users/${username}`);
    const info = await infoRequest.json();
    console.log(info);
    displayGithubInfo(info)
};
getGithubInfo();

const displayGithubInfo = function (info) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src= ${info.avatar_url}/>
        </figure>
        <div>
            <p><strong>Name:</strong> ${info.name}</p>
            <p><strong>Bio:</strong> ${info.bio}</p>
            <p><strong>Location:</strong> ${info.location}</p>
            <p><strong>Number of public repos:</strong> ${info.public_repos}</p>
        </div>
        `
    personalOverviewElement.append(div);
    getRepos();
};

const getRepos = async function () {
    const repoRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoRequest.json();
    //console.log(repoData);
    displayRepos(repoData);
};

const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo")
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getSpecificRepo(repoName);
    }
});

const getSpecificRepo = async function (repoName) {
    const repoInfoRequest = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
    const repoInfo = await repoInfoRequest.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    //console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repoElement.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
    viewReposButton.classList.remove("hide");
};

viewReposButton.addEventListener("click", function () {
    repoElement.classList.remove("hide");
    repoData.classList.add("hide");
    viewReposButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const searchInput = e.target.value;
    //console.log(searchInput);
    const repos = document.querySelectorAll(".repo");
    const searchText = searchInput.toLowerCase();
    for (const repo of repos) {
        const lowerInnerText = repo.innerText.toLowerCase();
        if (lowerInnerText.includes(searchText)) {
            repo.classList.remove("hide");
        }
        else {
            repo.classList.add("hide");
        }
    }
});