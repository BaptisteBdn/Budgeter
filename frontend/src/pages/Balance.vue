<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <h4 class="title d-inline">{{ $t("balance.title") }}</h4>
          </template>
          <div class="chart-area">
            <bar-chart
              style="height: 100%"
              chart-id="blue-bar-chart"
              :chart-data="blueBarChart.chartData"
              :extra-options="blueBarChart.extraOptions"
            >
            </bar-chart>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import BarChart from "@/components/Charts/BalanceBarChart";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      blueBarChart: {
        extraOptions: chartConfigs.BalanceBarChartOptions,
        chartData: {
          labels: [],
          datasets: [
            {
              borderColor: config.colors.success,
              borderWidth: 2,
              data: [],
              backgroundColor: "rgba(72,176,72,0.2)",
            },
          ],
        },
      },
    };
  },
  created() {
    this.getBalance();
  },
  methods: {
    getBalance() {
      this.$store.dispatch("transaction/getBalance").then(
        (balance) => {
          let chartData = {
            datasets: [
              {
                borderColor: config.colors.success,
                borderWidth: 2,
                backgroundColor: "rgba(72,176,72,0.2)",
                data: balance.data.data,
              },
            ],
            labels: balance.data.labels,
          };
          chartData = this.updateBackgrounds(chartData);
          this.blueBarChart.chartData = chartData;
        },
        (error) => {
          this.notifyVue(0);
        }
      );
    },
    updateBackgrounds(chartData) {
      let borderColor = [];
      let backgroundColor = [];

      chartData.datasets.forEach((set) => {
        set.data.forEach((data) => {
          if (data >= 0) {
            borderColor.push(config.colors.success);
            backgroundColor.push("rgba(72,176,72,0.2)");
          } else {
            borderColor.push(config.colors.danger);
            backgroundColor.push("rgba(176,72,72,0.2)");
          }
        });
        set.borderColor = borderColor;
        set.backgroundColor = backgroundColor;
      });

      return chartData;
    },
  },
};
</script>
<style>
</style>
