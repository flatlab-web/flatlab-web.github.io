window.HELP_IMPROVE_VIDEOJS = false;

// ================================
// More Works Dropdown Functionality
// ================================
function toggleMoreWorks() {
  const dropdown = document.getElementById('moreWorksDropdown');
  const button = document.querySelector('.more-works-btn');
  if (!dropdown || !button) return;

  if (dropdown.classList.contains('show')) {
    dropdown.classList.remove('show');
    button.classList.remove('active');
  } else {
    dropdown.classList.add('show');
    button.classList.add('active');
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
  const container = document.querySelector('.more-works-container');
  const dropdown = document.getElementById('moreWorksDropdown');
  const button = document.querySelector('.more-works-btn');

  if (!dropdown || !button) return;

  if (container && !container.contains(event.target)) {
    dropdown.classList.remove('show');
    button.classList.remove('active');
  }
});

// Close dropdown on escape key
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    if (!dropdown || !button) return;
    dropdown.classList.remove('show');
    button.classList.remove('active');
  }
});


// ================================
// Copy BibTeX to clipboard
// ================================
function copyBibTeX() {
  const bibtexElement = document.getElementById('bibtex-code');
  const button = document.querySelector('.copy-bibtex-btn');
  const copyText = button ? button.querySelector('.copy-text') : null;

  if (!bibtexElement || !button || !copyText) return;

  navigator.clipboard.writeText(bibtexElement.textContent).then(function () {
    button.classList.add('copied');
    copyText.textContent = 'Cop';

    setTimeout(function () {
      button.classList.remove('copied');
      copyText.textContent = 'Copy';
    }, 2000);
  }).catch(function (err) {
    console.error('Failed to copy: ', err);

    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = bibtexElement.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    button.classList.add('copied');
    copyText.textContent = 'Cop';
    setTimeout(function () {
      button.classList.remove('copied');
      copyText.textContent = 'Copy';
    }, 2000);
  });
}


// ================================
// Scroll to top functionality
// ================================
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function () {
  const scrollButton = document.querySelector('.scroll-to-top');
  if (!scrollButton) return;

  if (window.pageYOffset > 300) {
    scrollButton.classList.add('visible');
  } else {
    scrollButton.classList.remove('visible');
  }
});


// ================================
// Carousel video playback helpers
// ================================

// ✅ 只播放当前 active 的轮播 video，避免全播导致卡顿/轮播不动
function playOnlyActiveCarouselVideo() {
  const items = document.querySelectorAll('.results-carousel .item');
  if (!items || items.length === 0) return;

  items.forEach(item => {
    const v = item.querySelector('video');
    if (!v) return;

    // bulma-carousel 不同版本 active class 不同：is-active / active 兼容
    const isActive = item.classList.contains('is-active') || item.classList.contains('active');

    if (isActive) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  });
}

// Video carousel autoplay when in view (你的原逻辑保留)
function setupVideoCarouselAutoplay() {
  const carouselVideos = document.querySelectorAll('.results-carousel video');
  if (!carouselVideos || carouselVideos.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;

      if (entry.isIntersecting) {
        video.play().catch(e => {
          console.log('Autoplay prevented:', e);
        });
      } else {
        video.pause();
      }
    });
  }, {
    threshold: 0.5
  });

  carouselVideos.forEach(video => {
    observer.observe(video);
  });
}


// ================================
// Bulma init
// ================================
$(document).ready(function () {
  var options = {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true
  };

  // Initialize all div with carousel class
  var carousels = bulmaCarousel.attach('.carousel', options);

  // ✅ 核心：等页面布局稳定后 refresh，避免轮播宽度计算错误导致“不动/错位”
  setTimeout(function () {
    try {
      if (carousels && carousels.length) {
        carousels.forEach(function (c) {
          if (c && typeof c.refresh === 'function') c.refresh();
        });
      }
    } catch (e) {}

    // refresh 后立刻只播放 active video
    playOnlyActiveCarouselVideo();
  }, 300);

  // slider attach
  bulmaSlider.attach();

  // Setup video autoplay for carousel in-view
  setupVideoCarouselAutoplay();

  // ✅ 兜底：轮播切换时，确保只播放当前 active video
  playOnlyActiveCarouselVideo();
  setInterval(playOnlyActiveCarouselVideo, 800);
});





// ================================
// Video Group Dropdown (9 per group)
// ================================

// ✅ 你的视频总数
const TOTAL_VIDEOS = 104;

// ✅ 视频文件命名规则：0.mp4, 1.mp4 ... 103.mp4
function getVideoSrc(i) {
  return `static/videos/104item/${i}.mp4`;
}

// ✅ 每组选 9 个
const GROUP_SIZE = 9;

// 自动生成分组：[[0..8], [9..17], ...]
const videoGroups = [];
for (let start = 0; start < TOTAL_VIDEOS; start += GROUP_SIZE) {
  const group = [];
  for (let i = start; i < Math.min(start + GROUP_SIZE, TOTAL_VIDEOS); i++) {
    group.push(i);
  }
  videoGroups.push(group);
}

function renderGroup(groupIndex) {
  const videoGrid = document.getElementById("videoGrid");
  if (!videoGrid) return;

  videoGrid.innerHTML = "";

  const group = videoGroups[groupIndex] || [];

  group.forEach((videoId) => {
    const col = document.createElement("div");
    col.className = "column is-one-third";

    col.innerHTML = `
      <div class="box" style="padding: 0.6rem;">
        <video controls muted autoplay playsinline preload="auto"
               style="width:100%; display:block;">
          <source src="${getVideoSrc(videoId)}" type="video/mp4">
        </video>
        <p style="margin: 0.35rem 0 0 0; font-size: 0.9rem; text-align:center;">
          Video ${videoId}
        </p>
      </div>
    `;
    videoGrid.appendChild(col);
  });

  // ✅ 渲染完后，强制让这一页所有视频从 0 秒开始播放（错开启动更稳）
  setTimeout(() => {
    const videos = document.querySelectorAll("#videoGrid video");

    videos.forEach((v, i) => {
      setTimeout(() => {
        try {
          v.pause();
          v.currentTime = 0;
          v.muted = true;
          v.play().catch(() => {});
        } catch (e) {}
      }, i * 120);
    });
  }, 100);
}

function initVideoDropdown() {
  const select = document.getElementById("videoGroupSelect");
  if (!select) return;

  // 生成下拉选项
  videoGroups.forEach((group, idx) => {
    const option = document.createElement("option");
    option.value = idx;
    option.textContent = `page ${idx}`;
    select.appendChild(option);
  });

  // 默认显示第一页
  select.value = "0";
  renderGroup(0);

  // 切换组时更新视频展示
  select.addEventListener("change", (e) => {
    renderGroup(parseInt(e.target.value, 10));
  });
}

// 页面加载完再初始化
document.addEventListener("DOMContentLoaded", initVideoDropdown);
