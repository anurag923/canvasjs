import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-finnhub',
  templateUrl: './finnhub.page.html',
  styleUrls: ['./finnhub.page.scss'],
})
export class FinnhubPage implements OnInit {
  livedata:any;
  data:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    
    this.http.get('https://finnhub.io/api/v1/crypto/symbol?exchange=COINBASE&token=c5g1l4qad3i9cg8uch10').subscribe((res)=>{
      console.log('data',res);
      this.data = res;
    })
    const socket = new WebSocket('wss://ws.finnhub.io?token=c5g1l4qad3i9cg8uch10');

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    //socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'XNYS'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'COINBASE:ETH-USD'}))
    //socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);

});

// Unsubscribe
 var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}

  }

}
