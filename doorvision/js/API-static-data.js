

function forDoorLock(){
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
    $(this).sibilings().removeClass("selected");
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














}




setTimeout(forDoorLock,5000);



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
                document.querySelector('#spriingCyclage').innerHTML = null;
                //  data.payload.forEach(e=>{
                document.querySelector('#spriingCyclage').insertAdjacentHTML('beforeend', ` <option value="${data.payload.springCategoryId}" springCategoryId="${data.payload.springCategoryId}">${data.payload.springCategoryName}</option>`
                );
                //  });
        
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