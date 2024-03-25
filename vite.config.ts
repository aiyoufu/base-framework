import { defineConfig, loadEnv } from 'vite'
import path from 'path'
// import createVitePlugins from './vite/plugins'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env

  // 共享解析器配置

  return {
    base: VITE_APP_ENV === 'production' ? './' : '/',
    plugins: [
      vue(),
      // AutoImport({
      //   imports: ['vue', '@vueuse/core'],
      //   resolvers: [ElementPlusResolver()],
      //   dirs: ['./composables/**'],
      //   vueTemplate: true,
      // }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: true, // 生成自动导入的类型声明文件
        resolvers: [
          ElementPlusResolver(), // 自动导入 Element Plus 组件
        ],
      }),
      // createVitePlugins(env, command === 'build'), // 使用统一的自动导入配置
    ],
    resolve: {
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src'),
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
