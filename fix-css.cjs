const fs = require('fs');
let content = fs.readFileSync('sign-up-user/style.css', 'utf8');

// 1. Add width: 100%
content = content.replace('height: 54px;', 'width: 100%;\n  height: 54px;');

// 2. Add padding-right to password wrapper input
content = content.replace(
  '.password-wrapper {\r\n\r\n  position: relative;\r\n}',
  '.password-wrapper {\r\n  position: relative;\r\n}\r\n\r\n.password-wrapper input {\r\n  padding-right: 48px;\r\n}'
);

content = content.replace(
  '.password-wrapper {\n\n  position: relative;\n}',
  '.password-wrapper {\n  position: relative;\n}\n\n.password-wrapper input {\n  padding-right: 48px;\n}'
);

// 3. Fix toggle-password to be height: 100% and flex centered
content = content.replace(
  '.toggle-password {\r\n\r\n  position: absolute;\r\n\r\n  top: 50%;\r\n  right: 16px;\r\n\r\n  transform: translateY(-50%);',
  '.toggle-password {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 16px;\r\n  height: 100%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 0;'
);

content = content.replace(
  '.toggle-password {\n\n  position: absolute;\n\n  top: 50%;\n  right: 16px;\n\n  transform: translateY(-50%);',
  '.toggle-password {\n  position: absolute;\n  top: 0;\n  right: 16px;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;'
);

// 4. Re-append pageFadeScale animation
const css = '\n\n/* PAGE TRANSITION ANIMATION */\nbody > *:not(.navbar):not(.bg-blur) {\n  animation: pageFadeScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;\n}\n\n@keyframes pageFadeScale {\n  0% {\n    opacity: 0;\n    transform: scale(0.95) translateY(15px);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n';

if (!content.includes('pageFadeScale')) {
  content += css;
}

fs.writeFileSync('sign-up-user/style.css', content);
console.log('Fixed sign-up-user/style.css');
