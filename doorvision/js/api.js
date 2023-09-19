    var path_of_site = "http://doorportal-001-site1.etempurl.com/v1/";
    var page_loader = $('#loader');
    let token = "";

    var doorTypeId = null;
    var doorCompanyId = null;


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
                           data.payload.forEach(e=>{
                            document.querySelector('#type_of_doors').insertAdjacentHTML('beforeend', `<option doorTypeId = "${e.doorTypeId}" value = "${e.doorTypeId}" doorType="${e.doorTypeName}"> ${e.doorTypeName} </option>`);
                           });
                            page_loader.hide();
    
                      },
                      error: function(xhr, status, error) {
                          document.querySelector('.type_of_doors  .select_box').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);
                          page_loader.hide();
                      }
                  });
              }
          });
    
        //   this is for diffrent company name 
     $('#type_of_doors').on('change', function(){

            doorTypeId = $(this).val();

            page_loader.show();
            $.ajax({
                url: path_of_site+"DoorCompany/DoorCompany",
                type: 'GET',
                headers: {
                    'Authorization':'Bearer ' + token,
                },
                success: function(data) {
            
                     JSON.stringify(data);
                     document.querySelector('#door_company').innerHTML = null;
                     
                     document.querySelector('#door_company').insertAdjacentHTML('beforeend', `<option  > Select Door Company </option>`);

                     data.payload.forEach(e=>{
                      document.querySelector('#door_company').insertAdjacentHTML('beforeend', `<option doorCompanyId = "${e.doorCompanyId}" doorComapanyName="${e.doorCompanyName}" value = "${e.doorCompanyId}" > ${e.doorCompanyName} </option>`);
                     });
                     

                      page_loader.hide();
                forStaticData();

                },
                error: function(xhr, status, error) {
                    document.querySelector('.door_company .select_box').innerHTML = null;
                    document.querySelector('.door_company .select_box').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);

                    page_loader.hide();
    
    
                }
            });

            $('#type_of_door_quatation').text($('option:selected', this).attr('doorType'));


        });

  
    


    
     // this is for DoorCollection append timeless
           $('#door_company').on('change', function(){

            doorCompanyId = $(this).val();
           
            page_loader.show();
            $.ajax({
                // path_of_site+"DoorCollection/DoorCollectionByTypeCompanyId?DoorTypeId="+doorTypeId+"&DoorCompanyId="+doorCompanyId
                url: `${path_of_site}DoorCollection/DoorCollectionByTypeCompanyId?DoorTypeId=1&DoorCompanyId=${doorCompanyId}`,
                type: 'GET',
                headers: {
                    'Authorization':'Bearer ' + token,
                },
                success: function(data) {
                     JSON.stringify(data);
                     document.querySelector('#collection_and_family_btn').innerHTML = null;
                     
                     data.payload.forEach(e=>{
                      document.querySelector('#collection_and_family_btn').insertAdjacentHTML('beforeend', `<button doorCollectionId = "${e.doorCollectionId}" > ${e.doorCollectionName} </button>`);
                     });

                    
                     append_door_sub_collection();
                      page_loader.hide();
                },
                error: function(xhr, status, error) {
                    document.querySelector('#collection_and_family_btn').innerHTML = null;
                    document.querySelector('#collection_and_family_btn').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);
                    page_loader.hide();
                }
            });

            $('#door_company_quatation').text(", "+$('option:selected', this).attr('doorComapanyName'));
            

        } );
    
    
 










    
    
    // this is for DoorSubCollection append raised panel and click on timeless
    function append_door_sub_collection(){
            $('#collection_and_family_btn button').click(function(){
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
                      document.querySelector("#door_collection_family").innerHTML = null;
                      data.payload.forEach(e=>{
                        document.querySelector("#door_collection_family").insertAdjacentHTML('beforeend', `<label class="col-lg-3 col-md-6 col-sm-12 label_big_btn" or="for_family${e.doorCollectionId}">
                        <input type="radio" name="for_family" id="for_family${e.doorCollectionId}">
                        <div class="door_family " doorCollectionId="${e.doorCollectionId}"f>
                        
                            <div class="img d-table mx-auto mb-2">
                                <img src="${path_of_site+e.filePath}" alt="${e.doorSubCollectionName}">
                            </div>
                            <p class="mb-0 ">${e.doorSubCollectionName}</p>
                        </div>
                    </label>`);
                      });
                    DoorCategory_event()
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
            page_loader.show();
        
            $(this).siblings().removeClass('selected');
            $(this).addClass('selected');
            const DoorCategory = $(this).attr('doorcollectionid');

            $.ajax({
                url: `${path_of_site}DoorCategory/${DoorCategory}`,
                type: 'GET',
                headers: {
                    'Authorization':'Bearer ' + token,
                },
                success: function(data) {
   
                     JSON.stringify(data);
                     document.querySelector("#panel_type").innerHTML = null;

                    //  data.forEach(e=>{
                       document.querySelector("#panel_type").insertAdjacentHTML('beforeend', 
                       `<div class="col-lg-3 col-md-4 col-sm-6 ">
                       <div class="door_catogary  bg-light rounded " doorCategoryId="${data.payload.doorCategoryId}">
                           <div class="img">
                               <img src="./images/Raised_Panel_Short.jpg" alt="">
                           </div>
                           <p class="mb-0">${data.payload.doorCategoryName}</p>
                       </div>
                   </div>`);
                    //  });

                    to_append_model_number();
                   page_loader.hide();
   
                     
                },
                error: function(xhr, status, error) {
                    document.querySelector('#panel_type').innerHTML = null;
                    document.querySelector('#panel_type').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);

                   page_loader.hide();
   
                }
            });
        });
    }



// this is for append model number and click on panel type 

function to_append_model_number(){
    $("#panel_type .door_catogary").click(function(){
        page_loader.show();
        
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
        const Door_panel = $(this).attr('doorcategoryid');

        $.ajax({
            url: `${path_of_site}DoorModel/${Door_panel}`,
            type: 'GET',
            headers: {
                'Authorization':'Bearer ' + token,
            },
            success: function(data) {

                 JSON.stringify(data);
                 document.querySelector("#model_number_row").innerHTML = null;

                //  data.forEach(e=>{
                   document.querySelector("#model_number_row").insertAdjacentHTML('beforeend', 
                   `<div class="model_number_col p-2 bg-light" data-tab="Insulated">
                   <div class="model_number_col_inr text-center h-100 d-flex" doorModelId="${data.payload.doorModelId}">
                       <p class="mb-1 fs-6 model_num">${data.payload.doorModelName}</p>
                       <span class="quality_of_model px-2 py-1 text-bg-secondary text-white text-capitalize fw-semibold">Best</span>
                       <p class="mb-1 fs-6"> R-17-19</p>
                       <ul class="model_number_quality_bar d-flex ps-0 mb-0 gap_10 best">
                           <li><i class="bi bi-star-fill text-primary"></i></li>
                           <li><i class="bi bi-star-fill text-primary"></i></li>
                           <li><i class="bi bi-star-fill text-primary"></i></li>
                           <li><i class="bi bi-star-fill text-primary"></i></li>
                       </ul>
                   </div>
               </div>`);
                //  });
               page_loader.hide();

                 
            },
            error: function(xhr, status, error) {
                document.querySelector('#model_number_row').innerHTML = null;
                document.querySelector('#model_number_row').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);

               page_loader.hide();

            }
        });



    })
}







    // for testing of API
        // $('#type_of_doors').change(function(){
        //     page_loader.show();
        
        //     // door color 
        //     // http://doorportal-001-site1.etempurl.com/v1/DoorColor/1

        //     $.ajax({
        //         url: "http://doorportal-001-site1.etempurl.com/v1/InsulatedGlassMaster/2",
        //         type: 'GET',
        //         headers: {
        //             'Authorization':'Bearer ' + token,
        //         },
        //         success: function(data) {
   
        //              JSON.stringify(data);
        //             //  document.querySelector("#panel_type").innerHTML = null;
        //             //  data.payload.forEach(e=>{
                      
        //             //  });
        //              console.log(data.payload)
        //            page_loader.hide();
   
                     
        //         },
        //         error: function(xhr, status, error) {
        //             document.querySelector('#panel_type').innerHTML = null;
        //             document.querySelector('#panel_type').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);

        //            page_loader.hide();
   
        //         }
        //     });
        // });

    
