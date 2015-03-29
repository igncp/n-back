module.exports = (grunt) ->
  config =
    watch: # For devel
      js:
        options:
          atBegin: true
        files: [
          'src/js/**/*.js'
        ]
        tasks: ['babel']
      sass:
        options:
          atBegin: true
        files: [
          'src/sass/**/*.scss'
        ]
        tasks: ['sass']

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
          dest: 'src/compiled/js'
          ext: '.js'
        ]
    
    sass:
      dist:
        options:
          style: 'compact'
        files: [{
          expand: true
          cwd: 'src/sass'
          src: ['**/*.scss']
          dest: 'src/compiled/css',
          ext: '.css'
        }]

  grunt.initConfig config

  grunt.loadNpmTasks 'grunt-http-server'
  grunt.loadNpmTasks 'grunt-babel'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-sass'

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'server', ['http-server']
  grunt.registerTask 'compile', ['sass', 'babel']
