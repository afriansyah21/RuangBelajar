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
    
    if os.path.exists(html_path):
        with open(html_path, 'r', encoding='utf-8') as f:
            html = f.read()
            
        # We want to replace the entire <div class="nav-actions">...</div> with just the logout icon
        # The content could be multiple lines
        
        pattern = r'<div class="nav-actions">.*?</div>'
        replacement = '''<div class="nav-actions">
          <span class="material-symbols-outlined logout-icon-desktop" data-icon="logout">logout</span>
      </div>'''
        
        # Need re.DOTALL to match across newlines
        html = re.sub(pattern, replacement, html, flags=re.DOTALL)
            
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html)

print('Cleaned up nav-actions in 5 directories.')
