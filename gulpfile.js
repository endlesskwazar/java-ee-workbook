const gulp = require('gulp');
var gulpMdToHtml = require("gulp-md-to-html");
var gulpMdToPresentation = require("gulp-markdown-html-presentation");
var rename = require("gulp-rename");
var insert = require('gulp-insert');



gulp.task('resources', () => {
    return gulp.src('resources/**/*')
        .pipe(gulp.dest('dist/resources'));
});

gulp.task('workbook', () => {
    return gulp.src('md-text/*.md')
        .pipe(gulpMdToHtml())
        .pipe(gulp.dest('dist/workbook'));
});

gulp.task('additional', () => {
    return gulp.src('md-additional/*.md')
    .pipe(gulpMdToHtml())
    .pipe(gulp.dest('dist/additional'));
})

gulp.task('presentations', () => {
    return gulp.src('md-presentations/*.md')
        .pipe(gulpMdToPresentation({
            theme: 'default'
        }))
        .pipe(gulp.dest('dist/presentations'));
});

gulp.task('default', gulp.parallel('resources', 'workbook', 'additional', 'presentations'));
