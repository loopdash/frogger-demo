// // --------------------------------------------------------------
// //
// // Renders the turtles in a turtle system
// //
// // --------------------------------------------------------------

MyGame.render.TurtleSystem = function(system, graphics, turtleImageSrc) {
    'use strict';

    let turtleImg = new Image();
    let turtleReady = false;  
    turtleImg.onload = function() {
        turtleReady = true;
    }
    turtleImg.src = turtleImageSrc;

    //------------------------------------------------------------------
    //
    // Render all turtles with the full image
    //
    //------------------------------------------------------------------
    function render() {
        if (turtleReady) {
            Object.getOwnPropertyNames(system.turtles).forEach(function(value) {
                let turtle = system.turtles[value];

                // Render the full turtle image at the specified position and size
                graphics.drawTexture(
                    turtleImg, 
                    { x: turtle.center.x, y: turtle.center.y }, // Position
                    turtle.rotation, // Rotation if any
                    { width: turtle.size.x, height: turtle.size.y } // Size
                );
            });
        }
    }

    let api = {
        render: render,
    };

    return api;
};
