const gulp = require('gulp');
var markdown = require('gulp-markdown-github-style');
var rename = require("gulp-rename");
var insert = require('gulp-insert');


gulp.task('resources', () => {
    return gulp.src('resources/**/*')
        .pipe(gulp.dest('dist/resources'));
});

gulp.task('md', () => {
    return gulp.src('md-text/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('dist/workbook'));
});

gulp.task('presentations', () => {
    return gulp.src('md-presentations/*.md')
        .pipe(insert.wrap(
            `<!DOCTYPE html>
        <html>
        
        <head>
            <title>Title</title>
            <meta charset="utf-8">
            <style>
                @import url(https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz);
                @import url(https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic);
                @import url(https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700,400italic);
        
                body {
                    font-family: 'Droid Serif';
                }
        
                h1,
                h2,
                h3 {
                    font-family: 'Yanone Kaffeesatz';
                    font-weight: normal;
                }
        
                .remark-code,
                .remark-inline-code {
                    font-family: 'Ubuntu Mono';
                }
            </style>
        </head>
        
        <body>
            <textarea id="source">`,
            `
             </textarea>
             <script src="https://remarkjs.com/downloads/remark-latest.min.js">
             </script>
             <script>
                 var slideshow = remark.create({ratio: '16:9'});
             </script>
         </body>
         
         </html>
             `
        ))
        .pipe(rename(function (path) {
            path.extname = ".html";
          }))
        .pipe(gulp.dest('dist/presentations'));
});

gulp.task('default', gulp.parallel('resources', 'md', 'presentations'));
