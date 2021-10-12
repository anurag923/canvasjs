import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare const CanvasJS: any;
import * as $ from 'jquery';
import { webSocket } from "rxjs/webSocket";
const subject = webSocket("wss://socket.polygon.io/crypto");
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-polygon',
  templateUrl: './polygon.page.html',
  styleUrls: ['./polygon.page.scss'],
})
export class PolygonPage implements OnInit {
  livedata:any;
  datapoints = []
  yval:any;
  chart:any;
  constructor(private http:HttpClient,private datePipe: DatePipe){}

  ngOnInit() {
        //subject.next({action:"auth",params:"6sEFcNe2upitHW5lt9dp7EfkIuxoR58k"});
        subject.subscribe(
            (msg) => {console.log('message received: ' + msg);
            this.livedata = msg;
          console.log('livedata',this.livedata);
          for(var i=0;i<this.livedata.length;i++){
            if("p" in this.livedata[i]){
            var formattedTime = this.datePipe.transform(this.livedata[0].t,'HH:mm:ss');
            this.datapoints.push({y:this.livedata[0].p,label:formattedTime});
            console.log('datapoints',this.datapoints);
            
            }
          }
          for(var j=0;j<this.datapoints.length;j++){
            if(this.datapoints[j].label == "14:32:00"){
              this.yval = this.datapoints[j].y;
            }
          }
          this.chart = new CanvasJS.Chart("chartContainer2",{
            exportEnabled: true,
            title:{
              text:"test"
            },
            zoomEnabled:true,
            axisX:{
              title: "Red Color labels",
              labelFontColor: "white"
            },
            axisY:{
              labelFontColor: "white",
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
      subject.next({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'});
  }

}
