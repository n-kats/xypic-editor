/// <reference path="../typings/tsd.d.ts" />
class xyelm {
    hight: number;
    width: number;
    vertexes: string[][];
    edges: edge[];
    edgesMap: string[][][];

    constructor(h, w) {
        this.hight = h;
        this.width = w;
        this.vertexes = new Array(h);
        /*
        _.times(h, (i) => {
            this.vertexes[i] = new Array(w);
            _.times(w, (j) => {
                this.vertexes[i][j] = "";
            });
        });
        */
        for (var i = 0; i < h; i++) {
            this.vertexes[i] = new Array(w);
            for (var j = 0; j < w; j++) {
                this.vertexes[i][j] = "";
            }
        }
        this.edges = [];
        this.edgesMap = new Array(h);
        for (var i = 0; i < h; i++) {
            this.edgesMap[i] = new Array(w);
            for (var j = 0; j < w; j++) {
                this.edgesMap[i][j] = [];
            }
        }
        
    }

    public addEdge(e: edge) {
        this.edges.push(e);
        this.edgesMap[e.from.i][e.from.j].push(e.toArraw());
    }

    public deleteEdge(e: edge) {
        var i = 0;
        while (i < this.edges.length) {
            if (this.edges[i].eq(e)) {
                this.edges.splice(i, 1);
            } else {
                i++;
            }
        }
        i = 0;
        while (i < this.edgesMap[e.from.i][e.from.j].length) {
            if (this.edgesMap[e.from.i][e.from.j][i] == e.toArraw()) {
                this.edgesMap[e.from.i][e.from.j].splice(i, 1);
            } else {
                i++;
            }
        }
    }

    /*
    public setVertex(i: number, j: number, val: string) {
        this.vertexes[i][j] = val; 
    }
    */
    public setVertex(v: vertex) {
        this.vertexes[v.i][v.j] = v.toTeX();
    }

    public deleteVertex(i: number, j: number) {
        this.vertexes[i][j] = "";
    }
    public build(): string {
        var str = "";
        str += "\\[\\xymatrix{"
        for (var i = 0; i < this.hight; i++) {
            for (var j = 0; j < this.width; j++) {
                if (j != 0) { str += " & " }
                str += this.vertexes[i][j];
                var eds = this.edgesMap[i][j];
                for (var k = 0; k < eds.length; k++) {
                    str += eds[k] + " ";
                }
            }
            str += "\\\\";
        }
        str += "}\\]";
        return str;
    }
}

class vertex {
    i: number;
    j: number;
    value: string;

    constructor(i: number, j: number, value: string) {
        this.i = i;
        this.j = j;
        this.value = value;
    }

    toTeX(): string {
        return this.value;
    }
    clear() {
        this.value = "";
    }
    eq(v: vertex): boolean {
        var flag = (this.i == v.i);
        flag = flag && (this.j == v.j);
        flag = flag && (this.value == v.value); 
        return flag;
    }
}

class edge {
    from: vertex;
    to: vertex;
    value: string;
    options: any;

    constructor(from: vertex, to: vertex, value: string) {
        this.from = from;
        this.to = to;
        this.value = value;
        this.options = {};
    }
    eq(e: edge): boolean {
        var flag = this.from.eq(e.from);
        flag = flag && this.to.eq(e.to);
        flag = flag && (this.value == e.value);
        return flag;
    }
    direction(): string {
        var str = "";
        var di = this.to.i - this.from.i;
        if (di > 0) {
            for (var cnt = 0; cnt < di; cnt++) {
                str += "d";
            }
        } else if (di < 0) {
            for (var cnt = 0; cnt < -di; cnt++) {
                str += "u";
            }
        }
        var dj = this.to.j - this.from.j;
        if (dj > 0) {
            for (var cnt = 0; cnt < dj; cnt++) {
                str += "r";
            }
        } else if (dj < 0) {
            for (var cnt = 0; cnt < -dj; cnt++) {
                str += "l";
            }
        }
        return str;
    }
    toArraw(): string {

        var str = "\\ar["
            + this.direction() + "]"
            + this.value;
        return str;
    }
}
