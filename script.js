// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // GitHub API 설정
    const GITHUB_USERNAME = 'Azabell1993';
    const GITHUB_API_BASE = 'https://api.github.com';
    // 정적 레포지토리 데이터 (fallback용)
    const fallbackRepoData = [
        {
            name: "azabell1993.github.io",
            description: "개인 포트폴리오 웹사이트",
            html_url: "https://github.com/Azabell1993/azabell1993.github.io",
            language: "HTML",
            stargazers_count: 0,
            forks_count: 0,
            updated_at: "2024-12-01T00:00:00Z",
            private: false
        },
        {
            name: "ClangGrammar",
            description: "C언어 문법 학습 프로젝트",
            html_url: "https://github.com/Azabell1993/ClangGrammar",
            language: "C",
            stargazers_count: 2,
            forks_count: 1,
            updated_at: "2024-11-15T00:00:00Z",
            private: false
        },
        {
            name: "Rust_study",
            description: "Rust 프로그래밍 언어 학습",
            html_url: "https://github.com/Azabell1993/Rust_study",
            language: "Rust",
            stargazers_count: 1,
            forks_count: 0,
            updated_at: "2024-10-20T00:00:00Z",
            private: false
        }
    ];

    // 정적 사용자 데이터 (fallback용)
    const fallbackUserData = {
        login: "Azabell1993",
        avatar_url: "https://avatars.githubusercontent.com/u/username",
        public_repos: 25,
        followers: 10,
        following: 15
    };

    // GitHub API 호출 함수
    async function fetchGitHubData(endpoint) {
        try {
            const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Azabell1993-Portfolio'
                }
            });
            if (!response.ok) {
                console.error(`GitHub API Error: ${response.status} ${response.statusText}`);
                if (response.status === 403) {
                    console.warn('GitHub API Rate Limit 도달. 1시간 후 다시 시도해주세요.');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('GitHub API 호출 실패:', error);
            return null;
        }
    }

    // 사용자 정보 로드
    async function loadUserInfo() {
        try {
            const userData = await fetchGitHubData(`/users/${GITHUB_USERNAME}`);
            const data = userData || fallbackUserData;
            
            document.getElementById('repoCount').textContent = data.public_repos || '-';
            document.getElementById('followerCount').textContent = data.followers || '-';
            document.getElementById('followingCount').textContent = data.following || '-';
            
            // 프로필 이미지 업데이트
            const profileImg = document.getElementById('profileImg');
            if (data.avatar_url && data.avatar_url !== fallbackUserData.avatar_url) {
                profileImg.src = data.avatar_url;
            }
            
            if (!userData) {
                console.warn('GitHub API 사용 불가. 정적 데이터를 사용합니다.');
            }
            
        } catch (error) {
            console.error('사용자 정보 로드 실패:', error);
            // 완전 실패시 fallback 데이터 사용
            document.getElementById('repoCount').textContent = fallbackUserData.public_repos;
            document.getElementById('followerCount').textContent = fallbackUserData.followers;
            document.getElementById('followingCount').textContent = fallbackUserData.following;
        }
    }

    // 홈 대시보드 데이터 로드
    let homeCommits = [];
    let homeCurrentPage = 1;
    const homeCommitsPerPage = 3;

    async function loadHomeDashboard() {
        // 모든 데이터를 병렬로 로드
        await Promise.all([
            loadHomeCommits(),
            loadHomeGithubRepos(),
            loadHomeGallery()
        ]);
    }

    // 홈 - 최근 커밋 로드
    async function loadHomeCommits() {
        const repos = await fetchGitHubData(`/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`);
        const container = document.getElementById('homePostsContainer');
        
        if (!repos || repos.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #8e8e8e; padding: 30px;">최근 활동을 불러올 수 없습니다.</p>';
            return;
        }

        // 모든 커밋 데이터 수집
        homeCommits = [];
        for (const repo of repos.slice(0, 10)) {
            const commits = await fetchGitHubData(`/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=2`);
            if (commits && commits.length > 0) {
                commits.forEach(commit => {
                    homeCommits.push({
                        repo: repo,
                        commit: commit,
                        date: new Date(commit.commit.author.date)
                    });
                });
            }
        }

        // 날짜순 정렬
        homeCommits.sort((a, b) => b.date - a.date);
        
        displayHomeCommits(1);
    }

    // 홈 커밋 표시
    function displayHomeCommits(page) {
        const container = document.getElementById('homePostsContainer');
        const totalPages = Math.ceil(homeCommits.length / homeCommitsPerPage);
        const startIndex = (page - 1) * homeCommitsPerPage;
        const endIndex = startIndex + homeCommitsPerPage;
        const currentCommits = homeCommits.slice(startIndex, endIndex);

        container.innerHTML = '';

        currentCommits.forEach(item => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';
            
            const timeAgo = getTimeAgo(item.date);
            
            postCard.innerHTML = `
                <div class="post-header">
                    <img src="${userData?.avatar_url || 'https://via.placeholder.com/40/4A90E2/FFFFFF?text=A'}" alt="Profile">
                    <div>
                        <h4>${GITHUB_USERNAME}</h4>
                        <span>${timeAgo}</span>
                    </div>
                </div>
                <div class="post-content">
                    <p>${item.commit.commit.message} 🚀</p>
                    <div class="post-image">
                        <div class="code-preview">
                            <span>// ${item.repo.name} - ${item.repo.language || 'Mixed Languages'}</span>
                            ${item.repo.description ? `<br><span style="opacity: 0.7;">${item.repo.description}</span>` : ''}
                        </div>
                    </div>
                    <div style="margin-top: 10px;">
                        <a href="${item.repo.html_url}" target="_blank" style="color: #4A90E2; text-decoration: none;">
                            <i class="fab fa-github"></i> 레포지토리 보기
                        </a>
                    </div>
                </div>
            `;
            
            container.appendChild(postCard);
        });

        // 페이징 업데이트
        updateHomePagination(page, totalPages);
    }

    // 홈 페이징 업데이트
    function updateHomePagination(page, totalPages) {
        const prevBtn = document.getElementById('homePrevBtn');
        const nextBtn = document.getElementById('homeNextBtn');
        const currentPageSpan = document.getElementById('homeCurrentPage');
        const totalPagesSpan = document.getElementById('homeTotalPages');
        const pagination = document.getElementById('homePagination');

        homeCurrentPage = page;
        currentPageSpan.textContent = page;
        totalPagesSpan.textContent = totalPages;

        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === totalPages;
        
        pagination.style.display = totalPages > 1 ? 'flex' : 'none';
    }

    // 홈 - GitHub 레포 5개 로드
    async function loadHomeGithubRepos() {
        const repos = await fetchGitHubData(`/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=5`);
        const container = document.getElementById('homeGithubContainer');
        
        // API 실패시 fallback 데이터 사용
        const reposData = repos || fallbackRepoData.slice(0, 5);
        
        if (!reposData || reposData.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #8e8e8e; padding: 30px;">레포지토리를 불러올 수 없습니다.</p>';
            return;
        }

        if (!repos) {
            console.warn('GitHub API 사용 불가. 정적 레포지토리 데이터를 사용합니다.');
        }

        container.innerHTML = '';

        reposData.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'repo-card compact';
            
            const languageColors = {
                'JavaScript': '#f1e05a',
                'TypeScript': '#2b7489',
                'Python': '#3572A5',
                'Java': '#b07219',
                'C': '#555555',
                'C++': '#f34b7d',
                'HTML': '#e34c26',
                'CSS': '#563d7c',
                'Shell': '#89e051',
                'Go': '#00ADD8',
                'Rust': '#dea584',
                'PHP': '#4F5D95',
                'Swift': '#ffac45',
                'Kotlin': '#A97BFF',
                'Dart': '#00B4AB'
            };
            
            const updatedDate = new Date(repo.updated_at);
            const timeAgo = getTimeAgo(updatedDate);
            
            repoCard.innerHTML = `
                <div class="repo-header">
                    <div>
                        <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
                        <span class="repo-visibility">${repo.private ? 'Private' : 'Public'}</span>
                    </div>
                </div>
                ${repo.description ? `<p class="repo-description">${repo.description}</p>` : ''}
                <div class="repo-stats">
                    ${repo.language ? `
                        <div class="repo-stat">
                            <span class="language-color" style="background-color: ${languageColors[repo.language] || '#8e8e8e'}"></span>
                            ${repo.language}
                        </div>
                    ` : ''}
                    <div class="repo-stat">
                        <i class="fas fa-star"></i>
                        ${repo.stargazers_count}
                    </div>
                    <div class="repo-stat">
                        <i class="fas fa-code-branch"></i>
                        ${repo.forks_count}
                    </div>
                </div>
                <div class="repo-updated">Updated ${timeAgo}</div>
            `;
            
            container.appendChild(repoCard);
        });
    }

    // 홈 - 갤러리 5개 로드
    async function loadHomeGallery() {
        const container = document.getElementById('homeGalleryContainer');
        
        try {
            // 갤러리 데이터가 로드되어 있지 않으면 로드
            if (galleryImages.length === 0) {
                await loadGalleryImagesData();
            }
            
            // 랜덤하게 5개 선택
            const shuffled = [...galleryImages].sort(() => 0.5 - Math.random());
            const selectedImages = shuffled.slice(0, 5);
            
            container.innerHTML = selectedImages.map(image => `
                <div class="gallery-item compact">
                    <img src="${image.path}" alt="${image.title}" onerror="this.style.display='none'">
                    <div class="gallery-overlay">
                        <p>${image.title}</p>
                        <span class="category-tag">${getCategoryKoreanName(image.category)}</span>
                    </div>
                </div>
            `).join('');
            
            // 이미지 클릭 이벤트 설정
            setupHomeGalleryEvents();
            
        } catch (error) {
            console.error('홈 갤러리 로드 실패:', error);
            container.innerHTML = '<p style="text-align: center; color: #8e8e8e; padding: 30px;">갤러리를 불러올 수 없습니다.</p>';
        }
    }

    // 갤러리 데이터만 로드 (실제 표시는 하지 않음)
    async function loadGalleryImagesData() {
        const galleryData = {
            anatomy: [
                { file: '다리.jpg', title: '다리 해부도' },
                { file: '몸통.jpg', title: '몸통 해부도' },
                { file: '팔.jpg', title: '팔 해부도' }
            ],
            comic: [
                { file: '베놈.jpg', title: '베놈 드로잉 #1' },
                { file: '베놈2.jpg', title: '베놈 드로잉 #2' },
                { file: '베인.jpg', title: '베인 드로잉' },
                { file: '베트맨.jpg', title: '배트맨 드로잉' },
                { file: '카니지.jpg', title: '카니지 일러스트' }
            ],
            person: [
                { file: '소녀.jpg', title: '소녀 드로잉 #1' },
                { file: '소녀2.jpg', title: '소녀 드로잉 #2' },
                { file: '소녀3.jpg', title: '소녀 드로잉 #3' },
                { file: '유튜버 주깡깡.jpg', title: '유튜버 주깡깡 팬아트' },
                { file: '인물화.jpg', title: '인물화 연습' },
                { file: '인물화2.jpg', title: '인물화 스터디' }
            ],
            cad: [
                { file: 'AutoCAD.jpg', title: 'AutoCAD 도면 작업' }
            ]
        };
        
        galleryImages = [];
        Object.keys(galleryData).forEach(category => {
            galleryData[category].forEach(image => {
                galleryImages.push({
                    ...image,
                    category: category,
                    path: `gallery/${category}/${image.file}`
                });
            });
        });
    }

    // 홈 갤러리 이벤트 설정
    function setupHomeGalleryEvents() {
        const galleryItems = document.querySelectorAll('#homeGalleryContainer .gallery-item img');
        galleryItems.forEach(img => {
            img.addEventListener('click', function() {
                if (this.style.display === 'none') return;
                
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    cursor: pointer;
                `;
                
                const modalImg = document.createElement('img');
                modalImg.src = this.src;
                modalImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                `;
                
                modal.appendChild(modalImg);
                document.body.appendChild(modal);
                
                modal.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
                
                const handleEsc = (e) => {
                    if (e.key === 'Escape') {
                        document.body.removeChild(modal);
                        document.removeEventListener('keydown', handleEsc);
                    }
                };
                document.addEventListener('keydown', handleEsc);
            });
        });
    }

    // GitHub 레포지토리 로드
    let allRepos = []; // 모든 레포지토리 저장
    let currentPage = 1;
    const reposPerPage = 9; // 한 페이지당 보여줄 레포 수

    async function loadGitHubRepos(page = 1) {
        const githubContainer = document.getElementById('githubRepos');
        const pagination = document.getElementById('pagination');
        
        // 첫 번째 로드인 경우 모든 레포지토리 가져오기
        if (allRepos.length === 0) {
            githubContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i><p>GitHub 레포지토리를 불러오는 중...</p></div>';
            
            // 모든 레포지토리를 가져오기 위해 여러 페이지 요청
            let allReposData = [];
            let pageNum = 1;
            let usesFallback = false;
            
            try {
                while (true) {
                    const repos = await fetchGitHubData(`/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&page=${pageNum}`);
                    if (!repos) {
                        // API 실패시 fallback 데이터 사용
                        if (pageNum === 1) {
                            allReposData = fallbackRepoData;
                            usesFallback = true;
                            console.warn('GitHub API 사용 불가. 정적 레포지토리 데이터를 사용합니다.');
                        }
                        break;
                    }
                    if (repos.length === 0) break;
                    allReposData = allReposData.concat(repos);
                    if (repos.length < 100) break; // 마지막 페이지
                    pageNum++;
                }
                
                allRepos = allReposData;
                
                // 총 레포지토리 수 업데이트
                document.getElementById('totalRepoCount').textContent = allRepos.length;
                
                if (usesFallback) {
                    // fallback 사용시 사용자에게 알림
                    const notice = document.createElement('div');
                    notice.style.cssText = `
                        background: #fff3cd;
                        color: #856404;
                        padding: 10px;
                        margin-bottom: 15px;
                        border-radius: 5px;
                        text-align: center;
                        font-size: 14px;
                    `;
                    notice.innerHTML = '<i class="fas fa-info-circle"></i> GitHub API 일시 사용 불가로 샘플 데이터를 표시합니다.';
                    githubContainer.parentNode.insertBefore(notice, githubContainer);
                }
                
            } catch (error) {
                console.error('레포지토리 로드 실패:', error);
                allRepos = fallbackRepoData;
                document.getElementById('totalRepoCount').textContent = allRepos.length;
            }
        }

        if (allRepos.length === 0) {
            githubContainer.innerHTML = '<p style="text-align: center; color: #8e8e8e; padding: 40px;">레포지토리를 불러올 수 없습니다.</p>';
            return;
        }

        // 페이징 계산
        const totalPages = Math.ceil(allRepos.length / reposPerPage);
        const startIndex = (page - 1) * reposPerPage;
        const endIndex = startIndex + reposPerPage;
        const currentRepos = allRepos.slice(startIndex, endIndex);

        // 레포지토리 카드 렌더링
        githubContainer.innerHTML = '';

        currentRepos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'repo-card';
            
            const languageColors = {
                'JavaScript': '#f1e05a',
                'TypeScript': '#2b7489',
                'Python': '#3572A5',
                'Java': '#b07219',
                'C': '#555555',
                'C++': '#f34b7d',
                'HTML': '#e34c26',
                'CSS': '#563d7c',
                'Shell': '#89e051',
                'Go': '#00ADD8',
                'Rust': '#dea584',
                'PHP': '#4F5D95',
                'Swift': '#ffac45',
                'Kotlin': '#A97BFF',
                'Dart': '#00B4AB'
            };
            
            const updatedDate = new Date(repo.updated_at);
            const timeAgo = getTimeAgo(updatedDate);
            
            repoCard.innerHTML = `
                <div class="repo-header">
                    <div>
                        <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
                        <span class="repo-visibility">${repo.private ? 'Private' : 'Public'}</span>
                    </div>
                </div>
                ${repo.description ? `<p class="repo-description">${repo.description}</p>` : ''}
                <div class="repo-stats">
                    ${repo.language ? `
                        <div class="repo-stat">
                            <span class="language-color" style="background-color: ${languageColors[repo.language] || '#8e8e8e'}"></span>
                            ${repo.language}
                        </div>
                    ` : ''}
                    <div class="repo-stat">
                        <i class="fas fa-star"></i>
                        ${repo.stargazers_count}
                    </div>
                    <div class="repo-stat">
                        <i class="fas fa-code-branch"></i>
                        ${repo.forks_count}
                    </div>
                </div>
                <div class="repo-updated">Updated ${timeAgo}</div>
            `;
            
            githubContainer.appendChild(repoCard);
        });

        // 페이징 UI 업데이트
        updatePagination(page, totalPages);
        
        // 페이징 보이기
        pagination.style.display = totalPages > 1 ? 'flex' : 'none';
    }

    // 페이징 UI 업데이트
    function updatePagination(page, totalPages) {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const currentPageSpan = document.getElementById('currentPage');
        const totalPagesSpan = document.getElementById('totalPages');

        currentPage = page;
        currentPageSpan.textContent = page;
        totalPagesSpan.textContent = totalPages;

        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === totalPages;
    }

    // 페이징 이벤트 리스너
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            loadGitHubRepos(currentPage - 1);
            // 페이지 상단으로 스크롤
            document.getElementById('github').scrollIntoView({ behavior: 'smooth' });
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        const totalPages = Math.ceil(allRepos.length / reposPerPage);
        if (currentPage < totalPages) {
            loadGitHubRepos(currentPage + 1);
            // 페이지 상단으로 스크롤
            document.getElementById('github').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // 홈 페이징 이벤트
    document.getElementById('homePrevBtn').addEventListener('click', () => {
        if (homeCurrentPage > 1) {
            displayHomeCommits(homeCurrentPage - 1);
        }
    });

    document.getElementById('homeNextBtn').addEventListener('click', () => {
        const totalPages = Math.ceil(homeCommits.length / homeCommitsPerPage);
        if (homeCurrentPage < totalPages) {
            displayHomeCommits(homeCurrentPage + 1);
        }
    });

    // 더보기 버튼 이벤트
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-more')) {
            e.preventDefault();
            const targetTab = e.target.getAttribute('data-tab');
            
            // 네비게이션 업데이트
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // 타겟 탭 활성화
            const targetNavItem = document.querySelector(`[data-tab="${targetTab}"]`);
            const targetContent = document.getElementById(targetTab);
            
            if (targetNavItem && targetContent) {
                targetNavItem.classList.add('active');
                targetContent.classList.add('active');
                
                // 필요시 데이터 로드
                if (targetTab === 'github') {
                    loadGitHubRepos();
                } else if (targetTab === 'gallery') {
                    if (galleryImages.length === 0) {
                        loadGalleryImages();
                    }
                }
            }
        }
    });

    // 시간 차이 계산 함수
    function getTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        const intervals = [
            { label: '년', seconds: 31536000 },
            { label: '개월', seconds: 2592000 },
            { label: '주', seconds: 604800 },
            { label: '일', seconds: 86400 },
            { label: '시간', seconds: 3600 },
            { label: '분', seconds: 60 }
        ];
        
        for (const interval of intervals) {
            const count = Math.floor(diffInSeconds / interval.seconds);
            if (count > 0) {
                return `${count}${interval.label} 전`;
            }
        }
        
        return '방금 전';
    }

    // GitHub 검색 기능
    async function searchGitHubRepos(query) {
        const searchResults = await fetchGitHubData(`/search/repositories?q=${encodeURIComponent(query)}+user:${GITHUB_USERNAME}`);
        const resultsContainer = document.getElementById('searchResults');
        
        if (!searchResults || searchResults.total_count === 0) {
            resultsContainer.innerHTML = '<p style="text-align: center; color: #8e8e8e; padding: 40px;">검색 결과가 없습니다.</p>';
            return;
        }

        resultsContainer.innerHTML = searchResults.items.map(repo => `
            <div style="background: white; margin: 15px 0; padding: 20px; border-radius: 15px; text-align: left; border: 1px solid #e1e8ed; transition: all 0.3s ease;" 
                 onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 5px 15px rgba(0,0,0,0.1)'" 
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <a href="${repo.html_url}" target="_blank" style="font-size: 18px; font-weight: 600; color: #4A90E2; text-decoration: none;">${repo.name}</a>
                    <span style="background: rgba(74, 144, 226, 0.1); color: #4A90E2; padding: 4px 8px; border-radius: 12px; font-size: 12px;">${repo.private ? 'Private' : 'Public'}</span>
                </div>
                ${repo.description ? `<p style="margin: 10px 0; color: #586069; line-height: 1.5;">${repo.description}</p>` : ''}
                <div style="display: flex; align-items: center; gap: 15px; font-size: 14px; color: #586069; margin-top: 15px;">
                    ${repo.language ? `<span><i class="fas fa-circle" style="color: #4A90E2; margin-right: 5px;"></i>${repo.language}</span>` : ''}
                    <span><i class="fas fa-star" style="margin-right: 5px;"></i>${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-branch" style="margin-right: 5px;"></i>${repo.forks_count}</span>
                </div>
            </div>
        `).join('');
    }

    // 초기 데이터 로드
    let userData = null;
    fetchGitHubData(`/users/${GITHUB_USERNAME}`).then(data => {
        userData = data;
        loadUserInfo();
        loadHomeDashboard(); // 홈 대시보드 로드
    });

    // 다크모드 토글 기능
    const toggleButton = document.getElementById('themeToggle');
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // 로컬 스토리지에 다크모드 상태 저장
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });

    // 페이지 로드 시 저장된 다크모드 상태 복원
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }

    // 탭 네비게이션 기능
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            tabContents.forEach(content => content.classList.remove('active'));
            const tabId = item.getAttribute('data-tab');
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
                if (tabId === 'github') {
                    loadGitHubRepos();
                } else if (tabId === 'gallery') {
                    if (window.galleryImages.length === 0) {
                        window.loadGalleryImages();
                    } else {
                        window.displayGalleryImages('all');
                    }
                }
            }
        });
    });

    // 갤러리 카테고리 버튼 이벤트
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            // 모든 카테고리 버튼에서 active 제거
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            // 클릭된 버튼에 active 추가
            e.target.classList.add('active');
            
            // 해당 카테고리 이미지 표시
            const category = e.target.getAttribute('data-category');
            displayGalleryImages(category);
        }
    });

    // GitHub 검색 기능
    const searchInput = document.getElementById('githubSearch');
    const searchButton = document.getElementById('searchGithub');
    
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                searchGitHubRepos(query);
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    searchGitHubRepos(query);
                }
            }
        });
    }

    // 포트폴리오 카드 애니메이션 (스크롤 시 나타나기)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // 애니메이션 카드들 관찰 시작
    const animateCards = document.querySelectorAll('.animate-card');
    animateCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });

    // 프로필 이미지 클릭 시 재미있는 효과
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.addEventListener('click', function() {
            this.style.transform = 'rotate(360deg) scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg) scale(1)';
            }, 500);
        });
    }

    // 갤러리 이미지 로드
    window.galleryImages = [];
    
    window.loadGalleryImages = async function() {
        try {
            // 실제 갤러리 폴더의 이미지들을 정의
            const galleryData = {
                anatomy: [
                    { file: '다리.jpg', title: '다리 해부학 연습' },
                    { file: '몸통.jpg', title: '몸통 해부학 연습' },
                    { file: '팔.jpg', title: '팔 해부학 연습' }
                ],
                comic: [
                    { file: '베놈.jpg', title: '베놈 팬아트' },
                    { file: '베놈2.jpg', title: '베놈 팬아트' },
                    { file: '베인.jpg', title: '베인 일러스트' },
                    { file: '베트맨.jpg', title: '배트맨 드로잉' },
                    { file: '카니지.jpg', title: '카니지 일러스트' }
                ],
                person: [
                    { file: '소녀.jpg', title: '소녀 드로잉 #1' },
                    { file: '소녀2.jpg', title: '소녀 드로잉 #2' },
                    { file: '소녀3.jpg', title: '소녀 일러스트 #3' },
                    { file: '유튜버 주깡깡.jpg', title: '유튜버 주깡깡 팬아트' },
                    { file: '인물화.jpg', title: '인물화 연습' },
                    { file: '인물화2.jpg', title: '인물화 연습' }
                ],
                cad: [
                    { file: 'AutoCAD.jpg', title: 'AutoCAD 기술도면' }
                ]
            };
            
            // 모든 이미지를 하나의 배열로 합치기
            galleryImages = [];
            Object.keys(galleryData).forEach(category => {
                galleryData[category].forEach(image => {
                    galleryImages.push({
                        ...image,
                        category: category,
                        path: `gallery/${category}/${image.file}`
                    });
                });
            });
            
            displayGalleryImages('all');
            
        } catch (error) {
            console.error('갤러리 로드 실패:', error);
            document.getElementById('galleryContainer').innerHTML = 
                '<p style="text-align: center; color: #8e8e8e; padding: 40px;">갤러리를 불러올 수 없습니다.</p>';
        }
    }
    
    // 갤러리 이미지 표시
    window.displayGalleryImages = function(category) {
        const container = document.getElementById('galleryContainer');
        
        let filteredImages = window.galleryImages;
        if (category !== 'all') {
            filteredImages = window.galleryImages.filter(img => img.category === category);
        }
        // "전체" 카테고리일 때는 모든 이미지를 보여줌
        if (category === 'all' && window.galleryImages.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #8e8e8e; padding: 40px;">이미지가 없습니다.</p>';
            return;
        }
        if (filteredImages.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #8e8e8e; padding: 40px;">이미지가 없습니다.</p>';
            return;
        }
        container.innerHTML = filteredImages.map(image => `
            <div class="gallery-item">
                <img src="${image.path}" alt="${image.title}" onerror="this.style.display='none'">
                <div class="gallery-overlay">
                    <p>${image.title}</p>
                    <span class="category-tag">${getCategoryKoreanName(image.category)}</span>
                </div>
            </div>
        `).join('');
        
        // 이미지 클릭 이벤트 다시 등록
        setupGalleryImageEvents();
    }
    
    // 카테고리 한국어 이름 반환
    function getCategoryKoreanName(category) {
        const categoryNames = {
            anatomy: '해부학',
            comic: '코믹',
            person: '인물화',
            cad: 'CAD'
        };
        return categoryNames[category] || category;
    }
    
    // 갤러리 이미지 이벤트 설정
    function setupGalleryImageEvents() {
        const galleryItems = document.querySelectorAll('.gallery-item img');
        galleryItems.forEach(img => {
            img.addEventListener('click', function() {
                if (this.style.display === 'none') return; // 로드 실패한 이미지는 무시
                
                // 간단한 모달 생성
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    cursor: pointer;
                `;
                
                const modalImg = document.createElement('img');
                modalImg.src = this.src;
                modalImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                `;
                
                modal.appendChild(modalImg);
                document.body.appendChild(modal);
                
                // 모달 클릭 시 닫기
                modal.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
                
                // ESC 키로 닫기
                const handleEsc = (e) => {
                    if (e.key === 'Escape') {
                        document.body.removeChild(modal);
                        document.removeEventListener('keydown', handleEsc);
                    }
                };
                document.addEventListener('keydown', handleEsc);
            });
        });
    }

    // 부드러운 스크롤 효과를 위한 설정
    document.documentElement.style.scrollBehavior = 'smooth';

    // 카드 호버 시 3D 효과
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });

    console.log('🚀 Azabell1993 Portfolio with GitHub Integration Loaded Successfully!');

    // PWA 설치 기능
    let deferredPrompt;
    const installButton = document.getElementById('installPWA');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installButton.style.display = 'block';
    });

    // Service Worker 등록
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

    // 고급 검색 기능
    let allReposForSearch = [];
    let filteredRepos = [];

    async function initializeAdvancedSearch() {
        // 모든 레포지토리 데이터 가져오기
        if (allRepos.length > 0) {
            allReposForSearch = allRepos;
        } else {
            allReposForSearch = fallbackRepoData;
        }
        
        setupLanguageFilter();
        setupSearchListeners();
        updateSearchStats();
    }

    function setupLanguageFilter() {
        const languageFilter = document.getElementById('languageFilter');
        const languages = [...new Set(allReposForSearch.map(repo => repo.language).filter(Boolean))];
        
        languages.forEach(language => {
            const option = document.createElement('option');
            option.value = language;
            option.textContent = language;
            languageFilter.appendChild(option);
        });
    }

    function setupSearchListeners() {
        const searchInput = document.getElementById('githubSearch');
        const languageFilter = document.getElementById('languageFilter');
        const sortBy = document.getElementById('sortBy');
        const orderBy = document.getElementById('orderBy');

        // 실시간 검색
        searchInput.addEventListener('input', debounce(performAdvancedSearch, 300));
        languageFilter.addEventListener('change', performAdvancedSearch);
        sortBy.addEventListener('change', performAdvancedSearch);
        orderBy.addEventListener('change', performAdvancedSearch);
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function performAdvancedSearch() {
        const query = document.getElementById('githubSearch').value.toLowerCase().trim();
        const selectedLanguage = document.getElementById('languageFilter').value;
        const sortBy = document.getElementById('sortBy').value;
        const orderBy = document.getElementById('orderBy').value;

        // 필터링
        filteredRepos = allReposForSearch.filter(repo => {
            const matchesQuery = !query || 
                repo.name.toLowerCase().includes(query) ||
                (repo.description && repo.description.toLowerCase().includes(query)) ||
                (repo.language && repo.language.toLowerCase().includes(query));
            
            const matchesLanguage = !selectedLanguage || repo.language === selectedLanguage;
            
            return matchesQuery && matchesLanguage;
        });

        // 정렬
        filteredRepos.sort((a, b) => {
            let aValue, bValue;
            
            switch (sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'created':
                    aValue = new Date(a.created_at || a.updated_at);
                    bValue = new Date(b.created_at || b.updated_at);
                    break;
                case 'stars':
                    aValue = a.stargazers_count || 0;
                    bValue = b.stargazers_count || 0;
                    break;
                case 'forks':
                    aValue = a.forks_count || 0;
                    bValue = b.forks_count || 0;
                    break;
                default: // updated
                    aValue = new Date(a.updated_at);
                    bValue = new Date(b.updated_at);
            }

            if (typeof aValue === 'string') {
                return orderBy === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else {
                return orderBy === 'asc' ? aValue - bValue : bValue - aValue;
            }
        });

        displaySearchResults();
        updateSearchStats();
    }

    function displaySearchResults() {
        const resultsContainer = document.getElementById('searchResults');
        
        if (filteredRepos.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-placeholder">
                    <i class="fas fa-search"></i>
                    <h3>검색 결과 없음</h3>
                    <p>검색어나 필터 조건을 변경해보세요.</p>
                </div>
            `;
            return;
        }

        const languageColors = {
            'JavaScript': '#f1e05a',
            'TypeScript': '#2b7489',
            'Python': '#3572A5',
            'Java': '#b07219',
            'C': '#555555',
            'C++': '#f34b7d',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Shell': '#89e051',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'PHP': '#4F5D95',
            'Swift': '#ffac45',
            'Kotlin': '#A97BFF',
            'Dart': '#00B4AB'
        };

        resultsContainer.innerHTML = filteredRepos.map(repo => `
            <div class="repo-card fade-in" style="margin-bottom: 20px;">
                <div class="repo-header">
                    <div>
                        <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
                        <span class="repo-visibility">${repo.private ? 'Private' : 'Public'}</span>
                    </div>
                </div>
                ${repo.description ? `<p class="repo-description">${repo.description}</p>` : ''}
                <div class="repo-stats">
                    ${repo.language ? `
                        <div class="repo-stat">
                            <span class="language-color" style="background-color: ${languageColors[repo.language] || '#8e8e8e'}"></span>
                            ${repo.language}
                        </div>
                    ` : ''}
                    <div class="repo-stat">
                        <i class="fas fa-star"></i>
                        ${repo.stargazers_count || 0}
                    </div>
                    <div class="repo-stat">
                        <i class="fas fa-code-branch"></i>
                        ${repo.forks_count || 0}
                    </div>
                </div>
                <div class="repo-updated">Updated ${getTimeAgo(new Date(repo.updated_at))}</div>
            </div>
        `).join('');

        // 애니메이션 트리거
        setTimeout(() => {
            document.querySelectorAll('.fade-in').forEach(el => {
                el.classList.add('visible');
            });
        }, 50);
    }

    function updateSearchStats() {
        const statsElement = document.getElementById('searchStats');
        const resultsCount = document.getElementById('resultsCount');
        const totalCount = document.getElementById('totalCount');
        
        resultsCount.textContent = filteredRepos.length;
        totalCount.textContent = allReposForSearch.length;
        statsElement.style.display = 'block';
    }

    // 맨 위로 스크롤 기능
    document.getElementById('backToTop').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 스크롤 애니메이션
    const observeElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    };

    // 푸터 통계 업데이트
    function updateFooterStats() {
        document.getElementById('footerRepoCount').textContent = allRepos.length || fallbackRepoData.length;
        
        // 커밋 수는 실제 API에서는 복잡하므로 추정값 사용
        const estimatedCommits = (allRepos.length || fallbackRepoData.length) * 15; // 레포당 평균 15개 커밋 추정
        document.getElementById('footerCommitCount').textContent = estimatedCommits + '+';
    }

    // 검색 탭이 활성화될 때 고급 검색 초기화
    const originalTabClickHandler = navItems.forEach;
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            if (tabId === 'search' && allReposForSearch.length === 0) {
                setTimeout(initializeAdvancedSearch, 100);
            }
        });
    });

    // 초기화 완료 후 실행
    setTimeout(() => {
        updateFooterStats();
        observeElements();
    }, 1000);

    // 키보드 단축키 지원
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'k':
                    e.preventDefault();
                    document.getElementById('githubSearch').focus();
                    break;
                case '1':
                    e.preventDefault();
                    document.querySelector('[data-tab="home"]').click();
                    break;
                case '2':
                    e.preventDefault();
                    document.querySelector('[data-tab="search"]').click();
                    break;
                case '3':
                    e.preventDefault();
                    document.querySelector('[data-tab="portfolio"]').click();
                    break;
                case '4':
                    e.preventDefault();
                    document.querySelector('[data-tab="github"]').click();
                    break;
                case '5':
                    e.preventDefault();
                    document.querySelector('[data-tab="gallery"]').click();
                    break;
            }
        }
    });
});
