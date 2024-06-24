const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const nodemon = require('gulp-nodemon');

// Paths configuration
const paths = {
  styles: {
    src: 'scss/styles.scss',
    dest: 'src/assets/css',
    finalDest: 'public/assets/css'
  },
  assets: {
    src: 'src/**/*',
    dest: 'public'
  }
};

// Clean assets
function clean() {
  return del(['public/**/*']);
}

// Compile SCSS into CSS
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(gulp.dest(paths.styles.finalDest));
}

// Copy assets to public
function copyAssets() {
  return gulp.src(paths.assets.src)
    .pipe(gulp.dest(paths.assets.dest));
}

// Watch files
function watchFiles() {
  gulp.watch('scss/**/*.scss', styles);
  gulp.watch(paths.assets.src, copyAssets);
}

// Nodemon task
function startNodemon(done) {
  nodemon({
    script: 'app.js',
    watch: ['src'],
    tasks: ['build'],
    env: { 'NODE_ENV': 'development' },
    done: done
  });
}

// Gulp tasks
const build = gulp.series(clean, styles, copyAssets);
const serve = gulp.series(build, startNodemon);
const dev = gulp.parallel(watchFiles, serve);

// Export tasks
exports.clean = clean;
exports.styles = styles;
exports.copyAssets = copyAssets;
exports.build = build;
exports.watch = watchFiles;
exports.serve = serve;
exports.dev = dev;
exports.default = build;
