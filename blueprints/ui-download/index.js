/*jshint node:true*/
module.exports = {
  description: 'Makes locally available/client-side content downloadable',
	normalizeEntityName: function() {
	},
	afterInstall: function() {
    return this.addBowerPackagesToProject([
     {name: 'filesaver'}
    ]);
	}
};
