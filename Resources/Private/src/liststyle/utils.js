/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module list/utils
 */


/**
 * Helper function that searches for a previous list item sibling of a given model item that meets the given criteria
 * passed by the options object.
 *
 * @param {module:engine/model/item~Item} modelItem
 * @param {Object} options Search criteria.
 * @param {Boolean} [options.sameIndent=false] Whether the sought sibling should have the same indentation.
 * @param {Boolean} [options.smallerIndent=false] Whether the sought sibling should have a smaller indentation.
 * @param {Number} [options.listIndent] The reference indentation.
 * @returns {module:engine/model/item~Item|null}
 */
export function getSiblingListItem( modelItem, options ) {
	const sameIndent = !!options.sameIndent;
	const smallerIndent = !!options.smallerIndent;
	const indent = options.listIndent;

	let item = modelItem;

	while ( item && item.name == 'listItem' ) {
		const itemIndent = item.getAttribute( 'listIndent' );

		if ( ( sameIndent && indent == itemIndent ) || ( smallerIndent && indent > itemIndent ) ) {
			return item;
		}

		item = item.previousSibling;
	}

	return null;
}
