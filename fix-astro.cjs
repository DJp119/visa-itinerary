const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('export async function get(')) {
    return;
  }

  // Find the frontmatter bounds
  const frontmatterStart = content.indexOf('---');
  const frontmatterEnd = content.indexOf('---', frontmatterStart + 3);
  if (frontmatterStart === -1 || frontmatterEnd === -1) return;

  let frontmatter = content.substring(frontmatterStart + 3, frontmatterEnd);
  
  // Replace export async function get
  frontmatter = frontmatter.replace(/export async function get\(/, 'async function getData(');

  // find the end of getData function
  let openBraces = 0;
  let functionStarted = false;
  let functionEndIndex = -1;
  let getIndex = frontmatter.indexOf('async function getData(');

  for (let i = getIndex; i < frontmatter.length; i++) {
    if (frontmatter[i] === '{') {
      openBraces++;
      functionStarted = true;
    } else if (frontmatter[i] === '}') {
      openBraces--;
      if (functionStarted && openBraces === 0) {
        functionEndIndex = i;
        break;
      }
    }
  }

  if (functionEndIndex !== -1) {
    // Check for an accidental extra closing brace
    let afterFunction = frontmatter.substring(functionEndIndex + 1);
    let nextBrace = afterFunction.indexOf('}');
    if (nextBrace !== -1) {
       let beforeBrace = afterFunction.substring(0, nextBrace).trim();
       if (beforeBrace === '') {
          // Extra brace found! Let's remove it
          frontmatter = frontmatter.substring(0, functionEndIndex + 1) + afterFunction.substring(nextBrace + 1);
       }
    }

    // Append the call to getData
    frontmatter += `\nconst _data = await getData({ params: Astro.params });\nconst props = _data?.props || {};\n`;
    
    // Write back
    const newContent = content.substring(0, frontmatterStart + 3) + frontmatter + content.substring(frontmatterEnd);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Fixed', filePath);
  } else {
    console.log('Could not find end of getData in', filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.astro')) {
      processFile(fullPath);
    }
  }
}

walk(path.join(__dirname, 'src/pages'));
