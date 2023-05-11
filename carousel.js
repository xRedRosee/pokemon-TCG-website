// automatic carousel with glideJS 3.5 seconds
export function slideShow3Seconds(element){
  const glideCards = new Glide(element, {
    type: 'carousel',
    animationDuration: 2000,
    autoplay: 3500,
    focusAt: '1',
    startAt: 1,
    perView: 1, 
  });
  
glideCards.mount();
}