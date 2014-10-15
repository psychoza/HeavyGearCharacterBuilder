Array.prototype.any = function(searchItem){
	return this.filter(function(arrayItem){return arrayItem == searchItem}).length > 0;
}