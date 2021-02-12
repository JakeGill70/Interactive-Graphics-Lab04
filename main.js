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

    function makeSquare() {
        // Implementation by Dr. Jeff Roach as notes inside of 
        // "CSCI4157-Animation-HierarchicalModeling" on D2L.
        // https://elearn.etsu.edu/d2l/le/content/8468953/viewContent/72103140/View
        let square = new Object2D();
        square.vertices = [{ x: -10, y: 10 }, { x: -10, y: -10 }, { x: 10, y: -10 }, { x: 10, y: 10 }];
        square.edges = [0, 1, 1, 2, 2, 3, 3, 0];
        return square;
    }

    let squareA = makeSquare();
    let squareB = makeSquare();
    let squareC = makeSquare();

    squareA.animation = new RotateAboutCenterAnimation(squareA, 180);
    squareB.animation = new RotateAboutCenterAnimation(squareB, 90);
    squareC.animation = new RotateAboutCenterAnimation(squareC, 45);

    pencil.addChild(squareA, { x: 0, y: 100 });
    pencil.addChild(squareB, { x: -50, y: 0 });
    pencil.addChild(squareC, { x: 50, y: 0 });

    world.dc.setYBasis({ x: 0, y: -1 });
    world.dc.translate(canvas.width / 2, canvas.height / 2);
    world.objects.set("arrow", arrow);
    world.objects.set("pencil", pencil);
    world.objects.set("axis", axis);
    animationLoop.run();

})();