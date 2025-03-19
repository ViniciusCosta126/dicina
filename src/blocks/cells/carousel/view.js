// https://www.npmjs.com/package/tiny-slider#usage
// http://ganlanyuan.github.io/tiny-slider/demo/

import { tns } from 'tiny-slider';
import { activateButon } from '../../atoms/tab-buttons/view';
import { adjustControlsPosition } from '../../organisms/carousel-text-section/view';
import { changeSlide } from '../../organisms/hero-blog/view';
import { loadGalleryEvents, pauseAllGalleryVideos, volumeVideo } from '../../organisms/social-media-gallery/view';

document.addEventListener('DOMContentLoaded', function () {
	let slider = []; //It will be populated with this format = [{ id: 0, slide: [] }]

	const slidesWrapper = document.querySelectorAll(`.carousel`);

	// Construct slider item
	const construct = (slide, index) => {
		const wrapper = slide.querySelector('.carousel-content');

		const id = slide.getAttribute('data-id');
		const mode = slide.getAttribute('data-mode');
		const animateIn = slide.getAttribute('data-animateIn');
		const animateOut = slide.getAttribute('data-mode');
		const navigation = slide.getAttribute('data-navigation') === 'true' ? true : false;
		const navigationDesk = slide.getAttribute('data-navigationDesk') === 'true' ? true : false;
		const dots = slide.getAttribute('data-dots') === 'true' ? true : false;
		const centered = slide.getAttribute('data-centered') === 'true' ? true : false;
		const autoWidth = slide.getAttribute('data-autoWidth') === 'true' ? true : false;
		const autoHeight = slide.getAttribute('data-autoheight') === 'true' ? true : false;
		const isLoop = slide.getAttribute('data-loop') === 'true' ? true : false;
		const isVertical = slide.getAttribute('data-isVertical') === 'true' ? true : false;
		const isAutoplay = slide.getAttribute('data-autoplay') === 'true' ? true : false;
		const speed = parseInt(slide.getAttribute('data-speed'));
		const autoplayTimeout = parseInt(slide.getAttribute('data-autoplayTimeout'));
		const gutter = parseInt(slide.getAttribute('data-gutter'));
		const gutterDesktop = parseInt(slide.getAttribute('data-gutterDesktop'));
		const perView = parseInt(slide.getAttribute('data-perView'));
		const perView480 = parseInt(slide.getAttribute('data-perView480'));
		const perView768 = slide.getAttribute('data-perView768')
			? parseInt(slide.getAttribute('data-perView768'))
			: parseInt(slide.getAttribute('data-perView480'));
		const perView960 = parseInt(slide.getAttribute('data-perView960'));
		const perView1366 = parseInt(slide.getAttribute('data-perView1366'));
		const destroy = slide.getAttribute('data-destroy') === 'true' ? true : false;
		const destroyIn = parseInt(slide.getAttribute('data-destroyIn'));
		const controlsText = slide.getAttribute('controlsText') === 'true' ? true : false;
		const sort = slide.getAttribute('data-sort') === 'true' ? true : false;
		const selfGoTo = slide.getAttribute('data-selfGoTo') === 'true' ? true : false;
		const otherGoTo = slide.getAttribute('data-otherGoTo') === 'true' ? true : false;
		const otherGoToId = slide.getAttribute('data-otherGoToId');
		const forceHeightTransition = slide.getAttribute('data-forceHeightTransition') === 'true' ? true : false;
		const calculateHigher = slide.getAttribute('data-getHigher') === 'true' ? true : false;

		const goToConfigs = {
			id,
			selfGoTo,
			otherGoTo,
			otherGoToId,
		};

		if (!destroy || window.innerWidth < destroyIn) {
			const sliderConfigs = {
				container: wrapper,
				...(mode && { mode: mode }),
				...(animateIn && { animateIn: animateIn }),
				...(animateOut && { animateOut: animateOut }),
				center: centered,
				nav: dots,
				loop: isLoop,
				...(isVertical && { axis: 'vertical' }),
				swipeAngle: false,
				slideBy: 1,
				mouseDrag: true,
				startIndex: 0,
				autoplay: isAutoplay,
				autoplayButtonOutput: false,
				speed: speed,
				autoplayTimeout: autoplayTimeout,
				autoWidth: autoWidth,
				autoHeight: autoHeight,
				gutter: gutter ? gutter : 0,
				responsive: {
					0: {
						...(!autoWidth && { items: perView }),
						controls: navigation,
					},
					480: {
						...(!autoWidth && { items: perView480 }),
						controls: navigation,
					},
					768: {
						...(!autoWidth && { items: perView768 }),
						controls: navigationDesk,
						gutter: gutterDesktop ? gutterDesktop : 0,
					},
					960: {
						...(!autoWidth && { items: perView960 }),
						controls: navigationDesk,
						gutter: gutterDesktop ? gutterDesktop : 0,
					},
					1366: {
						...(!autoWidth && { items: perView1366 }),
						controls: navigationDesk,
						gutter: gutterDesktop ? gutterDesktop : 0,
					},
				},
				...(forceHeightTransition && {
					onInit: function (info) {
						if (calculateHigher) {
							setTimeout(() => {
								console.log('teste: ', info.container.offsetHeight);
								info.container.style.height = info.container.offsetHeight + 'px';
								info.container.closest('.tns-ovh').style.height = info.container.offsetHeight + 'px';

								slider[index].slide.goTo(1);
								slider[index].slide.goTo(0);
							}, 400);
						} else {
							info.container.style.height = info.container.offsetHeight + 'px';
						}
					},
				}),
			};

			if (controlsText) {
				sliderConfigs['controlsText'] = [
					'<svg class="tns_next" width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 24.35L12.973 27.5L5.90104e-07 14L12.973 0.500001L16 3.65L6.10811 14L16 24.35Z" fill="white"/></svg>',
					'<svg class="tns_prev" width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-1.37691e-07 24.35L3.02703 27.5L16 14L3.02702 0.500001L-1.04252e-06 3.65L9.89189 14L-1.37691e-07 24.35Z" fill="white"/>	</svg>',
				];
			}

			if (controlsText && id === 'text-with-image-carousel') {
				sliderConfigs['autoHeight'] = true;
				sliderConfigs['controlsText'] = [
					'<svg class="tns_next" xmlns="http://www.w3.org/2000/svg" width="50" height="42" viewBox="0 0 50 42" fill="none"><path d="M29.7297 10.0137L26.4061 6.7207L12.1621 20.8336L26.4061 34.9465L29.7297 31.6535L18.8686 20.8336L29.7297 10.0137Z" fill="white"/><path d="M44.5949 10.0137L41.2713 6.7207L27.0273 20.8336L41.2713 34.9465L44.5949 31.6535L33.7339 20.8336L44.5949 10.0137Z" fill="white"/></svg>',
					'<svg class="tns_prev" <svg xmlns="http://www.w3.org/2000/svg" width="50" height="42" viewBox="0 0 50 42" fill="none"><path d="M20.2703 31.6523L23.5939 34.9453L37.8379 20.8324L23.5939 6.7195L20.2703 10.0125L31.1314 20.8324L20.2703 31.6523Z" fill="white"/><path d="M5.40509 31.6523L8.72868 34.9453L22.9727 20.8324L8.72868 6.7195L5.40509 10.0125L16.2661 20.8324L5.40509 31.6523Z" fill="white"/></svg>',
				];
			}

			const allItems = Array.from(wrapper.children);
			allItems.forEach((elm, index) => {
				elm.setAttribute('data-index', index);
			});

			if (slider[index] === null) {
				slider.push({ id: id ? id : index, slide: tns(sliderConfigs) });
			} else {
				slider[index] = { id: id ? id : index, slide: tns(sliderConfigs) };
			}

			// Counter
			wrapper.closest('.carousel').setAttribute('current-slide', 1);
			const transitionStartFunction = (info) => {
				wrapper.closest('.carousel').setAttribute('current-slide', info.displayIndex);

				if (controlsText && id === 'text-with-image-carousel') {
					adjustControlsPosition();
				}
			};

			const transitionEndFunction = (info) => {
				const wrapperVideos = wrapper.closest('.carousel-content');

				pauseAllGalleryVideos(wrapperVideos);

				const currentItemVideo = wrapper.querySelector('.tns-slide-active video');
				if (currentItemVideo) {
					const volumeButton = wrapperVideos.querySelector('.volume-button');
					if (volumeButton) {
						if (volumeButton.classList.contains('is-muted')) {
							volumeVideo(wrapperVideos, true, currentItemVideo);
						} else {
							volumeVideo(wrapperVideos, false, currentItemVideo);
						}
					}

					currentItemVideo.play();
				}

			};

			//Change Desktop Slides
			if (id === 'hero-blog-carousel') {
				changeSlide(slider[index].slide.goTo);
			}

			// remove function binding
			if (slider[index].slide?.events) {
				slider[index].slide.events.on('transitionStart', transitionStartFunction);
				slider[index].slide.events.on('transitionEnd', transitionEndFunction);
			}

			slider[index].slide.events.on('indexChanged', function (info) {
				info.container.style.height = info.slideItems[info.index].scrollHeight + 'px';
			});
		}

		if (destroy) {
			window.addEventListener('resize', function () {
				destroyVerify(destroyIn, slide, index);
			});
		}

		if (sort) {
			const wrapperFilter = document.querySelector(`#${id}`);
			const newestImages = wrapperFilter.querySelector(`.sort-carousel-newest`);
			const oldestImages = wrapperFilter.querySelector(`.sort-carousel-oldest`);

			if (newestImages && oldestImages) {
				newestImages.onclick = () => {
					if (slider[index].slide) {
						newestImages.classList.add('active');
						oldestImages.classList.remove('active');
						activateButon(newestImages, wrapperFilter);

						// slider[index].slide.destroy();

						//ordenar carrossel
						sortItems(slide, 'newest', index, true);
					}
				};

				oldestImages.onclick = () => {
					if (slider[index].slide) {
						oldestImages.classList.add('active');
						newestImages.classList.remove('active');

						activateButon(oldestImages, wrapperFilter);
						// slider[index].slide.destroy();

						//ordenar carrossel
						sortItems(slide, 'oldest', index, true);
					}
				};
			}
		}

		//Go to functions
		if (selfGoTo || otherGoTo) {
			goToEvents(slide, goToConfigs, index);
		}
	};

	// Create click events for Go To Slide
	const goToEvents = (slide, goToConfigs, index) => {
		const container = slide.querySelector('.carousel-content');
		let elements = [];

		if (slide.dataset.id === 'gallery-mosaic') {
			const parents = Array.from(container.children);

			parents.forEach((child) => {
				const items = child.querySelectorAll('.mosaic-item');
				elements.push(...items);
			});
		} else {
			elements = Array.from(container.children);
		}

		elements.forEach((item) => {
			const { selfGoTo, otherGoTo, otherGoToId } = goToConfigs;

			item.addEventListener('click', function () {
				if (selfGoTo) {
					const toInd = item.nextElementSibling.dataset.index;

					if (item.nextSibling) {
						slider[index].slide.goTo(toInd);
					}
				}

				if (otherGoTo) {
					const sliderIndex = slider.findIndex((item) => item?.id == otherGoToId); // indice do array de sliders
					const indexId = item.dataset.indexid;
					const otherItemIndex = document.querySelector(
						`.carousel[data-id='${otherGoToId}'] .tns-item[data-indexid='${indexId}']`
					).dataset.indexid;
					slider[sliderIndex].slide.goTo(otherItemIndex);
				}
			});
		});
	};

	//Function to sort items
	const sortItems = (slideItem, by = 'newest', ind, rebuild = false) => {
		slideItem.classList.add('sorting');

		const container = slideItem.querySelector('.carousel-content');
		const elements = Array.from(container.querySelectorAll('.social-media-item:not(.tns-slide-cloned)'));
		container.innerHTML = '';

		let sorted;
		if (by === 'newest') {
			sorted = elements.sort(function (a, b) {
				return new Date(a.dataset.date) - new Date(b.dataset.date);
			});
		} else {
			sorted = elements.sort(function (a, b) {
				return new Date(b.dataset.date) - new Date(a.dataset.date);
			});
		}

		sorted.forEach((elm, index) => {
			elm.setAttribute('data-index', index);
			container.append(elm);
		});

		setTimeout(() => {
			slideItem.classList.remove('sorting');
		}, 1000);

		if (rebuild) {
			setTimeout(() => {
				construct(slideItem, ind);
			});

			if (slideItem.dataset.id === 'filter-tiktoks-by-date') {
				const parentElement = slideItem.closest('.social-media-gallery-container');
				loadGalleryEvents(parentElement);
			}
		}
	};

	// Run resize event to destroy and recreate slider
	const destroyVerify = (destroyIn, slideItem, index) => {
		if (window.innerWidth > destroyIn && slider[index]) {
			slider[index].slide.destroy();
			slider[index] = '';
		} else {
			if (slider[index] === '' || !slider[index]) {
				construct(slideItem, index);
			}
		}
	};

	// Run multiple slider in same page
	slidesWrapper.forEach(async (slideItem, index) => {
		const sort = slideItem.getAttribute('data-sort') === 'true' ? true : false;
		const delay = slideItem.getAttribute('data-delay') !== '' ? parseInt(slideItem.getAttribute('data-delay')) : 0;

		if (sort) {
			sortItems(slideItem, 'newest', index, true);
		} else {
			setTimeout(() => {
				construct(slideItem, index);
			}, delay);
		}
	});
});
