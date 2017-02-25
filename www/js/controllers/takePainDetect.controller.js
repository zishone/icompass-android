angular.module('iComPAsS.controllers')

.controller('TakePainDetectCtrl', function($scope, $state, UsersService, PainDetectService){
  $scope.pain_detect_enabled = 1;

  $scope.pain_detect_result = {
    sliders: {
      slider_1: 0,
      slider_2: 0,
      slider_3: 0
    },
    radio: {
      radio_1: ''
    },
    questions: {
      question_1: undefined,
      question_2: undefined,
      question_3: undefined,
      question_4: undefined,
      question_5: undefined,
      question_6: undefined,
      question_7: undefined
    },
    diagrams: {
      anterior: {
        main_area: {

        },
        radiation: {

        }
      },
      posterior: {
        main_area: {

        },
        radiation: {

        }
      }
    }
  };

  $scope.progress = {
    options: {
      floor: 1,
      ceil: 13,
      showTicks: true,
      hidePointerLabels: true,
      hideLimitLabels: true,
      readOnly: true,
      showSelectionBar: true,
      getSelectionBarColor: function(value) {
        return 'blue';
      }
    }
  };

  $scope.pain_slider = {
    options: {
        showSelectionBar: true,
        getSelectionBarColor: function(value) {
          if (value <= 3)
            return 'yellow';
          if (value <= 6)
            return 'orange';
          return 'red';
      },
      floor: 0,
      ceil: 10
    }
  };

  $scope.radios = [
    {
      text: 'Persistent pain with slight fluctuations',
      image: 'radio_1.png',
      value: 'a'
    },
    {
      text: 'Persistent pain with pain attacks',
      image: 'radio_2.png',
      value: 'b'
    },
    {
      text: 'Pain attacks without pain between them',
      image: 'radio_3.png',
      value: 'c'
    },
    {
      text: 'Pain attacks with pain between them',
      image: 'radio_4.png',
      value: 'd'
    }
  ];

  $scope.choices = [
    {
      text: 'Never',
      value: 0
    },
    {
      text: 'Hardly Noticed',
      value: 1
    },
    {
      text: 'Slightly',
      value: 2
    },
    {
      text: 'Moderately',
      value: 3
    },
    {
      text: 'Strongly',
      value: 4
    },
    {
      text: 'Very Strongly',
      value: 5
    }
  ];

  $scope.submitPainDetect = function() {
    $scope.showLoading();

    PainDetectService.submit_pain_detect($scope.pain_detect_result).then(function(data) {
      $scope.hideLoading();

      $scope.alertPopup('Success!', 'Have a great day!');

      $scope.pain_detect_result = {
        sliders: {
          slider_1: 0,
          slider_2: 0,
          slider_3: 0
        },
        radio: {
          radio_1: ''
        },
        questions: {
          question_1: undefined,
          question_2: undefined,
          question_3: undefined,
          question_4: undefined,
          question_5: undefined,
          question_6: undefined,
          question_7: undefined
        }
      };

      $scope.goHome();
    }, function(err) {
      $scope.hideLoading();

      $scope.alertPopup('Submission Failed!', 'Please try again!');
    });
  };
});
