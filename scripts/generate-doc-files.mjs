/**
 * Documentation files generator
 * This script scans the docs directory and generates the docFiles.ts index
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(__dirname, '../src/docs');
const outputFile = path.join(__dirname, '../src/utils/docFiles.ts');

function findFiles(dir, basePath = '') {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = basePath ? `${basePath}/${item}` : item;
    
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...findFiles(fullPath, relativePath));
    } else if (item.endsWith('.md') || item.endsWith('.yaml')) {
      files.push(relativePath);
    }
  }
  
  return files;
}

function generateImportName(filePath) {
  return filePath
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase();
}

function generateDocFiles() {
  const files = findFiles(docsDir);
  
  let imports = '// Generated documentation index - this file imports all documentation content\n';
  let exports = 'export const docFiles = {\n';
  
  for (const file of files) {
    const importName = generateImportName(file);
    imports += `import ${importName} from '../docs/${file}?raw';\n`;
    exports += `  '${file}': ${importName},\n`;
  }
  
  exports += '} as const;\n\n';
  exports += 'export type DocFilePath = keyof typeof docFiles;';
  
  const content = imports + '\n' + exports;
  
  fs.writeFileSync(outputFile, content);
  console.log(`Generated docFiles.ts with ${files.length} files:`);
  files.forEach(file => console.log(`  - ${file}`));
}

generateDocFiles();
