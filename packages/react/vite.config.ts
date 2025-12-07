import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
// @ts-expect-error - Vite version mismatch between monorepo root and package
export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib';

  return {
    plugins: isLib
      ? [
          react(),
          dts({
            include: ['src'],
            exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx'],
          }),
        ]
      : [react()],
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
              'desktop/index': resolve(__dirname, 'src/desktop/index.ts'),
              'web/index': resolve(__dirname, 'src/web/index.ts'),
              'activity/index': resolve(__dirname, 'src/activity/index.ts'),
            },
            name: 'CritFumbleUI',
            formats: ['es'],
          },
          rollupOptions: {
            external: [
              'react',
              'react-dom',
              'react/jsx-runtime',
              'clsx',
              'framer-motion',
              'react-rnd',
              'zustand',
            ],
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
