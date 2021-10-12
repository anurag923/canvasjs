import { Component, OnInit } from '@angular/core';
declare const CanvasJS: any;
import * as $ from 'jquery';
@Component({
  selector: 'app-testgraph',
  templateUrl: './testgraph.page.html',
  styleUrls: ['./testgraph.page.scss'],
})
export class TestgraphPage implements OnInit {

  ngOnInit() {
    let dataPoints = [];
    let dpsLength = 0;
    let chart = new CanvasJS.Chart("chartContainer",{
      exportEnabled: true,
      backgroundColor: "black",
      title:{
        text:"Live Chart with Data-Points from External JSON"
      },
      data: [{
        type: "line",
        dataPoints : dataPoints
      },
      {
        type: "line",
        markerSize: 0,
        highlightEnabled: false,
        toolTipContent: null,
        dataPoints: [
        { x: 25, y: 40 },
        { x: 35, y: 40 }
        ]
        }
    ]
    });
    
    $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=25&length=20&type=json&callback=?", function(data) {  
      $.each(data, function(key, value){
        dataPoints.push({x: value[0], y: parseInt(value[1])});
      });
      dpsLength = dataPoints.length;
      chart.render();
      updateChart();
    });
    function updateChart() {	
    $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dpsLength + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json&callback=?", function(data) {
      $.each(data, function(key, value) {
        dataPoints.push({
        x: parseInt(value[0]),
        y: parseInt(value[1])
        });
        dpsLength++;
      });
      
      if (dataPoints.length >  20 ) {
            dataPoints.shift();				
          }
      chart.render();
      setTimeout(function(){updateChart()}, 1000);
    });
  }
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
  context.moveTo(25,60);
  // End point (180,47)
  context.lineTo(40,1000);
  // Make the line visible
  context.strokeStyle = 'red';
  context.lineWidth = 5;
  context.stroke();
  }
}
}
