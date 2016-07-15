d3.csv("aster_data.csv", type, function(d) {
  console.log(d[0]);
});

// // var h = 400;
// // var w = 300;
//
// var dataset = [{"year": 2006, "books": 54},
//                {"year": 2007, "books": 43},
//                {"year": 2008, "books": 41},
//                {"year": 2009, "books": 44},
//                {"year": 2010, "books": 35},];
//
// var barWidth = 40;
// var w = 500;
// var h = 250;
// var radius = 15;
// var padding = 2 * radius;
//
// var x = d3.scaleLinear().domain([d3.min(dataset, function(d) { return d.year;}), d3.max(dataset, function(d) { return d.year;})]).range([padding, w - padding]);
// var y = d3.scaleLinear().domain([0, d3.max(dataset, function(datum) { return datum.books; })])
//         .rangeRound([h - padding, padding]);
//
// var xAxis = d3.axisBottom()
//   .scale(x);
// var yAxis = d3.axisLeft()
//   .scale(y);
//
// var colors = {
//   "2006": "#5687d1",
//   "2007": "#7b615c",
//   "2008": "#de783b",
//   "2009": "#6ab975",
//   "2010": "#a173d1",
// };
//
// var svg = d3.select("body")
//             .append("svg")
//             .attr("width", w)
//             .attr("height", h);
//
// console.log(h);
//
// //Bar Chart
// // var rects = svg.selectAll("rect")
// //             .data(dataset)
// //             .enter()
// //             .append("rect")
// //             .attr("x", function(d, i){
// //               return x(i);
// //             })
// //             .attr("y", function(d, i){
// //               return h - y(d.books);
// //             })
// //             .attr("height", function(d, i){
// //               return x(d.books);
// //             })
// //             .attr("width", barWidth)
// //             .attr("fill", "black")
// //             .append("title")
// //             .text(function(d){
// //               return d.books;
// //             });
//
// //Scatter Plot
// var circles = svg.selectAll("circle")
//   .data(dataset)
//   .enter()
//   .append("circle")
//   .attr("cx", function(d) { return x(d.year); })
//   .attr("cy", function(d) { return y(d.books); })
//   .attr("r", function(d) { return (d.books / 4);})
//   .attr("fill", function(d) { return colors[d.year]; })
//   .append("title")
//   .text(function(d) {return d.books;});
//
// svg.append("g")
//   .attr("class", "axis")
//   .attr("transform", "translate(0, " + (h - padding) + ")")
//   .call(xAxis);
//
// svg.append("g")
//   .attr("class", "axis")
//   .attr("transform", "translate("+ padding +",0)")
//   .call(yAxis);
//
// var arc = d3.arc()
//   .startAngle(0)
//   .endAngle(90);
//
// var path = svg.selectAll("path")
//   .data(d3.pie()(dataset))
//   .enter()
//   .append("svg:path")
//   .attr("d", arc)
//   .style("fill", function(d) {return colors[d.year];})
//   .style("opacity", 1)
//   .attr("transform", "translate(40, 40)")
//   .append("title")
//   .text("HEY");
