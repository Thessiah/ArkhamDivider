"""
Regenerates the Custom Index 2 spirit icons from the source art in raw/,
using the crop centers defined in crop-config.json.

Usage:
    python3 scripts/custom-index-2-icons/crop.py

Edit crop-config.json (x/y = crop center as a fraction of width/height,
cropFrac = how much of the height to keep as the square crop side) and
re-run this script to update the icons used by the app.

Requires Pillow: pip3 install pillow
"""

import json
import os
from PIL import Image

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
RAW_DIR = os.path.join(SCRIPT_DIR, "raw")
CONFIG_PATH = os.path.join(SCRIPT_DIR, "crop-config.json")
OUT_DIR = os.path.join(
    SCRIPT_DIR, "..", "..", "public", "images", "divider", "icons", "custom-index-2"
)

with open(CONFIG_PATH, "r", encoding="utf-8") as f:
    config = json.load(f)

default_crop_frac = config["cropFrac"]
icons = config["icons"]

os.makedirs(OUT_DIR, exist_ok=True)

missing = []
for slug, settings in icons.items():
    raw_path = os.path.join(RAW_DIR, f"{slug}.png")
    if not os.path.exists(raw_path):
        missing.append(slug)
        continue

    x_frac = settings["x"]
    y_frac = settings["y"]
    crop_frac = settings.get("cropFrac", default_crop_frac)

    img = Image.open(raw_path)
    w, h = img.size

    side = int(h * crop_frac)
    cx = int(w * x_frac)
    cy = int(h * y_frac)

    raw_left = cx - side // 2
    raw_top = cy - side // 2
    left = max(0, min(raw_left, w - side))
    top = max(0, min(raw_top, h - side))

    cropped = img.crop((left, top, left + side, top + side))
    out_path = os.path.join(OUT_DIR, f"{slug}.png")
    cropped.save(out_path)

    # Flag when x/y had no effect because the crop is pinned to an edge —
    # every value in the clamped range produces an identical result, which
    # otherwise looks like the crop is "stuck"/unresponsive to tuning.
    clamp_notes = []
    if raw_left != left:
        edge = "left" if left == 0 else "right"
        threshold = (side / 2) / w if edge == "left" else 1 - (side / 2) / w
        clamp_notes.append(
            f"x clamped to {edge} edge (any x {'<=' if edge == 'left' else '>='} {threshold:.3f} is identical)"
        )
    if raw_top != top:
        edge = "top" if top == 0 else "bottom"
        threshold = (side / 2) / h if edge == "top" else 1 - (side / 2) / h
        clamp_notes.append(
            f"y clamped to {edge} edge (any y {'<=' if edge == 'top' else '>='} {threshold:.3f} is identical)"
        )
    suffix = f"  [{'; '.join(clamp_notes)}]" if clamp_notes else ""

    print(f"{slug}: x={x_frac} y={y_frac} cropFrac={crop_frac} -> {side}x{side}{suffix}")

if missing:
    print(f"\nWARNING: no raw source image for: {', '.join(missing)}")

print(f"\nWrote {len(icons) - len(missing)} icon(s) to {os.path.relpath(OUT_DIR, SCRIPT_DIR)}")
