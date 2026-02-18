const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

    // ===== UTILITY: YouTube ID extractor =====
    function getYouTubeID(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // ===== ILLUSTRATION TAB SWITCHING =====
    function showIllusTab(tabName) {
        const section = document.querySelector('.work-section');
        const tabs = section.querySelectorAll('.tab-content');
        const buttons = section.querySelectorAll('.illus-tab');

        tabs.forEach(tab => tab.classList.remove('active'));
        buttons.forEach(btn => btn.classList.remove('active'));

        document.getElementById(tabName).classList.add('active');
        buttons.forEach(btn => {
            if (btn.getAttribute('onclick').includes(tabName)) {
                btn.classList.add('active');
            }
        });

        // Recalculate positions after DOM reflow
        setTimeout(positionMoonAndSides, 60);
    }

    // ===== ANIMATION TAB SWITCHING =====
    function showAnimTab(tabName) {
        const section = document.querySelector('.animations-section');
        const tabs = section.querySelectorAll('.tab-content');
        const buttons = section.querySelectorAll('.anim-tab');

        tabs.forEach(tab => tab.classList.remove('active'));
        buttons.forEach(btn => btn.classList.remove('active'));

        document.getElementById(tabName).classList.add('active');
        buttons.forEach(btn => {
            if (btn.getAttribute('onclick').includes(tabName)) {
                btn.classList.add('active');
            }
        });

        // When switching to gallery, kick all videos into playing
        if (tabName === 'anim-gallery') {
            setTimeout(() => {
                document.querySelectorAll('#animGalleryGrid video').forEach(v => {
                    v.muted = true;
                    v.play().catch(() => {});
                });
            }, 100);
        }

        // Recalculate positions after DOM reflow
        setTimeout(positionMoonAndSides, 60);
    }

    // ===== ABOUT TAB SWITCHING =====
    function showAboutTab(tabName) {
        const section = document.querySelector('.about-section');
        const tabs = section.querySelectorAll('.tab-content');
        const buttons = section.querySelectorAll('.about-tab');

        tabs.forEach(tab => tab.classList.remove('active'));
        buttons.forEach(btn => btn.classList.remove('active'));

        document.getElementById(tabName).classList.add('active');
        buttons.forEach(btn => {
            if (btn.getAttribute('onclick').includes(tabName)) {
                btn.classList.add('active');
            }
        });

        // Recalculate positions after DOM reflow
        setTimeout(positionMoonAndSides, 60);
    }

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    
    // ===== ILLUSTRATIONS SECTION =====
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

    function updateShowcase() {
        const display = document.querySelector('.illustration-display');
        const imageSrc = images[currentImageIndex].src;
        
        const img = new Image();
        img.onload = function() {
            display.style.backgroundImage = `url('${imageSrc}')`;
            display.style.backgroundSize = 'contain';
            display.style.backgroundPosition = 'center';
            display.style.backgroundRepeat = 'no-repeat';
        };
        img.src = imageSrc;
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateShowcase();
    }

    function previousImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateShowcase();
    }

    function populateGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;

        galleryGrid.innerHTML = '';

        images.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';

            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            imgElement.alt = img.title;

            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            const titleSpan = document.createElement('span');
            titleSpan.textContent = img.title;
            overlay.appendChild(titleSpan);

            item.appendChild(imgElement);
            item.appendChild(overlay);

            item.addEventListener('click', () => {
                currentImageIndex = index;
                updateShowcase();
                showIllusTab('closeup');
            });

            galleryGrid.appendChild(item);
        });
    }

    // ===== ANIMATIONS SECTION =====
    const animationCategories = [
        {
            section: 'Locomotion',
            videos: [
                { src: 'vids/GirlWalkCycle.gif',           title: 'Girl Walk Cycle',   thumbnail: 'vids/GirlWalkCycle.gif' },
                { src: 'vids/StoneLionRunCycle.gif',        title: 'Stone Lion Run Cycle', thumbnail: 'vids/StoneLionRunCycle.gif' },
                { src: 'vids/WalkCycle.gif',                title: 'Walk Cycle',        thumbnail: 'vids/WalkCycle.gif' },
                { src: 'vids/walk4legged.gif',              title: 'Walk 4 Legged',     thumbnail: 'vids/walk4legged.gif' },
                { src: 'vids/walk4leggedfoxfixed (1).gif',  title: 'Walk Fox Fixed',    thumbnail: 'vids/walk4leggedfoxfixed (1).gif' },
            ]
        },
        {
            section: 'Motion Graphics',
            videos: [
                { src: 'vids/icebreaker.mp4',  title: 'Icebreaker',  thumbnail: 'vids/icebreaker.mp4' },
                { src: 'vids/rig.mp4',         title: 'Rig',         thumbnail: 'vids/rig.mp4' },
                { src: 'vids/lyrics.mp4',      title: 'Lyrics',      thumbnail: 'vids/lyrics.mp4' },
                { src: 'vids/Tiger-final.mp4', title: 'Tiger Final', thumbnail: 'vids/Tiger-final.mp4' },
            ]
        },
        {
            section: 'Character Acting',
            videos: [
                { src: 'vids/hair.mp4',           title: 'Hair',            thumbnail: 'vids/hair.mp4' },
                { src: 'vids/wave.mp4',            title: 'Wave',            thumbnail: 'vids/wave.mp4' },
                { src: 'vids/props.mp4',           title: 'Props',            thumbnail: 'vids/props.mp4' },
                { src: 'vids/ScaryEncounter.mp4',  title: 'Scary Encounter', thumbnail: 'vids/ScaryEncounter.mp4' },
            ]
        },
        {
            section: 'Stop Motion',
            videos: [
                { src: 'vids/stopmotion-cat.mp4', title: '1 Cat', thumbnail: 'vids/stopmotion-cat.mp4' },
            ]
        }
    ];

    const allAnimations = animationCategories.flatMap(cat => cat.videos);
    let currentVideoIndex = 0;

    function updateVideoDisplay() {
        const videoPlaceholder = document.querySelector('.animations-section .video-placeholder');
        const counter = document.querySelector('.anim-counter');

        if (!videoPlaceholder) return;

        const currentVideo = allAnimations[currentVideoIndex];
        const fileExtension = currentVideo.src.split('.').pop().toLowerCase();
        
        const loopAttr = 'autoplay loop muted playsinline';
        if (fileExtension === 'gif') {
            videoPlaceholder.innerHTML = `
                <img src="${currentVideo.src}" alt="${currentVideo.title}" style="width: 100%; height: 100%; border-radius: 20px; object-fit: contain;">
            `;
        } else {
            videoPlaceholder.innerHTML = `
                <video width="100%" height="100%" ${loopAttr} style="border-radius: 20px;">
                    <source src="${currentVideo.src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        }

        if (counter) {
            counter.textContent = `${currentVideoIndex + 1} / ${allAnimations.length}`;
        }
    }

    function nextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % allAnimations.length;
        updateVideoDisplay();
    }

    function previousVideo() {
        currentVideoIndex = (currentVideoIndex - 1 + allAnimations.length) % allAnimations.length;
        updateVideoDisplay();
    }

    function populateAnimGallery() {
        const container = document.getElementById('animGalleryGrid');
        if (!container) return;

        container.innerHTML = '';

        animationCategories.forEach(category => {
            const section = document.createElement('div');
            section.className = 'anim-gallery-section';

            const sectionTitle = document.createElement('h3');
            sectionTitle.className = 'anim-gallery-section-title';
            sectionTitle.textContent = category.section;
            section.appendChild(sectionTitle);

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
                    mediaEl.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
                } else {
                    mediaEl = document.createElement('video');
                    mediaEl.muted = true;
                    mediaEl.playsInline = true;
                    mediaEl.loop = true;
                    mediaEl.setAttribute('autoplay', '');
                    mediaEl.setAttribute('muted', '');
                    mediaEl.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';

                    const source = document.createElement('source');
                    source.src = video.thumbnail;
                    source.type = 'video/mp4';
                    mediaEl.appendChild(source);

                    // Force play when ready
                    mediaEl.addEventListener('canplay', () => {
                        mediaEl.play().catch(() => {});
                    });

                    // Backup manual loop
                    mediaEl.addEventListener('ended', () => {
                        mediaEl.currentTime = 0;
                        mediaEl.play().catch(() => {});
                    });
                }

                const overlay = document.createElement('div');
                overlay.className = 'overlay';
                overlay.innerHTML = `
                    <div class="play-icon">
                        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <span>${video.title}</span>
                `;

                item.appendChild(mediaEl);
                item.appendChild(overlay);

                item.addEventListener('click', () => {
                    const flatIndex = allAnimations.findIndex(v => v.src === video.src && v.title === video.title);
                    if (flatIndex !== -1) {
                        currentVideoIndex = flatIndex;
                        updateVideoDisplay();
                        showAnimTab('anim-closeup');
                    }
                });

                grid.appendChild(item);

                // Attempt immediate play after appending to DOM
                if (mediaEl.tagName === 'VIDEO') {
                    mediaEl.load();
                    mediaEl.play().catch(() => {});
                }
            });

            section.appendChild(grid);
            container.appendChild(section);
        });
    }

    // ===== FILMS SECTION =====
    const films = [
        {
            url: 'https://www.youtube.com/watch?v=xO5sDt7_qN4',
            title: 'FISHBOWL',
            description: "A young painter searches for a reference for her aquatic painting, but doesn't know the fish she bought is actually magical. This imaginative animated short explores themes of curiosity, adventure, and finding your place in the world.",
            year: '2025',
            genre: 'Animation',
            duration: '7 min',
            roles: 'Director, Editor, Animator, Colorist',
            imdb: 'https://m.imdb.com/title/tt36786195/?ref_=ext_shr_lnk',
            youtubeLink: 'https://www.youtube.com/watch?v=xO5sDt7_qN4',
            artwork: [
                'imgs/artwork1.png',
                'imgs/artwork2.png',
                'imgs/artwork3.png',
                'imgs/artwork4.png',
                'imgs/artwork5.png',
                'imgs/artwork6.png',
            ]
        },
        {
            url: 'https://www.youtube.com/watch?v=fXAdtJOotVQ',
            title: 'PIZZA DOG',
            description: 'Dog learns to let go. This heartfelt animated short explores themes of love and loss between two best friends.',
            year: '2024',
            genre: 'Animation',
            duration: '2 min',
            roles: 'Director, Editor, Animator, Colorist',
            imdb: 'https://m.imdb.com/title/tt36587391/?ref_=ext_shr_lnk',
            youtubeLink: 'https://www.youtube.com/watch?v=fXAdtJOotVQ',
            artwork: [
                'imgs/pizza1.png',
                'imgs/pizza2.png',
                'imgs/pizza3.png',
                'imgs/pizza4.png',
            ]
        }
    ];

    let currentFilmIndex = 0;

    function updateFilmDisplay() {
        const videoPlaceholder = document.querySelector('.video-placeholder-film');
        const filmTag = document.querySelector('.film-tag');
        const filmText = document.querySelector('.film-text');
        const filmMeta = document.querySelector('.film-meta');
        const filmRoles = document.querySelector('.film-roles');
        const filmLinks = document.querySelector('.film-links');
        const artworkGrid = document.querySelector('.artwork-grid');

        if (!videoPlaceholder) return;

        const currentFilm = films[currentFilmIndex];
        const videoID = getYouTubeID(currentFilm.url);
        const embedUrl = `https://www.youtube.com/embed/${videoID}`;

        videoPlaceholder.innerHTML = `
            <iframe width="100%" height="100%" src="${embedUrl}"
                title="${currentFilm.title}" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen style="border-radius: 20px;">
            </iframe>
        `;

        if (filmTag) filmTag.textContent = currentFilm.title;
        if (filmText) filmText.textContent = currentFilm.description;

        if (filmMeta) {
            filmMeta.innerHTML = `
                <span>${currentFilm.year}</span>
                <span class="meta-dot">•</span>
                <span>${currentFilm.genre}</span>
                <span class="meta-dot">•</span>
                <span>${currentFilm.duration}</span>
            `;
        }

        if (filmRoles) filmRoles.textContent = currentFilm.roles || '';

        if (filmLinks) {
            filmLinks.innerHTML = '';
            if (currentFilm.imdb) {
                filmLinks.innerHTML += `<a href="${currentFilm.imdb}" target="_blank" class="film-link">IMDB page</a>`;
            }
            if (currentFilm.youtubeLink) {
                filmLinks.innerHTML += `<a href="${currentFilm.youtubeLink}" target="_blank" class="film-link">YouTube Link</a>`;
            }
        }

        // Populate artwork grid
        if (artworkGrid) {
            artworkGrid.innerHTML = '';
            if (currentFilm.artwork && currentFilm.artwork.length > 0) {
                currentFilm.artwork.forEach(imgSrc => {
                    const imgEl = document.createElement('img');
                    imgEl.src = imgSrc;
                    imgEl.alt = currentFilm.title + ' artwork';
                    imgEl.className = 'artwork-img';
                    artworkGrid.appendChild(imgEl);
                });
            } else {
                artworkGrid.innerHTML = '<p class="no-artwork">No artwork added yet.</p>';
            }
        }

        // Recalculate moon/sides after film content changes height
        setTimeout(positionMoonAndSides, 60);
    }

    function nextFilm() {
        currentFilmIndex = (currentFilmIndex + 1) % films.length;
        updateFilmDisplay();
    }

    function previousFilm() {
        currentFilmIndex = (currentFilmIndex - 1 + films.length) % films.length;
        updateFilmDisplay();
    }

    // ===== STAMP HIGHLIGHT =====
    function addStampHighlight() {
        const stamps = document.querySelectorAll('.stamp');
        const stampBg = document.querySelector('.contact-stamp');
        
        if (!stampBg) return;
        
        stamps.forEach(stamp => {
            stamp.addEventListener('mouseenter', () => {
                stampBg.classList.add('highlight');
            });
            stamp.addEventListener('mouseleave', () => {
                if (!stamp.classList.contains('dragging')) {
                    stampBg.classList.remove('highlight');
                }
            });
            stamp.addEventListener('mousedown', () => {
                stampBg.classList.add('highlight');
            });
            stamp.addEventListener('touchstart', () => {
                stampBg.classList.add('highlight');
            });
        });
        
        document.addEventListener('mouseup', () => {
            if (stampBg) {
                setTimeout(() => { stampBg.classList.remove('highlight'); }, 300);
            }
        });
        document.addEventListener('touchend', () => {
            if (stampBg) {
                setTimeout(() => { stampBg.classList.remove('highlight'); }, 300);
            }
        });
    }

    // ===== DRAGGABLE STAMPS =====
    function makeDraggable() {
        const stamps = document.querySelectorAll('.stamp');
        const contactContainer = document.querySelector('.contact-container');

        contactContainer.style.minHeight = contactContainer.offsetHeight + 'px';

        const stampTops = [0, 210, 420];
        stamps.forEach((stamp, i) => {
            stamp.style.top = stampTops[i] + 'px';
            stamp.style.left = '0px';
        });

        stamps.forEach(stamp => {
            let isDragging = false;
            let mouseOffsetX, mouseOffsetY;

            stamp.addEventListener('mousedown', dragStart);
            stamp.addEventListener('touchstart', dragStart, { passive: false });

            function dragStart(e) {
                e.preventDefault();

                const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
                const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

                const stampRect = stamp.getBoundingClientRect();
                mouseOffsetX = clientX - stampRect.left;
                mouseOffsetY = clientY - stampRect.top;

                if (stamp.parentElement !== contactContainer) {
                    const containerRect = contactContainer.getBoundingClientRect();
                    const newLeft = stampRect.left - containerRect.left;
                    const newTop  = stampRect.top  - containerRect.top;

                    const placeholder = document.createElement('div');
                    placeholder.className = 'stamp-placeholder';
                    placeholder.style.cssText = `
                        width: ${stamp.offsetWidth}px;
                        height: ${stamp.offsetHeight}px;
                        position: absolute;
                        top: ${stamp.style.top};
                        left: ${stamp.style.left};
                        visibility: hidden;
                        pointer-events: none;
                    `;
                    stamp.parentElement.appendChild(placeholder);
                    stamp._placeholder = placeholder;

                    contactContainer.appendChild(stamp);
                    stamp.style.left = newLeft + 'px';
                    stamp.style.top  = newTop  + 'px';
                }

                isDragging = true;
                stamp.style.zIndex = '1000';
                stamp.classList.add('dragging');

                document.addEventListener('mousemove', drag);
                document.addEventListener('touchmove', drag, { passive: false });
                document.addEventListener('mouseup', dragEnd);
                document.addEventListener('touchend', dragEnd);
            }

            function drag(e) {
                if (!isDragging) return;
                e.preventDefault();

                const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
                const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

                const containerRect = contactContainer.getBoundingClientRect();
                stamp.style.left = (clientX - containerRect.left - mouseOffsetX) + 'px';
                stamp.style.top  = (clientY - containerRect.top  - mouseOffsetY) + 'px';
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

    // ===== INITIALIZE EVERYTHING =====
    document.addEventListener('DOMContentLoaded', function () {
        updateShowcase();
        populateGallery();

        const imgArrows = document.querySelectorAll('.illustration-showcase .nav-arrow');
        if (imgArrows.length >= 2) {
            imgArrows[0].addEventListener('click', previousImage);
            imgArrows[1].addEventListener('click', nextImage);
        }

        updateVideoDisplay();
        populateAnimGallery();

        const animPrev = document.querySelector('.anim-arrow-prev');
        const animNext = document.querySelector('.anim-arrow-next');
        if (animPrev) animPrev.addEventListener('click', previousVideo);
        if (animNext) animNext.addEventListener('click', nextVideo);

        updateFilmDisplay();
        const filmPrev = document.querySelector('.film-arrow-prev');
        const filmNext = document.querySelector('.film-arrow-next');
        if (filmPrev) filmPrev.addEventListener('click', previousFilm);
        if (filmNext) filmNext.addEventListener('click', nextFilm);

        makeDraggable();
        addStampHighlight();

        // Position moon once after moon image loads
        const moonImg = document.querySelector('.right-moon');
        if (moonImg) {
            if (moonImg.complete) {
                positionElements();
            } else {
                moonImg.addEventListener('load', positionElements);
            }
        }

        positionElements();
    });

    // Recalculate on full page load (all images loaded = accurate offsetTops)
    window.addEventListener('load', positionElements);

    // On resize, redo everything
    window.addEventListener('resize', positionElements);

    // ===== STICKY NAV ON SCROLL =====
    const stickyNav = document.getElementById('stickyNav');
    const mainNav = document.querySelector('.navbar');

 window.addEventListener('scroll', () => {
    // Back to top visibility
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }

    // Back to top color: purple (#7c3aed) → orange (#e98111) based on scroll position
    const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const r = Math.round(124 + (233 - 124) * scrollProgress); // 124→233
    const g = Math.round(58  + (129 - 58)  * scrollProgress); // 58→129
    const b = Math.round(237 + (17  - 237) * scrollProgress); // 237→17
    backToTopBtn.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    // Sticky nav
    const navBottom = mainNav.offsetTop + mainNav.offsetHeight;
    if (window.scrollY > navBottom) {
        stickyNav.classList.add('visible');
    } else {
        stickyNav.classList.remove('visible');
    }
});