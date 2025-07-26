//create connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

//connect to methods that hub invokes(receive) messages from hub
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
});

//invoke hub methods aka send notification to hub
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoaded");
}

//start connection
function fullfilled() {
    console.log("Connection to User hub successfully established.");
}
function rejected() {
    console.log("Connection to User hub failed.");
}

connectionUserCount.start().then(fullfilled, rejected);