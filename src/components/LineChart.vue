<script>
import {Line} from "vue-chartjs"
export default {
  name: "LineChart",
  extends: Line,
  props:{
    label: {
      type: String
    },
    chartData:{
      type: Array
    },
    chartColors:{
      type: Object
    },
    options:{
      type: Object
    }
  },
  mounted() {
    const dates = this.chartData.map(d=>d.date);
    const totals = this.chartData.map(d=>d.total);
    const { borderColor, pointColor, pointBackgroundColor, backgroundColor} = this.chartColors
    this.renderChart({
      labels: dates,
      datasets: [{
        label: this.label,
        data: totals,
        borderColor: borderColor,
        pointColor: pointColor,
        pointBackgroundColor: pointBackgroundColor,
        backgroundColor: backgroundColor
      }]
    },
    this.options)
  }
}
</script>

<style scoped>

</style>
