var xyelm = (function () {
    function xyelm(h, w) {
        this.hight = h;
        this.weight = w;
        this.vertexes = new Array(h);
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
    xyelm.prototype.addEdge = function (e) {
        this.edges.push(e);
        this.edgesMap[e.from.i][e.from.j].push(e.toArraw());
    };

    xyelm.prototype.deleteEdge = function (e) {
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
    };

    /*
    public setVertex(i: number, j: number, val: string) {
    this.vertexes[i][j] = val;
    }
    */
    xyelm.prototype.setVertex = function (v) {
        this.vertexes[v.i][v.j] = v.toTeX();
    };

    xyelm.prototype.deleteVertex = function (i, j) {
        this.vertexes[i][j] = "";
    };
    xyelm.prototype.build = function () {
        var str = "";
        str += "\\[\\xymatrix{";
        for (var i = 0; i < this.hight; i++) {
            for (var j = 0; j < this.weight; j++) {
                if (j != 0) {
                    str += " & ";
                }
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
    };
    return xyelm;
})();

var vertex = (function () {
    function vertex(i, j, value) {
        this.i = i;
        this.j = j;
        this.value = value;
    }
    vertex.prototype.toTeX = function () {
        return this.value;
    };
    vertex.prototype.clear = function () {
        this.value = "";
    };
    vertex.prototype.eq = function (v) {
        var flag = (this.i == v.j);
        flag = flag && (this.j == v.j);
        flag = flag && (this.value == v.value);
        return flag;
    };
    return vertex;
})();

var edge = (function () {
    function edge(from, to, value) {
        this.from = from;
        this.to = to;
        this.value = value;
        this.options = {};
    }
    edge.prototype.eq = function (e) {
        var flag = this.from.eq(e.from);
        flag = flag && this.to.eq(e.to);
        flag = flag && (this.value == e.value);
        return flag;
    };
    edge.prototype.direction = function () {
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
    };
    edge.prototype.toArraw = function () {
        var str = "\\ar[" + this.direction() + "]" + this.value;
        return str;
    };
    return edge;
})();
