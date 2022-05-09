import { $get } from 'plow-js';

/**
 * @typedef {Record<string, {value: string, title: string}>} ListStyleDefinitions
 */

/**
 * @type {Partial<Record<'ol'|'ul', ListStyleDefinitions>>}
 */
let listStyles = {};
const noListStyles = { ol: {}, ul: {} };

/**
 * @param {'ul' | 'ol'} listType
 * @return {(typeof listStyles)[string]}
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

/**
 * @typedef EditorConfiguration
 * @property {object?} formatting
 * @property {boolean|null} formatting.listStyle
 * @property {boolean|Record<'ol'|'ul', boolean|null|Record<string, boolean|null>>} listStyle
 */

/**
 * Returns the part of `object` that is enabled by `keys` in the order of `keys`
 * @param {boolean|null|Record<string, boolean|null>} keys If true, returns the
 * 		complete object. If falsy, returns an empty records. Otherwise, returns
 * 		the values of `object` corresponding to a truthy key in `keys`.
 * @param {Record<string, unknown>} object
 * @returns {Partial<Record<string, unknown>>}
 */
function enabledKeys(keys, object) {
	if (keys === true) {
		return object;
	}
	if (!keys) {
		return {};
	}
	return Object.keys(keys).reduce((c, key) => {
		if (!!keys[key] && object[key]) {
			c[key] = object[key];
		}
		return c;
	}, {});
}

/**
 * Filters available list styles according to the given editor configuration
 * @param {EditorConfiguration} editorConfiguration
 * @param {typeof listStyles} availableListStyles
 * @returns {typeof listStyles}
 */
export function getEnabledListStyles(editorConfiguration, availableListStyles = listStyles) {
	if (editorConfiguration.listStyle === true) {
		return availableListStyles;
	}
	if (editorConfiguration.listStyle === false || editorConfiguration.listStyle === null) {
		return noListStyles;
	}

	const olEnabled = $get(['listStyle', 'ol'], editorConfiguration);
	const ulEnabled = $get(['listStyle', 'ul'], editorConfiguration);

	if (!olEnabled && !ulEnabled) {
		const fallback = $get(['formatting', 'listStyle'], editorConfiguration)
		if (fallback) {
			return availableListStyles;
		} else {
			return noListStyles;
		}
	}

	return {
		ol: enabledKeys(olEnabled, availableListStyles.ol),
		ul: enabledKeys(ulEnabled, availableListStyles.ul),
	};
}

/**
 * @param {typeof listStyles} enabledStyles
 * @returns {boolean}
 */
export function hasEnabledStyles(enabledStyles) {
	return Object.keys(enabledStyles).some(k => Object.keys(enabledStyles[k]).length > 0);
}
