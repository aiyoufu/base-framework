import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// 共享解析器配置
const elementPlusResolver = ElementPlusResolver()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 为 Element Plus 按需引入样式
    ElementPlus({
      // options
    }),
    // AutoImport 插件配置了自动导入 Vue Composition API 和 Element Plus 组件的能力
    AutoImport({
      resolvers: [elementPlusResolver],
    }),
    // Components 插件配置了自动按需导入项目中使用的 Vue 组件，包括 Element Plus 组件
    Components({
      // 搜索 src/components 和 src/layouts 目录下的 Vue 组件
      dirs: ['src/components', 'src/layouts'],
      // 支持的文件扩展名
      extensions: ['vue'],
      // 深度搜索组件
      deep: true,
      // 为自动导入的组件生成 TypeScript 声明
      dts: 'src/components.d.ts',
      // 只处理 src 目录下的 .vue/.js/.ts 文件
      include: [/\.vue$/, /\.js$/, /\.ts$/],
      // 排除 node_modules 目录
      exclude: [/node_modules/],
      // 配置第三方组件库解析器
      resolvers: [elementPlusResolver],
    }),
  ],
})
