module.exports = (grunt) ->
  config =
    watch: # For devel
      displayDevel:
        options:
          atBegin: true
        files: [
          'src/js/**/*.js'
        ]
        tasks: ['babel']

    'http-server':
      dev:
        root: 'src'
        port: 7171
        cache: 0
        ext: 'html'
        runInBackground: false
    babel:
      options:
        sourceMap: true
      dist:
        files: [
          expand: true
          cwd: 'src/js/'
          src: ['**/*.js']
          dest: 'src/es5/'
          ext: '.js'
        ]

  grunt.initConfig config

  grunt.loadNpmTasks 'grunt-http-server'
  grunt.loadNpmTasks 'grunt-babel'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'server', ['http-server']
