describe('UI ASCII - ', function(){
    it('exists', function(){
        expect(typeof(UIASCII)).toEqual("function");
    });

    describe('public properties', function(){
        var ui = new UIASCII();
        it('has addWidget func', function(){
            expect(typeof(ui.addWidget)).toEqual("function");
        });

        it('has render func', function(){
            expect(typeof(ui.render)).toEqual("function");
        });
    });

    describe('addWidget - ', function(){
        var ui;
        beforeEach(function(){
            ui = new UIASCII();
        });
//        it('throws if a non-Widget type is added', function(){
//            var act = function(){ui.addWidget('blah')};
//            expect(act).toThrow("addWidget must take a widgetType");
//        });
    });

    describe('render - ', function(){
        var ui;
        beforeEach(function(){
            ui = new UIASCII();
        });

        it('renders an empty string if no widgets', function(){
            expect(ui.render()).toEqual('');
        });

        it('renders a string with text widget', function(){
            //Arrange
            ui.addWidget( new WidgetText('test'));

            //Assert
            expect(ui.render()).toEqual('test\n');
        });

        it('renders a border correctly', function(){
            //Arrange
            var expectedText = '/----\\\n|test|\n\\----/';
            var borderWidget = ui.addWidget(WidgetBorder());
            var textWidget = borderWidget.addWidget(new WidgetText('test'));

            //Assert
            expect(ui.render()).toEqual(expectedText);
        });
    });
});