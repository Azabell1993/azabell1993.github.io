// 다크모드 토글 스크립트
const toggleButton = document.getElementById('themeToggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
