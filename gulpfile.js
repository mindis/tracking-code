var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var fs = require('fs');
var git = require('git-rev');
gulp.task('default', function() {

  git.short(function (str) {
    fs.writeFile("version.js", "var _trackerVersion = '"+str+"';", function(err) {
      if(err) {
        console.log(err);
      }
    });
  });
  return gulp.src(["version.js", "bower_components/json2/json2.js",
        "bower_components/atomic/dist/atomic.js", "lib/*.js", "modules/*.js", "main.js"])
     .pipe(uglify())
     .pipe(concat('all.min.js'))
     .pipe(gulp.dest('dist'));
});
