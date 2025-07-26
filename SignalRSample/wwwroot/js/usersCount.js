//create connection
//Primeiro passo é a conexao via o endpoint do hub
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

//connect to methods that hub invokes(receive) messages from hub
//Segundo passo, conecta no método que esta no sendAsync no hub -> updateTotalViews
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
});

connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
});


//invoke hub methods aka send notification to hub
//Terceiro passo, envia uma mensagem para o hub via o método criado no hub -> NewWindowLoaded
function newWindowLoadedOnClient() {
    //Qual a diferença entre connectionUserCount.send e connectionUserCount.invoke?
    //connectionUserCount.send é usado para enviar uma mensagem ao hub sem esperar uma resposta.
    //connectionUserCount.invoke é usado para enviar uma mensagem ao hub e esperar uma resposta.
    connectionUserCount.send("NewWindowLoaded");
}

//start connection
function fullfilled() {
    console.log("Connection to User hub successfully established.");
    newWindowLoadedOnClient();
}
function rejected() {
    console.log("Connection to User hub failed.");
}

connectionUserCount.start().then(fullfilled, rejected);

//Resumo desse script, conecta no hub via endpoint(primeiro passo), cria uma conexao com o método do sendAsync(segundo passo),
//usa a conexao para enviar mensagem ao hub, via o método criado no hub(terceiro passo). E por fim, inicia a conexão com o hub, se tudo der certo
//envia uma chamada para o hub, que realiza o incremento da contagem.