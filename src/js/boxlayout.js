/**
 * boxlayout.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var Boxlayout = (function() {

	var $el = $( '#bl-main' ),
		$sections = $el.children( 'section' ),
		// navigating the work panels
		// if currently navigating the work items
		isAnimating = false,
		// close work panel trigger
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		// transition end event name
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		// support css transitions
		supportTransitions = Modernizr.csstransitions;

	function init() {
		initEvents();
	}

	function initEvents() {

		$sections.each( function() {

			var $section = $( this );

			// expand the clicked section and scale down the others
			$section.on( 'click', function() {

				if( !$section.data( 'open' ) ) {
					$section.data( 'open', true ).addClass( 'bl-expand bl-expand-top' );
					
					// append to URL

					$el.addClass( 'bl-expand-item' );
				}

			} ).find( 'img.bl-icon-close' ).on( 'click', function() {

				closeSection( $section );

				// reset URL

				return false;

			} );

		} );

		// pressing escape closes sections or work panels
		$( document ).on( 'keyup', function( event ) {

			if( event.keyCode === 27 ) {

				var $section = $( 'section.bl-expand' );

				// check if a section or a work panel is open
				if( $section.length ) {
					closeSection( $section );
				}

			}

		});

		var closeSection = function($section) {

			// close the expanded section and scale up the others
			$section.data( 'open', false ).removeClass( 'bl-expand' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'section' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'bl-expand-top' );
			} );

			if( !supportTransitions ) {
				$section.removeClass( 'bl-expand-top' );
			}

			$el.removeClass( 'bl-expand-item' );

		};

	}

	return { init : init };

})();