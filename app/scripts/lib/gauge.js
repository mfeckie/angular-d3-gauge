'use strict';
/*global d3:false */
/*exported D3Gauge */


var D3Gauge = function (configObject, value) {

  var D3Gauge = {
    version: '0.0.1'
  };

  var config = {
    id: '',
    width: 700,
    height: 300,
    minValue: 0,
    maxValue: 100,
    colorStart: 'green',
    colorEnd: 'red',
    border: true
  };

  for (var item in configObject) {
    config[item] = configObject[item];
  }

  var defaultSections = function () {
    var step = config.maxValue / 10;
    var outputArray = [];
    for (var i = config.minValue; i < config.maxValue; i = i + step) {
      outputArray.push([i, i + step]);
    }
    return outputArray;
  };


  var sections = config.inputSections || defaultSections();

  var arcWidth = config.width - (config.width * 0.05);
  var sectionExtent = d3.extent(d3.merge(sections));
  var gaugeScale = d3.scale.linear().domain(sectionExtent).range([-0.5 * Math.PI, 0.5 * Math.PI]);
  var colorScale = d3.scale.linear().domain(sectionExtent).range([config.colorStart, config.colorEnd]);
  var needleScale = d3.scale.linear().domain([config.minValue, config.maxValue]).range([0, 180]);
  var needleArc = d3.svg.arc().innerRadius(0).outerRadius(arcWidth / 2).startAngle(gaugeScale(0)).endAngle(gaugeScale(0));

  var chart = d3.select(config.id);
  var svg = chart.append('svg')
      .style('width', config.width + 'px')
      .style('height', config.height + 'px');

  var centrePoint = function () {
    return 'translate(' + config.width / 2 + ',' + (config.height - 4) + ')';
  };

  var createScaleArc = function () {
    var createArc = function (start, finish) {
      return d3.svg.arc()
          .innerRadius(arcWidth / 4)
          .outerRadius(arcWidth / 2)
          .startAngle(gaugeScale(start))
          .endAngle(gaugeScale(finish));
    };
    var sectionLength = sections.length;
    for (var i = 0; i < sectionLength; i++) {
      svg.append('path')
          .attr('class', 'background')
          .attr('d', createArc(sections[i][0], sections[i][1]))
          .attr('transform', centrePoint())
          .style('fill', i < (sectionLength / 2) ? colorScale(sections[i][0]) : colorScale(sections[i][1]));
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

  D3Gauge.updateValue = function (value) {
    svg.selectAll('path.needle')
        .data([value])
        .transition()
        .duration(1000)
        .attr('transform', function (d) {
          return centrePoint() + ' rotate(' + needleScale(d) + ')';
        });

    svg.selectAll('text')
        .datum([value])
        .text(function (d) {
          return d;
        });
  };

  var addTextValue = function () {
    svg.selectAll('g')
        .data([value])
        .enter()
        .append('g')
        .attr('class', 'svg-labels');

    svg.selectAll('g.svg-labels')
        .append('text')
        .text(function (d) {
          return d;
        })
        .attr('x', config.width / 2)
        .attr('y', (config.height / 8 ) * 7)
        .style('fill', 'grey')
        .attr('text-anchor', 'middle')
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr('class', 'background');

    svg.selectAll('g.svg-labels')
        .append('text')
        .text(function (d) {
          return d;
        })
        .attr('x', config.width / 2)
        .attr('y', (config.height / 8 ) * 7)
        .style('fill', 'grey')
        .attr('text-anchor', 'middle');

  };

  var addBorder = function () {
    if (config.border === true) {
      svg.append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', config.width)
          .attr('height', config.height)
          .style('fill', 'none')
          .attr('stroke', 'black')
          .attr('stroke-width', 4);
    }
  };

  createScaleArc();
  addNeedle();
  addTextValue();
  addBorder();
  return D3Gauge;
};
