#!/bin/bash

# Asset Optimization Script for Arca Gidan
# This script optimizes videos and images while maintaining quality

set -e

echo "🎬 Starting asset optimization..."
echo ""

# Check if required tools are installed
command -v ffmpeg >/dev/null 2>&1 || { echo "❌ ffmpeg is required but not installed. Install with: brew install ffmpeg"; exit 1; }
command -v cwebp >/dev/null 2>&1 || { echo "❌ cwebp is required but not installed. Install with: brew install webp"; exit 1; }
command -v jpegoptim >/dev/null 2>&1 || { echo "⚠️  jpegoptim not found. Install with: brew install jpegoptim"; }

cd public

# Create backup directory
BACKUP_DIR="originals_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📦 Backing up originals to $BACKUP_DIR/"
echo ""

# ============================================
# 1. CRITICAL: Optimize toblorone.png
# ============================================
echo "🖼️  Optimizing toblorone.png (2.5MB -> ~150KB)..."
if [ -f "toblorone.png" ]; then
    cp toblorone.png "$BACKUP_DIR/"
    cwebp -q 85 toblorone.png -o toblorone_temp.webp
    # Keep PNG but highly compressed
    ffmpeg -i toblorone.png -vf "scale=1024:1024" -q:v 2 toblorone_optimized.png -y 2>/dev/null
    mv toblorone_optimized.png toblorone.png
    echo "   ✓ Done: $(ls -lh toblorone.png | awk '{print $5}')"
else
    echo "   ⚠️  File not found"
fi
echo ""

# ============================================
# 2. CRITICAL: Optimize trailer video
# ============================================
echo "🎬 Optimizing trailer video (46MB -> ~25-30MB)..."
if [ -f "1013_1-copy1_audio_plus0175.mp4" ]; then
    cp 1013_1-copy1_audio_plus0175.mp4 "$BACKUP_DIR/"
    ffmpeg -i 1013_1-copy1_audio_plus0175.mp4 \
        -c:v libx264 -crf 28 -preset medium \
        -vf "scale=1080:1080" \
        -c:a aac -b:a 128k \
        -movflags +faststart \
        1013_1-copy1_audio_plus0175_temp.mp4 -y 2>/dev/null
    mv 1013_1-copy1_audio_plus0175_temp.mp4 1013_1-copy1_audio_plus0175.mp4
    echo "   ✓ Done: $(ls -lh 1013_1-copy1_audio_plus0175.mp4 | awk '{print $5}')"
else
    echo "   ⚠️  File not found"
fi
echo ""

# ============================================
# 3. Optimize hero videos (high priority)
# ============================================
echo "🎬 Optimizing hero videos..."
HERO_VIDEOS=("10217.mp4" "10219.mp4" "102110.mp4" "102111.mp4")
for video in "${HERO_VIDEOS[@]}"; do
    if [ -f "$video" ]; then
        echo "   Processing $video..."
        cp "$video" "$BACKUP_DIR/"
        ffmpeg -i "$video" \
            -c:v libx264 -crf 26 -preset medium \
            -vf "scale=1080:1920" \
            -movflags +faststart \
            -an \
            "${video%.mp4}_temp.mp4" -y 2>/dev/null
        mv "${video%.mp4}_temp.mp4" "$video"
        echo "   ✓ Done: $(ls -lh $video | awk '{print $5}')"
    fi
done
echo ""

# ============================================
# 4. Optimize theme videos
# ============================================
echo "🎬 Optimizing theme videos..."
THEME_VIDEOS=("2085.mp4" "fernweh.mp4" "way-i-see-it.mp4")
for video in "${THEME_VIDEOS[@]}"; do
    if [ -f "$video" ]; then
        echo "   Processing $video..."
        cp "$video" "$BACKUP_DIR/"
        ffmpeg -i "$video" \
            -c:v libx264 -crf 27 -preset medium \
            -vf "scale=1080:1080" \
            -movflags +faststart \
            -an \
            "${video%.mp4}_temp.mp4" -y 2>/dev/null
        mv "${video%.mp4}_temp.mp4" "$video"
        echo "   ✓ Done: $(ls -lh $video | awk '{print $5}')"
    fi
done
echo ""

# ============================================
# 5. Optimize poster images
# ============================================
echo "🖼️  Optimizing poster images..."
POSTERS=("102110-poster.jpg" "102111-poster.jpg" "10217-poster.jpg" "10219-poster.jpg" "2085-poster.jpg" "fernweh-poster.jpg" "way-i-see-it-poster.jpg")
for poster in "${POSTERS[@]}"; do
    if [ -f "$poster" ]; then
        echo "   Processing $poster..."
        cp "$poster" "$BACKUP_DIR/"
        if command -v jpegoptim >/dev/null 2>&1; then
            jpegoptim --size=200k --strip-all "$poster" 2>/dev/null || true
        else
            ffmpeg -i "$poster" -q:v 5 "${poster%.jpg}_temp.jpg" -y 2>/dev/null
            mv "${poster%.jpg}_temp.jpg" "$poster"
        fi
        echo "   ✓ Done: $(ls -lh $poster | awk '{print $5}')"
    fi
done
echo ""

# ============================================
# Summary
# ============================================
echo "✨ Optimization complete!"
echo ""
echo "📊 Summary:"
echo "   Originals backed up to: public/$BACKUP_DIR/"
echo ""
echo "💾 Total size comparison:"
du -sh "$BACKUP_DIR" | awk '{print "   Before: " $1}'
du -sh *.mp4 *.jpg *.png *.webp 2>/dev/null | awk '{sum+=$1} END {print "   After: " sum/1024 " MB (estimate)"}'
echo ""
echo "✅ Done! Test the site to ensure quality is acceptable."
echo "   If you need to restore: mv public/$BACKUP_DIR/* public/"

