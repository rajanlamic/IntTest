function refinementModel() {


    var storage = {
        rawData: [] // eg {panel: brand, refinement:coast}
    };

    function getRawData() {
        return storage.rawData;
    }

    function add(content) {
        storage.rawData.push(content);
        return this;
    }

    function remove(content) {
        storage.rawData.splice(storage.rawData.indexOf(content), 1);
        return this;
    }

    function serializedData() {
        var template = {brand: [], size: [], base_colour: []},
        rawData = this.getRawData(),
                serializedData = '',
                separator = ''

        for (var i in rawData) {
            if ("brand" === rawData[i].panel.toLowerCase()) {
                template.brand.push(rawData[i].refinement);
            }
            if ("size" === rawData[i].panel.toLowerCase()) {
                template.size.push(rawData[i].refinement);
            }
            if ("base colour" === rawData[i].panel.toLowerCase()) {
                template.base_colour.push(rawData[i].refinement);
            }
        }

        for (var k in template) {
            if (template[k].length > 0) {
                serializedData += separator + k + ':' + template[k].join();
                separator = '|';
            }
        }

        return serializedData;
    }

    function unserializedData(serializedData) {
        var activeRefinement = serializedData.split('|'),
                unserializedData = [];

        for (var i in activeRefinement) {
            eachFacetRefinements = activeRefinement[i].split(':');
            for (var k in eachFacetRefinements) {
                eachFacetRefinement = eachFacetRefinements[k].split(',')
                if (eachFacetRefinement.length > 1) {
                    for (var j in eachFacetRefinement) {
                        unserializedData[eachFacetRefinement[j]] = eachFacetRefinement[j];
                    }
                }
            }
        }
        
        return unserializedData;
    }

    return {
        getRawData: getRawData,
        add: add,
        remove: remove,
        serializedData: serializedData,
        unserializedData: unserializedData
    }
}