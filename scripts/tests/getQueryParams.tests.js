describe('GetQueryParams - ', function(){
    it('exists', function(){
        expect(typeof(GetQueryParams)).toEqual("function");
    });

    it('returns one parameter', function(){
        //Arrange
        var url = 'http://localhost/page.php?stuff=always';

        //Act
        var result = GetQueryParams(url);

        //Assert
        expect(result.stuff).toEqual('always');
    });
});