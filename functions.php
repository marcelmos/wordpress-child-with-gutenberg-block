<?php

/**
 * Init style sheets
 */
function parent_theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/assets/css/style.css' );
}
add_action( 'wp_enqueue_scripts', 'parent_theme_enqueue_styles');

/**
 * Custom gutenberg block
 */
require get_stylesheet_directory() . '/inc/gutenberg.php';