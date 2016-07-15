// var dataset = [
//   { label: 'Abulia', count: 10 },
//   { label: 'Betelgeuse', count: 20 },
//   { label: 'Cantaloupe', count: 30 },
//   { label: 'Dijkstra', count: 40 }
// ];

var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2;

var donutWidth = 50;
var legendRectSize = 18;
var legendSpacing = 4;

var color = d3.scale.category20b();

var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate( " + (width / 2) + "," + (height/2) + ")");

var arc = d3.svg.arc()
  .innerRadius(radius - donutWidth)
  .outerRadius(radius);

var pie = d3.layout.pie()
  .value(function(d) { return d.count; })
  .sort(null);

d3.csv("weekdays.csv", type, function(error, dataset) {
  // dataset.forEach(function(d) {
  //   console.log(d.count);
  //   d.count = +d.count;
  //   console.log(d.label);
  // });

  var path = svg.selectAll("path")
    .data(pie(dataset))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", function(d, i) {
      return color(d.data.label);
    })
    .each(function(d) { this._current = d; })
    .append("title")
    .text(function(d) {return "Day: " + d.data.label + "\nCount: " + d.data.count});

  var legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      var height = legendRectSize + legendSpacing;
      var offset =  height * color.domain().length / 2;
      var horz = -2 * legendRectSize;
      var vert = i * height - offset;
      return 'translate(' + horz + ',' + vert + ')';
    });

  legend.append("rect")
    .attr("width", legendRectSize)
    .attr("height", legendRectSize)
    .style("fill", color)
    .style("stroke", color)
    .on("click", function(label) {
      var rect = d3.select(this);
      var enabled = true;
      var totalEnabled = d3.sum(dataset.map(function(d){
        return (d.enabled) ? 1 : 0;
      }));

      if (rect.attr("class") === "disabled") {
        rect.attr("class", "");
      } else {
        if (totalEnabled < 2) return;
        rect.attr("class", "diabled");
        enabled = false;
      }

      pie.value(function(d) {
        if (d.label === label) d.enabled = enabled;
        return (d.enabled) ? d.count : 0;
      });

      path = path.data(pie(dataset));

      path.transition()
        .duration(750)
        .attrTween("d", function(d) {
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function(t) {
            return arc(interpolate(t));
          };
        });
    });

  legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function(d) { return d; });
});

function type(d) {
  d.count = +d.count;
  d.enabled = true;
  return d;
}
