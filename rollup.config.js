import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy-glob';
import md5 from 'md5';
import fs from 'fs';
import util from 'util';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
		svelte({
			skipIntroByDefault: true,
			nestedTransitions: true,
			dev: !production,
			css: css => {
				css.write('public/bundle.css');
			}
		}),
		resolve(),
		commonjs(),
		{
			name: 'md5',
			generateBundle(outputOptions, bundle) {
				const md5sum = md5(JSON.stringify(bundle));
				util.promisify(fs.writeFile)('public/md5.json', JSON.stringify({md5sum}));
			}
		},
		copy(
			[
				{ files: 'src/static/*.*', dest: 'public' }
			], { verbose: true, watch: !production }
		),
		production && terser()
	]
};
