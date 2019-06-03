const fs = require('fs');
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript');
const { dts } = require("rollup-plugin-dts");

const packages = fs.readdirSync('packages');

async function build(package) {
  const input = `packages/${package}/src/index.ts`;

  const inputOptions = {
    input,
    external: [
      'lodash',
      'react',
      '@piex-store/core'
    ],
    plugins: [
      rollupTypescript()
    ]
  };

  const outputOptions = {
    file: `packages/${package}/lib/index.js`,
    format: 'es'
  };

  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // generate code and a sourcemap
  await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

async function buildDts(package) {
  const input = `packages/${package}/src/index.ts`;

  const inputOptions = {
    input,
    external: [
      'lodash',
      'react'
    ],
    plugins: [
      dts({
        tsconfig: fs.readFileSync('./tsconfig.json').toString()
      })
    ],
    treeshake: { moduleSideEffects: false },
    output: [{
      file: `packages/${package}/lib/index.d.ts`,
      format: 'es'
    }]
  };

  const outputOptions = {
    file: `packages/${package}/lib/index.d.ts`,
    format: 'es'
  };

  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // generate code and a sourcemap
  await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

packages.map(async (package) => {
  await build(package);
  await buildDts(package);
})
