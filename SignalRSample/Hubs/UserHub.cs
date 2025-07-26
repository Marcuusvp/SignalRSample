using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs;

public class UserHub : Hub 
{
    public static int TotalViews { get; set; } = 0;


    public async Task NewWindowLoaded() 
    {
        TotalViews++;
        // Notify all connected clients about the updated user count
        // Esse metodo chamado dentro do sendAsync, deve ser criado no client side,
        // é possível passar quantos parâmetros quiser ex: ("updateTotalViews", TotalViews, param2, param3)
        await Clients.All.SendAsync("updateTotalViews", TotalViews);
    }
}
