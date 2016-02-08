var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('watch', function () {
  gulp.watch("css/.*css", browserSync.reload);
  gulp.watch("js/.*js", browserSync.reload);
  gulp.watch("img/.*.{png,jpg,svg}", browserSync.reload);
  gulp.watch("index.html", browserSync.reload);
});

gulp.task('browser-sync', function() {
  //Start the Browsersync service. This will launch a server.
  browserSync.init({
      server: {
        baseDir: "./"
      }
  });
});

gulp.task('default', ['browser-sync', 'watch']);