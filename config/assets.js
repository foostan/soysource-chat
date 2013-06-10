// Asset rack configuration
module.exports.assets = {

	// A list of directories, in order, which will be recursively parsed for css, javascript, and templates
	// and then can be automatically injected in your layout/views via the view partials:
	// ( assets.css(), assets.js() and assets.templateLibrary() )
	sequence: [
		'assets/js/vendor/jquery', 
		'assets/js/vendor/bootstrap', 
		'assets/js/soysource', 
		'assets/mixins', 
		'assets/styles', 
		'assets/templates'
	]
};
