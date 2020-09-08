<template>
  <q-page class="q-pt-xs">
    <div class="q-ma-md">
      <div class="row q-col-gutter-md">
        <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
          <q-card flat bordered class="shadow q-pa-none q-ma-none">
            <q-card-section class="row">
              <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="text-h6 col-12">Sales vs Goals

              </div>
            </q-card-section>

            <q-separator class="full-width" inset></q-separator>

            <q-card-section>
              <IEcharts :option="areaChartOption" ref="sales_goals" :resizable="true" style="height:320px"/>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
    import Vue from 'vue';
    import IEcharts from 'vue-echarts-v3/src/full.js';

    Vue.component('IEcharts', IEcharts);

    export default {
        data() {
            return {
                filter: '',
                mode: 'list',

            }
        },
        computed: {
            areaChartOption() {
                return {
                    legend: {
                        textStyle: {
                            color: this.$q.dark.isActive ? 'white' : '#676767'
                        }
                    },
                    grid: {
                        bottom: '9%',
                        left: '9%',
                        top: '10%',
                        right: '5%',
                        show: true
                    },
                    tooltip: {show: true},
                    xAxis: {
                        type: 'category',
                        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep'],
                        axisLine: {
                            lineStyle: {
                                color: 'grey'
                            },
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: this.$q.dark.isActive ? 'white' : '#676767'
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: 'grey'
                            },
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: this.$q.dark.isActive ? 'white' : '#676767'
                        }
                    },
                    series: [{
                        name: 'Doanh Thu',
                        data: [0, 600, 300, 700, 700, 1330, 600, 500, 0],
                        type: 'line',
                        areaStyle: {},
                        smooth: true,
                        color: '#e4a3e2'
                    },

                    ]
                }
            },

        },
        methods: {

        }
    }
</script>

<style scoped>
  .box_1 {
    color: #0dceec;
  }

  .box_2 {
    color: #fe434f;
  }

  .box_3 {
    color: #15ca20;
  }

  .box_4 {
    color: #ff9700;
  }

  .shadow {
    -webkit-box-shadow: 0 0 10px #bfbfbf !important;
    box-shadow: 0 0 10px #bfbfbf !important;
  }

  .progress-base {
    height: 8px;
    border-radius: 3px;
    background-color: #e9ecef;
  }

  .progress-bar-1 {
    height: 8px;
    border-radius: 3px;
    background: #17ead9;
    background: -webkit-linear-gradient(45deg, #17ead9, #6078ea) !important;
    background: linear-gradient(45deg, #17ead9, #6078ea) !important;
  }

  .progress-bar-2 {
    height: 8px;
    border-radius: 3px;
    background: #f54ea2;
    background: -webkit-linear-gradient(45deg, #f54ea2, #ff7676) !important;
    background: linear-gradient(45deg, #f54ea2, #ff7676) !important;
  }

  .progress-bar-3 {
    height: 8px;
    border-radius: 3px;
    background: #42e695;
    background: -webkit-linear-gradient(45deg, #42e695, #3bb2b8) !important;
    background: linear-gradient(45deg, #42e695, #3bb2b8) !important;
  }

  .progress-bar-4 {
    height: 8px;
    border-radius: 3px;
    background: #ffdf40;
    background: -webkit-linear-gradient(45deg, #ffdf40, #ff8359) !important;
    background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
  }

  .border-top {
    border-top: 1px solid #efefef;
  }

  .chip_pending {
    background: #ffdf40;
    background: -webkit-linear-gradient(45deg, #ffdf40, #ff8359) !important;
    background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
  }

  .chip_completed {
    background: #42e695;
    background: -webkit-linear-gradient(45deg, #42e695, #3bb2b8) !important;
    background: linear-gradient(45deg, #42e695, #3bb2b8) !important;
  }
</style>
