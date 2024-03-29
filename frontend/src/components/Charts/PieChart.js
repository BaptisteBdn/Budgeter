import { Pie, mixins } from 'vue-chartjs';

export default {
  name: 'pie-chart',
  extends: Pie,
  mixins: [mixins.reactiveProp],
  props: {
    extraOptions: Object
  },
  mounted() {
    this.$watch('chartData', (newVal, oldVal) => {
      if (!oldVal) {
        this.renderChart(
          this.chartData,
          this.extraOptions
        );
      }
    }, { immediate: true });
  }
};
