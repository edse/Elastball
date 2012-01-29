# Errata Sheet

Updates and corrections to [Foundation HTML5 Animation with JavaScript](http://lamberta.github.com/html5-animation/)—If
you find any more, please let [me](https://github.com/lamberta) know!

## p. v, vii, 69

Chapter 4 should be titled "Rendering Techniques".

## p. 54, 55

The division operation is extraneous to the equation abstraction. (Submitted by Peter Stema)

    ball.y = centerY + Math.sin(angle) * range;

## p. 111

An error at press time has caused an errant graphic to
obscure portions of the text. The complete paragraphs are as
follows:

... So, given the 45 degrees and the hypotenuse of 1 pixel, you
should be able to use `Math.cos` and `Math.sin` to find the
lengths of `vx` and `vy`.

The side adjacent to the angle is `vx`. The cosine of an angle
is the adjacent/hypotenuse. Or, stated another way, the
adjacent side is the cosine of the angle times the
hypotenuse. Similarly, the opposite side is `vy`. Sine is
opposite/hypotenuse, or the opposite is the sine times
hypotenuse.

Here’s the formula you would use:

    vx = Math.cos(angle) * speed;
    vy = Math.sin(angle) * speed;

Now don’t you dare forget to convert the 45 degrees to
radians before passing it into the Math functions! This is
what the code looks like after we plug in example values: ...

## p. 176

In an updated Editor's Draft of the [W3C Animation-Timing](http://www.w3.org/TR/animation-timing/)
specification, `window.cancelRequestAnimationFrame` has been renamed to `window.cancelAnimationFrame`. (Submitted by Paul Irish)

Exercise [03-easing-off.html](https://github.com/lamberta/html5-animation/blob/master/examples/ch08/03-easing-off.html)
has been updated to use this name:

    window.cancelAnimationFrame(animRequest);

## p. 177

The cross-browser test for the `cancelAnimationFrame` function definition has been updated in
[utils.js](https://github.com/lamberta/html5-animation/blob/master/examples/include/utils.js)
to reflect its name change:

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
                                     window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
                                     window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
                                     window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
                                     window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
                                     window.clearTimeout);
    }

## p. 462

Exercise [14-time-based-3.html](https://github.com/lamberta/html5-animation/blob/master/examples/ch19/14-time-based-3.html)
exhibits a bug when a user switches to a new browser tab,
then, after a few seconds, switches back to the tab running
the example. (Submitted by Paul Irish)

The current frame uses the time stored by the previous frame
to calculate the elapsed time. Since switching browser tabs
increases this value by many times, the calculation for
vertical velocity results in excessive motion. One fix is to
establish a range for the `elapsed` value before applying
the `gravity` multiplier. The typical framerate is about 17 milliseconds.

    elapsed = Math.min(20, Math.max(-20, elapsed));
    vy += gravity * elapsed / 1000;
