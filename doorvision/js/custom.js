

// page accordian 
$('.accordian_heading').click(function(){
    $(this).siblings('.accordian_data').slideToggle(500);
    $(this).toggleClass('closed');
});



// function setGlass(){

//     $('.window_img').css('background', "none");
//     $('.window_img').has("img").css('background', 'url('+$("#window_glass ul li.selected").find("img").attr("src")+') center no-repeat');

//     $('#window_glass_type_for_quatation').text("Window Glass:"+$('#window_glass_type ul li.selected').text() + $('#window_glass ul li.selected').text());
    
// }


// var this_color = null;
// document.querySelectorAll("#select_color ul li").forEach(e=>{
//     e.querySelector('span').style.backgroundColor = e.getAttribute('data-color');

//     e.addEventListener('click',function(){
//         this_color = this.getAttribute('data-color')
//         applyColorOverlay(this_color);

//         if($(".image_grid_parent.append_grid ul li img").length > 0){
//         // applyColorOverlay_multiple(this_color);

//         }

//     });

// });



    // $(".for_spring_quatation ul li").click(function(){
    //     $("#Spring_for_quatation").text($(this).text());
    //     $('#cyclage_for_quatation').text($('.Cyclage option:first').text());
    // });

    // $('.seals_quataion ul li').click(function(){
    //     $('#seal_type_for_quatation').text($(this).text());

    // });

    // $('.lock_bar ul li').click(function(){
    //     $('#lock_for_quatation').text($(this).text());
    // });

    // $('.strut_type ul li').click(function(){
    //     $('#strut_for_quatation').text($(this).text());
    // });
    










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

    // menu icon click event 
    $('.menuicon').click(function(){
        $(this).toggleClass('showing');
        $('.left_section_col').toggleClass('show');
    });

    $('.left_section_col').click(function(){
        $('.menuicon').removeClass('showed');
        $('.left_section_col').removeClass('show');

    });
    $('.left_section_col .left_section_inr').click(function(e){
        e.stopPropagation();
    })


    // pop up 
    let closeClicked = 0;
    $('.popup_close_btn').click(function(){
        closeClicked = 1;
        popupGone();
    });
    
    function popupGone(){
        $(".succes_n_error").removeClass("show_popup");
        $(".succes_n_error p").empty();
        setTimeout(()=>{
            $('.succes_n_error').hide();
        },300);
    }

    function errorCame(notified_txt){
        $('.succes_n_error').removeClass('success');
        $('.succes_n_error').addClass('error');
        $(".succes_n_error p").text(notified_txt);
        $('.succes_n_error').show();
        setTimeout(()=>{
        $(".succes_n_error").addClass("show_popup");
        },300);
        
        
        // setTimeout(() => {
        //     if(closeClicked == 0){
        //         popupGone();
        //         closeClicked = 0;
        //     }
        // }, 5000);
        
    }

    function successCame(notified_txt){
        $('.succes_n_error').removeClass('error');
        $('.succes_n_error').addClass('success');
        $(".succes_n_error p").text(notified_txt);
        $('.succes_n_error').show();
        setTimeout(()=>{
        $(".succes_n_error").addClass("show_popup");
        },300);
        // setTimeout(() => {
        //     if(closeClicked == 0){
        //         popupGone();
        //         closeClicked = 0;
        //     }
        // }, 5000);
    }

$('body').on('keydown',function esckey(evt) {
    if (evt.keyCode == 27) {
        popupGone();
    }
 });



//  vendor search event 

$("#cutomer_search_inputbox").on("keyup", vendorSearch);

function vendorSearch() {
    var value = $("#cutomer_search_inputbox").val().toLowerCase();
    $("#vendor_details").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  }

  $('.select_customer_box').click(function(){
    $('.select_customer').slideToggle();
  })














  