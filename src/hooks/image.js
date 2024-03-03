import apiFetch from '@wordpress/api-fetch';

/**
 * Fetch image by id.
 * @returns {string} Image URL
 */
export const getImageUrlById = async (id) => {
	const response = await apiFetch({
		path: `/wp/v2/media/${id}`,
		method: 'GET',
	});
	return response.source_url;
};
