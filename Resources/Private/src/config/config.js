let listStyles = {};

export function getListStyles() {
	// FIXME: Add support for ol
	return listStyles.hasOwnProperty('ul') ? listStyles.ul : {};
}

export function setListStyles(config) {
	listStyles = config;
}
