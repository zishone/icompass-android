angular.module('iComPAsS.config')

.config(function($translateProvider){
  // Translate
  $translateProvider
  .useStaticFilesLoader({
    prefix: 'js/locales/',
    suffix: '.json'
  })
  .registerAvailableLanguageKeys(['en', 'tl'], {
    'en' : 'en',
    'tl' : 'tl'
  })
  .preferredLanguage('en')
  .fallbackLanguage('en')
  .determinePreferredLanguage()
  .useSanitizeValueStrategy('escapeParameters');
});
