function animate(obj, target, callback) {
    //clear previous timer, only keep one timer
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // make step int
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // clear timer to stop animation
            clearInterval(obj.timer);
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}