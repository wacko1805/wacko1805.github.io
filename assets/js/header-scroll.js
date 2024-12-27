document.addEventListener('scroll', function() {
    // Get the scroll position
    let scrollPosition = window.scrollY;
    
    // Define a maximum scroll value to limit the padding change
    let maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    // Calculate padding based on scroll position, increasing with scroll
    let newPaddingVh = 25 + (scrollPosition / maxScroll) * 60; // Adjust the 10 for desired increase in padding


    // Apply the new padding dynamically
    document.querySelector('.name').style.paddingTop = `${newPaddingVh}vh`;
  //   document.querySelector('.name').style.paddingBottom = `${newPaddingVh}vh`;

  });