"use strict";
class RotateAnimation{
    constructor(object, degreesPerSecond = 45){
        let _object = object;
        let _degreesPerSecond = degreesPerSecond;
        const ONE_SECOND = 1000;

        this.update = function _update(elapsedTimeMS){
            let deltaDegrees = (_degreesPerSecond * elapsedTimeMS)/ONE_SECOND;
            _object.orientation.rotate(deltaDegrees);
        };
    }
};

class RotateAboutCenterAnimation{
    constructor(object, degreesPerSecond = 45){
        let _object = object;
        let _degreesPerSecond = degreesPerSecond;
        const ONE_SECOND = 1000;

        this.update = function _update(elapsedTimeMS){
            let deltaDegrees = (_degreesPerSecond * elapsedTimeMS)/ONE_SECOND;
            let position = _object.orientation.getPosition();
            _object.orientation.rotateCCWAboutPosition(deltaDegrees, position);
        };
    }
};
