const webpack = require('webpack');
const fs = require('fs');
const extensibilityWebPackConfig = require('@neos-project/neos-ui-extensibility/scripts/helpers/webpack.config.js');

module.exports = function (neosPackageJson) {
	const config = extensibilityWebPackConfig(neosPackageJson);

	config.plugins = (config.plugins || []);
	config.plugins.push(
		// Don't include ckeditor5 modules except engine and utils
		new webpack.IgnorePlugin({
			resourceRegExp: /^@ckeditor\/(?!ckeditor5-(engine|utils))/
		}),
		// Don't throw error in version.js if ckeditor5-utils is loaded more than once
		new webpack.NormalModuleReplacementPlugin(
			/^@ckeditor\/ckeditor5-utils\/src\/version$/,
			fs.realpathSync('./src/ckeditor5-utils/version.js')
		)
	);

	return config;
};
