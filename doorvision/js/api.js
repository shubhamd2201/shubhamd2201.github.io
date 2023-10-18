var path_of_site = "http://doorportal-001-site1.etempurl.com/v1/";
var page_loader = $('#loader');
let token = "";

let dataForPostObj = {
    doorHeight: null,
    doorWidth: null,
    doorTypeId: 1,
    doorCompanyId:11,
}

let modelindex = null;

 // door size function



var doorCollectionId = 1;
let selected_width_ft = null;
let selected_height_ft = null;
let selected_width_in = 0;
let selected_height_in = 0;


let clickedThis = null;
let numberOfColumn = null;
let SubSubCollectionId = null;

let width_arr;
let height_arr;
let width_arr_inch;
let height_arr_inch;
let size_button_div = document.querySelector('#size_button');

function appendSizeButton(){
    if(dataForPostObj.doorTypeId == 1){
        width_arr = [8,9,9,10,12,14,16,16,18,20];
        height_arr = [7,7,8,8,8,8,7,8,7,12];
   
       width_arr_inch= [0,0,0,0,0,0,0,0,0,0];
       height_arr_inch = [0,0,0,0,0,0,0,0,0,0];
   
       size_button_div.innerHTML = '';
       width_arr.forEach((e, index)=>{
       size_button_div.insertAdjacentHTML('beforeend', `<button tab-index="${index}">${e}'x${height_arr[index]}'</button>`);
   });
   
   }
   else if(dataForPostObj.doorTypeId == 2){
       width_arr = [9,10,10,12,12,12,14];
       height_arr =[10,10,10,12,12,14,14];
       width_arr_inch = [2,0,2,0,2,2,2];
       height_arr_inch =[0,0,0,0,0,0,0];
   
       size_button_div.innerHTML = '';
       width_arr.forEach((e, index)=>{
       size_button_div.insertAdjacentHTML('beforeend', `<button tab-index="${index}">${e}'${width_arr_inch[index]}"x${height_arr[index]}'</button>`);
   });
   
   }
   sizeButtonClickEvent();
}

appendSizeButton();

function sizeButtonClickEvent(){
    $('#size_button button').click(function(){

        $('.assosiated_from_model').hide();
    
        $('#size_button button').removeClass('selected');
        $(this).addClass('selected');
        
        var this_index = $(this).attr('tab-index');
        selected_width_ft = width_arr[this_index];
        selected_width_in = width_arr_inch[this_index]
    
        selected_height_ft = height_arr[this_index];
        selected_height_in = height_arr_inch[this_index];
    
        $('#width_for_quatation_ft').text(selected_width_ft+"'");
        $('#height_for_quatation_ft').text(selected_height_ft+"'");
        $("#width_for_quatation_inch").text(selected_width_in+'"');
        $("#height_for_quatation_inch").text(selected_height_in+'"');
    
    
        $('#custom_width_ft').val(selected_width_ft);
        $('#custom_width_inch').val(selected_width_in);
        $('#custom_height_ft').val(selected_height_ft);
        $('#custom_height_inch').val(selected_height_in);
    
        dataForPostObj.doorWidth = width_arr[this_index]+"."+selected_width_in;
        dataForPostObj.doorHeight = height_arr[this_index]+"."+selected_height_in;
    
    
        if ($("#customSize input").val() == '') {
            $("#customSize input").addClass('error-border');
        } else {
            $("#customSize input").removeClass('error-border');
        }
    
        clearStaticAPIData();
        if( modelindex != null){
           
            clicked_color_from_size = $('#select_color ul li.selected').attr('data-color');
            toAppendModel(doorPanelId);
        }
    
    });
    
}

$('.custom_size_input_div input[type="text"]').on('input', function(){

    $('.assosiated_from_model').hide();

    if(isNaN($(this).val())){
        let this_val = $(this).val().split('');
        let this_final_val = this_val.pop();
        $(this).val(this_val.join());
    }
    else{
    ($(this).attr('id') == "custom_width_ft")? selected_width_ft = $(this).val(): '';
    ($(this).attr('id') == "custom_width_inch")? selected_width_in = $(this).val(): '';
    ($(this).attr('id') == "custom_height_ft")? selected_height_ft = $(this).val(): '';
    ($(this).attr('id') == "custom_height_inch")? selected_height_in = $(this).val(): '';
    
    (selected_width_ft == null)? selected_width_ft = 0:'';
    (selected_height_ft == null)? selected_height_ft = 0:'';

    }

    inchTOft();

    $('#size_button button').removeClass('selected');
    $('#width_for_quatation_ft').text(selected_width_ft+"'");
    $('#height_for_quatation_ft').text(selected_height_ft+"'");
    $("#width_for_quatation_inch").text(selected_width_in+'"');
    $("#height_for_quatation_inch").text(selected_height_in+'"');

    if(selected_width_ft != null && selected_width_in != null && selected_height_ft != null && selected_height_in != null){
        dataForPostObj.doorWidth = selected_width_ft+"."+selected_width_in;
        dataForPostObj.doorHeight = selected_height_ft+"."+selected_height_in;
        
    }


    if ($(this).val() === '') {
        $(this).addClass('error-border');
    } else {
        $(this).removeClass('error-border');
    }

    clearStaticAPIData();

    // if( modelindex != null){

    //     // if($('#select_color ul li.selected').attr('data-color').length)
        
    //     clicked_color_from_size = $('#select_color ul li.selected').attr('data-color');

    //     toAppendModel(doorPanelId);
    // }


});

$('#customSize input[type="text"]').on('blur', function (){
    if ($(this).val() === '') {
        $(this).addClass('error-border');
    } else {
        $(this).removeClass('error-border');
    }
});

jQuery(document).on("click", ".plus-btn", {}, function(t) {
    return inputQty = jQuery(this).parent().find(".qty"), inputQty.val(function(t, e) {
        return ++e
    }), inputQty.change(), !1

});
jQuery(document).on("click", ".minus-btn", {}, function(t) {
    if (inputQty = jQuery(this).parent().find(".qty"), inputQty.val() > 0) return inputQty.val(function(t, e) {
        return e > 0 ? --e : 1
    }), inputQty.change(), !1

});

function inchTOft(){
    if($('#custom_width_inch').val() == 12){
        $("#custom_width_ft").val(Number($("#custom_width_ft").val()) + 1);
        $('#custom_width_inch').val(0);

        selected_width_ft = $('#custom_width_ft').val();
    }

    if($('#custom_height_inch').val() == 12){
        $("#custom_height_ft").val(Number($("#custom_height_ft").val()) + 1);
        $('#custom_height_inch').val(0);

        selected_height_ft = $('#custom_height_ft').val();
    }
}

$('#customSize button').on('click', function(){

    let this_input_text = $(this).parent().find('.qty');
    

    setTimeout(()=>{

    inchTOft();
        
    (this_input_text.attr('id') == "custom_width_ft")? selected_width_ft = this_input_text.val(): '';
    (this_input_text.attr('id') == "custom_width_inch")? selected_width_in = this_input_text.val(): '';
    (this_input_text.attr('id') == "custom_height_ft")? selected_height_ft = this_input_text.val(): '';
    (this_input_text.attr('id') == "custom_height_inch")? selected_height_in = this_input_text.val(): '';

    (selected_width_ft == null)? selected_width_ft = 0:'';
    (selected_height_ft == null)? selected_height_ft = 0:'';


    $('#size_button button').removeClass('selected');
    $('#width_for_quatation_ft').text(selected_width_ft+"'");
    $('#height_for_quatation_ft').text(selected_height_ft+"'");
    $("#width_for_quatation_inch").text(selected_width_in+'"');
    $("#height_for_quatation_inch").text(selected_height_in+'"');

    if(selected_width_ft != null && selected_width_in != null && selected_height_ft != null && selected_height_in != null){
        dataForPostObj.doorWidth = selected_width_ft+"."+selected_width_in;
        dataForPostObj.doorHeight = selected_height_ft+"."+selected_height_in;
        
    }


    },100);
   
})


// door size function end 

        var settings = {
            "url": path_of_site+"Account/Authenticate",
            "method": "POST",
            "crossDomain": true,
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({ "userName": "doormasterportal@gmail.com","password": "Admin@123"}),
          };

        // API Calling 
          $.ajax(settings).done(function (response) {
          
              if (response.errors != null){
                  console.log(response.errors[0]);
                  errorCame(response.errors[0]);
                  page_loader.hide();
              }
              else{
                  token = response.payload.access_token;
                  page_loader.show();
          
                  $.ajax({
                      url: path_of_site+"DoorType/DoorType",
                      type: 'GET',
                      headers: {
                          'Authorization':'Bearer ' + token,
                      },
                      success: function(data) {
                  
                           JSON.stringify(data);
                           $('#type_of_doors').siblings(".error").text('');
                           if(data.payload == null || data.payload == undefined){
                            // $('#type_of_doors').siblings(".error").text('Error: Data Does not exist');
                            errorCame('Error: Data Does not exist');
                           }
                           else{
                           data.payload.forEach(e=>{
                            document.querySelector('#type_of_doors').insertAdjacentHTML('beforeend', `<option doorTypeId = "${e.doorTypeId}" value = "${e.doorTypeId}" doorType="${e.doorTypeName}"> ${e.doorTypeName} </option>`);
                           });

                            $('#type_of_door_quatation').text(data.payload[0].doorTypeName);

                        }
    

                            $('#type_of_doors').on('change',function(){
                                $('.assosiated_from_model').hide();
                                $('#type_of_door_quatation').text($('option:selected', this).attr('doorType'));
                                $('#door_collection_btn').empty();
                                $('#door_collection_family').empty();
                                $('#panel_type').empty();
                                $('#model_number_row').empty();
                                clearDataFromModel();
                                
                                modelindex = null;
                                dataForPostObj.doorWidth = null;
                                dataForPostObj.doorHeight = null;
                                $('#customSize input').val(0)
                                dataForPostObj.doorTypeId = $(this).val();

                                appendSizeButton();

                                forDoorCollection(dataForPostObj.doorTypeId, dataForPostObj.doorCompanyId);
                            });

                      },
                      error: function(xhr, status, error) {
                        //   document.querySelector('.type_of_doors  .select_box').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);
                          errorCame(error);
                          page_loader.hide();
                      }
                  });


                  $.ajax({
                      url: path_of_site+"DoorCompany/DoorCompany",
                      type: 'GET',
                      headers: {
                          'Authorization':'Bearer ' + token,
                      },
                      success: function(data) {
                  
                          JSON.stringify(data);
  
                          $('#door_company').siblings('.error').text('');
  
                          if(data.payload == null || data.payload == undefined){
                          $('#door_company').siblings('.error').text('Error: Data does not exist');
                          }
                          else{
                          data.payload.forEach(e=>{
                          document.querySelector('#door_company').insertAdjacentHTML('beforeend', `<option doorCompanyId = "${e.doorCompanyId}" doorComapanyName="${e.doorCompanyName}" value = "${e.doorCompanyId}" > ${e.doorCompanyName} </option>`);
                          });
                          
                          $('#door_company_quatation').text(data.payload[0].doorCompanyName);
                          
                      }
                      page_loader.hide();  
                          
                          forDoorCollection(dataForPostObj.doorTypeId, dataForPostObj.doorCompanyId);
                         
                          setTimeout(function(){
                             $('#door_collection_btn button').eq(0).addClass('selected');
                            $('#collection_for_quatation').text($('#door_collection_btn button').eq(0).text() +" collection");

                          },1000)

                          appendDoorcollectionfamily(doorCollectionId);
  
                      },
                      error: function(xhr, status, error) {
                        errorCame(error);
                          page_loader.hide(); 
                      }
                  });
    }

});

//=====================================================================================

     // this is for DoorCollection append timeless
           $('#door_company').on('change',function(){
            $('.assosiated_from_model').hide();

            doorCompanyId = $(this).val();
            dataForPostObj.doorCompanyId = $(this).val();

            $('#door_company_quatation').text(", "+$('#door_company option:selected').attr('doorComapanyName'));
            $('#door_collection_btn').empty();
            $('#door_collection_family').empty();
            $('#panel_type').empty();
            $('#model_number_row').empty();
            clearDataFromModel();
            modelindex = null;

            clearStaticAPIData();
            forDoorCollection(dataForPostObj.doorTypeId, dataForPostObj.doorCompanyId);

           }) ;
    
           function forDoorCollection(doorTypeId, doorCompanyId){
            page_loader.show();
            $.ajax({
                url: `${path_of_site}DoorCollection/DoorCollectionByTypeCompanyId?DoorTypeId=${doorTypeId}&DoorCompanyId=${doorCompanyId}`,
                type: 'GET',
                headers: {
                    'Authorization':'Bearer ' + token,
                },
                success: function(data) {
                     JSON.stringify(data);

                     data.payload.forEach(e=>{
                      document.querySelector('#door_collection_btn').insertAdjacentHTML('beforeend', `<button doorCollectionId = "${e.doorCollectionId}" > ${e.doorCollectionName} </button>`);
                     });

                    
                     $('#door_collection_btn button').click(function(){
                        
                        $(this).siblings().removeClass('selected');
                        $(this).addClass('selected');
                        $('.assosiated_from_model').hide();

                        modelindex = null;
        
                        doorCollectionId = $(this).attr('doorCollectionId');
        
                        clearStaticAPIData();
                        appendDoorcollectionfamily(doorCollectionId);
             
                    $('#collection_for_quatation').text($(this).text() +" collection");
                    $('#family_for_quatation').text('');
        
        
                    });
                      page_loader.hide();
                },
                error: function(xhr, status, error) {
                    errorCame(error);
                    page_loader.hide();
                }
            });
        }
 

// this is for append door collection family
    function appendDoorcollectionfamily(doorCollectionId){

        page_loader.show();

        $.ajax({
            url: `${path_of_site}DoorSubCollection/GetDoorCollectionListById?DoorCollectionId=${doorCollectionId}`,
            type: 'GET',
            headers: {
                'Authorization':'Bearer ' + token,
            },
            success: function(data) {

                 JSON.stringify(data);
               
                 $('#door_collection_family').empty();
                 $('#panel_type').empty();
                 $('#model_number_row').empty();

                 clearDataFromModel();


                 data.payload.forEach(e=>{
                   document.querySelector("#door_collection_family").insertAdjacentHTML('beforeend', `<div class="door_collection_family_col">
                   <div class="door_family p-1 p-md-2" doorSubCollectionId="${e.doorSubCollectionId}"f>
                       <div class="family_img">
                           <img src="${e.filePath}" alt="${e.doorSubCollectionName}">
                       </div>
                       <p class="mb-0 ">${e.doorSubCollectionName}</p>
                   </div>
               </div>`);
                 });
               DoorCategory_event();
               page_loader.hide();
            },
            error: function(xhr, status, error) {
                errorCame(error);
               page_loader.hide();

            }

        });
    }


    //DoorCategory this is for click on raised panel and append short long panel
    function DoorCategory_event(){
        $('#door_collection_family .door_family').click(function(){
            
            clearStaticAPIData();
        $('.assosiated_from_model').hide();

            modelindex = null;

                $('#door_collection_family .door_family').removeClass('selected');
                $(this).addClass('selected');
                SubSubCollectionId = $(this).attr('doorSubcollectionid');
                $('#family_for_quatation').text(', '+$(this).text() + "family");
                
                apiForPanelType(SubSubCollectionId);
        });
    }


// API for panel type 
function apiForPanelType(SubSubCollectionId){

    page_loader.show();

    $.ajax({
        url: `${path_of_site}DoorSubCollectionPanel/GetBySubCollectionId?SubCollectionId=${SubSubCollectionId}`,
        type: 'GET',
        headers: {
            'Authorization':'Bearer ' + token,
        },
        success: function(data) {

             JSON.stringify(data);

              $('#panel_type').empty();
              $('#model_number_row').empty();

              clearDataFromModel();

             data.payload.forEach(e=>{
               document.querySelector("#panel_type").insertAdjacentHTML('beforeend', 
               `<div class="door_collection_family_col">
               <div class="door_catogary  bg-light rounded " doorPanelId="${e.doorPanelId}" repeatfilePath='${e.repeatfilePath}'>
                   <div class="img">
                       <img src="${e.filePath}" alt="">
                   </div>
                   <p class="mb-0">${e.doorPanelName}</p>
               </div>
           </div>`);
             });

            to_append_model_number();
           page_loader.hide();
             
        },
        error: function(xhr, status, error) {
            errorCame(error);
           page_loader.hide();

        }
    });
}





// this is for append model number and click on panel type 
let doorPanelId;
let repeatedFile;
let doorModelId;

function to_append_model_number(){
    $("#panel_type .door_catogary").click(function(){

        $('.assosiated_from_model').hide();

        $('#window_quantity_for_quatation').text(`Window Quantity:0`);
         $('#windowQ').text("0");

         doorPanelId = $(this).attr('doorPanelId');
         repeatedFile = $(this).attr('repeatfilepath');
        
        $("#panel_type .door_catogary").removeClass('selected');
        $(this).addClass('selected');

        $('#panel_type_for_quatation').text(', '+ $(this).text());

        toAppendModel(doorPanelId);
        clearStaticAPIData();
        
    });
}

function clearDataFromModel(){

    $('#create_img').empty();
    $('.append_grid_for_selection').empty();
    $('.for_all_grid ul').empty();
    $('.for_grid_height ul').empty();
    $('.your_door_design').show();
    $('.image_grid_parent.append_grid').hide();
    $('.left_btns').hide();
    $('.modelDesc').text('');
    $('#model_number_img img').attr("src", '');
    $('#select_color ul').empty();

    $('#total_amount_show').text('0');
}

let colorMainArr = [];

function toAppendModel(doorPanelId){
    
    clearDataFromModel();
    if(!dataForPostObj.doorHeight || !dataForPostObj.doorWidth ||  dataForPostObj.doorTypeId == null || doorPanelId ==  null){

        errorCame('Please select Door Size');
    $('#panel_type .door_catogary').removeClass('selected');
    }

    else{

    page_loader.show();
    $.ajax({
        url: `${path_of_site}DoorVisulization/GetVisulizationModel`,
        type: 'POST',
        mode: 'no-cors',
        crossDomain: true,
        contentType: 'application/json-patch+json',
        dataType: 'json',
        data: `{ 
            doorHeight:${dataForPostObj.doorHeight},
            doorWidth: ${dataForPostObj.doorWidth},
            doorTypeId: ${dataForPostObj.doorTypeId},
            doorCompanyId: ${dataForPostObj.doorCompanyId},
            doorPanelId:${doorPanelId}}`,
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Authorization':'Bearer' + token,
        },
        success: function(data) {

             JSON.stringify(data);

             document.querySelector("#model_number_row").innerHTML = null;
             $("#model_number_row").siblings('.error').text('');

            if(data.errors){
                $("#model_number_row").siblings('.error').text(data.errors[0]);
                page_loader.hide();  
            }
            else if(data.payload.length < 1 || data.payload == undefined){
                $("#model_number_row").siblings('.error').text('data not found');
                page_loader.hide();  
            }

            else{
                colorMainArr = [];

                 data.payload.forEach((e, index)=>{
                   document.querySelector("#model_number_row").insertAdjacentHTML('beforeend', 
                       `<div class="model_number_col bg-light" data-index="${index}" doorModelId="${e.doorModelId}" doorModelPath="${e.doorModelPath}" doorModelDesc='${e.doorModelDesc}' noOfSection="${e.sectionSize}" widthSection='${e.widthSection}'>
                       <div class="model_number_col_inr text-center h-100">
                           <p class="model_num">${e.doorModelName}</p>
                           <span class="quality_of_model">Best</span>
                           <p class="mb-1"> R-17-19</p>
                       </div>
                   </div>`);

                    
                    let newObjArray = [e.lstDoorColor];
                    colorMainArr.push(newObjArray);

                    // this is for click on size and change model
                    if(modelindex != null &&  e.doorModelName == modelindex){
                            $('#model_number_img img').attr("src",e.doorModelPath);
                            $('.model_number_col').eq(index).addClass('selected');
                            $('.modelDesc').text(e.doorModelDesc);
                            let clickColorArr =  colorMainArr[index][0];
                            numberOfColumn = e.widthSection;
                            clickedThis = $('.model_number_col').eq(index);
                            createImageRowColumn(clickedThis, numberOfColumn, repeatedFile, clickColorArr);
                            $('.assosiated_from_model').show();

                            // modelPostAPI(modelindex);

                            if(clicked_color_from_size){
                                
                                if(clicked_color_from_size.length == 7){
                                    setTimeout(()=>{
                                        applyColorOverlay_multiple(clicked_color_from_size);
                                        applyColorOverlay(clicked_color_from_size);
                                        borderColor =  adjustColor(clicked_color_from_size);
                                        document.querySelector(':root').style.setProperty('--stripepartition', borderColor);
                                        $('#select_color ul li').removeClass('selected');
                                        $(`#select_color ul li[data-color='${clicked_color_from_size}']`).addClass('selected');
                                    },100);
                                }
                                else{
                                    $('.image_grid_parent.append_grid canvas').hide();
                                    $('.bg_img_main img').attr('src', "./images/classic_woodgrain_bg_img.png");
                                    $('.createImageimg img').attr('src', clicked_color_from_size);
                                    document.querySelector(':root').style.setProperty('--stripepartition', '#181615');
                                    $('#select_color ul li').removeClass('selected');
                                    $(`#select_color ul li[data-color='${clicked_color_from_size}']`).addClass('selected');
                                }
                            }
                            else{
                                alert('your previous size didnt have any model kindly select color again');
                            }

                            forOtherData();
                    }
                    

                    // end 

                 });

                 $("#model_number_row").siblings('.error').text('');
                     
                 modelEvents();
                 page_loader.hide();  

                 if(window.outerWidth < 480){
                    $('.model_number_col').height($('.model_number_col').width());
                }
        }
             
        },
        error: function(xhr, status, error) {
            errorCame(error);
            page_loader.hide();

        }
    });
    
}
}


function modelEvents(){
  
         $('.model_number_col').mouseenter(function(){
            $('.modelDesc').text($(this).attr("doorModelDesc"));
            $('#model_number_img img').attr("src", $(this).attr("doorModelPath"));
        });

        $('.model_number_col').mouseleave(function(){
            $('.modelDesc').text($(this).siblings('.selected').attr(("doorModelDesc")));
            $('#model_number_img img').attr("src", $(this).siblings('.selected').attr(("doorModelPath")));
        });


        $('.model_number_col').click(function(){

            $('.assosiated_from_model').show();
            forOtherData();

            $('.model_number_col').removeClass('selected');
            $(this).addClass('selected');
            $('.modelDesc').text($(this).attr("doorModelDesc"));
            $('#model_number_img img').attr("src", $(this).attr("doorModelPath"));
    
            $('#model_number_for_quatation').text(', '+ $(this).find(".model_num").text());
    
            modelindex = $(this).find('.model_num').text();

            let clickColorArr =  colorMainArr[$(this).attr('data-index')][0];
             numberOfColumn = $(this).attr('widthSection');
             clickedThis = $(this);
             createImageRowColumn(clickedThis, numberOfColumn, repeatedFile, clickColorArr);
             modelPostAPI($(this).attr('doormodelid'));

        });
     
}


function modelPostAPI(selectedModelID){
    page_loader.show();
    $.ajax({
        url: `${path_of_site}DoorVisulization/GetVisulizationGlazingType?DoorModelId=${selectedModelID}`,
        type: 'POST',
        headers: {
            'Authorization':'Bearer' + token,
        },
        success: function(data) {

             JSON.stringify(data);
             console.log(data);

            },
            error: function(xhr, status, error) {
                errorCame(error);
                page_loader.hide();
    
            }
        });


        $.ajax({
            url: `${path_of_site}DoorVisulization/GetVisulizationInsertsType?DoorModelId=${selectedModelID}`,
            type: 'POST',
            headers: {
                'Authorization':'Bearer' + token,
            },
            success: function(data) {
    
                 JSON.stringify(data);
                 console.log(data);
    
                },
                error: function(xhr, status, error) {
                    errorCame(error);
                    page_loader.hide();
        
                }
            });
}
























        // click on window glass 

        $("#window_glass ul li").click(function(){
            $("#window_glass ul li").removeClass("selected");
            $(this).addClass("selected");
            
           $('#window_type').show();
        
           if(doorPanelId == 1 || doorPanelId == 27 || doorPanelId == 18 || doorPanelId == 24 || doorPanelId == 31){
            $('#long_panel').hide();
            $('#short_panel').show();
        
           }
           else if(doorPanelId == 2 || doorPanelId == 28 || doorPanelId == 19 || doorPanelId == 24 || doorPanelId == 31){
            $('#short_panel').hide();
            $('#long_panel').show();
        
           }
        
           setGlass();
        
        });















// API for quotation 
const sectionToCapture = document.getElementById('image_download_section');
document.getElementById('quotationsubmit_btn').addEventListener('click', () => {

    var imageDataURL;

  html2canvas(sectionToCapture).then( function(canvas) {

    imageDataURL =  canvas.toDataURL('image/jpg');

    // const link = document.createElement('a');
    // link.href = imageDataURL;
    // link.download = 'section_image.jpg';

    // link.click();
    

    canvas.toBlob(function(blob) {
      imageDataURL = URL.createObjectURL(blob);
    });

});


var imgSrc = $("#model_number_img img").attr("src");
var modelImgBlob;
fetch(imgSrc)
    .then(response => response.blob())
    .then(blob => {
    modelImgBlob = blob;
        console.log(blob);
    })
    .catch(error => console.error(error));



  
      let short_panel_windowPrice = [51.20, 66.10, 61.40, 91.74, 72.96, 97.70];
      let long_panel_windowPrice = [102.40, 132.20, 122.81, 183.49, 145.92, 195.41]
  
      let window_glassIndex = $('#window_glass ul li.selected').attr('data-index');
      let perWindowPrice;
  
      var selectedPanelID = $('#panel_type .door_catogary.selected').attr('doorpanelid');
      if(selectedPanelID == 1 || selectedPanelID == 27 || selectedPanelID == 24){
        perWindowPrice = short_panel_windowPrice[window_glassIndex];
      }
      else if(selectedPanelID == 2 || selectedPanelID == 28|| selectedPanelID == 25){
        perWindowPrice =long_panel_windowPrice[window_glassIndex];
  
      }
  
     window_glass_type_for_quatation = $('#window_glass_type ul li.selected').text() + $('#window_glass ul li.selected').text();

      var window_qty = parseInt($('#windowQ').text());
  var modelPrice = $('#select_color ul li.selected').attr('dsp');
  
      var doorOperatorPrice =  $('#doorOperator .door_operator_col_inr.selected select option:selected').attr('saleprice');
  
  
   ((modelPrice == NaN)||(modelPrice == undefined))? modelPrice = 0:'';
  ((window_qty == NaN)||(window_qty == undefined))? window_qty = 0:'';
  ((perWindowPrice == NaN)||(perWindowPrice == undefined))? perWindowPrice = 0:'';
  ((doorOperatorPrice == NaN)||(doorOperatorPrice == undefined))? doorOperatorPrice = 0:'';
  
  let total_amount = Number(Number(modelPrice) + Number(perWindowPrice * window_qty) + Number(doorOperatorPrice)).toFixed(2)
     
  
      $('#total_amount_show').text(total_amount);
   

        let objForQuotation = `{
            "quotationId": 0,
            "customerId": 1,
            "vendorId":0,
            "companyId": 10,
            "quotationNumber":0,
            "quotationSerialNumber": 0,
            "quotationDate": "",
            "quotationValidDays": 30,
            "statusFlag":"Y",
            "quotationItemId": 0,
            "doorTypeID": ${dataForPostObj.doorTypeId},
            "doorQuantity": ${$('#quantity_of_door').val()},
            "doorCompanyId": ${dataForPostObj.doorCompanyId},
            "doorHeightId": ${dataForPostObj.doorHeight},
            "doorWidthId": ${dataForPostObj.doorWidth},
            "doorCollectionId": ${$('#door_collection_btn button.selected').attr('doorcollectionid') || null},
            "doorSubCollectionId": ${$('#door_collection_family .door_family.selected').attr('doorsubcollectionid') || null},
            "doorPanelId": ${$('#panel_type .door_catogary.selected').attr('doorpanelid') || null},
            "doorModelId": ${$('#model_number_row .model_number_col.selected').attr('doormodelid') || null},
            "doorColorId": ${$('#select_color li.selected').attr('doorcolorid') || null},
            "windowQuantity": ${$('#windowQ').text() || 0},
            "windowGlassTypeId": 0,
            "windowGlassId": 0,
            "windowInsertId": 0,
            "springCategoryTypeId": ${$('#spring_data li.selected').attr('springcategorytypeid') || null},
            "springCategoryId": ${$('#spriingCyclage option:selected').attr('springcategoryid') || null},
            "doorSealTypeId": ${$('#sealData li.selected').attr('doorsealtypeid') || null},
            "doorLockId": ${$('#door_lock li.selected').attr('doorlockid') || null},
            "companyOperatorTypeId": ${$('#doorOperator .door_operator_col_inr.selected').attr('companyoperatortypeid') || null},
            "companyOperatorId": ${$('#doorOperator .selected option:selected').attr('company_operator_id') || null},
            "strutCategoryTypeId": ${$('#strutData li.selected').attr('sturtcategorytypeid') || null},
            "strutCategoryId": ${$('#extrastrutData li.selected').attr('sturtcategoryid') || null},
            "extraStrutQuantity": ${$('#strut_quantity input').val() || 0 },
            "doorImage": 'test_image',
            "doorModelImage": 'test_image'}`


            // "doorImage": ${imageDataURL},
            // "doorModelImage": ${modelImgBlob}}
$.ajax({
    url: `${path_of_site}CustomerQuotation/AddOrUpdateCustomerQuotation`,
    type: 'POST',
    mode: 'no-cors',
    crossDomain: true,
    contentType: 'application/json-patch+json',
    dataType: 'json',
    data:objForQuotation,
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization': ' Bearer ' + token,
    },
    success: function(data) {

         JSON.stringify(data);
         successCame(data.message);
        },
        error: function(xhr, status, error) {
            errorCame(error);
            page_loader.hide();

        }
    });



  });
  
