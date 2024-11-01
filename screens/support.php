<?php
wp_enqueue_script('jquery');
wp_enqueue_script('urfwp-support',SMART_SESSION_RECORDING_URL.'js/Bundle/support_bundle.js');
wp_enqueue_style('urfwp-bootstrap',SMART_SESSION_RECORDING_URL.'js/lib/bootstrap/css/bootstrap.css');
wp_enqueue_style('urfwp-bootstrap-theme',SMART_SESSION_RECORDING_URL.'js/lib/bootstrap/css/bootstrap-theme.css');
?>

<div style="margin-top: 50px; visibility: visible; position: relative; left: 0px;" class="bootstrap-wrapper"><h2
            style="margin-left:2px;"><a class="contactFormClick" style="cursor: pointer;">Do you have any question, issue or suggestion? Please let me know!</a></h2>
    <div id="redNaoContactForm" style="margin: 0px 20px 0px 5px; overflow: hidden; visibility: visible; height: 266px;"
         class="formelements bootstrap-wrapper exptop">
        <div class="rednao-control-group form-group row rednaotextarea col-sm-12 sfRequired" id="rnField5">
            <div class="rednao_label_container col-sm-3"><label class="rednao_control_label" for="textarea">Message</label></div>
            <div class="redNaoControls col-sm-9"><textarea placeholder="How can i help?" style=""
                                                           name="textarea"
                                                           class="form-control redNaoTextAreaInput "></textarea></div>
        </div>
        <div class="rednao-control-group form-group row rednaoemail col-sm-12 sfRequired" id="rnField7">
            <div class="rednao_label_container col-sm-3"><label class="rednao_control_label ">Where can i reach
                    you?</label></div>
            <div class="redNaoControls col-sm-9"><input name="Lastly,_where can we reach you?" type="text"
                                                        placeholder="Your@Email.com"
                                                        class="form-control redNaoInputText redNaoEmail"></div>
        </div>
        <div class="rednao-control-group form-group row rednaosubmissionbutton col-sm-12" id="rnField3">
            <div class="rednao_label_container col-sm-3"></div>
            <div class="redNaoControls col-sm-9">
                <button class="redNaoSubmitButton btn btn-normal ladda-button"><span
                            class="glyphicon glyphicon-send "></span><span class="ladda-label">Send</span></button>
            </div>
        </div>
    </div>
</div>

