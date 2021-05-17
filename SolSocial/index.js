let myName = ''

function start() {
    initMyProfile()
    initMessages()
    initPeopleFollow()
}

function initMyProfile() {
    let profileContent = ''
    if(localStorage.myProfile === undefined) {
        initDummyProfile()
    } else {
        let myProfile = JSON.parse(localStorage.myProfile)
        myName = myProfile.name
        profileContent += `
            Name: <span id="my-name">${myProfile.name}</span> <br/>
            Occupation: <span id="my-occupation">${myProfile.occupation}</span> <br/>
            Bio: <span id="my-bio">${myProfile.bio}</span> <br/>
            <button id="set-profile-button" class="align-center" onclick="setProfile()">Set Profile</button>`
        document.querySelector('#profile-content').innerHTML = profileContent
    }
}

function setProfile() {
    let profileContent = `Name: <input type="text" id="set-profile-name" placeholder="Type your name..."/> <br/><br/>
        Occupation: <input type="text" id="set-profile-occupation" placeholder="Type your occupation..."/> <br/><br/>
        Bio: <input type="text" id="set-profile-bio" placeholder="Type your bio..."/> <br/><br/>
        <button onclick="saveSetProfile(
            document.querySelector('#set-profile-name').value,
            document.querySelector('#set-profile-occupation').value,
            document.querySelector('#set-profile-bio').value
        )">Save Changes</button>
        <button onclick="cancelSetProfile()">Cancel Changes</button>`

    document.querySelector('#profile-content').innerHTML = profileContent
}

function saveSetProfile(name, occupation, bio) {
    localStorage.myProfile = JSON.stringify({
        name: name,
        occupation: occupation,
        bio: bio
    })
    initMyProfile()
}

function cancelSetProfile() {
    start()
}

function initDummyPeopleToFollow() {
    let users = [
        {
            name: "Tony",
            occupation: "Web App Developer",
            bio: "What stack should I learn next ? Almost finish with the MERN stack..",
            isFollowing: false
        }, {
            name: "Jessica",
            occupation: "Graphic Designer",
            bio: "Working on the next big thing!",
            isFollowing: false
        }, {
            name: "Vladim",
            occupation: "Blockchain Developer",
            bio: "XRP is the most energy efficent, Elon. Hopefully they win in court.",
            isFollowing: false
        }, {
            name: "Tanya",
            occupation: "Youtuber",
            bio: "Just got to LA. Dropping a new video, tonight. Stay tuned.",
            isFollowing: false
        }, {
            name: "Jorge",
            occupation: "Backend Developer",
            bio: "Bootstrap is so easy, to use. Love it!",
            isFollowing: false
        }
    ]
    localStorage.users = JSON.stringify(users)
}

function initPeopleFollow() {
    if(localStorage.users === undefined) initDummyPeopleToFollow()

    let users = JSON.parse(localStorage.users)
    let sectionContent = ''
    for(let i = 0; i < users.length; i++) {
        sectionContent += `<div id="people-to-follow-${i}" class="user-box">
            Name: <span>${users[i].name}</span> <br/>
            Occupation: <span>${users[i].occupation}</span> <br/>
            Bio: <span>${users[i].bio}</span> <br/>
            ${users[i].isFollowing ? `<button class="following-button" onclick="unfollowUser(${i})">Following</button>` : `<button onclick="followUser(${i})">Follow</button>`}
        </div>`
    }
    document.querySelector('#people-to-follow').innerHTML = sectionContent
}

function unfollowUser(id) {
    let users = JSON.parse(localStorage.users)
    users[id].isFollowing = false
    localStorage.users = JSON.stringify(users)
    initPeopleFollow()
}

function followUser(id) {
    let users = JSON.parse(localStorage.users)
    users[id].isFollowing = true
    localStorage.users = JSON.stringify(users)
    initPeopleFollow()
}

function sendMessage(message) {
    let messages = JSON.parse(localStorage.messages)
    messages.push({
        writtenBy: myName,
        content: message
    })
    localStorage.messages = JSON.stringify(messages)
    initMessages()
}

function initMessages() {
    if(localStorage.messages === undefined) initDummyMessages()

    let messages = JSON.parse(localStorage.messages)
    let sectionContent = ''
    for(let i = 0; i < messages.length; i++) {
        sectionContent += `<div class="message-box">
            <div>${messages[i].writtenBy} says:</div>
            <div>${messages[i].content}</div>
        </div>`
    }
    document.querySelector('#messages').innerHTML = sectionContent

}

function initDummyMessages() {
    let messages = [
        {
            content: "Yay, my first post. Follow for follow.",
            writtenBy: "Jane"
        }, {
            content: "Working on the next DeCentralized facebook.",
            writtenBy: "Tony"
        }, {
            content: "Anyone done to get drinks, after work ?",
            writtenBy: "Rick"
        }, {
            content: "Where's Vladim at ?",
            writtenBy: "Jorge"
        }
    ]
    localStorage.messages = JSON.stringify(messages)
}

function initDummyProfile() {
    localStorage.myProfile = JSON.stringify({
        name: "Anonymous",
        occupation: "Beep",
        bio: "I'm just a bot"
    })
    initMyProfile()
}

start()
