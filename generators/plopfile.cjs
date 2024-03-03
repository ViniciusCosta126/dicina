module.exports = (plop) => {
	plop.setGenerator('component', {
		description: 'Create a component',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is your component name?',
			},
			{
				type: 'list',
				name: 'category',
				message: 'What is the category of this component?',
				choices: ['Atoms', 'Cells', 'Organisms', 'Templates'],
			},
			{
				type: 'input',
				name: 'description',
				message: 'Enter a short description of the component:',
			},
			{
				type: 'list',
				name: 'script',
				message: 'Add view.js (javascript) file?',
				choices: ['Yes', 'No'],
			},
		],
		actions: function (data) {
			const actions = [];
			if (data.category !== 'Templates') {
				// Templates de blocos padrões
				actions.push(
					{
						type: 'add',
						path: '../src/blocks/{{kebabCase category}}/{{kebabCase name}}/controls.jsx',
						templateFile: 'templates/default-block/controls.jsx.hbs',
					},
					{
						type: 'add',
						path: '../src/blocks/{{kebabCase category}}/{{kebabCase name}}/index.jsx',
						templateFile: 'templates/default-block/index.jsx.hbs',
					},
					{
						type: 'add',
						path: '../src/blocks/{{kebabCase category}}/{{kebabCase name}}/render.php',
						templateFile: 'templates/default-block/render.php.hbs',
					},
					{
						type: 'add',
						path: '../src/blocks/{{kebabCase category}}/{{kebabCase name}}/style.scss',
						templateFile: 'templates/default-block/style.scss.hbs',
					}
				);

				if (data.script === 'Yes') {
					actions.push(
						{
							type: 'add',
							path: '../src/blocks/{{kebabCase category}}/{{kebabCase name}}/block.json',
							templateFile: 'templates/default-block/block-view.json.hbs',
						},
						{
							type: 'add',
							path: '../src/blocks/{{kebabCase category}}/{{kebabCase name}}/view.js',
							templateFile: 'templates/default-block/view.js.hbs',
						}
					);
				} else {
					actions.push({
						type: 'add',
						path: '../src/blocks/{{kebabCase category}}/{{kebabCase name}}/block.json',
						templateFile: 'templates/default-block/block.json.hbs',
					});
				}
			} else {
				// Templates para blocos de templates de páginas
				actions.push(
					{
						type: 'add',
						path: '../src/blocks/{{kebabCase category}}/{{kebabCase name}}/controls.jsx',
						templateFile: 'templates/template-block/controls.jsx.hbs',
					},
					{
						type: 'add',
						path: '../src/blocks/{{kebabCase category}}/{{kebabCase name}}/index.jsx',
						templateFile: 'templates/template-block/index.jsx.hbs',
					},
					{
						type: 'add',
						path: '../src/blocks/{{kebabCase category}}/{{kebabCase name}}/render.php',
						templateFile: 'templates/template-block/render.php.hbs',
					},
					{
						type: 'add',
						path: '../src/blocks/{{kebabCase category}}/{{kebabCase name}}/style.scss',
						templateFile: 'templates/template-block/style.scss.hbs',
					}
				);

				if (data.script === 'Yes') {
					actions.push(
						{
							type: 'add',
							path: '../src/blocks/{{kebabCase category}}/{{kebabCase name}}/block.json',
							templateFile: 'templates/template-block/block-view.json.hbs',
						},
						{
							type: 'add',
							path: '../src/blocks/{{kebabCase category}}/{{kebabCase name}}/view.js',
							templateFile: 'templates/template-block/view.js.hbs',
						}
					);
				} else {
					actions.push({
						type: 'add',
						path: '../src/blocks/{{kebabCase category}}/{{kebabCase name}}/block.json',
						templateFile: 'templates/template-block/block.json.hbs',
					});
				}
			}

			return actions;
		},
	});
};
