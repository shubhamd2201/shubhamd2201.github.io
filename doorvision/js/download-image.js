



const sectionToCapture = document.getElementById('image_download_section');

document.querySelector('#downloadButton button').addEventListener('click', function () {

  console.log('i am clicked');

  html2canvas(sectionToCapture).then( function(canvas) {

    const dataUrl =  canvas.toDataURL('image/jpg');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'section_image.jpg';

    link.click();
    

    // canvas.toBlob(function(blob) {
    //   const url = URL.createObjectURL(blob);
   
    // });
  });
});

// color

var selectedOpacity = 0.90;

function applyColorOverlay(my_color) {
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  var image = document.getElementById('final_door_image');


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


  
  function applyColorOverlay_multiple(my_color) {

    // document.querySelectorAll('.myCanvas').forEach(e=>{
    // var ctx = e.getContext('2d');
    var image = document.querySelector('.image_grid_parent.append_grid ul li.i_am_selected img.window_frame');

  document.querySelectorAll('.myCanvas').forEach(e=>{
  var ctx = canvas.getContext('2d');
  var image = document.querySelector('.image_grid_parent.append_grid ul li.i_am_selected img.window_frame');
  var maskCanvas = document.createElement('canvas');
  var maskCtx = maskCanvas.getContext('2d');

  canvas.width = image.width;
  canvas.height = image.height;
  maskCanvas.width = image.width;
  maskCanvas.height = image.height;

  maskCtx.drawImage(image, 0, 0, maskCanvas.width, maskCanvas.height);

  var selectedColor = my_color;

  // Clear the main canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Apply color overlay only to non-transparent pixels using the mask
  ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(maskCanvas, 0, 0);
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = `rgba(${parseInt(selectedColor.slice(1, 3), 16)}, ${parseInt(selectedColor.slice(3, 5), 16)}, ${parseInt(selectedColor.slice(5, 7), 16)}, ${selectedOpacity})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});
}
