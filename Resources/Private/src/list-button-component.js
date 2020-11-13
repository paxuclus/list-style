import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { $get, $transform } from "plow-js";
import omit from 'lodash.omit';
import style from './style.css';
import { executeCommand } from '@neos-project/neos-ui-ckeditor5-bindings';

import { selectors } from '@neos-project/neos-ui-redux-store';
import { neos } from '@neos-project/neos-ui-decorators';
import { IconButton } from '@neos-project/react-ui-components';

@neos(globalRegistry => ({
	i18nRegistry: globalRegistry.get('i18n')
}))
class IconButtonComponent extends PureComponent {
	static propTypes = {
		i18nRegistry: PropTypes.object,
		tooltip: PropTypes.string,
	};

	render() {
		const finalProps = omit(this.props, ['executeCommand', 'formattingRule', 'formattingUnderCursor', 'inlineEditorOptions', 'i18nRegistry', 'tooltip', 'isActive']);
		return (<IconButton {...finalProps} isActive={Boolean(this.props.isActive)}
							title={this.props.i18nRegistry.translate(this.props.tooltip)} />);
	}
}

@connect($transform({
	formattingUnderCursor: selectors.UI.ContentCanvas.formattingUnderCursor
}))
@neos(globalRegistry => ({
	i18nRegistry: globalRegistry.get('i18n')
}))
export default class ListButtonComponent extends PureComponent {
	static propTypes = {
		formattingUnderCursor: PropTypes.objectOf(PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.bool,
			PropTypes.string,
			PropTypes.object
		])),
		inlineEditorOptions: PropTypes.object,
		i18nRegistry: PropTypes.object.isRequired,
		listType: PropTypes.string.isRequired,
		commandName: PropTypes.string.isRequired,
		isActive: PropTypes.bool.isRequired,
	};

	state = {
		isOpen: false
	};

	render() {
		const { formattingUnderCursor, inlineEditorOptions } = this.props;

		return (
			<div className={style.button}>
				<IconButtonComponent
					{...this.props}
				/>
				{this.shouldDisplayAdditionalButtons() && <IconButton className={style.icon} onClick={this.toggleOpen} icon={this.isOpen() ? 'chevron-up' : 'chevron-down'} />}
				{this.isOpen() && (
					<div className={style.dialog}>
						<IconButton className={style.listStyleIcon} onClick={() => this.handleListStyleClick('default')} isActive={this.getListStyleUnderCursor() === ''} icon="ban" /><br/>
						<IconButton className={style.listStyleIcon} onClick={() => this.handleListStyleClick('disc')} isActive={this.getListStyleUnderCursor() === 'disc'} icon="headphones" /><br/>
						<IconButton className={style.listStyleIcon} onClick={() => this.handleListStyleClick('circle')} isActive={this.getListStyleUnderCursor() === 'circle'} icon="hand-holding" /><br/>
						<IconButton className={style.listStyleIcon} onClick={() => this.handleListStyleClick('square')} isActive={this.getListStyleUnderCursor() === 'square'} icon="lastfm" /><br/>
					</div>
				)}
			</div>
		);
	}

	handleListStyleClick = (style) => {
		const current = this.getListStyleUnderCursor();

		if (current !== style) {
			executeCommand( 'listStyle', { type: style } );
		} else {
			executeCommand( 'listStyle', { type: 'default' } );
		}
	};

	toggleOpen = () => {
		this.setState({isOpen: !this.isOpen()});
	};

	getFormattingUnderCursor() {
		const { listType } = this.props;

		return $get(listType, this.props.formattingUnderCursor) || '';
	}

	getListStyleUnderCursor() {
		return $get('listStyle', this.props.formattingUnderCursor) || '';
	}

	shouldDisplayAdditionalButtons() {
		return this.getFormattingUnderCursor() !== '' && $get('formatting.listStyle', this.props.inlineEditorOptions);
	}

	isOpen() {
		return this.state.isOpen;
	}
}
