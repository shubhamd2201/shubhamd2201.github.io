function clearStaticAPIData(){

    document.querySelector('#door_lock ul').innerHTML = null;
    document.querySelector('#sealData ul').innerHTML = null;
    document.querySelector('#spring_data ul').innerHTML = null;
    document.querySelector('#strutData ul').innerHTML = null;
   document.querySelector('#strut_quantity').innerHTML = null;
    document.querySelector('#extrastrutData ul').innerHTML = null;
    document.querySelector('#strut_quantity').innerHTML = null;
    document.querySelector('#doorOperator').innerHTML = null;
    document.querySelector("#glazing_type ul").innerHTML = null;
    document.querySelector("#window_insert_tabbing ul").innerHTML = null;
    document.querySelector("#window_glass ul").innerHTML = null;
    document.querySelector("#window_type ul").innerHTML = null;
    $('#spring_price_label').empty();
    $('#spring_price_label').removeClass();
    document.querySelector('#cyclage_info ul').innerHTML = null;
    document.querySelector('#seal_details').innerHTML = null;
    document.querySelector('#seal_price_label').innerHTML = null;
    document.querySelector('#normal_track_data ul').innerHTML = null;
    document.querySelector('#trackpostdata ul').innerHTML = null;

    $('.cleartext span').text('');
    $('#cyclage_info ul').attr('cyclageiforfor_quotation', '');
    document.querySelector('#trackpostdata #tracktext_box').innerHTML= null;









    $('#doorOperator .door_operator_select_box select').empty();
    $('#spriingCyclage').empty();
}


