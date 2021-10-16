import path from 'path'
import babel from 'rollup-plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'
import { uglify } from 'rollup-plugin-uglify'
import merge from 'lodash.merge'
import typescript from 'rollup-plugin-typescript2'

const extensions = ['.js', '.ts']

const resolve = (...args) => path.resolve(__dirname, ...args)

// build types
const jobs = {
  esm: {
    output: {
      format: 'esm',
      file: resolve(pkg.module)
    }
  },
  umd: {
    output: {
      format: 'umd',
      file: resolve(pkg.main),
      name: 'rem'
    }
  },
  min: {
    output: {
      format: 'umd',
      file: resolve(pkg.main.replace(/(.\w+)$/, '.min$1')),
      name: 'rem'
    },
    plugins: [uglify()]
  }
}

// get build type by env
const mergeConfig = jobs[process.env.FORMAT || 'esm']

module.exports = merge(
  {
    input: resolve('./src/index.ts'),
    output: {},
    plugins: [
      nodeResolve({
        extensions,
        modulesOnly: true
      }),
      typescript({
        tsconfigOverride: { compilerOptions: { module: 'es2015' } }
      }),
      babel({
        exclude: 'node_modules/**',
        extensions
      })
    ]
  },
  mergeConfig
)
