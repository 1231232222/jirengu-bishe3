var gulp = require('gulp')

//引入组件
var minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    minhtml = require('gulp-htmlmin'),
    concat = require('gulp-concat')


//任务
gulp.task('html', function(){
    gulp.src('*.html')
        .pipe(minhtml({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
})

gulp.task('css', function(arguments){
    gulp.src('src/css/*.css')
        .pipe(concat('merge.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css/'))
})


gulp.task('img', function(arguments){
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'))
})


gulp.task('build',['html', 'css', 'img'])
