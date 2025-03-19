import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, PanelRow } from '@wordpress/components';

export default function VideoPanel({ attributes, setAttributes, attributeName, label = '' }) {
	// handle video change
	const handleFileSelect = (upload) => {
		let newAttributes = { ...attributes };

		const { poster } = newAttributes[attributeName];
		newAttributes[attributeName] = {
			id: upload.id,
			src: upload.url,
			alt: upload.title,
			width: upload.width,
			height: upload.height,
			type: upload.mime,
			poster: poster,
		};

		setAttributes(newAttributes);
	};

	// handle image change
	const handleAddPoster = (upload) => {
		let newAttributes = { ...attributes };

		const { poster, ...rest } = newAttributes[attributeName];
		newAttributes[attributeName] = {
			...rest,
			poster: upload.url,
		};

		setAttributes(newAttributes);
	};

	// handle reset image button
	const handleResetButton = () => {
		let newAttributes = { ...attributes };

		newAttributes[attributeName] = {
			id: '',
			src: '',
		};
		setAttributes(newAttributes);
	};

	return (
		<div className="video-selector">
			<hr />

			<div className="video-wrapper">
				{attributes[attributeName].src ? (
					<PanelRow className="video">
						<video src={attributes[attributeName].src} controls>
							<source src={attributes[attributeName].src} type={attributes[attributeName].type}></source>
						</video>
					</PanelRow>
				) : null}

				{attributes[attributeName].poster ? (
					<PanelRow className="video-poster">
						<img src={attributes[attributeName].poster} alt={label} />
					</PanelRow>
				) : null}
			</div>

			<div>
				{label && (
					<PanelRow className="video-label">
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
											Escolher o vídeo
										</Button>
									);
								}}
							/>
						</MediaUploadCheck>
					</div>

					<div className="wp-imagem-col">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={handleAddPoster}
								value={attributes[attributeName].id}
								render={({ open }) => {
									return (
										<Button onClick={open} className="is-primary">
											Escolher Capa
										</Button>
									);
								}}
							/>
						</MediaUploadCheck>
					</div>
				</PanelRow>

				{attributes[attributeName].id && (
					<PanelRow className="wp-imagem-row">
						<div className="wp-imagem-col-full">
							<Button className="is-secondary" onClick={handleResetButton}>
								Restaurar Padrão
							</Button>
						</div>
					</PanelRow>
				)}
			</div>

			<hr />
		</div>
	);
}
