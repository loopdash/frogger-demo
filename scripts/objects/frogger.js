MyGame.objects.Frogger = function(spec) {
    'use strict';

    let speed = 0;
    let currentLocation = {
        x: spec.center.x,
        y: spec.center.y,
    };
    let jumping = false;
    let jumptime = 0;
    let rotation = 0;
    let pi = Math.PI;

    let idleReady = false;
    let idle = new Image();
    idle.onload = function() {
        idleReady = true;
    };
    idle.src = 'assets/images/player.png';

    // let jumpReady = false;
    // let jump = new Image();
    // jump.onload = function() {
    //     jumpReady = true;
    // };
    // jump.src = 'assets/images/frogger-jump.png';

    let playerLeftReady = false;
    let playerLeft = new Image();
    playerLeft.onload = function() {
        playerLeftReady = true;
    };
    playerLeft.src = 'assets/images/player-left.png';
    
    let playerRightReady = false;
    let playerRight = new Image();
    playerRight.onload = function() {
        playerRightReady = true;
    };
    playerRight.src = 'assets/images/player-right.png';
    
    let direction = "idle"; // Track direction state
    
    function currentImage(){
        if (direction === "left") {
            return playerLeft;
        } else if (direction === "right") {
            return playerRight;
        } else {
            return idle;
        }
    }
    
    function currentImageReady(){
        if (direction === "left") {
            return playerLeftReady;
        } else if (direction === "right") {
            return playerRightReady;
        } else {
            return idleReady;
        }
    }
    function updateImage(newDirection) {
        switch(newDirection){
            case "up":
            case "down":
                // Set direction to idle if moving up or down
                direction = "idle";
                break;
            case "left":
                direction = "left";
                break;
            case "right":
                direction = "right";
                break;
        }
    }
    
    function updateRotation(direction) {
        switch(direction){
            case "up":
                rotation = 0;
                break;
            case "down":
                rotation = 0;
                break;
            case "left":
                rotation = (3*pi) / 2;
                break;
            case "right":
                rotation = pi / 2;
                break;
        }
    }

    function moveUp() {
        if(!jumping){
            updateImage("up");
            moveTo({
                x: spec.center.x,
                y: spec.center.y - spec.size.height,
            });
        }
    }

    function moveDown() {
        if(!jumping){
            updateImage("down");
            moveTo({
                x: spec.center.x,
                y: spec.center.y + spec.size.height,
            });
        }
    }

    function moveLeft() {
        if(!jumping){
            updateImage("left");
            moveTo({
                x: spec.center.x - spec.size.width,
                y: spec.center.y,
            });
        }
    }

    function moveRight() {
        if(!jumping){
            updateImage("right");
            moveTo({
                x: spec.center.x + spec.size.width,
                y: spec.center.y,
            });
        }
    }

    function moveTo(pos, jumped = true) {
        if(checkPos(pos)){
            jumptime += 175;
            speed = 0;
            spec.center.x = pos.x;
            spec.center.y = pos.y;
            currentLocation.x = pos.x;
            currentLocation.y = pos.y;
            if(jumped && ! spec.attractMode){
                resetSound('hop');
                playSound('hop');
            }
        }
    }

    function changeSpeed(newSpeed){
        speed = newSpeed;
    }

    function stopJumping(){
        jumping = false;
        jumptime = 0;
    }

    // makes sure the position is within the bounds of the canvas
    function checkPos(pos){
        return !(
            pos.x > spec.canvasSize.width ||
            pos.x < 0 ||
            pos.y > spec.canvasSize.height ||
            pos.y < 0
        );
    }

    // update frogger's jump time or his speed if he is on a log/turtle
    function update(elapsedTime){
        if(jumptime > 0){
            jumptime -= elapsedTime;
        }

        if(jumptime > 0){
            jumping = true;
        } else{
            jumping = false;
            jumptime = 0;
        }

        let newX = spec.center.x + speed * (elapsedTime / 1000);
        let newPos = {
            x: newX,
            y: spec.center.y,
        }

        if(checkPos(newPos)){
            spec.center.x = newX;
            currentLocation.x = newX;
        }
    }


    // gets frogger's current index for attract mode
    function getIndex(){
        return {
            x: Math.round(4*currentLocation.x / spec.size.width),
            y: Math.floor(currentLocation.y / spec.size.height) - 1,
        };
    }

    // reset frogger back to the starting position
    function reset(){
        moveTo({ 
            x: spec.canvasSize.width / 2, 
            y: spec.canvasSize.height - spec.size.height / 2
        }, false);
        updateImage("up");
        stopJumping();
    }

    let api = {
        updateImage: updateImage,
        moveLeft: moveLeft,
        moveRight: moveRight,
        moveUp: moveUp,
        moveDown: moveDown,
        moveTo: moveTo,
        update:  update,
        changeSpeed: changeSpeed,
        reset: reset,
        getIndex: getIndex,
        get imageReady() { return currentImageReady(); },
        get rotation() { return rotation; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        get image(){ return currentImage(); },
        get currentLocation() {return currentLocation;},
    };

    return api;
}
