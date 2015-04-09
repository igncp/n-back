path = require 'path'

root = path.resolve(__dirname + '/../../') + '/'

src = root + 'src/'
reports = root + 'tests/reports/'
vendors = src + 'vendors/'
compiled = src + 'compiled/'
compiledAll = compiled + 'js/all.js'
testsFiles = './**/*-spec.js'
directives = src + 'directives/*.html'
fixturesDir = '../fixtures/'

singleRun = if process.env.NBACK_UNIT_TESTS_WATCH is 'true' then false else true

config =
  basePath: ''
  frameworks: ['mocha', 'chai-sinon']
  files: [
    vendors + 'angular/angular.min.js'
    vendors + 'angular-mocks/angular-mocks.js'
    vendors + 'angular-ui-router/release/angular-ui-router.min.js'
    vendors + 'jquery/dist/jquery.min.js'
    vendors + 'bootstrap/dist/js/bootstrap.min.js'
    vendors + 'lodash/lodash.min.js'
    fixturesDir + '*.js'
    './common/common_*.js'
    './common/*/common_*.js'
    './*/common_*.js'
    './*/*/common_*.js'
    directives
    compiledAll
    testsFiles
  ]
  preprocessors: {}
  reporters: ['dots', 'coverage']
  coverageReporter:
    type: 'html',
    dir: reports + 'istanbul/'
  ngHtml2JsPreprocessor:
    moduleName: 'templates'
    cacheIdFromPath: (filepath)-> filepath.replace src, ''
  port: 9876
  colors: true
  autoWatch: true
  browsers: ['PhantomJS']
  singleRun: singleRun
  plugins: [
    'karma-mocha'
    'karma-requirejs'
    'karma-chai-sinon'
    'karma-coverage'
    'karma-phantomjs-launcher'
    'karma-chrome-launcher'
    'karma-ng-html2js-preprocessor'
  ]

config.preprocessors[compiledAll] = ['coverage']
config.preprocessors[directives] = ['ng-html2js']

module.exports = (cfg)->
  config.logLevel = cfg.LOG_INFO
  cfg.set config
