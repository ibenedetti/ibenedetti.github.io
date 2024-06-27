window.addEventListener('load', function() {
    console.log("WEBSITE LOADED!!!")
    const resolver = {
        resolve: function resolve(options, callback) {
            const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
            const combinedOptions = Object.assign({}, options, { resolveString: resolveString });
            
            function getRandomInteger(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            
            function randomCharacter(characters) {
                return characters[getRandomInteger(0, characters.length - 1)];
            }
            
            function doRandomiserEffect(options, callback) {
                const characters = options.characters;
                const timeout = options.timeout;
                const element = options.element;
                const partialString = options.partialString;
                let iterations = options.iterations;
                
                setTimeout(() => {
                    if (iterations >= 0) {
                        const nextOptions = Object.assign({}, options, { iterations: iterations - 1 });
                        
                        if (iterations === 0) {
                            element.textContent = partialString;
                        } else {
                            element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
                        }
                        
                        doRandomiserEffect(nextOptions, callback);
                    } else if (typeof callback === "function") {
                        callback();
                    }
                }, options.timeout);
            }
            
            function doResolverEffect(options, callback) {
                const resolveString = options.resolveString;
                const offset = options.offset;
                const partialString = resolveString.substring(0, offset);
                const combinedOptions = Object.assign({}, options, { partialString: partialString });
                
                doRandomiserEffect(combinedOptions, () => {
                    const nextOptions = Object.assign({}, options, { offset: offset + 1 });
                    
                    if (offset <= resolveString.length) {
                        doResolverEffect(nextOptions, callback);
                    } else if (typeof callback === "function") {
                        callback();
                    }
                });
            }
            
            doResolverEffect(combinedOptions, callback);
        }
    }
    
    const strings = [
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
        'Nemo enim ipsam voluptatem, quia voluptas sit aspernatur'
    ];
    
    let counter = 0;
    
    const options = {
        offset: 0,
        timeout: 5,
        iterations: 10,
        characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
        resolveString: strings[counter],
        element: document.querySelector('[data-target-resolver]')
    }
    
    function callback() {
        setTimeout(() => {
            counter++;
            
            if (counter >= strings.length) {
                counter = 0;
            }
            
            let nextOptions = Object.assign({}, options, { resolveString: strings[counter] });
            resolver.resolve(nextOptions, callback);
        }, 1000);
    }
    
    resolver.resolve(options, callback);
});

// SCROLL ANIMATION
var scrolled = false;

window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    const linksElement = document.querySelector('.links');
    
    if (linksElement) {
        if (scrollPosition > 480 && !scrolled) {
            linksElement.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
            linksElement.classList.add('navbar-scrolled');
            scrolled = true;
        } else if (scrollPosition < 480) {
            linksElement.style.backgroundColor = 'transparent';
            linksElement.classList.remove('navbar-scrolled');
            scrolled = false;
        }
    }
});

window.addEventListener('scroll', function() {
    const textContainer = document.querySelector('.text-container');
    if (textContainer) {
        if (window.scrollY > 100) {
            textContainer.classList.add('hidden');
        } else {
            textContainer.classList.remove('hidden');
        }
    }
});

// ON SCROLL
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    rootMargin: '0px 0px -50% 0px'
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// ABOUT SECTION ANIMATION
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    rootMargin: '0px 0px 0% 0px'
});

const aboutElement = document.querySelector('.about.hidden');
if (aboutElement) {
    aboutObserver.observe(aboutElement);
}

// BACKGROUND ANIMATION
const root = document.documentElement;
const urls = [
  'url(../img/img1.jpg)',
  'url(../img/img2.jpg)',
  'url(../img/img3.jpg)',
  'url(../img/img4.jpg)'
];
let currentIndex = 0;

function changeBackground() {
  currentIndex = (currentIndex + 1) % urls.length;
  const newUrl = urls[currentIndex];

  // Update CSS variable
  root.style.setProperty('--url1', newUrl);
}

// Change background every 5 seconds
setInterval(changeBackground, 5000);
