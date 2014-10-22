Array.prototype.insert = function (index, item) {
	this.splice(index, 0, item);
	return this;
};

Array.prototype.contains = function (value, caseInsensitive) {
	var arry = this;
	var val = value;

	if (caseInsensitive === true) {
		val = value.toLowerCase();
		arry = [];
		$.each(this, function (idx, item) {
			arry.push(item.toLowerCase());
		});
	}

    return $.inArray(val, arry) > -1;
};

Array.prototype.any = function (predicate) {
    if (predicate) {
        if (!$.isFunction(predicate))
            throw 'Function expected';

        for (var i = 0; i < this.length; i++) {
            if (predicate(this[i]))
                return true;
        }
    }
    else if (this.length > 0) {
        return true;
    }

    return false;
};

Array.prototype.where = function (predicate) {
	var matchingValues = [];
	for (var i = 0; i < this.length; i++) {
		var value = this[i];
		if (predicate(value))
			matchingValues.push(value);
	}
	return matchingValues;
};

Array.prototype.firstOrNull = function (predicate, selector) {
    if (predicate) {
        if (!$.isFunction(predicate))
            throw 'Predicate must be a function';

        for (var i = 0; i < this.length; i++) {
            var value = this[i];
            if (predicate(value))
                return (selector && $.isFunction(selector)) ? selector(value) : value;
        }
    }
    else if (this.length > 0) {
        return (selector && $.isFunction(selector)) ? selector(this[0]) : this[0];
    }

	return null;
};

Array.prototype.lastOrNull = function (predicate) {
    return this.slice(0).reverse().firstOrNull(predicate);
};

Array.prototype.getByID = function (id) {
    return this.getByUniqueID('ID', id) || this.getByUniqueID('id', id);
};

Array.prototype.getByUniqueID = function (propertyName, value) {
    return this.firstOrNull(function(v) {
        var propertyValue = v[propertyName];
        return (ko.isObservable(propertyValue) ? propertyValue() : propertyValue) == value;
    });
};

Array.prototype.select = function (predicate) {
	var projectedValues = [];
	for (var i = 0; i < this.length; i++)
		projectedValues.push(predicate(this[i]));
	return projectedValues;
};

Array.prototype.selectMany = function (predicate) {
	var projectedValues = [];
	for (var i = 0; i < this.length; i++)
		projectedValues = projectedValues.concat(predicate(this[i]));
	return projectedValues;
};

Array.prototype.skip = function(numToSkip) {
    var newList = [];
    for (var i = 0; i < this.length; i++) {
        if(i >= numToSkip)
            newList.push(this[i]);
    }
    return newList;
}

Array.prototype.take = function (numToTake) {
    var newList = [];
    for (var i = 0; i < this.length; i++) {
        if (i < numToTake)
            newList.push(this[i]);
        else
            return newList;
    }
    return newList;
}

Array.prototype.remove = function (valueOrPredicate) {
	var removedValues = [];
	var predicate = typeof valueOrPredicate == "function" ? valueOrPredicate : function (value) { return value === valueOrPredicate; };
	for (var i = 0; i < this.length; i++) {
		var value = this[i];
		if (predicate(value)) {
			removedValues.push(value);
			this.splice(i, 1);
			i--;
		}
	}

	return removedValues;
};

Array.prototype.removeAt = function (from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

Array.prototype.removeAll = function () {
	return this.removeAt(0, this.length - 1);
};

Array.prototype.unique = function() {
	var obj = {},
        ret = [],
        i = this.length;
	
	while (i--) {
		if (!obj[this[i]]) {
			obj[this[i]] = true;
			ret.unshift(this[i]);
		}
	}

	return ret;
}

Array.prototype.distinct = Array.prototype.unique;

Array.prototype.makeUnique = function () {
	var newThis = this.unique();
	this.removeAll();
	this.unshift(newThis);
	return this;
}

Array.prototype.max = function (comparer) {
	if (this.length === 0) return null;
	if (this.length === 1) return this[0];

	comparer = (comparer || app.defaultComparer);

	var v = this[0];
	for (var i = 1; i < this.length; i++) {
		if(comparer(this[i], v) > 0)
			v = this[i]
	}

	return v;
}

Array.prototype.min = function(comparer) {
    if (this.length === 0) return null;
    if (this.length === 1) return this[0];

    comparer = (comparer || app.defaultComparer);

    var v = this[0];
    for (var i = 1; i < this.length; i++) {
        if (comparer(this[i], v) < 0)
            v = this[i];
    }

    return v;
};

Array.prototype.sum = function (predicate) {
    var sum = 0;
    for (var i = 0; i < this.length; i++) {
        var value = this[i];
        sum += predicate.bind(value)(value);
    }
    return sum;
}

Array.prototype.sortBy = function (propertyName, isDesc) {
    this.sort(function (left, right) {
        var l = left[propertyName];
        var r = right[propertyName];
        var comparisonResult = app.defaultComparer(l, r);
        return isDesc ? comparisonResult * -1 : comparisonResult;
    });
};

Array.prototype.foreach = Array.prototype.forEach || function (predicate) {
    for (var i = 0; i < this.length; i++) {
        var value = this[i];
        predicate.bind(value)(value);
    }
}

// same as foreach but will break when predicate returns false.
Array.prototype.every = Array.prototype.every || function (predicate) {
    for (var i = 0; i < this.length; i++) {
        var value = this[i];
        var ret = predicate.bind(value)(value);
        if (ret === false)
            return;
    }
}