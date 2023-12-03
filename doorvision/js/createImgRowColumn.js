





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
let bgImg = './images/bg_img_f0f0f0.png';
let selectedFamily = $('#door_collection_family .door_family.selected').attr('doorsubcollectionid');

if(selectedFamily == 1){
    bgImg = './images/bg_img_eaeaea.png';
}
else if (selectedFamily == 3){
    bgImg = './images/bg_img_fcfcfc.png';
   
}
else if( selectedFamily == 4){
    bgImg = './images/bg_img_f2f2f2.png';

}
else if (selectedFamily == 6){

    bgImg = './images/bg_img_f7f9f8.png';
   
}
else if (selectedFamily == 7){
    bgImg = './images/bg_img_f8f8f8.png';
}
else if (selectedFamily == 11){
    bgImg = './images/bg_img_dcdcdc.png';
}



document.querySelector('.bg_img_main').insertAdjacentHTML('beforeend',
 `<img crossorigin="anonymous" src="${bgImg}"  /> <canvas class="bg_img_main_canvas"></canvas>`);

 let panel_type;

//  (selectedFamily == 6)? $('#create_img').css('padding','10px 0px'):$('#create_img').css('padding','10px');


// $("#window_glass ul li").click(function(){
//     $("#window_glass ul li").removeClass("selected");
//     $(this).addClass("selected");
    
//    $('#window_type').show();


//    if(!edit_ul_index && !edit_li_index){
//     setGlass();
//     }else{
//         $(`#create_img ul[rowindex="${edit_ul_index}"] li[listindex="${edit_li_index}"] .window_img`).css('background', 'url('+$(this).attr("glazingimg")+')');
//     }


// });


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
                    <img class="" crossorigin="anonymous" src="${repeatedFile}">
                    <canvas class="myCanvas">
                </div>
                <div  crossorigin="anonymous" class="window_img"> </div>
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

create_window_img();

// setWindow();
// setGlass();


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

create_window_img();
// setWindow();
// setGlass();
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
            <li class="price_tooltip" tooltip-data=$${e.doorSalePrice} data-color="${e.fileBackPath}" doorColorId='${e.doorColorId}' dsp="${e.doorSalePrice}" bgImg= '${e.fileBackPath}'>
                <div class="color_img_btn" > <img crossorigin="anonymous" src="${e.fileBackPath}"/></div>
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

            repeatedFile = $('#panel_type .door_catogary.selected').attr('repeatfilepath');

            $('.bg_img_main img').attr('src', bgImg);
            $('.createImageimg img').attr('src', repeatedFile);

            $("#color_for_quatation").text(`, ${$(this).text()}`);

            $('.image_grid_parent.append_grid canvas').show();

            applyColorOverlay_multiple(my_color);
            applyColorOverlay(my_color);
            borderColor =  adjustColor(my_color);
            $('.createImageimg img').on('load', function(){
                cssRootElement.style.setProperty('--stripepartition', borderColor);
            });
            
        
            setWindow();
            setGlass();

        });


    //    click on color img 
        $('#select_color ul li .color_img_btn').on('click', function(){


            $('#select_color ul li').removeClass('selected');
            $(this).parent().addClass('selected');
            $('.image_grid_parent.append_grid canvas').hide();
            $('.bg_img_main img').attr('src', $(this).find('img').attr('src'));


            let selected_color_id = $(this).parent().attr('doorcolorid');
            let panelID = $('#panel_type .door_catogary.selected').attr('doorpanelid');

            repeatedFile = repeatImageOfWooden (selected_color_id, panelID);

            $('.createImageimg img').attr('src', repeatedFile);


            $('.createImageimg img').on('load', function(){
                cssRootElement.style.setProperty('--stripepartition', '#000000');
            });

            setWindow();

        });




        $('.createImageimg img').on('load' , ()=>{
            applyColorOverlay_multiple(my_color);
            applyColorOverlay(my_color);
            borderColor =  adjustColor(my_color);
            cssRootElement.style.setProperty('--stripepartition', borderColor);
        });

    // big function end 
}



function create_window_img(){

    let arrForGridDataRow = [];
let arrForGridDataColumn = [];

    let append_grid_ul = $('.append_grid_for_selection ul');
    
    append_grid_ul.each(function(index) {
        if (append_grid_ul.eq(index).find('li.i_am_selected').length > 0) {
            let row_index = append_grid_ul.eq(index).attr("rowIndex");
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
    
    
    // for create window 
    
    $('#create_img ul li .window_img').empty();
    
    
    for(let i = 0; i < arrForGridDataRow.length; i++){
        for(let j = 0; j < arrForGridDataColumn[i].length; j++){
        document.querySelectorAll("#create_img ul")[arrForGridDataRow[i]].querySelectorAll("li")[arrForGridDataColumn[i][j]].querySelector('.window_img').insertAdjacentHTML("beforeend",` <img >
        <!-- <canvas class="windowCanavas"></canvas> -->`);
        }
    }

    $(".append_grid_for_selection ul li").empty();

    document.querySelectorAll(".append_grid_for_selection ul li.i_am_selected").forEach(e=>{
       e.insertAdjacentHTML('beforeend', `<span class="edit_grid"></span>`); 
    });

    // editEvent();


    document.querySelectorAll('.append_grid_for_selection ul li.i_am_selected .edit_grid').forEach( (e, i)=>{
        e.addEventListener('click', function(b){
            b.stopPropagation();
            $('.append_grid_for_selection ul li.i_am_selected .edit_grid').removeClass('selected_edit');
            this.classList.add('selected_edit');
        }); 
    });



    $('.window_img img').hide();
    
    setWindow();
    setGlass();
    
    
}















// this is for repeat image of wooden function 

function repeatImageOfWooden (colorCode, panelCode){
            let selected_color_id = colorCode
            let panelID = panelCode;
            let repeatedImage;

            let modernWoodgrain = 13;
            let classicWoodgrain = 25;
            let walnut = 14;
            let mahogany = 15;
            let driftWood = 16;
            let ceder = 17;
            let darkOak = 18;
            let carbon = 20;

            if (panelID == 1){
                // raised short 
            (selected_color_id == modernWoodgrain)?repeatedImage = "./images/woodenimg/short/modern_woodgrain_raisedshort.jpg":'';
            (selected_color_id == classicWoodgrain)?repeatedImage = "./images/woodenimg/short/Classic_Woodgrain_raisedshort.png":'';
            (selected_color_id == walnut)?repeatedImage = "./images/woodenimg/short/Walnut_Raised_Short.png":'';
            (selected_color_id == mahogany)?repeatedImage = "./images/woodenimg/short/Mahogany_Raised_Short.png":'';
            (selected_color_id == driftWood)?repeatedImage = "./images/woodenimg/short/Driftwood_Raised_Short.png":'';
            (selected_color_id == ceder)?repeatedImage = "./images/woodenimg/short/Cedar_Raised_Short.png":'';
            (selected_color_id == darkOak)?repeatedImage = "./images/woodenimg/short/Dark_Oak_Raised_Short.png":'';
            (selected_color_id == carbon)?repeatedImage = "./images/woodenimg/short/Carbon_Raised_Short.png":'';


            }
            else if(panelID == 2){
                // raised long 
                (selected_color_id == modernWoodgrain)?repeatedImage = "./images/woodenimg/long/modern_woodgrain_raised_long_repeat.png":'';
                (selected_color_id == classicWoodgrain)?repeatedImage = "./images/woodenimg/long/classic_woodgrain_raised_long_repeat.png":'';
                (selected_color_id == walnut)?repeatedImage = "./images/woodenimg/long/Walnut_Raised_Long.png":'';
                (selected_color_id == mahogany)?repeatedImage = "./images/woodenimg/long/Mahogany_Raised_Long.png":'';
                (selected_color_id == driftWood)?repeatedImage = "./images/woodenimg/long/Driftwood_Raised_Long.png":'';
                (selected_color_id == ceder)?repeatedImage = "./images/woodenimg/long/Cedar_Raised_Long.png":'';
                (selected_color_id == darkOak)?repeatedImage = "./images/woodenimg/long/Dark_Oak_Raised_Long.png":'';
                (selected_color_id == carbon)?repeatedImage = "./images/woodenimg/long/Carbon_Raised_Long.png":'';
            }

            else if(panelID == 3){
                // stampped carrige house short

                (selected_color_id == modernWoodgrain)?repeatedImage = "./images/woodenimg/short/modern_woodgrain_SCH_short.png":'';
                (selected_color_id == classicWoodgrain)?repeatedImage = "./images/woodenimg/short/classic_woodgrain_SCH_short.png":'';
                (selected_color_id == walnut)?repeatedImage = "./images/woodenimg/short/walnut_SCH_short.png":'';
                (selected_color_id == mahogany)?repeatedImage = "./images/woodenimg/short/mahogany_SCH_short.png":'';
                (selected_color_id == driftWood)?repeatedImage = "./images/woodenimg/short/driftwood_SCH_short.png":'';
                (selected_color_id == darkOak)?repeatedImage = "./images/woodenimg/short/dakoak_SCH_short.png":'';
                (selected_color_id == ceder)?repeatedImage = "./images/woodenimg/short/ceder_SCH_short.png":'';
                (selected_color_id == carbon)?repeatedImage = "./images/woodenimg/short/carban_oak_SCH_short.png":'';

            }
            else if(panelID == 4){
                // stampped carrige house long

                (selected_color_id == modernWoodgrain)?repeatedImage = "./images/woodenimg/long/Modern_Woodgrain_SCH_Long_Image.png":'';
                (selected_color_id == classicWoodgrain)?repeatedImage = "./images/woodenimg/long/Classic_Woodgrain_SCH_Long_Image.png":'';

                (selected_color_id == walnut)?repeatedImage = "./images/woodenimg/long/Walnut_SCH_Long.png":'';
                (selected_color_id == mahogany)?repeatedImage = "./images/woodenimg/long/Mahogany_SCH_Long.png":'';
                (selected_color_id == driftWood)?repeatedImage = "./images/woodenimg/long/Driftwood_SCH_Long.png":'';
                (selected_color_id == darkOak)?repeatedImage = "./images/woodenimg/long/Dark_Oak_SCH_Long.png":'';
                (selected_color_id == ceder)?repeatedImage = "./images/woodenimg/long/Cedar_SCH_Long.png":'';
                (selected_color_id == carbon)?repeatedImage = "./images/woodenimg/long/Carbon_SCH_Long.png":'';

            }
            else if(panelID == 5){
                // stampped shaker shaker 

                (selected_color_id == modernWoodgrain)?repeatedImage = "./images/woodenimg/long/Modern_Woodgrain_Shaker.png":'';
                (selected_color_id == classicWoodgrain)?repeatedImage = "./images/woodenimg/long/Classic_Woodgrain_Shaker.png":'';

                (selected_color_id == walnut)?repeatedImage = "./images/woodenimg/long/Walnut_Shaker_Long.png":'';
                (selected_color_id == mahogany)?repeatedImage = "./images/woodenimg/long/Mahogany_Shaker_Long.png":'';
                (selected_color_id == driftWood)?repeatedImage = "./images/woodenimg/long/Driftwood_Shaker_Long.png":'';
                (selected_color_id == darkOak)?repeatedImage = "./images/woodenimg/long/Dark_Oak_Shaker_Long.png":'';
                (selected_color_id == ceder)?repeatedImage = "./images/woodenimg/long/Cedar_Shaker_Long.png":'';
                (selected_color_id == carbon)?repeatedImage = "./images/woodenimg/long/Carbon_Shaker_Long.png":'';

            }
            else if(panelID == 7){
                // planks no or short window

                // (selected_color_id == modernWoodgrain)?repeatedImage = "./images/woodenimg/long/modern_woodgrain_raised_long_repeat.png":'';
                // (selected_color_id == classicWoodgrain)?repeatedImage = "./images/woodenimg/long/classic_woodgrain_raised_long_repeat.png":'';

                (selected_color_id == walnut)?repeatedImage = "./images/woodenimg/short/Walnut_Planks_Short.png":'';
                (selected_color_id == mahogany)?repeatedImage = "./images/woodenimg/short/Mahogany_Planks_Short.png":'';
                (selected_color_id == driftWood)?repeatedImage = "./images/woodenimg/short/Driftwood_Planks_Short.png":'';
                (selected_color_id == darkOak)?repeatedImage = "./images/woodenimg/short/Dark_Oak_Planks_Short.png":'';
                (selected_color_id == ceder )?repeatedImage = "./images/woodenimg/short/Cedar_Planks_Short.png":'';
                (selected_color_id == carbon)?repeatedImage = "./images/woodenimg/short/Carbon_Planks_Short.png":'';
            }
            else if(panelID == 8 || panelID == 9){
                // planks long window and planks oversized window

                // (selected_color_id == modernWoodgrain)?repeatedImage = "./images/woodenimg/short/modern_woodgrain_raisedshort.jpg":'';
                // (selected_color_id == classicWoodgrain)?repeatedImage = "./images/woodenimg/short/Classic_Woodgrain_raisedshort.png":'';

                (selected_color_id == walnut)?repeatedImage = "./images/woodenimg/long/Walnut_Planks_Long.png":'';
                (selected_color_id == mahogany)?repeatedImage = "./images/woodenimg/long/Mahogany_Planks_Long.png":'';
                (selected_color_id == driftWood)?repeatedImage = "./images/woodenimg/long/Driftwood_Planks_Long.png":'';
                (selected_color_id == ceder)?repeatedImage = "./images/woodenimg/long/Cedar_Planks_Long.png":'';
                (selected_color_id == darkOak)?repeatedImage = "./images/woodenimg/long/Dark_Oak_Planks_Long.png":'';
                (selected_color_id == carbon)?repeatedImage = "./images/woodenimg/long/Carbon_Planks_Long.png":'';

            }
            else if(panelID == 10){

                // skyline flush short

                // (selected_color_id == modernWoodgrain)?repeatedImage = "./images/woodenimg/short/modern_woodgrain_raisedshort.jpg":'';
                // (selected_color_id == classicWoodgrain)?repeatedImage = "./images/woodenimg/short/Classic_Woodgrain_raisedshort.png":'';

                (selected_color_id == walnut)?repeatedImage = "./images/woodenimg/short/Walnut_SF_Short.png":'';
                (selected_color_id == mahogany)?repeatedImage = "./images/woodenimg/short/Mahogany_SF_Short.png":'';
                (selected_color_id == driftWood)?repeatedImage = "./images/woodenimg/short/Driftwood_SF_Short.png":'';
                (selected_color_id == ceder)?repeatedImage = "./images/woodenimg/short/Cedar_SF_Short.png":'';
                (selected_color_id == darkOak)?repeatedImage = "./images/woodenimg/short/Dark_Oak_SF_Short.png":'';
                (selected_color_id == carbon)?repeatedImage = "./images/woodenimg/short/Carbon_SF_Short.png":'';
            }
            else if(panelID == 11 || panelID == 12){
                // skyline flush long and oversized window

                // (selected_color_id == modernWoodgrain)?repeatedImage = "./images/woodenimg/short/modern_woodgrain_raisedshort.jpg":'';
                // (selected_color_id == classicWoodgrain)?repeatedImage = "./images/woodenimg/short/Classic_Woodgrain_raisedshort.png":'';


                (selected_color_id == walnut)?repeatedImage = "./images/woodenimg/long/Walnut_SF_Long.png":'';
                (selected_color_id == mahogany)?repeatedImage = "./images/woodenimg/long/Mahogany_SF_Long.png":'';
                (selected_color_id == driftWood)?repeatedImage = "./images/woodenimg/long/Driftwood_SF_Long.png":'';
                (selected_color_id == ceder)?repeatedImage = "./images/woodenimg/long/Cedar_SF_Long.png":'';
                (selected_color_id == darkOak)?repeatedImage = "./images/woodenimg/long/Dark_Oak_SF_Long.png":'';
                (selected_color_id == carbon)?repeatedImage = "./images/woodenimg/long/Carbon_SF_Long.png":'';

            }

            return repeatedImage;
            


                
}







//=========================================================

// return window path 
function windowPath (color, windowType){

    let white = [1, 'White'];
    let almond = [2,'Almond'];
    let sandstone = [3, 'Sandstone'];
    let brown = [4, 'Brown'];
    let black = [5, 'Black'];
    let grey = [6, 'Gray'];
    let bronze = [7, 'Bronze'];
    let graphite = [8, 'Graphite'];
    let desertTan = [9, 'Desert Tan'];
    let evergreen = [10, 'Evergreen'];
    let modernWoodgrain =[ 13, 'modernWoodgrain'];
    let walnut = [14,'walnut'];
    let mahogany = [15, 'mahogany'];
    let driftWood = [16,'driftWood'];
    let ceder = [17, 'cedar'];
    let darkOak = [18, 'dark_Oak'];
    let carbon = [20, 'carbon'];
    let classicWoodgrain = [25, 'classicWoodgrain'];

    // window type 
    let plain = 1 ;
    let cascade = 2 ;
    let stocktone = 3 ;
    let prairai = 4 ;
    let watertone = 5 ;
    let Sherwood = 6 ;
    let Cathedral = 7;
    let arched_stockton = 14;
    let LP_madison = 15;
    let arched_madison = 16;


    let windowsizeType = $('#window_insert_tabbing ul li.selected').attr('doorinsulatedtypeid');
    let windowurl;
    let window_type_name;


    // this is for short window 
    let window_type_foldername;
    
(windowsizeType == 1)? window_type_foldername = 'short':'';
(windowsizeType == 2)? window_type_foldername = 'long':'';


    (windowType == plain || windowType == 8)? window_type_name = '_plain':'';
    (windowType == cascade || windowType == 9)? window_type_name = '_Casecade':'';
    (windowType == stocktone || windowType == 10)? window_type_name = '_Stockton':'';
    (windowType == prairai || windowType == 11)? window_type_name = '_Prairie':'';
    (windowType == watertone || windowType == 12)? window_type_name = '_Waterton':'';
    (windowType == Sherwood || windowType == 13)? window_type_name = '_Sherwood':'';
    (windowType == Cathedral)? window_type_name = '_Cathedral':'';
    (windowType == arched_stockton)? window_type_name = '_arched_stockton':'';
    (windowType == LP_madison)? window_type_name = '_madison':'';
    (windowType == arched_madison)? window_type_name = '_arched_madison':'';





    (color == white[0])? windowurl = './images/window/'+window_type_foldername+'/'+white[1]+window_type_name+'.png':'';
    (color == almond[0])? windowurl = './images/window/'+window_type_foldername+'/'+almond[1]+window_type_name+'.png':'';
    (color == sandstone[0])? windowurl = './images/window/'+window_type_foldername+'/'+sandstone[1]+window_type_name+'.png':'';
    (color == brown[0])? windowurl = './images/window/'+window_type_foldername+'/'+brown[1]+window_type_name+'.png':'';
    (color == black[0])? windowurl = './images/window/'+window_type_foldername+'/'+black[1]+window_type_name+'.png':'';
    (color == grey[0])? windowurl = './images/window/'+window_type_foldername+'/'+grey[1]+window_type_name+'.png':'';
    (color == bronze[0])? windowurl = './images/window/'+window_type_foldername+'/'+bronze[1]+window_type_name+'.png':'';
    (color == graphite[0])? windowurl = './images/window/'+window_type_foldername+'/'+graphite[1]+window_type_name+'.png':'';
    (color == desertTan[0])? windowurl = './images/window/'+window_type_foldername+'/'+desertTan[1]+window_type_name+'.png':'';
    (color == evergreen[0])? windowurl = './images/window/'+window_type_foldername+'/'+evergreen[1]+window_type_name+'.png':'';
    (color == modernWoodgrain[0])? windowurl = './images/window/'+window_type_foldername+'/'+modernWoodgrain[1]+window_type_name+'.png':'';
    (color == walnut[0])? windowurl = './images/window/'+window_type_foldername+'/'+walnut[1]+window_type_name+'.png':'';
    (color == mahogany[0])? windowurl = './images/window/'+window_type_foldername+'/'+mahogany[1]+window_type_name+'.png':'';
    (color == driftWood[0])? windowurl = './images/window/'+window_type_foldername+'/'+driftWood[1]+window_type_name+'.png':'';
    (color == ceder[0])? windowurl = './images/window/'+window_type_foldername+'/'+ceder[1]+window_type_name+'.png':'';
    (color == darkOak[0])? windowurl = './images/window/'+window_type_foldername+'/'+darkOak[1]+window_type_name+'.png':'';
    (color == carbon[0])? windowurl = './images/window/'+window_type_foldername+'/'+carbon[1]+window_type_name+'.png':'';
    (color == classicWoodgrain[0])? windowurl = './images/window/'+window_type_foldername+'/'+classicWoodgrain[1]+window_type_name+'.png':'';









// }

    






return windowurl;

}