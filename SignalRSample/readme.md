Como estou seguindo um tutorial com mvc, a parte de configuração do SignalR client server precisei rodar alguns comandos no terminal para funcionar
-> Passo um instalar o libman [dotnet tool install -g Microsoft.Web.LibraryManager.Cli]
-> Passo dois instalar o SignalR client [libman install @microsoft/signalr@latest --provider unpkg]
Durante a instalação do signal direcionar a pasta wwwroot/lib/microsoft
Mover o arquivi [signalr.js] para a pasta wwwroot/js.