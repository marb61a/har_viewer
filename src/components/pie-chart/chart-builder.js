import d3 from 'd3';

import mimeTypes from '../../core/mimeTypes.js';

export default function(groups, parentNode, config){
    var radius = Math.min(config.with, config.height)/2,
        arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius/2),
        labelArc = d3.svg.arc()
            .outerRadius(radius - 5)
            .innerRadius(radius - 5),
        pie = d3.layout.pie()
            .sort(null)
            .value(function (d) { return d.count; });
    
    var data = pie(groups),
        keyFn = x => x.tyoe;
        
    var parent = d3.select(parentNode);
    
    // Pie Slices
    var path = parent.selectAll('path')
        .data(data, keyFn);
    
    path.enter()
        .append('path');
    
    path.attr('d', arc)
        .style('fill', d => mimeTypes.types[d.data.type].color)
        .style('fill-opacity', 0)
        .transition()
        .duration(500)
        .style('fill-opacity', 1);
}