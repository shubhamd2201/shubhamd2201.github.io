

// page accordian 
$('.accordian_heading').click(function(){
    $(this).siblings('.accordian_data').slideToggle(500);
    $(this).toggleClass('closed');
});

function setWindow(){
    
    let window_typeand_color = './images/window/'+$("#select_color ul li.selected p").text()+'_'+$('#window_type ul li.selected').attr('data-window')+'.png';
    

    $(".window_img").find("img").attr('src',window_typeand_color);

    $('#window_type_for_quatation').text(", Window Insert: "+$('#window_type ul li.selected').text());
    
}

function setGlass(){

    $('.window_img').css('background', "none");
    $('.window_img').has("img").css('background', 'url('+$("#window_glass ul li.selected").find("img").attr("src")+') center no-repeat');

    $('#window_glass_type_for_quatation').text("Window Glass:"+$('#window_glass_type ul li.selected').text() + $('#window_glass ul li.selected').text());
    
}


var this_color = null;
document.querySelectorAll("#select_color ul li").forEach(e=>{
    e.querySelector('span').style.backgroundColor = e.getAttribute('data-color');

    e.addEventListener('click',function(){
        this_color = this.getAttribute('data-color')
        applyColorOverlay(this_color);

        if($(".image_grid_parent.append_grid ul li img").length > 0){
        // applyColorOverlay_multiple(this_color);

        setWindow();
        setGlass()
        }

    });

});


$('.window_glass_tabbing ul li').click(function(){
    let this_tab = $(this).attr('data-tab');
    $('.window_glass_tabbing ul li').removeClass('selected');
    $(this).addClass('selected');
    $('#window_glass ul').hide();
    $('#window_glass #'+this_tab).show();
})






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






$("#window_type ul li").click(function(){
    $("#window_type ul li").removeClass("selected");
    $(this).addClass("selected");

    setWindow();
    setGlass()
})



// hex to rgba 
function hexToRgba(hex, opacity) {
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    opacity = Math.min(1, Math.max(0, opacity));
    const rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    return rgba;
    }

    function adjustColor(hexColor) {
        hexColor = hexColor.replace(/^#/, '');
    
        const r = parseInt(hexColor.slice(0, 2), 16);
        const g = parseInt(hexColor.slice(2, 4), 16);
        const b = parseInt(hexColor.slice(4, 6), 16);
    
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
        const isDark = brightness < 128;
    
        const adjustment = isDark ? 40 : -40;
    
        const newR = Math.max(0, Math.min(255, r + adjustment));
        const newG = Math.max(0, Math.min(255, g + adjustment));
        const newB = Math.max(0, Math.min(255, b + adjustment));
    
        const newHexColor = `#${(1 << 24 | newR << 16 | newG << 8 | newB).toString(16).slice(1)}`;
    
        return newHexColor;
    }



    // swipe event in jquery 
    $('body').on('swiperight',function(){
        
        $('.image_append_section').addClass('mobileswipped');
        $('body').css('overflow',"hidden");
    });
        
    $('body').on('swipeleft',function(){
        $('.image_append_section').removeClass('mobileswipped');
        $('body').css('overflow',"inherit");

    });


















  