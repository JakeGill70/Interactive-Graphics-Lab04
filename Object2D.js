"use strict";
class Object2D {
    constructor() {
        this.vertices = [];
        this.edges = [];
        this.orientation = new Matrix2D();
        this.animation = null;

        // elapsedTimeMS: number, the number of milleseconds since the last call
        this.update = function _update(elapsedTimeMS) {
            if (this.animation) {
                this.animation.update(elapsedTimeMS);
            }
        };


        this.render = function _render(context, parentOrientation) {
            context.beginPath();
            for (let i = 0; i < this.edges.length - 1; i += 2) {
                const si = this.edges[i];
                const ei = this.edges[i + 1];
                let sv = this.orientation.transform(this.vertices[si]);
                let ev = this.orientation.transform(this.vertices[ei]);
                sv = parentOrientation.transform(sv);
                ev = parentOrientation.transform(ev);
                context.moveTo(sv.x, sv.y);
                context.lineTo(ev.x, ev.y);
            }
            context.stroke();
        };
    }
}