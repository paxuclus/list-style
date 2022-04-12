let listStyles = {};

/**
 * @param {'ul' | 'ol'} listType
 * @return {Record<string, {value: string, title: string}>}
 */
export function getListStyles(listType) {
	return listStyles.hasOwnProperty(listType) ? listStyles[listType] : {};
}

/**
 * Tries to determine the type of list from a given list styling
 * @param {string} style
 * @return {"bulleted"|"numbered"|null}
 */
export function getListTypeFromListStyleType( style ) {
	const listType = Object.keys( listStyles ).find( type => {
		return Object.keys(listStyles[type]).includes(style);
	} );

	if ( listType === 'ul' ) {
		return 'bulleted';
	} else if ( listType === 'ol' ) {
		return 'numbered';
	}

	return null;
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
