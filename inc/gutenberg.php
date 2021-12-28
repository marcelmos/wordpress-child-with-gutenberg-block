<?php

function mos_gutenberg_blocks() {

    wp_register_script( 
        'custom-slider-js',
        get_stylesheet_directory_uri() . '/build/index.js',
        array(
            'wp-blocks',
            'wp-editor',
            'wp-components',
            'wp-element'
        )
    );

    register_block_type( 'mos/custom-slider', array(
        'editor_script' => 'custom-slider-js'
    ) );
}
add_action( 'init', 'mos_gutenberg_blocks' );