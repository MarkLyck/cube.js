const TypeDoc = require('typedoc');
const path = require('path');
const fs = require('fs-extra');

const outputDir = '../docs/content/Cube.js-Frontend';

// const outputDir = path.resolve(__dirname, '../docs/content/Cube.js-Frontend');

const app = new TypeDoc.Application();

app.options.addReader(new TypeDoc.TSConfigReader());

app.bootstrap({
  excludeExternals: true,
  includeDeclarations: true,
  plugin: ['./dist/index.js'],
  hideSources: true,
  hideIndexes: true,
  name: 'docs',
});

const projects = [
  {
    name: '@cubejs-client-core',
    docsPath: '../packages/cubejs-client-core/index.d.ts',
    outputDir,
  },
  {
    name: '@cubejs-client-react',
    docsPath: '../packages/cubejs-client-react/index.d.ts',
    outputDir,
  },
  {
    name: '@cubejs-client-ws-transport',
    docsPath: '../packages/cubejs-client-ws-transport/index.d.ts',
    outputDir,
  },
];

projects.forEach(({ name, docsPath, outputDir }) => {
  const tmpDir = path.join(outputDir, 'tmp');
  const project = app.convert(app.expandInputFiles([docsPath]));

  console.log(`${name} tmp path`, tmpDir);

  try {
    app.generateDocs(project, tmpDir);

    if (fs.existsSync(tmpDir)) {
      const [tmpFileName] = fs.readdirSync(tmpDir);

      const pathArr = tmpDir.split('/');
      pathArr.splice(-1, 1);
      const out = path.join(...pathArr);
      const currentPath = path.join(out, `${name}.md`);
      
      console.log(`>>> copy ${path.join(tmpDir, tmpFileName)} to ${currentPath}`);

      fs.copyFileSync(path.join(tmpDir, tmpFileName), currentPath);
      
      if (currentPath === '../docs/content/Cube.js-Frontend/@cubejs-client-core.md') {
        console.log('>>>', fs.readFileSync(currentPath).toString())
      }
      fs.removeSync(tmpDir);
    }
  } catch (error) {
    console.error(`Error generating '${name}' docs`, error);
  }
});
