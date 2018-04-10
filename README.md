# my-webpack
**概述:**

使用webpack打包的非react,vue,angular脚手架

**我的webpack配置思想:**
- 无论是开发环境还是测试环境,公共的配置部分提到一个公用的配置文件中
- npm引入的第三方项目依赖都放到dll.js中,一是为了浏览器缓存,二是为了开发服务每次修改自动编译时的速率更快(应该会更快吧?--)
- 开发环境中的第三方资源不需要打包到dist中,而只需要项目引入中指向其路径(应该会提升编译速率吧?--)
- 在开发环境中mock自动注入,代码要无侵染性
- 编译后的文件所在的路径不变,便于查看编译中出现的问题
- 导航中的子模块打包不要一个一个引入,而是自动打包到项目中
- 不同子模块之间能够实现数据驱动,也就是可以共用一个store
- 项目中资源的引入方式既要支持使用传统的标签引入方式(即js通过script,css通过link),也要支持import方式引入

**项目启动:**

package.json:

开发环境编译:npm run start

不使用mock的开发环境编译:npm run start:nomock

启动开发服务:npm run server

启动无mock的开发服务:npm run server:nomock

生产环境编译:build

开发环境调试:debug:start

生产环境调试:debug:build

**项目结构:**

app/ 项目源代码放置的文件夹

bower_components/ bower获取的库放置的文件夹

build/ 编译到生产环境代码的目标文件夹

dist/ 编译到开发环境代码的目标文件夹

dll/ DllPlugin生成的项目依赖的所有npm安装的第三方库的目标文件夹

mock/ mockjs生成mock数据的文件夹

static/ 公共资源存放的文件夹

vender/ 非通过npm安装的第三方库放置的文件夹

.babelrc babel配置

bower.json bower引入资源配置

mock-watch.js 使用用来监听mock文件改变

package-lock.json 自动生成的文件

package.json 大家都知道

postcss.config.js postcss-loader的配置

webpack.common.config.js webpack的通用配置

webpack.dev-nomock.config.js 不使用mock的开发环境webpack配置

webpack.dev.config.js webpack开发环境配置

webpack.dll.config.js webpack的生成dll的配置

webpack.prod.config.js webpack的生产环境的配置

**开发依赖的第三方库:**

babel-core babel的核心包

babel-loader babel-loader

babel-plugin-transform-decorators-legacy 让js支持注解

babel-plugin-transform-runtime 自动引入各种polyfill

babel-preset-es2015 支持es6

babel-preset-es2016 支持es7

babel-preset-es2017 支持es8

bower bower

clean-webpack-plugin webpack清除插件

compression-webpack-plugin gzip插件

css-loader css-loader

extract-text-webpack-plugin 将webpack打包的css提出单独文件

file-loader file-loader

happypack 多线程执行webpack

html-loader html-loader

html-webpack-include-assets-plugin 向html中动态插入资源插件

html-webpack-plugin html-webpack-plugin

postcss-loader postcss-loader

style-loader style-loader

uglifyjs-webpack-plugin uglifyjs-webpack-plugin

url-loader url-loader

webpack webpack

webpack-dev-server webpack-dev-server

webpack-manifest-plugin webpack-manifest-plugin

webpack-merge 合并多个webpack配置文件

**我编写的loader:**

ensure-chunk-loader 用来将某个路径下面的所有的文件夹中的与文件夹同名的页面(html等)和script(javascript等)资源自动动态打包到项目中,就像require.ensure所做的事.

ensure-script-loader 用来将某个路径下面的所有的script(javascript等)资源自动动态打包到项目中,就像require.ensure所做的事.

extract-loader-path-correction 对extract-loader的修改,因为extract-loader在引入css时,css中若有资源(img,字体文件等)时路径可能不正确.

**项目依赖:**

axios ajax插件,因为jquery.ajax不是支持标准promise,在使用异步函数的时候不方便,因此使用axios.

lodash 强大的js工具库

mobx 搞数据驱动就靠它了




