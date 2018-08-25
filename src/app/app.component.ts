import { Component, ChangeDetectionStrategy } from '@angular/core';
import { XlsxToJsonService } from './xlsx-to-json-service';
declare let d3: any;
declare let legend: any;

declare let $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
  title = 'app works!';
  public result: any;
  showChart = false;
  public data;
  i=0;
  private xlsxToJsonService: XlsxToJsonService = new XlsxToJsonService();
  constructor() {  }
    ngOnInit(){}
    formData(){
      let list : string[] = [];
      let i = this.i;
      let model = this.result.slice(this.i,this.i+10);
          for(let d of model){
            d.Employee_Tenure = 1*d.Employee_Tenure;
            this.i++;
            list.push(d);
            if(this.i == (i+10)){
              i=0;
              break;}
          this.data = list;
          }
        //   can use keys concept to rename key of json object making chart independent of excel sheet.
        //   let varkeys = this.data[0];
        //   Object.keys(varkeys).map(key =>{
        //     console.log(varkeys[key]);
        //   });
   this.showChart = true;
let div = d3.select("body").append("div")	
.attr("class", "tooltip")				
.style("opacity", 0);
   let margin  = {top: 20, right: 20, bottom: 100, left: 100},
   width   = 1000 - margin.left - margin.right,
   height  = 500 - margin.top - margin.bottom,
   x       = d3.scale.ordinal().rangeRoundBands([0,width], 0.5),
   y       = d3.scale.linear().range([height,0]);
//draw axis
let xAxis   = d3.svg.axis()
   .scale(x)
   .orient("bottom");
let yAxis   = d3.svg.axis()
   .scale(y)
   .orient("left")
   .ticks(20)
   .innerTickSize(-width)
   .outerTickSize(0)
   .tickPadding(10);
let svg     = d3.select("#barGraph")
   .append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   x.domain(this.data.map(function (d)
   {
       return d.First_Name;
   }));
   y.domain([0, d3.max(this.data, function (d)
   {
       return d.Employee_Tenure;
   })]);
   svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0, " + height + ")")
       .call(xAxis)
       .selectAll("text")
       .style("text-anchor", "end")
       .attr("dx", "-0.5em")
       .attr("dy", "-.55em")
       .attr("y", 30)
       .attr("transform", "rotate(-45)" );
   svg.append("g")
       .attr("class", "y axis")
       .call(yAxis)
       .append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 5)
       .attr("dy", "0.8em")
       .attr("text-anchor", "end")
       .text("Tenure (Days)");
   svg.selectAll("bar")
       .data(this.data)
       .enter()
       .append("rect")
       .style("fill", "lightskyblue")
       .attr("x", function(d)
       {
           return x(d.First_Name);
       })
       .attr("width", x.rangeBand())
       .attr("y", function (d)
       {
           return y(d.Employee_Tenure);
       })
       .attr("height", function (d)
       {
           return height - y(d.Employee_Tenure);
       })
       .on("mouseover", function ()
       {
           tooltip.style("display", null);
       })
       .on("mouseout", function ()
       {
           tooltip.style("display", "none");
       })
       .on("mousemove", function (d)
       {
          div.transition()		
            .duration(200)		
            .style("opacity", .9);		
        div	.html("Tenure(Days): " + d.Employee_Tenure +"<br/>" +"Age(Yr) :" + d.Age_Last_Year +
         "<br/>" +"Days on Position :" +d.Number_of_days_position_on_hold)	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 50) + "px");
       });
   let tooltip     = svg.append("g")
       .attr("class", "tooltip")
       .style("display", "none");
   tooltip.append("text")
       .attr("x", 15)
       .attr("dy", "1em")
       .style("text-anchor", "middle")
       .attr("font-size", "1.5em")
       .attr("font-weight", "bold")
       .attr("word-wrap", "break-word");
    }
  handleFile(event) {
    let file = event.target.files[0];
    this.xlsxToJsonService.processFileToJson({}, file).subscribe(data => {
      this.result = data['sheets'].Sheet1;
    this.formData();
    })
  }
  goNext(){
    this.data=[];
    this.formData();
  }
}