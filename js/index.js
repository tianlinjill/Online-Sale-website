// loaded js after all static resources loaded.
window.addEventListener('load', function() {
    // mouse enter could show the arrow icons, mouse lease could hidden the arrow icons.
    var arr_l = document.querySelector('.arr-l');
    var arr_r = document.querySelector('.arr-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // mouseenter to show arrows
    focus.addEventListener('mouseenter', function() {
            arr_l.style.display = 'block';
            arr_r.style.display = 'block';
            //mouseenter could stop image change
            clearInterval(timer);
            timer = null;
        })
        // mouseleave to hide arrows
    focus.addEventListener('mouseleave', function() {
        arr_l.style.display = 'none';
        arr_r.style.display = 'none';
        timer = setInterval(function() {

            arr_r.click();
        }, 3000);

    })

    //circles would create by js and the number is acording to the number of images.
    var ul = focus.querySelector('ul');
    var ol = document.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        //create circle and added into ol class
        var li = document.createElement('li');
        // added index on each li
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('mouseenter', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //click listed circles could control the image to move accordingly.
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -(index * focusWidth));
        })
    }
    ol.children[0].className = 'current';
    //clone the first image and append into last
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first)
        /*
        click the right arrow in foucs image could make the current images move to left,
         and show the next image, click the left arrow could make the current image move to right, 
         and show the previous image.
        */
    var num = 0;
    //circle contrl the circle button
    var circle = 0;

    // added a Throttle valve to control the animation, only after the animation finished users could do next animation.
    var flag = true;
    arr_r.addEventListener('click', function() {
        if (flag) {
            // close the Throttle valve and wait for the animation finished.
            flag = false;
            // to make all images scolled, first copy the first image, if come to this one
            // we need to rest the ul's left to 0.
            if (num === ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; // animation finised, open the Throttle valve.
            });
            // click right arrow, circle would change accordingly.
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    })
    arr_l.addEventListener('click', function() {
            if (flag) {
                // close the Throttle valve and wait for the animation finished.
                flag = false;
                // to make all images scolled, first copy the first image, if come to this one
                // we need to rest the ul's left to 0.
                if (num === 0) {
                    num = ul.children.length - 1;
                    ul.style.left = -num * focusWidth + 'px';

                }
                num--;
                animate(ul, -num * focusWidth, function() {
                    flag = true; // animation finised, open the Throttle valve.
                });
                // click left arrow, circle would change accordingly.
                //if cirecle <0 then it should change to 4
                circle--;
                if (circle < 0) {
                    circle = ol.children.length - 1;
                }
                circleChange();
            }
        })
        //change circle's className
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    var timer = setInterval(function() {

        arr_r.click();
    }, 3000)
})