var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
  openMenu: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ACTIONS.OPEN_MENU
    });
  },
  closeMenu: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ACTIONS.CLOSE_MENU
    });
  },
  resizeElements: function(isOpen) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ACTIONS.RESIZE,
      isOpen: isOpen
    });
  },
  sendPageView: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ACTIONS.PAGEVIEW
    });
  }
}

module.exports = AppActions
