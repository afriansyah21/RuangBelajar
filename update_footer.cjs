const fs = require('fs');
const path = require('path');

const targetDirs = fs.readdirSync(__dirname).filter(f => 
    fs.statSync(path.join(__dirname, f)).isDirectory() && 
    (f.endsWith('-admin') || f === 'admin-dashboard' || f === 'admin-login')
);

targetDirs.forEach(dir => {
    const indexPath = path.join(__dirname, dir, 'index.html');
    if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf-8');
        
        // For admin-login
        if (dir === 'admin-login') {
            content = content.replace(/<div class="flex flex-wrap justify-center gap-md text-xs font-lexend text-slate-500">[\s\S]*?<\/div>/, `<div class="flex flex-wrap justify-center gap-md text-xs font-lexend text-slate-500">\n        <a class="hover:text-blue-600 hover:underline" href="https://wa.me/6289528236913" target="_blank">Kontak Kami</a>\n      </div>`);
        } else {
            // For other admin pages
            content = content.replace(/<div class="footer-links">[\s\S]*?<\/div>/, `<div class="footer-links">\n        <a href="https://wa.me/6289528236913" target="_blank">Kontak Kami</a>\n      </div>`);
        }
        
        fs.writeFileSync(indexPath, content, 'utf-8');
        console.log('Updated', indexPath);
    }
});
