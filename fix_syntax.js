const fs = require('fs');
const path = require('path');

function findScripts(dir, results = []) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        if (item === 'node_modules' || item === 'backend' || item === '.git') continue;
        const full = path.join(dir, item);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
            findScripts(full, results);
        } else if (item === 'script.js') {
            results.push(full);
        }
    }
    return results;
}

const root = 'C:\\Users\\USER\\Documents\\GitHub\\RuangBelajar';
const files = findScripts(root);
let totalFixed = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    // Fix: `word-word-word' → 'word-word-word'  (IDs with dashes like `course-title')
    content = content.replace(/`([\w][\w\-]*[\w]|[\w])'(?=[)\s,;])/g, "'$1'");
    
    // Fix: `Simple string text' → 'Simple string text'
    content = content.replace(/`([A-Za-z][A-Za-z0-9\s\!\?\,\.\:\-\_\/]+)'/g, "'$1'");
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        const rel = path.relative(root, file);
        console.log('FIXED:', rel);
        totalFixed++;
    }
}

console.log(`\nDone! ${totalFixed} files fixed.`);
