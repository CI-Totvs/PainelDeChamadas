using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server_Client.Hubs
{
    public class CallHub : Hub
    {
        public async Task Call(string name, string dest)
        {
            await Clients.All.SendAsync("ReceiveMessage", name, dest);
        }
    }
}
