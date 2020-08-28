import React, { Component } from "react";
import "./App.css";
import CanvasJSReact from "./assets/canvasjs.react";
import "react-dropdown/style.css";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var deldataPoints = [];
var mumdataPoints = [];
var dataPoints3 = [];
var dataPoints4 = [];
var dataPoints5 = [];
var dataPoints6 = [];
// var chart = this.chart;
class App extends Component {
  async componentDidMount() {
    // console.log(mydata);
    var chart = this.chart;
    await fetch("https://5f47b69d95646700168d9c99.mockapi.io/Products")
      .then(function (response) {
        return response.json();
      })
      .then(function (mydata) {
        for (var i = 0; i < 5; i++) {
          deldataPoints.push({
            name: mydata[0]["Delhi"][i]["name"],
            y: mydata[0]["Delhi"][i]["profit"],
          });

          mumdataPoints.push({
            name: mydata[0]["Mumbai"][i]["name"],
            y: mydata[0]["Mumbai"][i]["profit"],
          });

          dataPoints3.push({
            y: mydata[0]["Mumbai"][i]["actualRevenue"],
            label: mydata[0]["Mumbai"][i]["name"],
          });

          dataPoints4.push({
            y: mydata[0]["Mumbai"][i]["targetedRevenue"],
            label: mydata[0]["Mumbai"][i]["name"],
          });

          dataPoints5.push({
            y: mydata[0]["Delhi"][i]["actualRevenue"],
            label: mydata[0]["Delhi"][i]["name"],
          });

          dataPoints6.push({
            y: mydata[0]["Delhi"][i]["targetedRevenue"],
            label: mydata[0]["Delhi"][i]["name"],
          });
        }
        setTimeout(() => {
          chart.render();
        }, 3000);
      });
  }

  render() {
    const options1 = {
      animationEnabled: true,
      title: {
        text: "Profit Shares for Delhi",
      },
      subtitles: [
        {
          text: "Delhi",
          verticalAlign: "center",
          fontSize: 24,
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###'%'",
          dataPoints: deldataPoints,
        },
      ],
    };

    const options2 = {
      animationEnabled: true,
      title: {
        text: "Profit Shares for Mumbai",
      },
      subtitles: [
        {
          text: "Mumbai",
          verticalAlign: "center",
          fontSize: 24,
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###'%'",
          dataPoints: mumdataPoints,
        },
      ],
    };

    const options3 = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Actual vs Targeted Revenue (Mumbai)",
      },
      axisX: {
        title: "Products",
        reversed: true,
      },
      axisY: {
        title: "Revenue",
        includeZero: true,
        labelFormatter: this.addSymbols,
      },
      data: [
        {
          showInLegend: true,
          name: "Actual Revenue",
          type: "bar",
          dataPoints: dataPoints3,
        },
        {
          showInLegend: true,
          name: "Target Revenue",
          type: "bar",
          dataPoints: dataPoints4,
        },
      ],
    };

    const options4 = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Actual vs Targeted Revenue (Delhi)",
      },
      axisX: {
        title: "Products",
        reversed: true,
      },
      axisY: {
        title: "Revenue",
        includeZero: true,
        labelFormatter: this.addSymbols,
      },
      data: [
        {
          showInLegend: true,
          name: "Actual Revenue",
          type: "bar",
          dataPoints: dataPoints5,
        },
        {
          showInLegend: true,
          name: "Target Revenue",
          type: "bar",
          dataPoints: dataPoints6,
        },
      ],
    };

    // var chart = this.chart;
    // chart.render();

    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <CanvasJSChart
              options={options1}
              onRef={(ref) => (this.chart = ref)}
              // chart.render();
            />
          </div>

          <div className="col-6">
            <CanvasJSChart
              options={options2}
              onRef={(ref) => (this.chart = ref)}
            />
          </div>

          <div className="col-6">
            <CanvasJSChart
              options={options3}
              onRef={(ref) => (this.chart = ref)}
            />
          </div>

          <div className="col-6">
            <CanvasJSChart
              options={options4}
              onRef={(ref) => (this.chart = ref)}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
