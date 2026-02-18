import os
import json
import random

# Configuration
LIST_FILE = "two_animals_list.txt"
DATA_DIR = "web_application/full_data_two_animals"
OUTPUT_JSON = "web_application/questions.json"
OUTPUT_JS = "web_application/data.js"
WEB_APP_ROOT = "web_application"

def parse_list_file(filepath):
    """Parses the two_animals_list.txt file."""
    data = []
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    # Skip header if present (Image\tObjects)
    start_idx = 0
    if "Image" in lines[0] and "Objects" in lines[0]:
        start_idx = 1
        
    for line in lines[start_idx:]:
        parts = line.strip().split('\t')
        if len(parts) >= 2:
            image_filename = parts[0]
            objects = parts[1].split(', ')
            if len(objects) == 2:
                data.append({
                    "image_id": os.path.splitext(image_filename)[0],
                    "filename": image_filename,
                    "target1": objects[0],
                    "target2": objects[1]
                })
    return data

def find_methods_and_heatmaps(image_id):
    """
    Crawls the directory for an image to find available methods and heatmaps.
    Returns a list of question objects.
    Structure:
    web_application/full_data_two_animals/{image_id}/
        Target_1_{Method}/
            normal.png
            omp.png
            original.png
        Target_2_{Method}/...
        Target_fake_{Method}/...
    """
    image_dir = os.path.join(DATA_DIR, image_id)
    if not os.path.exists(image_dir):
        print(f"Warning: Directory not found for {image_id}: {image_dir}")
        return []

    questions = []
    
    # List all subdirectories (Target_*)
    subdirs = [d for d in os.listdir(image_dir) if os.path.isdir(os.path.join(image_dir, d)) and d.startswith("Target_")]
    
    for subdir in subdirs:
        # Parse Target Type and Method
        # Expected formats: Target_1_MethodName, Target_fake_MethodName
        parts = subdir.split('_')
        
        target_type = "unknown"
        method_name = "unknown"
        
        if len(parts) >= 3:
            # Target_1_Method or Target_fake_Method
            if parts[1] in ["1", "2", "fake"]:
                target_type = f"Target_{parts[1]}"
                method_name = "_".join(parts[2:]) # Handle methods with underscores if any, though usually CamelCase
        
        if target_type == "unknown":
            print(f"Skipping unknown folder format: {subdir}")
            continue

        subdir_path = os.path.join(image_dir, subdir)
        
        # Check for original.png
        original_path = os.path.join(subdir_path, "original.png")
        if not os.path.exists(original_path):
            # Fallback: maybe original is in the root of image_dir? 
            # Based on inspection, it seems to be inside the Target folder.
            # But wait, logic in main.js might expect a specific path.
            # Let's assume it's in the subdirectory as seen in inspection.
            print(f"Warning: original.png not found in {subdir_path}")
            continue

        # Relative paths for web app (relative to web_application/)
        # We need to strip 'web_application/' from the start
        rel_original = os.path.relpath(original_path, WEB_APP_ROOT)
        
        # Check for heatmaps: normal.png and omp.png
        heatmap_files = {
            "normal": "normal.png",
            "omp": "omp.png"
        }
        
        for variant, filename in heatmap_files.items():
            heatmap_path = os.path.join(subdir_path, filename)
            if os.path.exists(heatmap_path):
                rel_heatmap = os.path.relpath(heatmap_path, WEB_APP_ROOT)
                
                # Construct Method Name for UI
                # e.g., "LeGrad" or "LeGrad OMP"
                final_method_name = method_name
                if variant == "omp":
                    final_method_name += " OMP"
                
                questions.append({
                    "image_id": image_id,
                    "target_type": target_type,
                    "method": final_method_name, # "LeGrad" or "LeGrad OMP"
                    "root_method": method_name, # "LeGrad"
                    "variant": variant, # "normal" or "omp"
                    "original_image": rel_original,
                    "heatmap_image": rel_heatmap
                })
                
    return questions

def generate_questions(list_data):
    all_questions = []
    question_counter = 0
    
    for item in list_data:
        image_id = item["image_id"]
        target1 = item["target1"]
        target2 = item["target2"]
        
        methods_data = find_methods_and_heatmaps(image_id)
        
        for q_data in methods_data:
            # Construct the full question object
            
            # Options and Correct Answer
            options = [
                target1,
                target2,
                "None of them"
            ]
            
            correct_index = -1
            correct_name = "Unknown"
            
            if q_data["target_type"] == "Target_1":
                correct_index = 0
                correct_name = target1
            elif q_data["target_type"] == "Target_2":
                correct_index = 1
                correct_name = target2
            elif q_data["target_type"] == "Target_fake":
                correct_index = 2
                correct_name = "None"
            
            question_entry = {
                "id": question_counter,
                "image_id": image_id,
                "original_image": q_data["original_image"],
                "heatmap_image": q_data["heatmap_image"],
                "options": options,
                "correct_index": correct_index,
                "correct_name": correct_name,
                "method": q_data["method"],
                "target_type": q_data["target_type"],
                "heatmap_type": q_data["variant"]
            }
            
            all_questions.append(question_entry)
            question_counter += 1
            
    return all_questions

def save_outputs(questions):
    # Save JSON
    with open(OUTPUT_JSON, 'w') as f:
        json.dump(questions, f, indent=2)
    print(f"Saved {len(questions)} questions to {OUTPUT_JSON}")
    
    # Save JS
    js_content = f"const MANIFEST = {json.dumps(questions, indent=2)};"
    with open(OUTPUT_JS, 'w') as f:
        f.write(js_content)
    print(f"Saved data.js to {OUTPUT_JS}")

def main():
    print(f"Reading list from {LIST_FILE}...")
    list_data = parse_list_file(LIST_FILE)
    print(f"Found {len(list_data)} images in list.")
    
    print("Scanning directories and generating questions...")
    questions = generate_questions(list_data)
    
    if not questions:
        print("No questions generated! Check directory structure.")
        return

    save_outputs(questions)
    print("Done.")

if __name__ == "__main__":
    main()
