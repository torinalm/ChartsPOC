var width = 750;
var height = 600;
var radius = Math.min(width, height) / 2;

var b = {
  w: 75, h: 30, s: 3, t: 10
};

var colors = {
  "LinkDistance": "#5687d1",
  "AgglomerativeCluster": "#7b615c",
  "CommunityStructure": "#de783b",
  "HierarchicalCluster": "#6ab975",
  "MergeEdge": "#a173d1",
  "SpanningTree": "#ff0000",
  "MaxFlowMinCut": "#bbbbbb",
  "ShortestPaths": "#330000",
  "AspectRatioBanker": "#00ffff",
  "BetweennessCentrality": "#006666",
};

var totalSize = 0;

var svg = d3.select("#chart").append("svg:svg")
  .attr("width", width)
  .attr("height", height)
  .append("svg:g")
  .attr("id", "container")
  .attr("transform", "translate(" + width/2 + "," + height/2 +")");

var hue = d3.scale.category10();
var luminance = d3.scale.sqrt()
  .domain([0, 1e6])
  .clamp(true)
  .range([90, 30]);

var partition = d3.layout.partition()
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
  .startAngle(function(d) { return d.x; })
  .endAngle(function(d) { return d.x + d.dx; })
  .innerRadius(function(d) { return Math.sqrt(d.y); })
  .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

var json= {"name": "analytics","children":
  [{"name": "cluster","children": [
    {"name": "AgglomerativeCluster", "size": 3938},
    {"name": "CommunityStructure", "size": 3812},
    {"name": "HierarchicalCluster", "size": 6714},
    {"name": "MergeEdge", "size": 743}]},
   {"name": "graph","children": [
     {"name": "BetweennessCentrality", "size": 3534},
     {"name": "LinkDistance", "size": 5731},
     {"name": "MaxFlowMinCut", "size": 7840},
     {"name": "ShortestPaths", "size": 5914},
     {"name": "SpanningTree", "size": 3416}]},
   {"name": "optimization","children": [
     {"name": "AspectRatioBanker", "size": 7074}]}]};

createVisualization(json);

function createVisualization(json) {
  initializeBreadcrumbTrail();
  drawLegend();
  d3.select("#togglelegend").on("click", toggleLegend);

  svg.append("svg.circle")
    .attr("r", radius)
    .style("opacity", 0);

  var nodes = partition.nodes(json)
    .filter(function (d) {
      return (d.dx > 0.005); //0.005 radians = 0.29 degrees
    });

  var path = svg.data([json]).selectAll("path")
    .data(nodes)
    .enter()
    .append("svg:path")
    .attr("display", function(d) { return d.depth ? null : "none"; })
    .attr("d" , arc)
    .attr("fill-rule", "evenodd")
    .style("fill", function(d) { return colors[d.name]; })
    .style("opacity", 1)
    .append("title")
    .text(function(d){
      return d.size;
    });

  totalSize = path.node().__data__.value;
};

function initializeBreadcrumbTrail() {
  // Add the svg area.
  var trail = d3.select("#sequence").append("svg:svg")
      .attr("width", width)
      .attr("height", 50)
      .attr("id", "trail");
  // Add the label at the end, for the percentage.
  trail.append("svg:text")
    .attr("id", "endlabel")
    .style("fill", "#000");
};

function drawLegend() {

  // Dimensions of legend item: width, height, spacing, radius of rounded rect.
  var li = {
    w: 175, h: 30, s: 3, r: 3
  };

  var legend = d3.select("#legend").append("svg:svg")
      .attr("width", li.w)
      .attr("height", d3.keys(colors).length * (li.h + li.s));

  var g = legend.selectAll("g")
      .data(d3.entries(colors))
      .enter().append("svg:g")
      .attr("transform", function(d, i) {
              return "translate(0," + i * (li.h + li.s) + ")";
           });

  g.append("svg:rect")
      .attr("rx", li.r)
      .attr("ry", li.r)
      .attr("width", li.w)
      .attr("height", li.h)
      .style("fill", function(d) { return d.value; });

  g.append("svg:text")
      .attr("x", li.w / 2)
      .attr("y", li.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.key; });
}

function toggleLegend() {
  var legend = d3.select("#legend");
  if (legend.style("visibility") == "hidden") {
    legend.style("visibility", "");
  } else {
    legend.style("visibility", "hidden");
  }
}
