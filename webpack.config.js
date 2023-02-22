const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/script.js",
    output: {
        publicPath: "./", 
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        static: "./dist"
    }, 
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"], 
            }
        ]
    }
};
