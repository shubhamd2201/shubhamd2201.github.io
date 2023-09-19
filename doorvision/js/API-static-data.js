function forStaticData(){



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
















}