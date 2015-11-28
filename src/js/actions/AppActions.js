var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
  openMenu: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.OPEN_MENU
    });
  },
  closeMenu: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CLOSE_MENU
    });
  },
  resizeElements: function(isOpen) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RESIZE_ELEMENTS,
      isOpen: isOpen
    });
  }
}

module.exports = AppActions
