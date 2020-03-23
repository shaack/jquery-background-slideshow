/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/jquery-background-slideshow/
 * License: MIT, see file 'LICENSE'
 */

;(function ($) {
    "use strict"
    $.fn.backgroundSlideshow = function (options) {

        this.each(function () {

            var $container = $(this)
            var $currentLayer = null
            var $nextLayer = null
            var currentImageIndex = 0
            var nextImageIndex = 0
            var preloadedImages = []
            var config = {
                delay: 5000,
                transitionDuration: 3000,
                onBeforeTransition: null,
                onAfterTransition: null,
                fixed: false,
                images: []
            }
            for (var option in options) {
                config[option] = options[option]
            }
            var transition = "opacity " + config.transitionDuration +  "ms ease-in-out"
            var layerStyles = {
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                position: config.fixed ? "fixed" : "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                zIndex: -1
            }
            var layerStylesTransition = {
                transition: transition,
                "-webkit-transition": transition,
                "-moz-transition": transition,
                "-o-transition": transition
            }

            function preLoadImage(index) {
                if (!preloadedImages[index]) {
                    preloadedImages[index] = new Image()
                    preloadedImages[index].src = config.images[index]
                }
            }

            function addLayer(imageSrc, withTransition) {
                var $newLayer = $("<div class='backgroundSlideshowLayer'/>")
                var thisLayerStyles = layerStyles
                thisLayerStyles.backgroundImage = "url(" + imageSrc + ")"
                $newLayer.css("opacity", "0")
                $newLayer.css(thisLayerStyles)
                if(withTransition) {
                    $newLayer.css(layerStylesTransition)
                }
                var $lastLayer = $container.find("> .backgroundSlideshowLayer").last()
                if ($lastLayer[0]) {
                    $lastLayer.after($newLayer)
                } else {
                    $container.prepend($newLayer)
                }
                return $newLayer
            }

            function nextImage(withTransition) {
                currentImageIndex = nextImageIndex
                nextImageIndex++
                if (nextImageIndex >= config.images.length) {
                    nextImageIndex = 0
                }
                if ($nextLayer) {
                    $currentLayer = $nextLayer
                } else {
                    $currentLayer = addLayer(config.images[currentImageIndex], withTransition)
                }
                if (config.onBeforeTransition) {
                    config.onBeforeTransition(currentImageIndex)
                }

                $currentLayer.css("opacity", "1")
                setTimeout(function() {
                    if (config.onAfterTransition) {
                        config.onAfterTransition(currentImageIndex)
                    }
                    preLoadImage(nextImageIndex)
                }, withTransition ? config.transitionDuration : 0)
                setTimeout(function() {
                    $nextLayer = addLayer(config.images[nextImageIndex], true)
                    cleanUp()
                }, config.transitionDuration)
            }

            function cleanUp() {
                var $layers = $container.find("> .backgroundSlideshowLayer")
                if ($layers.length > 2) {
                    $layers.first().remove()
                }
            }

            $container.css("position", "relative")
            nextImage(false)
            setTimeout(function () {
                nextImage(true)
                setInterval(function () {
                    nextImage(true)
                }, config.delay + config.transitionDuration)
            }, config.delay)

        })
    }
}(jQuery))