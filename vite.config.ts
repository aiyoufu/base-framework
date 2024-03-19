import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import createVitePlugins from './vite/plugins'

// 共享解析器配置
const elementPlusResolver = ElementPlusResolver()

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env

  // 合并自定义插件与新提供的插件
  const plugins = [
    vue(),
    ElementPlus({}),
    AutoImport({
      resolvers: [elementPlusResolver],
    }),
    Components({
      dirs: ['src/components', 'src/layouts'],
      extensions: ['vue'],
      deep: true,
      dts: 'src/components.d.ts',
      include: [/\.vue$/, /\.js$/, /\.ts$/],
      exclude: [/node_modules/],
      resolvers: [elementPlusResolver],
    }),
    ...createVitePlugins(env, command === 'build'),
  ]

  return {
    base: VITE_APP_ENV === 'production' ? './' : '/',
    plugins,
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
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
          rewrite: (p) => p.replace(/^\/dev-api/, ''),
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
