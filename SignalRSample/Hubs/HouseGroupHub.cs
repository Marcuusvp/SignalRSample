﻿using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs;

public class HouseGroupHub : Hub
{
    //TODOS OS CLIENTES QUE CHAMAM ESSE HUB ESTAO NO ARQUIVO houseGroup.js -> WWWROOT/js/houseGroup.js
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
            //Envia para todos os clientes conectados, menos o que está chamando
            await Clients.Others.SendAsync("newMemberAddtoHouse", houseName);
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
            //Envia para todos os clientes conectados, menos o que está chamando, tipo o Others, mas usando o AllExcept
            await Clients.AllExcept(Context.ConnectionId).SendAsync("newMemberRemovedFromHouse", houseName);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, houseName);
        }
    }

    //Lembrando sempre, o método 'TriggerHouseNotify' é chamado pelo cliente, e não pelo servidor.
    public async Task TriggerHouseNotify(string houseName)
    {
        await Clients.Group(houseName).SendAsync("triggerHouseNotification", houseName);
    }
}
