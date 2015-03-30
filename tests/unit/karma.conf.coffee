path = require 'path'

root = path.resolve(__dirname + '/../../') + '/'

src = root + 'src/'
reports = root + 'tests/reports/'
vendors = src + 'vendors/'
app = src + 'js/'
appFiles = app + '**/*.js'
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
    vendors + 'jquery/dist/jquery.min.js'
    vendors + 'bootstrap/dist/js/bootstrap.min.js'
    fixturesDir + '*.js'
    './common/common_*.js'
    './common/*/common_*.js'
    './*/common_*.js'
    './*/*/common_*.js'
    directives
    app + './Main.js'
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
  babelPreprocessor:
    options:
      sourceMap: 'inline'
    filename: (file)-> file.originalPath.replace(/\.js$/, '.es5.js')
    sourceFileName: (file)-> file.originalPath
  port: 9876
  colors: true
  autoWatch: true
  browsers: ['PhantomJS']
  singleRun: singleRun
  plugins: [
    'karma-mocha'
    'karma-chai-sinon'
    'karma-coverage'
    'karma-phantomjs-launcher'
    'karma-ng-html2js-preprocessor'
    'karma-babel-preprocessor'
  ]

config.preprocessors[appFiles] = ['babel', 'coverage']
config.preprocessors[testsFiles] = ['babel']
config.preprocessors[directives] = ['ng-html2js']

module.exports = (cfg)->
  config.logLevel = cfg.LOG_INFO
  cfg.set config
