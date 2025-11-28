import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib';

  return {
    plugins: [
      react(),
      isLib && dts({
        include: ['src'],
        exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx'],
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: isLib
      ? {
          lib: {
            entry: {
              index: resolve(__dirname, 'src/index.ts'),
              'shared/index': resolve(__dirname, 'src/shared/index.ts'),
              'web/index': resolve(__dirname, 'src/web/index.ts'),
              'activity/index': resolve(__dirname, 'src/activity/index.ts'),
            },
            name: 'CritFumbleUI',
            formats: ['es'],
          },
          rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
              },
            },
          },
          cssCodeSplit: false,
        }
      : {
          outDir: 'dist-storybook',
        },
  };
});
