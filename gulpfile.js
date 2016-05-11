/*
* @Author: duanyong
* @Date:   2015-06-24 16:52:56
* @Last Modified by:   duany
* @Last Modified time: 2016-05-11 14:00:00
*/
/*

Steps:

1. Install gulp globally:
cnpm install --global gulp

2. Type the following after navigating in your project folder:
cnpm install gulp gulp-sass 


3. Move this file in your project folder

4. Setup your vhosts or just use static server (see 'Prepare Browser-sync for localhost' below)

5. Type 'Gulp' and ster developing
*/

// 图片压缩
// npm install --save-dev gulp-imagemin
//var gulp = require('gulp');
// var imagemin = require('gulp-imagemin');
// var pngquant = require('imagemin-pngquant');

// gulp.task('default', function () {
//     return gulp.src('src/images/*')
//         .pipe(imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngquant()]
//         }))
//         .pipe(gulp.dest('dist/images'));
// });


// js代码检测
// npm install gulp-jshint --save-dev
// var jshint = require('gulp-jshint');
// gulp.task('lint', function() {
//   return gulp.src('./lib/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
// });

/* Needed gulp config */
var gulp = require('gulp');
var sass = require('gulp-sass');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
var notify = require('gulp-notify');    
// var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
// var concat = require('gulp-concat');
// var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
// var gutil = require('gulp-util');
var reload = browserSync.reload;
// var htmlmin = require('gulp-htmlmin');
// var imagemin = require('gulp-imagemin');
// var pngquant = require('imagemin-pngquant');
// var cache = require('gulp-cache');
// var rev = require('gulp-rev-append');

/* Setup scss path */
// var paths = {
//     scss: './src/sass/*.scss'
// };
//

// 使用gulp-rev-append给页面的引用添加版本号，清除页面引用缓存。
// cnpm install gulp-rev-append --save-dev
//  在前面加
//  .pipe(rev())

// 压缩图片
// gulp.task('minimg', function () {
//     gulp.src('src/images/*.{png,jpg,gif,ico}')
//         .pipe(cache(imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngquant()]
//         })))
//         .pipe(gulp.dest('dist/images'))
//         .pipe(notify({ message:'images  ok!'}));
// });

// 压缩首页
// gulp.task('minify', function() {
//   return gulp.src('index.shtml')
//     .pipe(htmlmin({collapseWhitespace: true}))
//     // .pipe(rev())
//     .pipe(rename("index.html"))
//     .pipe(gulp.dest('./'))
//     .pipe(notify({ message:'html is  OK!'}));
//
// });

/* Scripts task */
// gulp.task('scripts', function() {
//   return gulp.src([
//     /* Add your JS files here, they will be combined in this order */
//     'src/scripts/*.js'
//     ])
//     // .pipe(concat('main.js'))
//     // .pipe(gulp.dest('dist/scripts'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(uglify().on('error', gutil.log))
//     // .pipe(rev())
//     .pipe(gulp.dest('dist/scripts'))
//     .pipe(notify({ message: 'JS is OK!' }));
// });

/* Sass task */
gulp.task('sass', function () {
    return gulp.src('public/css/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('public/css/'));
        // .pipe(notify({ message: 'SASS  is ok!' }));
});

// gulp.task('css', function() {
//   return gulp.src('src/styles/*.css')
//     .pipe(autoprefixer('last 2 version'))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(minifycss())
//     // .pipe(rev())
//     .pipe(gulp.dest('dist/styles'))
//     .pipe(notify({ message: 'CSS is OK! ' }));
// });

/* Reload task */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function() {
    browserSync.init(['public/css/*.css'], {
        /*
        I like to use a vhost, WAMP guide: https://www.kristengrote.com/blog/articles/how-to-set-up-virtual-hosts-using-wamp, XAMP guide: http://sawmac.com/xampp/virtualhosts/
        */
        // proxy: 'your_dev_site.url'
        /* For a static server you would use this: */

        server: {
            baseDir: './'
        }

    });
});

/* Watch scss, js and html files, doing different things with each. */
gulp.task('default', ['sass', 'browser-sync',], function () {
    /* Watch scss, run the sass task on change. */
    gulp.watch(['public/css/*.scss'], ['sass'])
    /* Watch app.js file, run the scripts task on change. */
    // gulp.watch(['src/scripts/*.js'], ['scripts'])
    // gulp.watch(['src/styles/*.css'], ['css'])
    /* Watch .html files, run the bs-reload task on change. */
    gulp.watch(['*.html'], ['bs-reload']);
});
