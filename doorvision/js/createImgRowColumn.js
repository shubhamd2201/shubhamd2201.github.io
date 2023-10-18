

function createImageRowColumn(clickedThis, numberOfColumn, repeatedFile, clickColorArr ){


let heightData = clickedThis.attr('noOfSection').split(','); 

$('#create_img').empty();
$('.append_grid_for_selection').empty();
$('.for_all_grid ul').empty();
$('.for_grid_height ul').empty();
$('.bg_img_main').empty();
$('.your_door_design').hide();
$('.image_grid_parent.append_grid').show();
$('.left_btns').show();

let selected_panel = $('#panel_type .door_catogary.selected').attr('doorpanelid');
let bgImg = './images/white_img_for_bg.png';
let selectedFamily = $('#door_collection_family .door_family.selected').attr('doorsubcollectionid');

if(selectedFamily == 13 || selectedFamily == 14){
    bgImg = './images/bg_light_white.jpeg';
}
else if( selectedFamily == 3){
    bgImg = './images/pure_white_img.jpg';
}

else if( selectedFamily == 20 ){
    bgImg = './images/commercial_full_view_bgImg.jpeg';
}
else if( selectedFamily == 21 ){
    bgImg = './images/insulated_sandwich_bgimg.jpeg';
}
else if( selectedFamily == 22 ){
    bgImg = './images/ribbed_steel_bg_img.jpeg';
}


document.querySelector('.bg_img_main').insertAdjacentHTML('beforeend',
 `<img src="${bgImg}" /> <canvas class="bg_img_main_canvas"></canvas>`);

 let panel_type;

//  repeat image static 

(selectedFamily == 2 || selectedFamily == 3 || selectedFamily == 4 || selectedFamily == 4)? $('#create_img').css('padding','10px'):$('#create_img').css('padding','10px 0px 10px 0px');

( selectedFamily == 20)?$('#create_img').css('padding','10px 15px'): '';

// (selectedFamily == 22)?$('#create_img').css('padding','10px 0px 10px 0px'):;

if(selected_panel == 1){
    repeatedFile = './images/window_img.png';
    

    panel_type = "short";
}
else if(selected_panel == 2){
    repeatedFile = './images/Long_Panel_Repete_Image.png';
    panel_type = "long";

}
else if(selected_panel == 27){
    repeatedFile = './images/skyline_short.png';
    panel_type = "short";

}

else if(selected_panel == 28){
    repeatedFile = './images/skyline_long.png';
    panel_type = "long";

}
else if(selected_panel == 24){
    repeatedFile = './images/plank_short.png'
    panel_type = "short";

}
else if(selected_panel == 25){
    repeatedFile = './images/plank_long.png'
    panel_type = "long";
}
else if(selected_panel == 25){
    repeatedFile = './images/commercial_full_view_repeat.jpeg'
    panel_type = "long";

}

for(let i = 0; i < heightData.length; i++){
// this is for create row in img 

document.querySelector('#create_img').insertAdjacentHTML('beforeend',`<ul class=height${heightData[i]} rowIndex = ${i}> </ul>`);

// this is create grid row 
document.querySelectorAll('.append_grid_for_selection').forEach((a)=>{
    a.insertAdjacentHTML('beforeend',`<ul rowIndex = ${i}> </ul>`);

});

document.querySelector('.for_all_grid ul').insertAdjacentHTML('beforeend',`<li allbtnIndex='${i}'> <span>All</span></li>`);
document.querySelector('.for_grid_height ul').insertAdjacentHTML('beforeend',`<li><span>${heightData[i]}</span> </li>`);


}


for(let j = 0; j < numberOfColumn; j++){

// ${repeatedFile} for dynamic img src


// this is for create image column
    document.querySelectorAll('#create_img ul').forEach((b)=>{
        b.insertAdjacentHTML('beforeend',
            `<li listindex = ${j}>
                <div class="createImageimg">
                    <img class="" src="${repeatedFile}">
                    <canvas class="myCanvas">
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

let allSelected = true;
$(this).parent().children().each(function() {
    if (!$(this).hasClass("i_am_selected")) {
        allSelected = false;
        return false;
    }
});

let thisParentElementAllbtn = $(`.for_all_grid ul li[allbtnIndex='${$(this).parent().attr('rowindex')}'] span`);

 if(allSelected){
    thisParentElementAllbtn.addClass('selected');
}
else{
    thisParentElementAllbtn.removeClass('selected');
}

let windowQunatity = $('.append_grid_for_selection ul li.i_am_selected').length;
$('#window_quantity_for_quatation').text(`Window Quantity:${windowQunatity}`);
$('#windowQ').text(windowQunatity);

// if($(".append_grid_for_selection ul li.i_am_selected").length == $(".append_grid_for_selection ul li").length){

//     $(".for_all_grid ul li span")
// }
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

let borderColor =  "#d1d1d1";
let cssRootElement = document.querySelector(':root');
cssRootElement.style.setProperty('--stripepartition', borderColor);

// for all 

document.querySelectorAll(".for_all_grid ul li span").forEach((a, x)=>{
a.addEventListener("click", function(){

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

if(window.outerWidth > 1023){
    $('.left_section_inr.scroll-css').animate({scrollTop: 225},300);
}
// end 

$('#create_img ').removeClass();
$('#create_img ').addClass(panel_type+'_'+selected_width_ft+'_'+selected_height_ft);

        document.querySelector('#select_color ul').innerHTML = "";
        clickColorArr.forEach((e)=>{
            if(e.colorCode.length < 6){
            document.querySelector('#select_color ul').insertAdjacentHTML('beforeend', `
            <li class="price_tooltip" tooltip-data=$${e.doorSalePrice} data-color="${e.filePath}" doorColorId='${e.doorColorId}' dsp="${e.doorSalePrice}">
                <div class="color_img_btn" > <img src="${e.filePath}"/></div>
                <p>${e.doorColorName}</p>
            </li>`);
            }
            else{
                document.querySelector('#select_color ul').insertAdjacentHTML('beforeend', `
            <li class="price_tooltip" tooltip-data=$${e.doorSalePrice} data-color="${e.colorCode}" doorColorId='${e.doorColorId}' dsp="${e.doorSalePrice}">
                <span style="background:${e.colorCode};"></span>
                <p>${e.doorColorName}</p>
            </li>`);
            }
        });

        $('#select_color ul li').eq(0).addClass('selected');
        $("#color_for_quatation").text(` ,${$('#select_color ul li.selected').text()}`);

        // for color end

          // click on color 
          var my_color = $('#select_color ul li').eq(0).attr('data-color');


        $('#select_color ul li:not(:has(img))').on('click', function(){
            my_color = $(this).attr('data-color');

            $(this).siblings().removeClass('selected');
            $(this).addClass('selected');

            $('.bg_img_main img').attr('src', bgImg);
            $('.createImageimg img').attr('src', repeatedFile);

            $("#color_for_quatation").text(`, ${$(this).text()}`);

            $('.image_grid_parent.append_grid canvas').show();

            applyColorOverlay_multiple(my_color);
            applyColorOverlay(my_color);

            setTimeout(()=>{
                applyColorOverlay_multiple(my_color);
                applyColorOverlay(my_color);
            },100);
           borderColor =  adjustColor(my_color);

           cssRootElement.style.setProperty('--stripepartition', borderColor);
            setWindow();
            setGlass();

        });


       
        $('#select_color ul li .color_img_btn').on('click', function(){


            $('#select_color ul li').removeClass('selected');
            $(this).parent().addClass('selected');
            $('.image_grid_parent.append_grid canvas').hide();

            $('.bg_img_main img').attr('src', "./images/classic_woodgrain_bg_img.png");
            $('.createImageimg img').attr('src', $(this).find('img').attr('src'));

            cssRootElement.style.setProperty('--stripepartition', '#181615');

        });
        // click on color end

        setTimeout(()=>{
            applyColorOverlay_multiple(my_color);
            applyColorOverlay(my_color);
            borderColor =  adjustColor(my_color);
            cssRootElement.style.setProperty('--stripepartition', borderColor)
        },1000);

    // big function end 
}