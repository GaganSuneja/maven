import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WindowRef } from '../common/windowRef';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('myCanvas') myCanvas: ElementRef;
  jsonData: any;
  chart =  [];
  showImportMessage: boolean = false;
  constructor(private winRef: WindowRef) {
  }

  ngOnInit() {
    this.displayChart();
  }

  displayChart(jsonData?: any) {
    let data;
    if (jsonData) {
      data = jsonData;
    }
    else {
      if (!localStorage.getItem('chartData')) {
        this.showImportMessage = true;
        return;
      }
      data = JSON.parse(localStorage.getItem('chartData'));
    }

    let group1 = data['groups'][0];

    let sample_g1 = [];
    for (let index = 0; index < group1['peaks'].length; index++) {
      sample_g1[index] = group1['peaks'][index]['eic'];
    }

    let scatterData = [[], [], []];
    for (let index = 0; index < sample_g1[0]['rt'].length; index++) {
      scatterData[0].push({
        x: sample_g1[0]['rt'][index],
        y: sample_g1[0]['intensity'][index]
      })
    }
    for (let index = 0; index < sample_g1[1]['rt'].length; index++) {
      scatterData[1].push({
        x: sample_g1[1]['rt'][index],
        y: sample_g1[1]['intensity'][index]
      })
    }
    for (let index = 0; index < sample_g1[2]['rt'].length; index++) {
      scatterData[2].push({
        x: sample_g1[2]['rt'][index],
        y: sample_g1[2]['intensity'][index]
      })
    }


    this.chart = new Chart(this.myCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: sample_g1[0]['rt'],
        datasets: [{
          label: group1['peaks'][0]['sampleName'],
          data: scatterData[0],
          lineTension: 0.1,
          backgroundColor: "rgba(69,114 ,167,0.7)",//rgba(248, 213, 34, 1)
          borderColor: "rgba(69,114 ,167,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointStyle: "circle",
          pointBorderColor: "rgba(69,114 ,167,1)",
          pointBackgroundColor: "",
          pointBorderWidth: 1,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: "",
          pointHoverBorderColor: "",
          pointHoverBorderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 2,
          borderWidth: 1,
          fill: false
        }, {
          label: group1['peaks'][1]['sampleName'],
          data: scatterData[1],
          lineTension: 0.1,
          // color: "rgba(133, 199, 243, 1)",
          backgroundColor: "rgba(170,70,67,0.7)",
          borderColor: "rgba(170,70,67,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointStyle: "circle",
          pointBorderColor: "rgba(170,70,67,1)",
          pointBackgroundColor: "",
          pointBorderWidth: 1,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: "",
          pointHoverBorderColor: "",
          pointHoverBorderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 2,
          borderWidth: 1,
          fill: false
        }, {
          label: group1['peaks'][2]['sampleName'],
          data: scatterData[2],
          backgroundColor: "rgba(137,165,78,0.7)",
          borderColor: "rgba(137,165,78,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointStyle: "circle",
          pointBorderColor: "rgba(137,165,78,1)",
          pointBackgroundColor: "",
          pointBorderWidth: 1,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: "",
          pointHoverBorderColor: "",
          pointHoverBorderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 2,
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Rentention Time in Minutes"
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Intensity"
            }
          }]
        },
        title: {
          display: true,
          text: "RT V/S INTENSITY GRAPH",
          fontSize: 13,
          fontFamily: 'AppFont',
          fontColor: '#113f60',
          fontStyle: 'regular'
        }
      }
    });
  }

  onFileChange(input: HTMLInputElement) {
    const selectedFile = input.files[0];
    if (this.winRef.nativeWindow.FileReader) {
      let fReader = new FileReader();
      fReader.readAsText(selectedFile, "UTFs-8");
      fReader.onload = (evt) => {
        let stringData = evt.target['result'];
        localStorage.setItem('chartData', stringData);
        this.jsonData = JSON.parse(stringData);
        this.showImportMessage = false;
        this.displayChart(this.jsonData);
      }
    } else {
      alert("your browser does not support file reader");
    }
  }
}