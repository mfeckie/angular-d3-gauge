'use strict';
/*global d3:false */

var d3Gauge = function (configObject, sections, value) {

  var d3Gauge = {
    version: '0.0.1'
  };

  var config = {
    id: '',
    width: 700,
    height: 300,
    minValue: 0,
    maxValue: 100,
    colorStart: 'green',
    colorEnd: 'red'
  };

  for (var item in configObject) {
    config[item] = configObject[item];
  }
  var sectionExtent = d3.extent(d3.merge(sections));
  var gaugeScale = d3.scale.linear().domain(sectionExtent).range([-0.5 * Math.PI, 0.5 * Math.PI]);
  var colorScale = d3.scale.linear().domain(sectionExtent).range([config.colorStart, config.colorEnd]);
  var needleScale = d3.scale.linear().domain([config.minValue, config.maxValue]).range([0, 180]);
  var needleArc = d3.svg.arc().innerRadius(0).outerRadius(config.width / 2).startAngle(gaugeScale(0)).endAngle(gaugeScale(0));

  var chart = d3.select(config.id);
  var svg = chart.append('svg')
      .style('width', config.width + 'px')
      .style('height', config.height + 'px')
      .style('border', 'solid black 2px');

  var centrePoint = function () {
    return 'translate(' + config.width / 2 + ',' + config.height + ')';
  };


  var createScaleArc = function () {
    var createArc = function (start, finish) {
      return d3.svg.arc()
          .innerRadius(config.width / 4)
          .outerRadius(config.width / 2)
          .startAngle(gaugeScale(start))
          .endAngle(gaugeScale(finish));
    };
    for (var i = 0; i < sections.length; i++) {
      svg.append('path')
          .attr('class', 'background')
          .attr('d', createArc(sections[i][0], sections[i][1]))
          .attr('transform', centrePoint())
          .style('fill', colorScale(sections[i][0]));
    }
  };


  var addNeedle = function () {
    svg.selectAll('path.needle')
        .data([value])
        .enter()
        .append('path')
        .attr('class', 'needle')
        .attr('d', needleArc)
        .style('fill', 'black')
        .attr('stroke', 'black')
        .attr('stroke-width', 4)
        .attr('transform', function (d) {
          return  centrePoint() + ' rotate(' + needleScale(d) + ')';
        });
  };

  d3Gauge.updateValue = function (value) {
    svg.selectAll('path.needle')
        .data([value])
        .transition()
        .duration(1000)
        .attr('transform', function (d) {
          return centrePoint() + ' rotate(' + needleScale(d) + ')';
        });
  };

  createScaleArc();
  addNeedle();
  return d3Gauge;
};
