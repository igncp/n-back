root = '../../'
src = root + 'src/'

reports = root + 'tests/reports/'

vendors = src + 'vendors/'
app = src + 'js/'

config =
  basePath: ''
  frameworks: ['mocha', 'chai']
  files: [
    vendors + 'angular/angular.min.js'
    vendors + 'angular-mocks/angular-mocks.js'
    './common_unit.js'
    app + './Main.js'
    './*-spec.js'
  ],
  preprocessors: {}
  reporters: ['dots', 'coverage']
  coverageReporter: {
    type: 'html',
    dir: reports + 'istanbul/frontend/angular'
  },
  port: 9876
  colors: true
  autoWatch: true
  browsers: ['PhantomJS']
  singleRun: false
  plugins: [
    'karma-ng-html2js-preprocessor'
    'karma-mocha'
    'karma-chai'
    'karma-coverage'
    'karma-phantomjs-launcher'
  ]
  ngHtml2JsPreprocessor:
    moduleName: 'the-directives'

config.preprocessors[app] = ['coverage']

module.exports = (cfg)->
  config.logLevel = cfg.LOG_INFO
  cfg.set config
