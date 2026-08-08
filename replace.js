const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(path.join(__dirname));
let changed = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('AM Agency') || content.includes('AM AGENCY')) {
        content = content.replace(/AM Agency/g, 'AM Studio').replace(/AM AGENCY/g, 'AM STUDIO');
        fs.writeFileSync(file, content);
        changed++;
        console.log('Updated ' + file);
    }
});
console.log('Total files changed: ' + changed);
