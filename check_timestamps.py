import os
import time

path = '/Users/emirhan/Desktop/heatmaps_data/2007_001594/Target_fake_DAAM'
files = os.listdir(path)

for f in files:
    full_path = os.path.join(path, f)
    mtime = os.path.getmtime(full_path)
    print(f"{f}: {time.ctime(mtime)}")
