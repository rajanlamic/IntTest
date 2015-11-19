(function (window, document, $) {

    function express(a,b) {
        return a*b;
    }
    
    var config = {
        currency: '£',
        templateId: '#mainTemplate',
        basketHeadingTemplate: '#basketHeadingTemplate',
        basketTemplateId: '#basketRowTemplate',
        vatPercentage:0.2,
        subTotalTemplateId:'#subTotal',
        vatTemplateId:'#vat',
        qtyTemplateId:'.qty',
        costTemplateId:'.cost',
        priceTemplateId:'.price',
        productTemplateId:'.product',
        totalTemplateId:'#total',
        buyNowTemplateId:'#buynow'
    };

    function Akqa(config) {

        function loadTemplate() {
            return $(config.templateId).html();
        }
        function loadBasketTemplate() {
            return $(config.basketTemplateId).html();
        }

        function loadTemplateData(model, template) {
            var result = ''
            for (prop in model) {
                var currentModel = model[prop];
                if ("object" == typeof currentModel) {
                    var currentView = template;
                    for (propCurrent in currentModel) {
                        if (currentModel[propCurrent]) {
                            var regexApply = new RegExp("{{" + propCurrent + "}}", "g");
                            currentView = currentView.replace(regexApply, currentModel[propCurrent]);
                            console.log('currentView', currentView);
                        }
                    }
                    result += currentView;
                }

            }
            $(config.basketHeadingTemplate).after(result);
        }

        return {
            config:config,
            loadTemplate: loadTemplate,
            loadTemplateData: loadTemplateData,
            loadBasketTemplate: loadBasketTemplate
        }
    }

    Akqa = new Akqa(config);

    window.Akqa = Akqa || {};


})(window, document, jQuery);