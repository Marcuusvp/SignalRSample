﻿let lbl_houseJoined = document.getElementById("lbl_houseJoined");


let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");
let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");

var connectionHouse = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/houseGroup").build();

//Subscribe buttons
btn_gryffindor.addEventListener("click", function (event){
    connectionHouse.send("JoinHouse", "Gryffindor")
    event.preventDefault();
});

btn_hufflepuff.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Hufflepuff")
    event.preventDefault();
});

btn_ravenclaw.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Ravenclaw")
    event.preventDefault();
});

btn_slytherin.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Slytherin")
    event.preventDefault();
});

//Unsubscribe buttons
btn_un_gryffindor.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Gryffindor")
    event.preventDefault();
});

btn_un_hufflepuff.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Hufflepuff")
    event.preventDefault();
});

btn_un_ravenclaw.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Ravenclaw")
    event.preventDefault();
});

btn_un_slytherin.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Slytherin")
    event.preventDefault();
});

//Trigger notification buttons
trigger_gryffindor.addEventListener("click", function (event) {
    connectionHouse.send("TriggerHouseNotify", "Gryffindor")
    event.preventDefault();
});

trigger_hufflepuff.addEventListener("click", function (event) {
    connectionHouse.send("TriggerHouseNotify", "Hufflepuff")
    event.preventDefault();
});

trigger_ravenclaw.addEventListener("click", function (event) {
    connectionHouse.send("TriggerHouseNotify", "Ravenclaw")
    event.preventDefault();
});

trigger_slytherin.addEventListener("click", function (event) {
    connectionHouse.send("TriggerHouseNotify", "Slytherin")
    event.preventDefault();
});


//CONNECTIONS
connectionHouse.on("newMemberAddtoHouse", (houseName) => {
    toastr.success(`Member has subscribed to ${houseName}`)
})

connectionHouse.on("newMemberRemovedFromHouse", (houseName) => {
    toastr.warning(`Member has unsubscribed from ${houseName}`)
})

connectionHouse.on("triggerHouseNotification", (houseName) => {
    toastr.warning(`A notification for ${houseName} has been launched`)
})


connectionHouse.on("subscriptionStatus", (strGroupsJoined, houseName, hasSubscribed) => {
    lbl_houseJoined.innerText = strGroupsJoined;

    if (hasSubscribed) {
        //subscribe to
        switch (houseName) {
            case "Gryffindor":
                btn_gryffindor.style.display = "none";
                btn_un_gryffindor.style.display = "";
                break;
            case "Hufflepuff":
                btn_hufflepuff.style.display = "none";
                btn_un_hufflepuff.style.display = "";
                break;
            case "Ravenclaw":
                btn_ravenclaw.style.display = "none";
                btn_un_ravenclaw.style.display = "";
                break;
            case "Slytherin":
                btn_slytherin.style.display = "none";
                btn_un_slytherin.style.display = "";
                break;
            default:
                break;
        }

        toastr.success("You have successfully joined the " + houseName + " house.")
    } else {
        //unsubscribe from
        switch (houseName) {
            case "Gryffindor":
                btn_gryffindor.style.display = "";
                btn_un_gryffindor.style.display = "none";
                break;
            case "Hufflepuff":
                btn_hufflepuff.style.display = "";
                btn_un_hufflepuff.style.display = "none";
                break;
            case "Ravenclaw":
                btn_ravenclaw.style.display = "";
                btn_un_ravenclaw.style.display = "none";
                break;
            case "Slytherin":
                btn_slytherin.style.display = "";
                btn_un_slytherin.style.display = "none";
                break;
            default:
                break;
        }
        toastr.warning("You have successfully left the " + houseName + " house.")
    }
})

//start connection
function fullfilled() {
    console.log("Connection to User hub successfully established.");
}
function rejected() {
    console.log("Connection to User hub failed.");
}

connectionHouse.start().then(fullfilled, rejected);