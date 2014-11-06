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
        this.edges = new Array(h);
        for (var i = 0; i < h; i++) {
            this.edges[i] = new Array(w);
            for (var j = 0; j < w; j++) {
                this.edges[i][j] = [];
            }
        }
    }
    xyelm.prototype.addEdge = function (i, j, type) {
        this.edges[i][j].push(type);
    };

    xyelm.prototype.deleteEdge = function (i, j, k) {
        this.edges[i][j].splice(k, 1);
    };

    xyelm.prototype.setVertex = function (i, j, val) {
        this.vertexes[i][j] = val;
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
                var eds = this.edges[i][j];
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
