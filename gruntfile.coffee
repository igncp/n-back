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
        tasks: ['compass']

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
    
    compass:
      dist:
        options:
          cssDir: 'src/compiled/css'
          sassDir: 'src/sass'

  grunt.initConfig config

  grunt.loadNpmTasks 'grunt-http-server'
  grunt.loadNpmTasks 'grunt-babel'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-compass'

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'server', ['http-server']
  grunt.registerTask 'compile', ['compass', 'babel']
