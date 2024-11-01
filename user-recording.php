<?php
/**
 * Plugin Name: User Recording For WordPress
 * Plugin URI: http://sessionrecording.rednao.com/getit
 * Description: Place diferent form of donations on your blog...
 * Author: RedNao
 * Author URI: http://rednao.com
 * Version: 1.0.5
 * Text Domain: Smart Session Recording
 * Domain Path: /languages/
 * Network: true
 * License: GPLv3
 * License URI: http://www.gnu.org/licenses/gpl-3.0
 * Slug: smartsessionrecording
 */

/**
 *	Copyright (C) 2012-2013 RedNao (email: contactus@rednao.com)
 *
 *	This program is free software; you can redistribute it and/or
 *	modify it under the terms of the GNU General Public License
 *	as published by the Free Software Foundation; either version 2
 *	of the License, or (at your option) any later version.
 *
 *	This program is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *	GNU General Public License for more details.
 *
 *	You should have received a copy of the GNU General Public License
 *	along with this program; if not, write to the Free Software
 *	Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Thanks to:
 * Jakub Stacho (http://www.iconfinder.com/iconsets/checkout-icons#readme)
 * Eggib (http://openclipart.org/detail/174878/)
 * Aha-Soft (http://www.iconfinder.com/iconsets/24x24-free-pixel-icons#readme)
 * Kevin Liew (http://www.queness.com/post/106/jquery-tabbed-interfacetabbed-structure-menu-tutorial)
 * Marcis Gasuns (http://led24.de/iconset/)
 */

require_once('smart-session-recording-config.php');
require_once('smart-session-recording-ajax.php');
register_deactivation_hook(__FILE__, 'urfwp_deactivate');
add_action('wp_enqueue_scripts', 'smart_session_recorder_include',0);
add_action('admin_menu','rednao_smart_session_recording_create_menu');

add_action('wp_ajax_nopriv_rednao_ssr_submit_recording','rednao_ssr_submit_recording');
add_action('wp_ajax_rednao_ssr_submit_recording','rednao_ssr_submit_recording');
add_action('wp_ajax_rednao_ssr_get_recordings','rednao_ssr_get_recordings');
add_action('wp_ajax_rednao_ssr_delete_recordings','rednao_ssr_delete_recordings');
add_action('wp_ajax_rednao_ssr_update_schedule','rednao_ssr_update_schedule');
add_filter( 'cron_schedules', 'smart_session_recorder_add_interval');
add_action('usfwp_schedule_delete','usfwp_schedule_delete_action');


function smart_session_recorder_include(){
    /** here you can apply whatever logic you want to determine which pages
     *  your script gets included on, like wrap this in is_singular()
     */
    $recordPage=true;
    $recordPage=apply_filters('user_recording_for_wordpress_record_page',$recordPage);
    if(!$recordPage)
        return;
    wp_enqueue_script('jquery');
    wp_enqueue_script('smart-session-recorder', plugin_dir_url(__FILE__).'js/Bundle/recorder_bundle.js', array('jquery'), '', null, false);

    $params = array('Params',
        'url' => SMART_SESSION_RECORDING_URL,
        'uniqid'=>uniqid('',true),
        'ajaxurl'=>admin_url('admin-ajax.php'),
        'siteurl'=>get_site_url()
    );

    wp_localize_script('smart-session-recorder','smartformsrecordingparams',$params);
}

function urfwp_deactivate(){
    if(wp_next_scheduled ( 'usfwp_schedule_delete'))
        wp_clear_scheduled_hook('usfwp_schedule_delete');
}

function smart_session_recorder_add_interval(){
    $schedules['weekly'] = array(
        'interval' => 604800,
        'display' => __('Once Weekly')
    );

    $currentDayOfMonth=date('t');
    $schedules['urfwpmonthly'] = array(
        'interval' => $currentDayOfMonth*60*60*24,
        'display' => __('Once a month')
    );

    return $schedules;
}



add_filter('query_vars','smart_session_recording_add_trigger');
function smart_session_recording_add_trigger($vars) {
    $vars[] = 'smart_session_recording_id';
    return $vars;
}


add_action('template_redirect', 'smart_session_recording_check_if_player');
function smart_session_recording_check_if_player()
{
    $val=get_query_var('smart_session_recording_id')?get_query_var('smart_session_recording_id'):"";
    if($val==""&&isset($_GET["smart_session_recording_id"]))
        $val=$_GET["smart_session_recording_id"];
    if($val!=''&&$val!=null) {
        if($val!=-1)
            require_once SMART_SESSION_RECORDING_DIR.'/screens/child_player.php';
        else
            require_once SMART_SESSION_RECORDING_DIR.'/smart-session-recording-beacon-saver.php';
        exit;
    }
}


add_action('admin_init','rednao_smart_session_recording_was_activated');
register_activation_hook(__FILE__,'rednao_smart_session_recording_was_activated');




function rednao_smart_session_recording_create_menu(){

    add_menu_page('User Recording For WordPress','User Recording For WordPress','manage_options',"wp_session_recording_menu",'rednao_session_recording_player',plugin_dir_url(__FILE__).'img/icon.png');
    add_submenu_page("wp_session_recording_menu",'Support','Support','manage_options',__FILE__.'support', 'rednao_srfwp_support');
    add_submenu_page("wp_session_recording_menu",'Settings','Settings','manage_options',__FILE__.'settings', 'rednao_srfwp_settings');
}

function rednao_session_recording_player()
{
    include(SMART_SESSION_RECORDING_DIR.'/screens/player.php');
}

function rednao_srfwp_support(){
    include(SMART_SESSION_RECORDING_DIR.'/screens/support.php');
}

function rednao_srfwp_settings(){
    include(SMART_SESSION_RECORDING_DIR.'/screens/settings.php');
}


function rednao_smart_session_recording_was_activated()
{
    $dbversion=get_option("SMART_SESSION_RECORDING_LATEST_DB_VERSION");
    if($dbversion<SMART_SESSION_RECORDING_LATEST_DB_VERSION )
    {
        require_once(ABSPATH.'wp-admin/includes/upgrade.php');

        $sql="CREATE TABLE ".SMART_SESSION_RECORDING_HEADER." (
        recording_id int AUTO_INCREMENT,
        uniq_id char(23) NOT NULL,
        session_id char(36) NOT NULL,
        userid varchar(36) NOT NULL,
        status char(1),
        start_time BIGINT NOT NULL,
        duration BIGINT,
        url VARCHAR(255),
        initial_properties MEDIUMTEXT NOT NULL,
        html MEDIUMTEXT NOT NULL,
        KEY smart_session_recording_start_time(start_time),
        KEY smart_session_recording_header(uniq_id),      
        PRIMARY KEY  (recording_id)        
        ) COLLATE utf8_general_ci;";
        dbDelta($sql);

        $sql="CREATE TABLE ".SMART_SESSION_RECORDING_DETAIL." (
        recording_detail_id int AUTO_INCREMENT,
        header_uniq_id char(23) NOT NULL,
        last_time BIGINT NOT NULL,
        actions MEDIUMTEXT NOT NULL,      
        KEY smart_session_recording_detail(header_uniq_id),
        PRIMARY KEY  (recording_detail_id)        
        ) COLLATE utf8_general_ci;";
        dbDelta($sql);

        update_option("SMART_FORMS_LATEST_DB_VERSION",SMART_FORMS_LATEST_DB_VERSION);
    }
}
