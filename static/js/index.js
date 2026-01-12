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

function playOnlyActiveCarouselVideo() {
  const items = document.querySelectorAll('.results-carousel .item');
  if (!items || items.length === 0) return;

  items.forEach(item => {
    const v = item.querySelector('video');
    if (!v) return;

    const isActive = item.classList.contains('is-active') || item.classList.contains('active');

    if (isActive) {
      // v.play().catch(() => {});
    } else {
      v.pause();
    }
  });
}

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

  setTimeout(function () {
    try {
      if (carousels && carousels.length) {
        carousels.forEach(function (c) {
          if (c && typeof c.refresh === 'function') c.refresh();
        });
      }
    } catch (e) {}

    playOnlyActiveCarouselVideo();
  }, 300);

  // slider attach
  bulmaSlider.attach();

  // Setup video autoplay for carousel in-view
  setupVideoCarouselAutoplay();

  playOnlyActiveCarouselVideo();
  // setInterval(playOnlyActiveCarouselVideo, 800);
});





// ================================
// Video Group Dropdown (Config Generated by Script)
// ================================
const VIDEO_DATA = {
  "1": [
    {
      "file": "Board_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Book_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Chessboard_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Clock_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Keyboard_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Mouse_Pad_StrategyC.mp4",
      "title": "StrategyC"
    },
    {
      "file": "Shorts_StrategyC.mp4",
      "title": "StrategyC"
    },
    {
      "file": "Towel_StrategyC.mp4",
      "title": "StrategyC"
    }
  ],
  "2": [
    {
      "file": "Book_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Box_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Disk_Case_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Disk_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Keyboard_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Laptop_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Photo_Album_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Skirt_StrategyC.mp4",
      "title": "StrategyC"
    }
  ],
  "3": [
    {
      "file": "Board_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Box_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Cutting_Board_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Disk_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Keyboard_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Mouse_Pad_StrategyC.mp4",
      "title": "StrategyC"
    },
    {
      "file": "Pad_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Skirt_StrategyC.mp4",
      "title": "StrategyC"
    }
  ],
  "4": [
    {
      "file": "Book_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Disk_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Laptop_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Magazine_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Painting_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Plate_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Scarf_StrategyC.mp4",
      "title": "StrategyC"
    },
    {
      "file": "Skirt_StrategyC.mp4",
      "title": "StrategyC"
    }
  ],
  "5": [
    {
      "file": "Chessboard_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Cutting_Board_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Disk_Case_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Disk_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Magazine_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Pad_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Plate_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Shorts_StrategyC.mp4",
      "title": "StrategyC"
    }
  ],
  "6": [
    {
      "file": "Book_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Disk_Case_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Fabric_StrategyC.mp4",
      "title": "StrategyC"
    },
    {
      "file": "Keyboard_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Pad_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Photo_Album_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Plate_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Scarf_StrategyC.mp4",
      "title": "StrategyC"
    }
  ],
  "7": [
    {
      "file": "Board_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Box_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Cutting_Board_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Disk_Case_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Fabric_StrategyC.mp4",
      "title": "StrategyC"
    },
    {
      "file": "Keyboard_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Painting_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Plate_StrategyA.mp4",
      "title": "StrategyA"
    }
  ],
  "8": [
    {
      "file": "Book_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Box_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Cutting_Board_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Disk_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Fabric_StrategyC.mp4",
      "title": "StrategyC"
    },
    {
      "file": "Magazine_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Pad_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Plate_StrategyA.mp4",
      "title": "StrategyA"
    }
  ],
  "9": [
    {
      "file": "Board_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Book_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Box_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Clock_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Fabric_StrategyC.mp4",
      "title": "StrategyC"
    },
    {
      "file": "Magazine_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Painting_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Photo_Album_StrategyB.mp4",
      "title": "StrategyB"
    }
  ],
  "10": [
    {
      "file": "Board_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Book_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Box_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Chessboard_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Cutting_Board_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Magazine_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Mouse_Pad_StrategyC.mp4",
      "title": "StrategyC"
    },
    {
      "file": "Painting_StrategyB.mp4",
      "title": "StrategyB"
    }
  ],
  "11": [
    {
      "file": "Book_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Chessboard_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Clock_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Magazine_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Mouse_Pad_StrategyC.mp4",
      "title": "StrategyC"
    },
    {
      "file": "Plate_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Scarf_StrategyC.mp4",
      "title": "StrategyC"
    },
    {
      "file": "Towel_StrategyC.mp4",
      "title": "StrategyC"
    }
  ],
  "12": [
    {
      "file": "Board_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Box_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Cutting_Board_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Disk_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Pad_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Photo_Album_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Shorts_StrategyC.mp4",
      "title": "StrategyC"
    },
    {
      "file": "Towel_StrategyC.mp4",
      "title": "StrategyC"
    }
  ],
  "13": [
    {
      "file": "Box_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Clock_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Keyboard_StrategyB.mp4",
      "title": "StrategyB"
    },
    {
      "file": "Pad_StrategyA.mp4",
      "title": "StrategyA"
    },
    {
      "file": "Scarf_StrategyC.mp4",
      "title": "StrategyC"
    },
    {
      "file": "Shorts_StrategyC.mp4",
      "title": "StrategyC"
    },
    {
      "file": "Skirt_StrategyC.mp4",
      "title": "StrategyC"
    },
    {
      "file": "Towel_StrategyC.mp4",
      "title": "StrategyC"
    }
  ]
};

function renderGroup(pageIndex) {
  const videoGrid = document.getElementById("videoGrid");
  if (!videoGrid) return;

  // Add spacing variables if missing
  if (!videoGrid.classList.contains("is-variable")) {
    videoGrid.classList.add("is-variable", "is-6");
  }

  videoGrid.innerHTML = "";

  const dataKey = String(pageIndex + 1); // "1", "2" ...
  const videos = VIDEO_DATA[dataKey] || [];

  videos.forEach((video) => {
    const col = document.createElement("div");
    col.className = "column is-6"; 

    const videoSrc = `static/videos/Simulation Experiments/${dataKey}/${video.file}`;

    col.innerHTML = `
      <div class="box" style="padding: 0.6rem;">
        <video controls muted autoplay playsinline preload="auto"
               style="width:100%; display:block;">
          <source src="${videoSrc}" type="video/mp4">
        </video>
        <p style="margin: 0.35rem 0 0 0; font-size: 1.1rem; font-weight: 600; text-align:center;">
          ${video.title}
        </p>
      </div>
    `;
    videoGrid.appendChild(col);
  });

  setTimeout(() => {
    const videoElements = document.querySelectorAll("#videoGrid video");

    videoElements.forEach((v, idx) => {
      setTimeout(() => {
        try {
          v.pause();
          v.currentTime = 0;
          v.muted = true;
          v.play().catch(() => {});
        } catch (e) {}
      }, idx * 120);
    });
  }, 100);
}

function initVideoDropdown() {
  const select = document.getElementById("videoGroupSelect");
  if (!select) return;

  const totalPages = Object.keys(VIDEO_DATA).length;
  
  for (let i = 0; i < totalPages; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `Experiment ${i + 1}`;
    select.appendChild(option);
  }

  select.value = "0";
  renderGroup(0);

  select.addEventListener("change", (e) => {
    renderGroup(parseInt(e.target.value, 10));
  });
}

document.addEventListener("DOMContentLoaded", initVideoDropdown);
