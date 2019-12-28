/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/bootstrap-input-spinner
 * License: MIT, see file 'LICENSE'
 */

;(function ($) {
    "use strict"
    $.extend({
        backgroundSlideshow: function (options) {
            var preLoadedImages = []
            var $body = $("body")
            var currentImageIndex = 0
            var nextImageIndex = 0
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
                if (!preLoadedImages[index]) {
                    preLoadedImages[index] = new Image()
                    preLoadedImages[index].src = config.images[index]
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
                var $nextLayer = addLayer(config.images[currentImageIndex])
                if(nextImageIndex >= config.images.length) {
                    nextImageIndex = 0
                }
                if (config.onBeforeTransition) {
                    config.onBeforeTransition(currentImageIndex)
                }
                if (transition) {
                    $nextLayer.fadeIn(config.transitionDuration, function () {
                        if (config.onAfterTransition) {
                            config.onAfterTransition(currentImageIndex)
                            preLoadImage(nextImageIndex)
                        }
                    })
                } else {
                    $nextLayer.show()
                    if (config.onAfterTransition) {
                        config.onAfterTransition(currentImageIndex)
                        setTimeout(function() {
                            preLoadImage(nextImageIndex)
                        }, 1000)
                    }
                }
                cleanUp()
            }

            function cleanUp() {
                var $layers = $body.find(".backgroundSlideshowLayer")
                if($layers.length > 2) {
                    $layers.first().remove()
                }
            }

            nextImage(false)
            setTimeout(function() {
                nextImage(true)
                setInterval(function () {
                    nextImage(true)
                }, config.delay + config.transitionDuration)
            }, config.delay)

        }
    })
}(jQuery))