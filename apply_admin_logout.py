import os
import re

directories = [
    'D:/Project/Ruang_Belajar/admin-dashboard',
    'D:/Project/Ruang_Belajar/manajemen-pengguna-admin',
    'D:/Project/Ruang_Belajar/manajemen-kelas-admin',
    'D:/Project/Ruang_Belajar/manajemen-kuis-admin',
    'D:/Project/Ruang_Belajar/manajemen-donasi-admin'
]

css_to_add = '''
/* LOGOUT MENU HAMBURGER (MOBILE ONLY) */
.nav-link-logout {
  display: none;
}

.nav-link-logout:hover {
  color: #ef4444 !important;
}

.nav-link-logout::after {
  background: #ef4444 !important;
}

@media(max-width: 1100px) {
  .nav-link-logout {
    display: block;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(226,232,240,0.5);
    width: 100%;
  }
}

/* DESKTOP LOGOUT ICON */
.logout-icon-desktop {
  cursor: pointer;
  color: #64748b;
  padding: 8px;
  border-radius: 50%;
  transition: 0.3s;
}

.logout-icon-desktop:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}
'''

for d in directories:
    html_path = os.path.join(d, 'index.html')
    css_path = os.path.join(d, 'style.css')
    
    if os.path.exists(html_path):
        with open(html_path, 'r', encoding='utf-8') as f:
            html = f.read()
            
        # Add nav-link-logout if not exists
        if 'nav-link-logout' not in html:
            # Match the end of the nav-menu div safely.
            html = re.sub(r'(\s*)\</div>\s*<div class="nav-actions">', 
                          r'\1  <a href="#" class="nav-link nav-link-logout">\1    <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 4px;">logout</span> Logout\1  </a>\1\1</div>\1<div class="nav-actions">', 
                          html)

        # Replace nav-actions content with just the logout icon
        pattern = r'<div class="nav-actions">.*?</div>'
        replacement = '''<div class="nav-actions">
          <span class="material-symbols-outlined logout-icon-desktop" data-icon="logout">logout</span>
      </div>'''
        html = re.sub(pattern, replacement, html, flags=re.DOTALL)
            
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html)
            
    if os.path.exists(css_path):
        with open(css_path, 'r', encoding='utf-8') as f:
            css = f.read()
            
        if 'nav-link-logout' not in css:
            with open(css_path, 'a', encoding='utf-8') as f:
                f.write(css_to_add)

print('Updated all 5 admin directories.')
