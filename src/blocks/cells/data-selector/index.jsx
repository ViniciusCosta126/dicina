import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'admin-site',
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, submitLabel } = attributes;

	const currentLang = sessionStorage.getItem('qtranslate-xt-admin-edit-language');

	const labels = {
		day: {
			placeholder: currentLang === 'pt' ? 'Dia' : 'Day',
			error: currentLang === 'pt' ? 'Selecione um dia' : 'Select a day',
		},
		month: {
			placeholder: currentLang === 'pt' ? 'Mês' : 'Month',
			error: currentLang === 'pt' ? 'Selecione um mês' : 'Select a month',
		},
	};
	const days =
		'01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31';
	const months = 'Janeiro, Fevereiro, Março, Abril, Maio, Junho, Julho, Agosto, Setembro, Outubro, Novembro, Dezembro';
	const enMonths = 'January, February, March, April, May, June, July, August, September, October, November, December';
	const limits = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	const Inputs = () => {
		if (variant === 'day-month') {
			return (
				<InnerBlocks
					template={[
						[
							'il/input',
							{
								variant: 'select',
								type: 'day',
								placeholder: labels.day.placeholder,
								errorMessage: `${labels.day.error}`,
								name: 'day',
								ariaLabel: 'day',
								required: true,
								checkboxLabel: days,
							},
						],
						[
							'il/input',
							{
								variant: 'select',
								type: 'month',
								limit: limits,
								placeholder: labels.month.placeholder,
								errorMessage: `${labels.month.error}`,
								name: 'month',
								ariaLabel: 'month',
								required: true,
								checkboxLabel: currentLang === 'pt' ? months : enMonths,
							},
						],
						[
							'il/input',
							{
								variant: 'submit-button',
								name: '',
								ariaLabel: '',
								checkboxLabel: '',
								buttonLabel: submitLabel,
							},
						],
					]}
				/>
			);
		}
	};

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<form className={`data-selector ${variant} wp-editor data-selector-${randomComponentId}`}>
				<Inputs />
			</form>
		</>
	);
}
