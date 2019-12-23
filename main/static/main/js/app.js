/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

particlesJS.load('particles-js', '../static/main/js/particlesjs-config.json', function() {
  console.log('callback - particles.js config loaded');
});



// Lottie animations
// Requires all JSON payloads
var preloaderAnimation = lottie.loadAnimation({
	container: document.getElementById('preloader'),
	renderer: 'svg',
	loop: true,
	autoplay: true,
	animationData: preloader
});

var logoAnimation = lottie.loadAnimation({
	container: document.querySelector('.intro-logo'),
	renderer: 'svg',
	loop: true,
	autoplay: false,
	animationData: logo
});


window.addEventListener('load', function() {

  // Take a second, let everything setup or we create jank
	setTimeout(function() {
    // Fade out preloader
    $("#preloader").fadeOut("slow");

    // Destroy preloader, we don't need it
    setTimeout(function() {
      preloaderAnimation.stop();
      preloaderAnimation.destroy();
    }, 2000);

    // Wait for preloader to hide, then start logo animation
    setTimeout(function() {
      logoAnimation.play();
    }, 500);
  }, 1000);

  // Lazy set maps
  setTimeout(function() {
    $('.map-container')[0].innerHTML = '<iframe id="gmap-canvas" src="https://maps.google.com/maps?q=Blustrings&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="yes" marginheight="0" marginwidth="0"></iframe>';
  }, 2500);


  // OWL for carousel
  $owl = $('#gallery-slides');
  $owl.owlCarousel({
    center:true,
    items:1,
    loop:true,
    margin:20,
    autoplay:true,
    autoplaySpeed: 350,
    autoplayTimeout:6000,
    navigation:false,
    dots:false,
    autoHeight:false,
    touchDrag:true,
    mouseDrag:false,
    slideTransition:'ease-in-out',
  });

  $owl.on('changed.owl.carousel', function(e) {
    var index = e.item.index - 1;
    var count = e.item.count;
    if (index > count) {
        index -= count;
    }
    if (index <= 0) {
        index += count;
    }
    $('#gallery-info').html('<span>' + index + '</span> — <span>' + count + '</span>');
    $owl.trigger('stop.owl.autoplay');
    $owl.trigger('play.owl.autoplay');
  });

  // Go to the next item
  $('#forward').click(function() {
    $owl.trigger('next.owl.carousel');
  });

  // play pause
  $('#play-b').click(function() {
    console.log('Play pausing');
    if (this.dataset.playing === 'true') {
      this.innerHTML = ' ▶ ';
      $owl.trigger('stop.owl.autoplay');
      this.dataset.playing = false;
    } else {
      this.innerHTML = ' ❙❙ ';
      $owl.trigger('play.owl.autoplay');
      this.dataset.playing = true;
    }
  });

  // Go to the previous item
  $('#backward').click(function() {
    $owl.trigger('prev.owl.carousel');
  });

  $('#play-b')[0].dataset.playing = true;
}, {once: true});


window.addEventListener('resize', function() {
  window.location.hash = '#home';
});
