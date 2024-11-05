// 메일 정규식
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 랜덤 인증 코드 생성 함수
function generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 랜덤 코드
}

// HTML 이스케이프 처리
const escapeHTMLContent = (html) => {
    return html.replace(/"/g, '\\"').replace(/\n/g, ''); // "를 \\"로, 줄바꿈은 제거
};

module.exports = { isValidEmail, generateRandomCode, escapeHTMLContent };