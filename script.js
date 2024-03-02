gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  smoothMobile: true,
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },

  pinType: document.querySelector("[data-scroll-container]").style.transform
    ? "transform"
    : "fixed",
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();


//loader elements
function revealToSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    var parent = document.createElement("span");
    var child = document.createElement("span");

    parent.classList.add("parent");
    child.classList.add("child");

    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}

//loader
function loaderAnimation() {
  //loader
  var tl = gsap.timeline();

  tl.to(".child span", {
    x: -100,
    duration: 1.3,
    stagger: 0.2,
    ease: Power3.easeInOut,
  })
    .to(".parent .child", {
      y: "-100%",
      duration: 1,
      delay: 0.5,
      ease: Circ.easeInOut,
    })
    .to("#loader", {
      height: 0,
      duration: 1,
      ease: Circ.easeInOut,
    })
    .to("#purple", {
      height: "100vh",
      duration: 1,
      delay: -0.8,
      ease: Circ.easeInOut,
    })
    .to("#purple", {
      height: 0,
      duration: 1,
      delay: -0.5,
      ease: Circ.easeOut,
    });
}

//PAGE1
function firstPageAnim() {
  var tll = gsap.timeline();
  tll
    // page animation
    .from(
      "#page1 #nav",
      {
        y: -20,
        opacity: 0,
        duration: 1,
        delay: 4,
        ease: Expo.easeInOut,
      },
      "anim"
    )
    .from(
      "#page1 h1",
      {
        y: 20,
        ease: Expo.easeInOut,
        duration: 1,
        delay: 4,
        stagger: 0.1,
        opacity: 0,
      },
      "anim"
    )
    .from(
      "#page1 h2",
      {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 4,
        ease: Power3.easeInOut,
      },
      "anim"
    )
    .from(
      "#page1 #my-info",
      {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 4,
        ease: Expo.easeInOut,
      },
      "anim"
    )
    .from(
      "#page1 .Github",
      {
        y: 15,
        opacity: 0,
        duration: 1,
        delay: 4,
        ease: Expo.easeInOut,
      },
      "anim"
    )
    .from(
      "#page1 .Resume",
      {
        y: -10,
        opacity: 0,
        duration: 1,
        delay: 4,
        ease: Expo.easeInOut,
      },
      "anim"
    );
}

//Navigation effects
function navEffects() {
  var frames = document.querySelectorAll(".frame");
  var cur = document.querySelector("#cursor");
  var frames2 = document.querySelectorAll(".low-frame"); //bottom navigation

  //top navigation
  frames.forEach(frame => {
    frame.addEventListener("mousemove", function (dets) {

      gsap.to(cur, {
        scale: 0,
        zIndex: 1
      })

      gsap.to(frame.children, {
        duration: .4,
        y: "-1.8vw",
      })
    })

    frame.addEventListener("mouseleave", function (dets) {
      gsap.to(cur, {
        scale: 1
      })
      gsap.to(frame.children, {
        duration: .4,
        y: 0
      })
    })
  })

  //low-frame for bottom navigation
  frames2.forEach(frame => {
    frame.addEventListener("mousemove", function (dets) {

      var dims = frame.getBoundingClientRect();
      var xstart = dims.x;
      var xend = dims.x + dims.width;

      var zeroone = gsap.utils.mapRange(xstart, xend, 0, 1, dets.clientX)

      gsap.to(cur, {
        scale: 0,
        zIndex: 1
      })

      gsap.to(frame.children, {
        duration: .4,
        y: "-1.8vw",
      })
    })

    frame.addEventListener("mouseleave", function (dets) {
      gsap.to(cur, {
        scale: 1
      })
      gsap.to(frame.children, {
        duration: .4,
        y: 0
      })
    })
  })
}
//cursor
function cursorEvents() {
  var cursor = document.querySelector("#cursor");
  document.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y,
      opacity: 1,
      ease: Expo
    });
  });

  document.addEventListener("mouseenter", function (dets) {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
      duration: .5,
      ease: Power2.easeIn
    });
  });

  document.addEventListener("mouseleave", function (dets) {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
      duration: .5,
      ease: Power2.easeOut
    });
  });
}

//projects Image hover effect
document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff + "300px",
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.4),
    });
  });
});

//Hero buttons
function btnEffects() {
  var res = document.querySelector(".Resume");
  var git = document.querySelector(".Github");
  res.addEventListener("mouseenter", function () {
    res.style.backgroundColor = "transparent";
    res.style.border = "1px solid var(--purple)";

    gsap.to(res, {
      ease: Expo.easeInOut,
      duration: 1,
    });
  });
  git.addEventListener("mouseenter", function () {
    git.style.backgroundColor = "var(--white)";
    git.style.color = "var(--black)";
    git.style.border = "none";

    gsap.to(res, {
      ease: Expo.easeInOut,
      duration: 1,
    });
  })

  res.addEventListener("mouseleave", function () {
    res.style.backgroundColor = "var(--purple)";
    res.style.border = "none";
    git.style.backgroundColor = "transparent";
    git.style.color = "var(--white)";
    git.style.border = "1px solid var(--white)";

    gsap.to(res, {
      ease: Expo.easeInOut,
      duration: 1,
    });
  });

  git.addEventListener("mouseleave", function () {
    git.style.backgroundColor = "transparent";
    git.style.color = "var(--white)";
    git.style.border = "1px solid var(--white)";

    gsap.to(res, {
      ease: Expo.easeInOut,
      duration: 1,
    });
  });
}

//back to top effects
function backToTop() {

  var cur = document.querySelector("#cursor");
  var frames3 = document.querySelector("#back");
  const lerp = (x, y, a) => x * (1 - a) + y * a;

  //back to top button effects
  frames3.addEventListener("mousemove", function (dets) {

    var dims = frames3.getBoundingClientRect();
    var xstart = dims.x;
    var xend = dims.x + dims.width;

    var zeroone = gsap.utils.mapRange(xstart, xend, 0, 1, dets.clientX)

    gsap.to(cur, {
      scale: 0,
    })

    gsap.to('.back-frame span', {
      duration: .4,
      y: "-2.5vw",
    })

    gsap.to('#back', {
      x: lerp(-50, 50, zeroone),
      duration: .3,
    })
  })

  frames3.addEventListener("mouseleave", function (dets) {
    gsap.to(cur, {
      scale: 1
    })
    gsap.to('.back-frame span', {
      duration: .4,
      y: 0,
    })
    gsap.to('#back', {
      x: 0,
      duration: .3,
    })
  })

  document.querySelector("#back").addEventListener("click", () => {
    locoScroll.scrollTo(0);
  });
}

// function headingEffect() {
//   var H1 = document.querySelector("#page1 h1")
//   H1.addEventListener("mouseenter", function() {
//     H1.style.color = "var(--white)"
//     H1.style.border = "none"

//     gsap.to(H1, {
//       ease: Expo.easeInOut,
//       duration: 1,
//     })
//   })

//     H1.addEventListener("mouseleave", function() {
//       H1.style.color = "transparent"

//   gsap.to(H1, {
//     ease: Expo.easeInOut,
//     duration: 1,

//   })
//   })
// }

var links = document.querySelectorAll("a");

links.forEach(link => {
  link.style.textDecoration = "none"
})

revealToSpan()
loaderAnimation()
firstPageAnim()
navEffects()
cursorEvents()
backToTop()