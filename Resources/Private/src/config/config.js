let listStyles = {};

export function getListStyles() {
	// FIXME: Add support for ol
	return listStyles.hasOwnProperty('ul') ? listStyles.ul : {};
}

export function setListStyles(config) {
	const ul = config.hasOwnProperty('ul') ? config.ul : {};
	const ol = config.hasOwnProperty('ol') ? config.ol : {};

	[ul, ol].forEach(list => {
		Object.keys(list)
			.filter(key => {
				const value = list[key];

				return !value;
			})
			.forEach(key => delete list[key]);
	});

	listStyles = {
		ul: ul,
		ol: ol,
	};
}
