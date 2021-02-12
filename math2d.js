"use strict";
class Matrix2D {
    constructor() {
        let _m = [
            1, 0, 0,
            0, 1, 0
        ];

        this.asString = function _asString() {
            return `${_m[0]} ${_m[1]} ${_m[2]}\n` +
                `${_m[3]} ${_m[4]} ${_m[5]}\n` +
                "0 0 1";
        };

        this.getPosition = function _getPosition() {
            return { x: _m[2], y: _m[5] };
        };

        this.setXBasis = function _setXBasis(v) {
            _m[0] = v.x;
            _m[3] = v.y;
        };

        this.setYBasis = function _setYBasis(v) {
            _m[1] = v.x;
            _m[4] = v.y;
        };

        this.getYBasis = function _getYBasis() {
            return { x: _m[1], y: _m[4] };
        }

        this.transform = function _transform(vertex) {
            let result = { x: 0, y: 0 };
            result.x = _m[0] * vertex.x + _m[1] * vertex.y + _m[2];
            result.y = _m[3] * vertex.x + _m[4] * vertex.y + _m[5];
            return result;
        };

        this.setTranslation = function _setTranslation(tx, ty) {
            _m[2] = tx;
            _m[5] = ty;
        };

        this.translate = function _translate(tx, ty) {
            let n = [
                1, 0, tx,
                0, 1, ty
            ];
            _leftMultiplyBy(n);
        }

        this.scale = function _scale(sx, sy) {
            let n = [
                sx, 0, 0,
                0, sy, 0
            ];
            _leftMultiplyBy(n);

        };

        this.setScale = function _setScale(sx, sy) {
            _m[0] = sx;
            _m[4] = sy;
        };

        this.setRotation = function _setRotation(degrees) {
            const radians = degrees * Math.PI / 180.0;
            const cos = Math.cos(radians);
            const sin = Math.sin(radians);
            _m[0] = cos;
            _m[1] = -sin;
            _m[3] = sin;
            _m[4] = cos;
        };

        this.rotate = function _rotate(degrees) {
            const radians = degrees * Math.PI / 180.0;
            const cos = Math.cos(radians);
            const sin = Math.sin(radians);
            let n = [
                cos, -sin, 0,
                sin, cos, 0
            ];
            _leftMultiplyBy(n);
        };

        this.rotateCCWAboutPosition = function _rotateCCWAboutPosition(degrees, position) {
            const radians = degrees * Math.PI / 180.0;
            const cos = Math.cos(radians);
            const sin = Math.sin(radians);
            let n = [
                1, 0, -position.x,
                0, 1, -position.y
            ];
            let m = [
                cos, -sin, 0,
                sin, cos, 0
            ];
            n = _multiply(m, n);
            m = [
                1, 0, position.x,
                0, 1, position.y
            ];
            let r = _multiply(m, n);
            _leftMultiplyBy(r);
        }

        function _multiply(m, n) {
            let r = [];
            r[0] = m[0] * n[0] + m[1] * n[3];
            r[1] = m[0] * n[1] + m[1] * n[4];
            r[2] = m[0] * n[2] + m[1] * n[5] + m[2];
            r[3] = m[3] * n[0] + m[4] * n[3];
            r[4] = m[3] * n[1] + m[4] * n[4];
            r[5] = m[3] * n[2] + m[4] * n[5] + m[5];
            return r;
        }

        function _multiplyBy(n) {
            let m = _m.slice();
            _m[0] = m[0] * n[0] + m[1] * n[3];
            _m[1] = m[0] * n[1] + m[1] * n[4];
            _m[2] = m[0] * n[2] + m[1] * n[5] + m[2];
            _m[3] = m[3] * n[0] + m[4] * n[3];
            _m[4] = m[3] * n[1] + m[4] * n[4];
            _m[5] = m[3] * n[2] + m[4] * n[5] + m[5];
        };

        function _leftMultiplyBy(n) {
            let m = _m.slice();
            _m[0] = n[0] * m[0] + n[1] * m[3];
            _m[1] = n[0] * m[1] + n[1] * m[4];
            _m[2] = n[0] * m[2] + n[1] * m[5] + n[2];

            _m[3] = n[3] * m[0] + n[4] * m[3];
            _m[4] = n[3] * m[1] + n[4] * m[4];
            _m[5] = n[3] * m[2] + n[4] * m[5] + n[5];
        };
    }
}