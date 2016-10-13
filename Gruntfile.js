module.exports = grunt => {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    ts: {
      default : {
        src: ["ts/**/*.ts", "!ts/.baseDir.ts"],
        dest: "dist/js"
      }
    },

    sass: {
        options: {
            sourceMap: false
        },
        dist: {
            files: {
                'dist/css/main.css': 'sass/main.scss'
            }
        }
    },

    postcss: {
      options: {
        map: {
            inline: false, // save all sourcemaps as separate files...
            annotation: 'dist/css/maps/' // ...to the specified directory
        },

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')(), // minify the result
          require('lost')(),
        ]
      },
      dist: {
        src: 'dist/css/*.css'
      }
    }
  });

  grunt.registerTask('js', ['ts']);
  grunt.registerTask('styles', ['sass', 'postcss']);
  grunt.registerTask('default', ['styles', 'js']);
};
