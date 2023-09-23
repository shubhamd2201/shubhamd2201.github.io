

function forOtherData(){
// door lock API append door lock
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
                    <div><img src="" alt=""></div>
                    <p>${e.doorLockName}</p>
                </div>
            </li>`);
         });

        page_loader.hide();

    },
    error: function(xhr, status, error) {
        document.querySelector('#door_lock').insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);
        page_loader.hide();
    }

});
   

$('.lock_bar ul li').click(function(){
    $(this).siblings().removeClass("selected");
    $(this).addClass('selected');
    $('#lock_for_quatation').text($(this).text());
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

         sealClick()
        page_loader.hide();

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
             document.querySelector('#strutData ul').insertAdjacentHTML('beforeend', ` <li sturtCategoryTypeId="${e.sturtCategoryTypeId}">${e.sturtCategoryTypeName}</li>`
             );
            });
   
        }
        page_loader.hide();

    },
    error: function(xhr, status, error) {
        $('#strutData .error').text("Error:"+error);
        page_loader.hide();
    }

});


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
        let company_operator_type_id = doorOperatorSelect[i].getAttribute('company_operator_type_id')
   

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
                    console.log(e.company_Operator_Name);
                 document.querySelectorAll('#doorOperator .door_operator_select_box select')[i].insertAdjacentHTML('beforeend', 
                 `<option >${e.company_Operator_Name}</option>`);
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

}




setTimeout(forOtherData,5000);


// click on spring 
function springTypeClick(){
    
    $("#spring_data ul li").click(function(){

        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');

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
                    // console.log(data.payload)

                //  data.payload.forEach(e=>{
                document.querySelector('#spriingCyclage').insertAdjacentHTML('beforeend', ` <option value="${data.payload.springCategoryId}" springCategoryId="${data.payload.springCategoryId}">${data.payload.springCategoryName}</option>`
                );
                //  });
                }
                
               
        
                page_loader.hide();
        
            },
            error: function(xhr, status, error) {
                document.querySelector('#spriingCyclage').parentElement().insertAdjacentHTML('beforeend', `<span class="text-danger" > 'Error: ' ${error} </span>`);
                page_loader.hide();
            }
        
        });

    });
}

// click on seal 
function sealClick(){
    $("#sealData ul li").click(function(){
        $(this).toggleClass('selected');
    });
}