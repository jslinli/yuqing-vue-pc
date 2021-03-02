import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJSX from '@vitejs/plugin-vue-jsx';
import { viteMockServe } from 'vite-plugin-mock';
import styleImport from 'vite-plugin-style-import';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';

function pathResolve(dir: string) {
  return path.resolve(__dirname, '.', dir);
}

// https://cn.vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': pathResolve('src'),
    },
  },
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`;
          },
        },
      ],
    }),
    vueJSX(),
    // 使用js语法mock（true使用ts语法）
    viteMockServe({ supportTs: false }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
});
