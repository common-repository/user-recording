import 'jQuery';
export class Support{
    constructor(){
        jQuery(()=>{
            jQuery('.redNaoSubmitButton').click(()=>{
                var description=jQuery('.redNaoTextAreaInput').val();
                var email=jQuery('.redNaoInputText').val();


                if(email=="")
                {
                    alert("Email is required, please don't forget to fill it.");
                    return;
                }

                if(description=="") {
                    alert('The message is required, please fill it.');
                    return;
                }

                jQuery('.redNaoSubmitButton').html('<span class="glyphicon glyphicon-send "></span><span class="ladda-label">Sending form</span>').attr('disabled','disabled');
                jQuery.post('https://smartforms.rednao.com/userrecordingsupport.php',{'description':description,'email':email},(res)=>{
                    if(res=='1')
                    {
                        alert('Request submitted successfully! i will contact you soon');
                        jQuery('.redNaoSubmitButton').removeAttr('disabled');
                    }else{
                        alert('Sorry an error ocurred, please try again later');
                        jQuery('.redNaoSubmitButton').removeAttr('disabled');
                    }
                });
            })
        })
    }
}

new Support();