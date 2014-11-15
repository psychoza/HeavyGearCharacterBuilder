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
        describe('Text - ', function(){
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
        });

        describe('border - ', function(){
            var ui;
            beforeEach(function(){
                ui = new UIASCII();
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

            it('renders a square border around text', function(){
                //Arrange
                var expectedText =  '+----+\r\n' +
                    '|test|\r\n' +
                    '+----+\r\n';
                var borderWidget = ui.addWidget(new Widget.Border({style:'square'}));
                var textWidget = borderWidget.addWidget(new Widget.Text('test'));

                //Assert
                expect(ui.render()).toEqual(expectedText);
            });

            it('renders a border without left side', function(){
                //Arrange
                var expectedText =  '----+\r\n' +
                    'test|\r\n' +
                    '----+\r\n';
                var borderWidget = ui.addWidget(new Widget.Border({style:'square', left: false}));
                var textWidget = borderWidget.addWidget(new Widget.Text('test'));

                //Assert
                expect(ui.render()).toEqual(expectedText);
            });

            it('renders a border without right side', function(){
                //Arrange
                var expectedText =  '+----\r\n' +
                    '|test\r\n' +
                    '+----\r\n';
                var borderWidget = ui.addWidget(new Widget.Border({style:'square', right: false}));
                var textWidget = borderWidget.addWidget(new Widget.Text('test'));

                //Assert
                expect(ui.render()).toEqual(expectedText);
            });

            it('renders a border without bottom', function(){
                //Arrange
                var expectedText =  '+----+\r\n' +
                    '|test|\r\n';
                var borderWidget = ui.addWidget(new Widget.Border({style:'square', bottom: false}));
                var textWidget = borderWidget.addWidget(new Widget.Text('test'));

                //Assert
                expect(ui.render()).toEqual(expectedText);
            });

            it('renders a border without top', function(){
                //Arrange
                var expectedText =  '|test|\r\n' +
                    '+----+\r\n';
                var borderWidget = ui.addWidget(new Widget.Border({style:'square', top: false}));
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
        });

        describe('grid - ', function(){
            var ui;
            beforeEach(function(){
                ui = new UIASCII();
            });

            it('renders a 2x2 grid', function(){
                //Arrange
                var expectedText =  'a  |bb  \r\n'+
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
                var expectedText =  'a  \r\n'+
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

            it('renders a left aligned 1x3 grid', function(){
                //Arrange
                var expectedText =  'a  \r\n'+
                    '---\r\n'+
                    'bb \r\n'+
                    '---\r\n'+
                    'ccc\r\n';
                var grid = new Widget.Grid({align: 'left'});
                grid.addWidget(new Widget.Text('a'),0,0);
                grid.addWidget(new Widget.Text('bb'),1,0);
                grid.addWidget(new Widget.Text('ccc'),2,0);
                ui.addWidget(grid);

                //Act
                var output = ui.render();

                //Assert
                expect(output).toEqual(expectedText);
            });

            it('renders a right aligned 1x3 grid', function(){
                //Arrange
                var expectedText =  '  a\r\n'+
                    '---\r\n'+
                    ' bb\r\n'+
                    '---\r\n'+
                    'ccc\r\n';
                var grid = new Widget.Grid({align: 'right'});
                grid.addWidget(new Widget.Text('a'),0,0);
                grid.addWidget(new Widget.Text('bb'),1,0);
                grid.addWidget(new Widget.Text('ccc'),2,0);
                ui.addWidget(grid);

                //Act
                var output = ui.render();

                //Assert
                expect(output).toEqual(expectedText);
            });

            it('renders a center aligned 1x3 grid', function(){
                //Arrange
                var expectedText =  ' a \r\n'+
                    '---\r\n'+
                    'bb \r\n'+
                    '---\r\n'+
                    'ccc\r\n';
                var grid = new Widget.Grid({align: 'center'});
                grid.addWidget(new Widget.Text('a'),0,0);
                grid.addWidget(new Widget.Text('bb'),1,0);
                grid.addWidget(new Widget.Text('ccc'),2,0);
                ui.addWidget(grid);

                //Act
                var output = ui.render();

                //Assert
                expect(output).toEqual(expectedText);
            });

            it('renders a left aligned 2x2 grid with second column centered', function(){
                //Arrange
                var expectedText =  'col1|col2\r\n'+
                    '----+----\r\n'+
                    'c   | d  \r\n';
                var grid = new Widget.Grid({align: 'left', columns: [,{align: 'center'}]});
                grid.addWidget(new Widget.Text('col1'),0,0);
                grid.addWidget(new Widget.Text('col2'),0,1);
                grid.addWidget(new Widget.Text('c'),1,0);
                grid.addWidget(new Widget.Text('d'),1,1);
                ui.addWidget(grid);

                //Act
                var output = ui.render();

                //Assert
                expect(output).toEqual(expectedText);
            });
        });

        describe('horizontal container - ', function(){
            var ui;
            beforeEach(function(){
                ui = new UIASCII();
            });

            it('renders a horizontal container', function(){
                //Arrange
                var expectedText = 'a b\r\n';
                var hWidget = new Widget.HorizontalContainer();
                hWidget.addWidget(new Widget.Text('a'));
                hWidget.addWidget(new Widget.Text('b'));
                ui.addWidget(hWidget);

                //Act
                var output = ui.render();

                //Assert
                expect(output).toEqual(expectedText);
            });

            it('renders a horizontal container with a grid inside', function(){
                //Arrange
                var expectedText =  'hello 1|2\r\n'+
                                    '      -+-\r\n'+
                                    '      3|4\r\n';
                var hWidget = new Widget.HorizontalContainer();
                hWidget.addWidget(new Widget.Text('hello'));
                var grid = hWidget.addWidget(new Widget.Grid());
                grid.addWidget(new Widget.Text('1'),0,0);
                grid.addWidget(new Widget.Text('2'),0,1);
                grid.addWidget(new Widget.Text('3'),1,0);
                grid.addWidget(new Widget.Text('4'),1,1);
                ui.addWidget(hWidget);

                //Act
                var output = ui.render();

                //Assert
                expect(output).toEqual(expectedText);
            });

            it('renders a horizontal container with minimum widths', function(){
                //Arrange
                var expectedText = 'name:  Bob     \r\n';
                var hWidget = new Widget.HorizontalContainer({minLeftWidth: 6, minRightWidth: 8});
                hWidget.addWidget(new Widget.Text('name:'));
                hWidget.addWidget(new Widget.Text('Bob'));
                ui.addWidget(hWidget);

                //Act
                var output = ui.render();

                //Assert
                expect(output).toEqual(expectedText);
            });
        });

        describe('vertical container - ', function(){
            var ui;
            beforeEach(function(){
                ui = new UIASCII();
            });

            it('renders simple text in each', function(){
                //Arrange
                var expectedText =  'a\r\n'+
                                    'b\r\n';
                var vWidget = new Widget.VerticalContainer();
                vWidget.addWidget(new Widget.Text('a'));
                vWidget.addWidget(new Widget.Text('b'));
                ui.addWidget(vWidget);

                //Act
                var output = ui.render();

                //Assert
                expect(output).toEqual(expectedText);
            });

            it('renders simple text with width padding', function(){
                //Arrange
                var expectedText =  'a   \r\n'+
                    'blah\r\n';
                var vWidget = new Widget.VerticalContainer();
                vWidget.addWidget(new Widget.Text('a'));
                vWidget.addWidget(new Widget.Text('blah'));
                ui.addWidget(vWidget);

                //Act
                var output = ui.render();

                //Assert
                expect(output).toEqual(expectedText);
            });

        });
    });
});