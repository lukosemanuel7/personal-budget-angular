import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Chart} from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public myBudget = [];

  constructor(public dataService: DataService) {

   }

  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
              '#ffcd56',
              '#ff6384',
              '#36a2eb',
              '#fd6b19',
              '#0b0d08',
              '#d6e5e8',
              '#dd6735'
            ]
        }
    ],
    labels: []
};

  ngOnInit(): void {

    this.getBudget();

  }
  getBudget(): any{
    this.dataService.getData().subscribe(res =>
      {

      this.myBudget = res.myBudget;

      for (let i = 0; i < this.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = this.myBudget[i].budget;
        this.dataSource.labels[i] = this.myBudget[i].title;
        this.createChart();
    }

    });
  }

  createChart(): void{
    let ctx = document.getElementById('myChart') as HTMLCanvasElement;
    let myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
}

}
