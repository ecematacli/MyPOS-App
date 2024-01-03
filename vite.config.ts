import react from '@vitejs/plugin-react'

import path from 'path'
import { defineConfig, Plugin } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import tsconfigPaths from 'vite-tsconfig-paths'

import { ENV_CONFIG_ENUM, getWebpackDefineConfig } from './config'

export const isInCypressTest = process.env.VITE_CYPRESS === 'true'
const isInProduction = process.env.NODE_ENV === 'production'
console.log('url: ', process.env.API_URL)
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  //@ts-ignore
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test-utils/setup.ts',
    exclude: [
      '**/node_modules/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress}.config.*',
      '**/*.pw.test.ts{,x}',
    ],
    include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  ...(isInProduction
    ? {}
    : {
        server: {
          port: 8080,
          strictPort: true,
        },
      }),
  plugins: [
    ...(isInProduction ? [] : [react({ jsxRuntime: 'classic' })]),
    /** Dont use reactRefresh otherwise start-server-and-test isn't notified that app is loaded */
    // @ts-ignore

    // @ts-ignore
    tsconfigPaths({ root: path.join(__dirname) }),
    // @ts-ignore
    handlebars({
      context: {
        title:
          process.env.NODE_ENV !== 'production'
            ? '[DEV] Stock Management'
            : 'Stock Management',
        options: {
          dev: process.env.NODE_ENV !== 'production',
        },
      },
    }) as Plugin,
  ],
  build: {
    minify: isInProduction,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    ...getWebpackDefineConfig(
      process.env.NODE_ENV || ENV_CONFIG_ENUM.PRODUCTION
    ),
  },
})
