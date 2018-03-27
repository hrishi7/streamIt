<?php 
/* 
* -------------------------------------------------------------------------------------
* @author: Doothemes
* @author URI: https://doothemes.com/
* @aopyright: (c) 2017 Doothemes. All rights reserved
* -------------------------------------------------------------------------------------
*
* @since 2.1.3
*
*/

$videospider_api_key = "Gbk0l1UNDHK7Uz9S"; // paste your api key from https://videospider.in exaple: $videospider_api_key = "gAfP9GDSFdsf45sdfDSF";
$imdb_id = dt_get_meta('ids'); // get imdb id for videospider

$dt_player	= get_post_meta($post->ID, 'repeatable_fields', true); 
$reports	= get_post_meta($post->ID, 'numreport', true);
$views		= dt_get_meta('dt_views_count');
$light		= get_option('dt_player_luces','true');
$report		= get_option('dt_player_report','true');
$ads		= get_option('dt_player_ads','not');
$qual		= get_option('dt_player_quality','true');
$viewsc		= get_option('dt_player_views','true');
$clic		= get_option('dt_player_ads_hide_clic','true');
$time		= get_option('dt_player_ads_time','20');
$ads_300	= get_option('dt_player_ads_300');
$page	    = get_option('dt_jwplayer_page');
$gdrivepage = get_option('dt_jwplayer_page_gdrive');
// Player
?>

<div id="playex" class="player_sist <?php if(get_cookie('dt_player_width') == 'full') { echo 'fullplayer'; } ?>">
	<?php get_template_part('inc/parts/single/report-video'); ?>
	
	<div class="playex">
		<?php  if ($ads =='true') : ?>
		<div id="playerads" class="ads_player">
			<div class="ads_box">
				<div class="ads">
					<?php if($ads_300) : echo '<div class="code">'. stripslashes($ads_300). '</div>'; endif; ?>
					<?php if ($clic =='true'): ?><span class="notice"><?php _d('click on ad to close'); ?></span><?php endif; ?>
				</div>
			</div>
		</div>
		<?php endif; ?>
			<div id="option-videospider" class="play-box-iframe fixidtab">
				<iframe class="metaframe rptss" src="https://videospider.in/getvideo?key=<?php echo $videospider_api_key; ?>&video_id=<?php echo $imdb_id; ?>" frameborder="0" scrolling="no" allowfullscreen></iframe>
			</div>
		<?php $numerado = 1; { foreach ( $dt_player as $field ) { ?>
		<?php if($field['select'] == 'iframe') {  ?>
			<div id="option-<?php echo $numerado; ?>" class="play-box-iframe fixidtab">
				<<?php echo 'iframe'; ?> class="metaframe rptss" src="<?php echo $field['url']; ?>" frameborder="0" scrolling="no" allowfullscreen></iframe>
			</div>
		<?php } if($field['select'] == 'mp4') {  ?>
			<div id="option-<?php echo $numerado; ?>" class="play-box-iframe fixidtab">
				<<?php echo 'iframe'; ?> class="metaframe rptss" src="<?php echo  $page .'?source='. base64_encode( $field['url'] ) . '&id='. $post->ID; ?>" frameborder="0" scrolling="no" allowfullscreen></iframe>
			</div>
		<?php } if($field['select'] == 'gdrive') { ?>
			<div id="option-<?php echo $numerado; ?>" class="play-box-iframe fixidtab">
				<<?php echo 'iframe'; ?> class="metaframe rptss" src="<?php echo  $gdrivepage .'?gd='. base64_encode($field['url']) . '&id='. $post->ID; ?>" frameborder="0" scrolling="no" allowfullscreen></iframe>
			</div>
		<?php } if($field['select'] == 'dtshcode') {  ?>
			<div id="option-<?php echo $numerado; ?>" class="play-box-shortcode fixidtab">
				<?php echo do_shortcode($field['url']); ?>
			</div>
		<?php } $numerado++; } } ?> 
	</div>
	<div class="control">
		<nav class="player">
			<ul class="options">
				<li>
					<a class="sources"><i class="icon-menu listsormenu"></i> <b><?php _d('Options'); ?></b></a>
						<ul class="idTabs sourceslist">
							<li>
								<a class="options selected" href="#option-videospider">
									<b class="icon-play_arrow"></b> openload 
									<span class="dt_flag"><img src="<?php echo DT_DIR_URI, '/assets/img/flags/','en','.png'; ?>"></span>	
								</a>
							</li>
						<?php $numerado = 1; { foreach ( $dt_player as $field ) { ?>
							<li><a class="options" href="#option-<?php echo $numerado; ?>">
							<b class="icon-play_arrow"></b> <?php echo $field['name']; ?> 
							<?php if($field['idioma']) { ?><span class="dt_flag"><img src="<?php echo DT_DIR_URI, '/assets/img/flags/',$field['idioma'],'.png'; ?>"></span><?php } ?>
							</a></li>
						<?php $numerado++; } } ?> 
						</ul>
				</li>
			</ul>
		</nav>
		<?php if ($qual =='true') : if($quali = $terms = strip_tags( $terms = get_the_term_list( $post->ID, 'dtquality'))) {  ?>
			<?php if($mostrar = $terms = strip_tags( $terms = get_the_term_list( $post->ID, 'dtquality'))) {  ?><span class="qualityx"><?php echo $mostrar; ?></span><?php } ?>
		<?php } endif; ?>
		<?php if ($viewsc =='true') : if($views) { echo '<span class="views"><strong>'. comvert_number($views) .'</strong> '. __d('Views') .'</span>'; } endif; ?>
		<nav class="controles">
			<ul class="list">
				<?php  if ($ads =='true') : ?><li id="count" class="contadorads"><?php _d('Ad'); ?> <i id="contador"><?php echo $time; ?></i></li><?php endif; ?>
				<?php  if ($light =='true') : ?><li><a class="lightSwitcher" href="javascript:void(0);"><i class="icon-wb_sunny"></i></a></li><?php endif; ?>
				<?php  if ($report =='true') : if($reports=='10') { /* none*/ } else { ?><li><a class="report-video"><i class="icon-notification"></i> <span><?php _d('report'); ?></span></a></li><?php } endif; ?>
				<li><a class="wide <?php if(get_cookie('dt_player_width') == 'full') { echo 'recox'; } else { echo 'reco'; } ?>">
					<i class="icons-enlarge2 <?php if(get_cookie('dt_player_width') == 'full') { echo 'icons-shrink2'; } ?>"></i>
				</a></li>
			</ul>
		</nav>
	</div>
</div>
<script type='text/javascript'>
	jQuery(document).ready(function($){
	$("#oscuridad").css("height", $(document).height()).hide();
	$(".lightSwitcher").click(function(){
	$("#oscuridad").toggle();
	if ($("#oscuridad").is(":hidden"))
	$(this).html("<i class='icon-wb_sunny'></i>").removeClass("turnedOff");
		else
	$(this).html("<i class='icon-wb_sunny'></i>").addClass("turnedOff");
		});
<?php  if ($ads =='true') : ?>
	var segundos = <?php echo $time; ?>; 
	function ads_time(){  
		var t = setTimeout( ads_time, 1000); 
		document.getElementById('contador').innerHTML = '' +segundos--+'';  
		if (segundos==0){
			$('#playerads').fadeOut('slow');
			$('#count').fadeOut('slow');
			clearInterval(setTimeout);
		}  
	}
	ads_time();
<?php endif; ?>
<?php if ($clic =='true'): ?>
		$(".code").click(function() {
		  $("#playerads").fadeOut("slow");
		  $("#count").fadeOut("slow");
		});
		$(".notice").click(function() {
		  $("#playerads").fadeOut("slow");
		  $("#count").fadeOut("slow");
		});
<?php endif; ?>
	$(".options").click(function() {
	  $('.rptss').attr('src', function ( i, val ) { return val; });
	});
	});
</script>