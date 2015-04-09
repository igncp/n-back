module.exports = (grunt) ->
  config =
    watch: # For devel
      js:
        options:
          atBegin: true
        files: [
          'src/js/**/*.js'
        ]
        tasks: ['compile-js']
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
        sourceMap: false
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
          outputStyle: 'compact'

    concat:
      basic:
        src: [
          'src/compiled/js/**/*.js'
          '!src/compiled/js/all.js'
        ]
        dest: 'src/compiled/js/all.js'
      options:
        process: (src, filepath)->
          "\n\n// #{filepath}\n(function() {#{src}})();\n"

    clean:
      js:
        src: [
          'src/compiled/js/*'
          '!src/compiled/js/all.js'
        ]

    copy:
      concat:
        src: 'src/compiled/js/pre-all.js'
        dest: 'src/compiled/js/all.js'

  grunt.initConfig config

  grunt.loadNpmTasks 'grunt-http-server'
  grunt.loadNpmTasks 'grunt-babel'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-clean'

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'server', ['http-server']
  grunt.registerTask 'compile-js', ['clean', 'babel', 'concat']
  grunt.registerTask 'compile', ['compass', 'compile-js']
