

// page accordian 
$('.accordian_heading').click(function(){
    $(this).siblings('.accordian_data').slideToggle(500);
    $(this).toggleClass('closed');
});




var this_color = null;
document.querySelectorAll("#select_color ul li").forEach(e=>{
    e.querySelector('span').style.backgroundColor = e.getAttribute('data-color');

    e.addEventListener('click',function(){
        this_color = this.getAttribute('data-color')
        applyColorOverlay(this_color);

        if($(".image_grid_parent.append_grid ul li img").length > 0){
        applyColorOverlay_multiple(this_color);

        }

    });

    $('#grid_submit').show();
});


$('.window_glass_tabbing ul li').click(function(){
    let this_tab = $(this).attr('data-tab');
    $('.window_glass_tabbing ul li').removeClass('selected');
    $(this).addClass('selected');
    $('#window_glass ul').hide();
    $('#window_glass #'+this_tab).show();
})

$("#window_glass ul li").click(function(){
    $("#window_glass ul li").removeClass('selected');
    $(this).addClass('selected');
    glass_type = $(this).attr('data-glass');

    // $('#window_glass_type_for_quatation').text(null);
    $('#window_glass_type_for_quatation').text(", "+$('.window_glass_tabbing ul li.selected').text() +" "+ $(this).text());


    $('.image_grid_parent.append_grid ul li.i_am_selected').find('span').css('background' , 'url(./images/glass/'+glass_type+'.jpg)');
});

$('#window_type ul li').click(function(){
    $("#window_type ul li").removeClass('selected');
    $(this).addClass('selected');
    window_type = $(this).attr('data-window');

    // $('#window_type_for_quatation').text(null);
    $('#window_type_for_quatation').text($(this).text());


    if($(".image_grid_parent.append_grid ul li img").length > 0){
        applyColorOverlay_multiple(this_color);
        // grid_append(window_quantity);
        }
        
    

});



$('#raised_submit button').click(function(){
    image_append();
    $('#downloadButton').show();
});


// image append 
function image_append(){
    {

        if(door_size != null && collection_and_family_value != null && collection_and_family_type != null && panel_type_value != null){
    
            path_of_img = door_size+"-"+collection_and_family_value+"-"+collection_and_family_type+"-"+panel_type_value;
            
    
            document.querySelector('.your_door_design ').style.display = "none";
            document.querySelector('#final_door_image').src = "./images/door_images/"+path_of_img+".png";
    
            console.log(path_of_img);
            // console.log(`./images/"+"/door_images/"+path_of_img+".png"`)
    
            let window_q = $('#size_button').find('.selected').attr('window');

        
            if(door_size == '10x8' && panel_type_value == 'long_panel'){
                window_q = 10;
            }
            window_quantity = window_q * window_panel_type;
    
            grid_append(window_quantity);
    
           $('#downloadButton').show();
            
        }
        else{
            alert('please select all option');
        }
    }
}



    $('.click_function ul li').click(function(){
        $(this).parent().find('li.selected').removeClass('selected');
        $(this).addClass('selected');
    });

    $(".for_spring_quatation ul li").click(function(){

        $("#Spring_for_quatation").text($(this).text());
        $('#cyclage_for_quatation').text($('.Cyclage option:first').text());
    });

    $('.seals_quataion ul li').click(function(){
        $('#seal_type_for_quatation').text($(this).text());

    });

    $('.lock_bar ul li').click(function(){
        $('#lock_for_quatation').text($(this).text());
    });

    $('.jamb_mount ul li').click(function(){
        $('#jamb_mount_for_quatation').text($(this).text());
    });

    $('.jamb_material ul li').click(function(){
        $('#jamb_material_for_quatation').text($(this).text());
    });



    $(".track_row .track_sibilings ul li").click(function(){
        $(".track_row .track_sibilings ul li").not($(this).parent().parent().siblings().find('ul li')).removeClass('selected');
        
        $(this).addClass('selected');
       
        $('#track_for_quatation').text($('.track_row').find('.selected').text());

    });

    $('.strut_type ul li').click(function(){
        $('#strut_for_quatation').text($(this).text());
    });





























  