<section class="benefits" style="background-color: <?=$attributes['bgColor']?>;">
    <div class="container">
        <h2 style="color: <?=$attributes['titleColor']?>;"><?=$attributes['title']?></h2>
        <p class="subtitle" style="color: <?=$attributes['subtitleColor']?>;"><?=$attributes['subtitle']?></p>

        <div class="cards-wrapper">
            <div class="card">
                <div class="img-wrapper" style="border: 2px solid <?=$attributes['cardTextColor']?>;">
                    <img src="<?=$attributes['card1img']['src'] ? $attributes['card1img']['src'] : get_theme_file_uri() . "/images/benefits-default1.png" ?>" alt="" loading="lazy" width="176" height="158">
                </div>
                <h3 style="color: <?=$attributes['cardTextColor']?>;"><?=$attributes['card1title']?></h3>
                <p style="color: <?=$attributes['cardTextColor']?>;"><?=$attributes['card1text']?></p>
            </div>

            <div class="card">
                <div class="img-wrapper" style="border: 2px solid <?=$attributes['cardTextColor']?>;">
                <img src="<?=$attributes['card2img']['src'] ? $attributes['card2img']['src'] : get_theme_file_uri() . "/images/benefits-default2.png" ?>" alt="" loading="lazy" width="176" height="158">
                </div>
                <h3 style="color: <?=$attributes['cardTextColor']?>;"><?=$attributes['card2title']?></h3>
                <p style="color: <?=$attributes['cardTextColor']?>;"><?=$attributes['card2text']?></p>
            </div>

            <div class="card">
                <div class="img-wrapper" style="border: 2px solid <?=$attributes['cardTextColor']?>;">
                <img src="<?=$attributes['card3img']['src'] ? $attributes['card3img']['src'] : get_theme_file_uri() . "/images/benefits-default3.png" ?>" alt="" loading="lazy" width="176" height="158">
                </div>
                <h3 style="color: <?=$attributes['cardTextColor']?>;"><?=$attributes['card3title']?></h3>
                <p style="color: <?=$attributes['cardTextColor']?>;"><?=$attributes['card3text']?></p>
            </div>
        </div>
    </div>
</section>