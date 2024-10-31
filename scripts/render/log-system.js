// // --------------------------------------------------------------
// //
// // Renders the logs in a log system
// //
// // --------------------------------------------------------------


// MyGame.render.LogSystem = function(system, graphics, logImage, gatorImage) {
//     'use strict';

//     let logImg = new Image();
//     let logReady = false;  
//     logImg.onload = function() {
//         logReady = true;
//     }
//     logImg.src = logImage;

//     let gatorImg = new Image();
//     let gatorReady = false;  
//     gatorImg.onload = function() {
//         gatorReady = true;
//     }
//     gatorImg.src = gatorImage;

//     //------------------------------------------------------------------
//     //
//     // Render all logs and gators
//     //
//     //------------------------------------------------------------------
//     function render() {
//         if (logReady && gatorReady) {
//             Object.getOwnPropertyNames(system.logs).forEach(function(value) {
//                 let log = system.logs[value];
                
//                 if (!log.isGator) {
//                     // Calculate width based on the natural aspect ratio
//                     const aspectRatio = logImg.width / logImg.height;
//                     const logWidth = log.size.y * aspectRatio;  // Width based on height and aspect ratio

//                     graphics.drawTexture(
//                         logImg, 
//                         { x: log.center.x, y: log.center.y }, // Position
//                         log.rotation, 
//                         { width: logWidth, height: log.size.y } // Proportional width and height
//                     );
//                 } else {
//                     // Calculate width for gator image based on its aspect ratio
//                     const aspectRatio = gatorImg.width / gatorImg.height;
//                     const gatorWidth = log.size.y * aspectRatio;

//                     graphics.drawTexture(
//                         gatorImg, 
//                         { x: log.center.x, y: log.center.y }, // Position
//                         log.rotation, 
//                         { width: gatorWidth, height: log.size.y } // Proportional width and height
//                     );
//                 }
//             });
//         }
//     }

//     let api = {
//         render: render,
//     };

//     return api;
// };

MyGame.render.LogSystem = function(system, graphics, logImage, gatorImage) {
    let logImg = new Image();
    let logReady = false;
    logImg.onload = function() {
        logReady = true;
    }
    logImg.src = logImage;

    let gatorImg = new Image();
    let gatorReady = false;
    gatorImg.onload = function() {
        gatorReady = true;
    }
    gatorImg.src = gatorImage;

    function render() {
        if (logReady && gatorReady) {
            Object.keys(system.logs).forEach(function(key, index) {
                let log = system.logs[key];
                // Alternate between images or display both based on index or conditions
                if (index % 2 === 0) {
                    graphics.drawTexture(
                        logImg,
                        { x: log.center.x, y: log.center.y },
                        log.rotation,
                        { width: log.size.x, height: log.size.y }
                    );
                } else {
                    graphics.drawTexture(
                        gatorImg,
                        { x: log.center.x, y: log.center.y },
                        log.rotation,
                        { width: log.size.x, height: log.size.y }
                    );
                }
            });
        }
    }

    return {
        render: render
    };
};
