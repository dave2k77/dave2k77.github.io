"""Render compiled LaTeX CVs for visual review (requires PyMuPDF)."""
from pathlib import Path
import sys

deps = Path('tmp/pdf-deps')
if deps.exists():
    sys.path.insert(0, str(deps.resolve()))
import pymupdf

out = Path('tmp/pdf-review')
out.mkdir(parents=True, exist_ok=True)
for path in Path('public/cv').glob('*.pdf'):
    document = pymupdf.open(path)
    print(f'{path.name}: {len(document)} pages')
    for index, page in enumerate(document):
        page.get_pixmap(matrix=pymupdf.Matrix(1.3, 1.3)).save(out / f'{path.stem}-{index + 1}.png')
