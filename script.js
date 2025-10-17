const App = {
    isLoggedIn: false,
    earnedBadges: [],
    
    badges: [
        { id: 1, icon: '🚴', name: 'Eco Cyclist', desc: 'Complete 5 bike trails', earned: false },
        { id: 2, icon: '🌿', name: 'Nature Explorer', desc: 'Visit 10 eco-destinations', earned: false },
        { id: 3, icon: '♻️', name: 'Zero Waste Warrior', desc: 'Use reusable items on 15 trips', earned: false },
        { id: 4, icon: '🏔️', name: 'Mountain Master', desc: 'Complete 20 hiking trails', earned: false },
        { id: 5, icon: '🌊', name: 'Ocean Guardian', desc: 'Join 5 beach cleanups', earned: false },
        { id: 6, icon: '⭐', name: 'Eco Champion', desc: 'Earn all sustainability badges', earned: false }
    ],

    init() {
        this.setupMobileMenu();
        this.setupModals();
        this.setupBadgeSystem();
        this.setupDestinations();
        this.setupJournal();
        this.setupLoginForm();
        this.checkLoginStatus();
    },

    setupMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const mobileNav = document.getElementById('mobileNav');

        if (menuToggle && mobileNav) {
            menuToggle.addEventListener('click', () => {
                mobileNav.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });

            document.querySelectorAll('.mobile-nav a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            });
        }
    },

    setupModals() {
        const badgeModal = document.getElementById('badgeModal');
        const loginModal = document.getElementById('loginModal');
        const closeButtons = document.querySelectorAll('.close');

        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (badgeModal) badgeModal.style.display = 'none';
                if (loginModal) loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        });

        window.addEventListener('click', (e) => {
            if (e.target === badgeModal) {
                badgeModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (badgeModal) badgeModal.style.display = 'none';
                if (loginModal) loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    },

    setupBadgeSystem() {
        const badgeIconBtn = document.getElementById('badgeIconBtn');
        const mobileBadgeBtn = document.getElementById('mobileBadgeBtn');
        const loginBtn = document.getElementById('loginBtn');

        if (badgeIconBtn) {
            badgeIconBtn.addEventListener('click', () => this.openBadgeModal());
        }

        if (mobileBadgeBtn) {
            mobileBadgeBtn.addEventListener('click', () => this.openBadgeModal());
        }

        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.openLoginModal());
        }

        const seeMoreBtn = document.getElementById('seeMoreBtn');
        const additionalActions = document.getElementById('additionalActions');

        if (seeMoreBtn && additionalActions) {
            seeMoreBtn.addEventListener('click', () => {
                additionalActions.classList.toggle('show');
                seeMoreBtn.classList.toggle('expanded');
                seeMoreBtn.innerHTML = additionalActions.classList.contains('show') 
                    ? 'See Less <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12 L6 8 L14 8 Z"/></svg>'
                    : 'See More Actions <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12 L6 8 L14 8 Z"/></svg>';
            });
        }

        this.updateBadgeCount();
    },

    openBadgeModal() {
        const badgeModal = document.getElementById('badgeModal');
        const badgesGrid = document.getElementById('badgesGrid');

        if (badgeModal && badgesGrid) {
            badgesGrid.innerHTML = '';
            
            this.badges.forEach(badge => {
                const badgeElement = document.createElement('div');
                badgeElement.className = `badge-item ${badge.earned ? 'earned' : 'locked'}`;
                badgeElement.innerHTML = `
                    <div class="badge-icon">${badge.icon}</div>
                    <h3>${badge.name}</h3>
                    <p>${badge.desc}</p>
                    <span class="badge-status">${badge.earned ? 'Earned' : 'Locked'}</span>
                `;
                badgesGrid.appendChild(badgeElement);
            });

            badgeModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    },

    openLoginModal() {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    },

    setupLoginForm() {
        const loginForm = document.getElementById('loginForm');
        const journalLoginBtn = document.getElementById('journalLoginBtn');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        if (journalLoginBtn) {
            journalLoginBtn.addEventListener('click', () => {
                this.openLoginModal();
            });
        }

        const showSignup = document.getElementById('showSignup');
        if (showSignup) {
            showSignup.addEventListener('click', (e) => {
                e.preventDefault();
                this.showNotification('Sign up feature coming soon! For demo, use the login button.', 'warning');
            });
        }
    },

    handleLogin() {
        const email = document.querySelector('#loginForm input[type="email"]').value;
        
        if (!email) {
            this.showNotification('Please enter your email', 'warning');
            return;
        }

        this.isLoggedIn = true;
        
        this.badges[0].earned = true;
        this.badges[1].earned = true;
        this.badges[2].earned = true;

        this.updateBadgeCount();
        
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        this.showJournalForm();
        
        this.showNotification('Welcome back! You have 3 sustainability badges!', 'success');
        
        setTimeout(() => {
            if (window.location.pathname.includes('home.html') || window.location.pathname.endsWith('/')) {
                this.showNotification('Click the badge icon to view your achievements', 'success');
            }
        }, 3000);
    },

    updateBadgeCount() {
        const earnedCount = this.badges.filter(b => b.earned).length;
        const badgeCountElements = document.querySelectorAll('.badge-count');
        
        badgeCountElements.forEach(element => {
            element.textContent = earnedCount;
            element.style.display = earnedCount > 0 ? 'flex' : 'none';
        });
    },

    checkLoginStatus() {
        if (this.isLoggedIn) {
            this.showJournalForm();
        }
    },

    showJournalForm() {
        const authMessage = document.getElementById('authMessage');
        const journalForm = document.getElementById('journalForm');

        if (authMessage && journalForm) {
            authMessage.style.display = 'none';
            journalForm.style.display = 'block';
        }
    },

    setupDestinations() {
        const categoryItems = document.querySelectorAll('.category-item');
        const destinationCards = document.querySelectorAll('.destination-card');

        categoryItems.forEach(item => {
            item.addEventListener('click', () => {
                categoryItems.forEach(cat => cat.classList.remove('active'));
                item.classList.add('active');

                const category = item.getAttribute('data-category');
                
                destinationCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    card.style.transition = 'all 0.3s ease';
                    
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.performSearch();
            });
        }

        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });

            searchInput.addEventListener('input', (e) => {
                if (e.target.value === '') {
                    destinationCards.forEach(card => {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                    });
                }
            });
        }

        const cardButtons = document.querySelectorAll('.card-btn');
        cardButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = e.target.closest('.destination-card');
                const title = card.querySelector('h3').textContent;
                const description = card.querySelector('p').textContent;
                
                this.showDestinationDetail(title, description);
            });
        });
    },

    showDestinationDetail(title, description) {
        const detailsInfo = {
            'Marlboro Hills': 'Best time to visit: Early morning (5-7 AM) for sunrise. Entry fee: ₱50. Accessible by tricycle or bike from Basco town center (15 mins).',
            'Valugan Boulder Beach': 'Location: Basco, 20 minutes from town center. Free entry. Best during low tide. Bring sun protection and water.',
            'Chavayan Village': 'Located in Sabtang Island. Requires boat ride (₱1,500-2,000 roundtrip). Village tour guided by locals. Respect the traditional houses.',
            'Basco Lighthouse (Naidi Hills)': 'Entry: ₱20. Open daily 6 AM - 6 PM. Best at sunset. 5-minute drive from Basco town. Steep climb to the top.',
            'Fundacion Pacita': 'Boutique lodge with restaurant. Room rates: ₱4,000-8,000/night. Book in advance. Features art gallery and stunning views.',
            'Ivatan Homestays': 'Rates: ₱800-1,500/night. Direct booking through local tourism office or online platforms. Meals often included.',
            'Racuh a Payaman (Marlboro Country)': 'Entry: ₱50. Open sunrise to sunset. 10 minutes from Basco. Respect grazing cattle and stay on designated paths.',
            'Vayang Rolling Hills': 'Free entry. Best at sunrise. Located along the north road of Basco. Popular picnic and photography spot.',
            'Honesty Coffee Shop': 'Open 24/7 unmanned. Coffee ₱10-20, snacks available. Drop payment in the box. Shows Batanes\' culture of honesty.',
            'Alapad Rock Formation': 'Located in Mahatao. Best during low tide. Free entry. Be careful on slippery rocks. Bring waterproof footwear.',
            'Sabtang Island': 'Ferry from Radiwan Port, Ivana (30-45 mins). Fare: ₱150-200 roundtrip. Tours available. Must try: traditional falowa boats.',
            'Chamantad-Tinyan Viewpoint': 'Located in Uyugan. Free entry. Best time: Clear mornings. Offers views of Mt. Iraya and Pacific Ocean.',
            'San Carlos Borromeo Church': 'Historic church built 1787. Free entry. Respectful attire required. Mass schedules available. Beautiful coral stone architecture.',
            'Homoron Blue Lagoon': 'Sabtang Island. Best during calm weather. Free entry. Bring swimming gear. Local guides available for safety.',
            'Mount Iraya': 'Climbing permit required from Basco local government (₱500-1,000). 4-6 hour ascent. Guide mandatory. Physical fitness required.'
        };

        const additionalInfo = detailsInfo[title] || 'For more information, please contact the Batanes Tourism Office or visit their official website.';

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="this.closest('.modal').remove(); document.body.style.overflow='auto';">&times;</span>
                <h2>${title}</h2>
                <p class="modal-subtitle">${description}</p>
                <div style="margin-top: 25px; padding: 20px; background-color: #f0f7ed; border-radius: 12px; line-height: 1.8;">
                    <h3 style="color: #2d5016; margin-bottom: 15px; font-size: 18px;">Visitor Information</h3>
                    <p style="color: #5a5a5a;">${additionalInfo}</p>
                </div>
                <div style="margin-top: 25px; text-align: center;">
                    <button onclick="this.closest('.modal').remove(); document.body.style.overflow='auto';" 
                            style="background-color: #4a7c3a; color: white; border: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        Close
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = 'auto';
            }
        });
    },

    performSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === '') {
            this.showNotification('Please enter a search term', 'warning');
            return;
        }

        const destinationCards = document.querySelectorAll('.destination-card');
        let foundResults = 0;

        destinationCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                foundResults++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        if (foundResults === 0) {
            this.showNotification(`No results found for "${searchTerm}". Try: Marlboro, Sabtang, lighthouse, beach, village`, 'error');
        } else {
            this.showNotification(`Found ${foundResults} destination${foundResults > 1 ? 's' : ''} matching "${searchTerm}"`, 'success');
        }
    },

    showNotification(message, type) {
        const existingNotif = document.querySelector('.notification');
        if (existingNotif) existingNotif.remove();

        const colors = {
            success: '#4a7c3a',
            error: '#e74c3c',
            warning: '#f39c12'
        };

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background-color: ${colors[type]};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
            font-weight: 500;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    },

    setupJournal() {
        const journalForm = document.getElementById('journalForm');
        const fileUpload = document.getElementById('fileUpload');
        const fileNames = document.getElementById('fileNames');

        if (fileUpload && fileNames) {
            fileUpload.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    const names = Array.from(e.target.files).map(f => f.name).join(', ');
                    fileNames.textContent = names.length > 50 ? names.substring(0, 50) + '...' : names;
                    this.showNotification(`${e.target.files.length} photo${e.target.files.length > 1 ? 's' : ''} selected`, 'success');
                } else {
                    fileNames.textContent = 'Click to upload or drag photos here';
                }
            });
        }

        if (journalForm) {
            journalForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(journalForm);
                const location = formData.get('location');
                const story = formData.get('story');
                
                if (!location || !story) {
                    this.showNotification('Please fill in all required fields', 'warning');
                    return;
                }

                this.showNotification('Publishing your story...', 'success');
                
                setTimeout(() => {
                    this.showNotification('Your eco-journey story has been published! Thank you for sharing.', 'success');
                    
                    journalForm.reset();
                    if (fileNames) {
                        fileNames.textContent = 'Click to upload or drag photos here';
                    }

                    if (!this.badges[1].earned) {
                        this.badges[1].earned = true;
                        this.updateBadgeCount();
                        setTimeout(() => {
                            this.showNotification('🎉 Badge Unlocked: Nature Explorer!', 'success');
                        }, 1000);
                    }

                    setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 1500);
                }, 1000);
            });
        }

        const readMoreButtons = document.querySelectorAll('.read-more-btn');
        readMoreButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = e.target.closest('.story-card');
                const title = card.querySelector('h3').textContent;
                const author = card.querySelector('h4').textContent;
                const story = card.querySelector('.story-content > p').textContent;
                
                this.showStoryDetail(title, author, story);
            });
        });
    },

    showStoryDetail(title, author, preview) {
        const fullStories = {
            'Cycling Through Paradise': `My journey through Batanes by bicycle was transformative. Every morning, I'd wake up at 5 AM to catch the sunrise at Marlboro Hills. The cool morning breeze, the sound of waves crashing against the cliffs, and the endless green hills made every pedal worth it.

I chose to bike instead of renting a car because I wanted to truly experience the island at its own pace. The locals were incredibly supportive, often stopping to offer water or directions. One day, an elderly Ivatan offered me fresh coconut juice and shared stories about how the island has changed over the years.

The best part? No carbon emissions, just pure human power exploring one of the most beautiful places on Earth. I covered over 100 kilometers in 5 days, visiting every corner of Batan Island. My legs were sore, but my heart was full.

Tips for future eco-cyclists: Bring plenty of water, start early to avoid midday heat, respect the cattle on the roads, and always carry a repair kit. The hills are challenging but incredibly rewarding.`,

            'Living with Local Families': `Staying in an Ivatan homestay wasn't just accommodation—it was a cultural immersion that changed my perspective on sustainable living. The family I stayed with, the Valientes, welcomed me like their own child.

They taught me how to prepare traditional Ivatan dishes using locally sourced ingredients. We'd wake up early to harvest vegetables from their garden, catch fresh fish from the sea, and prepare meals together. Zero waste wasn't a trend here—it was a way of life.

The traditional stone house stayed naturally cool even during hot afternoons, eliminating the need for air conditioning. Rainwater was collected and used efficiently. Solar panels powered essential appliances. Everything had a purpose, nothing was wasted.

What struck me most was their deep respect for nature. Before any activity, they'd pray and thank the land. They explained that Batanes' beauty exists because generations have protected it. This isn't just tourism—it's education in the purest form.

I left with recipes, friendship, and a completely new understanding of sustainable living. The money I paid went directly to the family, supporting local economy in the most direct way possible.`,

            'Zero Waste Journey': `I challenged myself to produce absolutely zero waste during my 7-day Batanes trip. Ambitious? Yes. Possible? Absolutely.

Preparation was key. I brought: stainless steel water bottle, bamboo utensils, cloth bags, beeswax food wraps, solid shampoo bars, bamboo toothbrush, and reusable containers. My backpack was my zero-waste kit.

The locals were fascinated by my commitment. Restaurant owners gladly served food directly into my containers. The Honesty Coffee Shop became my favorite spot—I'd bring my own cup for coffee. Market vendors were thrilled I brought cloth bags instead of asking for plastic.

Challenges? Definitely. Finding package-free snacks required creativity. I opted for fresh fruits from local vendors, carried homemade trail mix, and bought fresh bread wrapped in my own cloth. Hotel toiletries? I declined and used my solid bars.

The result? After 7 days, I had accumulated only a small handful of unavoidable waste—mostly receipts and one emergency band-aid wrapper. Everything else was either reused, composted with permission from my homestay, or simply avoided.

The experience taught me that zero waste travel isn't just possible—it's liberating. You become more creative, connect deeper with locals, and leave only footprints. Batanes deserves nothing less.`
        };

        const fullStory = fullStories[title] || `${preview}\n\nThis is a preview of ${author}'s story. The full story contains detailed accounts of their sustainable practices, tips for eco-conscious travelers, and beautiful descriptions of Batanes' pristine landscapes. Join our community and log in to read complete stories and share your own eco-journey experiences.`;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <span class="close" onclick="this.closest('.modal').remove(); document.body.style.overflow='auto';">&times;</span>
                <div style="margin-bottom: 20px;">
                    <h2 style="color: #2d5016; margin-bottom: 10px;">${title}</h2>
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                        <div style="width: 45px; height: 45px; border-radius: 50%; background-color: #4a7c3a; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 18px;">
                            ${author.charAt(0)}
                        </div>
                        <div>
                            <h4 style="color: #2d5016; margin: 0; font-size: 16px;">${author}</h4>
                            <span style="color: #5a5a5a; font-size: 13px;">Eco-conscious traveler</span>
                        </div>
                    </div>
                </div>
                <div style="max-height: 60vh; overflow-y: auto; padding-right: 10px;">
                    <p style="color: #5a5a5a; line-height: 1.9; white-space: pre-line; text-align: justify;">
                        ${fullStory}
                    </p>
                </div>
                <div style="margin-top: 25px; padding-top: 20px; border-top: 2px solid #f0f7ed; text-align: center;">
                    <button onclick="this.closest('.modal').remove(); document.body.style.overflow='auto';" 
                            style="background-color: #4a7c3a; color: white; border: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s;"
                            onmouseover="this.style.backgroundColor='#2d5016'"
                            onmouseout="this.style.backgroundColor='#4a7c3a'">
                        Close Story
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = 'auto';
            }
        });
    }
};

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});