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
        display.style.backgroundImage = `url('${images[currentImageIndex].src}')`;
        display.style.backgroundSize = 'contain';
        display.style.backgroundPosition = 'center';
        display.style.backgroundRepeat = 'no-repeat';
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

// Add detailed information for each animation
const animationDetails = [
    {
        url: 'https://youtu.be/xO5sDt7_qN4',
        title: 'Walk Cycle',
        category: 'Character Animation',
        duration: '10 seconds',
        software: 'Adobe Animate'
    },
    {
        url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        title: 'Run Cycle',
        category: 'Character Animation',
        duration: '8 seconds',
        software: 'Toon Boom Harmony'
    },
    {
        url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
        title: 'Expressions',
        category: 'Character Animation',
        duration: '15 seconds',
        software: 'Procreate & After Effects'
    },
    {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Frog Loop',
        category: 'Short Loop',
        duration: '6 seconds loop',
        software: 'Adobe Animate'
    },
    {
        url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
        title: 'Nature Loop',
        category: 'Short Loop',
        duration: '10 seconds loop',
        software: 'After Effects'
    },
    {
        url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        title: '2025 Demo Reel',
        category: 'Demo Reel',
        duration: '90 seconds',
        software: 'Premiere Pro'
    },
    {
        url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
        title: '2024 Demo Reel',
        category: 'Demo Reel',
        duration: '75 seconds',
        software: 'Premiere Pro'
    }
];

    // ===== ANIMATIONS SECTION =====
    const animationCategories = [
        {
            section: 'Character Animations',
            videos: [
                { src: 'vids/GirlWalkCycle.gif', title: 'Girl Walk Cycle', thumbnail: 'vids/GirlWalkCycle.gif' },
                { src: 'vids/StoneLionRunCycle.gif', title: 'Stone Lion Run', thumbnail: 'vids/StoneLionRunCycle.gif' },
                { src: 'vids/WalkCycle.gif', title: 'Walk Cycle', thumbnail: 'vids/WalkCycle.gif' },
            ]
        },
        {
            section: 'Short Loops',
            videos: [
                { src: 'vids/walk4legged.gif', title: 'Walk 4 Legged', thumbnail: 'vids/walk4legged.gif' },
                { src: 'vids/walk4leggedfoxfixed (1).gif', title: 'Walk Fox Fixed', thumbnail: 'vids/walk4leggedfoxfixed (1).gif' },
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
        
        // Check if it's a GIF or video file
        if (fileExtension === 'gif') {
            videoPlaceholder.innerHTML = `
                <img src="${currentVideo.src}" alt="${currentVideo.title}" style="width: 100%; height: 100%; border-radius: 20px; object-fit: contain;">
            `;
        } else {
            videoPlaceholder.innerHTML = `
                <video width="100%" height="100%" controls style="border-radius: 20px;">
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

                const img = document.createElement('img');
                img.src = video.thumbnail;
                img.alt = video.title;

                const overlay = document.createElement('div');
                overlay.className = 'overlay';
                overlay.innerHTML = `
                    <div class="play-icon">
                        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <span>${video.title}</span>
                `;

                item.appendChild(img);
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
            });

            section.appendChild(grid);
            container.appendChild(section);
        });
    }

    // ===== FILMS SECTION =====
    const films = [
        {
            url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            title: 'FISHBOWL',
            description: 'A heartwarming story about a fish who dreams of exploring the world beyond his bowl. This animated short explores themes of curiosity, adventure, and finding your place in the world.',
            year: '2024',
            genre: 'Animation',
            duration: '5 min',
            process: [
                { step: 'Concept & Storyboarding', text: 'Started with sketches and mood boards to establish the visual style and narrative flow.' },
                { step: 'Character Design', text: 'Developed the main character through multiple iterations, focusing on expressive features.' },
                { step: 'Animation', text: 'Used frame-by-frame animation techniques in Adobe Animate for smooth, organic movement.' },
                { step: 'Sound Design', text: 'Collaborated with a composer to create an original score that enhances the emotional beats.' },
                { step: 'Post-Production', text: 'Color grading and final touches in After Effects to achieve the desired aesthetic.' }
            ]
        },
        {
            url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
            title: 'DREAMSCAPE',
            description: 'An experimental film exploring the surreal landscapes of the subconscious mind through abstract animation and vivid color palettes.',
            year: '2023',
            genre: 'Experimental',
            duration: '7 min',
            process: [
                { step: 'Research & Inspiration', text: 'Studied dream psychology and surrealist art movements to inform the visual direction.' },
                { step: 'Visual Development', text: 'Created digital paintings and color studies to establish the dreamlike atmosphere.' },
                { step: 'Animation Techniques', text: 'Combined 2D and experimental techniques including rotoscoping and digital painting.' },
                { step: 'Music Integration', text: 'Worked closely with electronic musicians to sync visuals with the soundscape.' }
            ]
        },
        {
            url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
            title: 'PAPER TRAILS',
            description: 'A stop-motion journey through a paper world where origami characters come to life and navigate the challenges of their fragile existence.',
            year: '2023',
            genre: 'Stop Motion',
            duration: '6 min',
            process: [
                { step: 'Paper Craft', text: 'Hand-folded over 200 origami pieces for characters and set pieces.' },
                { step: 'Set Construction', text: 'Built miniature sets using layered paper and cardboard to create depth.' },
                { step: 'Stop Motion Animation', text: 'Shot frame by frame over 3 weeks, capturing thousands of individual photographs.' },
                { step: 'Lighting Design', text: 'Experimented with backlighting to create shadows and emphasize the paper texture.' },
                { step: 'Final Edit', text: 'Assembled sequences and added subtle digital effects for transitions.' }
            ]
        }
    ];

    let currentFilmIndex = 0;

    function updateFilmDisplay() {
        const videoPlaceholder = document.querySelector('.video-placeholder-film');
        const filmTag = document.querySelector('.film-tag');
        const filmText = document.querySelector('.film-text');
        const filmMeta = document.querySelector('.film-meta');
        const processContent = document.querySelector('.process-content');

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
                <span class="meta-divider">•</span>
                <span>${currentFilm.genre}</span>
                <span class="meta-divider">•</span>
                <span>${currentFilm.duration}</span>
            `;
        }

        if (processContent) {
            processContent.innerHTML = '';
            currentFilm.process.forEach((item, index) => {
                const processItem = document.createElement('div');
                processItem.className = 'process-item';
                processItem.innerHTML = `
                    <div class="process-number">${index + 1}</div>
                    <div class="process-details">
                        <h5 class="process-step">${item.step}</h5>
                        <p class="process-text">${item.text}</p>
                    </div>
                `;
                processContent.appendChild(processItem);
            });
        }
    }

    function nextFilm() {
        currentFilmIndex = (currentFilmIndex + 1) % films.length;
        updateFilmDisplay();
    }

    function previousFilm() {
        currentFilmIndex = (currentFilmIndex - 1 + films.length) % films.length;
        updateFilmDisplay();
    }

    // ===== DRAGGABLE STAMPS =====
    function makeDraggable() {
        const stamps = document.querySelectorAll('.stamp');

        stamps.forEach(stamp => {
            let isDragging = false;
            let currentX, currentY, initialX, initialY;
            let xOffset = 0, yOffset = 0;

            stamp.addEventListener('mousedown', dragStart);
            stamp.addEventListener('touchstart', dragStart);
            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag);
            document.addEventListener('mouseup', dragEnd);
            document.addEventListener('touchend', dragEnd);

            function dragStart(e) {
                if (e.type === 'touchstart') {
                    initialX = e.touches[0].clientX - xOffset;
                    initialY = e.touches[0].clientY - yOffset;
                } else {
                    initialX = e.clientX - xOffset;
                    initialY = e.clientY - yOffset;
                }
                if (e.target === stamp || stamp.contains(e.target)) {
                    isDragging = true;
                    stamp.classList.add('dragging');
                }
            }

            function drag(e) {
                if (isDragging) {
                    e.preventDefault();
                    if (e.type === 'touchmove') {
                        currentX = e.touches[0].clientX - initialX;
                        currentY = e.touches[0].clientY - initialY;
                    } else {
                        currentX = e.clientX - initialX;
                        currentY = e.clientY - initialY;
                    }
                    xOffset = currentX;
                    yOffset = currentY;
                    stamp.style.transform = `translate(${currentX}px, ${currentY}px)`;
                }
            }

            function dragEnd() {
                if (isDragging) {
                    initialX = currentX;
                    initialY = currentY;
                    isDragging = false;
                    stamp.classList.remove('dragging');
                }
            }
        });
    }

    // ===== POSITION MOON AND SIDE DECORATIONS =====
   function positionElements() {
    const contact = document.querySelector('.contact-section');
    const moon = document.querySelector('.right-moon');
    const sides = document.querySelectorAll('.side-decoration-container');
    const footer = document.querySelector('.footer');

    if (!contact) return;

    // Reset contact margins first so offsetTop is accurate
    contact.style.marginLeft = '';
    contact.style.marginRight = '';
    contact.style.paddingLeft = '';
    contact.style.paddingRight = '';

    const contactTop = contact.offsetTop;
    
    const bodyStyle = window.getComputedStyle(document.body);
    const paddingLeft = parseInt(bodyStyle.paddingLeft) || 0;
    const paddingRight = parseInt(bodyStyle.paddingRight) || 0;

  // --- Moon: position just above the contact section with -100px offset ---
    let moonTop = contactTop;
    if (moon) {
        const moonH = moon.offsetHeight || 300;
        moonTop = contactTop - moonH + 90; // Slight overlap with contact
        moon.style.top = (moonTop - 100) + 'px'; // -100px offset to move it up
    }
    
    // --- Side decorations ---
    sides.forEach(s => {
        if (s.classList.contains('left')) {
            // Left side: Start below the sun, end just before contact section
            const sunImg = document.querySelector('.left-sun');
            const sunHeight = sunImg ? (sunImg.offsetHeight || 300) : 300;
            const topOffset = sunHeight + 20;
            s.style.top = topOffset + 'px';
            s.style.left = 10 + 'px';
            
            // End just before contact section starts
            s.style.height = (contactTop - topOffset - 80) + 'px';
            
        } else if (s.classList.contains('right')) {
            // Right side: Start from top, end just before the moon
            const topOffset = 10;
            s.style.top = topOffset + 'px';
            
            const moonImg = document.querySelector('.right-moon');
            if (moonImg) {
                const moonTopPos = parseInt(moonImg.style.top) || moonTop;
                const moonH = moonImg.offsetHeight || 300;
                // End at the top of the moon (no gap, just touch it)
                s.style.height = (moonTopPos - topOffset - 50) + 'px';
            } else {
                s.style.height = (contactTop - topOffset - 80) + 'px';
            }
        }
    });
    
    // --- Contact section: full viewport width ---
    contact.style.marginLeft = '-' + paddingLeft + 'px';
    contact.style.marginRight = '-' + paddingRight + 'px';
    contact.style.paddingLeft = (paddingLeft + 30) + 'px';
    contact.style.paddingRight = (paddingRight + 30) + 'px';

    // --- Footer: full viewport width ---
    if (footer) {
        footer.style.marginLeft = '-' + paddingLeft + 'px';
        footer.style.marginRight = '-' + paddingRight + 'px';
        footer.style.paddingLeft = (paddingLeft + 30) + 'px';
        footer.style.paddingRight = (paddingRight + 30) + 'px';
    }
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

        // Force recalculation after moon image loads
        const moonImg = document.querySelector('.right-moon');
        if (moonImg) {
            if (moonImg.complete) {
                positionElements();
            } else {
                moonImg.addEventListener('load', positionElements);
            }
        }

        // Initial position
        positionElements();
    });

    // Re-run on full page load and on resize
    window.addEventListener('load', positionElements);
    window.addEventListener('resize', positionElements);

    // ===== STICKY NAV ON SCROLL =====
const stickyNav = document.getElementById('stickyNav');
const mainNav = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const navBottom = mainNav.offsetTop + mainNav.offsetHeight;
    if (window.scrollY > navBottom) {
        stickyNav.classList.add('visible');
    } else {
        stickyNav.classList.remove('visible');
    }
});