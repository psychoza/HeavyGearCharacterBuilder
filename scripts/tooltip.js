(function () {
  ko.bindingHandlers.tooltip = {
    update: function (element, viewModelAccessor, allBindingsAccessor) {
      var options = viewModelAccessor();
      if (typeof (options) == 'string' || ko.isObservable(options)) {
        var val = ko.utils.unwrapObservable(options);
        if (val == undefined || val == null)
          val = '';
        $(element).attr('title', val);
        $(element).tipTip();
      }
      else {
        var attr = 'title';
        if (options.attribute !== undefined)
          attr = options.attribute;
        var val = options.value;
        if (val == undefined || val == null)
          val = '';
        $(element).attr(attr, ko.utils.unwrapObservable(val));
        $(element).tipTip(options);
      }
    }
  };
}());