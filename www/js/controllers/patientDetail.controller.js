angular.module('iComPAsS.controllers')

.controller('PatientDetailCtrl', function($scope, $stateParams, PatientDetailService, TakeEsasService){
  $scope.showLoading();

  $scope.populatePatientDetail = function(){
    $scope.patient_detail = {};

    PatientDetailService.get_patient_detail($stateParams.patientId).then(function(data) {
      // $scope.hideLoading();

      $scope.patient_detail = {
        'image': data.meta.profile_pic,
        'fullname': data.profile.fname + ' ' + data.profile.mname + ' ' + data.profile.lname,
        'basic_info': [
          {
            'label': 'Username',
            'data': data.profile.username
          },
          {
            'label': 'Contact No.',
            'data': data.profile.contactnumber
          },
          {
            'label': 'E-mail',
            'data': data.profile.email
          },
          {
            'label': 'Birthday',
            'data': data.profile.bday
          },
          {
            'label': 'Age',
            'data': data.profile.age
          },
          {
            'label': 'Sex',
            'data': data.profile.gender === 'm'? 'Male' : 'Female'
          },
          {
            'label': 'Diagnosis',
            'data': data.profile.diagnosis
          },
          {
            'label': 'Allergies',
            'data': data.profile.allergies
          },
          {
            'label': 'Initial Height',
            'data': data.profile.height + ' cm'
          },
        ]
      };
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });

    PatientDetailService.get_doctor_prescriptions($stateParams.patientId).then(function(data) {
      // $scope.hideLoading();

      $scope.prescriptions = data;
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });

    PatientDetailService.get_esas_results($stateParams.patientId).then(function(data) {
      $scope.hideLoading();

      $scope.chart = {
        labels: [],
        series: TakeEsasService.get_pain_results(),
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
          }
        }
      };

      for (var i = 0; i < data.length; i++) {
        var date = new Date(data[i].dateanswered);
        $scope.chart.labels.push(date.getUTCDate() + ' ' + $scope.months[date.getMonth()] + ' ' + date.getFullYear());
        $scope.chart.data[0].push(JSON.parse(data[i].pain_result).pain);
        $scope.chart.data[1].push(JSON.parse(data[i].pain_result).tiredness);
        $scope.chart.data[2].push(JSON.parse(data[i].pain_result).nausea);
        $scope.chart.data[3].push(JSON.parse(data[i].pain_result).anxiety);
        $scope.chart.data[4].push(JSON.parse(data[i].pain_result).depression);
        $scope.chart.data[5].push(JSON.parse(data[i].pain_result).drowsiness);
        $scope.chart.data[6].push(JSON.parse(data[i].pain_result).apetite);
        $scope.chart.data[7].push(JSON.parse(data[i].pain_result).well_being);
        $scope.chart.data[8].push(JSON.parse(data[i].pain_result).shortness_of_breath);
      }

      $scope.esas_results = data;
      $scope.esas_results_reversed = $scope.esas_results.slice(0);
      $scope.esas_results_reversed.reverse();
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populatePatientDetail();
});
