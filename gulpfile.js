const gulp = require('gulp'); //подключаем Gulp к нашему проекту
const browserSync = require('browser-sync').create(); // Подключаем Browser Sync
const pug = require('gulp-pug'); //подключаем Pug к нашему проекту
const sass = require('gulp-sass')(require('sass')); //Подключаем Scss пакет

gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync.init({
        server: {
            baseDir: "app",
            index: "index.html",
        },

    });
});

gulp.task('pug', function () {
    return gulp.src('app/**/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function () { //обработка хтмл
    return gulp.src('app/**/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('sass', function () { // Создаем таск "sass"
    return gulp.src('app/sass/*.scss') // Берем все scss файлы из папки sass и дочерних, если таковые будут
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/css')) // Выгружаем результаты в папку app/css
        .pipe(browserSync.reload({ stream: true })) // Обновляем CSS на странице при изменени
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.pug', gulp.parallel('pug'));
    gulp.watch('app/**/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами*/
    gulp.watch('app/sass/*.scss', gulp.parallel('sass')); // Наблюдение за sass файлами
});

gulp.task('default', gulp.series(
    gulp.parallel('browser-sync', 'pug', 'code', 'sass', 'watch')
));
