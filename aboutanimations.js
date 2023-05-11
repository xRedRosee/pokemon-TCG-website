anime({
  // get the right HTML classes
  targets: '.line-drawing .lines path',

  // line animation
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',

  // keep looping
  loop: true
});

anime({
    // get the right HTML classes
  targets: '.easing-animation .el',

  // move direction
  translateX: 270,
  direction: 'alternate',
  
  // keep looping
  loop: true,
  duration: 2000,
   easing: function(el, i, total) {
    return function(t) {
      return Math.pow(Math.sin(t * (i + 1)), total);
      }
    }
  });