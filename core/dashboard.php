<?php
function display_mkt_dashboard()
{
    wp_add_dashboard_widget("mkt_news", "Mkt Virtual", "display_mkt_news");
}


function display_mkt_news()
{
    echo "Conteúdo";
}

add_action("wp_dashboard_setup", "display_mkt_dashboard");