const a = document.getElementsByTagName('a');
console.log(a);

for (let i = 0; i < a.length; i++) {
    a[i].addEventListener('click', function(event) {
        event.preventDefault(); // abort <a> click
        foldMenu();
        const element = document.querySelector(a[i].getAttribute('href')); // get the signed element

        const scrollYStart = window.scrollY;
        const scrollOffset = element.offsetTop - scrollYStart;

        if (window.scrollY !== element.offsetTop) {
            console.log(scrollOffset);

            animate({
                duration: 200, // sets same scrolling speed for different scroll offset (change to constant for same scrolling time)
                timing: easeInOutQuad,
                draw: function(progress) {
                    window.scrollTo(0, scrollYStart + progress * scrollOffset);
                }
            });
        }
    });
}

function animate(options) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction from 0 to 1
        let timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;

        // current animate state
        let progress = options.timing(timeFraction);

        options.draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}

function easeInOutQuad(progress) {
    return progress < .5 ? 2*progress*progress : -1+(4-2*progress)*progress
}

const $hamburger = document.getElementById('hamburger'),
    $menu = document.getElementById('menu'),
    $content = document.getElementById('content');

foldMenu = () => {
    $menu.classList.remove('visible');
    $content.classList.remove('blurred');
    console.log('folded');
};

unfoldMenu = () => {
    $menu.classList.add('visible');
    $content.classList.add('blurred');
    console.log('unfolded');
};

$hamburger.addEventListener('click', () => {
    unfoldMenu();
});

$content.addEventListener('click', () => {
    foldMenu();
});