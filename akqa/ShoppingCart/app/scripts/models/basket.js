(function (window, document, $, Akqa) {

    function BasketModel() {
        var storage = {
            items: [
                {product: 'Cotton T-Shirt, Medium mapit', price: 1.99, qty: 1, cost: 1 * 1.99},
                {product: 'Baseball Cap, One Size', price: 2.99, qty: 2, cost: 2 * 2.99},
                {product: 'Swim Shirt, Medium', price: 3.99, qty: 1, cost: 1 * 3.99}
            ]
        };

        function add(content) {
            storage.items.push(content);
        }
        
        function update(product, what, val) {
            for (var i in storage.items) {
                if(product === storage.items[i].product) {
                    storage.items[i][what] = val;
                }
            }
//            console.log('storage.items', storage.items);
        }

        function remove(content) {
            storage.items.splice(storage.items.indexOf(content), 1);
        }

        function getStorage() {
            return storage.items;
        }

        function getSubTotal() {
            var items = this.get(), sum = 0;
            for (var i in items) {
                sum += items[i].price * items[i].qty;
            }
            return sum;
        }

        function getVat() {
            var subtotal = this.getSubTotal(), total = 0;
            total = subtotal * Akqa.config.vatPercentage;
            return total;
        }

        function getTotal() {
            var total = 0;
            total = this.getVat()+this.getSubTotal();
            return total;
        }
        
        function getCost(qty, price) {
            return qty*price;
        }

        return {
            add: add,
            remove: remove,
            get: getStorage,
            getSubTotal: getSubTotal,
            getVat: getVat,
            getTotal: getTotal,
            getCost:getCost,
            update:update
        };
    }

    Akqa.BasketModel = new BasketModel();

})(window, document, $, Akqa);