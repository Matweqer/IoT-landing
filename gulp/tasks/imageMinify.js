const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const gulpif = require('gulp-if');

module.exports = function imageMinify() {
    return gulp.src(['src/img/**/*.{gif,png,jpg,svg,webp}', '!src/img/icons/*'])
        .pipe(gulpif(process.env.NODE_ENV === 'production', imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({
                quality: 75,
                progressive: true,
            }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false },
                ],
            }),
        ])))
        .pipe(gulp.dest('build/img'));
};
