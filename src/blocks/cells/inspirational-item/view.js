// If Needs to import any script:
// import { tns } from 'tiny-slider';

document.addEventListener('DOMContentLoaded', function () {
	let player;
	const youtubeScript = ({ id, action }) => {
		const modalVideo = document.querySelector('.modal-video');
		const script = document.querySelector('#youtube-script');

		if (!script) {
			// Cria carrecagemto de script do youtube apenas após o click
			function loadScript(scriptUrl) {
				const script = document.createElement('script');
				script.src = scriptUrl;
				script.id = 'youtube-script';

				const firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

				return new Promise((res, rej) => {
					script.onload = function () {
						res();
					};
					script.onerror = function () {
						rej();
					};
				});
			}

			// 3. This function creates an <iframe> (and YouTube player)
			//    after the API code downloads.
			function onYouTubeIframeAPIReady() {
				window.YT.ready(function () {
					player = new YT.Player('player', {
						videoId: id,
						events: {
							onReady: onPlayerReady,
						},
					});
				});
			}

			// 4. The API will call this function when the video player is ready.
			function onPlayerReady(event) {
				event.target.playVideo();
				modalVideo.classList.add('opened');
			}

			// chama o carregamento do script do youtube
			loadScript('https://www.youtube.com/iframe_api')
				.then(() => {
					onYouTubeIframeAPIReady();
				})
				.catch(() => {
					console.error('Script loading failed! Handle this error');
				});
		} else {
			if (action === 'play') {
				modalVideo.classList.add('opened');
				player.loadVideoById({ videoId: id });
			} else if (action === 'stop') {
				modalVideo.classList.remove('opened');
				player.stopVideo();
			}
		}
	};

	const videos = document.querySelectorAll('.js-play-video');
	if (videos.length) {
		videos.forEach(videoBtn => {
			videoBtn.onclick = () => {
				const id = videoBtn.getAttribute('data-video-id');

				youtubeScript({ id, action: 'play' });
			};
		});
	}

	const closeVideo = document.querySelector('.modal-video .close-button');
	closeVideo.onclick = () => {
		youtubeScript({ id: '', action: 'stop' });
	};
}, false);
