

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
          document.querySelector('#door_lock ul').insertAdjacentHTML('beforeend', `<li doorLockId = "${e.doorLockId}">
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
        document.querySelector('#door_lock').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);
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
         data.payload.forEach(e=>{
          document.querySelector('#spring_data ul').insertAdjacentHTML('beforeend', ` <li springCategoryTypeId="${e.springCategoryTypeId}">${e.springCategoryTypeName}</li>`
          );
         });
        springTypeClick();
        page_loader.hide();

    },
    error: function(xhr, status, error) {
        document.querySelector('#spring_data').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);
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


        $("#sealData ul li").click(function(){
            let selectedSeal = [];
            $(this).toggleClass('selected');

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
        document.querySelector('#sealData').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);
        page_loader.hide();
    }

});

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
             document.querySelector('#strutData ul').insertAdjacentHTML('beforeend', ` <li sturtCategoryTypeId="${e.sturtCategoryTypeId}">
             ${e.sturtCategoryTypeName}
             </li>`
             );
            });
   
        }
        page_loader.hide();
        clickStrut();



    },
    error: function(xhr, status, error) {
        $('#strutData .error').text("Error:"+error);
        page_loader.hide();
    }

});

// this is for click on strut and append extra strut 
function clickStrut(){
    $('#strutData ul li').click(function(){

        $(this).siblings().removeClass('selected');
        $(this).toggleClass('selected');
        $('#strut_for_quatation').text($("#strutData ul li.selected").text());

       let this_id =  $(this).attr("sturtcategorytypeid");


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
                     document.querySelector('#extrastrutData ul').insertAdjacentHTML('beforeend', ` <li sturtCategoryId="${e.sturtCategoryId}">
                     ${e.sturtCategoryName}
                     </li>`
                     );
                    });
                    
                    document.querySelector('#strut_quantity').insertAdjacentHTML('beforeend', 
                    `<p>Extra Strut Quantity</p>
                    <div>
                        <input type="number" class="w-100 py-2 px-3 rounder-theme">
                    </div>`
                     );
           
                }
                page_loader.hide();
        
            },
            error: function(xhr, status, error) {
                $('#extrastrutData .error').text("Error:"+error);
                page_loader.hide();
            }
        
        });











        
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
             document.querySelector('#doorOperator').insertAdjacentHTML('beforeend', `<div class="col-lg-4 col-md-6 col-sm-12 ">
                <div class="door_operator_col_inr border_2px" data-index="${index}" company_Operator_Type_Id="${e.company_Operator_Type_Id}" company_Operator_Type_Name=${e.company_Operator_Type_Name} >
                    <div class="door_operator_logo"> <img src="${e.file_Path}" alt="${e.company_Operator_Type_Name}"></div>
                    <div class="door_operator_select_box">
                        <select name="${e.company_Operator_Type_Name}">
                        
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
        $('#doorOperator').siblings(".error").text("Error:"+error);
        page_loader.hide();
    }

});


}

// for door operator select box 
function doorOperatorEvent (){

    let doorOperatorSelect = document.querySelectorAll('#doorOperator .door_operator_col_inr');

    for (let i = 0; i < doorOperatorSelect.length; i++){
        let company_operator_type_id = doorOperatorSelect[i].getAttribute('company_operator_type_id');

page_loader.show();
    $.ajax({
        url: `${path_of_site}CompanyOperator/CompanyOperatorByTypeId?CompanyOperatorTypeId=${company_operator_type_id}`,
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
                data.payload.forEach(e=>{
                 document.querySelectorAll('#doorOperator .door_operator_select_box select')[i].insertAdjacentHTML('beforeend', 
                 `<option company_Operator_Id=${e.company_Operator_Id} value="${e.company_Operator_Name}" salePrice="${e.company_Operator_Sale_Price}">${e.company_Operator_Name}</option>`);
                });
            }
            page_loader.hide();
            
    
        },
        error: function(xhr, status, error) {
            $('#doorOperator .door_operator_select_box select').siblings(".error").text("Error:"+error);
            page_loader.hide();
        }
    
    });
}


$('#doorOperator .door_operator_select_box select').on('change', function(){
    $("#doorOperator_companyName").text($(this).attr("name"));
    $('#doorOperatorModel').text(`, ${$(this).val()}`);
    $('.door_operator_col_inr').removeClass('selected');
    $(this).closest('.door_operator_col_inr').addClass('selected');

});





}




// setTimeout(forOtherData,5000);


// click on spring 
function springTypeClick(){
    
    $("#spring_data ul li").click(function(){
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');

        $('#Spring_for_quatation').text($(this).text());
        console.log($(this).text())

        let springcategorytypeid = $(this).attr('springcategorytypeid');
        page_loader.show();
        $.ajax({
            
            url: `${path_of_site}SpringCategory/${springcategorytypeid}`,
            type: 'GET',
            headers: {
                'Authorization':'Bearer ' + token,
            },
            success: function(data) {
        
                JSON.stringify(data);

                $('#spriingCyclage').html("");
                $('#spriingCyclage').siblings(".error").text('');
                if(data.payload == null){
                    
                    $('#spriingCyclage').siblings(".error").text("Error: data does not exist");
                }
                else{
                    document.querySelector('#spriingCyclage').insertAdjacentHTML('beforeend', ` <option>Select Cyclage</option>`
                );
                console.log(data.payload);
                //  data.payload.forEach(e=>{
                document.querySelector('#spriingCyclage').insertAdjacentHTML('beforeend', ` <option springCategoryName="${data.payload.springCategoryName}" value="${data.payload.springCategoryId}" springCategoryId="${data.payload.springCategoryId}">${data.payload.springCategoryName}</option>`
                );
                //  });
                }
                page_loader.hide();
                
                $("#spriingCyclage").change(function(){
                    
                    $("#cyclage_for_quatation").text($('option:selected', this).attr('springCategoryName'));
                });
        
            },
            error: function(xhr, status, error) {
                document.querySelector('#spriingCyclage').parentElement().insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);
                page_loader.hide();
            }
        
        });

    });
}
