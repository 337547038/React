var path = require('path');
var glob = require('glob');
var node_modules_dir = path.join(__dirname, 'node_modules');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const SOURCE_DIR = 'src/examples/';
const PRODUCT_DIR = 'dist';

//process.env.NODE_ENV = 'production';

const debug = process.env.NODE_ENV !== 'production';

var entries = getEntrys(SOURCE_DIR + '**/*.*');
var chunks = Object.keys(entries.js);
var pages = Object.keys(entries.pages);
var resourcs = Object.keys(entries.resource);
var copyfile_configs = [];
var config = {
    entry: entries.js,
    output: {
        path: path.join(__dirname, PRODUCT_DIR),
        filename: '[name]'
    },
    externals: {
        'react': 'React',
        'React': 'React',
        'react-dom': 'ReactDOM',
        'ReactDOM': 'ReactDOM'
    },
    plugins: [
        // new UglifyJsPlugin({ //压缩代码
        //     compress: {
        //         warnings: false
        //     },
        //     output: {
        //         comments: false
        //     },
        //     except: ['$super', '$', 'exports', 'require'] //排除关键字
        // }),
        new ExtractTextPlugin("css/style.css")

        //将src目录下的一上些静态资源复制到dist
        /*new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '/src/images'),
                to: path.join(__dirname, '/examples/images')
            },
            {
                from: path.join(__dirname, '/src/libs'),
                to: path.join(__dirname, '/examples/libs')
            }
            /!*{
             from: path.join(__dirname, '/src/temp'),
             to: path.join(__dirname, '/dist/temp')
             }*!/
        ])*/
    ],

    module: {
        loaders: [
            {
                test: /\.js?$/, // Match both .js and .jsx files
                exclude: /node_modules/,
                loader: "jsx-loader"
            }, {
                test: /\.eot|ttf|svg|png|jpg|gif|woff2?$/,
                loader: 'url',
                query: {
                    limit: 10240,
                    name: PRODUCT_DIR + '/images/[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                //loader: 'style-loader!css-loader'
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.scss$/,
                //loader:'style-loader!css-loader?sourceMap!sass-loader?sourceMap'
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            }
        ]
        // noParse: [pathToReact, pathToReactDOM]
    },
    resolve: {
        alias: {
            /* 'react': pathToReact,
             'React': pathToReact,
             'react-dom': pathToReactDOM,
             'ReactDOM': pathToReactDOM*/
        }
    },
    devServer: {
        //contentBase:'./'
        outputPath: path.join(__dirname, PRODUCT_DIR)
    }
};

resourcs.forEach(function (pathname) {
    var copy_conf = {
        from: SOURCE_DIR + pathname,
        to: pathname
    };
    copyfile_configs.push(copy_conf);
});

config.plugins.push(new CopyWebpackPlugin(copyfile_configs));

pages.forEach(function (pathname) {
    if (pathname.indexOf('.html') === pathname.length - 5) {
        var html_conf = {
            filename: pathname,
            template: SOURCE_DIR + pathname,
            inject: 'body',
            chunks: [pathname.substring(0, pathname.length - 5) + '.js'],
            hash: false,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        };
        config.plugins.push(new HtmlWebpackPlugin(html_conf));
    }
});

function getEntrys(globPath) {
    var files = glob.sync(globPath);
    console.log(globPath);
    var entries = {js: {}, pages: {}, resource: {}}, entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        var split = dirname.split('/');
        //pathname = path.join(split.slice(2,split.length).join("/"), basename+extname);
        pathname = entry.slice(entry.lastIndexOf(SOURCE_DIR) + SOURCE_DIR.length);
        if (extname === '.js') {
            entries.js[pathname] = "./" + entry;
        } else if (extname === '.html') {
            entries.pages[pathname] = "./" + entry;
        } else {
            entries.resource[pathname] = "./" + entry;
        }
    }
    console.log(entries);
    return entries;
}

var css_config = {
    entry: './src/scss/index.scss',
    output: {
        path: PRODUCT_DIR + "/",
        filename: 'css/style.css'
    },
    plugins: [
        new ExtractTextPlugin("css/style.css")
    ],
    devtool:'#source-map',
    module: {
        loaders: [
            {
                test: /\.eot|ttf|svg|png|gif|jpg|woff2?$/,
                exclude: /node_modules/,
                loader: 'url',
                query: {
                    limit: 10240,
                    name: PRODUCT_DIR + '/images/[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
            }
        ]
    }
};

//module.exports = [config,css_config];
module.exports = config;