import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare const CanvasJS: any;
import * as $ from 'jquery';
import { webSocket } from "rxjs/webSocket";
//const subject = webSocket("wss://socket.polygon.io/crypto");
const subject = webSocket("wss://ws.finnhub.io?token=c5g1l4qad3i9cg8uch10");
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  livedata:any;
  datapoints = []
  yval:any;
  chart:any;
  constructor(private http:HttpClient,private datePipe: DatePipe) {}
  ngOnInit(){
	
    //subject.next({action:"auth",params:"6sEFcNe2upitHW5lt9dp7EfkIuxoR58k"});
    subject.subscribe(
      (msg) => {console.log('message received: ' + msg);
      this.livedata = msg;
	  console.log('livedata',this.livedata['data']);
	  if(this.livedata['data']!=undefined){
		for(var i=0;i<this.livedata['data'].length;i++){
		 
			// console.log("p is there");
			var formattedTime = this.datePipe.transform(this.livedata['data'][i].t,'HH:mm:ss');
			this.datapoints.push({y:this.livedata['data'][i].p,label:formattedTime});
			
			
	}
	  }
	  console.log('datapoints',this.datapoints);
	  for(var j=0;j<this.datapoints.length;j++){
		  if(this.datapoints[j].label == "14:32:00"){
			  this.yval = this.datapoints[j].y;
		  }
	  }
		this.chart = new CanvasJS.Chart("chartContainer1",{
			exportEnabled: true,
			title:{
				text:"BTC-USD"
			},
			axisY:{
				stripLines:[
					 {
						 
						 value:this.yval,                
						 color:"red",
						 thickness: 2
					 }
					 ]
		  },
			data: [{
				type: "line",
				color:"green",
				dataPoints : this.datapoints,
			}
		]
		});
		console.log('chart',this.chart);
		this.chart.render();
		
		
    }, // Called whenever there is a message from the server.
      (err) => {console.log(err)}, // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
    // subject.next({action:"subscribe",params:"XT.BTC-USD"});
	subject.next({'type':'subscribe', 'symbol': 'COINBASE:BTC-USD'});
}
	line(){
		var canvas = <HTMLCanvasElement>document.getElementsByTagName('canvas')[0];
//Always check for properties and methods, to make sure your code doesn't break in other browsers.
		if (canvas.getContext) 
		{
		var context = canvas.getContext('2d');
		// Reset the current path
		context.beginPath(); 
		// Staring point (10,45)
		context.moveTo(10,45);
		// End point (180,47)
		context.lineTo(180,47);
		// Make the line visible
		context.strokeStyle = 'red';
		context.lineWidth = 5;
		context.stroke();
		}
	}

}
