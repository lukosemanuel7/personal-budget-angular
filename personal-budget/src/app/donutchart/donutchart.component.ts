import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';
import { json } from 'd3';
import { DataService } from '../data.service';


@Component({
  selector: 'pb-donutchart',
  templateUrl: './donutchart.component.html',
  styleUrls: ['./donutchart.component.scss']
})

export class DonutchartComponent implements OnInit {

  private data = [];

  private svg;
  private margin = 50;
  private width = 500;
  private height = 400;
  private radius = Math.min(this.width, this.height) / 2;
  private colors;

  private budgetString;

  constructor(private dataService: DataService) {
  }

  getBudget():any{
    this.dataService.getData().subscribe(res =>
      {

      this.budgetString = res;

      this.data = this.budgetString.myBudget;
      this.createSvg();
      this.createColors();
      this.drawChart();
    });
  }


  ngOnInit(): void {

    this.getBudget();

  }


  private createSvg(): void {
    console.log('Create svg');
    this.svg = d3.select('figure#bar')
    .append('svg')
    .attr('width', this.width)
    .attr('height', this.height)
    .append('g')
    .attr(
      'transform',
      'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
    );

    this.svg.append('g')
    .attr('class', 'slices');
    this.svg.append('g')
    .attr('class', 'labels');
    this.svg.append('g')
    .attr('class', 'lines');

}
private createColors(): void {
  this.colors = d3.scaleOrdinal()
  .domain(this.data.map(d => d.budget.toString()))
  .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
}
private drawChart(): void {
  const pie = d3.pie<any>().value((d: any) => Number(d.budget));
  const arc = d3.arc()
  .outerRadius(this.radius * 0.8)
  .innerRadius(this.radius * 0.4);

  const outerArc = d3.arc()
  .innerRadius(this.radius * 0.9)
  .outerRadius(this.radius * 0.9);

  // Build the pie chart
  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(this.radius * .4)
    .outerRadius(this.radius * .8)
  )
  .attr('fill', (d, i) => (this.colors(i)))
  .attr('stroke', '#FFFFFF')
  .style('stroke-width', '1px');

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(150)
  .outerRadius(this.radius);

  this.svg
  .selectAll('labels')
  .data(pie(this.data))
  .enter()
  .append('text')
  .text(d => d.data.title)
  .attr('transform', d => 'translate(' + labelLocation.centroid(d) + ')')
  .style('text-anchor', 'middle')
  .style('font-size', 15);

  const line = d3.line().x(150).y(this.radius);

  this.svg.selectAll('lines')
   .append('path')
   .data(pie(this.data))
  .enter();

}


}
