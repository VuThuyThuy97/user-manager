const gulp = require('gulp');
const rsync = require('gulp-rsync');

gulp.task('deploy-test', function () {
    return gulp.src("./source/**/*")
        .pipe(rsync({
            root: "source/",
            hostname: "13.229.95.250",
            destination: "/opt/user-manager-client/",
            username: "hoangbd",
            port: 2222
        }));
});

gulp.task('deploy-dev', function () {
    return gulp.src("./source/**/*")
        .pipe(rsync({
            root: "source/",
            hostname: "dev.sflow.me",
            destination: "/opt/user-manager-client/",
            port: 2221
        }));
});

gulp.task('deploy-production', function () {
    return gulp.src("./source/**/*")
        .pipe(rsync({
            root: "source/",
            hostname: "wi.i2g.cloud",
            destination: "/opt/user-manager-client/",
            port: 22
        }));
});