const personalOverviewElement = document.querySelector(".overview");
const username = "bbuglz81";
const repoList = document.querySelector(".repo-list");

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
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo")
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};
