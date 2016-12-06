//开发环境的配置
//module.filename、__filename、__dirname、process.cwd()和require.main.filename 解惑: http://www.tuicool.com/articles/bQre2a
//node.js之path模块: http://www.jianshu.com/p/fe41ee02efc8
//react-router: http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu
//出现如下错误：Cannot sync router: route state does not exist. Did you install the routing reducer，参考：http://stackoverflow.com/questions/34039619/redux-simple-router-react-router-error-route-state-does-not-exist
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
console.log('>>>>>' + path.resolve(__dirname, './build'))
var cwd = process.cwd();
var baseRoot = "./src/"
module.exports = {
  entry: {
    bundle: baseRoot+ 'main.js',
    vendors: ['react', 'react-dom', 'antd', 'jquery'],
  },
  output: {
    path: path.resolve(__dirname, './build/'),
    filename: '[name].js',
    publicPath: '/demo1/build/'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        // 在这里添加 react-hot，注意这里使用的是loaders，所以不能用 query，应该把presets参数写在 babel 的后面
        //loaders: ['react-hot','babel-loader?presets[]=react,presets[]=es2015']
        loaders: ['react-hot-loader/webpack','babel?presets[]=react,presets[]=es2015']
      },
      { 
        test: /\.less$/, 
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      }, 
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader","css-loader")
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)((\?v=[0-9]\.[0-9]\.[0-9])|(\?t=\d+))?$/,
        loader: "file-loader?name=[name].[ext]" 
      },
      { 
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=819200000' 
      },
      {test: /\.(png|jpg|gif)$/,loader: 'file-loader?name=[name].[ext]'},
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extension: ['', '.js', '.jsx', '.json'],
    alias: {
      "styles": path.join(cwd, baseRoot + "styles"),
      "less": path.join(cwd, baseRoot + "styles/less"),
      "actions": path.join(cwd,baseRoot + "actions"),
      "constants": path.join(cwd, baseRoot + "constants"),
      "images": path.join(cwd, baseRoot + "images"),
      "reducers": path.join(cwd, baseRoot + "reducers"),
      "stores": path.join(cwd, baseRoot + "stores"),
      "modules": path.join(cwd, baseRoot + "modules"),
      "components": path.join(cwd, baseRoot + "components"),
      "utils": path.join(cwd, baseRoot + "utils"),
      "routes": path.join(cwd, baseRoot + "routes"),
      "trd": path.join(cwd, baseRoot + "trd"),
    }

  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),//CommonsChunkPlugin提取公共代码的3种方式：http://blog.csdn.net/github_26672553/article/details/52280655
    new webpack.DefinePlugin({'process.env.NODE_ENV':'"production"'})
  ]
};
