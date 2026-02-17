import os
import json
import random
import time

# Configuration
WEB_APP_DIR = 'web_application'
DATA_DIR_NAME = 'heatmaps_data'
LIST_FILE = os.path.join(WEB_APP_DIR, 'list_final.tex')
DATA_DIR = os.path.join(WEB_APP_DIR, DATA_DIR_NAME)
OUTPUT_FILE = os.path.join(WEB_APP_DIR, 'data.js')

METHODS = ['CheferCAM', 'AttentionCAM', 'DAAM', 'GradCAM', 'LeGrad']
TARGET_TYPES = ['Target_1', 'Target_2', 'Target_fake']

def parse_list_file(filepath):
    """Parses list_final.tex to get image_id -> objects mapping."""
    image_data = {}
    try:
        with open(filepath, 'r') as f:
            lines = f.readlines()
            # Skip header
            for line in lines[1:]:
                parts = line.strip().split('\t')
                if len(parts) >= 2:
                    image_file = parts[0]
                    objects_str = parts[1]
                    image_id = image_file.replace('.jpg', '')
                    objects = [obj.strip() for obj in objects_str.split(',')]
                    image_data[image_id] = objects
        return image_data
    except Exception as e:
        print(f"Error parsing list file: {e}")
        return {}

def get_target_for_fake(heatmap_path, search_dir):
    """
    Finds the target name for a Fake heatmap by matching modification time 
    with target_*.txt files in the same directory.
    """
    try:
        heatmap_mtime = os.path.getmtime(heatmap_path)
        # Allow a small time window for file creation differences
        tolerance = 2.0 
        
        candidates = []
        for f in os.listdir(search_dir):
            if f.startswith('target_') and f.endswith('.txt'):
                txt_path = os.path.join(search_dir, f)
                txt_mtime = os.path.getmtime(txt_path)
                if abs(heatmap_mtime - txt_mtime) < tolerance:
                    candidates.append(f)
        
        if candidates:
            # If multiple, take the first one (timestamp might be identical for batch)
            # In the user's case, we saw identical timestamps. 
            # We'll read the content of the matched file.
            best_candidate = candidates[0]
            with open(os.path.join(search_dir, best_candidate), 'r') as f:
                return f.read().strip()
                
    except Exception as e:
        print(f"Error getting fake target: {e}")
    
    return "Unknown"

def generate_manifest():
    image_objects_map = parse_list_file(LIST_FILE)
    manifest = []
    
    if not os.path.exists(DATA_DIR):
        print(f"Error: Data directory not found at {DATA_DIR}")
        return

    # Iterate over all images in the map
    sorted_image_ids = sorted(image_objects_map.keys())
    
    id_counter = 0
    
    for image_id in sorted_image_ids:
        objects = image_objects_map[image_id]
        if len(objects) < 2:
            print(f"Warning: Image {image_id} has fewer than 2 objects, skipping.")
            continue
            
        obj1 = objects[0]
        obj2 = objects[1]
        
        image_dir = os.path.join(DATA_DIR, image_id)
        if not os.path.exists(image_dir):
            continue
            
        # We expect validation of existence before adding
        
        for method in METHODS:
            for target_type_base in TARGET_TYPES:
                # Construct directory name like "Target_1_CheferCAM"
                dir_name = f"{target_type_base}_{method}"
                method_dir = os.path.join(image_dir, dir_name)
                
                if not os.path.exists(method_dir):
                   # print(f"Missing directory: {method_dir}")
                    continue
                
                # Check for images
                normal_path = os.path.join(method_dir, 'normal.png')
                omp_path = os.path.join(method_dir, 'omp.png')
                original_path = os.path.join(method_dir, 'original.png')
                
                # Verify existence of required files
                if not (os.path.exists(normal_path) and os.path.exists(omp_path) and os.path.exists(original_path)):
                    continue
                
                # Determine Correct Answer and Target Name
                if target_type_base == 'Target_1':
                    correct_index = 0
                    correct_name = obj1
                    target_name_derived = obj1 # For verification
                elif target_type_base == 'Target_2':
                    correct_index = 1
                    correct_name = obj2
                    target_name_derived = obj2
                else: # Target_fake
                    correct_index = 2
                    correct_name = "None of them"
                    # Try to find which "fake" target this was for metadata
                    target_name_derived = get_target_for_fake(normal_path, method_dir)

                options = [obj1, obj2, "None of them"]
                
                # Create Normal Entry
                entry_normal = {
                    "id": id_counter,
                    "image_id": image_id,
                    "method": method, # e.g. "CheferCAM"
                    "target_type": target_type_base, # "Target_1"
                    "heatmap_type": "normal",
                    "original_image": f"{DATA_DIR_NAME}/{image_id}/{dir_name}/original.png",
                    "heatmap_image": f"{DATA_DIR_NAME}/{image_id}/{dir_name}/normal.png",
                    "options": options,
                    "correct_index": correct_index,
                    "correct_name": correct_name,
                    "target_name_metadata": target_name_derived
                }
                manifest.append(entry_normal)
                id_counter += 1
                
                # Create OMP Entry
                entry_omp = {
                    "id": id_counter,
                    "image_id": image_id,
                    "method": f"{method} OMP", # e.g. "CheferCAM OMP"
                    "target_type": target_type_base,
                    "heatmap_type": "omp",
                    "original_image": f"{DATA_DIR_NAME}/{image_id}/{dir_name}/original.png",
                    "heatmap_image": f"{DATA_DIR_NAME}/{image_id}/{dir_name}/omp.png",
                    "options": options,
                    "correct_index": correct_index,
                    "correct_name": correct_name,
                    "target_name_metadata": target_name_derived
                }
                manifest.append(entry_omp)
                id_counter += 1

    # Save to JS File
    with open(OUTPUT_FILE, 'w') as f:
        f.write("const MANIFEST = ")
        json.dump(manifest, f, indent=2)
        f.write(";")
    
    print(f"Generated manifest with {len(manifest)} entries at {OUTPUT_FILE}")

if __name__ == "__main__":
    generate_manifest()
