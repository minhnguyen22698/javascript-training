
export function cardFlipAnimate(item1, item2, callback) {
    var timeline = gsap.timeline()
    timeline.to(item1, { duration: 0.5, scaleX: 0, });
    timeline.to(item2, {
        duration: 0.5, scaleX: 1, onComplete: () => {
            callback && callback()
        }
    });
}

export function cardZoomOutAnimate(item, callback) {
    setTimeout(() => {
        var timeline = gsap.timeline()
        timeline.to(item, {
            duration: 1, opacity: 0, scaleX:1,scale: 1.5, zIndex: 99, onComplete: () => {
                item.active = false
                callback && callback()
            }
        })
    }, 1000);
}
