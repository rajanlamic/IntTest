(function (window, document, $, Akqa) {

    function BasketController() {
        function loadTemplateOn(on) {
            $(on).append(Akqa.loadTemplate());
            return this;
        }

        function loadBasketTemplateDataOn(on, data) {
            var views = Akqa.loadBasketTemplate();
            var data = Akqa.BasketModel.get();
            Akqa.loadTemplateData(data, views);
            return this;
        }

        function updateSubTotal() {
            $(Akqa.config.subTotalTemplateId).html(Akqa.BasketModel.getSubTotal().toFixed(2));
            return this;
        }

        function updateVat() {
            $(Akqa.config.vatTemplateId).html(Akqa.BasketModel.getVat().toFixed(2));
            return this;
        }
        function updateTotal() {
            $(Akqa.config.totalTemplateId).html(Akqa.BasketModel.getTotal().toFixed(2));
            return this;
        }

        return {
            loadTemplateOn: loadTemplateOn,
            loadBasketTemplateDataOn: loadBasketTemplateDataOn,
            updateSubTotal: updateSubTotal,
            updateVat: updateVat,
            updateTotal: updateTotal
        }
    }

    BasketController = new BasketController()
            .loadTemplateOn('#main')
            .loadBasketTemplateDataOn('#basketTemplate')
            .updateSubTotal()
            .updateVat()
            .updateTotal();


    $('.add').bind('click', function () {
        var currentQty = parseInt($(this).parent().parent().find(Akqa.config.qtyTemplateId).val());
        if (currentQty > 0 && currentQty < 10) {
            currentQty++;
            $(this).parent().parent().find(Akqa.config.qtyTemplateId).val(currentQty);

            var product = $(this).parent().parent().parent().find(Akqa.config.productTemplateId).html();
            var price = $(this).parent().parent().parent().find(Akqa.config.priceTemplateId).html().replace('£', '');
            var cost = Akqa.BasketModel.getCost(currentQty, price);

            Akqa.BasketModel.update(product, 'cost', cost);
            Akqa.BasketModel.update(product, 'price', price);
            Akqa.BasketModel.update(product, 'qty', currentQty);

            $(this).parent().parent().parent().find(Akqa.config.costTemplateId).html(cost.toFixed(2));

            BasketController.updateSubTotal()
                    .updateVat()
                    .updateTotal();
        }
    });

    $('.subtract').bind('click', function () {
        var currentQty = parseInt($(this).parent().parent().find(Akqa.config.qtyTemplateId).val());
        if (currentQty > 1 && currentQty < 11) {
            currentQty--;
            $(this).parent().parent().find(Akqa.config.qtyTemplateId).val(currentQty);

            var product = $(this).parent().parent().parent().find(Akqa.config.productTemplateId).html();
            var price = $(this).parent().parent().parent().find(Akqa.config.priceTemplateId).html().replace('£', '');
            var cost = Akqa.BasketModel.getCost(currentQty, price);

            Akqa.BasketModel.update(product, 'cost', cost);
            Akqa.BasketModel.update(product, 'price', price);
            Akqa.BasketModel.update(product, 'qty', currentQty);

            $(this).parent().parent().parent().find(Akqa.config.costTemplateId).html(cost.toFixed(2));

            BasketController.updateSubTotal()
                    .updateVat()
                    .updateTotal();
        }
    });

    $('.delete').bind('click', function (evt) {
        evt.preventDefault();

        var product = $(this).parent().parent().find(Akqa.config.productTemplateId).html();
        var price = $(this).parent().parent().find(Akqa.config.priceTemplateId).html().replace('£', '');
        var qty = $(this).parent().parent().find(Akqa.config.qtyTemplateId).html();

        Akqa.BasketModel.remove({
            product: product,
            price: Akqa.config.currency + price,
            qty: qty
        });
        $(this).parent().parent().remove();

        BasketController.updateSubTotal()
                .updateVat()
                .updateTotal();

        if (Akqa.BasketModel.get().length < 1) {
            $(Akqa.config.buyNowTemplateId).addClass('inactive');
        }
        return false;
    });

    $('#buynow').bind('click', function (evt) {
        var currentBasketDataInJson = Akqa.BasketModel.get();
        if (currentBasketDataInJson.length > 0) {
            $.ajax({
                url:'/server',
                data:currentBasketDataInJson,
                type: 'POST',
                dataType: 'json',
                success: function(data) {
                    alert('success ' + data);
                },
                error: function(err) {
                    console.log('error', err);
                    alert('error');
                }
            });
        }
    });


})(window, document, $, Akqa);