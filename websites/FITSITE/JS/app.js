// gsap.registerPlugin(ScrollTrigger , MotionPathPlugin);

// gsap.to(".me" , {
//   opacity:1 ,
//   y: 50
// });


  

const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}


window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);


    //BURGER MENU BUTTON FOR FIT SITE

    jQuery(document).ready(function () {
      var body = jQuery(document.body);
      var button = jQuery("svg");
      var line = jQuery("line");
  
      button.click(function () {
          if (jQuery(document.body).hasClass("menu-open")) {
              body.removeClass("menu-open");
              return;
          }
          body.addClass("menu-open");
      });
  });


  // TITLE ANIMATION


  gsap.to("#title-box" , {
    scrub: 1 ,
    opacity : 1,
    y : -50,
    duration: 2.5               

})


// ON SCROLL ANIMATION FOR SMALL SCREEN
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  }, {
    rootMargin: '0px 0px 10% 0px'
  });

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));
});