



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

    document.querySelectorAll('.myCanvas').forEach(e=>{
    var ctx = e.getContext('2d');
    var image = document.querySelector('.image_grid_parent.append_grid ul li.i_am_selected img.window_frame');

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
