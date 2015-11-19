walletApp.factory('operationService',
        function() {
            var storage = {
                items: [],
                removedItems: [] // not sure why is it needed to list removed items, as it filters automatically with currely available ites, so for now its feature has not implemented
            };

            function add(content) {
                storage.items.push(content);
            }

            function remove(content) {
                storage.items.splice(storage.items.indexOf(content), 1);
            }
            
            function edit(oldContent, newContent) {
                remove(oldContent);
                add(newContent);
            }

            function getStorage() {
                return storage.items;
            }

            return {
                add: add,
                remove: remove,
                edit:edit,
                get: getStorage,
            };

        });