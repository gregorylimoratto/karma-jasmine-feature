module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options:{
        camelcase: true,
        strict: true,
        trailing: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        globals: {}
      },
      files: ['src/**/*.js', 'tests/**/*.js']
    },
    build:{
      dist:{
        files :{
          'src/feature-runner-api.template':['<%= jshint.files %>']
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'concat', 'karma']
    },
    karma:{
      src:{
        configFile:'karma.conf.js',
        autoWatch:false,
        singleRun:true,
        reporters:['dots']
      }
    },
    concat: {
      dist: {
        options: {
          process: function(src, filepath) {
            return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
          },
          banner: '(function () {',
          footer: '})();'
        },
        files: {
          'debug/feature-runner-api-debug.js': ['src/**/*.js'],
        },
      }
    },
    uglify: {
       options: {
          banner: '(function () {',
          footer: '})();'
      },
      dist: {
        files: {
          'lib/feature-runner-api.js': ['src/**/*.js']
        }
      }
    },
    'npm-publish':{
      
        abortIfDirty: false
    }
  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-npm');
  
  grunt.registerTask('debug',  ['jshint', 'concat', 'karma']); // ,
  
  grunt.registerTask('default',  ['jshint', 'uglify', 'karma']); // , 
  grunt.registerTask('release',  ['uglify', 'npm-publish']);
};