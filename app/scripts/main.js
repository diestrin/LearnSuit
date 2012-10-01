require.config({
	shim: {
	},

	paths: {
		AngularJS: 'vendor/angular',
		hm: 'vendor/hm',
		esprima: 'vendor/esprima',
		jquery: 'vendor/jquery.min'
	}
});

require(['app'], function(app) {

});