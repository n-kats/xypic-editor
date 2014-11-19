var app = angular.module("xy", []);

app.controller("edgeCtrl", function(){
	this.edges = [];
	this.add = function(edge){
		this.edges.push(edge);
	};
	this.edit = function(index){};
	this.destroy = function(index){
		this.edges.splice(index,1);
	};

	this.show = function(x,y,z){
		console.log(this.newEdgeFrom);
		console.log(this.newEdgeTo);
		console.log(this.newEdgeType);
	};
});
app.controller("newEdgeCtrl", function(){
	
});
