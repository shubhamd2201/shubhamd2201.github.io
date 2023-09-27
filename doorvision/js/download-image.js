



const sectionToCapture = document.getElementById('image_download_section');

// document.querySelector('#downloadButton button').addEventListener('click', function () {


  // html2canvas(sectionToCapture).then( function(canvas) {

  //   const dataUrl =  canvas.toDataURL('image/jpg');

  //   const link = document.createElement('a');
  //   link.href = dataUrl;
  //   link.download = 'section_image.jpg';

  //   link.click();
    

  //   // canvas.toBlob(function(blob) {
  //   //   const url = URL.createObjectURL(blob);
   
  //   // });
  // });


  
// });

document.getElementById("downloadButton").addEventListener("click", function () {

   const sectionToCapture = document.getElementById("capture");

   domtoimage.toPng(sectionToCapture)
       .then(function (dataUrl) {
           const link = document.createElement("a");
           link.href = dataUrl;
           link.download = "div_image.png";

           link.click();
       })
       .catch(function (error) {
           console.error("Error:", error);
       });
});





  // this is for color final 


  var selectedOpacity = 0.92;
  
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