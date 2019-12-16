using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Hubs
{
    public class CallHub : Hub
    {
        public async Task Call(string name, string destination)
        {
            await Clients.All.SendAsync("ReceiveMessage", name, destination);
        }
    }
}
