import {
	Panel,
	PanelBody,
	SelectControl,
	ToggleControl,
	ToolbarGroup,
	ToolbarButton,
	Popover,
	Button,
} from '@wordpress/components';
import {
	InspectorControls,
	BlockControls,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import ColorPanel from '../../../panels/ColorPanel';
import { useState } from '@wordpress/element';
import { link } from '@wordpress/icons';

export default function Controls({ attributes, setAttributes }) {
	const { variant, action, hasLink, addCustomColor } = attributes;

	const [showLinkPicker, setshowLinkPicker] = useState(false);

	function handleLinkChange(newLink) {
		let newLinkAttribute, hasLink;

		if (newLink) {
			newLinkAttribute = {
				url: newLink.url,
				target: newLink.target,
				title: newLink.title,
			};

			hasLink = true;
		} else {
			newLinkAttribute = {
				url: '',
				target: '',
				title: '',
			};

			hasLink = false;
		}

		setAttributes({ hasLink });
		setAttributes({ link: newLinkAttribute });
	}

	const linkButtonHandler = () => {
		setshowLinkPicker((prev) => !prev);
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton onClick={linkButtonHandler} icon={link} />
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<Panel>
					<PanelBody
						title="Cores"
						initialOpen={false}
						className="color-panel"
					>
						<ColorPanel
							label="Cor do Fundo"
							attributeName="bgColor"
							attributes={attributes}
							setAttributes={setAttributes}
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>
			{showLinkPicker && (
				<Popover
					position="middle center"
					className="popover-button-option"
				>
					<LinkControl
						settings={[
							{
								id: 'target',
								title: 'Abrir em nova guia?',
							},
						]}
						value={attributes.link}
						onChange={handleLinkChange}
					/>

					<Button
						className="clear-link"
						variant="secondary"
						onClick={() => handleLinkChange()}
					>
						Limpar
					</Button>

					<Button
						variant="primary"
						onClick={() => setshowLinkPicker(false)}
						style={{ display: 'block', width: '100%' }}
					>
						OK
					</Button>
				</Popover>
			)}
		</>
	);
}
