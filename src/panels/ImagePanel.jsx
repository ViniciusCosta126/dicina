import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, PanelRow } from '@wordpress/components';

export default function ImagePanel({
	attributes,
	setAttributes,
	attributeName,
	label = '',
	onChange = null,
	onChangeAttribute = null,
}) {
	// handle image change
	const handleFileSelect = (upload) => {
		let newAttributes = { ...attributes };

		newAttributes[attributeName] = {
			type: upload.mime,
			id: upload.id,
			src: upload.url,
			alt: upload.alt || upload.title,
			width: upload.width || 0,
			height: upload.height || 0,
		};

		setAttributes(newAttributes);

		if (onChange) {
			var obj = {};
			obj[onChangeAttribute] = newAttributes[attributeName];
			onChange(obj);
		}
	};

	// handle reset image button
	const handleResetButton = () => {
		let newAttributes = { ...attributes };

		newAttributes[attributeName] = {
			id: '',
			src: '',
		};
		setAttributes(newAttributes);

		if (onChange) {
			var obj = {};
			obj[onChangeAttribute] = newAttributes[attributeName];
			onChange(obj);
		}
	};

	return (
		<>
			{attributes[attributeName].id &&
				(attributes[attributeName].type === 'video/mp4' || attributes[attributeName].type === 'video/webm' ? (
					<PanelRow>
						<video src={attributes[attributeName].src} style={{ width: '100%' }} />
					</PanelRow>
				) : (
					<PanelRow className="wp-image-selector">
						<img src={attributes[attributeName].src} alt={label} style={{ width: '100%' }} />
					</PanelRow>
				))}

			<div>
				{label && (
					<PanelRow>
						<label>{label}</label>
					</PanelRow>
				)}

				<PanelRow className="wp-imagem-row">
					<div className="wp-imagem-col">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={handleFileSelect}
								value={attributes[attributeName].id}
								render={({ open }) => {
									return (
										<Button onClick={open} className="is-primary">
											Escolher Imagem
										</Button>
									);
								}}
							/>
						</MediaUploadCheck>
					</div>

					{attributes[attributeName].id && (
						<div className="wp-imagem-col">
							<Button className="is-secondary" onClick={handleResetButton}>
								Restaurar Padrão
							</Button>
						</div>
					)}
				</PanelRow>
			</div>
		</>
	);
}
