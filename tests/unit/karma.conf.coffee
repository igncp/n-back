path = require 'path'

root = path.resolve(__dirname + '/../../') + '/'

src = root + 'src/'
reports = root + 'tests/reports/'
vendors = src + 'vendors/'
app = src + 'js/'
htmls = 'directives/*.html'
directives = src + htmls

config =
  basePath: ''
  frameworks: ['mocha', 'chai']
  files: [
    vendors + 'angular/angular.min.js'
    vendors + 'angular-mocks/angular-mocks.js'
    './common_unit.js'
    directives
    app + './Main.js'
    './*-spec.js'
  ]
  preprocessors: {}
  reporters: ['dots', 'coverage']
  coverageReporter:
    type: 'html',
    dir: reports + 'istanbul/frontend/angular'
  ngHtml2JsPreprocessor:
    moduleName: 'templates'
    cacheIdFromPath: (filepath)-> filepath.replace src, ''
  port: 9876
  colors: true
  autoWatch: true
  browsers: ['PhantomJS']
  singleRun: false
  plugins: [
    'karma-mocha'
    'karma-chai'
    'karma-coverage'
    'karma-phantomjs-launcher'
    'karma-ng-html2js-preprocessor'
  ]

config.preprocessors[app] = ['coverage']
config.preprocessors[directives] = ['ng-html2js']

module.exports = (cfg)->
  config.logLevel = cfg.LOG_INFO
  cfg.set config
