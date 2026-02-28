// ===== UTILITY: Debounce =====
function debounce(fn, ms = 100) {
    let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

// ===== BACK TO TOP =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }

    const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const r = Math.round(124 + (233 - 124) * scrollProgress);
    const g = Math.round(58  + (129 - 58)  * scrollProgress);
    const b = Math.round(237 + (17  - 237) * scrollProgress);
    backToTopBtn.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';

    const navBottom = mainNav.offsetTop + mainNav.offsetHeight;
    if (window.scrollY > navBottom) {
        stickyNav.classList.add('visible');
    } else {
        stickyNav.classList.remove('visible');
    }
}, 16));

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== UTILITY: YouTube ID extractor =====
function getYouTubeID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// ===== UTILITY: Create watermark wrapper =====
function createWatermarkWrapper(el) {
    const wrapper = document.createElement('div');
    wrapper.className = 'artwork-img-wrapper';
    wrapper.appendChild(el);
    return wrapper;
}

// ===== INTERSECTION OBSERVER for lazy video play =====
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const vid = entry.target;
        if (entry.isIntersecting) {
            vid.play().catch(() => {});
        } else {
            vid.pause();
            vid.currentTime = 0;
        }
    });
}, { threshold: 0.1 });

// ===== TAB SWITCHING =====
function showIllusTab(tabName) {
    const section = document.querySelector('.work-section');
    section.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    section.querySelectorAll('.illus-tab').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    section.querySelectorAll('.illus-tab').forEach(btn => {
        if (btn.getAttribute('onclick').includes(tabName)) btn.classList.add('active');
    });
    setTimeout(positionMoonAndSides, 60);
}

function showAnimTab(tabName) {
    const section = document.querySelector('.animations-section');
    section.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    section.querySelectorAll('.anim-tab').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    section.querySelectorAll('.anim-tab').forEach(btn => {
        if (btn.getAttribute('onclick').includes(tabName)) btn.classList.add('active');
    });
    // When switching to gallery, re-trigger observer for visible videos
    if (tabName === 'anim-gallery') {
        setTimeout(() => {
            document.querySelectorAll('#animGalleryGrid video').forEach(v => {
                videoObserver.observe(v);
            });
        }, 100);
    }
    setTimeout(positionMoonAndSides, 60);
}

function showAboutTab(tabName) {
    const section = document.querySelector('.about-section');
    section.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    section.querySelectorAll('.about-tab').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    section.querySelectorAll('.about-tab').forEach(btn => {
        if (btn.getAttribute('onclick').includes(tabName)) btn.classList.add('active');
    });
    setTimeout(positionMoonAndSides, 60);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== ILLUSTRATIONS =====
const images = [
    { src: 'imgs/illustration1.png', title: 'Enchanted Forest' },
    { src: 'imgs/illustration2.png', title: 'Dragon Frog' },
    { src: 'imgs/illustration3.png', title: 'Sky Islands' },
    { src: 'imgs/illustration4.png', title: 'Starfield' },
    { src: 'imgs/illustration5.png', title: 'Deep Sea' },
    { src: 'imgs/illustration6.png', title: 'Dragon Night' },
    { src: 'imgs/illustration7.png', title: 'Forest Scare' },
    { src: 'imgs/illustration8.png', title: 'Dragon Night' },
    { src: 'imgs/illustration9.png', title: 'Unicorn Dream' }
];
let currentImageIndex = 0;

// Preload adjacent images for faster navigation
function preloadAdjacentImages() {
    const nextIdx = (currentImageIndex + 1) % images.length;
    const prevIdx = (currentImageIndex - 1 + images.length) % images.length;
    [nextIdx, prevIdx].forEach(idx => {
        const preload = new Image();
        preload.src = images[idx].src;
    });
}

function updateShowcase() {
    const display = document.querySelector('.illustration-display');
    let inner = display.querySelector('.illus-inner');
    if (!inner) {
        inner = document.createElement('div');
        inner.className = 'illus-inner';
        display.appendChild(inner);
    }
    const imageSrc = images[currentImageIndex].src;
    const img = new Image();
    img.onload = function() {
        inner.innerHTML = '';
        const imgEl = document.createElement('img');
        imgEl.src = imageSrc;
        imgEl.alt = images[currentImageIndex].title;
        imgEl.style.cssText = 'display:block;max-width:100%;max-height:100%;';
        inner.appendChild(imgEl);
        preloadAdjacentImages();
    };
    img.src = imageSrc;
}

function nextImage() { currentImageIndex = (currentImageIndex + 1) % images.length; updateShowcase(); }
function previousImage() { currentImageIndex = (currentImageIndex - 1 + images.length) % images.length; updateShowcase(); }

function populateGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    // Use a document fragment for better performance
    const fragment = document.createDocumentFragment();
    images.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        const imgEl = document.createElement('img');
        imgEl.src = img.src;
        imgEl.alt = img.title;
        imgEl.loading = 'lazy'; // lazy load all gallery images
        imgEl.decoding = 'async';
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        const span = document.createElement('span');
        span.textContent = img.title;
        overlay.appendChild(span);
        item.appendChild(imgEl);
        item.appendChild(overlay);
        item.addEventListener('click', () => { currentImageIndex = index; updateShowcase(); showIllusTab('closeup'); });
        fragment.appendChild(item);
    });
    galleryGrid.appendChild(fragment);
}

// ===== SWIPE SUPPORT =====
function addSwipeSupport(container, onSwipeLeft, onSwipeRight) {
    let startX = 0, startY = 0;
    container.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].screenX;
        startY = e.changedTouches[0].screenY;
    }, { passive: true });
    container.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].screenX - startX;
        const dy = e.changedTouches[0].screenY - startY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            if (dx < 0) onSwipeLeft(); else onSwipeRight();
        }
    }, { passive: true });
}

// ===== ANIMATIONS =====
const animationCategories = [
    { section: 'Locomotion', videos: [
        { src: 'vids/GirlWalkCycle.gif', title: 'Girl Walk Cycle', thumbnail: 'vids/GirlWalkCycle.gif' },
        { src: 'vids/StoneLionRunCycle.gif', title: 'Stone Lion Run Cycle', thumbnail: 'vids/StoneLionRunCycle.gif' },
        { src: 'vids/SneakyWalkCycle.mp4', title: 'Sneaky Walk Cycle', thumbnail: 'vids/SneakyWalkCycle.mp4' },
        { src: 'vids/walk4leggedfoxfixed (1).gif', title: 'Walk Fox Fixed', thumbnail: 'vids/walk4leggedfoxfixed (1).gif' },
    ]},
    { section: 'Motion Graphics', videos: [
        { src: 'vids/icebreaker.mp4', title: 'Icebreaker', thumbnail: 'vids/icebreaker.mp4' },
        { src: 'vids/rig.mp4', title: 'Rig', thumbnail: 'vids/rig.mp4' },
        { src: 'vids/lyrics.mp4', title: 'Lyrics', thumbnail: 'vids/lyrics.mp4' },
        { src: 'vids/Tiger-final.mp4', title: 'Tiger Final', thumbnail: 'vids/Tiger-final.mp4' },
    ]},
    { section: 'Character Acting', videos: [
        { src: 'vids/hair.mp4', title: 'Hair', thumbnail: 'vids/hair.mp4' },
        { src: 'vids/wave.mp4', title: 'Wave', thumbnail: 'vids/wave.mp4' },
        { src: 'vids/props.mp4', title: 'Props', thumbnail: 'vids/props.mp4' },
        { src: 'vids/ScaryEncounter.mp4', title: 'Scary Encounter', thumbnail: 'vids/ScaryEncounter.mp4' },
        { src: 'vids/dance.mp4', title: 'dance', thumbnail: 'vids/dance.mp4' },
    ]},
    { section: 'Stop Motion', videos: [
        { src: 'vids/stopmotion-cat.mp4', title: '1 Cat', thumbnail: 'vids/stopmotion-cat.mp4' },
        { src: 'vids/stopmotion-intro1.mp4', title: 'intro', thumbnail: 'vids/stopmotion-intro1.mp4' },
        { src: 'vids/charcoal.mp4', title: 'charcoal', thumbnail: 'vids/charcoal.mp4' },
    ]},
    // { section: 'Storyboarding', videos: [
    //     { src: 'vids/storyboard1.mp4', title: 'Storyboard 1', thumbnail: 'vids/storyboard1.mp4' },
    //     { src: 'vids/storyboard2.mp4', title: 'Storyboard 2', thumbnail: 'vids/storyboard2.mp4' },
    //     { src: 'vids/storyboard3.mp4', title: 'Storyboard 3', thumbnail: 'vids/storyboard3.mp4' },
    // ]}
];

const allAnimations = animationCategories.flatMap(cat => cat.videos);
let currentVideoIndex = 0;

function updateVideoDisplay() {
    const vp = document.querySelector('.animations-section .video-placeholder');
    if (!vp) return;
    const cur = allAnimations[currentVideoIndex];
    const ext = cur.src.split('.').pop().toLowerCase();
    if (ext === 'gif') {
        vp.innerHTML = '<div class="anim-inner-wrap"><img src="' + cur.src + '" alt="' + cur.title + '"></div>';
    } else {
        vp.innerHTML = '<div class="anim-inner-wrap"><video autoplay loop muted playsinline><source src="' + cur.src + '" type="video/mp4"></video></div>';
    }
}

function nextVideo() { currentVideoIndex = (currentVideoIndex + 1) % allAnimations.length; updateVideoDisplay(); }
function previousVideo() { currentVideoIndex = (currentVideoIndex - 1 + allAnimations.length) % allAnimations.length; updateVideoDisplay(); }

function populateAnimGallery() {
    const container = document.getElementById('animGalleryGrid');
    if (!container) return;
    container.innerHTML = '';

    const fragment = document.createDocumentFragment();

    animationCategories.forEach(category => {
        const section = document.createElement('div');
        section.className = 'anim-gallery-section';
        const title = document.createElement('h3');
        title.className = 'anim-gallery-section-title';
        title.textContent = category.section;
        section.appendChild(title);
        const grid = document.createElement('div');
        grid.className = 'anim-gallery-grid';

        category.videos.forEach(video => {
            const item = document.createElement('div');
            item.className = 'anim-gallery-item';
            let mediaEl;
            const thumbExt = video.thumbnail.split('.').pop().toLowerCase();

            if (thumbExt === 'gif') {
                mediaEl = document.createElement('img');
                mediaEl.src = video.thumbnail;
                mediaEl.alt = video.title;
                mediaEl.loading = 'lazy'; // lazy load GIFs too
                mediaEl.decoding = 'async';
                mediaEl.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
            } else {
                mediaEl = document.createElement('video');
                mediaEl.muted = true;
                mediaEl.playsInline = true;
                mediaEl.loop = true;
                // NO autoplay attribute — IntersectionObserver handles this
                mediaEl.preload = 'none'; // don't preload until visible
                mediaEl.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
                const source = document.createElement('source');
                source.src = video.thumbnail;
                source.type = 'video/mp4';
                mediaEl.appendChild(source);
            }

            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            overlay.innerHTML = '<div class="play-icon"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div><span>' + video.title + '</span>';
            item.appendChild(mediaEl);
            item.appendChild(overlay);
            item.addEventListener('click', () => {
                const idx = allAnimations.findIndex(v => v.src === video.src && v.title === video.title);
                if (idx !== -1) { currentVideoIndex = idx; updateVideoDisplay(); showAnimTab('anim-closeup'); }
            });
            grid.appendChild(item);

            // Observe video for lazy play — only for video elements
            if (mediaEl.tagName === 'VIDEO') {
                videoObserver.observe(mediaEl);
            }
        });

        section.appendChild(grid);
        fragment.appendChild(section);
    });

    container.appendChild(fragment);
}

// ===== FILMS =====
const films = [
    {
        url: 'https://www.youtube.com/watch?v=xO5sDt7_qN4', title: 'FISHBOWL',
        description: "A young painter searches for a reference for her aquatic painting, but doesn't know the fish she bought is actually magical. This imaginative animated short explores themes of curiosity, adventure, and finding your place in the world.",
        year: '2025', genre: 'Animation', duration: '7 min', roles: 'Director, Editor, Animator, Colorist',
        imdb: 'https://m.imdb.com/title/tt36786195/?ref_=ext_shr_lnk',
        youtubeLink: 'https://www.youtube.com/watch?v=xO5sDt7_qN4',
        behindScenesLabel: 'Behind the Scenes', artworkType: 'images',
        artwork: ['imgs/artwork1.png','imgs/artwork2.png','imgs/artwork3.png','imgs/artwork4.png','imgs/artwork5.png','imgs/artwork6.png']
    },
    {
        url: 'https://www.youtube.com/watch?v=fXAdtJOotVQ', title: 'PIZZA DOG',
        description: 'Dog learns to let go. This heartfelt animated short explores themes of love and loss between two best friends.',
        year: '2024', genre: 'Animation', duration: '2 min', roles: 'Director, Editor, Animator, Colorist',
        imdb: 'https://m.imdb.com/title/tt36587391/?ref_=ext_shr_lnk',
        youtubeLink: 'https://www.youtube.com/watch?v=fXAdtJOotVQ',
        behindScenesLabel: 'Behind the Scenes', artworkType: 'images',
        artwork: ['imgs/pizza1.png','imgs/pizza2.png','imgs/pizza3.png','imgs/pizza4.png']
    },
    {
        url: 'https://www.youtube.com/watch?v=NrgbSkulAZk', title: 'BODY',
        description: 'Body follows a young woman and her internal struggle as she juggles the complex challenge of chasing her dreams and the changing demands of her physical body.', year: '2025', genre: 'Animation', duration: '', roles: 'Guest Colorist',
        imdb: '', youtubeLink: 'https://www.youtube.com/watch?v=NrgbSkulAZk',
        behindScenesLabel: 'Work', artworkType: 'videos', noWatermark: true,
        artwork: ['vids/BODY_CUT1.mp4','vids/BODY_CUT2.mp4','vids/BODY_CUT3.mp4']
    }
];

let currentFilmIndex = 0;

function updateFilmDisplay() {
    const vp = document.querySelector('.video-placeholder-film');
    const filmTag = document.querySelector('.film-tag');
    const filmText = document.querySelector('.film-text');
    const filmMeta = document.querySelector('.film-meta');
    const filmRoles = document.querySelector('.film-roles');
    const filmLinks = document.querySelector('.film-links');
    const artworkGrid = document.querySelector('.artwork-grid');
    const processTitle = document.querySelector('.process-title');
    const artworkHeading = document.querySelector('.artwork-heading');
    if (!vp) return;

    const f = films[currentFilmIndex];
    const vid = getYouTubeID(f.url);
    // Use lazy loading iframe attribute for YouTube embeds
    vp.innerHTML = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + vid + '" title="' + f.title + '" frameborder="0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="border-radius: 20px;"></iframe>';

    if (filmTag) filmTag.textContent = f.title;
    if (filmText) filmText.textContent = f.description;
    if (filmMeta) {
        const parts = [f.year, f.genre, f.duration].filter(Boolean);
        filmMeta.innerHTML = parts.map((p, i) => i < parts.length - 1 ? '<span>' + p + '</span><span class="meta-dot">&bull;</span>' : '<span>' + p + '</span>').join('');
    }
    if (filmRoles) filmRoles.textContent = f.roles || '';
    if (filmLinks) {
        filmLinks.innerHTML = '';
        if (f.imdb) filmLinks.innerHTML += '<a href="' + f.imdb + '" target="_blank" class="film-link">IMDB page</a>';
        if (f.youtubeLink) filmLinks.innerHTML += '<a href="' + f.youtubeLink + '" target="_blank" class="film-link">YouTube Link</a>';
    }
    if (processTitle) processTitle.textContent = f.behindScenesLabel || 'Behind the Scenes';
    if (artworkHeading) artworkHeading.textContent = f.artworkType === 'videos' ? 'Work:' : 'Artwork:';

    if (artworkGrid) {
        artworkGrid.innerHTML = '';
        if (f.artwork && f.artwork.length > 0) {
            const fragment = document.createDocumentFragment();
            if (f.artworkType === 'videos') {
                f.artwork.forEach(src => {
                    const v = document.createElement('video');
                    v.src = src;
                    v.className = 'artwork-img';
                    v.loop = true;
                    v.muted = true;
                    v.playsInline = true;
                    v.preload = 'none'; // don't preload artwork videos upfront
                    v.style.objectFit = 'cover';
                    videoObserver.observe(v); // lazy play
                    if (f.noWatermark) {
                        const wrapper = document.createElement('div');
                        wrapper.style.cssText = 'width:95%;position:relative;overflow:hidden;border-radius:12px;';
                        wrapper.appendChild(v);
                        fragment.appendChild(wrapper);
                    } else {
                        fragment.appendChild(createWatermarkWrapper(v));
                    }
                });
            } else {
                f.artwork.forEach(src => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = f.title + ' artwork';
                    img.className = 'artwork-img';
                    img.loading = 'lazy';
                    img.decoding = 'async';
                    fragment.appendChild(createWatermarkWrapper(img));
                });
            }
            artworkGrid.appendChild(fragment);
        } else {
            artworkGrid.innerHTML = '<p class="no-artwork">No artwork added yet.</p>';
        }
    }
    setTimeout(positionMoonAndSides, 60);
}

function nextFilm() { currentFilmIndex = (currentFilmIndex + 1) % films.length; updateFilmDisplay(); }
function previousFilm() { currentFilmIndex = (currentFilmIndex - 1 + films.length) % films.length; updateFilmDisplay(); }

// ===== STAMP HIGHLIGHT =====
function addStampHighlight() {
    const stamps = document.querySelectorAll('.stamp');
    const stampBg = document.querySelector('.contact-stamp');
    if (!stampBg) return;
    stamps.forEach(stamp => {
        stamp.addEventListener('mouseenter', () => { stampBg.classList.add('highlight'); });
        stamp.addEventListener('mouseleave', () => { if (!stamp.classList.contains('dragging')) stampBg.classList.remove('highlight'); });
        stamp.addEventListener('mousedown', () => { stampBg.classList.add('highlight'); });
        stamp.addEventListener('touchstart', () => { stampBg.classList.add('highlight'); }, { passive: true });
    });
    document.addEventListener('mouseup', () => { if (stampBg) setTimeout(() => { stampBg.classList.remove('highlight'); }, 300); });
    document.addEventListener('touchend', () => { if (stampBg) setTimeout(() => { stampBg.classList.remove('highlight'); }, 300); });
}

// ===== DRAGGABLE STAMPS =====
function makeDraggable() {
    const stamps = document.querySelectorAll('.stamp');
    const contactContainer = document.querySelector('.contact-container');
    if (!contactContainer) return;

    contactContainer.style.minHeight = contactContainer.offsetHeight + 'px';

    stamps.forEach(stamp => {
        stamp._originalParent = stamp.parentElement;
        stamp._originalIndex = Array.from(stamp.parentElement.children).indexOf(stamp);
    });

    stamps.forEach(stamp => {
        let isDragging = false;
        let mouseOffsetX, mouseOffsetY;

        function dragStart(e) {
            if (e.cancelable) e.preventDefault();
            const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
            const stampRect = stamp.getBoundingClientRect();
            mouseOffsetX = clientX - stampRect.left;
            mouseOffsetY = clientY - stampRect.top;

            if (stamp.parentElement !== contactContainer) {
                const containerRect = contactContainer.getBoundingClientRect();
                const newLeft = stampRect.left - containerRect.left + contactContainer.scrollLeft;
                const newTop = stampRect.top - containerRect.top + contactContainer.scrollTop;
                const placeholder = document.createElement('div');
                placeholder.className = 'stamp-placeholder';
                placeholder.style.cssText = 'width:' + stamp.offsetWidth + 'px;height:' + stamp.offsetHeight + 'px;visibility:hidden;pointer-events:none;flex-shrink:0;';
                stamp.parentElement.insertBefore(placeholder, stamp);
                stamp._placeholder = placeholder;
                stamp.style.position = 'absolute';
                stamp.style.left = newLeft + 'px';
                stamp.style.top = newTop + 'px';
                contactContainer.appendChild(stamp);
            }

            isDragging = true;
            stamp.style.zIndex = '1000';
            stamp.classList.add('dragging');
            document.addEventListener('mousemove', drag, { passive: false });
            document.addEventListener('touchmove', drag, { passive: false });
            document.addEventListener('mouseup', dragEnd);
            document.addEventListener('touchend', dragEnd);
        }

        function drag(e) {
            if (!isDragging) return;
            if (e.cancelable) e.preventDefault();
            const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
            const containerRect = contactContainer.getBoundingClientRect();
            stamp.style.left = (clientX - containerRect.left - mouseOffsetX + contactContainer.scrollLeft) + 'px';
            stamp.style.top = (clientY - containerRect.top - mouseOffsetY + contactContainer.scrollTop) + 'px';
        }

        function dragEnd() {
            isDragging = false;
            stamp.style.zIndex = '10';
            stamp.classList.remove('dragging');
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('mouseup', dragEnd);
            document.removeEventListener('touchend', dragEnd);
        }

        stamp.addEventListener('mousedown', dragStart);
        stamp.addEventListener('touchstart', dragStart, { passive: false });
    });
}

// ===== POSITION MOON AND SIDE DECORATIONS =====
function positionMoonAndSides() {
    const contact = document.querySelector('.contact-section');
    const moon = document.querySelector('.right-moon');
    const sides = document.querySelectorAll('.side-decoration-container');

    if (!contact) return;
    const contactTop = contact.offsetTop;
    let moonTop = contactTop;

    if (moon) {
        const moonH = moon.offsetHeight || 300;
        moonTop = contactTop - moonH + 90;
        moon.style.top = (moonTop - 100) + 'px';
    }

    sides.forEach(s => {
        if (s.classList.contains('left')) {
            const sunImg = document.querySelector('.left-sun');
            const sunHeight = sunImg ? (sunImg.offsetHeight || 300) : 300;
            const topOffset = sunHeight + 20;
            s.style.top = topOffset + 'px';
            s.style.left = 10 + 'px';
            s.style.height = (contactTop - topOffset - 80) + 'px';
        } else if (s.classList.contains('right')) {
            const topOffset = 10;
            s.style.top = topOffset + 'px';
            const moonImg = document.querySelector('.right-moon');
            if (moonImg) {
                const moonTopPos = parseInt(moonImg.style.top) || moonTop;
                s.style.height = (moonTopPos - topOffset - 50) + 'px';
            } else {
                s.style.height = (contactTop - topOffset - 80) + 'px';
            }
        }
    });
}

function positionMargins() {
    const contact = document.querySelector('.contact-section');
    const footer = document.querySelector('.footer');
    if (!contact) return;

    contact.style.marginLeft = '';
    contact.style.marginRight = '';
    contact.style.paddingLeft = '';
    contact.style.paddingRight = '';

    const bodyStyle = window.getComputedStyle(document.body);
    const paddingLeft = parseInt(bodyStyle.paddingLeft) || 0;
    const paddingRight = parseInt(bodyStyle.paddingRight) || 0;

    contact.style.marginLeft = '-' + paddingLeft + 'px';
    contact.style.marginRight = '-' + paddingRight + 'px';
    contact.style.paddingLeft = (paddingLeft + 30) + 'px';
    contact.style.paddingRight = (paddingRight + 30) + 'px';

    if (footer) {
        footer.style.marginLeft = '-' + paddingLeft + 'px';
        footer.style.marginRight = '-' + paddingRight + 'px';
        footer.style.paddingLeft = (paddingLeft + 30) + 'px';
        footer.style.paddingRight = (paddingRight + 30) + 'px';
    }
}

function positionElements() {
    positionMoonAndSides();
    positionMargins();
}

// ================================================================
//  NAVBAR INTERACTIVE ANIMATIONS
// ================================================================

// ----- 1. FLOATING STAR PARTICLE CANVAS -----
function initNavParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const nav = document.getElementById('mainNav');

    function resize() {
        canvas.width  = nav.offsetWidth;
        canvas.height = nav.offsetHeight;
    }
    resize();
    window.addEventListener('resize', debounce(resize, 200));

    function drawStar(ctx, x, y, r, alpha, color) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle   = color;
        ctx.shadowColor = color;
        ctx.shadowBlur  = 8;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle  = (i * Math.PI) / 4;
            const radius = i % 2 === 0 ? r : r * 0.38;
            const px = x + Math.cos(angle) * radius;
            const py = y + Math.sin(angle) * radius;
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    const COLORS = ['#ffe566', '#fff5c0', '#ffb347', '#ff9fe0', '#ffffff', '#ffd0a0'];

    class Star {
        constructor(initial) { this.reset(!!initial); }
        reset(initial) {
            this.x       = Math.random() * canvas.width;
            this.y       = initial ? Math.random() * canvas.height : -14;
            this.r       = Math.random() * 10 + 5;
            this.color   = COLORS[Math.floor(Math.random() * COLORS.length)];
            this.vx      = (Math.random() - 0.5) * 0.4;
            this.vy      = (Math.random() * 0.3 + 0.1);
            this.spin    = (Math.random() - 0.5) * 0.02;
            this.angle   = Math.random() * Math.PI * 2;
            this.life    = 0;
            this.maxLife = Math.random() * 320 + 200;
            this.twinkle = Math.random() * Math.PI * 2;
        }
        update() {
            this.x     += this.vx;
            this.y     += this.vy;
            this.angle += this.spin;
            this.life++;
            this.twinkle += 0.055;
            const lr    = this.life / this.maxLife;
            this.alpha  = (1 - lr) * (0.45 + 0.3 * Math.sin(this.twinkle));
            if (this.life >= this.maxLife || this.y > canvas.height + 14) this.reset(false);
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            drawStar(ctx, 0, 0, this.r, this.alpha, this.color);
            ctx.restore();
        }
    }

    // Reduced from 55 to 25 stars — still looks great, much lighter
    const stars = [];
    for (let i = 0; i < 25; i++) stars.push(new Star(true));

    (function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => { s.update(); s.draw(); });
        requestAnimationFrame(loop);
    })();
}

// ----- 2. LETTER-BY-LETTER TITLE WRAP -----
function splitNavTitle() {
    const title = document.getElementById('navTitle');
    if (!title) return;
    const text = title.textContent.trim();
    title.textContent = '';
    [...text].forEach(ch => {
        const span = document.createElement('span');
        span.className  = 'nav-letter';
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        title.appendChild(span);
    });
}

// ----- 3. LETTER WAVE ON HOVER (neighbours bounce too) -----
function initLetterHover() {
    function attachHover() {
        const letters = Array.from(document.querySelectorAll('#navTitle .nav-letter'));
        if (!letters.length) return;
        letters.forEach((letter, i) => {
            letter.addEventListener('mouseenter', () => {
                document.getElementById('navTitle').classList.remove('idle-wave');
                letters.forEach(l => {
                    l.style.transition = 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), text-shadow 0.2s ease';
                    l.style.transform  = '';
                    l.style.animation  = 'none';
                });
                letters[i].style.transform = 'translateY(-14px) scale(1.22) rotate(-4deg)';
                if (letters[i - 1]) letters[i - 1].style.transform = 'translateY(-6px) scale(1.06) rotate(-1.5deg)';
                if (letters[i + 1]) letters[i + 1].style.transform = 'translateY(-6px) scale(1.06) rotate(1.5deg)';
                if (letters[i - 2]) letters[i - 2].style.transform = 'translateY(-2px) scale(1.02)';
                if (letters[i + 2]) letters[i + 2].style.transform = 'translateY(-2px) scale(1.02)';
            });
            letter.addEventListener('mouseleave', () => {
                letters.forEach(l => {
                    l.style.transform = '';
                    l.style.animation = '';
                });
                setTimeout(() => {
                    document.getElementById('navTitle').classList.add('idle-wave');
                }, 400);
            });
        });
    }
    setTimeout(attachHover, 50);
}

// ----- 4. SPARKLE BURST ON NAV BUTTON CLICK -----
function initBtnSparkles() {
    document.querySelectorAll('.nav-links .nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const rect   = btn.getBoundingClientRect();
            const cx     = rect.left + rect.width  / 2;
            const cy     = rect.top  + rect.height / 2;
            const colors = ['#ffe566','#ff9520','#ff3cbe','#ffb347','#fff5c0','#ffdd00','#ff8800'];
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < 18; i++) {
                const s     = document.createElement('div');
                s.className = 'nav-sparkle';
                const angle = (i / 18) * Math.PI * 2;
                const dist  = 60 + Math.random() * 100;
                const size  = 4 + Math.random() * 8;
                s.style.cssText = [
                    'position:fixed',
                    'pointer-events:none',
                    'z-index:9999',
                    'left:' + cx + 'px',
                    'top:'  + cy + 'px',
                    'width:'  + size + 'px',
                    'height:' + size + 'px',
                    'border-radius:50%',
                    'background:' + colors[Math.floor(Math.random() * colors.length)],
                    'box-shadow: 0 0 6px ' + colors[Math.floor(Math.random() * colors.length)],
                    '--tx:' + (Math.cos(angle) * dist) + 'px',
                    '--ty:' + (Math.sin(angle) * dist) + 'px',
                    'animation:sparkleBurst 0.85s ease-out ' + (Math.random() * 0.1) + 's both'
                ].join(';');
                fragment.appendChild(s);
                s.addEventListener('animationend', () => s.remove());
            }
            document.body.appendChild(fragment);
        });
    });
}

// ----- 5. MAGICAL FLOATING ORBS behind the navbar -----
function initNavOrbs() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    const orbColors = [
        'rgba(255,180,50,0.35)',
        'rgba(255,100,200,0.3)',
        'rgba(120,50,255,0.25)',
        'rgba(255,220,80,0.4)',
        'rgba(255,60,120,0.25)',
    ];
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 5; i++) {
        const orb = document.createElement('div');
        orb.className = 'navbar-orb';
        const size = 80 + Math.random() * 180;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const dx = (Math.random() - 0.5) * 600;
        const dy = (Math.random() - 0.5) * 400;
        const dur = 8 + Math.random() * 10;
        const delay = Math.random() * -dur;
        orb.style.cssText = [
            'width:' + size + 'px',
            'height:' + size + 'px',
            'background:' + orbColors[i % orbColors.length],
            'left:' + startX + '%',
            'top:' + startY + '%',
            '--dx:' + dx + 'px',
            '--dy:' + dy + 'px',
            'animation-duration:' + dur + 's',
            'animation-delay:' + delay + 's',
        ].join(';');
        fragment.appendChild(orb);
    }
    nav.appendChild(fragment);
}

// ----- 6. IDLE WAVE on title letters -----
function startIdleWave() {
    const title = document.getElementById('navTitle');
    if (!title) return;
    setTimeout(() => {
        title.classList.add('idle-wave');
    }, 1500);
}

// ----- 7. INTRO OVERLAY STARS -----
function initIntroStars() {
    const container = document.getElementById('introStars');
    if (!container) return;
    const colors = ['#ffe566', '#ffb347', '#fff5c0', '#ff9fe0', '#ffffff', '#ffcc80'];
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 40; i++) {
        const s = document.createElement('div');
        s.className = 'intro-star-particle';
        const size = 4 + Math.random() * 8;
        const angle = Math.random() * Math.PI * 2;
        const dist = 200 + Math.random() * 500;
        const cx = 50 + (Math.random() - 0.5) * 40;
        const cy = 45 + (Math.random() - 0.5) * 20;
        const fx = Math.cos(angle) * dist + 'px';
        const fy = Math.sin(angle) * dist + 'px';
        const dur = 1.5 + Math.random() * 1.2;
        const delay = 0.3 + Math.random() * 1.2;
        s.style.cssText = [
            'width:' + size + 'px',
            'height:' + size + 'px',
            'background:' + colors[Math.floor(Math.random() * colors.length)],
            'left:calc(' + cx + '% - ' + (size/2) + 'px)',
            'top:calc(' + cy + '% - ' + (size/2) + 'px)',
            '--fx:' + fx,
            '--fy:' + fy,
            'box-shadow: 0 0 8px ' + colors[Math.floor(Math.random() * colors.length)],
            'animation: introStarFly ' + dur + 's ease-out ' + delay + 's both',
        ].join(';');
        fragment.appendChild(s);
    }
    container.appendChild(fragment);
}

// ----- 8. REMOVE INTRO OVERLAY after animation -----
function setupIntroOverlay() {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay) return;
    initIntroStars();
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 2900);
}

// ----- 9. LOGO CLICK SPIN -----
function initLogoSpin() {
    const logo = document.getElementById('logoImg');
    if (!logo) return;
    let spinning = false;
    logo.addEventListener('click', () => {
        if (spinning) return;
        spinning = true;
        logo.style.animation = 'logoSpin 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        setTimeout(() => {
            spinning = false;
            logo.style.animation = 'logoFloat 4.5s ease-in-out infinite';
        }, 750);
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function () {

    // --- Intro overlay ---
    setupIntroOverlay();

    // --- Navbar interactive init ---
    splitNavTitle();
    initLetterHover();
    initNavParticles();
    initBtnSparkles();
    initNavOrbs();
    startIdleWave();
    initLogoSpin();

    // --- Existing site init ---
    updateShowcase();
    populateGallery();

    const imgArrows = document.querySelectorAll('.illustration-showcase .nav-arrow');
    if (imgArrows.length >= 2) {
        imgArrows[0].addEventListener('click', previousImage);
        imgArrows[1].addEventListener('click', nextImage);
    }

    const illusShowcase = document.querySelector('.illustration-showcase');
    if (illusShowcase) addSwipeSupport(illusShowcase, nextImage, previousImage);

    updateVideoDisplay();
    populateAnimGallery();

    const animPrev = document.querySelector('.anim-arrow-prev');
    const animNext = document.querySelector('.anim-arrow-next');
    if (animPrev) animPrev.addEventListener('click', previousVideo);
    if (animNext) animNext.addEventListener('click', nextVideo);

    const animShowcase = document.querySelector('.animation-showcase');
    if (animShowcase) addSwipeSupport(animShowcase, nextVideo, previousVideo);

    updateFilmDisplay();
    const filmPrev = document.querySelector('.film-arrow-prev');
    const filmNext = document.querySelector('.film-arrow-next');
    if (filmPrev) filmPrev.addEventListener('click', previousFilm);
    if (filmNext) filmNext.addEventListener('click', nextFilm);

    const filmWrapper = document.querySelector('.film-video-wrapper');
    if (filmWrapper) addSwipeSupport(filmWrapper, nextFilm, previousFilm);

    makeDraggable();
    addStampHighlight();

    const moonImg = document.querySelector('.right-moon');
    if (moonImg) {
        if (moonImg.complete) positionElements();
        else moonImg.addEventListener('load', positionElements);
    }
    positionElements();
});

window.addEventListener('load', positionElements);
window.addEventListener('resize', debounce(positionElements, 150));

// ===== STICKY NAV ON SCROLL =====
const stickyNav = document.getElementById('stickyNav');
const mainNav = document.querySelector('.navbar');