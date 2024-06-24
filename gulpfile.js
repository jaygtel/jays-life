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
  console.log('Cleaning public directory...');
  return del(['public/**', '!public']);
});

// Compile Sass to CSS with sourcemaps
gulp.task('sass', function () {
  console.log('Compiling Sass...');
  return gulp.src('scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/assets/css'))
    .on('end', () => console.log('Sass compiled successfully.'));
});

// Minify JavaScript
gulp.task('minify-js', function () {
  console.log('Minifying JavaScript...');
  return gulp.src('src/assets/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/assets/js'))
    .on('end', () => console.log('JavaScript minified successfully.'));
});

// Minify CSS (copied from src/assets/css to public/assets/css)
gulp.task('minify-css', function () {
  console.log('Minifying CSS...');
  return gulp.src('src/assets/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/assets/css'))
    .on('end', () => console.log('CSS minified successfully.'));
});

// Optimize images
gulp.task('images', function () {
  console.log('Optimizing images...');
  return gulp.src('src/assets/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/assets/img'))
    .on('end', () => console.log('Images optimized successfully.'));
});

// Copy views
gulp.task('copy-views', function () {
  console.log('Copying views...');
  return gulp.src('src/views/**/*.hbs')
    .pipe(gulp.dest('public/views'))
    .on('end', () => console.log('Views copied successfully.'));
});

// Copy other assets
gulp.task('copy-assets', function () {
  console.log('Copying assets...');
  return gulp.src(['src/**/*', '!src/assets/js/**/*', '!src/assets/css/**/*', '!src/assets/img/**/*', '!src/views/**/*'])
    .pipe(gulp.dest('public'))
    .on('end', () => console.log('Assets copied successfully.'));
});

// Build task
gulp.task('build', gulp.series('clean', 'sass', gulp.parallel('minify-js', 'minify-css', 'images', 'copy-views', 'copy-assets')));

// Watch Sass files for changes
gulp.task('sass:watch', function () {
  console.log('Watching Sass files...');
  gulp.watch('scss/**/*.scss', gulp.series('sass'));
});

// Dev task to run everything and start the server
gulp.task('dev', gulp.series('build', gulp.parallel('sass:watch', function () {
  nodemon({
    script: 'app.js',
    ext: 'js hbs',
    env: { 'NODE_ENV': 'development' },
    ignore: ['public/']
  }).on('restart', function () {
    console.log('Server restarted!');
  });
})));

// Serve task to start the server
gulp.task('serve', function () {
  nodemon({
    script: 'app.js',
    ext: 'js hbs',
    env: { 'NODE_ENV': 'development' },
    ignore: ['public/']
  }).on('restart', function () {
    console.log('Server restarted!');
  });
});
