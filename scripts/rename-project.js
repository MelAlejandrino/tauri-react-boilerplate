import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const projectRoot = path.resolve(__dirname, '..');

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

async function main() {
  const newName = process.argv[2] || await askQuestion('Enter the new project name (kebab-case recommended): ');
  
  if (!newName) {
    console.error('Project name is required.');
    process.exit(1);
  }

  // 1. Update package.json
  const packageJsonPath = path.join(projectRoot, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const content = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    content.name = newName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(content, null, 2));
    console.log(`Updated package.json name to "${newName}"`);
  }

  // 2. Update src-tauri/tauri.conf.json
  const tauriConfPath = path.join(projectRoot, 'src-tauri', 'tauri.conf.json');
  if (fs.existsSync(tauriConfPath)) {
    const content = JSON.parse(fs.readFileSync(tauriConfPath, 'utf8'));
    content.productName = newName;
    // Update identifier logic: keep the prefix, change the last part
    const idParts = content.identifier.split('.');
    idParts[idParts.length - 1] = newName;
    content.identifier = idParts.join('.');
    
    // Update window title
    if (content.app && content.app.windows && content.app.windows.length > 0) {
        content.app.windows[0].title = newName;
    }

    fs.writeFileSync(tauriConfPath, JSON.stringify(content, null, 2));
    console.log(`Updated tauri.conf.json productName, identifier, and window title to "${newName}"`);
  }

  // 3. Update src-tauri/Cargo.toml
  const cargoTomlPath = path.join(projectRoot, 'src-tauri', 'Cargo.toml');
  if (fs.existsSync(cargoTomlPath)) {
    let content = fs.readFileSync(cargoTomlPath, 'utf8');
    // Simple regex replacement for name = "..."
    content = content.replace(/^name\s*=\s*".*?"/m, `name = "${newName}"`);
    fs.writeFileSync(cargoTomlPath, content);
    console.log(`Updated Cargo.toml name to "${newName}"`);
  }

  // 4. Update index.html title
  const indexHtmlPath = path.join(projectRoot, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    let content = fs.readFileSync(indexHtmlPath, 'utf8');
    content = content.replace(/<title>.*?<\/title>/, `<title>${newName}</title>`);
    fs.writeFileSync(indexHtmlPath, content);
    fs.writeFileSync(indexHtmlPath, content);
    console.log(`Updated index.html title to "${newName}"`);
  }

  // 5. Update src/components/title-bar.tsx
  const titleBarPath = path.join(projectRoot, 'src', 'components', 'title-bar.tsx');
  if (fs.existsSync(titleBarPath)) {
    let content = fs.readFileSync(titleBarPath, 'utf8');
    // Replace the text inside the div with the folder icon
    // Looking for: <FolderOpen className={'size-4'}/> tauri-boilerplate</div>
    content = content.replace(/(<FolderOpen[^>]*\/>\s*)([^<]*)(<\/div>)/, `$1${newName}$3`);
    fs.writeFileSync(titleBarPath, content);
    console.log(`Updated src/components/title-bar.tsx to "${newName}"`);
  }

  console.log(`\nProject renamed to "${newName}" successfully!`);
  console.log('\nIMPORTANT: To rename the project folder/repository yourself:');
  console.log('1. Close your IDE and terminal.');
  console.log('2. Manually rename the folder in File Explorer.');
  console.log('3. Re-open the project in the new folder.');
  console.log('\nNote: You may need to delete the `src-tauri/target` directory and run `npm install` again if you encounter build issues.');
  rl.close();
}

main();
