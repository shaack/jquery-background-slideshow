/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/jquery-background-slideshow/
 * License: MIT, see file 'LICENSE'
 */

;(function ($) {
    "use strict"
    $.extend({
        backgroundSlideshow: function (options) {
            var $body = $("body")
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
                layerStyles: {
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                    zIndex: -1
                },
                images: []
            }
            for (var option in options) {
                config[option] = options[option]
            }

            function preLoadImage(index) {
                if (!preloadedImages[index]) {
                    preloadedImages[index] = new Image()
                    preloadedImages[index].src = config.images[index]
                }
            }

            function addLayer(imageSrc) {
                var $newLayer = $("<div class='backgroundSlideshowLayer'/>")
                var layerStyles = config.layerStyles
                layerStyles.backgroundImage = "url(" + imageSrc + ")"
                $newLayer.css(layerStyles)
                var $lastLayer = $body.find(".backgroundSlideshowLayer").last()
                if ($lastLayer[0]) {
                    $lastLayer.after($newLayer)
                } else {
                    $body.prepend($newLayer)
                }
                $newLayer.hide()
                return $newLayer
            }

            function nextImage(transition) {
                currentImageIndex = nextImageIndex
                nextImageIndex++
                if (nextImageIndex >= config.images.length) {
                    nextImageIndex = 0
                }
                if ($nextLayer) {
                    $currentLayer = $nextLayer
                } else {
                    $currentLayer = addLayer(config.images[currentImageIndex])
                }
                if (config.onBeforeTransition) {
                    config.onBeforeTransition(currentImageIndex)
                }
                if (transition) {
                    $currentLayer.fadeIn(config.transitionDuration, function () {
                        if (config.onAfterTransition) {
                            config.onAfterTransition(currentImageIndex)
                        }
                        preLoadImage(nextImageIndex)
                        $nextLayer = addLayer(config.images[nextImageIndex])
                        cleanUp()
                    })
                } else {
                    $currentLayer.show()
                    if (config.onAfterTransition) {
                        config.onAfterTransition(currentImageIndex)
                        setTimeout(function () {
                            preLoadImage(nextImageIndex)
                            $nextLayer = addLayer(config.images[nextImageIndex])
                            cleanUp()
                        }, config.delay / 2)
                    }
                }
            }

            function cleanUp() {
                var $layers = $body.find(".backgroundSlideshowLayer")
                if ($layers.length > 2) {
                    $layers.first().remove()
                }
            }

            nextImage(false)
            setTimeout(function () {
                nextImage(true)
                setInterval(function () {
                    nextImage(true)
                }, config.delay + config.transitionDuration)
            }, config.delay)

        }
    })
}(jQuery))