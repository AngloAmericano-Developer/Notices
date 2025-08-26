function printNotice() {
	var ventana = window.open('', 'PRINT');
	ventana.document.write('<html><head><title>Impresión Encuesta</title>');
	ventana.document.write('</head><body >');
	ventana.document.write($("#bodyTagLarge").html());
	//ventana.document.write($("#bodyNotice").html());
	ventana.document.write('</body></html>');
	ventana.document.close();
	ventana.focus();
	ventana.print();
	//ventana.close();
	return true;
}

function modalNotices(objectNotice,objectUser,objectData){
	$("#bodyTagLarge").load("views/adminView/modalNotices.html?v=4.5",function(){
		$("#titleModalLarge").text("Circular N° "+objectNotice["NUM"]+": "+objectNotice["SUBJECT"]);
		$("#titleModalLarge").css('text-align', 'center');
		$("#dateStart").text(objectNotice["DATE_START"]);
		$("#dateEnd").text(objectNotice["DATE_END"]);

		objectNotice["BODY"] = objectNotice["BODY"].replace(/\$nombrecompleto/gm,objectUser["NOMBRE"]);
		var body = objectNotice["BODY"].replace(/\$curso/gm,objectUser["CURSO"]);
		objectNotice["FOOTER"] = objectNotice["FOOTER"].replace(/\$nombrecompleto/gm,objectUser["NOMBRE"]);
		var footer = objectNotice["FOOTER"].replace(/\$curso/gm,objectUser["CURSO"]);

		/* Cargar Contenido y aplicar estilos */
		$("#bodyNotice").append(body);
		$("#bodyNotice table").css('border','0');
		$("#bodyNotice table").addClass('table');
		$("#bodyNotice table").addClass('table-responsive');
		$("#bodyNotice table").addClass('table-sm');
		$("#bodyNotice table").addClass('table-hover');
		$("#bodyNotice table").addClass('table-bordered');
		/* Cargar Desprendible y aplicar estilos */
		$("#bodyRemovable").append(footer);
		$("#bodyRemovable input").addClass('form-control');
		$("#bodyRemovable input").addClass('form-control-sm');
		$("#bodyRemovable table").css('border','0');
		$("#bodyRemovable table").addClass('table');
		$("#bodyRemovable table").addClass('table-responsive');
		$("#bodyRemovable table").addClass('table-sm');
		$("#bodyRemovable table").addClass('table-hover');
		$("#bodyRemovable table").addClass('table-bordered');

		$("#btnPrintNotice").off("click");
		$("#btnPrintNotice").click(function(e) {
			printNotice();
			e.preventDefault();
		});
		
		$(".authNotice").removeClass('active');
		var currentDate = new Date().toISOString().substring(0, 19).split('T');
		// var dateNow = currentDate[0];
		var dateNow = objectNotice["CUR_DATE"];
		var dateStart = objectNotice["DATE_START"];
		var dateEnd = objectNotice["DATE_END"];
		console.log(objectNotice);
		//console.log(dateNow+"**"+dateStart+"**"+dateEnd);
		if (dateNow >= dateStart && dateNow <= dateEnd) {
			$("#btnModalLarge").removeClass('d-none');
			if (objectNotice["TYPE_NOT"] == 2 || objectNotice["TYPE_NOT"] == 0) {
				// $("#btnModalLarge").removeAttr('disabled');
				console.log("Abierta");
			}
			else if (objectNotice["TYPE_NOT"] == 1 && (objectNotice["AUTH"] == "")) {
				$("#btnModalLarge").removeAttr('disabled');
				console.log("Abierta");
			}
			else {
				$("#btnModalLarge").removeAttr('disabled');
				//$("#btnModalLarge").attr('disabled',true);
				console.log("Cerrada");
			}
		}
		else {
			$("#btnModalLarge").attr('disabled',true);
			$("#btnModalLarge").addClass('d-none');
			console.log("Cerrada");
		}
		console.log(objectNotice);
		if (objectNotice["DATA_INFO"] != 0) {
			console.log(objectData);
			$.each(objectData, function(index, val) {
				$("#bodyNotice").html($("#bodyNotice").html().replace('$'+index, val));
				$("#bodyRemovable").html($("#bodyRemovable").html().replace('$'+index, val));
			});
		}
		sendConsult(objectNotice["NUM"]).done(function(response){
			console.log(response);
		}).fail(function(response){
			console.log(response);
		});
	});
	var code = objectNotice["CODE_JV"];
	if (code != "") {
		var code_script = code.match(/.*?<script>((.*(\n|\r|\s))*?)<\/script>/i);
		$("body").append('<script id="jsNotice">'+code_script[1]+'</script>');
	}
	if (objectNotice["TYPE_NOT"] == 1) {
		$("#bodyAuth").removeClass('d-none');
	}
	else {
		$("#bodyAuth").addClass('d-none');
	}
	$("#ModalLargeObs").off("hidden.bs.modal");
	$("#ModalLargeObs").on('hidden.bs.modal',function(){
		$("#jsNotice").remove();
		$("#errorModalLarge").text("");
		$("#errorModalLarge").removeClass("animated infinite pulse");
		$("#bodyNotice").children().remove();
		$("#bodyRemovable").children().remove();
		newsView();
		$("#bodyTagLarge").scrollTop( 50 );
	});
	$("#ModalLargeObs").modal("show");
	$("#form1").off("submit");
	$("#form1").on("submit", function(ev) {
		var data_form = $("#form1").serialize();
		var num_notice = objectNotice["NUM"];
		var type_notice = objectNotice["TYPE_NOT"];
		console.log(num_notice);
		console.log(data_form);
		var valid = (type_notice == 3 || num_notice === '190' || num_notice === '229')?true:validCircular(data_form);
		//if ($(".authNotice.active").data('val') == "No") {}
		if (valid || $(".authNotice.active").data('val') == "No") {
            $("#errorModalLarge").text("");
            $("#errorModalLarge").removeClass("animated infinite pulse");
            sendInfoNotice(data_form,num_notice).done(function(response){
            	$("#ModalLargeObs").modal("hide");
            	console.log(response);
            }).fail(function(response){
            	console.log(response);
            });
		}
		else {
			$("#errorModalLarge").text("Por favor valide que la información ingresada sea correcta");
            $("#errorModalLarge").css("color","red");
            $("#errorModalLarge").addClass("animated infinite pulse");
		}
		ev.preventDefault();
	});
}

function fillTable(object){
    var text = [];
    //console.log(object);
    $.each($(object),function(){
        text=$(this).text();
        if ($(object).attr('data-item') == "state") {
	        if(text.length == 0 || text=='0' ||text== 0){
	            var buttonFail = "<div class='btn btn-sm'><i class='fa fa-eye fa-sm' aria-hidden='true' ></i> Pendiente por Consultar</div>";
	            $(this).addClass('table-warning');
	            $(this).attr('data-state',$(this).text());
	            $(this).text("");
	            $(this).append(buttonFail);
	        }
	        else if(text==1||text=='1'){
	        	var val_not = $(this).attr('data-val');
	        	//var date_close = $("[data-val='"+val_not+"'][data-item='date_close']").text();
	        	//var date_consult = $("[data-val='"+val_not+"'][data-item='first_date']").text();
	        	var date_close_ = $("[data-val='"+val_not+"'][data-item='date_close']").text().split("/");
	        	var date_consult_ = $("[data-val='"+val_not+"'][data-item='first_date']").text().split("/");
	        	var date_close = new Date(date_close_[2], date_close_[1],date_close_[0])
	        	var date_consult = new Date(date_consult_[2], date_consult_[1],date_consult_[0])
	        	//console.log();
	        	//console.log(date_close + " -- "+ date_consult);
	        	if (date_close < date_consult) {
	        		var buttonOk = "<div class='btn btn-sm'><i class='fa fa-check-circle fa-sm' aria-hidden='true' ></i> Consultada Fuera de Tiempo </div>";
		            $(this).addClass('table-info');   
		            $(this).attr('data-state',$(this).text());
		            $(this).text("");
		            $(this).append(buttonOk);
	        	}
	        	else if (date_close >= date_consult) {
		            var buttonOk = "<div class='btn btn-sm'><i class='fa fa-check-circle fa-sm' aria-hidden='true' ></i> Consultada </div>";
		            $(this).addClass('table-success');   
		            $(this).attr('data-state',$(this).text());
		            $(this).text("");
		            $(this).append(buttonOk);
	        	}
	        }
        }
        if ($(object).attr('data-item') == "auth") {
	        if(text=='No'){
	            var buttonFail = "<div class='btn btn-sm'><i class='fa fa-times-circle fa-sm' aria-hidden='true' ></i> "+text+"</div>";
	            $(this).addClass('table-danger');
	            $(this).attr('data-state',$(this).text());
	            $(this).text("");
	            $(this).append(buttonFail);
	        }
	        else if(text=='Si'){
	            var buttonOk = "<div class='btn btn-sm'><i class='fa fa-check-circle fa-sm' aria-hidden='true' ></i> "+text+"</div>";
	            $(this).addClass('table-success');   
	            $(this).attr('data-state',$(this).text());
	            $(this).text("");
	            $(this).append(buttonOk);
	        }
	        else if(text=='Diligenciada'){
	            var buttonOk = "<div class='btn btn-sm'><i class='fa fa-check-circle fa-sm' aria-hidden='true' ></i> "+text+"</div>";
	            $(this).addClass('table-success');   
	            $(this).attr('data-state',$(this).text());
	            $(this).text("");
	            $(this).append(buttonOk);
	        }
	        else {
        		var val_not = $(this).attr('data-val');
        		var type_not = $("[data-val='"+val_not+"'][data-item='type']").text();
	        	if (type_not == "1" || type_not == 1 || type_not == "5" || type_not == 5) {
	        		var buttonOk = "<div class='btn btn-sm'><i class='fa fa-hourglass fa-sm' aria-hidden='true' ></i> Pendiente por Responder</div>";
		            $(this).addClass('table-warning');   
		            $(this).attr('data-state',$(this).text());
		            $(this).text("");
		            $(this).append(buttonOk);
	        	}
	        	else {
		            var buttonOk = "<div class='btn btn-sm'><i class='fa fa-dot-circle-o fa-sm' aria-hidden='true' ></i> No requiere</div>";
		            $(this).addClass('table-default');   
		            $(this).attr('data-state',$(this).text());
		            $(this).text("");
		            $(this).append(buttonOk);
	        	}
	        }
        }
    });
}

function newsView(){
	let notice = getNotices();
	let userInfo = getInfo();
	$.when(notice,userInfo).done(function(responseNotice,responseUser){
		$("#content").load("views/notices.html",function(){
			if (responseNotice[0]["code"] == 200) {
				$("#table_circ2").append("<pre class='alert alert-info'><p class='text-info consul text-center'>Para consultar la circular, dé clic en el texto del asunto. <p></pre>");
				let table_notices = createTable("temp",responseNotice[0]["response"],false, false, 1,true);
				$("#table_circ").append(table_notices);
				$("tr").each(function() {
					$(this).children("td:nth-child(4)").addClass('d-none');
				    $(this).children("td:nth-child(6)").addClass('d-none');
				    $(this).children("td:nth-child(8)").addClass('d-none');
				});
				fillTable($(".celValue[data-item='state']"));
				fillTable($(".celValue[data-item='auth']"));
				$("#table_temp th").addClass('text-center');
				$("#table_temp td").off("click");
				$("#table_temp td").click(function(e){
					console.log($(this).data("val"))
					let content = getContent($(this).data("val"));

					let dataInfo = dataNotice($(this).data("val"));
					$.when(content,dataInfo).done(function(responseCont,responseData){
						console.log(responseCont);
						console.log(responseData);
						modalNotices(responseCont[0]["response"],responseUser[0]["response"][0],responseData[0]["response"]);
					}).fail(function(responseCont,responseData){
						console.log(responseCont);
						console.log(responseData);
					});
					e.preventDefault();
				});
			}
		})
	}).fail(function(responseNotice,responseUser){
		console.log(responseNotice);
		console.log(responseUser);
	});
};