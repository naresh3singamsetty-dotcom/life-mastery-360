from pathlib import Path
from docx import Document
import sys
path = Path('SRS.docx')
if not path.exists():
    print('MISSING_FILE')
    sys.exit(1)
try:
    doc = Document(path)
except Exception as e:
    print('ERROR', e)
    sys.exit(1)
for i, para in enumerate(doc.paragraphs, 1):
    text = para.text.strip()
    if text:
        print(f'{i}: {text}')
