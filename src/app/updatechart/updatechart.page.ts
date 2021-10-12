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
    let dataPoints = [];
    let dataPoints1 = [];
    let dpsLength = 0;
    let chart = new CanvasJS.Chart("chartContainer",{
      exportEnabled: true,
      zoomEnabled:true,
      title:{
        text:"BTC-USD"
      },
      width: 900,
      axisY:{
       interval:50,
       crosshair: {
        enabled: true,
        snapToDataPoint: true,
        valueFormatString: "#,##0.##",
        // labelFormatter: function (e) {
				// 	return "Y-Value is " + CanvasJS.formatNumber(e.value, "#,###");
				// }
      }
// minimum: 57000,
// maximum: 58000,
// interval: 100,
// valueFormatString: "#",
//   interval: 1
 },
      data: [{
        type: "line",
        dataPoints : dataPoints,
      }
    ]
    });
    //console.log("outside if");
    setInterval(()=>{
      if(this.datapoints.length!=0){
      // if(dataPoints.length==10){
      //   dataPoints.splice(10,dataPoints.length-10);
      // }
      console.log(dataPoints);
      //console.log("inside if");
      var getdata = JSON.parse(sessionStorage.getItem('socketdata'));
      var latestdata = getdata[getdata.length-1].y;
          var d = new Date();
          var datetext = d.toTimeString();
          datetext = datetext.split(' ')[0];
          dataPoints.push({label:datetext,y:latestdata});
          if(dataPoints.length==100){
            dataPoints.splice(100,dataPoints.length-100);
          }
          console.log(dataPoints);
          chart.render();
          chart.axisY[0].crosshair.showAt(latestdata);
      //chart.axisX[0].crosshair.set("labelFormatter",latestdata);
      //console.log(getdata);
      // $.getJSON("https://canvasjs.com/services/data/datapoints.php?ystart="+getdata[0].y+"&type=json&callback=?", function(data) {  
      //   //console.log(data);
      //   $.each(data, function(key, value){
      //     //console.log(value);
      //     var d = new Date();
      //     var datetext = d.toTimeString();
      //     datetext = datetext.split(' ')[0];
      //     dataPoints.push({label: datetext, y: value[1]/100});
      //   });
      //   console.log(dataPoints[dataPoints.length-1].y);
      //   dpsLength = dataPoints.length;
      //   if(dpsLength>1){
      //     dataPoints.shift();
      //   }
      //   chart.render();
      // });
    }
    },1000)
}
}
