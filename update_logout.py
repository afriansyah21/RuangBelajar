import os
import re

directories = [
    'D:/Project/Ruang_Belajar/donasi-user',
    'D:/Project/Ruang_Belajar/kelas-user',
    'D:/Project/Ruang_Belajar/kuis-user',
    'D:/Project/Ruang_Belajar/tentang-user',
    'D:/Project/Ruang_Belajar/profil-user'
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
            replacement = '''        <a href="#" class="nav-link nav-link-logout">
          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 4px;">logout</span> Logout
        </a>

      </div>'''
            html = re.sub(r'(<a[^>]*>\s*Profil\s*</a>\s*)</div>', r'\g<1>' + replacement.replace('      </div>', '</div>'), html)
            html = re.sub(r'(<a[^>]*class="nav-link active"[^>]*>\s*Profil\s*</a>\s*)</div>', r'\g<1>' + replacement.replace('      </div>', '</div>'), html)

        # Update desktop logout icon
        desktop_icon_pattern = '<span class="material-symbols-outlined" style="cursor: pointer; color: #64748b; padding: 8px; border-radius: 50%;" data-icon="logout">logout</span>'
        if desktop_icon_pattern in html:
            html = html.replace(desktop_icon_pattern, '<span class="material-symbols-outlined logout-icon-desktop" data-icon="logout">logout</span>')
            
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html)
            
    if os.path.exists(css_path):
        with open(css_path, 'r', encoding='utf-8') as f:
            css = f.read()
            
        if 'nav-link-logout' not in css:
            with open(css_path, 'a', encoding='utf-8') as f:
                f.write(css_to_add)

print('Updated all 5 directories.')
