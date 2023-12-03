





// document.getElementById('quotationsubmit_btn').addEventListener('click', function () {


//   html2canvas(sectionToCapture).then( function(canvas) {

//     const dataUrl =  canvas.toDataURL('image/jpg');

//     const link = document.createElement('a');
//     link.href = dataUrl;
//     link.download = 'section_image.jpg';

//     link.click();
    

//     canvas.toBlob(function(blob) {
//       const url = URL.createObjectURL(blob);
   
//     });
//   });

  
// });

$(document).ready(function() {

  const sectionToCapture = document.getElementById('image_download_section');

  document.getElementById('generateQuotation').addEventListener('click', () => {
    $('#create_img ul.flipwindow').addClass('flipodd');
    $('#create_img ul.flipodd').removeClass('flipwindow');

  html2canvas(sectionToCapture, { useCORS: true, allowTaint: true}).then((canvas) => {
    var imageDataURL = canvas.toDataURL('image/png');

    let perGlassPrice = $('#window_glass ul li.selected').attr('glzsp');
    let perWindowPrice = $('#window_type ul li.selected').attr('wsp');



var window_qty = parseInt($('#windowQ').text());
var modelPrice = $('#select_color ul li.selected').attr('dsp');

var doorOperatorPrice = [];
$('#doorOperator .door_operator_col_inr.selected').each(function(index, element) {
  doorOperatorPrice.push(Number($(element).find('select option:selected').attr('saleprice')));
});

var doorOperatorPriceTotal = doorOperatorPrice.reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);


// var doorOperatorPrice =  $('#doorOperator .door_operator_col_inr.selected').find('select option:selected').attr('saleprice');
var spring_price = $('#spring_price_label').attr('sprp');
var sealPrice = $('#seal_price_label').attr('ssp');
var trackPrice = $('#trackpostdata ul li.selected').attr('tsp');
var doorLockPrice = $('#door_lock ul li.selected').attr('lsp');
var persealprice = $('#seal_details option:selected').attr('sealunitp');
var cyclage_info = $('#cyclage_info ul').attr('cyclageiforfor_quotation');
var sturtSalesPrice = $('#extrastrutData ul li.selected').attr('selected');
var extrastrutquantity = $('#strut_quantity_for_quatation').text();

var door_operator_quantity = $('#doorOperator .door_operator_col_inr.selected').length;




 ((modelPrice == NaN)||(modelPrice == undefined))? modelPrice = 0:'';
((window_qty == NaN)||(window_qty == undefined))? window_qty = 0:'';
((perWindowPrice == NaN)||(perWindowPrice == undefined))? perWindowPrice = 0:'';
((perGlassPrice == NaN)||(perGlassPrice == undefined))? perGlassPrice = 0:'';
((doorOperatorPriceTotal == NaN)||(doorOperatorPriceTotal == undefined))? doorOperatorPriceTotal = 0:'';
((spring_price == NaN)||(spring_price == undefined))? spring_price = 0:'';
((sealPrice == NaN)||(sealPrice == undefined))? sealPrice = 0:'';
((trackPrice == NaN)||(trackPrice == undefined))? trackPrice = 0:'';
((doorLockPrice == NaN)||(doorLockPrice == undefined))? doorLockPrice = 0:'';
((door_operator_quantity == NaN)||(door_operator_quantity == undefined))? door_operator_quantity = 0:'';
((sturtSalesPrice == NaN)||(sturtSalesPrice == undefined))? sturtSalesPrice = 0:'';
((extrastrutquantity == NaN)||(extrastrutquantity == undefined))? extrastrutquantity = 1:'';


var extrastruttotalPrice = (Number(sturtSalesPrice) * Number(extrastrutquantity)).toFixed(2);





var quantity_of_door = $('#quantity_of_door').val();


let total_amount = Number(Number(modelPrice) + Number(trackPrice) + Number(doorLockPrice) + Number(extrastruttotalPrice)  + Number(perWindowPrice * window_qty) + Number(perGlassPrice * window_qty) + Number(doorOperatorPriceTotal)).toFixed(2) * Number(quantity_of_door);
   
 $('#total_amount_show').text(total_amount);
 

  var product_main_detail = $('#door_company_quatation').text()+', '+$('#model_number_for_quatation').text();
  let window_info = $('#window_type ul li.selected').text();
  var doorWidth_info = $('#doorWidthquotation span').text();
  var doorheight_info = $('#dooheightquotation span').text();

  // var moreinfoquotation = $('#moreinfoquotation').text();
  var doorMaininfo = $('#model_and_detail_quo span').text();

  // var springandCyclage = $('#Spring_for_quatation').text() + $('#cyclage_for_quatation').text(); 

  var door_operator_name = `${$('#quotation_liftmaster span').eq(0).text()}, ${$('#quotation_genie span').eq(0).text()}, ${$('#quotation_marantech span').eq(0).text()}`;
  var door_operator_model =`${$('#quotation_liftmaster span').eq(1).text()}, ${$('#quotation_genie span').eq(1).text()}, ${$('#quotation_marantech span').eq(1).text()}`;

  
  var doorBackImg = $('#model_number_img img').attr('src');
var window_glass_type_for_quatation = $('#window_glass_type ul li.selected').text() + $('#window_glass ul li.selected').text();

var sealdesc = $('#seal_details option:selected').text();
var cyclage = $('#spriingCyclage option:selected').text();
var spring_data = $('#spring_data ul li.selected').text();
var sealData = $('#sealData ul li.selected').text();
var trackDesc =  $('#jamb_material_for_quatation').text() + ", " +  $('#jamb_mount_for_quatation').text();
var tracktitle = $('#track_for_quatation').text();
var mainstrut = $('#strut_for_quatation').text();
var extrastrut = $('#extraStrut_for_quotation').text();



var dataToStore = {
  product_main_detail: product_main_detail,
  window_info: window_info,
  doorheight_info: doorheight_info,
  doorWidth_info: doorWidth_info,
  door_operator_name: door_operator_name,
  door_operator_model:door_operator_model,
  door_operator_quantity: door_operator_quantity,
  imageDataURL: imageDataURL,
  doorBackImg: doorBackImg,
  window_qty: window_qty,
  modelPrice: modelPrice,
  doorOperatorPrice:doorOperatorPrice,
  perWindowPrice:perWindowPrice,
  perGlassPrice:perGlassPrice,
  doorMaininfo : doorMaininfo,
  window_glass_type_for_quatation:window_glass_type_for_quatation,
  quantity_of_door:quantity_of_door,
  spring_price:spring_price,
  cyclage:cyclage,
  sealPrice:sealPrice,
  sealdesc: sealdesc,
  spring_data:spring_data,
  sealData:sealData,
  trackPrice:trackPrice,
  trackDesc: trackDesc,
  tracktitle:tracktitle,
  mainstrut:mainstrut,
  extrastrut: extrastrut,
  extrastrutquantity:extrastrutquantity,
  sturtSalesPrice:sturtSalesPrice,
  extrastruttotalPrice:extrastruttotalPrice,
  doorlock : $('#lock_for_quatation').text(),
  cyclage_info:cyclage_info,
  spring_quantity_number: $('#spring_quantity_number').text(),
  seal_qty :  $('#seal_details').attr('seal_qty'),
  doorLockPrice: doorLockPrice,
  persealprice:persealprice,

};


var jsonData = JSON.stringify(dataToStore);


localStorage.clear();

localStorage.setItem("myData", jsonData);


$('#create_img ul.flipodd').addClass('flipwindow');
$('#create_img ul.flipwindow').removeClass('flipodd');

  });
});




// downloadButton.addEventListener('click', () => {
//   domtoimage.toBlob(sectionToCapture)
//     .then(function (blob) {
//       const a = document.createElement('a');
//       a.href = URL.createObjectURL(blob);
//       a.download = 'captured_image.png'; 

//       a.click();

//       URL.revokeObjectURL(a.href);
//     })
//     .catch(function (error) {
//       console.error('Error capturing image:', error);
//     });
// });

});





 









  var selectedOpacity = 0.96;
  
  function applyColorOverlay(my_color) {
  
    var canvas = document.querySelector('.bg_img_main_canvas');
    var ctx = canvas.getContext('2d');
    var image = document.querySelector('.bg_img_main img');
    
    
    canvas.width = image.width;
    canvas.height = image.height;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    var selectedColor = my_color;
    
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = `rgba(${parseInt(selectedColor.slice(1, 3), 16)}, ${parseInt(selectedColor.slice(3, 5), 16)}, ${parseInt(selectedColor.slice(5, 7), 16)}, ${selectedOpacity})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';
    
    
    
    }
    
    
    
   
    
    
    
//     function applyColorOverlaywindow(my_color) {
    
//     document.querySelectorAll('.window_img canvas').forEach(e=>{
//     var ctx = e.getContext('2d');
//     var image = document.querySelector('.window_img img');
    
    
//     e.width = image.width;
//     e.height = image.height;
    
//     ctx.clearRect(0, 0, e.width, e.height);
//     ctx.drawImage(image, 0, 0, e.width, e.height);
    
//     var selectedColor = my_color;
    
//     ctx.globalCompositeOperation = 'multiply';
//     ctx.fillStyle = `rgba(${parseInt(selectedColor.slice(1, 3), 16)}, ${parseInt(selectedColor.slice(3, 5), 16)}, ${parseInt(selectedColor.slice(5, 7), 16)}, ${selectedOpacity})`;
//     ctx.fillRect(0, 0, e.width, e.height);
//     ctx.globalCompositeOperation = 'source-over';
    
//     });
    
//     }
  
  
    
function applyColorOverlay_multiple(my_color) {
    
  document.querySelectorAll('.createImageimg .myCanvas').forEach(e=>{
  var ctx = e.getContext('2d');
  var image = document.querySelector('.createImageimg img');
  
  
  e.width = image.width;
  e.height = image.height;
  
  ctx.clearRect(0, 0, e.width, e.height);
  ctx.drawImage(image, 0, 0, e.width, e.height);
  
  var selectedColor = my_color;
  
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = `rgba(${parseInt(selectedColor.slice(1, 3), 16)}, ${parseInt(selectedColor.slice(3, 5), 16)}, ${parseInt(selectedColor.slice(5, 7), 16)}, ${selectedOpacity})`;
  ctx.fillRect(0, 0, e.width, e.height);
  ctx.globalCompositeOperation = 'source-over';
  
  });
  
  }