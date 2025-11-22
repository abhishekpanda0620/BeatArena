# Audio File Management Guide

## 📁 Storage Setup

### Laravel Storage Structure
```
backend/
  storage/
    app/
      public/
        songs/
          english/
            shape_of_you.mp3
            blinding_lights.mp3
          hindi/
            kesariya.mp3
            chaleya.mp3
```

### Setup Commands
```bash
# Create storage directory
docker exec beatarena-backend mkdir -p storage/app/public/songs/english
docker exec beatarena-backend mkdir -p storage/app/public/songs/hindi

# Create symbolic link (if not exists)
docker exec beatarena-backend php artisan storage:link
```

### Manual Upload Process
1. **Place audio files** in `backend/storage/app/public/songs/`
2. **Update seeder** with correct file paths
3. **Run seeder**: `php artisan db:seed`

---

## ⚖️ Copyright & Legal Considerations

### 🚨 COPYRIGHT RISKS

Using copyrighted music WITHOUT permission can result in:
- **DMCA Takedown Notices**
- **Legal Action** from record labels
- **Fines** ($750 - $150,000 per song in the US)
- **Account Suspension** on hosting platforms

---

## ✅ LEGAL OPTIONS

### 1. **API Integration (RECOMMENDED)**

#### Spotify API
- ✅ **Legal**: Provides 30-second preview URLs
- ✅ **Free**: No licensing fees
- ✅ **Huge Library**: Millions of songs
- ❌ **Limitation**: Preview URLs expire after 24 hours

**Implementation:**
```php
// SongController.php
public function fetchFromSpotify(Request $request)
{
    $spotify = new SpotifyWebAPI();
    $tracks = $spotify->search('Ed Sheeran', 'track', ['limit' => 10]);
    
    foreach ($tracks->tracks->items as $track) {
        Song::create([
            'title' => $track->name,
            'artist' => $track->artists[0]->name,
            'file_path' => $track->preview_url, // 30-sec preview
            'spotify_id' => $track->id,
        ]);
    }
}
```

#### Other APIs
- **Apple Music**: 30-90 second previews
- **Deezer**: 30-second previews
- **YouTube Music**: Via unofficial APIs (riskier)

---

### 2. **Royalty-Free Music**

Use music from:
- **Free Music Archive** (freemusicarchive.org)
- **Incompetech** (incompetech.com) - Kevin MacLeod
- **Bensound** (bensound.com)
- **YouTube Audio Library**
- **ccMixter** (Creative Commons)

⚠️ **Note**: Not popular commercial songs, but legal and safe.

---

### 3. **Music Licensing Services**

For commercial use:

#### Sync Licensing Platforms
- **Epidemic Sound**: $15-50/month
- **Artlist**: $299/year
- **Soundstripe**: $135-300/year

#### PRO Licensing (For public performance)
- **ASCAP** (American Society of Composers)
- **BMI** (Broadcast Music Inc)
- **SESAC**

Cost: ~$300-2000/year depending on usage

---

### 4. **Fair Use (VERY LIMITED)**

You might qualify for fair use if:
- ✅ Educational/non-profit use
- ✅ Very short clips (5-8 seconds)
- ✅ Transformative purpose
- ❌ **DO NOT rely on this for commercial app**

**Risk**: Still requires legal review, not guaranteed protection.

---

## 🎯 RECOMMENDED APPROACH FOR BEATARENA

### Phase 1 (MVP - Private Testing)
- Use **Spotify API preview URLs**
- Or use **royalty-free music** for testing
- Mark app as "Private Beta - Not for Public Use"

### Phase 2 (Public Launch)
Choose one:

#### Option A: Streaming Integration
- Integrate **Spotify Web Playback SDK**
- Users must have Spotify Premium
- Revenue share model
- 100% legal

#### Option B: Licensing
- License music from:
  - Epidemic Sound (~$50/month)
  - Or negotiate with indie labels
- Use curated playlists

#### Option C: User-Generated Content
- Users upload their own music
- Implement copyright detection (ContentID)
- Remove infringing content
- High moderation cost

---

## 📝 IMPLEMENTATION CHECKLIST

### For Spotify Integration
- [ ] Register app at [Spotify Developer](https://developer.spotify.com)
- [ ] Get Client ID & Secret
- [ ] Install `jwilsson/spotify-web-api-php`
- [ ] Create Spotify service in Laravel
- [ ] Fetch preview URLs dynamically
- [ ] Cache song metadata

### For Royalty-Free
- [ ] Create accounts on Free Music Archive, etc.
- [ ] Download tracks with proper attribution
- [ ] Store in Laravel storage
- [ ] Display attribution in game UI

---

## 🚀 NEXT STEPS

1. **For Testing**: 
   - Use Spotify preview URLs (easiest & legal)
   - Or public domain music

2. **For Launch**: 
   - Get legal advice from entertainment lawyer
   - Choose licensing model
   - Budget for music costs

Would you like me to implement:
- **Spotify API integration** (recommended for MVP)?
- **File upload system** (for royalty-free music)?
- **Both** (hybrid approach)?
