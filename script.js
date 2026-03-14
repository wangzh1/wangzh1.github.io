// 主题切换逻辑
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// 细节 7: 动态生成光子粒子
const particlesContainer = document.getElementById('particles-container');
const particleCount = 25; // 粒子数量控制
for(let j=0; j<particleCount; j++) {
    let p = document.createElement('div');
    p.classList.add('particle');
    let size = Math.random() * 4 + 2; // 大小 2px - 6px
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%'; // 随机水平位置
    p.style.animationDuration = Math.random() * 10 + 10 + 's'; // 动画时长 10-20s
    p.style.animationDelay = Math.random() * 5 + 's'; // 随机延迟
    particlesContainer.appendChild(p);
}

// 细节 6: 力量举进度条滚动触发动画 (IntersectionObserver)
const skillFills = document.querySelectorAll('.skill-fill');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const el = entry.target;
            // 读取目标宽度并赋值给 style.width，触发 CSS transition
            el.style.width = el.getAttribute('data-width');
            observer.unobserve(el); // 动画只触发一次
        }
    });
}, { threshold: 0.5 }); // 当元素露出 50% 的时候触发

skillFills.forEach(fill => observer.observe(fill));

// 打字机效果逻辑
const words = ["Computational Imaging", "Single Photon Imaging", "Time-Resolved Imaging", "Computer Graphics"];
let i = 0;
let timer;
const target = document.getElementById('typewriter');

function typingEffect() {
    let word = words[i].split('');
    var loopTyping = function() {
        if (word.length > 0) {
            target.innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split('');
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            target.innerHTML = word.join('');
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            typingEffect();
            return false;
        }
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
}

typingEffect();

// 图片点击放大逻辑 (Lightbox)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const teaserImages = document.querySelectorAll('.pub-teaser img');

teaserImages.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src; 
        lightbox.classList.add('active'); 
    });
});

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// ==== BibTeX 弹窗交互逻辑 ====
const bibtexOverlay = document.getElementById('bibtex-modal-overlay');
const closeBibtexBtn = document.getElementById('close-bibtex');
const bibtexContent = document.getElementById('bibtex-content');
const copyBibtexBtn = document.getElementById('copy-bibtex');
const bibtexToggles = document.querySelectorAll('.bibtex-toggle');

// 给每个 BibTeX 按钮绑定点击事件
bibtexToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        // 找到和这个按钮在同一个父元素(.pub-badges)下的隐藏数据
        const bibtexText = toggle.parentElement.querySelector('.bibtex-data').innerText;
        
        // 把数据塞进小窗口并显示
        bibtexContent.innerText = bibtexText;
        bibtexOverlay.classList.add('active');
        copyBibtexBtn.innerText = 'Copy to Clipboard'; // 重置复制按钮状态
    });
});

// 点击右上角叉号关闭窗口
closeBibtexBtn.addEventListener('click', () => {
    bibtexOverlay.classList.remove('active');
});

// 点击灰色背景区域也可以关闭窗口
bibtexOverlay.addEventListener('click', (e) => {
    if (e.target === bibtexOverlay) {
        bibtexOverlay.classList.remove('active');
    }
});

// 一键复制功能
copyBibtexBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(bibtexContent.innerText).then(() => {
        copyBibtexBtn.innerText = 'Copied! ✓';
        // 2秒后恢复原状
        setTimeout(() => {
            copyBibtexBtn.innerText = 'Copy to Clipboard';
        }, 2000);
    });
});