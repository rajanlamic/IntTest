(function (window, document, $, Asos) {
    function facetController(model) {

        function displayClearButton(obj) {
            var clearButton = $(obj).parent().parent().parent().parent().find(Asos.config.clearButtonIdentfier),
                    clearButtonClass = Asos.config.clearButtonIdentfier.replace('.', '');

            if (clearButton.hasClass(clearButtonClass)) {
                clearButton.removeClass(clearButtonClass);
            }
        }

        function displayClearAllButton(obj) {

            var clearAllButton = $(obj).parent().parent().parent().parent().parent().find(Asos.config.clearAllButtonIdentfier),
                    clearButtonClass = Asos.config.clearButtonIdentfier.replace('.', '');

            if (clearAllButton.hasClass(clearButtonClass)) {
                clearAllButton.removeClass(clearButtonClass);
            }
        }

        function addRefinement(obj) {
            var refinementId = obj.id,
                panel = $(obj).parent().parent().parent().parent()
                    .find('.refinement-header')
                    .find('.facet-name').html();

            model.add({
                panel: panel,
                refinement:refinementId
            });
        }
        
        function removeRefinement(obj) {
            var refinementId = obj.id,
                panel = $(obj).parent().parent().parent().parent()
                    .find('.refinement-header')
                    .find('.facet-name').html();

            model.remove({
                panel: panel,
                refinement:refinementId
            });
        }

        function clearButtonListeners() {
            $('.panel').find('input').bind('click', function () {
                if ($(this).prop('checked') == true) {
                    displayClearButton(this);
                    displayClearAllButton(this);
                    addRefinement(this);
                } else {
                    removeRefinement(this);
                }
                
//                console.log('data', model.getRawData());
                console.log('serializedData', model.serializedData());
                console.log('unserializedData', model.unserializedData(model.serializedData()));
            });
        }

        return {
            clearButtonListeners: clearButtonListeners
        }
    }

    Asos.facetController = new facetController(new refinementModel())
            .clearButtonListeners();


})(window, document, jQuery, Asos);