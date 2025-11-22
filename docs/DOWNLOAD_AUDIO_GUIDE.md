# How to Download Audio from Zedge

## ⚠️ Important Copyright Notice
**These files are for TESTING ONLY. Remove before public launch!**

## 📥 Download Instructions

### Method 1: Using Browser (Recommended)

1. **Open Zedge in your browser**
   - Go to: https://www.zedge.net/find/ringtones/hindi
   - Or search for specific songs

2. **Find and Download Ringtones**
   - Click on a ringtone you like
   - Click the **"Download"** button
   - File will be saved to your `~/Downloads/` folder

3. **Rename and Move Files**
   ```bash
   # Rename to a simple name (lowercase, underscores)
   mv ~/Downloads/kesariya-ringtone-xyz123.mp3 ~/Downloads/kesariya.mp3
   
   # Copy to BeatArena
   cp ~/Downloads/kesariya.mp3 ~/personal/BeatArena/backend/storage/app/public/songs/hindi/
   ```

4. **Repeat for 5-10 songs**
   - Get a mix of Hindi and English songs
   - Keep file sizes small (< 1MB each)
   - Use recognizable song names

### Method 2: Using wget (Advanced)

```bash
# If you have direct download URL
wget "https://zedge.net/download/ringtone/abc123" -O backend/storage/app/public/songs/hindi/kesariya.mp3
```

## 🎵 Recommended Songs to Download

### Hindi Songs (Zedge)
- Kesariya (Brahmastra)
- Chaleya (Jawan)
- Apna Bana Le (Bhediya)
- Deva Deva (Brahmastra)
- Kahani Suno 2.0 (Kahaani)

### English Songs (Zedge)
- Shape of You (Ed Sheeran)
- Blinding Lights (The Weeknd)
- Levitating (Dua Lipa)
- Stay (Justin Bieber)
- Heat Waves (Glass Animals)

## 📋 Quick Checklist

After downloading:
- [ ] Files are in MP3 format
- [ ] File names are lowercase with underscores
- [ ] Files are < 1MB each
- [ ] Files are 5-30 seconds long
- [ ] Files are copied to `backend/storage/app/public/songs/hindi/` or `/english/`
- [ ] `.gitignore` includes `*.mp3` (already done!)

## 🔧 Verify Files

```bash
# List uploaded files
ls -lh backend/storage/app/public/songs/hindi/
ls -lh backend/storage/app/public/songs/english/

# Check if accessible via Docker
docker exec beatarena-backend ls -lh storage/app/public/songs/hindi/
```

## ⚡ Next Steps

After downloading files:

1. **Update the seeder** with actual filenames
   - Edit `backend/database/seeders/SongSeeder.php`
   - Match file_path to your actual files

2. **Run the seeder**
   ```bash
   docker exec beatarena-backend php artisan db:seed --class=SongSeeder
   ```

3. **Test in the app**
   - Go to http://localhost:3030
   - Click "Play Solo"
   - Audio should play!
