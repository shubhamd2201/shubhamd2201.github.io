var path_of_site = "http://doorportal-001-site1.etempurl.com/v1/";
var page_loader = $('#loader');
let token = "";

var doorTypeId = null;
var doorCompanyId = 11;

let dataForPostObj = {
    doorHeight: null,
    doorWidth: null,
    doorTypeId: null,
    doorCompanyId:null
}


 // door size function

 var size_button = $('#size_button button');
 let width_arr = [8,9,9,10,16,16,18];
let height_arr = [7,7,8,8,7,8,7];

let selected_width_ft = null;
let selected_height_ft = null;
let selected_width_in = 0;
let selected_height_in = 0;

$('#customSize input').on('input', function(){
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
    
    }
    $('#size_button button').removeClass('selected');
    $('#width_for_quatation_ft').text(selected_width_ft+"'ft");
    $('#height_for_quatation_ft').text(selected_height_ft+"'ft");
    $("#width_for_quatation_inch").text(selected_width_in+"in");
    $("#height_for_quatation_inch").text(selected_height_in+"in");

    if(selected_width_ft != null && selected_width_in != null && selected_height_ft != null && selected_height_in != null){
        dataForPostObj.doorWidth = selected_width_ft+"."+selected_width_in;
        dataForPostObj.doorHeight = selected_height_ft+"."+selected_height_in;
        
    }


    if ($(this).val() === '') {
        $(this).addClass('error-border');
    } else {
        $(this).removeClass('error-border');
    }

    if(dataForPostObj.doorHeight != null && dataForPostObj.doorWidth != null && doorPanelId != null && doorModelId != null){

        console.log("create image with size button");
        createImgwithModel();
    }


});

$('#customSize input').on('blur', function (){
    if ($(this).val() === '') {
        $(this).addClass('error-border');
    } else {
        $(this).removeClass('error-border');
    }
});


size_button.click(function(){
    size_button.removeClass('selected');
    $(this).addClass('selected');
    
    var this_index = $(this).attr('tab-index');
    selected_width_ft = width_arr[this_index];
    selected_height_ft = height_arr[this_index];

    
    $('#width_for_quatation_ft').text(selected_width_ft+"'ft");
    $('#height_for_quatation_ft').text(selected_height_ft+"'ft");
    $("#width_for_quatation_inch").text(selected_width_in+"in");
    // $("#height_for_quatation_inch").text(selected_height_in+"in");


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

    if(dataForPostObj.doorHeight != null && dataForPostObj.doorWidth != null && doorPanelId != null){
        createImgwithModel();
    }

});



// door size function end 

        var settings = {
            "url": path_of_site+"Account/Authenticate",
            "method": "POST",
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
                            $('#type_of_doors').siblings(".error").text('Error: Data Does not exist');
                           }
                           else{
                           data.payload.forEach(e=>{
                            document.querySelector('#type_of_doors').insertAdjacentHTML('beforeend', `<option doorTypeId = "${e.doorTypeId}" value = "${e.doorTypeId}" doorType="${e.doorTypeName}"> ${e.doorTypeName} </option>`);
                           });

                            $('#type_of_door_quatation').text(data.payload[0].doorTypeName);

                            dataForPostObj.doorTypeId = data.payload[0].doorTypeId;
                        }
                            page_loader.hide();
    
                      },
                      error: function(xhr, status, error) {
                          document.querySelector('.type_of_doors  .select_box').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);
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
                         document.querySelector('#door_company').innerHTML = null;
                         $('#door_company').siblings('.error').text('');

                         if(data.payload == null || data.payload == undefined){
                            $('#door_company').siblings('.error').text('Error: Data does not exist');
                         }
                         else{
                            data.payload.forEach(e=>{
                            document.querySelector('#door_company').insertAdjacentHTML('beforeend', `<option doorCompanyId = "${e.doorCompanyId}" doorComapanyName="${e.doorCompanyName}" value = "${e.doorCompanyId}" > ${e.doorCompanyName} </option>`);
                            });
                            
                            $('#door_company_quatation').text(data.payload[0].doorCompanyName);
                            dataForPostObj.doorCompanyId = data.payload[0].doorCompanyId;
                        }
                          page_loader.hide();
                    },
                    error: function(xhr, status, error) {
                        document.querySelector('.door_company .select_box').innerHTML = null;
                        document.querySelector('.door_company .select_box').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);
        
                        page_loader.hide();
        
        
                    }
                });
        

                  $.ajax({
                      url: `${path_of_site}DoorCollection/DoorCollectionByTypeCompanyId?DoorTypeId=1&DoorCompanyId=${doorCompanyId}`,
                      type: 'GET',
                      headers: {
                          'Authorization':'Bearer ' + token,
                      },
                      success: function(data) {
                           JSON.stringify(data);
                           document.querySelector('#door_collection_btn').innerHTML = null;
                           
                           data.payload.forEach(e=>{
                            document.querySelector('#door_collection_btn').insertAdjacentHTML('beforeend', `<button doorCollectionId = "${e.doorCollectionId}" > ${e.doorCollectionName} </button>`);
                           });
      
                            $('#collection_for_quatation').text(data.payload[0].doorCollectionName+' collection')
                          
                            $('#door_collection_btn button:first').addClass('selected');
                            append_door_sub_collection();
                            page_loader.hide();
                      },
                      error: function(xhr, status, error) {
                          document.querySelector('#door_collection_btn').innerHTML = null;
                          document.querySelector('#door_collection_btn').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);
                          page_loader.hide();
                      }
                  });
      
        
              }

            var doorCollectionId_loaded = $('#door_collection_btn button.selected').attr('doorcollectionid');

              $.ajax({
                url: `${path_of_site}DoorSubCollection/GetDoorCollectionListById?DoorCollectionId=1`,
                type: 'GET',
                headers: {
                    'Authorization':'Bearer ' + token,
                },
                success: function(data) {
   
                     JSON.stringify(data);
                     document.querySelector("#door_collection_family").innerHTML = null;
                
                     data.payload.forEach(e=>{
                       document.querySelector("#door_collection_family").insertAdjacentHTML('beforeend', `<div class="col-lg-2 col-md-4 col-sm-6">
                       <div class="door_family p-2" doorSubCollectionId="${e.doorSubCollectionId}"f>
                           <div class="img d-table mx-auto mb-2">
                               <img src="${e.filePath}" alt="${e.doorSubCollectionName}">
                           </div>
                           <p class="mb-0 ">${e.doorSubCollectionName}</p>
                       </div>
                   </div>`);
                     });

                     $('#family_for_quatation').text(data.payload[0].doorSubCollectionName+' Family');
                     
                   page_loader.hide();

                   append_door_sub_collection();
                    DoorCategory_event();


                },
                error: function(xhr, status, error) {
                   document.querySelector('#door_collection_family').innerHTML = null;

                    document.querySelector('#door_collection_family').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);
           
                   page_loader.hide();
   
                }
                

            });
          });








    
      //   this is for diffrent company name 
     $('#type_of_doors').on('change',function(){
        doorTypeId = $(this).val();
        dataForPostObj.doorCompanyId = $(this).doorCompanyId;
        forDoorCompany(doorTypeId);

    });
     
     function forDoorCompany(doorTypeId){
        
        
        page_loader.show();
        $.ajax({
            url: path_of_site+"DoorCompany/DoorCompany",
            type: 'GET',
            headers: {
                'Authorization':'Bearer ' + token,
            },
            success: function(data) {
        
                JSON.stringify(data);

                $('#door_company').empty();
                $('#door_collection_btn').empty();
                $('#door_collection_family').empty();
                $('#panel_type').empty();
                $('#model_number_row').empty();

                clearDataFromModel();


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
                  

            },
            error: function(xhr, status, error) {
                document.querySelector('.door_company .select_box').innerHTML = null;
                document.querySelector('.door_company .select_box').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);
                page_loader.hide();


            }
        });

        $('#type_of_door_quatation').text($('option:selected', this).attr('doorType'));


    }
    


    
     // this is for DoorCollection append timeless
           $('#door_company').on('change',function(){
            doorCompanyId = $(this).val()
            forDoorCollection(doorCompanyId);
            $('#door_company_quatation').text(", "+$('#door_company option:selected').attr('doorComapanyName'));

            

           }) ;
    
           function forDoorCollection(doorCompanyVal){

            doorCompanyId = doorCompanyVal;
           
            page_loader.show();
            $.ajax({
                url: `${path_of_site}DoorCollection/DoorCollectionByTypeCompanyId?DoorTypeId=1&DoorCompanyId=${doorCompanyId}`,
                type: 'GET',
                headers: {
                    'Authorization':'Bearer ' + token,
                },
                success: function(data) {
                     JSON.stringify(data);


                    $('#door_collection_btn').empty();
                     $('#door_collection_family').empty();
                     $('#panel_type').empty();
                     $('#model_number_row').empty();


                     clearDataFromModel();

                     
                     data.payload.forEach(e=>{
                      document.querySelector('#door_collection_btn').insertAdjacentHTML('beforeend', `<button doorCollectionId = "${e.doorCollectionId}" > ${e.doorCollectionName} </button>`);
                     });

                    
                     append_door_sub_collection();
                      page_loader.hide();
                },
                error: function(xhr, status, error) {
                    document.querySelector('#door_collection_btn').innerHTML = null;
                    document.querySelector('#door_collection_btn').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);
                    page_loader.hide();
                }
            });
        } ;
 


    // this is for DoorSubCollection append raised panel and click on timeless
    function append_door_sub_collection(){
            $('#door_collection_btn button').click(function(){
                page_loader.show();
        
                $(this).siblings().removeClass('selected');
                $(this).addClass('selected');

                const doorCollectionId = $(this).attr('doorCollectionId');
     
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
                        document.querySelector("#door_collection_family").insertAdjacentHTML('beforeend', `<div class="col-lg-2 col-md-4 col-sm-6">
                        <div class="door_family p-2" doorSubCollectionId="${e.doorSubCollectionId}"f>
                            <div class="img d-table mx-auto mb-2">
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
                    document.querySelector('#door_collection_family').innerHTML = null;

                     document.querySelector('#door_collection_family').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);
            
                    page_loader.hide();
    
                 }

             });

             $('#family_for_quatation').text($(this).text() + " collection");

            
            });
    }


    //DoorCategory this is for click on raised panel and append short long panel
    function DoorCategory_event(){
        $('#door_collection_family .door_family').click(function(){
            
            $('#door_collection_family .door_family').removeClass('selected');
            $(this).addClass('selected');
            const SubSubCollectionId = $(this).attr('doorSubcollectionid');

            if(selected_height_ft != null && selected_width_ft != null){
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
                       `<div class="col-lg-3 col-md-4 col-sm-6 ">
                       <div class="door_catogary  bg-light rounded " doorPanelId="${e.doorPanelId}">
                           <div class="img">
                               <img src="${e.filePath}" alt="">
                           </div>
                           <p class="mb-0">${e.doorPanelName}</p>
                       </div>
                   </div>`);
                     });

                   page_loader.hide();
                    to_append_model_number();
                     
                },
                error: function(xhr, status, error) {
                    document.querySelector('#panel_type').innerHTML = null;
                    document.querySelector('#panel_type').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);

                   page_loader.hide();
   
                }
            });
        }
        else{
            alert('please select width and height');
            page_loader.hide();
            $('#door_collection_family .door_family').removeClass('selected');

        }
        });
    }



// this is for append model number and click on panel type 
let doorPanelId;
let repeatedFile;
let doorModelId;

function to_append_model_number(){
    $("#panel_type .door_catogary").click(function(){
        page_loader.show();

        $('#window_quantity_for_quatation').text(`Window Quantity:0`);
         $('#windowQ').text("0");

         doorPanelId = $(this).attr('doorPanelId');
        
        $("#panel_type .door_catogary").removeClass('selected');
        $(this).addClass('selected');

        $('#panel_type_for_quatation').text(' ,'+ $(this).text());



        //-============================-==========================
        createImgwithModel();
        //======================

        forOtherData();
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
}

function createImgwithModel(){
    clearDataFromModel();


    if(dataForPostObj.doorHeight == null || dataForPostObj.doorWidth == null){

    alert('Please select Door Size');

    }

    else{
    $.ajax({
        url: `${path_of_site}DoorVisulization/GetVisulizationModelHeightSection`,
        type: 'POST',
        contentType: 'application/json-patch+json',
        dataType: 'json',
        data: `{ 
            doorHeight:${dataForPostObj.doorHeight},
            doorWidth: ${dataForPostObj.doorWidth},
            doorTypeId: ${dataForPostObj.doorTypeId},
            doorCompanyId: ${dataForPostObj.doorCompanyId}}`,
        headers: {
            'Authorization':'Bearer ' + token,
        },
        success: function(data) {

             JSON.stringify(data);

             document.querySelector("#model_number_row").innerHTML = null;
             $("#model_number_row").siblings('.error').text('');
            if(data.payload.length < 1 || data.payload == undefined){
                $("#model_number_row").siblings('.error').text('data not found');
            }
            else{
                 data.payload.forEach((e, index)=>{
                   document.querySelector("#model_number_row").insertAdjacentHTML('beforeend', 
                       `<div class="model_number_col p-2 bg-light" data-index="${index}" doorModelId="${e.doorModelId}" doorSalePrice="${e.doorSalePrice}" doorModelPath="${e.doorModelPath}" doorModelDesc='${e.doorModelDesc}' noOfSection="${e.noOfSection}">
                       <div class="model_number_col_inr text-center h-100 d-flex">
                           <p class="mb-1 fs-6 model_num">${e.doorModelName}</p>
                           <span class="quality_of_model px-2 py-1 text-bg-secondary text-white text-capitalize fw-semibold">Best</span>
                           <p class="mb-1 fs-6"> R-17-19</p>
                       </div>
                   </div>`);

                 });

            $("#model_number_row").siblings('.error').text('');
           page_loader.hide();
           


         $('.model_number_col').mouseenter(function(){
            $('.modelDesc').text($(this).attr("doorModelDesc"));
            $('#model_number_img img').attr("src", $(this).attr("doorModelPath"));
        });

        $('.model_number_col').mouseleave(function(){
            $('.modelDesc').text($(this).siblings('.selected').attr(("doorModelDesc")));
            $('#model_number_img img').attr("src", $(this).siblings('.selected').attr(("doorModelPath")));
        });


        $('.model_number_col').click(function(){

            $('.model_number_col').removeClass('selected');
            $(this).addClass('selected');
            $('.modelDesc').text($(this).attr("doorModelDesc"));
            $('#model_number_img img').attr("src", $(this).attr("doorModelPath"));
    
            $('#model_number_for_quatation').text($(this).find(".model_num").text());
    
            

            doorModelId = $(this).attr('doorModelId');
            let clickedThis = $(this);
            let colorArr = data.payload[$(this).attr('data-index')].lstDoorColor;

            
            if(doorPanelId == null || doorModelId == null){
               
                (doorPanelId == null)?alert("please select panel type"):'';
                (doorModelId == null)?alert("please select Model"):'';

            }
            else{
            calledDataForImageCreate(clickedThis, colorArr);

            }
                
        
        });
     
        }
             
        },
        error: function(xhr, status, error) {
            document.querySelector('#model_number_row').innerHTML = null;
            document.querySelector('#model_number_row').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);

           page_loader.hide();

        }
    });
    
}
}


// GetVisulizationWidhtSection API 
function calledDataForImageCreate(clickedThis, colorArr){

    page_loader.show();
    $.ajax({
        url: `${path_of_site}DoorVisulization/GetVisulizationWidhtSection`,
        type: 'POST',
        contentType: 'application/json-patch+json',
        dataType: 'json',
        data: `{ 
            doorWidth:${dataForPostObj.doorWidth},
            doorCompanyId:${doorCompanyId},
            doorPanelId: ${doorPanelId},
            doorModelId:${doorModelId},
            }`,
        headers: {
            'Authorization':'Bearer ' + token,
        },
        success:  function(data) {
            JSON.stringify(data);

            if(data.payload.length < 1 || data.payload[0].noOfSection == null ){

                page_loader.hide();
                alert("Data not found");

            }
            else if(data.payload[0].repeatedFile == undefined || data.payload[0].repeatedFile == null){

                alert("Image not found");

            }
            else{

                $('.your_door_design').hide();
                $('.image_grid_parent.append_grid').show();
                $('.left_btns').show();

                let numberOfColumn =  data.payload[0].noOfSection;
                repeatedFile =  data.payload[0].repeatedFile;
                

                createImageRowColumn(clickedThis, numberOfColumn, repeatedFile, colorArr);

            }


            page_loader.hide();
        },
        error: function(xhr, status, error) {
            document.querySelector('#model_number_row .error').text('');
            document.querySelector('#model_number_row .error').text(`Error: ${error}`);
            page_loader.hide();
        }
    });
}



















    // for testing of API
    // setTimeout(for_test, 5000);
       function  for_test(){
            page_loader.show();
        
            // door color 
            // http://doorportal-001-site1.etempurl.com/v1/DoorColor

            // http://doorportal-001-site1.etempurl.com/v1/SpringCategory/2
            // strut catogary 

            $.ajax({
                url: `http://doorportal-001-site1.etempurl.com/v1/SturtCategory/GetSturtCategoryTypeId?SturtCategoryTypeId=1`,
                type: 'GET',
                headers: {
                    'Authorization':'Bearer ' + token,
                },
                success: function(data) {
   
                     JSON.stringify(data);
                    //  document.querySelector("#panel_type").innerHTML = null;
                    //  data.payload.forEach(e=>{
                      
                    //  });
                    // console.log(data.payload)
                   page_loader.hide();
   
                     
                },
                error: function(xhr, status, error) {
                    document.querySelector('#panel_type').innerHTML = null;
                    document.querySelector('#panel_type').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);

                   page_loader.hide();
   
                }
            });
        };





        // click on window glass 

        $("#window_glass ul li").click(function(){
            $("#window_glass ul li").removeClass("selected");
            $(this).addClass("selected");
            
           $('#window_type').show();
        
           if(doorPanelId == 1){
            $('#long_panel').hide();
            $('#short_panel').show();
        
           }
           else if(doorPanelId == 2){
            $('#short_panel').hide();
            $('#long_panel').show();
        
           }
        
           setGlass();
        
        });
