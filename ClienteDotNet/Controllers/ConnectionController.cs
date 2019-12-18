using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Client;

namespace ClienteDotNet.Controllers
{
    public class ConnectionController : Controller
    {
        HubConnection connection;
        public ConnectionController()
        {         
            connection = new HubConnectionBuilder()
                .WithUrl("http://localhost:53353/ChatHub")
                .Build();


        }
        public IActionResult Index()
        {
            return View();
        }
    }
}