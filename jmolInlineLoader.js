////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////

var jmolInlineLoader = function(){

	var models       = new Array();
	var neighborhood = false;
	var maxModel     = 1;
	var settings     = {};
	var self = this;

	// defaults are updated in the "initialize" function
    var defaults = {
		serverUrl   : 'http://rna.bgsu.edu/research/anton/MotifAtlas/nt_coord.php',
		chbxClass   : ''
    };

	// "Private" class. Stores the state of each checkbox.
	function model(id, modelNumber, neighborhood) {

		this.id = id;
		this.neighborhood = neighborhood;
		this.modelNumber = modelNumber;
		this.checked = false;
		this.jQ = $('#'+id);
		var self = this;

		// load the very first structure
		this.load_and_display = function () {
			// get the inline data-nt info
			var nts = self.jQ.data('nt');
			$.post(settings.serverUrl, { 'model': nts },
				function(data) {
					jmolScript("load DATA \"append structure\"\n" + data + 'end "append structure";');
					self.superimpose();
					self.style();
					self.display();
			});
		}

		// superimpose this model onto the first one using phosphate atoms
		this.superimpose = function () {
			var m = self.modelNumber;
			if ( m > 1 ) {
				//jmolScript('compare {' + m + '.1} {1.1} 0 rotate translate;');
				for (var i = 0; i < 2; i++) {
					jmolScript('x=compare({*.P/' + m + '.1},{*.P/1.1});');
					jmolScript('select ' + m + '.0; rotate selected @{x};');
				}
			}
		}

		// apply styling to the model
		this.style = function () {
			var m = self.modelNumber;
		 	jmolScript('select [U]/' + m + '.0; color navy;');
		 	jmolScript('select [G]/' + m + '.0; color chartreuse;');
		 	jmolScript('select [C]/' + m + '.0; color gold;');
			jmolScript('select [A]/' + m + '.0; color red;');
			jmolScript('select ' + m + '.2; color translucent 0.8;');
			jmolScript('select *;frame *;spacefill off;center 1.1;');
		}

		this.set_neighborhood = function (neighborhood) {
			self.neighborhood = neighborhood;
		}

		this.toggle_checked = function () {
			self.checked ? self.checked = false : self.checked = true;
		}

		this.toggle_checkbox = function () {
			if (self.checked) {
				self.jQ.attr('checked','checked'); // .prop("checked", true);
			} else {
				self.jQ.removeAttr('checked');	// .prop("checked", false);
			}
		}

		this.toggle_view = function () {

			if (self.checked) {
				// show
				if (self.neighborhood) {
					jmolScript('frame *;display displayed or ' + self.modelNumber + '.0;');
				} else {
					jmolScript('frame *;display displayed or ' + self.modelNumber + '.1;');
					jmolScript('frame *;display displayed and not ' + self.modelNumber + '.2;');
				}
			} else {
				// hide everything
				jmolScript('frame *;display displayed and not ' + self.modelNumber + '.0;');
			}

		}

		this.display = function() {
			self.toggle_checked();
			self.toggle_view();
			self.toggle_checkbox();
		}

	} // end of the model private class


	// Public methods
	this.checkbox_click = function () {

		if ( typeof(arguments[0]) == 'string' ) {
			var id = arguments[0];
		} else {
			var id = $(this).attr('id');
		}

		if ( typeof(models[id]) == 'undefined' ) {
			models[id] = new model(id, maxModel, neighborhood);
			maxModel++;
			models[id].load_and_display();
		} else {
			models[id].set_neighborhood(neighborhood);
			models[id].display();
		}

	}

	this.toggle_neighborhood = function() {

		if (neighborhood) {
			neighborhood = false;
			this.value = 'Show neighborhood';
		} else {
			neighborhood = true;
			this.value = 'Hide neighborhood';
		}

		for (id in models) {
			models[id].set_neighborhood(neighborhood);
			models[id].toggle_view();
		}

	}

	this.initialize = function(options) {

		if ( options ) {
			settings = $.extend( {}, defaults, options );
		}
   		jmolScript('set baseCartoonEdges = true;');
   		checkbox_click( $(settings.chbxClass).first().attr('id') );
	}

	this.show_next = function() {

		var chbx = $(settings.chbxClass);
		var toCheck = new Array();
		for (var i=0;i<chbx.length-1;i++) {
			if ( chbx[i].checked ) {
				toCheck.push(i+1);
			}
		}
		$(settings.chbxClass+':checked:not').removeAttr('checked');
		for (i=0;i<toCheck.length;i++) {
			chbx[toCheck[i]].checked = true;
		}
		if ( $('.jmolInline:checked').length == 0 ) {
			chbx[0].checked = true;
		}

	}

	this.toggle_all = function () {

		var all = $(settings.chbxClass);
		if ( all.length == $(settings.chbxClass+':checked').length ) {
			// hide all
			this.value = 'Show all';
			all.each( function(i) {
				this.checked = false;
			});
		} else {
			// show all
			this.value = 'Hide all';
			all.each( function(i) {
				this.checked = true;
			});
		}
	}

	this.show_prev = function () {

		var chbx = $(settings.chbxClass);
		var toCheck = new Array();
		for (var i=chbx.length-1;i>=1;i--) {
			if ( chbx[i].checked ) {
				toCheck.push(i-1);
			}
		}
		// temporarily uncheck everything
		$(settings.chbxClass+':checked:not').removeAttr('checked');
		// check only the right ones
		for (i=0;i<toCheck.length;i++) {
			chbx[toCheck[i]].checked = true;
		}
		// keep the last checkbox checked
		if ( $(settings.chbxClass+':checked').length == 0 ) {
			chbx[chbx.length-1].checked = true;
		}
	}

	return {
		initialize: initialize,
		toggle_all: toggle_all,
		toggle_neighborhood: toggle_neighborhood,
		checkbox_click: checkbox_click,
		show_prev: show_prev,
		show_next: show_next
	}

}();

