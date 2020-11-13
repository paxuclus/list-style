/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils/version
 */

/* globals window, global */

const version = '16.0.0';

/* istanbul ignore next */
const windowOrGlobal = typeof window === 'object' ? window : global;

/* istanbul ignore next */
if ( windowOrGlobal.CKEDITOR_VERSION ) {
	// dont throw error
} else {
	windowOrGlobal.CKEDITOR_VERSION = version;
}
