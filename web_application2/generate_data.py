import os
import json

base_dir = "/Users/emirhan/Desktop/emirhanbilgic.github.io-1/web_application2/aistudy_data"
originals_dir = os.path.join(base_dir, "originals")

basenames = []
for filename in os.listdir(originals_dir):
    if filename.endswith("_orig.jpg"):
        basename = filename.replace("_orig.jpg", "")
        basenames.append(basename)

basenames.sort()

output_path = "/Users/emirhan/Desktop/emirhanbilgic.github.io-1/web_application2/data.js"
with open(output_path, "w") as f:
    f.write("const IMAGE_BASENAMES = " + json.dumps(basenames, indent=2) + ";\n")

print(f"Generated data.js with {len(basenames)} images.")
