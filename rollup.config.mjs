import fg from "fast-glob";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import path from "path";

// 获取script/src目录下的所有TypeScript/JavaScript文件
const inputFiles = fg.sync("script/src/**/*.{ts,tsx,js,jsx}");

// 创建入口点配置
const inputConfig = {};
inputFiles.forEach(file => {
    // 提取文件名作为入口点名称，保留目录结构
    const name = file.replace(/^script\/src\//, '').replace(/\.[^/.]+$/, '');
    inputConfig[name] = file;
});

export default {
    input: inputConfig,
    output: {
        dir: "script/dist",
        // 简化输出文件名配置
        entryFileNames: "[name].jsx",
        intro: "(function () {",
        outro: "}).call(this);",
        plugins: [
            terser({
                compress: false,
                mangle: false,
                format: {
                    beautify: true,
                    braces: true,
                    comments: false,
                    keep_quoted_props: true,
                    keep_numbers: true,
                    preamble: `// ${new Date().toLocaleString()}`,
                    wrap_func_args: false,
                },
            }),
        ],
    },
    treeshake: {
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
    },
    plugins: [typescript()],
    context: "this",
    onwarn(warning, warn) {
        if (warning.code === 'EVAL') return;
        warn(warning);
    }
};
