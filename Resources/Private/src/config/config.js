let listStyles = {};

/**
 * @param {'ul' | 'ol'} listType
 * @return {Record<string, {value: string, title: string}>}
 */
export function getListStyles(listType) {
	return listStyles.hasOwnProperty(listType) ? listStyles[listType] : {};
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
