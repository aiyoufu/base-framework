import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import createAutoImport from './vite/plugins'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env

  // 共享解析器配置
  const elementPlusResolver = ElementPlusResolver()

  return {
    base: VITE_APP_ENV === 'production' ? './' : '/',
    plugins: [
      vue(),
      createAutoImport(), // 使用统一的自动导入配置
      ElementPlus({}),
      Components({
        dirs: ['src/components', 'src/layouts'], // 指定组件所在的目录
        extensions: ['vue'], // 组件的文件扩展名
        deep: true, // 启用深度搜索
        dts: 'src/components.d.ts', // 生成 TypeScript 声明文件
        include: [/\.vue$/, /\.js$/, /\.ts$/], // 包含的文件类型
        exclude: [/node_modules/], // 排除的目录
        resolvers: [elementPlusResolver], // 使用 ElementPlusResolver 自动导入 Element Plus 组件
      }),
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    server: {
      port: 807,
      host: true,
      open: true,
      proxy: {
        '/dev-api': {
          target: 'http://localhost:8087',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ''),
        },
      },
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
  }
})
