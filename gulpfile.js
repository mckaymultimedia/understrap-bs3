gulp// Defining base pathes
var basePaths = {
    bower: './bower_components/',
    dev: './src/'
};

// Defining requirements
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    ignore = require('gulp-ignore'),
    imagemin = require('gulp-imagemin'),
    merge2 = require('merge2'),
    newer = require('gulp-newer'),
    notify = require( 'gulp-notify' ),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    rimraf = require('gulp-rimraf'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

// Run: 
// gulp sass
// Compiles SCSS files in CSS
gulp.task('sass', function () {
  gulp.src('./sass/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(autoprefixer))
    .pipe(gulp.dest('./css'))
    .pipe(notify({ message: 'Sass task complete' }));
});

// Run: 
// gulp nanocss
// Minifies CSS files
gulp.task('cssnano', ['cleancss'], function(){
  return gulp.src('./css/*.css')
	.pipe(plumber())
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano({discardComments: {removeAll: true}}))
    .pipe(gulp.dest('./css/'))
	.pipe(notify({ message: 'Minify task complete' }));
}); 

gulp.task('cleancss', function() {
  return gulp.src('./css/*.min.css', { read: false }) // much faster 
    .pipe(ignore('theme.css'))
    .pipe(rimraf());
});

// Run: 
// gulp scripts. 
// Uglifies and concat all JS files into one
gulp.task('scripts', function() {
  gulp.src([
    basePaths.dev + 'js/bootstrap3/bootstrap.min.js',  //<--------- Change from /bootstrap3 to /bootstrap4 Watch out! just for testing in the moment!
    basePaths.dev + 'js/owl.carousel.min.js', 
    basePaths.dev + 'js/skip-link-focus-fix.js'
    ])
    .pipe(concat('theme.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
    
  gulp.src([
    basePaths.dev + 'js/bootstrap3/bootstrap.min.js',  //<--------- Change from /bootstrap3 to /bootstrap4 Watch out! just for testing in the moment!
    basePaths.dev + 'js/owl.carousel.min.js', 
    basePaths.dev + 'js/skip-link-focus-fix.js'
    ])
    .pipe(concat('theme.js'))
    .pipe(gulp.dest('./js/'))
	.pipe(notify({ message: 'Scripts task complete' }));
});

// Run: 
// gulp images
// Compress and optimize images
gulp.task('images', function() {
  return gulp.src('./images/uncompressed/*')
    .pipe(newer('./images'))
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Run: 
// gulp watch
// Starts watcher. Watcher runs gulp sass task on changes
gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./css/theme.css', ['cssnano']);
	gulp.watch('./js/development/**/*.js', ['scripts'] );
	gulp.watch('./images/uncompressed/**', ['images'] );
});

// Run: 
// gulp copy-assets. 
// Copy all needed dependency assets files from bower_component assets to themes /js, /scss and /fonts folder. Run this task after bower install or bower update

////////////////// All Bootstrap SASS 3 Assets /////////////////////////
// Copy all Bootstrap JS files 
gulp.task('copy-assets', function() {
    gulp.src(basePaths.bower + 'bootstrap-sass/assets/javascripts/**/*.js')
       .pipe(gulp.dest(basePaths.dev + '/js/bootstrap3'));

// Copy all Bootstrap SCSS files
    gulp.src(basePaths.bower + 'bootstrap-sass/assets/stylesheets/**/*.scss')
       .pipe(gulp.dest(basePaths.dev + '/sass/bootstrap3'));

// Copy all Bootstrap Fonts
    gulp.src(basePaths.bower + 'bootstrap-sass/assets/fonts/bootstrap/*.{ttf,woff,woff2,eof,svg}')
        .pipe(gulp.dest('./fonts'));
////////////////// End Bootstrap 3 Assets /////////////////////////

////////////////// All Bootstrap 4 Assets /////////////////////////
// Copy all Bootstrap JS files 
    // gulp.src(basePaths.bower + 'bootstrap/js/**/*.js')
       // .pipe(gulp.dest(basePaths.dev + '/js/bootstrap4'));

// Copy all Bootstrap SCSS files
    // gulp.src(basePaths.bower + 'bootstrap/scss/**/*.scss')
       // .pipe(gulp.dest(basePaths.dev + '/sass/bootstrap4'));
////////////////// End Bootstrap 4 Assets /////////////////////////

// Copy all Font Awesome Fonts
    gulp.src(basePaths.bower + 'fontawesome/fonts/**/*.{ttf,woff,woff2,eof,svg}')
        .pipe(gulp.dest('./fonts'));

// Copy all Font Awesome SCSS files
    gulp.src(basePaths.bower + 'fontawesome/scss/*.scss')
        .pipe(gulp.dest(basePaths.dev + '/sass/fontawesome'));

// owl JS files
    gulp.src(basePaths.bower + 'OwlCarousel2/dist/*.js')
        .pipe(gulp.dest(basePaths.dev + '/js'));

// Copy all Owl2 SCSS files
    gulp.src(basePaths.bower + 'OwlCarousel2/src/scss/*.scss')
       .pipe(gulp.dest(basePaths.dev + '/sass/owl-carousel2'));

// Copy all Owl2 CSS files
    gulp.src(basePaths.bower + 'OwlCarousel2/dist/assets/*.css')
        .pipe(gulp.dest(basePaths.dev + '/css'));

// Copy jQuery
    gulp.src(basePaths.bower + 'jquery/dist/*.js')
        .pipe(gulp.dest(basePaths.dev + '/js'));

// _s JS files
    gulp.src(basePaths.bower + '_s/js/*.js')
        .pipe(gulp.dest(basePaths.dev + '/js'));
});

// Default task -- runs scss and watch functions
gulp.task( 'default', ['watch'], function() {
});