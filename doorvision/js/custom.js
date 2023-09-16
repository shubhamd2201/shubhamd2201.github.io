
var collection_and_family_btn = $('#collection_and_family_btn button');
var size_button = $('#size_button button');
var collection_and_family_type_btn = $('.family .raised_type');
var panel_type_btn = $('.long_short_type .panel_type');
var model_number = $('#model_number .model_number_col');

var door_size = null;
var collection_and_family_value = null;
var collection_and_family_type = null;
var panel_type_value = null;
var model_number_value = null;
var window_quantity = null;
var panel_color = null;
var glass_type = null;
var window_type = null;
var window_panel_type = null;


let image_div = document.querySelector('.image_div_inr');

var path_of_img = null;


size_button.click(function(){
    size_button.removeClass('selected');
    $(this).addClass('selected');
     door_size = $(this).attr('data-tab');
     $('#width_for_quatation').text(null); 
    $('#width_for_quatation').text("8ft, 0 inch");
    $('#height_for_quatation').text(null); 
    $('#height_for_quatation').text("7ft, 0 inch");


});
$('#width_ft').on('input', function(){
    width_size_button = $(this).val();
});

collection_and_family_btn.click(function(){
    var this_tab = $(this).attr('data-tab');
    $('.time_less_data').hide();
    $('#'+this_tab+".time_less_data").show();

    collection_and_family_btn.removeClass('selected');
    $(this).addClass('selected');
    collection_and_family_value = $(this).attr('data-tab'); 
    
    $('.model_num_row').hide();
    $('.long_short_type').hide();

    
});

collection_and_family_type_btn.click(function(){
    collection_and_family_type_btn.removeClass('selected');
    $(this).addClass('selected');
    $('.model_num_row').hide();
    $('.long_short_type').hide();
    collection_and_family_type = $(this).attr('data-tab'); 

});
$('.raised_type').click(function(){
    $('.raised_type').removeClass('selected');
    $('.model_num_row').hide();
    $('.long_short_type').hide();
    $('.long_short_type').hide();
    $(this).addClass('selected');
    $(this).attr('data-tab');
    $('#'+$(this).attr('data-tab')).show();
});



panel_type_btn.click(function(){
    panel_type_btn.removeClass('selected');
    $(this).addClass('selected');
    panel_type_value = $(this).attr('data-tab'); 

    $(".window_type ul").hide();
    $('.model_num_row').hide();
    $('.window_type ul#'+panel_type_value).show();

    $('.model_num_row#'+$(this).attr('model-tab')).show();
    

    window_panel_type = $(this).attr('window');


});

model_number.click(function(){
    model_number.removeClass('selected');
    $(this).addClass('selected');
    model_number_value = $(this).attr('data-tab'); 
    $('#model_number_img img').attr('src',"./images/"+model_number_value+'.png');
    $('#model_number_img').show();
});

$('#select_color ul li').click(function(){
    $('#select_color ul li').removeClass('selected');
    $(this).addClass('selected');
    panel_color = $(this).attr('dapplyColorOverlaata-color');
    $('#grid_submit').show();


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


    $('.image_grid_parent.append_grid ul li.i_am_selected').find('span').css('background' , 'url(./images/glass/'+glass_type+'.jpg)');
});

$('#window_type ul li').click(function(){
    $("#window_type ul li").removeClass('selected');
    $(this).addClass('selected');
    window_type = $(this).attr('data-window');

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


// select grid 
var quantity_of_window = null;
function grid_append(grid_length){

    if(grid_length != null){
        document.querySelector('.window_quantity h4').innerText = "0"
        document.querySelectorAll('.append_grid ul').forEach(e=>{
            e.innerHTML = "";
            
            // console.log(grid_length);
        });
        document.querySelectorAll('.append_grid ul').forEach(e=>{
            for(let i = 0; i < grid_length; i++){
            e.insertAdjacentHTML('beforeend' , '<li></li>');
            }
        });

        document.querySelector('.image_grid_parent.append_grid ul').className = '';
        document.querySelector('.image_grid_parent.append_grid ul').classList.add(panel_type_value+'-'+door_size);

        document.querySelector('.select_boxes.append_grid ul').className = "";
        document.querySelector('.select_boxes.append_grid ul').classList.add(panel_type_value+'-'+door_size);

    }
    
        document.querySelectorAll('.select_boxes ul li').forEach(e=>{
            e.addEventListener('click' , function(){
                this.classList.toggle('selected');  
                quantity_of_window = $(this).siblings('li.selected').length + 1;
                $('.window_quantity h4').text(quantity_of_window);
            });
        });

    }





    document.querySelector('#grid_submit_btn button').addEventListener('click', function(){
        let index_num_arr = [];
        var list = document.querySelector('.select_boxes ul');
        list.querySelectorAll('li.selected').forEach(a =>{
            var this_index = Array.from(list.children).indexOf(a);
            index_num_arr.push(this_index);
        });
       
    
        document.querySelectorAll('.image_grid_parent.append_grid ul li').forEach(e=>{
            e.classList.remove('i_am_selected');
            e.innerHTML = "";
            e.style.background = '';
        });
        
        
        
        for(let i = 0; i < index_num_arr.length; i++){
            document.querySelectorAll('.image_grid_parent.append_grid ul li')[index_num_arr[i]].insertAdjacentHTML('beforeend' , `<img class='window_frame'/><canvas class="myCanvas"></canvas><span></span`);
            document.querySelectorAll('.image_grid_parent.append_grid ul li')[index_num_arr[i]].classList.add('i_am_selected');

            document.querySelectorAll('.image_grid_parent.append_grid ul li')[index_num_arr[i]].querySelector('img').src = `images/${window_type}.png`;

            $('.image_grid_parent.append_grid ul li.i_am_selected').find('span').css('background' , 'url(./images/glass/'+glass_type+'.jpg)');
        }
        console.log(`${window_type}`)

        applyColorOverlay_multiple(this_color);

        setTimeout(function(){
        applyColorOverlay_multiple(this_color);

        },100);
    });
    
    $('.click_function ul li').click(function(){
        $(this).parent().find('li.selected').removeClass('selected');
        $(this).addClass('selected');
    });

