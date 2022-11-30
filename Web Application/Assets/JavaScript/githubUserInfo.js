let githubAPI = "https://api.github.com/users/";
let noUserMessage = document.getElementById('noUserMessage');
let noRepoMessage = document.getElementById('noRepoMessage');
let profileInitLoadingMessage = document.getElementById('profileInitLoadingMessage');
let repoInitLoadingMessage = document.getElementById('repoInitLoadingMessage');

noUserMessage.style.display = 'none';
noRepoMessage.style.display = 'none'

async function userGithubSearch(){
    let username = document.getElementById('enteredGithubUsername').value;
    let fetchUserInfo = await fetch(githubAPI + username);
    if (!fetchUserInfo.ok) {
        noUserMessage.style.display = '';
        noRepoMessage.style.display = '';
        throw new Error('No User Found');
    }
    let userInfo = await fetchUserInfo.json();
    displayUserProfile(userInfo, username);
    displayUserRepo(username);
}

function displayUserProfile(githubUserInfo, githubUser) {
    let githubName = document.getElementById('githubName');
    let githubUsername = document.getElementById('githubUsername');
    let githubEmail = document.getElementById('githubEmail');
    let githubLocation = document.getElementById('githubLocation');
    let githubNumOfGists = document.getElementById('githubNumOfGists');
    let githubUserImage = document.getElementById('userImage');

    githubUserImage.innerHTML = '<img src="'+ githubUserInfo.avatar_url+'">';
    
    if (githubUserInfo.name != null) {
        githubName.innerHTML = githubUserInfo.name;
    } else {
        githubName.innerHTML = "Not Available"
    }

    if (githubUser != null) {
        githubUsername.innerHTML = githubUser;
    } else {
        githubUsername.innerHTML = "Not Available"
    }
    
    if (githubUserInfo.email != null) {
        githubEmail.innerHTML = githubUserInfo.email;
    } else {
        githubEmail.innerHTML = "Not Available"
    }

    if (githubUserInfo.location != null) {
        githubLocation.innerHTML = githubUserInfo.location;
    } else {
        githubLocation.innerHTML = "Not Available"
    }

    if (githubUserInfo.public_gists != null) {
        githubNumOfGists.innerHTML = githubUserInfo.public_gists;
    } else {
        githubNumOfGists.innerHTML = "Not Available"
    }

    profileInitLoadingMessage.style.display = 'none';
}

async function displayUserRepo (githubUsername) {
    let fetchUserInfo = await fetch(githubAPI + githubUsername + "/repos");
    let userRepoInfo = await fetchUserInfo.json();
    let createDiv = document.createElement('div');
    let scrollCount = 0;
    
    userRepoInfo.forEach(element => {
        let createDiv2 = document.createElement('div');
        let repoDiv = document.getElementById('displayUserRepo');
        let repoName = "<h4>Repository Name: </h4><p>"+ element.name + "</p>";
        let repoDesc = "<h4>Repository Description: </h4><p>"+ element.description + "</p>";

        createDiv2.innerHTML = repoName + repoDesc;
        createDiv.innerHTML += createDiv2.outerHTML;
        repoDiv.innerHTML = createDiv.innerHTML;
        scrollCount++;

        if (scrollCount == 4) {
            repoDiv.style.overflow = 'scroll'
        }
    });

    repoInitLoadingMessage.style.display = 'none';
}