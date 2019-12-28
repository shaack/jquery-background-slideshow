# jquery-background-slideshow plugin

It

- is mobile friendly, loads images only before shown,
- pre loads only the next image shown,
- uses a fade transition for the images,
- works in all modern browsers and the internet explorer (not tested with IE < 11).

[Demo Page](https://shaack.com/projekte/jquery-background-slideshow/)

[GitHub Repository](https://github.com/shaack/jquery-background-slideshow/)

Usage:

```
$.backgroundSlideshow({
    delay: 10000, // delay between images in seconds, optional, defaults to 5000
    transitionDuration: 3000, // optional, defaults to 3000
    onBeforeTransition: callbackBeforeShowingAnImage, // optional
    onAfterTransition: callbackAfterShowingAnImage, // optional
    images: ["image1.jpg", "image2.jpg", "image3.jpg"]
})
```