// Game data
const gamesData = [
    {
        id: 1,
        title: "Cyber Warfare 2077",
        genre: "Action",
        rating: 4.8,
        image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        description: "Immerse yourself in a futuristic world of cyberpunk action and intense combat.",
        category: "action",
        featured: true
    },
    {
        id: 2,
        title: "Mystic Realms Online",
        genre: "RPG",
        rating: 4.9,
        image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        description: "Embark on an epic fantasy adventure in vast magical realms.",
        category: "rpg",
        featured: true
    },
    {
        id: 3,
        title: "Strategic Empire",
        genre: "Strategy",
        rating: 4.6,
        image: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        description: "Build your empire and conquer the world with strategic gameplay.",
        category: "strategy",
        featured: false
    },
    {
        id: 4,
        title: "Speed Racing Ultimate",
        genre: "Sports",
        rating: 4.7,
        image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        description: "Experience high-octane racing with stunning graphics and realistic physics.",
        category: "sports",
        featured: true
    },
    {
        id: 5,
        title: "Shadow Assassin",
        genre: "Action",
        rating: 4.5,
        image: "https://images.pexels.com/photos/1337247/pexels-photo-1337247.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        description: "Master the art of stealth and become the ultimate shadow warrior.",
        category: "action",
        featured: false
    },
    {
        id: 6,
        title: "Dragon Quest Legends",
        genre: "RPG",
        rating: 4.8,
        image: "https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        description: "Journey through mystical lands and battle legendary dragons.",
        category: "rpg",
        featured: false
    }
];

// Tournament data
const tournamentsData = [
    {
        id: 1,
        title: "Global Championship 2024",
        game: "Cyber Warfare 2077",
        prize: "$50,000",
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        participants: 1250,
        status: "active"
    },
    {
        id: 2,
        title: "RPG Masters Tournament",
        game: "Mystic Realms Online",
        prize: "$25,000",
        endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
        participants: 800,
        status: "active"
    },
    {
        id: 3,
        title: "Speed Demons Cup",
        game: "Speed Racing Ultimate",
        prize: "$15,000",
        endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
        participants: 650,
        status: "active"
    }
];

// Profile data
const profileData = {
    achievements: [
        { icon: "fas fa-trophy", title: "Tournament Winner", description: "Won first place in Speed Demons Cup" },
        { icon: "fas fa-star", title: "Rising Star", description: "Reached level 40 in under 2 months" },
        { icon: "fas fa-medal", title: "Combo Master", description: "Achieved 100 hit combo in Cyber Warfare" },
        { icon: "fas fa-crown", title: "Guild Leader", description: "Successfully led a guild to victory" }
    ],
    activities: [
        { icon: "fas fa-gamepad", title: "Played Cyber Warfare 2077", time: "2 hours ago", type: "game" },
        { icon: "fas fa-trophy", title: "Won a ranked match", time: "4 hours ago", type: "achievement" },
        { icon: "fas fa-users", title: "Joined RPG Masters Tournament", time: "1 day ago", type: "tournament" },
        { icon: "fas fa-star", title: "Leveled up to 42", time: "2 days ago", type: "level" },
        { icon: "fas fa-medal", title: "Earned new achievement", time: "3 days ago", type: "achievement" }
    ],
    favoriteGames: [1, 2, 4] // Game IDs
};

// Current page state
let currentPage = 'home';
let filteredGames = [...gamesData];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    showPage('home');
    setupEventListeners();
    startCounterAnimations();
    setupScrollToTop();
    loadFeaturedGames();
    loadAllGames();
    loadTournaments();
    loadProfile();
    startTournamentCountdowns();
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId + '-page').classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
    
    currentPage = pageId;
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Trigger specific page functions
    if (pageId === 'games') {
        loadAllGames();
    } else if (pageId === 'game-detail') {
        loadGameDetail(1); // Load featured game by default
    } else if (pageId === 'tournaments') {
        loadTournaments();
    } else if (pageId === 'profile') {
        loadProfile();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('game-search');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Filter buttons
    document.querySelectorAll('[data-filter]').forEach(button => {
        button.addEventListener('click', handleFilter);
    });
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
}

// Counter animations for stats
function startCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Scroll to top functionality
function setupScrollToTop() {
    const fab = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            fab.classList.add('visible');
        } else {
            fab.classList.remove('visible');
        }
    });
    
    fab.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Load featured games
function loadFeaturedGames() {
    const container = document.getElementById('featured-games-container');
    if (!container) return;
    
    const featuredGames = gamesData.filter(game => game.featured);
    
    container.innerHTML = featuredGames.map(game => createGameCard(game)).join('');
    
    // Add click listeners
    container.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = parseInt(card.dataset.gameId);
            loadGameDetail(gameId);
            showPage('game-detail');
        });
    });
}

// Load all games
function loadAllGames() {
    const container = document.getElementById('games-container');
    if (!container) return;
    
    container.innerHTML = filteredGames.map(game => createGameCard(game)).join('');
    
    // Add click listeners
    container.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = parseInt(card.dataset.gameId);
            loadGameDetail(gameId);
            showPage('game-detail');
        });
    });
}

// Create game card HTML
function createGameCard(game) {
    const stars = '★'.repeat(Math.floor(game.rating)) + '☆'.repeat(5 - Math.floor(game.rating));
    
    return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="game-card" data-game-id="${game.id}">
                <img src="${game.image}" alt="${game.title}" class="game-image">
                <div class="game-info">
                    <h3 class="game-title">${game.title}</h3>
                    <div class="game-genre">${game.genre}</div>
                    <div class="game-rating">
                        <span class="stars">${stars}</span>
                        <span>${game.rating}</span>
                    </div>
                    <p class="game-description">${game.description}</p>
                </div>
            </div>
        </div>
    `;
}

// Search functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    filteredGames = gamesData.filter(game => 
        game.title.toLowerCase().includes(searchTerm) ||
        game.genre.toLowerCase().includes(searchTerm) ||
        game.description.toLowerCase().includes(searchTerm)
    );
    loadAllGames();
}

// Filter functionality
function handleFilter(e) {
    const filterValue = e.target.dataset.filter;
    
    // Update active button
    document.querySelectorAll('[data-filter]').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter games
    if (filterValue === 'all') {
        filteredGames = [...gamesData];
    } else {
        filteredGames = gamesData.filter(game => game.category === filterValue);
    }
    
    loadAllGames();
}

// Load game detail
function loadGameDetail(gameId) {
    const game = gamesData.find(g => g.id === gameId);
    if (!game) return;
    
    const container = document.getElementById('game-detail-content');
    if (!container) return;
    
    const stars = '★'.repeat(Math.floor(game.rating)) + '☆'.repeat(5 - Math.floor(game.rating));
    
    container.innerHTML = `
        <div class="row">
            <div class="col-lg-6">
                <div class="game-detail-image">
                    <img src="${game.image}" alt="${game.title}" class="img-fluid rounded">
                </div>
            </div>
            <div class="col-lg-6">
                <div class="game-detail-info glass-card">
                    <h1 class="game-title gradient-text">${game.title}</h1>
                    <div class="game-genre mb-3">
                        <span class="badge bg-primary">${game.genre}</span>
                    </div>
                    <div class="game-rating mb-3">
                        <span class="stars">${stars}</span>
                        <span class="ms-2">${game.rating}/5.0</span>
                    </div>
                    <p class="game-description mb-4">${game.description}</p>
                    <div class="game-actions">
                        <button class="btn btn-primary glass-btn me-3">
                            <i class="fas fa-play me-2"></i>Play Now
                        </button>
                        <button class="btn btn-outline-light glass-btn me-3">
                            <i class="fas fa-heart me-2"></i>Add to Favorites
                        </button>
                        <button class="btn btn-outline-light glass-btn">
                            <i class="fas fa-share me-2"></i>Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-5">
            <div class="col-12">
                <div class="game-gallery glass-card">
                    <h3 class="mb-4">Screenshots</h3>
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" class="img-fluid rounded" alt="Screenshot 1">
                        </div>
                        <div class="col-md-4 mb-3">
                            <img src="https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" class="img-fluid rounded" alt="Screenshot 2">
                        </div>
                        <div class="col-md-4 mb-3">
                            <img src="https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" class="img-fluid rounded" alt="Screenshot 3">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load tournaments
function loadTournaments() {
    const container = document.getElementById('tournaments-container');
    if (!container) return;
    
    container.innerHTML = tournamentsData.map(tournament => createTournamentCard(tournament)).join('');
}

// Create tournament card HTML
function createTournamentCard(tournament) {
    return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="tournament-card">
                <div class="tournament-header">
                    <div>
                        <h3 class="tournament-title">${tournament.title}</h3>
                        <p class="mb-1">${tournament.game}</p>
                        <small class="text-muted">${tournament.participants} participants</small>
                    </div>
                    <div class="tournament-prize">${tournament.prize}</div>
                </div>
                
                <div class="tournament-countdown">
                    <div class="countdown-timer" data-end-date="${tournament.endDate.getTime()}">
                        <div class="countdown-item">
                            <span class="countdown-number days">00</span>
                            <span class="countdown-label">Days</span>
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-number hours">00</span>
                            <span class="countdown-label">Hours</span>
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-number minutes">00</span>
                            <span class="countdown-label">Minutes</span>
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-number seconds">00</span>
                            <span class="countdown-label">Seconds</span>
                        </div>
                    </div>
                    <p class="countdown-status">Tournament ends in:</p>
                </div>
                
                <div class="tournament-actions text-center">
                    <button class="btn btn-primary glass-btn me-2">
                        <i class="fas fa-play me-1"></i>Join Now
                    </button>
                    <button class="btn btn-outline-light glass-btn">
                        <i class="fas fa-info me-1"></i>Details
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Start tournament countdowns
function startTournamentCountdowns() {
    const countdownTimers = document.querySelectorAll('.countdown-timer');
    
    countdownTimers.forEach(timer => {
        const endDate = parseInt(timer.dataset.endDate);
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = endDate - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                timer.querySelector('.days').textContent = days.toString().padStart(2, '0');
                timer.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
                timer.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
                timer.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
            } else {
                timer.innerHTML = '<p class="text-center">Tournament Ended</p>';
            }
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
}

// Load profile
function loadProfile() {
    loadAchievements();
    loadActivity();
    loadFavoriteGames();
}

// Load achievements
function loadAchievements() {
    const container = document.getElementById('achievements-list');
    if (!container) return;
    
    container.innerHTML = profileData.achievements.map(achievement => `
        <div class="achievement-item">
            <div class="achievement-icon">
                <i class="${achievement.icon}"></i>
            </div>
            <div class="achievement-info">
                <h5>${achievement.title}</h5>
                <p>${achievement.description}</p>
            </div>
        </div>
    `).join('');
}

// Load activity
function loadActivity() {
    const container = document.getElementById('activity-list');
    if (!container) return;
    
    container.innerHTML = profileData.activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
}

// Load favorite games
function loadFavoriteGames() {
    const container = document.getElementById('favorite-games');
    if (!container) return;
    
    const favoriteGames = gamesData.filter(game => profileData.favoriteGames.includes(game.id));
    
    container.innerHTML = favoriteGames.map(game => `
        <div class="col-md-4 mb-3">
            <div class="favorite-game-card">
                <img src="${game.image}" alt="${game.title}" class="img-fluid rounded mb-2">
                <h6>${game.title}</h6>
                <small>${game.genre}</small>
            </div>
        </div>
    `).join('');
}

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add some interactive particle effects (optional enhancement)
function createParticleEffect() {
    const particles = document.createElement('div');
    particles.className = 'particles';
    document.body.appendChild(particles);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.7;
            animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            z-index: -1;
        `;
        particles.appendChild(particle);
    }
}

// Initialize particle effect
setTimeout(createParticleEffect, 2000);

// Add CSS for particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-10px) translateX(-10px); }
        75% { transform: translateY(-15px) translateX(5px); }
    }
`;
document.head.appendChild(particleStyle);