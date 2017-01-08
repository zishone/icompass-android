angular.module('iComPAsS.controllers')

.controller('PatientDetailCtrl', function($scope, $stateParams, PatientDetailService){
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

      $scope.labels = [];
      $scope.series= ['Pain', 'Tiredness', 'Nausea', 'Anxiety', 'Depression', 'Drowsiness', 'Lack of Appetite', 'Wellbeing', 'Shortness of Breath'];
      $scope.data = [[],[],[],[],[],[],[],[],[]];

      for (var i = 0; i < data.length; i++) {
        var date = new Date(data[i].dateanswered);
        $scope.labels.push(date.getUTCDate() + ' ' + $scope.months[date.getMonth()] + ' ' + date.getFullYear());
        $scope.data[0].push(JSON.parse(data[i].pain_result).pain);
        $scope.data[1].push(JSON.parse(data[i].pain_result).tiredness);
        $scope.data[2].push(JSON.parse(data[i].pain_result).nausea);
        $scope.data[3].push(JSON.parse(data[i].pain_result).anxiety);
        $scope.data[4].push(JSON.parse(data[i].pain_result).depression);
        $scope.data[5].push(JSON.parse(data[i].pain_result).drowsiness);
        $scope.data[6].push(JSON.parse(data[i].pain_result).apetite);
        $scope.data[7].push(JSON.parse(data[i].pain_result).well_being);
        $scope.data[8].push(JSON.parse(data[i].pain_result).shortness_of_breath);
      }

      $scope.options = {
        legend: {
          display: true,
          position: 'bottom',
          fullWidth: true
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
      };

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
