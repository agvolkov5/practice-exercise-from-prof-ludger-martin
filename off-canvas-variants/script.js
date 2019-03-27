document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);

const $menu = document.getElementById('menu');

let xDown = null;
let yDown = null;
let xMenuDown = null;

function getTouches(evt) {
    return evt.touches
}

function handleTouchStart(evt) {
    $menu.style.transition = "none";
    $menu.offsetWidth;
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
    xMenuDown = $menu.offsetLeft;
}

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        let menuOffsetX = xMenuDown + Math.abs(xDiff);
        if ( xDiff > 0 ) {
            menuOffsetX = xMenuDown - Math.abs(xDiff);
            /* left swipe */
        } else {
            /* right swipe */
        }
        if (menuOffsetX > 0) {
            menuOffsetX = 0;
        }
        $menu.style.left = menuOffsetX + 'px';
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    // xDown = null;
    // yDown = null;
}

function handleTouchEnd(evt) {
    $menu.style.transition = "all 300ms ease-in-out";
    $menu.offsetWidth;
    if ($menu.offsetLeft < -$menu.offsetWidth / 2) {
        $menu.style.left = -$menu.offsetWidth + 'px';
    } else {
        $menu.style.left = '0px';
    }

}