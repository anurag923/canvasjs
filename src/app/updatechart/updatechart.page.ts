import { Component, OnInit } from '@angular/core';
declare const CanvasJS: any;
import * as $ from 'jquery';
import { webSocket } from "rxjs/webSocket";
const subject = webSocket("wss://ws.finnhub.io?token=c5g1l4qad3i9cg8uch10");
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-updatechart',
  templateUrl: './updatechart.page.html',
  styleUrls: ['./updatechart.page.scss'],
})
export class UpdatechartPage implements OnInit {

  livedata: any;
  datapoints = [];
  yval:any;
  latestprice:any;
  x:any;
  constructor(private datePipe:DatePipe) { }

  ngOnInit() {
    subject.subscribe((res) => {
      //console.log(res)
      this.livedata = res;
      //console.log(this.livedata['data']);
      if (this.livedata['data'] != undefined) {
        for(var i=0;i<this.livedata['data'].length;i++){
		 
          var formattedTime = this.datePipe.transform(this.livedata['data'][i].t,'HH:mm:ss');
          this.datapoints.push({y:this.livedata['data'][i].p,label:formattedTime});
          
          sessionStorage.setItem('socketdata', JSON.stringify(this.datapoints));

          this.latestprice = this.livedata['data'][this.livedata['data'].length-1].p;
      }
        console.log(this.datapoints[this.datapoints.length-1].y);
        console.log('latest',this.latestprice);
      }

    });

    subject.next({ 'type': 'subscribe', 'symbol': 'COINBASE:BTC-USD' });
    
    //console.log(this.yval);
    var minutesToAdd=3;
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() + minutesToAdd*60000);
        let dataPoints = [];
    let dataPoints1 = [];
    let dpsLength = 0;
    let chart = new CanvasJS.Chart("chartContainer",{
      exportEnabled: true,
      zoomEnabled:true,
      //backgroundColor: "#172331",
      title:{
        text:"BTC-USD"
      },
      //width: 1200,
      axisX:{
        gridThickness: 1,
        gridColor: "grey",
        minimum: 0,
        interval:0.5
        // stripLines:[
        //   {
              
        //       value:50,                
        //       color:"red",
    
        //   }
        //   ]
        //interval:0.25
      },
      axisY:{
        interval:50,
        gridThickness: 1,
        gridColor: "grey",
        crosshair: {
        enabled: true,
        snapToDataPoint: true,
        valueFormatString: "#,##0.##",
      }

 },
      data: [{
        type: "line",
        dataPoints : dataPoints,
      }
    ]
    });
    setInterval(()=>{
      if(this.datapoints.length!=0){
      console.log(dataPoints);
      var getdata = JSON.parse(sessionStorage.getItem('socketdata'));
      var latestdata = getdata[getdata.length-1].y;
          var d = new Date();
          var datetext = d.toTimeString();
          datetext = datetext.split(' ')[0];
          if(dataPoints.length==0){
            dataPoints.push({label:datetext,y:latestdata},{label:"extra",y:null})
          }
          else{
            dataPoints.splice(dataPoints.length-1,0,{label:datetext,y:latestdata});
            dataPoints[dataPoints.length-1].x = dataPoints.length-1;
          }
          //this.x = 20
          if(dataPoints.length==50){
            dataPoints.shift();
            for(var j=0;j<dataPoints.length;j++){
              dataPoints[j].x = j;
              //this.x=j;
            }
            // dataPoints[dataPoints.length-1].x = dataPoints.length-1;
          }
          console.log(dataPoints);
          chart.render();
          //var interval = chart.axisX[0].get("interval");
          // console.log(interval);
          //chart.axisX[0].set("interval", 0.5)
          chart.axisY[0].crosshair.showAt(latestdata);
          //chart.axisX[0].crosshair.showAt(x);
          
    }
    },1000)
}
}
