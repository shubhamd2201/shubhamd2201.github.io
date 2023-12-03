var path_of_site = "http://doorportal-001-site1.etempurl.com/v1/";
var page_loader = $('#loader');
let token = "";

let dataForPostObj = {
    doorHeight: null,
    doorWidth: null,
    doorTypeId: 1,
    doorCompanyId:1,
}
let vendorID = null;

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
let clicked_color_from_size = null;

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
jQuery(document).on("click", ".zero.minus-btn", {}, function(t) {
    if (inputQty = jQuery(this).parent().find(".qty"), inputQty.val() > 0) return inputQty.val(function(t, e) {
        return e > 0 ? --e : 1
    }), inputQty.change(), !1

});

jQuery(document).on("click", ".one.minus-btn", {}, function(t) {
    if (inputQty = jQuery(this).parent().find(".qty"), inputQty.val() > 0) return inputQty.val(function(t, e) {
        return e > 1 ? --e : 1
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

                  errorCame(response.errors);
                  console.log(response.errors);
                  page_loader.hide();
              }
              else{
                  token = response.payload.access_token;
                  page_loader.show();
          
                  $.ajax({
                      url: path_of_site+"DoorType/DoorType",
                      type: 'GET',
                      headers: {
                          'Authorization':' Bearer  ' + token,
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
                        console.log(xhr, status, error)
                          errorCame(error);
                          page_loader.hide();
                      }
                  });

                  // vendor API 
    let  vendor_details =  document.querySelector('#vendor_details');
    $.ajax({
        url: `${path_of_site}VendorMaster/GetVendorListById`,
        type: 'GET',
        headers: {
            'Authorization':' Bearer  ' + token,
        },
        success: function(data) {

             JSON.stringify(data);
             vendor_details.innerHTML = null;

             data.payload.forEach(e=>{
                vendor_details.insertAdjacentHTML('beforeend' , `<option value='${e.vendorId}' address='${e.addressLine1}'>${e.lastName}-${e.firstName} (${e.companyName})</option>`);

             });
             vendorID = $('#vendor_details option').eq(0).val();
             $('#vendorshipping_add').text($('#vendor_details option:first').attr('address'));
             
             $('#vendor_details').change(function(){
                $('#vendorshipping_add').text($('#vendor_details option:selected').attr('address'));
                vendorID = $(this).val();


             });
            },
            error: function(xhr, status, error) {
              console.log(xhr, status, error);
                errorCame(error);
                page_loader.hide();
            }
        });


                  $.ajax({
                      url: `${path_of_site}DoorCompany/DoorCompany`,
                      type: 'GET',
                      headers: {
                          'Authorization':' Bearer  ' + token,
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
                         
                        //   setTimeout(function(){
                        //      $('#door_collection_btn button').eq(0).addClass('selected');
                        //     $('#collection_for_quatation').text($('#door_collection_btn button').eq(0).text() +" collection");

                        //   },1000)

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
                    'Authorization':' Bearer  ' + token,
                },
                success: function(data) {
                     JSON.stringify(data);

                     data.payload.forEach(e=>{
                      document.querySelector('#door_collection_btn').insertAdjacentHTML('beforeend', `<button doorCollectionId = "${e.doorCollectionId}" > ${e.doorCollectionName} </button>`);
                     });

                     $('#door_collection_btn button').eq(0).addClass('selected');
                     appendDoorcollectionfamily($('#door_collection_btn button').eq(0).attr('doorCollectionId'));

                     $('#collection_for_quatation').text($('#door_collection_btn button').eq(0).text() +" collection");

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
                'Authorization':' Bearer  ' + token,
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
            'Authorization':' Bearer  ' + token,
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
                   <p class="mb-0">${e.doorPanelDescription}</p>
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
        modelindex = null;

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

    $('.cleartext span').text('');
    $('#cyclage_info ul').attr('cyclageiforfor_quotation', '');

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
            'Authorization':' Bearer ' + token,
        },
        success: function(data) {

             JSON.stringify(data);
             document.querySelector("#model_number_row").innerHTML = null;
             $("#model_number_row").siblings('.error').text('');

            if(data.errors){
                $("#model_number_row").siblings('.error').text(data.errors[0]);
                errorCame(data.errors[0]);

                page_loader.hide();  
            }
            else if(data.payload.length < 1 || data.payload == undefined){
                $("#model_number_row").siblings('.error').text('data not found');
                errorCame('data not found');
                page_loader.hide();  
            }

            else{
                colorMainArr = [];
                
                 data.payload.forEach((e, index)=>{
                    // e.ranking

                   document.querySelector("#model_number_row").insertAdjacentHTML('beforeend', 
                       `<div class="model_number_col bg-light" data-index="${index}" doorModelId="${e.doorModelId}" doorModelPath="${e.doorModelPath}" doorModelDesc='${e.doorModelDesc}' noOfSection="${e.sectionSize}" widthSection='${e.widthSection}'>
                       <div class="model_number_col_inr text-center h-100">
                           <p class="model_num">${e.doorModelName}</p>
                           <span class="quality_of_model">${e.quality}</span>
                           <p class="mb-1">${e.range}</p>
                           <ul class="rating-star star-${e.ranking}"></ul>
                       </div>
                   </div>`);

                   for(let i = 0; i < 5; i++){
                    document.querySelectorAll("#model_number_row .model_number_col")[index].querySelector('.rating-star').insertAdjacentHTML('beforeend', '<li><i class="bi bi-star-fill"></i></li>');
                   }


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

                            modelPostAPI($('.model_number_col.selected').attr('doormodelid'));

                            if(clicked_color_from_size){
                                
                                if(clicked_color_from_size.length == 7){

                                    $('.createImageimg img').on('load' , ()=>{
                                        applyColorOverlay_multiple(clicked_color_from_size);
                                        applyColorOverlay(clicked_color_from_size);
                                        borderColor =  adjustColor(clicked_color_from_size);
                                        document.querySelector(':root').style.setProperty('--stripepartition', borderColor);
                                        
                                    });
                                    $('#select_color ul li').removeClass('selected'); 
                                    $(`#select_color ul li[data-color='${clicked_color_from_size}']`).addClass('selected'); 
                                }
                                else{
                                    
                                    // setTimeout(() => {
                                        $('.image_grid_parent.append_grid canvas').hide();
                                        $('.createImageimg img').attr('src', clicked_color_from_size);
                                        document.querySelector(':root').style.setProperty('--stripepartition', '#000000');
                                        $('#select_color ul li').removeClass('selected');
                                        $(`#select_color ul li[data-color='${clicked_color_from_size}']`).addClass('selected');

                                        let selected_color_id = $('#select_color li.selected').attr('doorcolorid');
                                        let panelID = $('#panel_type .door_catogary.selected').attr('doorpanelid');
                            
                                        let repImg = repeatImageOfWooden (selected_color_id, panelID);
                                        
                                        $('.createImageimg img').attr('src', repImg);
                                        $('.bg_img_main img').attr('src',  $('#select_color ul li.selected').find('.color_img_btn img').attr('src'));

                                        
                                    // }, 1000);
                                }
                                // modelindex = null;
                            }
                            else{
                                errorCame('your previous size didnt have any model kindly select color again');
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
            $('.cleartext span').text('');
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
             doorModelId = $(this).attr('doormodelid');
             modelPostAPI(doorModelId);

        });
     
}


function modelPostAPI(selectedModelID){
    page_loader.show();
    $.ajax({
        url: `${path_of_site}DoorVisulization/GetVisulizationGlazingType?DoorModelId=${selectedModelID}`,
        type: 'POST',
        mode: 'no-cors',
        crossDomain: true,
        contentType: 'application/json-patch+json',
        dataType: 'json',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Authorization':' Bearer ' + token,
        },
        success: function(data) {

            document.querySelector("#glazing_type ul").innerHTML = null;
             JSON.stringify(data);

             data.payload.forEach((e, index)=>{

                document.querySelector("#glazing_type ul").insertAdjacentHTML('beforeend', 
                    `<li factoryGlazeTypeId="${e.factoryGlazeTypeId}" >${e.factoryGlazeTypeName}</li>`);
             });


            //  click on glazing tabbing 
            $("#glazing_type ul li").eq(0).addClass('selected');
            let factoryGlazeTypeId_1 = $("#glazing_type ul li").eq(0).attr('factoryGlazeTypeId');

            if(factoryGlazeTypeId_1){
                glazingImageAPI(factoryGlazeTypeId_1);
            }

             $("#glazing_type ul li").click(function(){

                $(this).siblings().removeClass('selected');
                $(this).addClass('selected');

                let factoryGlazeTypeId = $(this).attr('factoryGlazeTypeId');
                if(factoryGlazeTypeId){
                    glazingImageAPI(factoryGlazeTypeId);
                }
             });


            },
            error: function(xhr, status, error) {
                errorCame(error);
                page_loader.hide();
    
            }
        });



        // this is for window 

        $.ajax({
            url: `${path_of_site}DoorVisulization/GetVisulizationInsertsType?DoorModelId=${selectedModelID}`,
            type: 'POST',
            headers: {
                'Authorization':' Bearer ' + token,
            },
            success: function(data) {
    
                document.querySelector("#window_insert_tabbing ul").innerHTML = null;
                document.querySelector("#window_type ul").innerHTML = null;

                 JSON.stringify(data);

             data.payload.forEach((e, index)=>{

             document.querySelector("#window_insert_tabbing ul").innerHTML = "";
                document.querySelector("#window_insert_tabbing ul").insertAdjacentHTML('beforeend', 
                    `<li doorInsulatedTypeId="${e.doorInsulatedTypeId}" >${e.doorInsulatedTypeDescription}</li>`);
             });


             $("#window_insert_tabbing ul li").eq(0).addClass('selected');
             let windowtabbingID_1 = $("#window_insert_tabbing ul li").eq(0).attr('doorInsulatedTypeId');
             
             if(windowtabbingID_1){
                windowInsertImageAPI (windowtabbingID_1);
             }

            //  window insert image event 
             $("#window_insert_tabbing ul li").click(function(){

                $(this).siblings().removeClass('selected');
                $(this).addClass('selected');

                let windowtabbingID = $(this).attr('doorInsulatedTypeId');
                if(windowtabbingID){
                windowInsertImageAPI (windowtabbingID);
                }
             });

             


                },
                error: function(xhr, status, error) {
                    errorCame(error);
                    page_loader.hide();
        
                }
            });

           
}



function glazingImageAPI(glazingtabbing){

    page_loader.show();
    
    $.ajax({
        url: `${path_of_site}DoorVisulization/GetVisulizationGlazingByTypeId?GlazingTypeId=${glazingtabbing}`,
        type: 'POST',
        mode: 'no-cors',
        crossDomain: true,
        contentType: 'application/json-patch+json',
        dataType: 'json',
        headers: {
            'Authorization':' Bearer ' + token,
        },
        success: function(data) {

            document.querySelector("#window_glass ul").innerHTML = null;
             JSON.stringify(data);

         document.querySelector("#window_glass ul").innerHTML = "";
         data.payload.forEach((e, index)=>{
            document.querySelector("#window_glass ul").insertAdjacentHTML('beforeend', 
            `<li class="price_tooltip" tooltip-data='$${e.factoryGlazeSalePrice}' glazingimg='${e.fileRawPath}' factoryGlazeTypeId='${e.factoryGlazeTypeId}' glzsp="${e.factoryGlazeSalePrice}">
                <div><img src="${e.filePath}" alt="${e.factoryGlazeSizeDesc}"></div>
                <p>${e.factoryGlazeSizeDesc}</p>
            </li>`);

         });
         $('#window_glass ul li').eq(0).addClass('selected');
         $('#window_glass ul li').click(function(){

            $(this).siblings().removeClass('selected');
            $(this).addClass('selected');

              // this is for edit grid 
              let editablegrid = document.querySelector('.append_grid_for_selection ul li.i_am_selected .edit_grid.selected_edit');

              if(editablegrid != null && editablegrid != undefined){

                let glazingtype = $('#glazing_type ul li.selected').attr('factoryglazetypeid');

               let edit_ul_index = editablegrid.parentElement.parentElement.getAttribute('rowindex');
               let edit_li_index = editablegrid.parentElement.getAttribute('listindex'); 

               let glassimg = $('#window_glass ul li.selected').attr('glazingimg');

                   $(`#create_img ul[rowindex="${edit_ul_index}"] li[listindex="${edit_li_index}"] .window_img`).has("img").css('background', 'url('+ glassimg +')');
                   $(`#create_img ul[rowindex="${edit_ul_index}"] li[listindex="${edit_li_index}"] .window_img`).find("img").attr('glazingtype', glazingtype);

              }
              else{
                setGlass();

              }


         });

         page_loader.hide();

            },
            error: function(xhr, status, error) {
                errorCame(error);
                page_loader.hide();
    
            }
        });
}


function windowInsertImageAPI (windowtabbingID){
    page_loader.show();
    
    $.ajax({
        url: `${path_of_site}DoorVisulization/GetVisulizationInsertsTypeId?InsulatedTypeId=${windowtabbingID}`,
        type: 'POST',
        headers: {
            'Authorization':' Bearer ' + token,
        },
        success: function(data) {

         JSON.stringify(data);
         document.querySelector("#window_type ul").innerHTML = "";
         data.payload.forEach((e, index)=>{
            document.querySelector("#window_type ul").insertAdjacentHTML('beforeend', 
            `<li class="price_tooltip" tooltip-data='$${e.insulatedSalePrice}' doorInsulatedId='${e.doorInsulatedId}' wsp='${e.insulatedSalePrice}'>
                <div><img src="${e.filePath}" alt="${e.doorInsulatedDesc}"></div>
                <p>${e.doorInsulatedDesc}</p>
            </li>`);

         });

         page_loader.hide();
         
            $("#window_type ul li").click(function(){
                $("#window_type ul li").removeClass("selected");
                $(this).addClass("selected");

                // this is for edit grid 
                let editablegrid = document.querySelector('.append_grid_for_selection ul li.i_am_selected .edit_grid.selected_edit');

               if(editablegrid != null && editablegrid != undefined){

                let edit_ul_index = editablegrid.parentElement.parentElement.getAttribute('rowindex');
                let edit_li_index = editablegrid.parentElement.getAttribute('listindex'); 

                let selectColor = $('#select_color ul li.selected').attr('doorcolorid');
                let window_type = $('#window_type ul li.selected').attr('doorinsulatedid');
                let windowurl = windowPath(selectColor, window_type);

                    $(`#create_img ul[rowindex="${edit_ul_index}"] li[listindex="${edit_li_index}"] .window_img`).find("img").attr('src', windowurl);
                    $(`#create_img ul[rowindex="${edit_ul_index}"] li[listindex="${edit_li_index}"] .window_img`).find("img").attr('windowid', window_type);

               }
               else{
                setWindow();
                setGlass();
               }
            });


            },
            error: function(xhr, status, error) {
                errorCame(error);
                page_loader.hide();
    
            }
        });

}





// function editEvent (){
//     let edit_ul_index,edit_li_index;

//     document.querySelectorAll('.append_grid_for_selection ul li.i_am_selected .edit_grid').forEach( (e, i)=>{
//         e.addEventListener('click', function(b){
//             b.stopPropagation();
//             $('.append_grid_for_selection ul li.i_am_selected .edit_grid').removeClass('selected_edit');
//             this.classList.add('selected_edit');

//             edit_ul_index = this.parentElement.parentElement.getAttribute('rowindex');
//             edit_li_index = this.parentElement.getAttribute('listindex'); 

//             console.log(edit_ul_index,edit_li_index);

//         }); 
//     });

//     return[edit_ul_index,edit_li_index];

// }




















        









function setGlass(){
    

    if(($("#window_glass ul").find('li.selected').length > 0) && ($('#window_type ul').find('li.selected').length > 0)){
    $('.window_img img').show();

        let glassimg = $('#window_glass ul li.selected').attr('glazingimg');

        $('.window_img').css('background', 'none');
        $('.window_img').has("img").css('background', 'url('+ glassimg +')').attr('crossorigin', 'anonymous');

        $('#window_glass_type_for_quatation').text("Window Glass:"+$('#window_insert_tabbing ul li.selected').text() + $('#window_glass ul li.selected').text());

        let glazingtype = $('#glazing_type ul li.selected').attr('factoryglazetypeid');

        $(".window_img").find("img").attr('glazingtype', glazingtype);

    } 
}

function setWindow(){

    if($('#window_type ul').find('li.selected').length > 0){
        $('.window_img img').show();

        let selectColor = $('#select_color ul li.selected').attr('doorcolorid');
        let window_type = $('#window_type ul li.selected').attr('doorinsulatedid');
        let windowurl = windowPath(selectColor, window_type);

        $(".window_img").find("img").attr('src',windowurl);
        $(".window_img").find("img").attr('windowid', window_type);
        $('#window_type_for_quatation').text(", Window Insert: "+$('#window_type ul li.selected').text()); 

    (window_type == 6 || window_type == 14 || window_type == 16)?$('#create_img ul').addClass('flipwindow'):$('#create_img ul').removeClass('flipwindow');
    }
}

















// this is static API ===========================================================================================


function forOtherData(){

            // door lock 
            page_loader.show();
            $.ajax({
            url: "http://doorportal-001-site1.etempurl.com/v1/DoorLock/DoorLock",
            type: 'GET',
            headers: {
                'Authorization':'Bearer ' + token,
            },
            success: function(data) {

                JSON.stringify(data);
                    document.querySelector('#door_lock ul').innerHTML = null;
                    data.payload.forEach(e=>{
                    document.querySelector('#door_lock ul').insertAdjacentHTML('beforeend', `<li doorLockId = "${e.doorLockId}" class='price_tooltip' tooltip-data="$${e.lockSalePrice}" lsp=${e.lockSalePrice}>
                        <div>
                            <div><img src="${e.filePath}" alt="${e.fileName}"></div>
                            <p>${e.doorLockName}</p>
                        </div>
                    </li>`);
                    });

                    $('.lock_bar ul li').click(function(){
                    $(this).siblings().removeClass("selected");
                    $(this).addClass('selected');
                    $('#lock_for_quatation').text($(this).text());
                });

                page_loader.hide();

            },
            error: function(xhr, status, error) {
                errorCame(error);
                page_loader.hide();
            }

        });





            // for spring  
            page_loader.show();
            $.ajax({
            url: `${path_of_site}SpringCategoryType/SpringCategoryType`,
            type: 'GET',
            headers: {
                'Authorization':'Bearer ' + token,
            },
            success: function(data) {

                JSON.stringify(data);
                    document.querySelector('#spring_data ul').innerHTML = null;
                    document.querySelector('#spring_price_label').innerHTML = null;

                    data.payload.forEach(e=>{
                    document.querySelector('#spring_data ul').insertAdjacentHTML('beforeend', ` <li springCategoryTypeId="${e.springCategoryTypeId}">${e.springCategoryTypeName}</li>`
                    );
                    });
                page_loader.hide();

                $("#spring_data ul li").eq(0).addClass('selected');
                $("#Spring_for_quatation").text($("#spring_data ul li").eq(0).text());
                springTypeAPI($("#spring_data ul li").eq(0).attr('springcategorytypeid'));

                    $("#spring_data ul li").click(function(){
                        $(this).siblings().removeClass('selected');
                        $(this).addClass('selected');
                        document.querySelector('#cyclage_info ul').innerHTML = null;
                        document.querySelector('#spring_price_label').innerHTML = null;

                        $('#cyclage_info ul').attr('cyclageiforfor_quotation', '');
                        console.log('i am running');
                        $('#Spring_for_quatation').text($(this).text());
                        springTypeAPI($(this).attr('springcategorytypeid'));
                    });

            },
            error: function(xhr, status, error) {
                errorCame(error);
                page_loader.hide();
            }

        });


            // for seal 

            page_loader.show();
            $.ajax({
            url: `${path_of_site}DoorSealType/DoorSealType`,
            type: 'GET',
            headers: {
                'Authorization':'Bearer ' + token,
            },
            success: function(data) {

                JSON.stringify(data);
                    document.querySelector('#sealData ul').innerHTML = null;
                    data.payload.forEach(e=>{
                    document.querySelector('#sealData ul').insertAdjacentHTML('beforeend', ` <li doorSealTypeId="${e.doorSealTypeId}">${e.doorSealTypeName}</li>`
                    );
                    });

                page_loader.hide();

                $('#sealData ul li').eq(0).addClass('selected');
                sealprice($('#sealData ul li').eq(0).attr('doorSealTypeId'));

                $("#sealData ul li").click(function(){
                    let selectedSeal = [];
                    // $(this).toggleClass('selected');

                    $("#sealData ul li").removeClass('selected');
                    $(this).addClass('selected');

                    sealprice($(this).attr('doorSealTypeId'));

                    $("#sealData ul li.selected").each(function(index){
                        let this_val = $("#sealData ul li.selected").eq(index).text()
                        if (!selectedSeal.includes(this_val)){
                        selectedSeal.push(this_val);
                        }
                    });

                    $('#seal_type_for_quatation').text(selectedSeal.join(" , "));
                });

            },
            error: function(xhr, status, error) {
                errorCame(error);
                page_loader.hide();
            }

        });
//===================== seal price ======================

function sealprice(doorSealTypeId){

    $.ajax({
        url: `${path_of_site}DoorVisulization/GetVisulizationSealCategory`,
        type: 'POST',
        contentType: 'application/json-patch+json',
        dataType: 'json',
        data: `{ 
            doorHeight:${dataForPostObj.doorHeight},
            doorWidth: ${dataForPostObj.doorWidth},
            doorSealTypeId: ${doorSealTypeId},
        }`,
        headers: {
            'Authorization':' Bearer ' + token,
        },
        success: function(data) {

            document.querySelector('#seal_details').innerHTML = null;
            document.querySelector('#seal_price_label').innerHTML = null;

            JSON.stringify(data);
            $('#seal_details').attr('seal_qty', ((dataForPostObj.doorHeight * 2) + Number(dataForPostObj.doorWidth)));
            data.payload.forEach((e, index)=>{
                document.querySelector('#seal_details').insertAdjacentHTML('beforeend', `<option  sealunitp='${e.doorSealCategoryUnitPrice}' doorSealCategoryId='${e.doorSealCategoryId}' ssp='${e.doorSealCategorySalesPrice}'>${e.doorSealCategoryDesc}</option>`)
            });
            $('#seal_price_label').text('$'+$('#seal_details option').eq(0).attr('ssp'));
            $('#seal_price_label').attr('ssp',$('#seal_details option').eq(0).attr('ssp'));
            $("#seal_type_for_quatation").text($('#seal_details option').eq(0).text());

            $('#seal_details').change(function(){
                $('#seal_price_label').text('$'+$('#seal_details option:selected').attr('ssp'));
                $('#seal_price_label').attr('ssp', $('#seal_details option:selected').attr('ssp'));
                $("#seal_type_for_quatation").text($('#seal_details option:selected').text());

            });
            },
            error: function(xhr, status, error) {
                errorCame(error);
                page_loader.hide();
            }
            });
}

//====================== end ==========================


            // for strut 


            $.ajax({
            url: `${path_of_site}SturtCategoryType/StrutCategoryTypes`,
            type: 'GET',
            headers: {
                'Authorization':'Bearer ' + token,
            },
            success: function(data) {

                JSON.stringify(data);
                $('#strutData .error').text("");

                if(data.payload == null || data.payload == undefined){
                    $('#strutData .error').text("Data does not exist");

                }
                else{
                    document.querySelector('#strutData ul').innerHTML = null;
                    data.payload.forEach(e=>{
                        document.querySelector('#strutData ul').insertAdjacentHTML('beforeend', ` <li sturtCategoryTypeId="${e.sturtCategoryTypeId}" ssp="${e.strurtSalesPrice}"  class="price_tooltip" tooltip-data="${e.strurtSalesPrice}">
                        ${e.sturtCategoryTypeName}
                        </li>`
                        );
                    });

                    

                }
                page_loader.hide();
                $('#strutData ul li').click(function(){
                    $(this).siblings().removeClass('selected');
                    $(this).addClass('selected');
                let this_id =  $(this).attr("sturtcategorytypeid");

                clickStrut(this_id);
                });



            },
            error: function(xhr, status, error) {
                errorCame(error);
                page_loader.hide();
            }

        });

            // this is for click on strut and append extra strut 
            function clickStrut(this_id){
                $('#strut_for_quatation').text($("#strutData ul li.selected").text());
                document.querySelector('#strut_quantity').innerHTML = null;
                document.querySelector('#extrastrutData p').innerHTML = '';
                $.ajax({
                    url: `${path_of_site}SturtCategory/GetSturtCategoryTypeId?SturtCategoryTypeId=${this_id}`,
                    type: 'GET',
                    headers: {
                        'Authorization':'Bearer ' + token,
                    },
                    success: function(data) {
                
                        JSON.stringify(data);
                        $('#extrastrutData .error').text("");
                
                        if(data.payload == null || data.payload == undefined){
                            $('#extrastrutData .error').text("Data does not exist");
                
                        }
                        else{
                            document.querySelector('#extrastrutData ul').innerHTML = null;
                            document.querySelector('#extrastrutData p').innerHTML = "Extra Strut Type";

                            document.querySelector('#strut_quantity').innerHTML = null;
                            data.payload.forEach(e=>{
                                document.querySelector('#extrastrutData ul').insertAdjacentHTML('beforeend', ` <li sturtCategoryId="${e.sturtCategoryId}" ssp="${e.sturtSalesPrice}" class="price_tooltip" tooltip-data="${e.sturtSalesPrice}">
                                ${e.sturtCategoryName}
                                </li>`
                                );
                            });
                            
                            if(data.payload.length > 0){
                                document.querySelector('#strut_quantity').insertAdjacentHTML('beforeend', 
                                `<p>Extra Strut Quantity</p>
                                <div>
                                    <input type="number" val="1" min="1" max="9" maxlength="1" class="w-100 py-2 px-3 rounder-theme">
                                </div>`
                                );
                            }
                    
                        }
                        page_loader.hide();

                        $('#extrastrutData ul li').click(function(){
                            $('#extrastrutData ul li').removeClass('selected');
                            $(this).addClass('selected');
                            $('#extraStrut_for_quotation').text($(this).text());
                        });

                        $('#strut_quantity input').on('input', function(){
                            $('#strut_quantity_for_quatation').text($(this).val());
                        });
                
                    },
                    error: function(xhr, status, error) {
                        errorCame(error);
                        page_loader.hide();
                    }
                
                });
        }




            // for door operator 
            $.ajax({
            url: `${path_of_site}CompanyOperatorType/CompanyOperatorType`,
            type: 'GET',
            headers: {
                'Authorization':'Bearer ' + token,
            },
            success: function(data) {

                JSON.stringify(data);

                $('#doorOperator').siblings(".error").text("");

                if(data.payload == null || data.payload == undefined){
                    $('#doorOperator').siblings(".error").text("Data does not exist");
                }
                else{
                    document.querySelector('#doorOperator').innerHTML = null;
                    data.payload.forEach((e, index)=>{
                        document.querySelector('#doorOperator').insertAdjacentHTML('beforeend', `<div class="col-lg-4 col-sm-6 col-12 ">
                        <div class="door_operator_col_inr border_2px" data-index="${index}" companyOperatorTypeId="${e.companyOperatorTypeId}" companyOperatorTypeName=${e.companyOperatorTypeName} >
                            <div class="door_operator_logo"> <img src="${e.filePath}" alt="${e.companyOperatorTypeName}"></div>
                            <div class="door_operator_select_box">
                                <select index='${index}' name="${e.companyOperatorTypeName}">
                                
                                </select>
                                <span class="error"></span>
                            </div>
                        </div>
                    </div>`
                        );
                    });
                }
                page_loader.hide();
                doorOperatorEvent ();

            },
            error: function(xhr, status, error) {
                errorCame(error);
                page_loader.hide();
            }

        });



// this is  for track 

trackData (dataForPostObj.doorTypeId);
    
}

// for door operator select box 
function doorOperatorEvent (){

    let doorOperatorSelect = document.querySelectorAll('#doorOperator .door_operator_col_inr');

    for (let i = 0; i < doorOperatorSelect.length; i++){
        let companyOperatorTypeId = doorOperatorSelect[i].getAttribute('companyOperatorTypeId');

page_loader.show();
    $.ajax({
        url: `${path_of_site}CompanyOperator/CompanyOperatorByTypeId?CompanyOperatorTypeId=${companyOperatorTypeId}`,
        type: 'GET',
        headers: {
            'Authorization':'Bearer ' + token,
        },
        success: function(data) {
    
            JSON.stringify(data);
            $('#doorOperator .door_operator_select_box select').eq(i).siblings(".error").text("");
    
            if(data.payload == null || data.payload == undefined){
                $('#doorOperator .door_operator_select_box select').eq(i).siblings(".error").text("Data does not exist");
            }
            else{
                document.querySelectorAll('#doorOperator .door_operator_select_box select')[i].innerHTML = null;
                document.querySelectorAll('#doorOperator .door_operator_select_box select')[i].insertAdjacentHTML('beforeend', 
                 `<option value="" >Select Operator</option>`);

                data.payload.forEach(e=>{
                 document.querySelectorAll('#doorOperator .door_operator_select_box select')[i].insertAdjacentHTML('beforeend', 
                 `<option company_Operator_Id=${e.company_Operator_Id} value="${e.company_Operator_Name}" title="$${e.company_Operator_Sale_Price}" salePrice="${e.company_Operator_Sale_Price}">${e.company_Operator_Name}</option>`);
                });
            }
            page_loader.hide();
            
    
        },
        error: function(xhr, status, error) {
            errorCame(error);
            page_loader.hide();
        }
    
    });
}



$('#doorOperator .door_operator_select_box select').on('change', function(){

    $(this).closest('.door_operator_col_inr').addClass('selected');

    if($(this).attr('index') == 0){
        $('#quotation_liftmaster span').eq(0).text($(this).attr("name"));
        $('#quotation_liftmaster span').eq(1).text($(this).val());

    }
    if($(this).attr('index') == 1){
        $('#quotation_genie span').eq(0).text($(this).attr("name"));
        $('#quotation_genie span').eq(1).text($(this).val());

    }
    if($(this).attr('index') == 2){
        $('#quotation_marantech span').eq(0).text($(this).attr("name"));
        $('#quotation_marantech span').eq(1).text($(this).val());

    }

    if(!$(this).val()){
        $(this).closest('.door_operator_col_inr').removeClass('selected');
        if($(this).attr('index') == 0){
            $('#quotation_liftmaster span').eq(0).text('');
            $('#quotation_liftmaster span').eq(1).text('');
    
        }
        if($(this).attr('index') == 1){
            $('#quotation_genie span').eq(0).text('');
            $('#quotation_genie span').eq(1).text('');
    
        }
        if($(this).attr('index') == 2){
            $('#quotation_marantech span').eq(0).text('');
            $('#quotation_marantech span').eq(1).text('');
    
        }
    }
});


}

function trackData (DoorTypeId){
    $.ajax({
        url: `${path_of_site}DoorVisulization/GetVisulizationTrackType?DoorTypeId=${DoorTypeId}`,
        type: 'POST',
        headers: {
            'Authorization':' Bearer ' + token,
        },
        success: function(data) {

            JSON.stringify(data);

            document.querySelector('#normal_track_data ul').innerHTML = null;
            document.querySelector('#trackpostdata ul').innerHTML = null;
            $('#track_for_quatation').text('');

            data.payload.forEach((e, index)=>{
                document.querySelector('#normal_track_data ul').insertAdjacentHTML('beforeend', `<li trackTypeId='${e.trackTypeId}' data-index="${index}">${e.trackDescription}</li>`);

            });
            $('#normal_track_data ul li').eq(0).addClass('selected');
            trackPrice($('#normal_track_data ul li').eq(0).attr('trackTypeId'));
            $('#track_for_quatation').text($('#normal_track_data ul li').eq(0).text());
            document.querySelector('#trackpostdata #tracktext_box').innerHTML= null;


            $('#normal_track_data ul li').click(function(){
                $('#normal_track_data ul li').removeClass('selected');
                $(this).addClass('selected');

                trackPrice($(this).attr('trackTypeId'));
                $('#track_for_quatation').text($(this).text());

                $('#jamb_material_for_quatation').text('');
                $('#jamb_mount_for_quatation').text('');
                document.querySelector('#trackpostdata #tracktext_box').innerHTML= null;

            });
            },
            error: function(xhr, status, error) {
                errorCame(error);
                page_loader.hide();

            }
        });
}
function trackPrice(trackTypeID){

    $.ajax({
        url: `${path_of_site}DoorVisulization/GetVisulizationTrackPrice`,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json-patch+json',
        data: `{ 
            trackTypeId: ${trackTypeID},
            doorHeight:${dataForPostObj.doorHeight},
            doorWidth: ${dataForPostObj.doorWidth}, }`,
        headers: {
            'Authorization':' Bearer ' + token,
        },
        success: function(data) {
            JSON.stringify(data);
            console.log(data.payload);
            document.querySelector('#trackpostdata ul').innerHTML = null;
            data.payload.forEach((e, index)=>{
                document.querySelector('#trackpostdata ul').insertAdjacentHTML('beforeend', `<li  class="price_tooltip" tooltip-data="$${e.salesPrice}" tsp='${e.salesPrice}' trackJambMaterialName="${e.trackJambMaterialName}" roofPitch="${e.roofPitch}" fullVert="${e.fullVert}" highLift="${e.highLift}"  data-index="${index}" >${e.trackCategoryName}</li>`);

            });

            $('#trackpostdata ul li').click(function(){
                // $('#trackpostdata ul li').removeClass('selected');
                $(this).toggleClass('selected');
                $('#jamb_material_for_quatation').text($(this).attr('trackJambMaterialName'));
                $('#jamb_mount_for_quatation').text($(this).text());
                let roofPitch = $('#trackpostdata ul li.selected').attr('roofPitch');
                let fullVert = $('#trackpostdata ul li.selected').attr('fullVert');
                let highLift = $('#trackpostdata ul li.selected').attr('highLift');

                console.log(roofPitch, fullVert, highLift);

                document.querySelector('#trackpostdata #tracktext_box').innerHTML= null;

                if(roofPitch == "true"){
                document.querySelector('#trackpostdata #tracktext_box').insertAdjacentHTML("beforeend", `<div class="col-3">
                <p>roofPitch</p><div><input type="number" val="1" min="1" max="9" class="w-100 py-2 px-3 rounder-theme"></div></div>`);}

                if(fullVert == "true"){
                document.querySelector('#trackpostdata #tracktext_box').insertAdjacentHTML("beforeend", `<div class="col-3">
                <p>fullVert</p><div><select name="fullVert"><option>this is dummy text</option></select></div></div>`);}

                if(highLift == "true"){
                document.querySelector('#trackpostdata #tracktext_box').insertAdjacentHTML("beforeend", `<div class="col-3">
                <p>highLift</p><div><select name="highLift"><option>this is dummy text</option></select></div></div>`);}


            });
        },
        error: function(xhr, status, error) {
            errorCame(error);
            page_loader.hide();

        }
    });
}


// click on spring 
function springTypeAPI(springcategorytypeid){

        page_loader.show();
        $.ajax({
            url: `${path_of_site}SpringCategory/SpringCategoryTypeId?SpringCategoryTypeId=${springcategorytypeid}`,
            type: 'GET',
            headers: {
                'Authorization':'Bearer ' + token,
            },
            success: function(data) {
        
                JSON.stringify(data);

                $('#spriingCyclage').empty();
                $('#spriingCyclage').siblings(".error").text('');
                if(data.payload == null){
                    $('#spriingCyclage').siblings(".error").text("Error: data does not exist");
                }
                else{
                 data.payload.forEach(e=>{
                document.querySelector('#spriingCyclage').insertAdjacentHTML('beforeend', ` <option springCategoryName="${e.springCategoryDesc} (${e.springCategoryName})" value="${e.springCategoryId}" springCategoryId="${e.springCategoryId}">${e.springCategoryDesc} (${e.springCategoryName})</option>`
                );
                 });

                 $("#cyclage_for_quatation").text($('#spriingCyclage option').eq(0).attr('springCategoryName'));
                 if($('#spriingCyclage option').eq(0).val()){
                    springChangeAPI_forPrice($('#spriingCyclage option').eq(0).val());
                }

                }
                page_loader.hide();
                
                $("#spriingCyclage").change(function(){
                    $("#cyclage_for_quatation").text($('#spriingCyclage option:selected', this).attr('springCategoryName'));
                    springChangeAPI_forPrice($(this).val());
                });
        
            },
            error: function(xhr, status, error) {
                errorCame(error);
                page_loader.hide();
            }
        
        });

}

function springChangeAPI_forPrice(springCategoryId){

    page_loader.show();
    let spring_data_div =  document.querySelector('#cyclage_info ul');
    spring_data_div.innerHTML = null;
    $('#cyclage_info ul').attr('cyclageiforfor_quotation', '');

    $.ajax({
        url: `${path_of_site}DoorVisulization/GetVisulizationSpringDetails`,
        type: 'POST',
        contentType: 'application/json-patch+json',
        dataType: 'json',
        data: `{ 
            springCategoryId : ${springCategoryId},
            doorModelId:${doorModelId},
            doorHeight: ${dataForPostObj.doorHeight},
            doorWidth: ${dataForPostObj.doorWidth}}`,
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Authorization':' Bearer ' + token,
        },
        success: function(data) {

             JSON.stringify(data);
            $('#spring_price_label').empty();
            $('#spring_price_label').removeClass();

            if(data.errors != null || data.errors != undefined){
                $('#spring_price_label').text(data.errors);
                $('#spring_price_label').removeClass('blue');
                $('#spring_price_label').addClass('red');
            }
            else{
                $('#spring_price_label').removeClass('red');
                $('#spring_price_label').addClass('blue');
  
                data.payload.forEach(e=>{
                   
                    $('#spring_price_label').text(`Price: $${e.springSalesPrice}`);
                    $('#spring_price_label').attr('sprp', e.springSalesPrice);
                    
                    if(e.blackCone){
                        $('#cyclage_info ul').attr('cyclageiforfor_quotation', `Black Cone, spring Turns:${e.springTunes}, spring Balance Weight:  ${e.springBalanceWeight}, Spring Length:  ${e.springLength}, spring Wire Size: ${e.springWireSize}`);

                        spring_data_div.insertAdjacentHTML('beforeend' , `<li> <span>black Cone: </span> <strong> Yes</strong></li>`);

                    }
                    if(e.redCone){
                        $('#cyclage_info ul').attr('cyclageiforfor_quotation', `Red Cone, spring Turns:${e.springTunes}, spring Balance Weight:  ${e.springBalanceWeight}, Spring Length:  ${e.springLength}, spring Wire Size: ${e.springWireSize}`);
                        spring_data_div.insertAdjacentHTML('beforeend' , `<li> <span>Red Cone: </span> <strong> Yes</strong></li>`);

                    }
                    spring_data_div.insertAdjacentHTML('beforeend' , `<li> <span>spring Turns: </span> <strong> ${e.springTunes}</strong></li>`);
                    spring_data_div.insertAdjacentHTML('beforeend' , `<li> <span>spring Balance Weight: </span> <strong> ${e.springBalanceWeight}</strong></li>`);
                    spring_data_div.insertAdjacentHTML('beforeend' , `<li> <span>spring Length: </span> <strong> ${e.springLength}</strong></li>`);
                    spring_data_div.insertAdjacentHTML('beforeend' , `<li> <span>Price: </span> <strong> $${e.springSalesPrice}</strong></li>`);
                    spring_data_div.insertAdjacentHTML('beforeend' , `<li> <span>spring Quantity: </span> <strong id="spring_quantity_number"> ${e.springQuantity}</strong></li>`);
                    spring_data_div.insertAdjacentHTML('beforeend' , `<li> <span>spring Wire Size: </span> <strong> ${e.springWireSize}</strong></li>`);



                });
                
            }
            page_loader.hide();

            
            },
            error: function(xhr, status, error) {
                errorCame(error);
                page_loader.hide();
            }
});

}

//======================== static API end =========================================================================

















// API for quotation 



$('.add_to_cart').on('click', function(){
    saveQuotationData(false);
});

$('#generateQuotation').on('click', function(e){
    e.preventDefault();
    let confirmToSave = confirm("are you sure .?");
    
    if(confirmToSave){
        saveQuotationData(true);
    }
});




function saveQuotationData (fromSubmit) {

    
    $('#quotation_loader').show();

    $('#create_img ul.flipwindow').addClass('flipodd');
    $('#create_img ul.flipodd').removeClass('flipwindow');


    var sectionImage;
    var modelImg;

    var quotationID = 0;

    html2canvas(document.getElementById('image_download_section'), { useCORS: true, allowTaint: true }).then(function(canvas) {
    
        sectionImage = canvas.toDataURL();
        const downloadLink = document.createElement("a");
        downloadLink.href = sectionImage;
        downloadLink.download = "div_image.png"; 

        // downloadLink.click();

    });





    
        const imageTag = document.querySelector("#model_number_img img");
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = imageTag.width;
          canvas.height = imageTag.height;
          ctx.drawImage(imageTag, 0, 0, imageTag.width, imageTag.height);
          const base64Image = canvas.toDataURL("image/png");
          modelImg = base64Image;



    
        
    
      
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


        //===========this is window insert arr ===============
        let selectedwindowidarr = [];
            document.querySelectorAll('#create_img .window_img img').forEach(e=>{
                if(e.getAttribute('windowid') !== null && e.getAttribute('windowid') !== undefined){
                selectedwindowidarr.push(e.getAttribute('windowid'));
                }
            });

         let windowInsertModel = [];
            for(let i = 0;i < selectedwindowidarr.length; i++){
                let windowobj = `{"quotationItemId": 0, "windowInsertId": ${selectedwindowidarr[i]}}` 
                windowInsertModel.push(windowobj);
            };

            //===========end ==========

        //===========this is window glazing arr ===============

            let glazingidArr = [];
            document.querySelectorAll('#create_img .window_img img').forEach(e=>{
                if(e.getAttribute('glazingtype') !== null && e.getAttribute('glazingtype') !== undefined){
                    glazingidArr.push(e.getAttribute('glazingtype'));
                }
            });
            let windowGlassModel = [];
            for(let i = 0;i < glazingidArr.length; i++){
                let glazingobj = `{quotationItemId : 0, windowGlassId : ${glazingidArr[i]}}` 
                windowGlassModel.push(glazingobj);
            };  
            //=================end===============



       
          setTimeout(()=>{
    
            (fromSubmit === true)? quotationID = 0:'';

            let objForQuotation = `{
                "quotationId": ${quotationID},
                "customerId": 1,
                "vendorId":${vendorID},
                "companyId":1,
                "quotationNumber":0,
                "quotationSerialNumber": 0,
                "quotationDate": "",
                "quotationValidDays": 30,
                "statusFlag":"Y",
                "quotationItemId": 0,
                "doorTypeID": ${dataForPostObj.doorTypeId},
                "doorQuantity": ${$('#quantity_of_door').val()},
                "doorCompanyId": ${dataForPostObj.doorCompanyId},
                "doorHeight": ${dataForPostObj.doorHeight},
                "doorWidth": ${dataForPostObj.doorWidth},
                "doorCollectionId": ${$('#door_collection_btn button.selected').attr('doorcollectionid') || null},
                "doorSubCollectionId": ${$('#door_collection_family .door_family.selected').attr('doorsubcollectionid') || null},
                "doorPanelId": ${$('#panel_type .door_catogary.selected').attr('doorpanelid') || null},
                "doorModelId": ${$('#model_number_row .model_number_col.selected').attr('doormodelid') || null},
                "doorColorId": ${$('#select_color li.selected').attr('doorcolorid') || null},
                "windowQuantity": ${$('#windowQ').text() || 0},
                "windowGlassTypeId": 0,
                "windowGlassModel": [${windowGlassModel}],
                "windowInsertModel":[${windowInsertModel}],
                "springCategoryTypeId": ${$('#spring_data li.selected').attr('springcategorytypeid') || null},
                "springCategoryId": ${$('#spriingCyclage option:selected').attr('springcategoryid') || null},
                "doorSealTypeId": ${$('#sealData li.selected').attr('doorsealtypeid') || null},
                "doorLockId": ${$('#door_lock li.selected').attr('doorlockid') || null},
                "companyOperatorTypeId": ${$('#doorOperator .door_operator_col_inr.selected').attr('companyoperatortypeid') || null},
                "companyOperatorId": ${$('#doorOperator .selected option:selected').attr('company_operator_id') || null},
                "strutCategoryTypeId": ${$('#strutData li.selected').attr('sturtcategorytypeid') || null},
                "strutCategoryId": ${$('#extrastrutData li.selected').attr('sturtcategoryid') || null},
                "extraStrutQuantity": ${$('#strut_quantity input').val() || 0 },
                "doorImage": "${sectionImage}",
                "doorModelImage":"${modelImg}"}`

    
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
    
                 quotationID = data.payload.id;

                 (fromSubmit === true)? quotationID = 0:'';

                $('#quotation_loader').hide();

                 successCame(data.message);
                 if((fromSubmit === true)){
                 setTimeout(() => {
                    window.open(document.getElementById('generateQuotation').getAttribute('href'), '_blank');

                    $('#create_img ul.flipodd').addClass('flipwindow');
                    $('#create_img ul.flipwindow').removeClass('flipodd');
                    
                 }, 500);
                }
                },
                error: function(xhr, status, error) {
                    errorCame(error);
                    page_loader.hide();
                    $('#quotation_loader').hide();

        
                }
            });
          }, 1000);
    }

  
