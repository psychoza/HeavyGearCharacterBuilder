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
            ui.addWidget( new Widget.Text('test'));

            //Assert
            expect(ui.render()).toEqual('test\n');
        });

        it('renders an empty border', function(){
            //Arrange
            var expectedText =  '/-\\\n'+
                                '|?|\n'+
                                '\\-/\n';
            var borderWidget = ui.addWidget(new Widget.Border());

            //Assert
            expect(ui.render()).toEqual(expectedText);
        });

        it('renders a border around text', function(){
            //Arrange
            var expectedText = '/----\\\n|test|\n\\----/\n';
            var borderWidget = ui.addWidget(new Widget.Border());
            var textWidget = borderWidget.addWidget(new Widget.Text('test'));

            //Assert
            expect(ui.render()).toEqual(expectedText);
        });

        it('renders a double border correctly', function(){
            //Arrange
            var expectedText = '/------\\\n'+
                               '|/----\\|\n'+
                               '||blah||\n'+
                               '|\\----/|\n'+
                              '\\------/\n';
            var outerBorderWidget = new Widget.Border();
            var innerBorderWidget = new Widget.Border();
            var textWidget = new Widget.Text('blah');
            innerBorderWidget.addWidget(textWidget);
            outerBorderWidget.addWidget(innerBorderWidget);
            ui.addWidget(outerBorderWidget);

            //Assert
            expect(ui.render()).toEqual(expectedText);
        });


    });
});