const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');

// Clean the public directory
gulp.task('clean', function () {
  return del(['public/**', '!public']);
});

// Compile Sass to CSS with sourcemaps
gulp.task('sass', function () {
  return gulp.src('scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/assets/css'));
});

// Minify JavaScript
gulp.task('minify-js', function () {
  return gulp.src('src/assets/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/assets/js'));
});

// Minify CSS (copied from src/assets/css to public/assets/css)
gulp.task('minify-css', function () {
  return gulp.src('src/assets/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/assets/css'));
});

// Optimize images
gulp.task('images', function () {
  return gulp.src('src/assets/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/assets/img'));
});

// Copy views
gulp.task('copy-views', function () {
  return gulp.src('src/views/**/*.hbs')
    .pipe(gulp.dest('public/views'));
});

// Copy other assets
gulp.task('copy-assets', function () {
  return gulp.src(['src/**/*', '!src/assets/js/**/*', '!src/assets/css/**/*', '!src/assets/img/**/*', '!src/views/**/*'])
    .pipe(gulp.dest('public'));
});

// Build task
gulp.task('build', gulp.series('clean', 'sass', gulp.parallel('minify-js', 'minify-css', 'images', 'copy-views', 'copy-assets')));

// Watch Sass files for changes
gulp.task('sass:watch', function () {
  gulp.watch('scss/**/*.scss', gulp.series('sass'));
});

// Dev task to run everything and start the server
gulp.task('dev', gulp.series('build', 'sass:watch', function () {
  nodemon({
    script: 'app.js',
    ext: 'js hbs',
    env: { 'NODE_ENV': 'development' },
    ignore: ['public/'],
    tasks: ['build']
  });
}));

// Serve task to start the server
gulp.task('serve', function () {
  nodemon({
    script: 'app.js',
    ext: 'js hbs',
    env: { 'NODE_ENV': 'development' },
    ignore: ['public/'],
    tasks: ['build']
  });
});
