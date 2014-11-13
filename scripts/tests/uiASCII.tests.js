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
        it('throws if a non-Widget type is added', function(){
            var act = function(){ui.addWidget('blah')};
            expect(act).toThrow("addWidget must take a Widget");
        });
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
            expect(ui.render()).toEqual('test\r\n');
        });

        it('renders text widget with undefined parameter', function(){
            //Arrange
            ui.addWidget( new Widget.Text(undefined));

            //Assert
            expect(ui.render()).toEqual('\r\n');
        });

        it('renders an empty border', function(){
            //Arrange
            var expectedText =  '/-\\\r\n'+
                                '|?|\r\n'+
                                '\\-/\r\n';
            var borderWidget = ui.addWidget(new Widget.Border());

            //Assert
            expect(ui.render()).toEqual(expectedText);
        });

        it('renders a border around text', function(){
            //Arrange
            var expectedText = '/----\\\r\n|test|\r\n\\----/\r\n';
            var borderWidget = ui.addWidget(new Widget.Border());
            var textWidget = borderWidget.addWidget(new Widget.Text('test'));

            //Assert
            expect(ui.render()).toEqual(expectedText);
        });

        it('renders a double border correctly', function(){
            //Arrange
            var expectedText = '/------\\\r\n'+
                               '|/----\\|\r\n'+
                               '||blah||\r\n'+
                               '|\\----/|\r\n'+
                              '\\------/\r\n';
            var outerBorderWidget = new Widget.Border();
            var innerBorderWidget = new Widget.Border();
            var textWidget = new Widget.Text('blah');
            innerBorderWidget.addWidget(textWidget);
            outerBorderWidget.addWidget(innerBorderWidget);
            ui.addWidget(outerBorderWidget);

            //Assert
            expect(ui.render()).toEqual(expectedText);
        });

        it('renders a 2x2 grid', function(){
            //Arrange
            var expectedText =  ' a | bb \r\n'+
                                '---+----\r\n'+
                                'ccc|dddd\r\n';
            var grid = new Widget.Grid();
            grid.addWidget(new Widget.Text('a'),0,0);
            grid.addWidget(new Widget.Text('bb'),0,1);
            grid.addWidget(new Widget.Text('ccc'),1,0);
            grid.addWidget(new Widget.Text('dddd'),1,1);
            ui.addWidget(grid);

            //Act
            var output = ui.render();

            //Assert
            expect(output).toEqual(expectedText);
        });

        it('renders a 1x3 grid', function(){
            //Arrange
            var expectedText =  ' a \r\n'+
                '---\r\n'+
                'bb \r\n'+
                '---\r\n'+
                'ccc\r\n';
            var grid = new Widget.Grid();
            grid.addWidget(new Widget.Text('a'),0,0);
            grid.addWidget(new Widget.Text('bb'),1,0);
            grid.addWidget(new Widget.Text('ccc'),2,0);
            ui.addWidget(grid);

            //Act
            var output = ui.render();

            //Assert
            expect(output).toEqual(expectedText);
        });

        it('renders a 3x1 grid', function(){
            //Arrange
            var expectedText =  'a|bb|ccc\r\n';
            var grid = new Widget.Grid();
            grid.addWidget(new Widget.Text('a'),0,0);
            grid.addWidget(new Widget.Text('bb'),0,1);
            grid.addWidget(new Widget.Text('ccc'),0,2);
            ui.addWidget(grid);

            //Act
            var output = ui.render();

            //Assert
            expect(output).toEqual(expectedText);
        });
    });
});