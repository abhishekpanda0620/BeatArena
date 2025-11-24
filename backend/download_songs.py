import json
import os
import subprocess
import sys

# Configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SONGS_JSON_PATH = os.path.join(BASE_DIR, 'database', 'data', 'songs.json')
STORAGE_DIR = os.path.join(BASE_DIR, 'storage', 'app', 'public')

def load_songs():
    with open(SONGS_JSON_PATH, 'r') as f:
        return json.load(f)

def download_song(song):
    file_path = os.path.join(STORAGE_DIR, song['file_path'])
    directory = os.path.dirname(file_path)
    
    if not os.path.exists(directory):
        os.makedirs(directory)
        
    if os.path.exists(file_path):
        print(f"✅ {song['title']} already exists.")
        return

    print(f"⬇️ Downloading {song['title']}...")
    
    # Construct yt-dlp command
    # -x: Extract audio
    # --audio-format mp3: Convert to mp3
    # -o: Output template
    cmd = [
        'yt-dlp',
        '-x',
        '--audio-format', 'mp3',
        '-o', file_path.replace('.mp3', ''), # yt-dlp adds extension automatically
        f"ytsearch1:{song['search_query']}"
    ]
    
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
        print(f"✅ Downloaded {song['title']}")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to download {song['title']}: {e.stderr.decode()}")

def main():
    print("🎵 Starting Song Download...")
    
    if not os.path.exists(SONGS_JSON_PATH):
        print(f"❌ Error: {SONGS_JSON_PATH} not found.")
        sys.exit(1)
        
    songs = load_songs()
    
    for song in songs:
        download_song(song)
        
    print("🎉 All downloads processed!")

if __name__ == "__main__":
    main()
