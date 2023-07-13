const gulp = require('gulp');

module.exports = function fonts() {
    return gulp.src('src/models/*')
        .pipe(gulp.dest('build/models'));
};
