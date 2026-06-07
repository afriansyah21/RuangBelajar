import re

file_path = r"C:\Users\USER\Documents\GitHub\RuangBelajar\detail-kelas-user\index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# The structure is:
# <div class="materi-item" style="cursor: pointer;" onclick="window.location.href='../tonton-materi-user/index.html'">
#     <div class="materi-info">...</div>
# </div>

pattern = r'<div class="materi-item" style="cursor: pointer;" onclick="window\.location\.href=''../tonton-materi-user/index\.html''">(.*?)</div>\s*(?=<!--|<div class="materi-item"|</div)'

def replacer(match):
    inner = match.group(1)
    return f'<a href="../tonton-materi-user/index.html" class="materi-item" style="text-decoration: none; color: inherit; display: flex;">{inner}</a>'

# Using a simpler string replace since regex with nested divs is hard.
# Actually, since there are no nested divs that break the pattern inside materi-item (wait, materi-info has divs).
# It's better to just string replace the opening and closing tags manually.

content = content.replace('<div class="materi-item" style="cursor: pointer;" onclick="window.location.href=''../tonton-materi-user/index.html''">', '<a href="../tonton-materi-user/index.html" class="materi-item" style="text-decoration: none; color: inherit; display: flex;">')

# Now we need to replace the closing </div> for each materi-item.
# We know the HTML structure: 
#             </a>
#         </div>
#       </div>
# Let's just do it manually with a small state machine or just let it be, but mismatched tags are bad.
