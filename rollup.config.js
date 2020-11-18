import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'index.js',
      format: 'es',
      sourcemap: true,
      plugins: [filesize()]
    },
    {
      file: 'index.min.js',
      format: 'es',
      sourcemap: true,
      plugins: [terser()]
    }
  ]
}
