var gulp        = require('gulp');
var gutil       = require('gulp-util');

var glob        = require('glob');
var browserSync = require('browser-sync').create();

var browserify  = require('browserify');
var babelify    = require('babelify');
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var sourcemaps  = require('gulp-sourcemaps');
var assign      = require('lodash.assign');
var uglify      = require('gulp-uglify')

// // add custom browserify options here
// var customOpts = {
//   entries: glob.sync('./src/js/?(actions|ajax|components|es6|reducers|store")/*.js'),
//   debug: true
// };
// var opts = assign({}, watchify.args, customOpts);
// var b = watchify(browserify(opts)).transform(babelify, {presets: ["es2015", "react"]});
// gulp.task('js', bundle); // so you can run `gulp js` to build the file
// b.on('update', bundle);  // on any dep update, runs the bundler
// b.on('log', gutil.log);  // output build logs to terminal
//
// function bundle() {
//   return b.bundle()
//     // log errors if they happen
//     .on('error', gutil.log.bind(gutil, 'Browserify Error'))
//     .pipe(source('bundle.js'))
//     // optional, remove if you don't need to buffer file contents
//     .pipe(buffer())
//     // optional, remove if you dont want sourcemaps
//     .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
//     //.pipe(uglify())                         // lol, sourcemap got much bigger using uglify
//     // Add transformation tasks to the pipeline here.
//     .pipe(sourcemaps.write('./')) // writes .map file
//     .pipe(gulp.dest('./dist'));
// }
//
// gulp.task('watch', function () {
//   gulp.watch("src/css/*.css",       browserSync.reload);
//   gulp.watch("dist/*.js",           browserSync.reload);
//   gulp.watch("img/*.{png,jpg,svg}", browserSync.reload);
//   gulp.watch("*.html",              browserSync.reload);
//   gulp.watch("lessons/*/*.{html,css,js,json}", browserSync.reload);
// });
//
// gulp.task('browser-sync', function() {
//   //Start the Browsersync service. This will launch a server.
//   browserSync.init({
//     server: {
//       baseDir: "./"
//     }
//   });
// });


//-------------------------------------------------
//-------------------------------------------------
// add custom browserify options here
var customOpts2 = {
  entries: glob.sync('./src2/js/?(actions|ajax|components|es6|reducers|store")/*.js'),
  debug: true
};
var opts2 = assign({}, watchify.args, customOpts2);
var b2 = watchify(browserify(opts2)).transform(babelify, {presets: ["es2015", "react"]});
gulp.task('js2', bundle2); // so you can run `gulp js` to build the file
b2.on('update', bundle2);  // on any dep update, runs the bundler
b2.on('log', gutil.log);  // output build logs to terminal

function bundle2() {
  return b2.bundle()
  // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    //.pipe(uglify())                         // lol, sourcemap got much bigger using uglify
    // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist2'));
}

gulp.task('watch2', function () {
  gulp.watch("src2/css/*.css",       browserSync.reload);
  gulp.watch("dist2/*.js",           browserSync.reload);
  gulp.watch("img/*.{png,jpg,svg}", browserSync.reload);
  gulp.watch("*.html",              browserSync.reload);
  gulp.watch("lessons/*/*.{html,css,js,json}", browserSync.reload);
});

gulp.task('browser-sync2', function() {
  //Start the Browsersync service. This will launch a server.
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

//-------------------------------------------------
//-------------------------------------------------

var customOptsTest = {
  entries: glob.sync('./src/test/*.js'),
  debug: true
};
var optstest = assign({}, watchify.args, customOptsTest);
var btest    = watchify(browserify(optstest)).transform(babelify, {presets: ["es2015", "react"]});
gulp.task('js-test', bundletest);  // so you can run `gulp js` to build the file
btest.on('update',   bundletest);  // on any dep update, runs the bundler
btest.on('log',      gutil.log);   // output build logs to terminal

function bundletest() {
  return btest.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    //.pipe(uglify())                         // lol, sourcemap got much bigger using uglify
    // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist/test'));
}


gulp.task('default',  ['browser-sync', 'watch', 'js']);
gulp.task('default2', ['browser-sync2', 'watch2', 'js2']);
gulp.task('test',    ['js-test']);
