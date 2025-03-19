export const documentPanel = () => {
	// Select document according to context
	// If you are in the template parts editor, the correct document is inside an iframe
	const contentIframe = document.querySelector('iframe.edit-site-visual-editor__editor-canvas');
	return contentIframe ? contentIframe.contentDocument : document;
};

export const getCurrentInnerBlocks = (clientId) => {
	const currentBlock = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0];
	const existingInnerBlocks = currentBlock.innerBlocks;

	return existingInnerBlocks;
};

export const resetInnerBlocks = (clientId) => {
	//Clear InnerBlocks and Recreate
	const currentBlock = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0];
	const childBlocks = currentBlock.innerBlocks;
	const clientIds = childBlocks.map((block) => block.clientId);
	wp.data.dispatch('core/block-editor').removeBlocks(clientIds);
};
