const gulp = require('gulp')
// 网页自动刷新（服务器控制客户端同步刷新）
const livereload = require('gulp-livereload')
// 本地服务器
const webserver = require('gulp-webserver')
// 将一堆svg文件转换成一个symbols的svg文件
const svgSymbols = require('gulp-svg-symbols')
// svg图片压缩
const svgmin = require('gulp-svgmin')
// 文件重命名
const rename = require('gulp-rename')
// 文件清理
var clean = require('gulp-clean')	

/**
 * 将一堆svg文件转换成一个symbols的svg文件
 */
gulp.task('svgSymbols', () => {
  return gulp.src('./src/img/*.svg')
    .pipe(svgmin())
    .pipe(svgSymbols({
      id: 'sanshui-svg-%f',
      className: '.sanshui-svg-%f',
      title: false,
      fontSize: 200,
      templates: [
        'default-svg',
        'default-css',
        'default-demo'
      ]
    }))
    .pipe(rename((path) => {
      path.basename = 'sanshui-svg-icon'
    }))
    .pipe(gulp.dest('./src/icon'))
})

/**
 * 清理文件
 */
gulp.task('cleanIcon', function() {
    var stream = gulp.src( './src/icon', {read: false} ) // 清理maps文件
        .pipe(clean())
    return stream
})

/**
 * 注册任务
 */
gulp.task('webserver', ['svgSymbols'], () => {
    gulp.src( './src/icon' ) // 服务器目录（./代表根目录）
    .pipe(webserver({ // 运行gulp-webserver
      livereload: true, // 启用LiveReload
      open: 'sanshui-svg-icon.html', // 服务器启动时自动打开网页
      port: 8089 // 服务端口
    }))
})

/**
 * 监听任务
 */
gulp.task('watch', function(){
    // 监听 img文件夹
    gulp.watch( 'src/img/*.svg' , ['cleanIcon', 'svgSymbols'])
})

/**
 * 默认任务
 */
gulp.task('default',['cleanIcon', 'webserver', 'watch'])
