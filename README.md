![BareBits](/assets/images/logos/CAT_ICON/BareBits_Cat_Icon_GLD_A.png)
***
# BareBits
**BareBits is a Bitcoin Lightning Network Payment Solution company focused on providing fast, safe, and secure payment solutions for all types of businesses and industries.**

## Hero video on GitHub Pages

The launch video is stored with Git LFS and is over 100MB, so GitHub Pages cannot serve it (Pages serves LFS pointer files, not the real binary). The site loads the video from **GitHub Releases** instead:

1. Create a new [Release](https://github.com/superfishal/btc4all/releases/new) (e.g. tag `v1.0`).
2. Attach `assets/videos/Bare_Bits_Launch_MASTER_V1_MIX_3.mp4` as a release asset.
3. The URL in `index.html` is set to  
   `https://github.com/superfishal/btc4all/releases/download/v1.0/Bare_Bits_Launch_MASTER_V1_MIX_3.mp4`.  
   If you use a different tag or filename, update the `data-video-src` on the video section in `index.html`.
