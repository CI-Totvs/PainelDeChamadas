using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Server_Client.Hubs;
using Server_Client.Models;

namespace Server_Client.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<CallHub> _hubContext;
            
        public HomeController(IHubContext<CallHub> hubContext)
        {
            _hubContext = hubContext;
        }
        public IActionResult Index()
        {           
            return View();
        }
        [HttpGet]
        [Route("Call")]
        public async void Call(string nome, string lugar)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", nome, lugar);          
        }

       
    }
}
