using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs;

public class HouseGroupHub : Hub
{
    public static List<string> GroupsJoined { get; set; } = new List<string>();

    public async Task JoinHouse(string houseName)
    {
        //Aqui explicitamos a forma de obter o id de conexão do cliente
        //mais uma observação, se o usuário tiver 3 abas abertas, cada aba tem um id de conexao diferente.
        if (!GroupsJoined.Contains(Context.ConnectionId+":"+houseName))
        {
            GroupsJoined.Add(Context.ConnectionId + ":" + houseName);

            string houseList = "";
            foreach (var str in GroupsJoined)
            {
                if (str.Contains(Context.ConnectionId))
                {
                    houseList += str.Split(':')[1] + "";
                }
            }

            await Clients.Caller.SendAsync("subscriptionStatus", houseList, houseName, true);

            await Groups.AddToGroupAsync(Context.ConnectionId, houseName);
        }
    }

    public async Task LeaveHouse(string houseName)
    {
        if (GroupsJoined.Contains(Context.ConnectionId + ":" + houseName))
        {
            GroupsJoined.Remove(Context.ConnectionId + ":" + houseName);

            string houseList = "";
            foreach (var str in GroupsJoined)
            {
                if (str.Contains(Context.ConnectionId))
                {
                    houseList += str.Split(':')[1] + "";
                }
            }

            await Clients.Caller.SendAsync("subscriptionStatus", houseList, houseName, false);

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, houseName);
        }
    }
}
