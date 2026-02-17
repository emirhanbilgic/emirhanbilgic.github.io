import sqlite3
from flask import Flask, request, jsonify, send_from_directory
import os
import datetime

app = Flask(__name__, static_folder='.', static_url_path='')
DB_FILE = 'experiment_data.db'

def init_db():
    """Initialize the database tables."""
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        
        # Users Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                age TEXT,
                gender TEXT,
                education TEXT,
                country TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Responses Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS responses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                question_id INTEGER,
                image_id TEXT,
                method TEXT,
                target_type TEXT,
                heatmap_type TEXT,
                answer_index INTEGER,
                is_correct BOOLEAN,
                clarity_score INTEGER,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        ''')
        # Method Stats Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS method_stats (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                method TEXT,
                accuracy REAL,
                avg_clarity REAL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        ''')
        conn.commit()
        print("Database initialized.")

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/api/submit_results', methods=['POST'])
def submit_results():
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    try:
        demographics = data.get('demographics', {})
        responses = data.get('responses', [])
        stats = data.get('stats', []) # List of {method, accuracy, avgClarity}
        
        with sqlite3.connect(DB_FILE) as conn:
            cursor = conn.cursor()
            
            # Insert User
            cursor.execute('''
                INSERT INTO users (age, gender, education, country)
                VALUES (?, ?, ?, ?)
            ''', (
                demographics.get('age'),
                demographics.get('gender'),
                demographics.get('education'),
                demographics.get('country')
            ))
            
            user_id = cursor.lastrowid
            
            # Insert Responses
            for resp in responses:
                cursor.execute('''
                    INSERT INTO responses (
                        user_id, question_id, image_id, method, 
                        target_type, heatmap_type, answer_index, 
                        is_correct, clarity_score
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    user_id,
                    resp.get('questionId'),
                    resp.get('imageId'),
                    resp.get('method'),
                    resp.get('targetType'),
                    resp.get('heatmapType'),
                    resp.get('answer'),
                    resp.get('isCorrect'),
                    resp.get('clarityScore')
                ))

            # Insert Method Stats
            for s in stats:
                cursor.execute('''
                    INSERT INTO method_stats (
                        user_id, method, accuracy, avg_clarity
                    ) VALUES (?, ?, ?, ?)
                ''', (
                    user_id,
                    s.get('method'),
                    s.get('accuracy'),
                    s.get('avgClarity')
                ))
            
            conn.commit()
            
        return jsonify({'status': 'success', 'user_id': user_id}), 200
        
    except Exception as e:
        print(f"Error saving data: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    init_db()
    print("Starting server at http://localhost:5000")
    app.run(port=5000, debug=True)
