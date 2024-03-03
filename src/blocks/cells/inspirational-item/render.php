<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<div class="inspirational-item <?= $attributes["variant"] ?> inspirational-item-<?= $randomComponentId ?>">
    <style>
        .inspirational-item-<?= $randomComponentId ?> {
			background: url(<?= $attributes['bgImage']['src'] ?>) no-repeat top center;
			background-size: cover;


            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .inspirational-item-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

	<div class="wrapper__mask">
		<div class="inspirational-item__content container">
			<div class="text">
				<p class="phrase"><?= $attributes['phrase'] ?></p>

				<div class="social">
					<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clip-path="url(#clip0_6398_695)">
					<path d="M18 12.8569C15.1597 12.8569 12.8572 15.1595 12.8572 17.9998C12.8572 20.8402 15.1597 23.1426 18 23.1426C20.8404 23.1426 23.1429 20.8402 23.1429 17.9998C23.1429 15.1595 20.8404 12.8569 18 12.8569Z" fill="white"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M1.60456 4.601C0.857178 6.06783 0.857178 7.988 0.857178 11.8284V24.1712C0.857178 28.0116 0.857178 29.9317 1.60456 31.3986C2.26198 32.6888 3.31099 33.7378 4.60125 34.3952C6.06807 35.1426 7.98825 35.1426 11.8286 35.1426H24.1715C28.0118 35.1426 29.932 35.1426 31.3989 34.3952C32.6891 33.7378 33.738 32.6888 34.3955 31.3986C35.1429 29.9317 35.1429 28.0116 35.1429 24.1712V11.8284C35.1429 7.988 35.1429 6.06783 34.3955 4.601C33.738 3.31075 32.6891 2.26173 31.3989 1.60432C29.932 0.856934 28.0118 0.856934 24.1715 0.856934H11.8286C7.98825 0.856934 6.06807 0.856934 4.60125 1.60432C3.31099 2.26173 2.26198 3.31075 1.60456 4.601ZM28.3572 9.57121C29.3435 9.57121 30.1428 8.77172 30.1428 7.78551C30.1428 6.79928 29.3435 5.99979 28.3572 5.99979C27.371 5.99979 26.5715 6.79928 26.5715 7.78551C26.5715 8.77172 27.371 9.57121 28.3572 9.57121ZM9.42861 17.9998C9.42861 13.2659 13.2662 9.42836 18 9.42836C22.7339 9.42836 26.5715 13.2659 26.5715 17.9998C26.5715 22.7336 22.7339 26.5712 18 26.5712C13.2662 26.5712 9.42861 22.7336 9.42861 17.9998Z" fill="white"/>
					</g>
					<defs>
					<clipPath	clipPath id="clip0_6398_695">
					<rect width="36" height="36" fill="white"/>
					</clipPath>
					</defs>
					</svg>
					<span><?= $attributes['instagram'] ?></span>
				</div>
			</div>

			<div class="videos">
				<div class="wrapper__video">
					<div class="video">
						<button class="video-play-button js-play-video" data-video-id="<?= $attributes['video1Id'] ?>" title="Abrir Video">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53.9 52.5">
								<path d="M52.4 23.4L4.4.3C2.5-.6 0 .6 0 2.5V50c0 1.9 2.5 3.2 4.4 2.2l47.9-22.8c2-1.1 2-5.1.1-6z" />
							</svg>
						</button>
						<img class="video-thumb" src="<?= $attributes['videoThumb1']['src'] ?>" >
					</div>
					<span><?= $attributes['video1Caption'] ?></span>
				</div>
				<div class="wrapper__video">
					<div class="video">
						<button class="video-play-button js-play-video" data-video-id="<?= $attributes['video2Id'] ?>" title="Abrir Video">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53.9 52.5">
								<path d="M52.4 23.4L4.4.3C2.5-.6 0 .6 0 2.5V50c0 1.9 2.5 3.2 4.4 2.2l47.9-22.8c2-1.1 2-5.1.1-6z" />
							</svg>
						</button>
						<img class="video-thumb" />
						<img class="video-thumb" src="<?= $attributes['videoThumb2']['src'] ?>" >

					</div>
					<span><?= $attributes['video2Caption'] ?></span>

				</div>
			</div>

			<div class="text__controls">
				<span class="profession"><?= $attributes['profession'] ?></span>
				<div class="wrapper__text_controls">
					<span class="title"><?= $attributes['title'] ?></span>
					<br>
					<span class="senna-sans"><?= $attributes['titleSenna'] ?></span>
				</div>
			</div>
		</div>
	</div>
</div>

