<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">Dépenses</h5>
            <h3 class="card-title">Catégories</h3>
          </template>
          <div class="chart-area">
            <pie-chart
              style="height: 100%"
              chart-id="blue-bar-chart"
              :chart-data="pieChart.chartData"
              :extra-options="pieChart.extraOptions"
            >
            </pie-chart>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import PieChart from "@/components/Charts/PieChart";

import * as chartConfigs from "@/components/Charts/config";
import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";

export default {
  components: {
    LineChart,
    BarChart,
    TaskList,
    UserTable,
    PieChart,
  },
  data() {
    return {
      pieChart: {
        extraOptions: chartConfigs.pieChartOptions,
        chartData: {
          labels: [],
          datasets: [
            {
              backgroundColor: ["#00D8FF", "#00D8FF", "#00D8FF"],
              data: [],
            },
          ],
        },
      },
    };
  },
  created() {
    this.getTotalByCategories();
  },
  methods: {
    getTotalByCategories() {
      this.$store.dispatch("dashboard/getTotalByCategories").then(
        (category) => {
          let chartData = {
            datasets: [
              {
                backgroundColor: "#00D8FF",
                data: category.data.totals,
              },
            ],
            labels: category.data.categories,
          };
          this.pieChart.chartData = chartData;
        },
        (error) => {
          this.notifyVue(0);
        }
      );
    },
  },
};
</script>
<style>
</style>
