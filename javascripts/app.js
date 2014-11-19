var app = angular.module("xy", []);

app.controller("edgeCtrl", function(){
	this.edges = [];
	this.add = function(x){
    var from = new vertex(x.from[0], x.from[1], "");
    var to = new vertex(x.to[0], x.to[1], "");
    var e = new edge(from,to,x.type || "");
		this.edges.push(e);
    xy.addEdge(e);
	};
	this.edit = function(index){};
	this.destroy = function(index){
		this.edges.splice(index,1);
	};
});
app.controller("newEdgeCtrl", function(){
	
});
