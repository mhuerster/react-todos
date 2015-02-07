var items = []

var notifyComponents = function() {
  $(ListStore).trigger('storeHasChanged')
}

var findItemById = function(id) {
  return items.filter(function(item) {
    return item.id === id
  })[0]
},

ListStore = {

  getItems: function() {
    return items
  },

  loadItems: function() {
    var loadRequest = $.ajax({
      type: 'GET',
      url: 'https://listalous.herokuapp.com/lists/mhuerster'
    })
  },
  addItem: function(itemDescription) {},
  toggleCompleteness: function(itemId) {}
}