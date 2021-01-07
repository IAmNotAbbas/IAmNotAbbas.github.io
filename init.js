function initGallery() {
    var slideNumber = 0; // This will hold the current active slide in the gallery
    var imageItemClass = 'image-item';
    var items = document.getElementsByClassName(imageItemClass);
    var numItems = items.length;
    var animating = false; // Will hold if we are currently transitioning slides

    var defaultClass = imageItemClass;
    var prevClass = imageItemClass + ' previous';
    var nextClass = imageItemClass + ' next';
    var activeClass = imageItemClass + ' active';

    function setStartClasses() {
        items[0].className = activeClass;
        items[1].className = nextClass;
        items[items.length - 1] = prevClass;
    }

    function mapSlideNumber(slideNumber) {
        if(slideNumber >= numItems) {
            return slideNumber - numItems
        } else if(slideNumber < 0) {
            return slideNumber + numItems
        }
        return slideNumber
    }

    function moveToSlide(newSlideNumber) {
        // If we are currently animating between slides then we dont want to move to another
        if(animating) {
            return
        }
        var prevSlideNumber = newSlideNumber - 1;
        var nextSlideNumber = newSlideNumber + 1;

        // Ensure new slide numbers are in range;
        newSlideNumber = mapSlideNumber(newSlideNumber)
        prevSlideNumber = mapSlideNumber(prevSlideNumber)
        nextSlideNumber = mapSlideNumber(nextSlideNumber)

        animating = true;
        // Use es6 spread operator to convert dom collection to an array so that forEach can be called
        // reference: https://stackoverflow.com/questions/3871547/js-iterating-over-result-of-getelementsbyclassname-using-array-foreach
        Array.from(items).forEach((item, index) => {
            if(index == newSlideNumber) {
                item.className = activeClass;
            } else if(index == prevSlideNumber) {
                item.className = prevClass;
            } else if(index == nextSlideNumber) {
                item.className = nextClass;
            } else {
                item.className = defaultClass;
            }
        });

        setTimeout(() => {
            animating = false
        }, 500)

        slideNumber = newSlideNumber;
    }

    function nextSlide() {
        moveToSlide(slideNumber + 1)        
    }

    function previousSlide() {
        moveToSlide(slideNumber - 1)
    }

    function initEventHandlers() {
        var nextButton = document.getElementsByClassName('image-next-button')[0];
        var prevButton = document.getElementsByClassName('image-previous-button')[0];

        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', previousSlide);

    }

    function startAutoplay() {
        setInterval(() => {
           nextSlide()    
        }, 2000);
    }

    setStartClasses();
    initEventHandlers();
    startAutoplay();
}

document.addEventListener("DOMContentLoaded", function(){
    // Will be exercuted when dom is ready
    initGallery()
});