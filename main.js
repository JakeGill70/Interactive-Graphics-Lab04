"use strict";
(function _main() {
    let canvas = document.getElementById("drawingCanvas");
    let world = new World2D(canvas);
    let animationLoop = new AnimationLoop(world);

    let arrow = new Object2D();
    arrow.vertices = [
        { x: 0, y: 40 }, { x: -30, y: 0 }, { x: -10, y: 0 }, { x: -10, y: -30 },
        { x: 10, y: -30 }, { x: 10, y: 0 }, { x: 30, y: 0 }
    ];
    arrow.edges = [
        0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 0
    ];
    arrow.orientation.translate(100, 50);
    arrow.orientation.rotateCCWAboutPosition(45, { x: 100, y: 50 });
    arrow.animation = new ForwardThenTurnAroundAnimation(arrow, 50, 10, 45);

    let pencil = new Object2D();
    pencil.vertices = [
        { x: 0, y: 60 }, { x: -10, y: 40 }, { x: -10, y: -40 }, { x: 10, y: -40 },
        { x: 10, y: 40 }
    ];
    pencil.edges = [
        0, 1, 1, 2, 2, 3, 3, 4, 4, 0, 1, 4
    ];
    pencil.orientation.translate(200, 0);
    //pencil.animation = new ForwardThenTurnAroundAnimation(pencil, 200, 25, 180);
    pencil.animation = new ForwardStrafingTurnAround(pencil, 100, 25, 30);

    let axis = new Object2D();
    axis.vertices = [
        { x: 0, y: 0 }, { x: 100, y: 0 }, { x: 0, y: 100 },
        // Y
        { x: 0, y: 110 }, { x: 0, y: 120 }, { x: -10, y: 130 }, { x: 10, y: 130 },
        // X
        { x: 110, y: -10 }, { x: 130, y: -10 }, { x: 130, y: 10 }, { x: 110, y: 10 }
    ];
    axis.edges = [
        0, 1, 0, 2,
        3, 4, 4, 5, 4, 6,
        7, 9, 8, 10
    ];

    world.dc.setYBasis({ x: 0, y: -1 });
    world.dc.translate(canvas.width / 2, canvas.height / 2);
    world.objects.set("arrow", arrow);
    world.objects.set("pencil", pencil);
    world.objects.set("axis", axis);
    animationLoop.run();

})();