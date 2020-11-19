import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { $get, $transform } from "plow-js";
import omit from 'lodash.omit';
import style from './style.css';
import { executeCommand } from '@neos-project/neos-ui-ckeditor5-bindings';

import { selectors } from '@neos-project/neos-ui-redux-store';
import { neos } from '@neos-project/neos-ui-decorators';
import { ButtonGroup, Button, IconButton } from '@neos-project/react-ui-components';

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
		return (
			<div className={style.button}>
				<IconButtonComponent
					{...this.props}
				/>
				{this.shouldDisplayAdditionalButtons() && <IconButton className={style.icon} onClick={this.toggleOpen} icon={this.isOpen() ? 'chevron-up' : 'chevron-down'} />}
				{this.isOpen() && (
					<div className={style.dialog}>
						<ButtonGroup value={this.getListStyleUnderCursor('default')} onSelect={this.handleListStyleSelect}>
							<Button
								id="default"
								style="lighter"
								size="regular"
								title="Standard"
							>Standard</Button>
							<Button
								id="disc"
								style="lighter"
								size="regular"
								title="Disc"
							>Disc</Button>
							<Button
								id="circle"
								style="lighter"
								size="regular"
								title="Circle"
							>Circle</Button>
							<Button
								id="square"
								style="lighter"
								size="regular"
								title="Square"
							>Square</Button>
						</ButtonGroup>
					</div>
				)}
			</div>
		);
	}

	handleListStyleSelect = (style) => {
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

	getFormattingUnderCursor(defaultValue = '') {
		const { listType } = this.props;

		return $get(listType, this.props.formattingUnderCursor) || defaultValue;
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
