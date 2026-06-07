import os
import re

directories = [
    'D:/Project/Ruang_Belajar/donasi-user',
    'D:/Project/Ruang_Belajar/kelas-user',
    'D:/Project/Ruang_Belajar/kuis-user',
    'D:/Project/Ruang_Belajar/tentang-user',
    'D:/Project/Ruang_Belajar/profil-user'
]

for d in directories:
    html_path = os.path.join(d, 'index.html')
    css_path = os.path.join(d, 'style.css')
    
    if os.path.exists(html_path):
        with open(html_path, 'r', encoding='utf-8') as f:
            html = f.read()
            
        # Revert desktop icon
        html = html.replace(
            '<span class="material-symbols-outlined logout-icon-desktop" data-icon="logout">logout</span>',
            '<span class="material-symbols-outlined" style="cursor: pointer; color: #64748b; padding: 8px; border-radius: 50%;" data-icon="logout">logout</span>'
        )
        
        # Remove hamburger link
        hamburger_link_pattern = r'\s*<a href="#" class="nav-link nav-link-logout">\s*<span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 4px;">logout</span> Logout\s*</a>'
        html = re.sub(hamburger_link_pattern, '', html)
        
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html)
            
    if os.path.exists(css_path):
        with open(css_path, 'r', encoding='utf-8') as f:
            css = f.read()
            
        # Revert CSS
        css_split = css.split('/* LOGOUT MENU HAMBURGER (MOBILE ONLY) */')
        if len(css_split) > 1:
            css = css_split[0]
            
            with open(css_path, 'w', encoding='utf-8') as f:
                f.write(css)

print('Reverted all 5 directories.')
