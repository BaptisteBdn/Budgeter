import { HorizontalBar, mixins } from 'vue-chartjs';

export default {
  name: 'horizontalbar-chart',
  extends: HorizontalBar,
  mixins: [mixins.reactiveProp],
  props: {
    extraOptions: Object
  },
  data() {
    return {};
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
