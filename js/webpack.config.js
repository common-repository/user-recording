var path = require('path');
var webpack = require('webpack');
var helper=require('path');
module.exports = {
    entry: {
        recorder: './Recorder/Bootstrap.ts',
        player:'./Player/Player.ts',
        reactplayer:'./React/Screens/Player/App.tsx',
        support:'./React/Screens/Support/Support.ts',
        settings:'./React/Screens/Settings/SettingsApp.tsx',
        recorder_public: './Public/RecorderPublic.ts',
        reproduction_public: './Public/ReproductionPublic.tsx'
    },
    output: {
        filename: './Bundle/[name]_bundle.js'
    },
    resolve: {
        modules: [
            path.resolve('./node_modules')
        ],
        extensions: ['.ts', '.js','.tsx']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre",
                exclude:helper.resolve(__dirname,'node_modules/@types/es6-promise')
            },
            {
                test: /\.jsx$/,
                use: ["source-map-loader"],
                enforce: "pre",
                exclude:helper.resolve(__dirname,'node_modules/@types/es6-promise')
            },
            {
                test: /\.ts$/,
                use: ["ts-loader"]
            },
            {
                test: /\.tsx$/,
                use: ["ts-loader"]
            }
        ]
    }, externals: {
        "jQuery":"jQuery"
    },
    plugins:[
        new webpack.ProvidePlugin({
            Promise: 'es6-promise'
        })
    ]
};