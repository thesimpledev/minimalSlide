var minimalSlide = {
  // setup -------------------------------------------
  // setupControls(count): adds list items to ul.mSControls based on slidesCount
  // setupSlides(): assigns slides & slidesCount, and adds active class to first slide

  // methods -----------------------------------------
  // activeSlide(): returns the current slide with .active
  // activeSlideIndex(): returns the index of the slide with .active
  // startSlideshow(): starts slideshow from current active slide
  // stopSlideshow(): stops slideshow at current active slide
  // nextSlide(): transitions to the next slide
  // prevSlide(): transitions back a slide

  // properties --------------------------------------
  // slides: contains slides with .mS
  // controls: contains list items that are children of .mSControls
  // slidesCount: returns the amount of slides
  // animation: holds the setInterval call
  // controlBackgroundColor:
  // controlActiveColor:

  setupControls: function() {
    // add controls based on the amount of slides
    // TODO: make the ul, and button automically added on container
    var $ul = $('.mSControls');
    for (var i = 0; i < this.slidesCount; i++) {
      $ul.append('<li></li>');
    }
    this.controls = $ul.children('li');
    this.controls.first().addClass('control-active');
    this.changeSlideOnControlClick();
    this.toggleSlideshowOnButtonClick();
  },

  changeSlideOnControlClick: function() {
    this.controls.on('click', function() {
      this.nextSlide();
    });
  },

  toggleSlideshowOnButtonClick: function() {

  },

  setupSlides: function() {
    this.slides = $('.mS');
    // automatically set the background-image to
    // 0.jpg - n.jpg (however many .mS)
    this.slides
        .first()
        .addClass('active')
        .end()
        .each(function(index) {
          $(this).css({
            zIndex: -index - 1
          });
        });
    this.slidesCount = this.slides.length;
  },

  activeSlide: function() {
    return this.slides
      .filter('.active');
  },

  activeSlideIndex: function() {
    return this.activeSlide().index();
  },

  onFirstSlide: function() {
    return this.activeSlideIndex() === 0;
  },

  onLastSlide: function() {
    return this.activeSlideIndex() === this.slides.length - 1;
  },

  updateActiveControl: function(index) {
    this.controls
      .removeClass('control-active')
      .eq(index)
      .addClass('control-active');
  },

  nextSlide: function() {
    if (this.onLastSlide()) {
      this.goToSlide(0);
    } else {
      this.goToSlide(this.activeSlideIndex() + 1);
    }
  },

  prevSlide: function() {
    if (this.onFirstSlide()) {
      this.goToSlide(this.slides.length - 1);
    } else {
      this.goToSlide(this.activeSlideIndex - 1);
    }
  },

  startSlideshow: function() {
    var self = this;
    this.animate = setInterval(function() {
      self.nextSlide();
    }, 5000);
  },

  stopSlideshow: function() {
    clearInterval(this.animate);
  },

  goToSlide: function(index) {
    var self = this;
    this.changeActiveSlideTo(index);
    this.updateActiveControl(index);
    if (index === 0) {
      this.slides
        .first()
        .fadeIn(function() {
          self.slides.fadeIn();
        }); // so all don't fade in at the same time
    } else {
      this.slides
        .filter(':lt(' + index + ')')
        .fadeOut();
    }
  },

  changeActiveSlideTo: function(index) {
    this.slides
      .removeClass('active')
      .eq(index)
      .addClass('active');
  },

  setup: function() {
    this.setupSlides();
    this.setupControls();
    this.startSlideshow();
  }
}

minimalSlide.setup();

$(window).on('load', function() {
  console.log('loaded');
  console.log(self);
});

// $(function() {
//
//
//
//
//
//
//     var slideSwitch = function($sections, $controls) {
//         if ($sections.filter('.active').index() === $sections.length) {
//             $sections
//                 .removeClass('active')
//                 .first()
//                 .addClass('active')
//                 .fadeIn(1000, function() {
//                     $sections.show()
//                 });
//             updateActiveControl($controls, 0)
//         } else {
//             var currentIndex = $sections.filter('.active').index();
//             $sections
//                 .filter('.active')
//                 .removeClass('active')
//                 .fadeOut(1000)
//                 .next()
//                 .addClass('active');
//             updateActiveControl($controls, currentIndex);
//         }
//     };
//
//     // change slide when control clicked
//     $controls.on('click', function() {
//         // FIXME: for some reason, the index is always 1 above
//         activeSectionIndex = $sections.filter('.active').index();
//         $this = $(this);
//
//         controlIndex = $this.index();
//
//         // if the control is already selecting the current section
//         console.log('activeIndex: ' + activeSectionIndex);
//         console.log('controlindex: ' + controlIndex);
//         if (activeSectionIndex === controlIndex) {
//             // do nothing
//         } else {
//             updateActiveControl($controls, controlIndex);
//
//             // finish any current animations then
//             // fadeOut sections then fade in selected one
//             $sections
//                 .finish()
//                 .filter('.active')
//                 .removeClass('active')
//                 .fadeOut(1000)
//                 .end()
//                 .eq(controlIndex)
//                 .fadeIn(1000)
//                 .addClass('active');
//         }
//     });
//
//     var animateInterval = setInterval(function() {
//         slideSwitch($sections, $controls)
//     }, 5000);
//
//     $('#animateToggle').on('click', function() {
//         $this = $(this);
//         if ($this.text() === "Pause") {
//             $this.text("Play");
//             clearInterval(animateInterval);
//         } else {
//             $this.text("Pause");
//             animateInterval = setInterval(function() {
//                 slideSwitch($sections, $controls)
//             }, 5000);
//         }
//     });
// });