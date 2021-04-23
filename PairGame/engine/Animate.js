
export function cardFlipAnimate(item1, item2, callback) {
    var timeline = gsap.timeline()
    timeline.to(item1, { duration: 0.5, scaleX: 0, });
    timeline.to(item2, {
        duration: 0.5, scaleX: 1, onComplete: () => {
            console.log('lol')
            item2.isClicked = 0;
            callback && callback()
        }
    });
   
}

export function cardZoomOutAnimate(item1, callback) {
    setTimeout(() => {
        var timeline = gsap.timeline()
        timeline.to(item1, { duration: 1.5, opacity: 0, scaleX: 2, scaleY: 2, zIndex: 99, })
            .to(item1, { zIndex: 1, onComplete: () => { callback && callback() } })
    }, 1000);
}