<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php wp_head(); ?>
</head>

<body <?php body_class('text-base'); ?>>
<?php wp_body_open(); ?>
<header class="navigation">
    <img src="<?php echo get_stylesheet_directory_uri().'/assets/img/logo.png'; ?>" alt="logo">
</header>
<div id="page" class="site">
<?php
//  get_template_part( 'template-parts/header/site-header' );
 ?>

	<div id="content" class="site-content">
		<div id="primary" class="content-area">
			<main id="main" class="site-main">