//var host = "http://192.168.1.10:8000/"; 
var host ="http://localhost:8000/";

function sleep(milliseconds) {
  console.log("sleeping..........");
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function toastr_message(messages){
    return {
            200: function() {
                toastr.success(messages["200"],messages["service"]);
            },
            400: function() {
                toastr.warning(messages["400"],messages["service"]);
            },
            500: function() {
                toastr.error(messages["500"],messages["service"]);
            }
        }

}
function cleanView(){
    $("#titleModal").text("");
    $("#titleModalLarge").text("");
    $("#bodyTag").children().remove();
    //$("#ModalObs").off('hidden.bs.modal');
    $("#ModalLargeObs").off('hidden.bs.modal');
    $("#form1").off('submit');
    $("#buttons_action").children().not(":first").remove();
    $("#modalCreate").removeClass('modal-lg');
    $("#navbarResponsive").removeClass('show');

}

function get_permission(host){
    return $.ajax({
        url:'../controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {param: 'permission', base:'r'},
    })
}

function hide_modules(array){
    $.each(modules_index,function(key, value) {
        get_permission(value).done(function(response){
            console.log(response);
            if(array.indexOf(value) == -1 || response['response']['actions'].indexOf(actions_sections['Read']) == -1){
                $("#"+key).parent().remove();
            }
        })
        .fail(function(response) {
            console.log(response);
        });
    });
}

function modulesMain(){
    moduleViews().done(function(response){
        var modAct = $(".body_").attr('id');
        $.each(response["response"], function(index, value) {
            var active = (value["id"] == modAct)?"active":"";
            var link = (value["id"] == modAct)?"#":"../"+value["path"];
            var numModule = '<ul class="navbar-nav ml-auto"><li class="'+active+'" id="m'+value["id"]+'"><a class="nav-link" href="'+link+'">'+value["module"]+'</a></li></ul>';
            $("#navbarResponsive").append(numModule);
        });
        var modBack = '<ul class="navbar-nav ml-auto"><li class="nav-item"><a class="nav-link" href="../index.html"><i class="fa fa-fw fa-home"></i>Volver</a></li></ul>';
        $("#navbarResponsive").append(modBack);
    }).fail(function(response){
        console.log(response);
    });
}

function denyRead(){
    $("#content").load("views/error.html",function(){
        $("#content_error").addClass('text-danger');
        $("#content_error").text("UPS!!! no tienes permisos para ver esta sección. No seas curioso...");
    });
}

function logged_area(){
    $(".body_").children().remove();
    $(".body_").load("views/body.html",function(){
        let urlParams = new URLSearchParams(location.search);
        let keys = urlParams.keys();
        // Display the key/value pairs
        for(var key of keys) {
            console.log(key);
        }
        get_permission(host).done(function(response){
            if(response['response'].length > 0){
                $.each(response['response'],function(key,value) {
                    $("#"+value).removeClass('d-none');
                    $("#"+value).addClass('animated flipInX');
                });
                //$(".item#circ").parent().addClass("active animated flip");
            }
            else {
                location.href = "../index.html";
            }
        }).fail(function(response){
            console.log(response);
        });
        modulesMain();
        //$("#modalView").load("views/modalObs.html");
        $("#circularView").load("views/modalLarge.html");
        $(".item").click(function(){
            $(".nav-item").removeClass("active animated flip");
            $(this).parent().addClass("active animated flip");    
            $("#content").addClass("bg-default");
            cleanView();
            switch ($(this).attr("id")){
                case 'circ':
                    newsView();
                    break;
                case 'surveys':
                    surveysView();
                    break;
                // case 'QueryCirc':
                //     $("#content").html('<iframe src="../circular/consultacir/consultacir.php" style="width:100%; height:100vh; border:none;"></iframe>');
                //     break;
                case 'allNotices':
                    $("#content").html('<iframe src="../circular/lista/circularAdminv2.php" style="width:100%; height:100vh; border:none;"></iframe>');
                    break;
                case 'printRemovable':
                    $("#content").load("../documentos/PDF/generator/documento.php?pag=ZGVzcHJlbmRpYmxlLnBocA==");
                    break;
                case 'viewList':
                    viewListComplete();
                    break;
                default:
                    alert($(this).attr('id'));
                    break;
            }
  
        });
        var activeMod = $(location).attr('search');
        if (activeMod != null && activeMod != undefined && activeMod != "") {
            activeMod = activeMod.replace("?", "");
            console.log(activeMod);
            getUrl = activeMod.split("=");
            console.log(getUrl);
            if (getUrl[0] == "mod") {                
                $("#"+getUrl[1]).click();
            }
        }
        else {
            $(".item#circ").parent().addClass("active animated flip");
            newsView();
        }
        alert('Presione Control y la tecla F5 simultaneamente (Ctrl+F5) para actualizar la página.');
    });
}


document.oncontextmenu = function(){return false;}

$(document).ready(function(){
    
    logged_area();  
    //$(".item#circ").parent().addClass("active animated flip"); 

});
