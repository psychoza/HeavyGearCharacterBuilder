var Export = (function(){
    var self = {};

    var canExportValue = ko.observable(null);
    self.isEnabled = ko.computed({read: function(){
        var canExport = canExportValue();

        if(canExport==null) {
            $.support.cors = true;
            canExport = false;
            canExportValue(canExport);
            $.ajax({
                type: 'GET',
                url: 'http://tageverything.org/za/server/isAlive.php',
                dataType: 'jsonp',
                contentType: 'application/json; charset=utf-8'
            })
                .done(function(data){canExportValue(true);})
                .fail(function(){
                    //Intentionally ignored.  This just means we cannot reach the API server
                });
            return false;
        }
        return canExport;
    }});

    self.dataToEcho = function(fileData, fileName){
        var data = {
            fileName: fileName,
            fileData: fileData
        };
        $.support.cors = true;
        $.ajax({
            type: 'POST',
            url: 'http://tageverything.org/za/server/characterExport/toEcho.php',
            //dataType: 'json',
            data: data,
            contentType: 'application/json; charset=utf-8'
        })
            .done(function(){
                location.assign('http://tageverything.org/za/server/characterExport/fetchTxt.php?fileName='+fileName);
            })
            .fail(function(){
                console.log('fail echo');
            });
    };

    self.characterToEcho = function(character, fileName){
        var ui = new UIASCII();

        var attrib = new Widget.Grid();
        attrib.addWidget(new Widget.Text('AGI'),0,0);
        attrib.addWidget(new Widget.Text('APP'),1,0);
        attrib.addWidget(new Widget.Text('BLD'),2,0);
        attrib.addWidget(new Widget.Text('CRE'),3,0);
        attrib.addWidget(new Widget.Text('FIT'),4,0);

        attrib.addWidget(new Widget.Text(character.agility),0,1);
        attrib.addWidget(new Widget.Text(character.appearance),1,1);
        attrib.addWidget(new Widget.Text(character.build),2,1);
        attrib.addWidget(new Widget.Text(character.creativity),3,1);
        attrib.addWidget(new Widget.Text(character.fitness),4,1);

        attrib.addWidget(new Widget.Text('INF'),0,2);
        attrib.addWidget(new Widget.Text('KNO'),1,2);
        attrib.addWidget(new Widget.Text('PER'),2,2);
        attrib.addWidget(new Widget.Text('PSY'),3,2);
        attrib.addWidget(new Widget.Text('WIL'),4,2);

        attrib.addWidget(new Widget.Text(character.influence),0,1);
        attrib.addWidget(new Widget.Text(character.knowledge),1,1);
        attrib.addWidget(new Widget.Text(character.perception),2,1);
        attrib.addWidget(new Widget.Text(character.psyche),3,1);
        attrib.addWidget(new Widget.Text(character.willpower),4,1);

        ui.addWidget(attrib);

        var txt = ui.render();
        self.dataToEcho(txt, fileName);
    };

    return self;
})();
