const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const zip = require('gulp-zip');
const pkg = require('./package.json');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Compile Sass to CSS with sourcemaps
gulp.task('sass', function () {
  return gulp.src('scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/assets/css'));
});

// Serve task to start the server
gulp.task('serve', function () {
  nodemon({
    script: 'app.js',
    ext: 'js hbs',
    env: { 'NODE_ENV': 'development', 'PORT': process.env.PORT || 4080 },
    ignore: ['public/assets/']
  }).on('restart', function () {
    console.log('Server restarted!');
  });
});

// Dev task to run everything and start the server
gulp.task('dev', gulp.series('sass', gulp.parallel('serve', function () {
  gulp.watch('scss/**/*.scss', gulp.series('sass'));
})));

// Zip task to create a distribution package with minification and optimization
gulp.task('zip', function () {
  return gulp.src([
    'public/**',
    '.env',
    'app.js',
    'gulpfile.js',
    'package.json',
    'ecosystem.config.js',
    'LICENSE.md'
  ], { base: '.' })
    .pipe(gulp.src('public/assets/js/**/*.js')
      .pipe(uglify()))
    .pipe(gulp.src('public/assets/css/**/*.css')
      .pipe(cleanCSS()))
    .pipe(gulp.src('public/assets/img/**/*')
      .pipe(imagemin()))
    .pipe(zip(`${pkg.name}-${pkg.version}.zip`))
    .pipe(gulp.dest('dist'));
});

// Start task for production
gulp.task('start', function () {
  const exec = require('child_process').exec;
  exec('pm2 start ecosystem.config.js --env production', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      console.error(`exec error: ${err}`);
    }
  });
});
