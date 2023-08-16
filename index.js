(() => {
  const moreBtn = document.getElementById("moreBtn");
  const thirdSlide = document.getElementById("third");
  const homeBtn = document.getElementById("homeBtn");
  const introBtn = document.getElementById("introBtn");
  introBtn.addEventListener("click", () => {
    const track = document.getElementsByClassName("slider-track")[0];
    swiper(1);
    track.style.transition = "transform .5s";
    track.style.transform = `translate3d(-1024px, 0px, 0px)`;
  });
  homeBtn.addEventListener("click", () => {
    swiper();
  });
  const logo = document.getElementsByClassName("logo")[0];
  const verstka = `<div class="advantageText">
  <div class="slides">
    <div>
      <p class="bold numbers">01</p>
      <p class="slides_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      <p class="bold numbers">02</p>
      <p class="slides_text">Facilisis volutpat est velit</p>
      <p class="bold numbers">03</p>
      <p class="slides_text">Facilisis volutpat est velit</p>
    </div>
    <div>
      <p class="bold numbers">04</p>
      <p class="slides_text">Eu consequat ac felis donec, consectetur adipiscing elit</p>
      <p class="bold numbers">05</p>
      <p class="slides_text">Eu consequat ac felis donec</p>
      <p class="bold numbers">06</p>
      <p class="slides_text">Eu consequat ac felis donec</p>
    </div>
  </div>
  <div class="navigation">
    <div class="btmSlides">
      <span class="indication"></span>
      <span class="indication"></span>
    </div>
    <div class="navArrows" onclick="side_slide(-1)">
      <img class="arrow" src="/src/arrowPrev.png" alt="" id="arrowLeft" />
    </div>
    <div class="navArrows right" onclick="side_slide(1)">
      <img class="arrow" src="/src/arrowNext.png" alt="" id="arrowNext" />
    </div>
  </div>
  </div>`;
  moreBtn.addEventListener("click", () => {
    const moreInfo = document.createElement("div");
    const advantages = document.createElement("div");
    const closeBtn = document.createElement("button");
    closeBtn.id = "closeBtn";
    const closeImg = document.createElement("img");
    const sliderJs = document.createElement("script");
    sliderJs.id = "sliderJs";
    sliderJs.src = "/slider.js";
    closeImg.src = "/src/closeBtn.png";
    closeBtn.appendChild(closeImg);
    moreInfo.appendChild(closeBtn);
    moreInfo.className = "moreInfo";
    thirdSlide.classList.add("brightness");
    Object.assign(closeImg.style, { height: "35px" });
    Object.assign(moreInfo.style, { "z-index": 2 });
    Object.assign(closeBtn.style, {
      position: "absolute",
      top: "35px",
      left: "705px",
      border: "none",
      backgroundColor: "white",
    });
    Object.assign(logo.style, { left: "-60px", top: "15px", zIndex: 3 });
    logo.children[0].innerHTML = "ПРЕИМУЩЕСТВА";
    moreInfo.innerHTML += verstka;
    thirdSlide.appendChild(moreInfo);
    document.body.appendChild(sliderJs);
    const close = document.getElementById("closeBtn");
    close.addEventListener("click", () => {
      document.getElementsByClassName("moreInfo")[0].remove();
      thirdSlide.classList.remove("brightness");
      document.getElementById("sliderJs").remove();
      logo.children[0].innerHTML = "КЛЮЧЕВОЕ СООБЩЕНИЕ";
      Object.assign(logo.style, { left: "0px", top: "0px" });
    });
  });

  ////////////////////////////////////////////

  function swiper(
    Index = 0,
    init = 0,
    x1 = 0,
    x2 = 0,
    y1 = 0,
    y2 = 0,
    final = 0
  ) {
    let slider = document.querySelector(".slider"),
      sliderList = slider.querySelector(".slider-list"),
      sliderTrack = slider.querySelector(".slider-track"),
      slides = slider.querySelectorAll(".slide"),
      slideWidth = slides[0].offsetWidth,
      slideIndex = Index,
      posInit = init,
      posX1 = x1,
      posX2 = x2,
      posY1 = y1,
      posY2 = y2,
      posFinal = final,
      isSwipe = false,
      isScroll = false,
      allowSwipe = true,
      transition = true,
      nextTrf = 0,
      prevTrf = 0,
      lastTrf = --slides.length * slideWidth,
      posThreshold = slides[0].offsetWidth * 0.35,
      trfRegExp = /([-0-9.]+(?=px))/,
      swipeStartTime,
      swipeEndTime,
      getEvent = function () {
        return event.type.search("touch") !== -1 ? event.touches[0] : event;
      },
      slide = function () {
        if (transition) {
          sliderTrack.style.transition = "transform .5s";
        }
        sliderTrack.style.transform = `translate3d(-${
          slideIndex * slideWidth
        }px, 0px, 0px)`;
      },
      swipeStart = function () {
        let evt = getEvent();
        if (allowSwipe) {
          swipeStartTime = Date.now();

          transition = true;

          nextTrf = (slideIndex + 1) * -slideWidth;
          prevTrf = (slideIndex - 1) * -slideWidth;

          posInit = posX1 = evt.clientX;
          posY1 = evt.clientY;

          sliderTrack.style.transition = "";

          document.addEventListener("touchmove", swipeAction);
          document.addEventListener("mousemove", swipeAction);
          document.addEventListener("touchend", swipeEnd);
          document.addEventListener("mouseup", swipeEnd);

          sliderList.classList.remove("grab");
          sliderList.classList.add("grabbing");
        }
      },
      swipeAction = function () {
        let evt = getEvent(),
          style = sliderTrack.style.transform,
          transform = +style.match(trfRegExp)[0];

        posX2 = posX1 - evt.clientX;
        posX1 = evt.clientX;

        posY2 = posY1 - evt.clientY;
        posY1 = evt.clientY;

        if (!isSwipe && !isScroll) {
          let posY = Math.abs(posY2);
          if (posY > 7 || posX2 === 0) {
            isScroll = true;
            allowSwipe = false;
          } else if (posY < 7) {
            isSwipe = true;
          }
        }

        if (isSwipe) {
          if (slideIndex === 0) {
            if (posInit < posX1) {
              setTransform(transform, 0);
              return;
            } else {
              allowSwipe = true;
            }
          }

          // запрет ухода вправо на последнем слайде
          if (slideIndex === --slides.length) {
            if (posInit > posX1) {
              setTransform(transform, lastTrf);
              return;
            } else {
              allowSwipe = true;
            }
          }

          if (
            (posInit > posX1 && transform < nextTrf) ||
            (posInit < posX1 && transform > prevTrf)
          ) {
            reachEdge();
            return;
          }

          sliderTrack.style.transform = `translate3d(${
            transform - posX2
          }px, 0px, 0px)`;
        }
      },
      swipeEnd = function () {
        posFinal = posInit - posX1;

        isScroll = false;
        isSwipe = false;

        document.removeEventListener("touchmove", swipeAction);
        document.removeEventListener("mousemove", swipeAction);
        document.removeEventListener("touchend", swipeEnd);
        document.removeEventListener("mouseup", swipeEnd);

        sliderList.classList.add("grab");
        sliderList.classList.remove("grabbing");

        if (allowSwipe) {
          swipeEndTime = Date.now();
          if (
            Math.abs(posFinal) > posThreshold ||
            swipeEndTime - swipeStartTime < 300
          ) {
            if (posInit < posX1) {
              slideIndex--;
            } else if (posInit > posX1) {
              slideIndex++;
            }
          }

          if (posInit !== posX1) {
            allowSwipe = false;
            slide();
          } else {
            allowSwipe = true;
          }
        } else {
          allowSwipe = true;
        }
      },
      setTransform = function (transform, comapreTransform) {
        if (transform >= comapreTransform) {
          if (transform > comapreTransform) {
            sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
          }
        }
        allowSwipe = false;
      },
      reachEdge = function () {
        transition = false;
        swipeEnd();
        allowSwipe = true;
      };

    sliderTrack.style.transform = "translate3d(0px, 0px, 0px)";
    sliderList.classList.add("grab");
    console.log(prevTrf);
    sliderTrack.addEventListener("transitionend", () => (allowSwipe = true));
    slider.addEventListener("touchstart", swipeStart);
    slider.addEventListener("mousedown", swipeStart);
  }
  swiper();
})();
