angular.module('iComPAsS.controllers')

.controller('EsasResultsCtrl', function($scope, $stateParams, EsasService){
  $scope.showLoading();

  $scope.patientId = $stateParams.patientId;

  $scope.populateEsasResults = function() {
    EsasService.get_esas_results($scope.patientId).then(function(data) {
      $scope.hideLoading();

      $scope.chart = {
        labels: [],
        series: EsasService.get_pain_results(),
        data: [[],[],[],[],[],[],[],[],[]],
        options: {
          animation: false,
          legend: {
            display: true,
            position: 'bottom'
          },
          elements: {
            line: {
              tension: 0,
              fill: false
            }
          },
          scales: {
            lineArc: false,
            xAxes: [{
              ticks:{
                minRotation: 90
              },
              type: 'time',
              time: {
                displayFormats: {
                  'millisecond': 'MMM YYYY',
                  'second': 'MMM YYYY',
                  'minute': 'MMM YYYY',
                  'hour': 'MMM YYYY',
                  'day': 'MMM YYYY',
                  'week': 'MMM YYYY',
                  'month': 'MMM YYYY',
                  'quarter': 'MMM YYYY',
                  'year': 'MMM YYYY',
                }
              }
            }]
          },
          zoom: {
            enabled: true,
            mode: 'x'
          }
        }
      };

      for (var i = 0; i < data.length; i++) {
        var date = moment(data[i].Date, "YYYY-MM-DD");
        $scope.chart.labels.push(date.format("YYYY-MM-DD"));
        $scope.chart.data[0].push(JSON.parse(data[i].pain_result).pain);
        $scope.chart.data[1].push(JSON.parse(data[i].pain_result).tiredness);
        $scope.chart.data[2].push(JSON.parse(data[i].pain_result).nausea);
        $scope.chart.data[3].push(JSON.parse(data[i].pain_result).anxiety);
        $scope.chart.data[4].push(JSON.parse(data[i].pain_result).depression);
        $scope.chart.data[5].push(JSON.parse(data[i].pain_result).drowsiness);
        $scope.chart.data[6].push(JSON.parse(data[i].pain_result).lack_of_appetite);
        $scope.chart.data[7].push(JSON.parse(data[i].pain_result).wellbeing);
        $scope.chart.data[8].push(JSON.parse(data[i].pain_result).shortness_of_breath);
      }

      $scope.esas_results = data;
      for (var j = 0; j < $scope.esas_results.length; j++) {
        $scope.esas_results[j].dateanswered = moment($scope.esas_results[j].dateanswered).format("MMMM DD, YYYY");
      }
      $scope.esas_results_reversed = $scope.esas_results.slice(0);
      $scope.esas_results_reversed.reverse();
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populateEsasResults();
});
