// 確保所有 HTML 元素都載入後才執行程式
document.addEventListener('DOMContentLoaded', () => {

    // 1. 歡迎互動功能
    const header = document.querySelector('header');
    if (header) {
        header.addEventListener('click', () => {
            alert("歡迎來到 Sana 的專屬空間！Sha Sha Sha~");
        });
    }

    // 2. 相簿功能
    const imgs = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const captionText = document.getElementById('caption');
    // 3. 音樂控制功能
    const music = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('music-control');
    const musicIcon = document.getElementById('music-icon');
    const cursorDot = document.querySelector('.cursor-dot');
    // --- 漢堡選單邏輯 ---
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-list');
    // 自動偵測網址並高亮導航欄
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-list a');

    const dot = document.querySelector('.cursor-dot');
    const links = document.querySelectorAll('a, button, .music-btn');
    

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            dot.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        });
        link.addEventListener('mouseleave', () => {
            dot.style.transform = 'translate(-50%, -50%) scale(1)';
            dot.style.backgroundColor = 'rgba(255, 193, 227, 0.6)';
        });
    });

    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });

    window.addEventListener('mousemove', (e) => {
        // 讓圓點跟著滑鼠坐標移動
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    // 進階：點擊時讓圓點縮放一下
    window.addEventListener('mousedown', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    window.addEventListener('mouseup', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    if (menu) {
        menu.addEventListener('click', function () {
            // 切換 active 類別來顯示/隱藏選單
            menu.classList.toggle('is-active');
            menuLinks.classList.toggle('active');
        });
    }

    // 點擊選單連結後，自動關閉選單 (優化體驗)
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('is-active');
            menuLinks.classList.remove('active');
        });
    });

    // 檢查元素是否存在，避免報錯
    if (imgs.length > 0 && lightbox && lightboxImg) {
        imgs.forEach(img => {
            img.addEventListener('click', () => {
                // 改用 classList，配合 CSS 的 transition 動畫
                lightbox.classList.add('active');
                lightboxImg.src = img.src;

                if (captionText) {
                    captionText.innerText = img.alt;
                }
            });
        });
    }

    // 點擊 X 關閉
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active'); // 移除 active 類別
        });
    }

    // 點擊背景處也能關閉
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active'); // 移除 active 類別
            }
        });
    }

    if (musicBtn && music) {
        musicBtn.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                musicIcon.innerText = "⏸️"; // 切換成暫停圖示
                musicBtn.classList.add('playing'); // 加入旋轉效果
            } else {
                music.pause();
                musicIcon.innerText = "🎵"; // 切換回音樂圖示
                musicBtn.classList.remove('playing'); // 停止旋轉
            }
        });
    }

    window.addEventListener('scroll', () => {
        const reveals = document.querySelectorAll('.reveal');

        reveals.forEach(windowReveal => {
            const windowHeight = window.innerHeight;
            const revealTop = windowReveal.getBoundingClientRect().top;
            const revealPoint = 150; // 距離底部多少距離時觸發

            if (revealTop < windowHeight - revealPoint) {
                windowReveal.classList.add('active');
            }
        })
    })

    const quotes = [
        "No Sana, No Life.",
        "샤샤샤 (Sha Sha Sha~)",
        "綠茶真的很好喝～",
        "希望能一直和 ONCE 在一起！",
        "不要生病，要一直幸福喔。"
    ];

    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quoteElement = document.getElementById('sana-quote');

        // 加個簡單的淡入淡出效果
        quoteElement.style.opacity = 0;
        setTimeout(() => {
            quoteElement.innerText = quotes[randomIndex];
            quoteElement.style.opacity = 1;
        }, 300);
    }

    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.padding = '0.5rem 8%'; // 縮小高度
            nav.style.background = 'rgba(255, 193, 227, 0.95)'; // 顏色變實一點
            nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)'; // 加入陰影
        } else {
            nav.style.padding = '0.8rem 8%'; // 恢復原狀
            nav.style.background = 'rgba(255, 255, 255, 0.2)'; // 恢復玻璃感
            nav.style.boxShadow = 'none';
        }
    });

    // 選擇性：使用者第一次點擊網頁任何地方時自動播放 (優化體驗)
    /*
    document.body.addEventListener('click', () => {
        if (music && music.paused) {
            music.play().then(() => {
                musicIcon.innerText = "⏸️";
                musicBtn.classList.add('playing');
            }).catch(err => {
                console.log("自動播放被攔截，需要使用者手動開啟");
            });
        }
    }, { once: true }); // 只執行一次
    */
});