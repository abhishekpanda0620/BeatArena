# Manual Audio Upload Guide

## 📁 Directory Structure

Files should be placed in:
```
backend/storage/app/public/songs/
├── hindi/
│   ├── kesariya.mp3
│   ├── chaleya.mp3
│   └── apna_bana_le.mp3
└── english/
    ├── shape_of_you.mp3
    ├── blinding_lights.mp3
    └── levitating.mp3
```

## 🎵 How to Add Audio Files

### Option 1: Using yt-dlp (Recommended for Testing)

**Install yt-dlp:**
```bash
pip3 install -U yt-dlp
```

**Download 10-second audio clips from YouTube:**

```bash
# Hindi Songs
yt-dlp --extractor-args "youtube:player_client=web" \
  -x --audio-format mp3 \
  --postprocessor-args "ffmpeg:-ss 00:01:00 -to 00:01:10" \
  "https://www.youtube.com/watch?v=VIDEO_ID" \
  -o "backend/storage/app/public/songs/hindi/kesariya.%(ext)s" \
  --no-playlist

# English Songs  
yt-dlp --extractor-args "youtube:player_client=web" \
  -x --audio-format mp3 \
  --postprocessor-args "ffmpeg:-ss 00:00:30 -to 00:00:40" \
  "https://www.youtube.com/watch?v=VIDEO_ID" \
  -o "backend/storage/app/public/songs/english/shape_of_you.%(ext)s" \
  --no-playlist
```

**Explanation:**
- `--extractor-args "youtube:player_client=web"`: Bypass JS requirement
- `-x`: Extract audio only
- `--audio-format mp3`: Convert to MP3
- `--postprocessor-args "ffmpeg:-ss XX -to YY"`: Extract 10-second clip
  - `-ss 00:01:00`: Start at 1 minute
  - `-to 00:01:10`: End at 1 minute 10 seconds
- `-o "path/file.%(ext)s"`: Output location
- `--no-playlist`: Download single video only

**Find YouTube Video IDs:**
1. Go to YouTube and search for the song
2. Copy the URL (e.g., `https://www.youtube.com/watch?v=ABC123`)
3. The part after `v=` is the video ID

### Option 2: Manual Download from Free Sites
- MP3 format
- 128-320 kbps
- 5-30 seconds duration
- File size: < 1MB per file

### Step 2: Copy Files Directly on Your Local Machine

**✅ Thanks to bind mounts, you can simply copy files locally!**

```bash
# Just copy files to your local backend/storage folder
cp /path/to/your/kesariya.mp3 backend/storage/app/public/songs/hindi/
cp /path/to/your/chaleya.mp3 backend/storage/app/public/songs/hindi/
cp /path/to/your/shape_of_you.mp3 backend/storage/app/public/songs/english/
```

**The files will immediately be available inside the Docker container** - no need for `docker cp`!

Your `docker-compose.yml` already has this bind mount:
```yaml
volumes:
  - ./backend:/var/www  # ← Local backend/ syncs with container
```

### Step 3: Update Song Seeder

Edit `backend/database/seeders/SongSeeder.php` with actual file names:

```php
[
    'title' => 'Kesariya',
    'artist' => 'Arijit Singh',
    'file_path' => 'songs/hindi/kesariya.mp3',  // ← Update this
    'language' => 'hi',
    'difficulty' => 'easy',
    'options' => ['Kesariya', 'Apna Bana Le', 'Deva Deva', 'Rasiya'],
    'correct_option' => 'Kesariya'
],
```

### Step 4: Run Seeder

```bash
docker exec beatarena-backend php artisan db:seed --class=SongSeeder
```

### Step 5: Verify Files are Accessible

Test if files are accessible:
```bash
curl -I http://localhost:8787/storage/songs/hindi/kesariya.mp3
```

Should return `200 OK`

## 🎮 Testing in the App

Once files are added and seeded:

1. Go to `http://localhost:3030`
2. Click "Play Solo"
3. The audio should play automatically

## ⚠️ Important Notes

### File Naming
- Use lowercase
- Replace spaces with underscores
- Avoid special characters
- Example: `apna_bana_le.mp3` not `Apna Bana Le!.mp3`

### File Permissions
If files aren't accessible:
```bash
docker exec beatarena-backend chmod -R 755 storage/app/public/songs/
```

### Copyright Warning
**Zedge ringtones:**
- ❌ NOT for production/commercial use
- ✅ OK for private testing only
- ⚠️ Remove before public launch
- 🔒 Could receive DMCA takedown if public

### Legal Alternatives
For production:
- Use royalty-free music
- License from Epidemic Sound ($15-50/month)
- Or use text-based quiz instead of audio

## 📋 Quick Reference

```bash
# List uploaded files
docker exec beatarena-backend ls -lh storage/app/public/songs/hindi/

# Check storage link
docker exec beatarena-backend ls -la public/storage

# Re-seed database
docker exec beatarena-backend php artisan migrate:fresh --seed

# Test audio URL
curl -I http://localhost:8787/storage/songs/hindi/YOUR_FILE.mp3
```
