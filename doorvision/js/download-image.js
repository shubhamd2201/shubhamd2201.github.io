



const sectionToCapture = document.getElementById('image_download_section');
const captureButton = document.getElementById('downloadButton');

// captureButton.addEventListener('click', function () {


//   html2canvas(sectionToCapture).then( function(canvas) {

//     const dataUrl =  canvas.toDataURL('image/jpg');

//     const link = document.createElement('a');
//     link.href = dataUrl;
//     link.download = 'section_image.jpg';

//     link.click();
    

    // canvas.toBlob(function(blob) {
    //   const url = URL.createObjectURL(blob);
   
    // });
  // });


  
// });

$(document).ready(function() {



captureButton.addEventListener('click', () => {
  html2canvas(sectionToCapture).then((canvas) => {
    var imageDataURL = canvas.toDataURL('image/png');

    let short_panel_windowPrice = [51.20, 66.10, 61.40, 91.74, 72.96, 97.70];
    let long_panel_windowPrice = [102.40, 132.20, 122.81, 183.49, 145.92, 195.41]

    let window_glassIndex = $('#window_glass ul li.selected').attr('data-index');
    let perWindowPrice;
    if($('#panel_type .door_catogary.selected').attr('doorpanelid') == 1){
      perWindowPrice = short_panel_windowPrice[window_glassIndex];
    }
    else if($('#panel_type .door_catogary.selected').attr('doorpanelid') == 2){
      perWindowPrice =long_panel_windowPrice[window_glassIndex];


    }

  

    var product_main_detail = $('#door_company_quatation').text()+', '+$('#model_number_for_quatation').text();

    var other_info = $('#model_and_detail_quo span').text();
    let window_info = $('#window_glass_type_for_quatation').text();
    window_info += $('#window_type_for_quatation').text();
    var size_info = $('#width_for_quatation_ft').text()+', '+$('#height_for_quatation_ft');
    var remain_info = $('#remain_info_quot span').text();

    var door_operator_name = $('#doorOperator_companyName').text();
    var door_operator_model = $('#doorOperatorModel').text();
   
    var doorBackImg = $('#model_number_img img').attr('src');

    var window_qty = parseInt($('#windowQ').text());
var modelPrice = $('#model_number_row .model_number_col.selected').attr('doorsaleprice');

    var doorOperatorPrice =  $('#doorOperator .door_operator_col_inr.selected select option:selected').attr('saleprice');


 ((modelPrice == NaN)||(modelPrice == undefined))? modelPrice = 0:'';
((window_qty == NaN)||(window_qty == undefined))? window_qty = 0:'';
((perWindowPrice == NaN)||(perWindowPrice == undefined))? perWindowPrice = 0:'';
((doorOperatorPrice == NaN)||(doorOperatorPrice == undefined))? doorOperatorPrice = 0:'';

    $('#total_amount_show').text(parseFloat(parseFloat(modelPrice) + parseFloat(perWindowPrice * window_qty) + parseFloat(doorOperatorPrice)).toFixed(2));

 
    

    
    
    

var dataToStore = {
  product_main_detail: product_main_detail,
  other_info: other_info,
  window_info: window_info,
  size_info: size_info,
  remain_info: remain_info,
  door_operator_name: door_operator_name,
  door_operator_model:door_operator_model,
  imageDataURL: imageDataURL,
  doorBackImg: doorBackImg,
  window_qty: window_qty,
  modelPrice: modelPrice,
  doorOperatorPrice:doorOperatorPrice,
  perWindowPrice:perWindowPrice,
};

var jsonData = JSON.stringify(dataToStore);


localStorage.clear();

localStorage.setItem("myData", jsonData);
    alert('success');
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

})





  // this is for color final 


  var selectedOpacity = 0.95;
  
function applyColorOverlay(my_color) {

  var canvas = document.querySelector('.bg_img_main_canvas');
  var ctx = canvas.getContext('2d');
  var image = document.querySelector('.bg_img_main');
  
  
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
  
  
  
 
  
  
  
  function applyColorOverlaywindow(my_color) {
  
  document.querySelectorAll('.window_img canvas').forEach(e=>{
  var ctx = e.getContext('2d');
  var image = document.querySelector('.window_img img');
  
  
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


  
  function applyColorOverlay_multiple(my_color) {
  
    document.querySelectorAll('.myCanvas').forEach(e=>{
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