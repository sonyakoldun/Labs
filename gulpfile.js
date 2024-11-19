const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const webpack = require('webpack-stream');

const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file',
}

gulp.task('html', function(){
    return gulp
        .src('./src/*.html')
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(gulp.dest('./dist/'))
})

gulp.task('sass', function(){
    return gulp
        .src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('img', function(){
    return gulp.src(`./src/images/**/*`, {encoding: false})
    .pipe(gulp.dest(`./dist/images`));
})

gulp.task('svg', function(){
    return gulp.src(`./src/svg/**/*`)
    .pipe(gulp.dest(`./dist/svg`));
})

gulp.task('json', function () {
    return gulp.src('./src/js/data.json') // Adjust path if needed
      .pipe(gulp.dest('./dist/'));
});

gulp.task('js', function () {
    return gulp
      .src('./src/js/index.js') // Only the entry point is needed
      .pipe(webpack(require('./webpack.config.js')))
      .pipe(gulp.dest('./dist/js'));
});

const serverSettings = {
    livereload: true,
    open: true,
}

gulp.task('start', function(){
    return gulp.src('./dist/').pipe(server(serverSettings))
})

gulp.task('clean', function (done) {
    if(fs.existsSync('./dist/')){
        return gulp
          .src(['./dist/*', '!./dist/js'], { read: false, allowEmpty: true })
          .pipe(clean())
    }
    done();
});


gulp.task('watch', function(){
    gulp.watch('./src/sass/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./src/**/*.html', gulp.parallel('html'));
    gulp.watch('./src/img/**/*', gulp.parallel('img'));
    gulp.watch('./src/js/*', gulp.parallel('js'));
})

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('html', 'sass', 'img', 'svg', 'json', 'js'),
    gulp.parallel('start', 'watch'),
))