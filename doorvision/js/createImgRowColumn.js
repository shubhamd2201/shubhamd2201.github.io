// need to pass colorArr in last for dynamic color 

function createImageRowColumn(clickedThis, numberOfColumn, repeatedFile){


let heightData = clickedThis.attr('noOfSection').split(','); 
// let dataIndexForWindow = clickedThis.attr('data-index');

$('#create_img').empty();
$('.append_grid_for_selection').empty();
$('.for_all_grid ul').empty();
$('.for_grid_height ul').empty();
$('.bg_img_main').empty();


$('.your_door_design').hide();
$('.image_grid_parent.append_grid').show();
$('.left_btns').show();

let selected_panel = $('#panel_type .door_catogary.selected').attr('doorpanelid');
let bgImg = 'white_img_for_bg.png';

if( selected_panel == 27 || selected_panel == 28){
    bgImg = 'bg_light_white.jpeg';
}
document.querySelector('.bg_img_main').insertAdjacentHTML('beforeend',
 `<img src="./images/${bgImg}" /> <canvas class="bg_img_main_canvas"></canvas>`);


//  repeat image static 

if(selected_panel == 1){
    repeatedFile = './images/window_img.png';
}
else if(selected_panel == 2){
    repeatedFile = './images/Long_Panel_Repete_Image.png';
}
else if(selected_panel == 27){
    repeatedFile = './images/skyline_short.png';
}

else if(selected_panel == 28){
    repeatedFile = './images/skyline_long.png';
}


for(let i = 0; i < heightData.length; i++){
// this is for create row in img 

document.querySelector('#create_img').insertAdjacentHTML('beforeend',`<ul class=height${heightData[i]} rowIndex = ${i}> </ul>`);

// this is create grid row 
document.querySelectorAll('.append_grid_for_selection').forEach((a)=>{
    a.insertAdjacentHTML('beforeend',`<ul rowIndex = ${i}> </ul>`);

});

document.querySelector('.for_all_grid ul').insertAdjacentHTML('beforeend',`<li> <span>All</span></li>`);
document.querySelector('.for_grid_height ul').insertAdjacentHTML('beforeend',`<li><span>${heightData[i]}</span> </li>`);


}

let repeat_img_path;

// if($('#panel_type .door_catogary.selected').attr('doorpanelid') == 1){
// repeat_img_path = './images/window_img.png'
// }
// else if($('#panel_type .door_catogary.selected').attr('doorpanelid') == 2){
// repeat_img_path = './images/Long_Panel_Repete_Image.png'
// }
for(let j = 0; j < numberOfColumn; j++){

// ${repeatedFile} for dynamic img src


// this is for create image column
    document.querySelectorAll('#create_img ul').forEach((b)=>{
        b.insertAdjacentHTML('beforeend',
            `<li listindex = ${j}>
                <div class="createImageimg">
                    <img class="" src="${repeatedFile}">
                    <canvas class="myCanvas"><canvas>
                </div>
                <div class="window_img"> </div>
            </li>`);
    });

// this is for selection grid columns 
document.querySelectorAll('.append_grid_for_selection ul').forEach((b)=>{
    b.insertAdjacentHTML('beforeend',`<li listindex = ${j}> </li>`);
})
}


$(".append_grid_for_selection ul li").on('click', function(){
 $(this).toggleClass("i_am_selected");

 let windowQunatity = $('.append_grid_for_selection ul li.i_am_selected').length;
$('#window_quantity_for_quatation').text(`Window Quantity:${windowQunatity}`);
$('#windowQ').text(windowQunatity);

setWindow();
setGlass();


});


let arrForGridDataRow = [];
let arrForGridDataColumn = [];

$('#grid_submit_btn').on("click", function(){

arrForGridDataRow.splice(0, arrForGridDataRow.length);
arrForGridDataColumn.splice(0, arrForGridDataColumn.length);


$('.append_grid_for_selection ul').each(function(index) {
    if ($(this).find('li.i_am_selected').length > 0) {
        let row_index = this.getAttribute("rowIndex")
        if (!arrForGridDataRow.includes(row_index)) {
            arrForGridDataRow.push(row_index);
        }
                        
    }

    
});

for(j = 0; j < arrForGridDataRow.length; j++){

let for_column = [];
document.querySelectorAll(".append_grid_for_selection ul")[arrForGridDataRow[j]].querySelectorAll('li.i_am_selected').forEach((e)=>{
for_column.push(e.getAttribute('listindex'));

});

arrForGridDataColumn.push(for_column);
}


// for insert window 

$('#create_img ul li .window_img').empty();

let window_typeand_color = './images/window/'+$("#select_color ul li.selected p").text()+'_'+$('#window_type ul li.selected').attr('data-window')+'.png';

for(let i = 0; i < arrForGridDataRow.length; i++){
    for(let j = 0; j < arrForGridDataColumn[i].length; j++){
       
    document.querySelectorAll("#create_img ul")[arrForGridDataRow[i]].querySelectorAll("li")[arrForGridDataColumn[i][j]].querySelector('.window_img').insertAdjacentHTML("beforeend",` <img src="${window_typeand_color}" >
    <!-- <canvas class="windowCanavas"></canvas> -->`
        )
    }
}

setWindow();
setGlass();
// applyColorOverlaywindow(my_color);

// if($("#create_img ul li").find(".window_img").length > 0){
//     applyColorOverlaywindow(my_color);
//     setTimeout(applyColorOverlaywindow, 100, my_color);
// }
});



// for all 

document.querySelectorAll(".for_all_grid ul li span").forEach((a, x)=>{
a.addEventListener("click", function(){

    ;

    if(this.className == "selected"){

        this.classList.remove("selected");
        document.querySelectorAll('.append_grid_for_selection ul')[x].querySelectorAll('li').forEach(lists=>{
        lists.classList.remove('i_am_selected');
        });
    }

    else{

        this.classList.add("selected");
        document.querySelectorAll('.append_grid_for_selection ul')[x].querySelectorAll('li').forEach(lists=>{
        lists.classList.add('i_am_selected');
        });
    }

    let windowQunatity = $('.append_grid_for_selection ul li.i_am_selected').length;
    $('#window_quantity_for_quatation').text(`Window Quantity:${windowQunatity}`);
    $('#windowQ').text(windowQunatity); 

    setWindow();
    setGlass();
});


});
// end 


$('#create_img ').removeClass();
let panel_type;
if($('#panel_type .door_catogary.selected').attr('doorpanelid') == 1){
panel_type = "short";
}
else if($('#panel_type .door_catogary.selected').attr('doorpanelid') == 2) {
panel_type = "long";
}

$('#create_img ').addClass(panel_type+'_'+selected_width_ft+'_'+selected_height_ft);


        // for color 
        let colorArr = ['#ebeeee', '#d6cdbe','#a09387', '#4b3933','#231f20'];

        let colorName = ['White', 'Almond','Sandstone', 'Brown', 'Black', 'Gray', 'Desert Tan']

        document.querySelector('#select_color ul').innerHTML = "";
        colorArr.forEach((e, i)=>{
            document.querySelector('#select_color ul').insertAdjacentHTML('beforeend', `
            <li data-color="${e}">
                <span style="background:${e};"></span>
                <p>${colorName[i]}</p>
            </li>`);
        });


        // this is dynamic 

        //document.querySelector('#select_color ul').innerHTML = "";
        // colorArr.forEach((e)=>{
        //     if(e.colorCode.length < 6){
        //     document.querySelector('#select_color ul').insertAdjacentHTML('beforeend', `
        //     <li data-color="${e.filePath}" doorSalePrice=${e.doorSalePrice}>
        //         <span style='background:url("${e.filePath}") center no-repeat;'></span>
        //         <p>${e.doorColorName}</p>
        //     </li>`);
        //     }
        //     else{
        //         document.querySelector('#select_color ul').insertAdjacentHTML('beforeend', `
        //     <li data-color="${e.colorCode}" doorSalePrice=${e.doorSalePrice}>
        //         <span style="background:${e.colorCode};"></span>
        //         <p>${e.doorColorName}</p>
        //     </li>`);
        //     }
        // });

        $('#select_color ul li').eq(0).addClass('selected');
        $("#color_for_quatation").text(` ,${$('#select_color ul li.selected').text()}`);

        // for color end

          // click on color 
          var my_color = null;

        $('#select_color ul li').on('click', function(){


            my_color = $(this).attr('data-color');

            $(this).siblings().removeClass('selected');
            $(this).addClass('selected');

            $("#color_for_quatation").text(`, ${$(this).text()}`);

            applyColorOverlay_multiple(my_color);
            applyColorOverlay(my_color);

            
           let borderColor =  adjustColor(my_color)
            $('#create_img > ul').css("border-color",borderColor)
            


            // if($("#create_img ul li").find(".window_img").length > 0){
            //     // applyColorOverlaywindow(my_color);
            // }

            setWindow();
            setGlass();

        });
        // click on color end

    // big function end 
}