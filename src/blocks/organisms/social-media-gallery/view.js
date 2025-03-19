const checkScrollPosition = (ScrollTrigger, wrapper) => {
	if (wrapper !== undefined) {
		ScrollTrigger.create({
			trigger: wrapper,
			start: 'top bottom',
			end: 'bottom top',
			onToggle: (self) => {
				self.isActive ? play() : pause();
			},
		});

		const play = () => {
			if (window.innerWidth > 1024) {
				const wrapperVideos = wrapper.querySelector('.slider-in-phone .carousel');

				if (wrapperVideos) {
					const currentItem = wrapperVideos.getAttribute('current-slide');
					const currentVideo = wrapperVideos.querySelector(`.social-media-item[data-index='${currentItem - 1}'] video`);

					if (currentVideo) {
						playVideo(currentVideo);
					}
				}
			}
		};

		const pause = () => {
			if (window.innerWidth > 1024) {
				pauseAllGalleryVideos(wrapper);
			}
		};
	}
};

const playVideo = (video) => {
	if (video) {
		video.play();
	}
};

export const volumeVideo = (wrapper, muted, video) => {
	if (video) {
		video.muted = muted;
	} else {
		const wrapperVideos = wrapper.querySelector('.slider-in-phone .carousel');
		if (wrapperVideos) {
			const currentItem = wrapperVideos.getAttribute('current-slide');
			const currentVideo = wrapperVideos.querySelector(`.tns-slide-active[data-index='${currentItem - 1}'] video`);
			currentVideo.muted = muted;
		}
	}
};

const pauseVideo = (video) => {
	video.currentTime = 0;
	video.pause();
};

export const pauseAllGalleryVideos = (wrapper) => {
	if (wrapper) {
		const videos = wrapper.querySelectorAll('.tns-item video');

		if (videos.length) {
			videos.forEach((video) => {
				pauseVideo(video);
			});
		}
	}
};

export const loadGalleryEvents = (gallery) => {
	if (gallery) {
		const sliders = gallery.querySelectorAll('.carousel.just-image-carousel.small');
		const videosWrapper = gallery.querySelector('.slider-in-phone');

		sliders.forEach((slide) => {
			const slideItems = slide.querySelectorAll('.social-media-item picture');

			slideItems.forEach((item) => {
				item.onclick = () => {
					if (window.innerWidth < 1024) {
						gallery.classList.add('in-front');
						videosWrapper.classList.add('active');
					}
					pauseAllGalleryVideos(gallery);

					const wrapperVideos = gallery.querySelector('.slider-in-phone');
					const currentItem = wrapperVideos.querySelector('.tns-slide-active video');

					if (currentItem) {
						const muteButton = wrapperVideos.querySelector('.mute-button');
						const unmuteButton = wrapperVideos.querySelector('.unmute-button');
						if (muteButton && unmuteButton) {
							if (muteButton.classList.contains('hide')) {
								//is muted
								volumeVideo(wrapperVideos, true, currentItem);
							} else {
								//is unmuted
								volumeVideo(wrapperVideos, false, currentItem);
							}
						}

						playVideo(currentItem);
					}
				};
			});
		});
	}
};

document.addEventListener(
	'DOMContentLoaded',
	function () {
		const gallery = document.querySelectorAll('.social-media-gallery');

		if (gallery.length) {
			gallery.forEach((galleryItem) => {
				const ScrollTrigger = window.ScrollTrigger;
				checkScrollPosition(ScrollTrigger, galleryItem);

				loadGalleryEvents(galleryItem);

				const videosWrapper = galleryItem.querySelector('.slider-in-phone');

				if (videosWrapper) {
					const closeButton = videosWrapper.querySelector('.close-button');

					closeButton.onclick = () => {
						if (window.innerWidth < 1024) {
							galleryItem.classList.remove('in-front');
							videosWrapper.classList.remove('active');

							pauseAllGalleryVideos(galleryItem);
						}
					};

					const muteButton = videosWrapper.querySelector('.mute-button');
					const unmuteButton = videosWrapper.querySelector('.unmute-button');

					if (muteButton && unmuteButton) {
						// mute
						muteButton.onclick = () => {
							muteButton.classList.add('hide');
							unmuteButton.classList.remove('hide');
							volumeVideo(galleryItem, true);
						};

						// unmute
						unmuteButton.onclick = () => {
							muteButton.classList.remove('hide');
							unmuteButton.classList.add('hide');
							volumeVideo(galleryItem, true);
						};
					}

					const checkGalleryActive = () => {
						if (window.innerWidth >= 1024) {
							videosWrapper.classList.remove('active');
						}
					};

					window.addEventListener('resize', checkGalleryActive);
				}
			});
		}
	},
	false
);
