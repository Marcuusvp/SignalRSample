using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs;

public class UserHub : Hub 
{
    public static int TotalViews { get; set; } = 0;
    public static int TotalUsers { get; set; } = 0;

    public override async Task OnConnectedAsync()
    {
        TotalUsers++;
        //Teste com método assincrono usando await padrao
        await Clients.All.SendAsync("updateTotalUsers", TotalUsers);
        await base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        TotalUsers--;
        //Teste com método síncrono usando getAwaiter
        Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
        return base.OnDisconnectedAsync(exception);
    }

    public async Task NewWindowLoaded() 
    {
        TotalViews++;
        // Notify all connected clients about the updated user count
        // Esse metodo chamado dentro do sendAsync, deve ser criado no client side,
        // é possível passar quantos parâmetros quiser ex: ("updateTotalViews", TotalViews, param2, param3)
        await Clients.All.SendAsync("updateTotalViews", TotalViews);
    }
}
