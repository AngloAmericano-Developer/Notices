var date = new Date();
function optionRadio(object){
	var option = $(object).attr('data-val');
	var option_id = $(object).find('input').attr('name');
	if (option == "R" || option == "Si" || option == "ADMISIONES" || option == "SISTEMAS" || option == "CARTERA") {
		$("#div_"+option_id).removeClass('d-none');
	}else {
		$("#div_"+option_id).addClass('d-none');
		$("#div_"+option_id).find('textarea').val("");
	}
}

function optionRadio_I_A(object){
	var option = $(object).attr('data-val');
	var option_id = $(object).find('input').attr('name');
	if (option == "I"||option == "A") {
		$("#div_"+option_id).removeClass('d-none');
	}
	else {
		$("#div_"+option_id).addClass('d-none');
		$("#div_"+option_id).find('textarea').val("");
	}
}
function optionRadio_R_M(object){
	var option = $(object).attr('data-val');
	var option_id = $(object).find('input').attr('name');
	if (option == "R"||option == "M") {
		$("#div_"+option_id).removeClass('d-none');
	}
	else {
		$("#div_"+option_id).addClass('d-none');
		$("#div_"+option_id).find('textarea').val("");
	}
}
function optionRadio_SC(object){
	var option = $(object).attr('data-val');
	var option_id = $(object).find('input').attr('name');
	if (option == "R"||option == "M"||option == "Dificil"||option == "Muy_dificil"||option == "Poco_clara"||option == "Confusa"||option == "Poco_convenientes"||option == "Inconvenientes") {
		$("#div_"+option_id).removeClass('d-none');
	}
	else {
		$("#div_"+option_id).addClass('d-none');
		$("#div_"+option_id).find('textarea').val("");
	}
}
function optionRadioYN(object){
	var option = $(object).attr('data-val');
	var option_id = $(object).find('input').attr('name');
	if (option_id == "question_6") {
		if (option == "SI") {
			$("#div_"+option_id).removeClass('d-none');
		}
		else {
			$("#div_"+option_id).addClass('d-none');
			$("#div_"+option_id).find('textarea').val("");
		}
	}else if (option_id == "question_7"){
		if (option == "NO") {
			$("#div_"+option_id).removeClass('d-none');
		}
		else {
			$("#div_"+option_id).addClass('d-none');
			$("#div_"+option_id).find('textarea').val("");
		}
	}else if (option_id == "question_15"){
		if (option == "NO") {
			$("#div_"+option_id).removeClass('d-none');
		}
		else {
			$("#div_"+option_id).addClass('d-none');
			$("#div_"+option_id).find('textarea').val("");
		}
	}
	if(option_id == "question_3") {
		if (option == "No") {
			$("#div_"+option_id).removeClass('d-none');
		}
		else {
			$("#div_"+option_id).addClass('d-none');
			$("#div_"+option_id).find('textarea').val("");
		}
	}	
	
}
function showOptionsYN(object){
	var option = $(object).attr('data-val');
	var option_id = $(object).find('input').attr('name');
	var option_children = option_id.split("_")[1]+"_"+option_id.split("_")[2];
	if (option == "Si") {
		$("#"+option_id).removeClass('d-none');
	}
	else {
		$("#"+option_id).addClass('d-none');
		$("#div_"+option_children).addClass('d-none');
		$("."+option_children).removeClass('active');
	}	
}
function optionRadioBack(object){
	var option = $(object).attr('data-val');
	var option_id = $(object).find('input').attr('name');
	if (option == "Si") {
		$("#div_"+option_id).removeClass('d-none');
	}
	else {
		$("#div_"+option_id).addClass('d-none');
		$("#div_"+option_id).find('textarea').val("");
	}
}

function optionRadio1a5(object){
	var option = $(object).attr('data-val');
	var option_id = $(object).find('input').attr('name');
	if (option_id == "question_12") {
		if (option == "1"||option == "2"||option == "3") {
			$("#div_"+option_id).removeClass('d-none');
		}
		else {
			$("#div_"+option_id).addClass('d-none');
			$("#div_"+option_id).find('textarea').val("");
		}
	}
}

function tableSurveyTeacherPres(teachers) {
	var table = "<table class = 'table table-responsive table-sm table-hover table-bordered table-striped animated fadeIn' id='' style='font-size:16px;'><thead class='thead-active text-center'><tr><th scope='col' style='text-align: center;' rowspan='2'></th> <th scope='col' style='text-align: center;' colspan='4'>Cordialidad</th> <th scope='col' style='text-align: center;' colspan='4'>Aspecto Académico</th></tr><tr><th scope='col' style='text-align: center;'>E</th><th scope='col' style='text-align: center;'>B</th><th scope='col' style='text-align: center;'>R</th><th scope='col' style='text-align: center;'>NA</th><th scope='col' style='text-align: center;'>E</th><th scope='col' style='text-align: center;'>B</th><th scope='col' style='text-align: center;'>R</th><th scope='col' style='text-align: center;'>NA</th></tr></thead><tbody class=''>";
	//var table = "<table class = 'table table-responsive table-sm table-hover table-bordered table-striped animated fadeIn' id='' style='font-size:16px;'><thead class='thead-active text-center'><tr><th scope='col' style='text-align: center;' rowspan='2'></th> <th scope='col' style='text-align: center;' colspan='4'>Cordialidad</th> <th scope='col' style='text-align: center;' colspan='4'>Aspecto Académico</th></tr><tr><th scope='col' style='text-align: center;' colspan='4'>E / B / R / NA</th><th scope='col' style='text-align: center;' colspan='4'>E / B / R / NA</th></tr></thead><tbody class=''>";
    $.each(teachers, function(index, value) {
    	text_teacher = (value["Subject"] == null)?"<td class='celValue questionTeacher' data-val='"+value["id_subject"]+"_"+value["id_teacher"]+"'><b>"+value["Profile"]+":</b> "+value["Teacher"]+"</td>":"<td class='celValue questionTeacher' data-val='"+value["id_subject"]+"_"+value["id_teacher"]+"'><b>"+value["Profile"]+" DE "+value["Subject"]+":</b> "+value["Teacher"]+"</td>";
    	radio_cordiality = "<td colspan='4' class='celValue text-center'><div class='btn-group' data-toggle='buttons'><label class='btn btn-outline-success btn-sm optionQuestion cord_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='E'><input class='form-control' type='radio' name='cord_"+value["id_subject"]+"_"+value["id_teacher"]+"'>E <i class='fa fa-check' aria-hidden='true'></i></label><label class='btn btn-outline-primary btn-sm optionQuestion cord_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='B'><input class='form-control' type='radio' name='cord_"+value["id_subject"]+"_"+value["id_teacher"]+"'>B <i class='fa fa-check' aria-hidden='true'></i></label><label class='btn btn-outline-danger btn-sm optionQuestion cord_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='R'><input class='form-control' type='radio' name='cord_"+value["id_subject"]+"_"+value["id_teacher"]+"'>R <i class='fa fa-check' aria-hidden='true'></i></label><label class='btn btn-outline-dark btn-sm optionQuestion cord_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='NA'><input class='form-control' type='radio' name='cord_"+value["id_subject"]+"_"+value["id_teacher"]+"'>NA <i class='fa fa-check' aria-hidden='true'></i></label></div><div class='input-group p-2 animated fadeInDown d-none' id='div_cord_"+value["id_subject"]+"_"+value["id_teacher"]+"'><textarea class='form-control' id='reason_cord_"+value["id_subject"]+"_"+value["id_teacher"]+"' placeholder='Motivo' rows='2'></textarea></div></td>";
    	radio_academic = "<td colspan='4' class='celValue text-center'><div class='btn-group' data-toggle='buttons'><label class='btn btn-outline-success btn-sm optionQuestion acad_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='E'><input class='form-control' type='radio' name='acad_"+value["id_subject"]+"_"+value["id_teacher"]+"'>E <i class='fa fa-check' aria-hidden='true'></i></label><label class='btn btn-outline-primary btn-sm optionQuestion acad_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='B'><input class='form-control' type='radio' name='acad_"+value["id_subject"]+"_"+value["id_teacher"]+"'>B <i class='fa fa-check' aria-hidden='true'></i></label><label class='btn btn-outline-danger btn-sm optionQuestion acad_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='R'><input class='form-control' type='radio' name='acad_"+value["id_subject"]+"_"+value["id_teacher"]+"'>R <i class='fa fa-check' aria-hidden='true'></i></label><label class='btn btn-outline-dark btn-sm optionQuestion acad_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='NA'><input class='form-control' type='radio' name='acad_"+value["id_subject"]+"_"+value["id_teacher"]+"'>NA <i class='fa fa-check' aria-hidden='true'></i></label></div><div class='input-group p-2 animated fadeInDown d-none' id='div_acad_"+value["id_subject"]+"_"+value["id_teacher"]+"'><textarea class='form-control' id='reason_acad_"+value["id_subject"]+"_"+value["id_teacher"]+"' placeholder='Motivo' rows='2'></textarea></div></td>";
		table = table+"<tr>"+text_teacher+radio_cordiality+radio_academic+"</tr>";
    });
	table = table+"</tbody></table>";
	return table;
}

function dataSurveyTeachersPres(){
	var items = Array();
	var dataSend = {};
	$(".questionTeacher").each(function() {
		var data_id = $(this).data('val');
		var data_cord = $(".cord_"+data_id+".active").data('val');
		var data_acad = $(".acad_"+data_id+".active").data('val');
		var reason_cord = $("#reason_cord_"+data_id).val();
		var reason_acad = $("#reason_acad_"+data_id).val();
		var data_array = {'cord':data_cord, 'reason_cord':reason_cord, 'acad': data_acad, 'reason_acad': reason_acad};
		items.push({'data':data_cord,'item':data_id,'type':'radio','obligatory':true});
		items.push({'data':data_acad,'item':data_id,'type':'radio','obligatory':true});
		items.push({'data':reason_cord,'item':data_id,'type':'text','obligatory':(data_cord=="R")?true:false});
		items.push({'data':reason_acad,'item':data_id,'type':'text','obligatory':(data_acad=="R")?true:false});
		dataSend[data_id] = data_array;
	});
	return {'items':items, 'dataSend':dataSend};
}

// ENCUESTA ACTIVA
function surveyParentsPres(num_survey,course){
	getTeachersCourse().done(function(postTeachers){
		$("#titleModalLarge").text("Encuesta a Padres de Familia Preescolar");
		// $("#bodyNotice").load("views/adminView/surveyParentsPres.html",function(){
		$("#bodyNotice").load("views/adminView/surveyParentsPres_v2.html",function(){
			$("#table_teachers").append('<p class="text-justify"><strong>6. Opinión sobre el personal docente:</strong></p><p class="text-justify"><strong>Instrucciones:</strong></p><p class="text-justify">Por favor registren su concepto sobre cada persona. (<strong>E</strong> = Excelente; <strong>B</strong> = Bueno; <strong>R</strong> =  Regular), teniendo en cuenta los siguientes aspectos:</p><p class="text-justify"><ul><li type="disc">El nivel de cordialidad de la persona ha sido.</li><li type="disc">La atención, asesoría y apoyo brindados a su hijo(a) en el aspecto académico han sido.</li></ul></p>'+tableSurveyTeacherPres(postTeachers["response"]));
			$(".optionQuestion").click(function(e) {
				optionRadio($(this));
				e.preventDefault();
			});
			$("#semester").text("2025");
			$("#text_section_6").addClass("d-none");
			$("#section_6").next().addClass("d-none");
			$("#section_6").addClass("d-none");
			//$("#text_section_2").html("<strong>1.</strong> Con el deseo de que ustedes puedan evaluar el  progreso de su hijo(a) en inglés por favor responda lo siguiente:");
			//$("#text_section_3").html("<strong>2.</strong> Opinión sobre la directora  de curso:</p>");
			 $("#label_question_4").parent().addClass('d-none');
			 $("#label_question_5").parent().addClass('d-none');
			$("#btnModalLarge").prop("onclick", null).off("click");
			$("#btnModalLarge").click(function(e) {
				
				var question_1 = $(".question_1.active").data('val');
				var question_2 = $(".question_2.active").data('val');
				var question_3 = $(".question_3.active").data('val');
				var question_4 = $(".question_4.active").data('val');
				var question_5 = $(".question_5.active").data('val');
				var question_6 = $(".question_6.active").data('val');
				var question_7 = $(".question_7.active").data('val');
				var question_8 = $(".question_8.active").data('val');
				var question_9 = $(".question_9.active").data('val');
				var question_10 = $(".question_10.active").data('val');
				var question_11 = $(".question_11.active").data('val');
				var question_12 = $(".question_12.active").data('val');
				var question_13 = $(".question_13.active").data('val');
				var question_14 = $(".question_14.active").data('val');
				var question_15 = $(".question_15.active").data('val');
				var question_16 = $(".question_16.active").data('val');
				var reason_question_5 = $("#reason_question_5").val();
				var reason_question_7 = $("#reason_question_7").val();
				var reason_question_8 = $("#reason_question_8").val();
				var reason_question_9 = $("#reason_question_9").val();
				var reason_question_10 = $("#reason_question_10").val();
				var reason_question_11 = $("#reason_question_11").val();
				var reason_question_13 = $("#reason_question_13").val();
				var observation = $("#observation").val();
				var valid = validFormActData([
							{'data':question_1,'item':'question_1','type':'radio', 'obligatory':true},
							{'data':question_2,'item':'question_2','type':'radio', 'obligatory':true},
							{'data':question_3,'item':'question_3','type':'radio', 'obligatory':true},
							{'data':question_4,'item':'question_4','type':'radio', 'obligatory':false},
							{'data':question_5,'item':'question_5','type':'radio', 'obligatory':false},
							{'data':question_6,'item':'question_6','type':'radio', 'obligatory':true},
							{'data':question_7,'item':'question_7','type':'radio', 'obligatory':true},
							{'data':question_8,'item':'question_8','type':'radio', 'obligatory':true},
							{'data':question_9,'item':'question_9','type':'radio', 'obligatory':true},
							{'data':question_10,'item':'question_10','type':'radio', 'obligatory':true},
							{'data':question_11,'item':'question_11','type':'radio', 'obligatory':true},
							{'data':question_12,'item':'question_12','type':'radio', 'obligatory':true},
							{'data':question_13,'item':'question_13','type':'radio', 'obligatory':true},
							{'data':question_14,'item':'question_14','type':'radio', 'obligatory':true},
							{'data':question_15,'item':'question_15','type':'radio', 'obligatory':true},
							{'data':question_16,'item':'question_16','type':'radio', 'obligatory':false},
							{'data':reason_question_5,'item':'question_5','type':'text', 'obligatory':(question_5=="R")?true:false},
							{'data':reason_question_7,'item':'question_7','type':'text', 'obligatory':(question_7=="R")?true:false},
							{'data':reason_question_8,'item':'question_8','type':'text', 'obligatory':(question_8=="R")?true:false},
							{'data':reason_question_9,'item':'question_9','type':'text', 'obligatory':(question_9=="R")?true:false},
							{'data':reason_question_10,'item':'question_10','type':'text', 'obligatory':(question_10=="R")?true:false},
							{'data':reason_question_11,'item':'question_11','type':'text', 'obligatory':(question_11=="R")?true:false},
							{'data':reason_question_13,'item':'question_13','type':'text', 'obligatory':(question_13=="R")?true:false},
							]);
				var validSave = true;
				var dataTeachers = dataSurveyTeachersPres();
				var validInfo = validFormActData(dataTeachers["items"]);

				if (valid["validate"] && validInfo["validate"]) {
					var infoSend = dataTeachers["dataSend"];
					let parentsPres = submitParentsPres(num_survey,course,question_1,question_2,question_3,question_6,question_7,question_8,question_9,question_10,question_11,question_12,question_13,question_14,question_15,reason_question_7,reason_question_8,reason_question_9,reason_question_10,reason_question_11,reason_question_13,observation,infoSend);
					
					$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
					$("#btnModalLarge").attr('disabled', true);
					$.when(parentsPres).done(function(response){
						$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
						$("#btnModalLarge").removeAttr('disabled');
						$(".labelCheck").remove();
						$(".celValue").each(function() {
							$(this).removeClass('labelInvalid');
							$(this).addClass('labelValid');
							$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
							$(this).removeClass("animated infinite pulse");
						});
						$("#ModalLargeObs").modal("hide");
					}).fail(function(response){
						console.log(response);
					});
				}
				else {
					validSave = false;
					$(".labelCheck").remove();
					$(".celValue").each(function() {
						$(this).removeClass('labelValid');
						$(this).removeClass('labelInvalid');
						$(this).removeClass('animated infinite pulse');
					});
					$.each(valid['items'],function(key,label) {
						$("#label_"+label).addClass('labelInvalid');
						$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
						$("#label_"+label).addClass("animated infinite pulse");
						$("#"+label).focus();
						$("."+label).focus();
					});
					$.each(validInfo['items'],function(key,label) {
						$(".questionTeacher[data-val='"+label+"']").addClass('labelInvalid');
						$(".questionTeacher[data-val='"+label+"']").append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
						$(".questionTeacher[data-val='"+label+"']").addClass("animated infinite pulse");
						$("#"+label).focus();
						$("."+label).focus();
					});
				}
				e.preventDefault();
			});
		});
		$("#ModalLargeObs").modal("show");
	}).fail(function(response){
		console.log(response);
	});
}

function surveyParentsPresCorta(num_survey,course){
	$("#titleModalLarge").text("Encuesta a Padres de Familia Preescolar");
	$("#bodyNotice").load("views/adminView/surveyParentsPresCorta.html",function(){
		$("#semester").text("2023");
		$(".optionQuestion").click(function(e) {
			optionRadio($(this));
			e.preventDefault();
		});
		$("#btnModalLarge").prop("onclick", null).off("click");
		$("#btnModalLarge").click(function(e) {	
		var question_1 = $(".question_1.active").data('val');
		var question_2 = $(".question_2.active").data('val');
		var question_3 = $(".question_3.active").data('val');
		var question_6 = $(".question_6.active").data('val');
		var question_7 = $(".question_7.active").data('val');
		var question_8 = $(".question_8.active").data('val');
		var question_9 = $(".question_9.active").data('val');
		var question_10 = $(".question_10.active").data('val');
		var question_11 = $(".question_11.active").data('val');
		var question_12 = $(".question_12.active").data('val');
		var question_13 = $(".question_13.active").data('val');
		var question_14 = $(".question_14.active").data('val');
		var question_15 = $(".question_15.active").data('val');
		var reason_question_7 = $("#reason_question_7").val();
		var reason_question_8 = $("#reason_question_8").val();
		var reason_question_9 = $("#reason_question_9").val();
		var reason_question_10 = $("#reason_question_10").val();
		var reason_question_11 = $("#reason_question_11").val();
		var reason_question_13 = $("#reason_question_13").val();
		var valid = validFormActData([
					{'data':question_1,'item':'question_1','type':'radio', 'obligatory':true},
					{'data':question_2,'item':'question_2','type':'radio', 'obligatory':true},
					{'data':question_3,'item':'question_3','type':'radio', 'obligatory':true},
					{'data':question_6,'item':'question_6','type':'radio', 'obligatory':true},
					{'data':question_7,'item':'question_7','type':'radio', 'obligatory':true},
					{'data':question_8,'item':'question_8','type':'radio', 'obligatory':true},
					{'data':question_9,'item':'question_9','type':'radio', 'obligatory':true},
					{'data':question_10,'item':'question_10','type':'radio', 'obligatory':true},
					{'data':question_11,'item':'question_11','type':'radio', 'obligatory':true},
					{'data':question_12,'item':'question_12','type':'radio', 'obligatory':true},
					{'data':question_13,'item':'question_13','type':'radio', 'obligatory':true},
					{'data':question_14,'item':'question_14','type':'radio', 'obligatory':true},
					{'data':question_15,'item':'question_15','type':'radio', 'obligatory':true},
					{'data':reason_question_7,'item':'question_7','type':'text', 'obligatory':(question_7=="R")?true:false},
					{'data':reason_question_8,'item':'question_8','type':'text', 'obligatory':(question_8=="R")?true:false},
					{'data':reason_question_9,'item':'question_9','type':'text', 'obligatory':(question_9=="R")?true:false},
					{'data':reason_question_10,'item':'question_10','type':'text', 'obligatory':(question_10=="R")?true:false},
					{'data':reason_question_11,'item':'question_11','type':'text', 'obligatory':(question_11=="R")?true:false},
					{'data':reason_question_13,'item':'question_13','type':'text', 'obligatory':(question_13=="R")?true:false},
					]);
			if (valid["validate"]) {
				let parentsPres = submitParentsPresCorta(num_survey,course,question_1,question_2,question_3,question_6,question_7,question_8,question_9,question_10,question_11,question_12,question_13,question_14,question_15,reason_question_7,reason_question_8,reason_question_9,reason_question_10,reason_question_11,reason_question_13);
				
				$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
				$("#btnModalLarge").attr('disabled', true);
				$.when(parentsPres).done(function(response){
					$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
					$("#btnModalLarge").removeAttr('disabled');
					$(".labelCheck").remove();
					$(".celValue").each(function() {
						$(this).removeClass('labelInvalid');
						$(this).addClass('labelValid');
						$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
						$(this).removeClass("animated infinite pulse");
					});
					$("#ModalLargeObs").modal("hide");
				}).fail(function(response){
					console.log(response);
				});
			}
			else {
				validSave = false;
				$(".labelCheck").remove();
				$(".celValue").each(function() {
					$(this).removeClass('labelValid');
					$(this).removeClass('labelInvalid');
					$(this).removeClass('animated infinite pulse');
				});
				$.each(valid['items'],function(key,label) {
					$("#label_"+label).addClass('labelInvalid');
					$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
					$("#label_"+label).addClass("animated infinite pulse");
					$("#"+label).focus();
					$("."+label).focus();
				});
			}
			e.preventDefault();
		});
	});
	$("#ModalLargeObs").modal("show");
	
}

function printSurvey() {
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

function tableSurveyTeacher(teachers) {
	var table = "<table class = 'table table-responsive table-sm table-hover table-bordered table-striped animated fadeIn' id='' style='font-size:16px;'><thead class='thead-active text-center'><tr><th scope='col' style='text-align: center;' rowspan='2'></th> </tr><tr><th scope='col' style='text-align: center;'>E</th><th scope='col' style='text-align: center;'>B</th><th scope='col' style='text-align: center;'>R</th><th scope='col' style='text-align: center;'>NA</th></tr></thead><tbody class=''>";
    $.each(teachers, function(index, value) {
    	text_teacher = (value["Subject"] == null)?"<td class='celValue questionTeacher' data-val='"+value["id_subject"]+"_"+value["id_teacher"]+"'><b>"+value["Profile"]+":</b> "+value["Teacher"]+"</td>":"<td class='celValue questionTeacher' data-val='"+value["id_subject"]+"_"+value["id_teacher"]+"'><b>"+value["Profile"]+" DE "+value["Subject"]+":</b> "+value["Teacher"]+"</td>";
    	radio_cordiality = "<td colspan='4' class='celValue text-center'><div class='btn-group' data-toggle='buttons'><label class='btn btn-outline-success btn-sm optionQuestion cord_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='E'><input class='form-control' type='radio' name='cord_"+value["id_subject"]+"_"+value["id_teacher"]+"'>E <i class='fa fa-check' aria-hidden='true'></i></label><label class='btn btn-outline-primary btn-sm optionQuestion cord_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='B'><input class='form-control' type='radio' name='cord_"+value["id_subject"]+"_"+value["id_teacher"]+"'>B <i class='fa fa-check' aria-hidden='true'></i></label><label class='btn btn-outline-danger btn-sm optionQuestion cord_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='R'><input class='form-control' type='radio' name='cord_"+value["id_subject"]+"_"+value["id_teacher"]+"'>R <i class='fa fa-check' aria-hidden='true'></i></label><label class='btn btn-outline-dark btn-sm optionQuestion cord_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='NA'><input class='form-control' type='radio' name='cord_"+value["id_subject"]+"_"+value["id_teacher"]+"'>NA <i class='fa fa-check' aria-hidden='true'></i></label></div><div class='input-group p-2 animated fadeInDown d-none' id='div_cord_"+value["id_subject"]+"_"+value["id_teacher"]+"'><textarea class='form-control' id='reason_cord_"+value["id_subject"]+"_"+value["id_teacher"]+"' placeholder='Motivo' rows='2'></textarea></div></td>";
    	/*radio_academic = "<td colspan='4' class='celValue text-center'><div class='btn-group' data-toggle='buttons'><label class='btn btn-outline-success btn-sm optionQuestion acad_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='E'><input class='form-control' type='radio' name='acad_"+value["id_subject"]+"_"+value["id_teacher"]+"'>E <i class='fa fa-check' aria-hidden='true'></i></label><label class='btn btn-outline-primary btn-sm optionQuestion acad_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='B'><input class='form-control' type='radio' name='acad_"+value["id_subject"]+"_"+value["id_teacher"]+"'>B <i class='fa fa-check' aria-hidden='true'></i></label><label class='btn btn-outline-danger btn-sm optionQuestion acad_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='R'><input class='form-control' type='radio' name='acad_"+value["id_subject"]+"_"+value["id_teacher"]+"'>R <i class='fa fa-check' aria-hidden='true'></i></label><label class='btn btn-outline-dark btn-sm optionQuestion acad_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='NA'><input class='form-control' type='radio' name='acad_"+value["id_subject"]+"_"+value["id_teacher"]+"'>NA <i class='fa fa-check' aria-hidden='true'></i></label></div><div class='input-group p-2 animated fadeInDown d-none' id='div_acad_"+value["id_subject"]+"_"+value["id_teacher"]+"'><textarea class='form-control' id='reason_acad_"+value["id_subject"]+"_"+value["id_teacher"]+"' placeholder='Motivo' rows='2'></textarea></div></td>";*/
    	/*radio_formative = "<td colspan='4' class='celValue text-center'><div class='btn-group' data-toggle='buttons'><label class='btn btn-outline-success btn-sm optionQuestion forma_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='E'><input class='form-control' type='radio' name='forma_"+value["id_subject"]+"_"+value["id_teacher"]+"'>E <i class='fa fa-check' aria-hidden='true'></i></label><label class='btn btn-outline-primary btn-sm optionQuestion forma_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='B'><input class='form-control' type='radio' name='forma_"+value["id_subject"]+"_"+value["id_teacher"]+"'>B <i class='fa fa-check' aria-hidden='true'></i></label><label class='btn btn-outline-danger btn-sm optionQuestion forma_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='R'><input class='form-control' type='radio' name='forma_"+value["id_subject"]+"_"+value["id_teacher"]+"'>R <i class='fa fa-check' aria-hidden='true'></i></label><label class='btn btn-outline-dark btn-sm optionQuestion forma_"+value["id_subject"]+"_"+value["id_teacher"]+"' data-val='NA'><input class='form-control' type='radio' name='forma_"+value["id_subject"]+"_"+value["id_teacher"]+"'>NA <i class='fa fa-check' aria-hidden='true'></i></label></div><div class='input-group p-2 animated fadeInDown d-none' id='div_forma_"+value["id_subject"]+"_"+value["id_teacher"]+"'><textarea class='form-control' id='reason_forma_"+value["id_subject"]+"_"+value["id_teacher"]+"' placeholder='Motivo' rows='2'></textarea></div></td>";*/
		/*table = table+"<tr>"+text_teacher+radio_cordiality+radio_academic+radio_formative+"</tr>";*/
		table = table+"<tr>"+text_teacher+radio_cordiality+"</tr>";
    });
	table = table+"</tbody></table>";
	return table;
}

function dataSurveyTeachers(){
	var items = Array();
	var dataSend = {};
	$(".questionTeacher").each(function() {
		var data_id = $(this).data('val');
		var data_cord = $(".cord_"+data_id+".active").data('val');
		/*var data_acad = $(".acad_"+data_id+".active").data('val');*/
		/*var data_forma = $(".forma_"+data_id+".active").data('val');*/
		var reason_cord = $("#reason_cord_"+data_id).val();
		/*var reason_acad = $("#reason_acad_"+data_id).val();*/
		/*var reason_forma = $("#reason_forma_"+data_id).val();*/
		var data_array = {'cord':data_cord, 'reason_cord':reason_cord};
		items.push({'data':data_cord,'item':data_id,'type':'radio','obligatory':true});
		items.push({'data':reason_cord,'item':data_id,'type':'text','obligatory':(data_cord=="R")?true:false});
		dataSend[data_id] = data_array;
	});
	return {'items':items, 'dataSend':dataSend};
}

function surveyParents(num_survey,course){
	getTeachersCourse().done(function(postTeachers){
		$("#titleModalLarge").text("Encuesta a Padres de Familia");
		$("#bodyNotice").load("views/adminView/surveyParentsGeneral.html?v=1",function(){
			/*$("#section_3").prev().addClass('d-none');
			$("#section_3").addClass('d-none');
			$("#section_3").next().addClass('d-none');
			$("#section_3").prev().css('display','none');
			$("#section_3").css('display','none');
			$("#section_3").next().css('display','none');
			$("#section_3").next().next().html('<b>3. Opinión sobre el personal docente:</b>');*/
			$("#table_teachers").append(tableSurveyTeacher(postTeachers["response"]));
			$(".optionQuestion").click(function(e) {
				optionRadio($(this));
				var option_id = $(this).find('input').attr('name');
				if (option_id == "question_16") {
					var option = $(this).attr('data-val');
					if (option == "Si") {
						$(".div_"+option_id).removeClass('d-none');
						}
						else{
							$(".div_"+option_id).addClass('d-none');
						}	
				}	

				e.preventDefault();
			});

			$("#semester").text("primer semestre del año 2025");
			var periodo = 1;
			$("#btnPrintNotice").click(function(e) {
				printSurvey();
				e.preventDefault();
			});
			$("#btnModalLarge").prop("onclick", null).off("click");
			$("#btnModalLarge").click(function(e) {
				var question_1 = $(".question_1.active").data('val');
				var question_2 = $(".question_2.active").data('val');
				var question_3 = $(".question_3.active").data('val');
				var question_4 = $(".question_4.active").data('val');
				var question_5 = $(".question_5.active").data('val');
				var question_6 = $(".question_6.active").data('val');
				var question_7 = $(".question_7.active").data('val');
				var question_8 = $(".question_8.active").data('val');
				/*var question_9 = $(".question_9.active").data('val');*/
				var question_10 = $(".question_10.active").data('val');
				var question_14 
				var question_15
				var question_16 = $(".question_16.active").data('val');
				if (question_16 =="Si"){
					question_14 = $(".question_14.active").data('val');
					question_15 = $(".question_15.active").data('val');
				}else{
					 question_14 = "";
					 question_15 = "";
				}

				var reason_question_1 = $("#reason_question_1").val();
				var reason_question_2 = $("#reason_question_2").val();
				var reason_question_3 = $("#reason_question_3").val();
				var reason_question_4 = $("#reason_question_4").val();
				var reason_question_5 = $("#reason_question_5").val();
				var reason_question_7 = $("#reason_question_7").val();
				var reason_question_8 = $("#reason_question_8").val();
				var reason_question_10 = $("#reason_question_10").val();
				var observation = $("#observation").val();
				var valid = validFormActData([{'data':question_1,'item':'question_1','type':'radio', 'obligatory':true},
							{'data':question_2,'item':'question_2','type':'radio', 'obligatory':true},
							{'data':question_3,'item':'question_3','type':'radio', 'obligatory':true},
							{'data':question_4,'item':'question_4','type':'radio', 'obligatory':true},
							{'data':question_5,'item':'question_5','type':'radio', 'obligatory':true},
							{'data':question_6,'item':'question_6','type':'radio', 'obligatory':true},
							{'data':question_7,'item':'question_7','type':'radio', 'obligatory':true},
							{'data':question_8,'item':'question_8','type':'radio', 'obligatory':true},
							/*{'data':question_9,'item':'question_9','type':'radio', 'obligatory':true},*/
							{'data':question_10,'item':'question_10','type':'radio', 'obligatory':true},
							{'data':question_14,'item':'question_14','type':'radio', 'obligatory':(question_16=="Si")?true:false},
							{'data':question_15,'item':'question_15','type':'radio', 'obligatory':(question_16=="Si")?true:false},
							{'data':question_16,'item':'question_16','type':'radio', 'obligatory':true},
							{'data':reason_question_1,'item':'question_1','type':'text', 'obligatory':(question_1=="R")?true:false},
							{'data':reason_question_2,'item':'question_2','type':'text', 'obligatory':(question_2=="R")?true:false},
							{'data':reason_question_3,'item':'question_3','type':'text', 'obligatory':(question_3=="R")?true:false},
							{'data':reason_question_4,'item':'question_4','type':'text', 'obligatory':(question_4=="R")?true:false},
							{'data':reason_question_5,'item':'question_5','type':'text', 'obligatory':(question_5=="R")?true:false},
							{'data':reason_question_7,'item':'question_7','type':'text', 'obligatory':(question_7=="R")?true:false},
							{'data':reason_question_8,'item':'question_8','type':'text', 'obligatory':(question_8=="R")?true:false},
							{'data':reason_question_10,'item':'question_10','type':'text', 'obligatory':(question_10=="R")?true:false},
							]);
				var validSave = true;
				var dataTeachers = dataSurveyTeachers();
				var validInfo = validFormActData(dataTeachers["items"]);
				if (valid["validate"] && validInfo["validate"]) {
					var infoSend = dataTeachers["dataSend"];
					let parentsPres = submitParents(periodo,num_survey,course,question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,'',question_10,question_14,question_15,question_16,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,reason_question_7,reason_question_8,reason_question_10,observation,infoSend);
					$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
					$("#btnModalLarge").attr('disabled', true);
					$.when(parentsPres).done(function(response){
						$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
						$("#btnModalLarge").removeAttr('disabled');
						$(".labelCheck").remove();
						$(".celValue").each(function() {
							$(this).removeClass('labelInvalid');
							$(this).addClass('labelValid');
							$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
							$(this).removeClass("animated infinite pulse");
						});
						$("#ModalLargeObs").modal("hide");
					}).fail(function(response){
						console.log(response);
					});
				}
				else {
					validSave = false;
					$(".labelCheck").remove();
					$(".celValue").each(function() {
						$(this).removeClass('labelValid');
						$(this).removeClass('labelInvalid');
						//$(this).removeClass('animated infinite pulse');
					});
					$.each(valid['items'],function(key,label) {
						$("#label_"+label).addClass('labelInvalid');
						$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
						//$("#label_"+label).addClass("animated infinite pulse");
						$("#"+label).focus();
						$("."+label).focus();
					});
					$.each(validInfo['items'],function(key,label) {
						$(".questionTeacher[data-val='"+label+"']").addClass('labelInvalid');
						$(".questionTeacher[data-val='"+label+"']").append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
						//$(".questionTeacher[data-val='"+label+"']").addClass("animated infinite pulse");
						$("#"+label).focus();
						$("."+label).focus();
					});
				}
				e.preventDefault();
			});
		});
		$("#ModalLargeObs").modal("show");
	}).fail(function(response){
		console.log(response);
	});
}

function surveyPsychologist(num_survey,course,tipe){//tipe valida tipo de encuesta 1 psicologia, 2 terapeuta ocupacional
	getPsychologyAttentionActualization().done(function(postPsychology){
			/*titulo  Psicología*/
		if (tipe == 1) {
			$("#titleModalLarge").text("Encuesta de Psicología");
		}else{
			$("#titleModalLarge").text("Encuesta de Terapeuta Ocupacional");
		}
		$("#bodyNotice").load("views/adminView/surveyPsychologist.html",function(){
			$("#semester").text("2025");

			/*Nombre de la psicóloga según corresponda al estudiante */
		if (tipe == 1) {
			$("#psychologist").text("psicólogo(a). ("+postPsychology["response"]["psicologa"]);
			$(".psychologisttipe").text("psicólogo(a)");
		}
		$(".optionQuestiony").click(function(e) {
			optionRadioYN($(this));
			e.preventDefault();
		});
		$(".optionQuestion").click(function(e) {
			optionRadio($(this));
			e.preventDefault();
		});
		$("#btnPrintNotice").click(function(e) {
			printSurvey();
			e.preventDefault();
		});
		/*Nombre de la terapeuta ocupacional */
		if (tipe == 2) {
			$("#psychologist").text("terapeuta ocupacional. (EVELLYN BOCANEGRA PULIDO");
			$(".psychologisttipe").text("terapeuta");
		}
			$("#btnModalLarge").prop("onclick", null).off("click");
			$("#btnModalLarge").click(function(e) {
				var question_1 = $(".question_1.active").data('val');
				var question_2 = $(".question_2.active").data('val');
				var question_3 = $(".question_3.active").data('val');
				var reason_question_1 = $("#reason_question_1").val();
				var reason_question_2 = $("#reason_question_2").val();
				var reason_question_3 = $("#reason_question_3").val();
				var observation = $("#observation").val();
				var valid = validFormActData([{'data':question_1,'item':'question_1','type':'radio', 'obligatory':true},
							{'data':question_2,'item':'question_2','type':'radio', 'obligatory':true},
							{'data':question_3,'item':'question_3','type':'radio', 'obligatory':true},
							{'data':reason_question_1,'item':'question_1','type':'text', 'obligatory':(question_1=="R")?true:false},
							{'data':reason_question_2,'item':'question_2','type':'text', 'obligatory':(question_2=="R")?true:false},
							{'data':reason_question_3,'item':'question_3','type':'text', 'obligatory':(question_3=="No")?true:false}
							]);
				if (valid["validate"]) {
					if (tipe == 1) {
						var parentsPres = submitsurveyPsychologist(num_survey,course,question_1,question_2,question_3,reason_question_1,reason_question_2,reason_question_3,observation);
					} else {
						var parentsPres = submitsurveyOcupational(num_survey,course,question_1,question_2,question_3,reason_question_1,reason_question_2,reason_question_3,observation);
					}
					$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
					$("#btnModalLarge").attr('disabled', true);
					$.when(parentsPres).done(function(response){
						$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
						$("#btnModalLarge").removeAttr('disabled');
						$(".labelCheck").remove();
						$(".celValue").each(function() {
							$(this).removeClass('labelInvalid');
							$(this).addClass('labelValid');
							$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
							$(this).removeClass("animated infinite pulse");
						});
						$("#ModalLargeObs").modal("hide");
					}).fail(function(response){
						console.log(response);
					});
				}
				else {
					/*validSave = false;*/
					$(".labelCheck").remove();
					$(".celValue").each(function() {
						$(this).removeClass('labelValid');
						$(this).removeClass('labelInvalid');
						//$(this).removeClass('animated infinite pulse');
					});
					$.each(valid['items'],function(key,label) {
						$("#label_"+label).addClass('labelInvalid');
						$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
						//$("#label_"+label).addClass("animated infinite pulse");
						$("#"+label).focus();
						$("."+label).focus();
					});
					/*$.each(validInfo['items'],function(key,label) {
						$(".questionTeacher[data-val='"+label+"']").addClass('labelInvalid');
						$(".questionTeacher[data-val='"+label+"']").append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
						//$(".questionTeacher[data-val='"+label+"']").addClass("animated infinite pulse");
						$("#"+label).focus();
						$("."+label).focus();
					});*/
				}
				e.preventDefault();
			});
		});
		$("#ModalLargeObs").modal("show");
	}).fail(function(response){
		console.log(response);
	});
}


function surveyShowtheTalent(num_survey,course){//tipe valida tipo de encuesta 1 psicologia, 2 terapeuta ocupacional
	$("#bodyNotice").load("views/adminView/surveyShowtheTalent.html",function(){
	$("#semester").text("viernes 17 de mayo en las instalaciones del colegio. Nuestro propósito es poder fortalecer el désarrollo de futuras presentaciones.");
	/*$(".optionQuestiony").click(function(e) {
		optionRadioYN($(this));
		e.preventDefault();
	}); */
	$(".optionQuestion").click(function(e) {
		optionRadio($(this));
		e.preventDefault();
	});
	$("#btnPrintNotice").click(function(e) {
		printSurvey();
		e.preventDefault();
	});
	/*Nombre de la terapeuta ocupacional */
	
		$("#btnModalLarge").prop("onclick", null).off("click");
		$("#btnModalLarge").click(function(e) {
			var question_1 = $(".question_1.active").data('val');
			var question_2 = $(".question_2.active").data('val');
			var question_3 = $(".question_3.active").data('val');
			var reason_question_1 = $("#reason_question_1").val();
			var reason_question_2 = $("#reason_question_2").val();
			var reason_question_3 = $("#reason_question_3").val();
			var observation = $("#observation").val();
			var valid = validFormActData([{'data':question_1,'item':'question_1','type':'radio', 'obligatory':true},
						{'data':question_2,'item':'question_2','type':'radio', 'obligatory':true},
						{'data':reason_question_1,'item':'question_1','type':'text', 'obligatory':(question_1=="R")?true:false},
						{'data':reason_question_2,'item':'question_2','type':'text', 'obligatory':(question_2=="R")?true:false},
						{'data':reason_question_3,'item':'question_3','type':'text', 'obligatory':(question_3=="R")?true:false},
						]);
			if (valid["validate"]) {
				let parentsPres = submitsurveyShowtheTalent(num_survey,course,question_1,question_2,question_3,reason_question_1,reason_question_2,reason_question_3,observation);
				$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
				$("#btnModalLarge").attr('disabled', true);
				$.when(parentsPres).done(function(response){
					$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
					$("#btnModalLarge").removeAttr('disabled');
					$(".labelCheck").remove();
					$(".celValue").each(function() {
						$(this).removeClass('labelInvalid');
						$(this).addClass('labelValid');
						$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
						$(this).removeClass("animated infinite pulse");
					});
					$("#ModalLargeObs").modal("hide");
				}).fail(function(response){
					console.log(response);
				});
			}
			else {
				/*validSave = false;*/
				$(".labelCheck").remove();
				$(".celValue").each(function() {
					$(this).removeClass('labelValid');
					$(this).removeClass('labelInvalid');
					//$(this).removeClass('animated infinite pulse');
				});
				$.each(valid['items'],function(key,label) {
					$("#label_"+label).addClass('labelInvalid');
					$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
					//$("#label_"+label).addClass("animated infinite pulse");
					$("#"+label).focus();
					$("."+label).focus();
				});
			}
			e.preventDefault();
		});
	});
	$("#ModalLargeObs").modal("show");

}

function surveyShowtheTalent2(num_survey,course){//tipe valida tipo de encuesta 1 psicologia, 2 terapeuta ocupacional
	$("#bodyNotice").load("views/adminView/surveyShowtheTalent.html",function(){
		$("#semester").text("jueves 16 de mayo en las instalaciones del colegio. Nuestro propósito es poder fortalecer el désarrollo de futuras presentaciones.");
			/*Nombre de la psicóloga según corresponda al estudiante */
		
			/*$(".optionQuestiony").click(function(e) {
			optionRadioYN($(this));
			e.preventDefault();
		}); */
		$(".optionQuestion").click(function(e) {
			optionRadio($(this));
			e.preventDefault();
		});
		$("#btnPrintNotice").click(function(e) {
			printSurvey();
			e.preventDefault();
		});
		/*Nombre de la terapeuta ocupacional */
		
			$("#btnModalLarge").prop("onclick", null).off("click");
			$("#btnModalLarge").click(function(e) {
				var question_1 = $(".question_1.active").data('val');
				var question_2 = $(".question_2.active").data('val');
				var question_3 = $(".question_3.active").data('val');
				var reason_question_1 = $("#reason_question_1").val();
				var reason_question_2 = $("#reason_question_2").val();
				var reason_question_3 = $("#reason_question_3").val();
				var observation = $("#observation").val();
				var valid = validFormActData([{'data':question_1,'item':'question_1','type':'radio', 'obligatory':true},
							{'data':question_2,'item':'question_2','type':'radio', 'obligatory':true},
							{'data':reason_question_1,'item':'question_1','type':'text', 'obligatory':(question_1=="R")?true:false},
							{'data':reason_question_2,'item':'question_2','type':'text', 'obligatory':(question_2=="R")?true:false},
							{'data':reason_question_3,'item':'question_3','type':'text', 'obligatory':(question_3=="R")?true:false},
							]);
				if (valid["validate"]) {
					let parentsPres = submitsurveyShowtheTalent(num_survey,course,question_1,question_2,question_3,reason_question_1,reason_question_2,reason_question_3,observation);
					$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
					$("#btnModalLarge").attr('disabled', true);
					$.when(parentsPres).done(function(response){
						$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
						$("#btnModalLarge").removeAttr('disabled');
						$(".labelCheck").remove();
						$(".celValue").each(function() {
							$(this).removeClass('labelInvalid');
							$(this).addClass('labelValid');
							$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
							$(this).removeClass("animated infinite pulse");
						});
						$("#ModalLargeObs").modal("hide");
					}).fail(function(response){
						console.log(response);
					});
				}
				else {
					/*validSave = false;*/
					$(".labelCheck").remove();
					$(".celValue").each(function() {
						$(this).removeClass('labelValid');
						$(this).removeClass('labelInvalid');
						//$(this).removeClass('animated infinite pulse');
					});
					$.each(valid['items'],function(key,label) {
						$("#label_"+label).addClass('labelInvalid');
						$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
						//$("#label_"+label).addClass("animated infinite pulse");
						$("#"+label).focus();
						$("."+label).focus();
					});
				}
				e.preventDefault();
			});
		});
		$("#ModalLargeObs").modal("show");
	
}


function surveyFamilyWorkshop(num_survey,course){
	$("#titleModalLarge").text("TALLER FAMILIAR SOBRE LA AUTOESTIMA EN LA ADOLESCENCIA");
	$("#bodyNotice").load("views/adminView/surveyFamilyWorkshop.html",function(){
		$(".optionQuestion").click(function(e) {
			optionRadioYN($(this));
			e.preventDefault();
		});
		$("#btnModalLarge").prop("onclick", null).off("click");
		$("#btnModalLarge").click(function(e) {
			var question_1 = $("#question_1").val();
			var question_2 = $("#question_2").val();
			var question_3 = $("#question_3").val();
			var question_4 = $("#question_4").val();
			var question_5 = $("#question_5").val();
			var question_6 = $(".question_6.active").data('val');
			var question_7 = $(".question_7.active").data('val');
			var question_8 = $("#question_8").val();
			var question_9 = $("#question_9").val();
			var reason_question_6 = $("#reason_question_6").val();
			var reason_question_7 = $("#reason_question_7").val();
			var observation = $("#observation").val();
			var valid = validFormActData([
						/*{'data':question_1,'item':'question_1','type':'text', 'obligatory':true},
						{'data':question_2,'item':'question_2','type':'text', 'obligatory':true},
						{'data':question_3,'item':'question_3','type':'text', 'obligatory':true},
						{'data':question_4,'item':'question_4','type':'text', 'obligatory':true},
						{'data':question_5,'item':'question_5','type':'text', 'obligatory':true},
						{'data':question_6,'item':'question_6','type':'radio', 'obligatory':true},
						{'data':question_7,'item':'question_7','type':'radio', 'obligatory':true},*/
						{'data':question_8,'item':'question_8','type':'text', 'obligatory':true},
						{'data':question_9,'item':'question_9','type':'text', 'obligatory':true},
						{'data':observation,'item':'observation','type':'text', 'obligatory':true},
						//{'data':reason_question_6,'item':'question_6','type':'text', 'obligatory':(question_6=="SI")?true:false},
						//{'data':reason_question_7,'item':'question_7','type':'text', 'obligatory':(question_7=="NO")?true:false}
						]);
						var validSave = true;
						if (valid["validate"]) {
							$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
							$("#btnModalLarge").attr('disabled', true);
							let WorkshopSend = submitFamilyWorkshop(num_survey,course,question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,reason_question_6,reason_question_7,observation);

							$.when(WorkshopSend).done(function(response){
								//$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
								$("#btnModalLarge").removeAttr('disabled');
								$(".labelCheck").remove();
								$(".celValue").each(function() {
									$(this).removeClass('labelInvalid');
									$(this).addClass('labelValid');
									$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
									$(this).removeClass("animated infinite pulse");
								});
								$("#ModalLargeObs").modal("hide");
							}).fail(function(response){
								console.log(response);
							});
						}else {
							validSave = false;
							$(".labelCheck").remove();
							$(".celValue").each(function() {
								$(this).removeClass('labelValid');
								$(this).removeClass('labelInvalid');
								$(this).removeClass('animated infinite pulse');
							});
							$.each(valid['items'],function(key,label) {
								$("#label_"+label).addClass('labelInvalid');
								$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
								$("#label_"+label).addClass("animated infinite pulse");
								$("#"+label).focus();
								$("."+label).focus();
							});
						}
						e.preventDefault();
					});
	});
	$("#ModalLargeObs").modal("show");
}

function surveyFamilyPsychology(num_survey,course){
	$("#titleModalLarge").text("ENCUESTA A PADRES DE FAMILIA SOBRE PSICOLOGÍA");
	$("#bodyNotice").load("views/adminView/surveyFamilyPsychology.html",function(){
		$(".optionQuestionYES").click(function(e) {
			optionRadioYN($(this));
			e.preventDefault();
		});
		$(".optionQuestion").click(function(e) {
			optionRadio($(this));
			e.preventDefault();
		});
		$("#btnModalLarge").prop("onclick", null).off("click");
		$("#btnModalLarge").click(function(e) {
			var question_1 = $(".question_1.active").data('val');
			var question_2 = $(".question_2.active").data('val');
			var question_7 = $(".question_7.active").data('val');
			var reason_question_1 = $("#reason_question_1").val();
			var reason_question_2 = $("#reason_question_2").val();
			var reason_question_7 = $("#reason_question_7").val();
			var observation = $("#observation").val();
			var valid = validFormActData([
						{'data':question_1,'item':'question_1','type':'radio', 'obligatory':true},
						{'data':question_2,'item':'question_2','type':'radio', 'obligatory':true},
						{'data':question_7,'item':'question_7','type':'radio', 'obligatory':true},
						{'data':reason_question_1,'item':'question_1','type':'radio', 'obligatory':(question_1=="R")?true:false},
						{'data':reason_question_2,'item':'question_2','type':'radio', 'obligatory':(question_2=="R")?true:false},
						{'data':reason_question_7,'item':'question_7','type':'radio', 'obligatory':(question_7=="NO")?true:false}
						]);
						var validSave = true;
						if (valid["validate"]) {
							$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
							$("#btnModalLarge").attr('disabled', true);
							let PsychologySend = submitFamilyPsychology(num_survey,course,question_1,question_2,question_7,reason_question_1,reason_question_2,reason_question_7,observation);

							$.when(PsychologySend).done(function(response){
								//$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
								$("#btnModalLarge").removeAttr('disabled');
								$(".labelCheck").remove();
								$(".celValue").each(function() {
									$(this).removeClass('labelInvalid');
									$(this).addClass('labelValid');
									$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
									$(this).removeClass("animated infinite pulse");
								});
								$("#ModalLargeObs").modal("hide");
							}).fail(function(response){
								console.log(response);
							});
						}else {
							validSave = false;
							$(".labelCheck").remove();
							$(".celValue").each(function() {
								$(this).removeClass('labelValid');
								$(this).removeClass('labelInvalid');
								$(this).removeClass('animated infinite pulse');
							});
							$.each(valid['items'],function(key,label) {
								$("#label_"+label).addClass('labelInvalid');
								$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
								$("#label_"+label).addClass("animated infinite pulse");
								$("#"+label).focus();
								$("."+label).focus();
							});
						}
						e.preventDefault();
					});

	});
	$("#ModalLargeObs").modal("show");
}

/*======================================================================================================================================================================== */
/*Funcion que carga los datos de la circular de admisiones circularAdmisiones  */ 
/*======================================================================================================================================================================== */


function surveyFamilyAdmissions(num_survey, course) {

  $("#titleModalLarge").text("Encuestas De Padres De Familia Sobre Admisiones");
  $("#bodyNotice").load(
    "views/adminView/surveyAdmissionsAlternation.html",
    function () {
      $(".optionQuestionYes").click(function (e) {
        console.log($(this).data("val"));
        if ($(this).data("val") == "Si") {
          if ($(this).hasClass("question_7")) {
            $("#div_telephone").removeClass("d-none");
          } else if ($(this).hasClass("question_11")) {
            $("#div_webpage").removeClass("d-none");
          } else if ($(this).hasClass("question_13")) {
            $("#div_recorrido").removeClass("d-none");
          }else if ($(this).hasClass("question_18")) {
            $("#div_watsaap").removeClass("d-none");
          }else if ($(this).hasClass("question_21")) {
            $("#div_redes").removeClass("d-none");
          }
        } else if ($(this).data("val") == "No") {
          if ($(this).hasClass("question_7")) {
            $("#div_telephone").addClass("d-none");
          } else if ($(this).hasClass("question_11")) {
            $("#div_webpage").addClass("d-none");
          } else if ($(this).hasClass("question_13")) {
            $("#div_recorrido").addClass("d-none");
          }else if ($(this).hasClass("question_18")) {
            $("#div_watsaap").addClass("d-none");
          }else if ($(this).hasClass("question_21")) {
            $("#div_redes").addClass("d-none");
          }
        }

        e.preventDefault();
      });
      if (
        course.includes("PJ") ||
        course.includes("JA") ||
        course.includes("TR")
      ) {
        $("#div_pedag").addClass("d-none");
      } else {
        $("#div_pedag").removeClass("d-none");
      }

      $(".optionQuestion").click(function (e) {
        optionRadio($(this));
        e.preventDefault();
      });
      $("#btnModalLarge").prop("onclick", null).off("click");
      $("#btnModalLarge").click(function (e) {
        var question_1 = $(".question_1.active").data("val");
        var question_2 = $(".question_2.active").data("val");
        var question_3 = $(".question_3.active").data("val");
        var question_4 = $(".question_4.active").data("val");
        var question_5 = $(".question_5.active").data("val");
        var question_6 = $(".question_6.active").data("val");
        var question_7 = $(".question_7.active").data("val");
        var question_8 = $(".question_8.active").data("val");
        var question_9 = $(".question_9.active").data("val");
        var question_10 = $(".question_10.active").data("val");
        var question_11 = $(".question_11.active").data("val");
        var question_12 = $(".question_12.active").data("val");
        var question_13 = $(".question_13.active").data("val");
        var question_14 = $(".question_14.active").data("val");
        var question_15 = $(".question_15.active").data("val");
        var question_16 = $(".question_16.active").data("val");
        var question_17 = $(".question_17.active").data("val");
		var question_18 = $(".question_18.active").data("val");
		var question_19 = $(".question_19.active").data("val");
		var question_20 = $(".question_20.active").data("val");
		var question_21 = $(".question_21.active").data("val");
		var question_22 = $(".question_22.active").data("val");
		var question_23 = $(".question_23.active").data("val");
		var question_24 = $(".question_24.active").data("val");
        var reason_question_1 = $("#reason_question_1").val();
        var reason_question_2 = $("#reason_question_2").val();
        var reason_question_3 = $("#reason_question_3").val();
        var reason_question_4 = $("#reason_question_4").val();
        var reason_question_5 = $("#reason_question_5").val();
        var reason_question_6 = $("#reason_question_6").val();
        var reason_question_8 = $("#reason_question_8").val();
        var reason_question_9 = $("#reason_question_9").val();
        var reason_question_10 = $("#reason_question_10").val();
        var reason_question_12 = $("#reason_question_12").val();
        var reason_question_14 = $("#reason_question_14").val();
        var reason_question_15 = $("#reason_question_15").val();
        var reason_question_16 = $("#reason_question_16").val();
        var reason_question_17 = $("#reason_question_17").val();
		var reason_question_19 = $("#reason_question_19").val();
		var reason_question_20 = $("#reason_question_20").val();
		var reason_question_25 = $("#reason_question_25").val();
        var observation = $("#observation").val();

        var valid;

        if (
          course.includes("PJ") ||
          course.includes("JA") ||
          course.includes("TR")
        ) {
          valid = validFormActData([
            {
              data: question_1,
              item: "question_1",
              type: "radio",
              obligatory: true,
            },
            {
              data: question_2,
              item: "question_2",
              type: "radio",
              obligatory: true,
            },
            {
              data: question_3,
              item: "question_3",
              type: "radio",
              obligatory: true,
            },

            {
              data: question_7,
              item: "question_7",
              type: "radio",
              obligatory: true,
            },
            {
              data: question_8,
              item: "question_8",
              type: "radio",
              obligatory: question_7 == "Si" ? true : false,
            },
            {
              data: question_9,
              item: "question_9",
              type: "radio",
              obligatory: question_7 == "Si" ? true : false,
            },
            {
              data: question_10,
              item: "question_10",
              type: "radio",
              obligatory: question_7 == "Si" ? true : false,
            },
            {
              data: question_11,
              item: "question_11",
              type: "radio",
              obligatory: true,
            },
            {
              data: question_12,
              item: "question_12",
              type: "radio",
              obligatory: question_11 == "Si" ? true : false,
            },
            {
              data: question_13,
              item: "question_13",
              type: "radio",
              obligatory: true,
            },
            {
              data: question_14,
              item: "question_14",
              type: "radio",
              obligatory: question_13 == "Si" ? true : false,
            },
            {
              data: question_15,
              item: "question_15",
              type: "radio",
              obligatory: question_13 == "Si" ? true : false,
            },
            {
              data: question_16,
              item: "question_16",
              type: "radio",
              obligatory: question_13 == "Si" ? true : false,
            },
            {
              data: question_17,
              item: "question_17",
              type: "radio",
              obligatory: question_13 == "Si" ? true : false,
            },
            {
              data: question_18,
              item: "question_18",
              type: "radio",
              obligatory: true,
            },
            {
              data: reason_question_1,
              item: "question_1",
              type: "text",
              obligatory: question_1 == "R" ? true : false,
            },
            {
              data: reason_question_2,
              item: "question_2",
              type: "text",
              obligatory: question_2 == "R" ? true : false,
            },
            {
              data: reason_question_3,
              item: "question_3",
              type: "text",
              obligatory: question_3 == "R" ? true : false,
            },
            {
              data: reason_question_8,
              item: "question_8",
              type: "text",
              obligatory: question_8 == "R" ? true : false,
            },
            {
              data: reason_question_9,
              item: "question_9",
              type: "text",
              obligatory: question_9 == "R" ? true : false,
            },
            {
              data: reason_question_10,
              item: "question_10",
              type: "text",
              obligatory: question_10 == "R" ? true : false,
            },
            {
              data: reason_question_12,
              item: "question_12",
              type: "text",
              obligatory: question_12 == "R" ? true : false,
            },
            {
              data: reason_question_14,
              item: "question_14",
              type: "text",
              obligatory: question_14 == "R" ? true : false,
            },
            {
              data: reason_question_15,
              item: "question_15",
              type: "text",
              obligatory: question_15 == "R" ? true : false,
            },
            {
              data: reason_question_16,
              item: "question_16",
              type: "text",
              obligatory: question_16 == "R" ? true : false,
            },
            {
              data: reason_question_17,
              item: "question_17",
              type: "text",
              obligatory: question_17 == "R" ? true : false,
            },
            {
              data: reason_question_19,
              item: "question_19",
              type: "text",
              obligatory: question_19 == "R" ? true : false,
            },
            {
              data: reason_question_20,
              item: "question_20",
              type: "text",
              obligatory: question_20 == "R" ? true : false,
            },
            {
              data: reason_question_25,
              item: "question_25",
              type: "text",
              obligatory: question_25 == "R" ? true : false,
            }
          ]);
        } else {
          valid = validFormActData([
            {
              data: question_1,
              item: "question_1",
              type: "radio",
              obligatory: true,
            },
            {
              data: question_2,
              item: "question_2",
              type: "radio",
              obligatory: true,
            },
            {
              data: question_3,
              item: "question_3",
              type: "radio",
              obligatory: true,
            },
            {
              data: question_4,
              item: "question_4",
              type: "radio",
              obligatory: true,
            },
            {
              data: question_5,
              item: "question_5",
              type: "radio",
              obligatory: true,
            },
            {
              data: question_6,
              item: "question_6",
              type: "radio",
              obligatory: true,
            },
            {
              data: question_7,
              item: "question_7",
              type: "radio",
              obligatory: true,
            },
            {
              data: question_8,
              item: "question_8",
              type: "radio",
              obligatory: question_7 == "Si" ? true : false,
            },
            {
              data: question_9,
              item: "question_9",
              type: "radio",
              obligatory: question_7 == "Si" ? true : false,
            },
            {
              data: question_10,
              item: "question_10",
              type: "radio",
              obligatory: question_7 == "Si" ? true : false,
            },
            {
              data: question_11,
              item: "question_11",
              type: "radio",
              obligatory: true,
            },
            {
              data: question_12,
              item: "question_12",
              type: "radio",
              obligatory: question_11 == "Si" ? true : false,
            },
            {
              data: question_13,
              item: "question_13",
              type: "radio",
              obligatory: true,
            },
            {
              data: question_14,
              item: "question_14",
              type: "radio",
              obligatory: question_13 == "Si" ? true : false,
            },
            {
              data: question_15,
              item: "question_15",
              type: "radio",
              obligatory: question_13 == "Si" ? true : false,
            },
            {
              data: question_16,
              item: "question_16",
              type: "radio",
              obligatory: question_13 == "Si" ? true : false,
            },
            {
              data: question_17,
              item: "question_17",
              type: "radio",
              obligatory: question_13 == "Si" ? true : false,
            },{
				data: question_18,
				item: "question_18",
				type: "radio",
				obligatory: true,
			  },
            {
              data: reason_question_1,
              item: "question_1",
              type: "text",
              obligatory: question_1 == "R" ? true : false,
            },
            {
              data: reason_question_2,
              item: "question_2",
              type: "text",
              obligatory: question_2 == "R" ? true : false,
            },
            {
              data: reason_question_3,
              item: "question_3",
              type: "text",
              obligatory: question_3 == "R" ? true : false,
            },
            {
              data: reason_question_4,
              item: "question_4",
              type: "text",
              obligatory: question_4 == "R" ? true : false,
            },
            {
              data: reason_question_5,
              item: "question_5",
              type: "text",
              obligatory: question_5 == "R" ? true : false,
            },
            {
              data: reason_question_6,
              item: "question_6",
              type: "text",
              obligatory: question_6 == "R" ? true : false,
            },
            {
              data: reason_question_8,
              item: "question_8",
              type: "text",
              obligatory: question_8 == "R" ? true : false,
            },
            {
              data: reason_question_9,
              item: "question_9",
              type: "text",
              obligatory: question_9 == "R" ? true : false,
            },
            {
              data: reason_question_10,
              item: "question_10",
              type: "text",
              obligatory: question_10 == "R" ? true : false,
            },
            {
              data: reason_question_12,
              item: "question_12",
              type: "text",
              obligatory: question_12 == "R" ? true : false,
            },
            {
              data: reason_question_14,
              item: "question_14",
              type: "text",
              obligatory: question_14 == "R" ? true : false,
            },
            {
              data: reason_question_15,
              item: "question_15",
              type: "text",
              obligatory: question_15 == "R" ? true : false,
            },
            {
              data: reason_question_16,
              item: "question_16",
              type: "text",
              obligatory: question_16 == "R" ? true : false,
            },
            {
              data: reason_question_17,
              item: "question_17",
              type: "text",
              obligatory: question_17 == "R" ? true : false,
            },
			{
			data: question_21,
			item: "question_21",
			type: "radio",
			obligatory: true,
			}
          ]);
        }

        var validSave = true;
        if (valid["validate"]) {
          $("#btnModalLarge").html(
            "Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>"
          );
          $("#btnModalLarge").attr("disabled", true);

          var questions = [
            (q12 = question_12),
            (q13 = question_13),
            (q14 = question_14),
            (q15 = question_15),
            (q16 = question_16),
            (q17 = question_17),
			(q18 = question_18),
			(q19 = question_19),
			(q20 = question_20),
			(q21 = question_21),
			(q22 = question_22),
			(q23 = question_23),
			(q24 = question_24),
          ];
          var reason_questions = [
            (r12 = reason_question_12),
            (r14 = reason_question_14),
            (r15 = reason_question_15),
            (r16 = reason_question_16),
            (r17 = reason_question_17),
			(r19 = reason_question_19),
			(r20 = reason_question_20),
			(r25 = reason_question_25),
          ];

		  let AdmissionsSend = submitFamilyAdmissions(
			num_survey,
			course,
			question_1,
			question_2,
			question_3,
			question_4,
			question_5,
			question_6,
			question_7,
			question_8,
			question_9,
			question_10,
			question_11,
			question_12, // Incluye la pregunta 12 explícitamente
			reason_question_1,
			reason_question_2,
			reason_question_3,
			reason_question_4,
			reason_question_5,
			reason_question_6,
			reason_question_8,
			reason_question_9,
			reason_question_10,
			observation,
			questions,
			reason_questions

		);
		
		
		

          $.when(AdmissionsSend)
            .done(function (response) {
              $("#btnModalLarge").html(
                'Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>'
              );
              $("#btnModalLarge").removeAttr("disabled");
              $(".labelCheck").remove();
              $(".celValue").each(function () {
                $(this).removeClass("labelInvalid");
                $(this).addClass("labelValid");
                $(this).append(
                  '  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>'
                );
                $(this).removeClass("animated infinite pulse");
              });
              $("#ModalLargeObs").modal("hide");
            })
            .fail(function (response) {
              console.log(response);
            });
        } else {
          validSave = false;
          $(".labelCheck").remove();
          $(".celValue").each(function () {
            $(this).removeClass("labelValid");
            $(this).removeClass("labelInvalid");
            $(this).removeClass("animated infinite pulse");
          });
          $.each(valid["items"], function (key, label) {
            $("#label_" + label).addClass("labelInvalid");
            $("#label_" + label).append(
              '  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>'
            );
            $("#label_" + label).addClass("animated infinite pulse");
            $("#" + label).focus();
            $("." + label).focus();
          });
        }
        e.preventDefault();
      });
    }
  );
  $("#ModalLargeObs").modal("show");
}


function surveyProcessEnroll(num_survey, course) {

  $("#titleModalLarge").text(
    "Encuesta a Padres de Familia sobre el proceso de matr\u00EDculas"
  );
  $("#bodyNotice").load(
    "views/adminView/surveyProcessEnrollAlternation.html",
    function () {
      $(".optionQuestion").click(function (e) {
        optionRadio($(this));
        e.preventDefault();
      });
      $("#btnModalLarge").prop("onclick", null).off("click");
      $("#btnModalLarge").click(function (e) {
        var question_1 = $(".question_1.active").data("val");
        var question_2 = $(".question_2.active").data("val");
        var question_3 = $(".question_3.active").data("val");
        var question_4 = $(".question_4.active").data("val");
        var question_5 = $(".question_5.active").data("val");
        var question_6 = $(".question_6.active").data("val");
        var question_7 = $(".question_7.active").data("val");
		var question_8 = $(".question_8.active").data("val");
		var question_9 = $(".question_9.active").data("val");
        var reason_question_1 = $("#reason_question_1").val();
        var reason_question_2 = $("#reason_question_2").val();
        var reason_question_3 = $("#reason_question_3").val();
        var reason_question_4 = $("#reason_question_4").val();
        var reason_question_5 = $("#reason_question_5").val();
        var reason_question_6 = $("#reason_question_6").val();
        var reason_question_7 = $("#reason_question_7").val();
		var reason_question_9 = $("#reason_question_9").val();
        var observation = $("#observation").val();
        var valid = validFormActData([
          {
            data: question_1,
            item: "question_1",
            type: "radio",
            obligatory: true,
          },
          {
            data: question_2,
            item: "question_2",
            type: "radio",
            obligatory: true,
          },
          {
            data: question_3,
            item: "question_3",
            type: "radio",
            obligatory: true,
          },
          {
            data: question_4,
            item: "question_4",
            type: "radio",
            obligatory: true,
          },
          {
            data: question_5,
            item: "question_5",
            type: "radio",
            obligatory: true,
          },
          {
            data: question_6,
            item: "question_6",
            type: "radio",
            obligatory: true,
          },
          {
            data: question_7,
            item: "question_7",
            type: "radio",
            obligatory: true,
          },
          {
            data: reason_question_1,
            item: "question_1",
            type: "radio",
            obligatory: question_1 == "R" ? true : false,
          },
          {
            data: reason_question_2,
            item: "question_2",
            type: "radio",
            obligatory: question_2 == "R" ? true : false,
          },
          {
            data: reason_question_3,
            item: "question_3",
            type: "radio",
            obligatory: question_3 == "R" ? true : false,
          },
          {
            data: reason_question_4,
            item: "question_4",
            type: "radio",
            obligatory: question_4 == "R" ? true : false,
          },
          {
            data: reason_question_5,
            item: "question_5",
            type: "radio",
            obligatory: question_5 == "R" ? true : false,
          },
          {
            data: reason_question_6,
            item: "question_6",
            type: "radio",
            obligatory: question_6 == "R" ? true : false,
          },
          {
            data: reason_question_7,
            item: "question_7",
            type: "radio",
            obligatory: question_7 == "R" ? true : false,
          },
		  {
            data: reason_question_9,
            item: "question_9",
            type: "radio",
            obligatory: question_9 == "R" ? true : false,
          },
          {
            data: observation,
            item: "observation",
            type: "radio",
            obligatory: false,
          },
        ]);
        var validSave = true;
        if (valid["validate"]) {
          $("#btnModalLarge").html(
            "Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>"
          );
          $("#btnModalLarge").attr("disabled", true);


            
          var questions = [
            (q12 = reason_question_5),
            (q13 = reason_question_6),
            (q14 = question_7),
            (q15 = reason_question_7),
            (q16 = observation),
			(q17 = question_8),
			(q18 = question_9),
			(q18 = reason_question_9),
          ];


          let ProcessEnrollSend = submitProcessEnroll(
            num_survey,
            course,
            question_1,
            question_2,
            question_3,
            question_4,
            question_5,
            question_6,
            reason_question_1,
            reason_question_2,
            reason_question_3,
            reason_question_4,
            questions
          );


    


          $.when(ProcessEnrollSend)
            .done(function (response) {
              $("#btnModalLarge").html(
                'Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>'
              );
              $("#btnModalLarge").removeAttr("disabled");
              $(".labelCheck").remove();
              $(".celValue").each(function () {
                $(this).removeClass("labelInvalid");
                $(this).addClass("labelValid");
                $(this).append(
                  '  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>'
                );
                $(this).removeClass("animated infinite pulse");
              });
              $("#ModalLargeObs").modal("hide");
            })
            .fail(function (response) {
              console.log(response);
            });
        } else {
          validSave = false;
          $(".labelCheck").remove();
          $(".celValue").each(function () {
            $(this).removeClass("labelValid");
            $(this).removeClass("labelInvalid");
            $(this).removeClass("animated infinite pulse");
          });
          $.each(valid["items"], function (key, label) {
            $("#label_" + label).addClass("labelInvalid");
            $("#label_" + label).append(
              '  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>'
            );
            $("#label_" + label).addClass("animated infinite pulse");
            $("#" + label).focus();
            $("." + label).focus();
          });
        }
        e.preventDefault();
      });
    }
  );
  $("#ModalLargeObs").modal("show");
}

function surveyProcessEnrollNew2(num_survey, course) {
	$("#titleModalLarge").text(
	  "Encuesta a Padres de Familia sobre el proceso de matr\u00EDculas"
	);
	$("#bodyNotice").load(
	  "views/adminView/surveyProcessEnrollAlternationNew.html",
	  function () {
		$(".optionQuestion").click(function (e) {
		  optionRadio($(this));
		  e.preventDefault();
		});
		$("#btnModalLarge").prop("onclick", null).off("click");
		$("#btnModalLarge").click(function (e) {
		  var question_1 = $(".question_1.active").data("val");
		  var question_2 = $(".question_2.active").data("val");
		  var question_3 = $(".question_3.active").data("val");
		  var question_4 = $(".question_4.active").data("val");
		  var question_5 = "Nuevo";
		  var question_6 = $(".question_6.active").data("val");
		  var question_7 = $(".question_7.active").data("val");
		  var reason_question_1 = $("#reason_question_1").val();
		  var reason_question_2 = $("#reason_question_2").val();
		  var reason_question_3 = $("#reason_question_3").val();
		  var reason_question_4 = $("#reason_question_4").val();
		  var reason_question_5 = "Nuevo";
		  var reason_question_6 = $("#reason_question_6").val();
		  var reason_question_7 = $("#reason_question_7").val();
		  var observation = $("#observation").val();
		  var valid = validFormActData([
			{
			  data: question_1,
			  item: "question_1",
			  type: "radio",
			  obligatory: true,
			},
			{
			  data: question_2,
			  item: "question_2",
			  type: "radio",
			  obligatory: true,
			},
			{
			  data: question_3,
			  item: "question_3",
			  type: "radio",
			  obligatory: true,
			},
			{
			  data: question_4,
			  item: "question_4",
			  type: "radio",
			  obligatory: true,
			},
			{
			  data: question_5,
			  item: "question_5",
			  type: "radio",
			  obligatory: true,
			},
			{
			  data: question_6,
			  item: "question_6",
			  type: "radio",
			  obligatory: true,
			},
			{
			  data: question_7,
			  item: "question_7",
			  type: "radio",
			  obligatory: true,
			},
			{
			  data: reason_question_1,
			  item: "question_1",
			  type: "radio",
			  obligatory: question_1 == "R" ? true : false,
			},
			{
			  data: reason_question_2,
			  item: "question_2",
			  type: "radio",
			  obligatory: question_2 == "R" ? true : false,
			},
			{
			  data: reason_question_3,
			  item: "question_3",
			  type: "radio",
			  obligatory: question_3 == "R" ? true : false,
			},
			{
			  data: reason_question_4,
			  item: "question_4",
			  type: "radio",
			  obligatory: question_4 == "R" ? true : false,
			},
			{
			  data: reason_question_5,
			  item: "question_5",
			  type: "radio",
			  obligatory: question_5 == "R" ? true : false,
			},
			{
			  data: reason_question_6,
			  item: "question_6",
			  type: "radio",
			  obligatory: question_6 == "R" ? true : false,
			},
			{
			  data: reason_question_7,
			  item: "question_7",
			  type: "radio",
			  obligatory: question_7 == "R" ? true : false,
			},
			{
			  data: observation,
			  item: "observation",
			  type: "radio",
			  obligatory: false,
			},
		  ]);
		  var validSave = true;
		  if (valid["validate"]) {
			$("#btnModalLarge").html(
			  "Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>"
			);
			$("#btnModalLarge").attr("disabled", true);
  
  
			  
			var questions = [
			  (q12 = reason_question_5),
			  (q13 = reason_question_6),
			  (q14 = question_7),
			  (q15 = reason_question_7),
			  (q16 = observation),
  
			];
  
  
			let ProcessEnrollSend = submitProcessEnroll(
			  num_survey,
			  course,
			  question_1,
			  question_2,
			  question_3,
			  question_4,
			  question_5,
			  question_6,
			  reason_question_1,
			  reason_question_2,
			  reason_question_3,
			  reason_question_4,
			  questions
			);
  
  
	  
  
  
			$.when(ProcessEnrollSend)
			  .done(function (response) {
				$("#btnModalLarge").html(
				  'Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>'
				);
				$("#btnModalLarge").removeAttr("disabled");
				$(".labelCheck").remove();
				$(".celValue").each(function () {
				  $(this).removeClass("labelInvalid");
				  $(this).addClass("labelValid");
				  $(this).append(
					'  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>'
				  );
				  $(this).removeClass("animated infinite pulse");
				});
				$("#ModalLargeObs").modal("hide");
			  })
			  .fail(function (response) {
				console.log(response);
			  });
		  } else {
			validSave = false;
			$(".labelCheck").remove();
			$(".celValue").each(function () {
			  $(this).removeClass("labelValid");
			  $(this).removeClass("labelInvalid");
			  $(this).removeClass("animated infinite pulse");
			});
			$.each(valid["items"], function (key, label) {
			  $("#label_" + label).addClass("labelInvalid");
			  $("#label_" + label).append(
				'  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>'
			  );
			  $("#label_" + label).addClass("animated infinite pulse");
			  $("#" + label).focus();
			  $("." + label).focus();
			});
		  }
		  e.preventDefault();
		});
	  }
	);
	$("#ModalLargeObs").modal("show");
}



function surveyTransport(num_survey,course){
	var year_actual = parseInt(date.getFullYear());
	$("#titleModalLarge").text("Encuesta Servicio De Transporte "+year_actual);
	$("#bodyNotice").load("views/adminView/surveyTransport.html?v=5.6",function(){
		$(".optionQuestionYES").click(function(e) {
			optionRadioYN($(this));
			e.preventDefault();
		});
		$(".optionQuestion").click(function(e) {
			optionRadio($(this));
			optionRadio_R_M($(this));
			var option_id = $(this).find('input').attr('name');
			if (option_id == "question_5" || option_id == "question_11" ) {
				var option = $(this).attr('data-val');
				if (option == "SI") {
					$("#options_"+option_id).removeClass('d-none');
				}
				else {
					$("#options_"+option_id).addClass('d-none');
					$("#options_"+option_id).find('textarea').val("");
				}
			}
			if (option_id == "question_7" || option_id == "question_13") {
				var option = $(this).attr('data-val');
				if (option == "NO") {
					$("#options_"+option_id).removeClass('d-none');
				}
				else {
					$("#options_"+option_id).addClass('d-none');
					$("#options_"+option_id).find('textarea').val("");
				}
			}
			e.preventDefault();
		});
		$(".optionQuestion1a5").click(function(e) {
			optionRadio1a5($(this));
			e.preventDefault();
		});
		$("#btnModalLarge").prop("onclick", null).off("click");
		$("#btnModalLarge").click(function(e) {
			var question_1 = $(".question_1.active").data('val');
			var question_2 = $(".question_2.active").data('val');
			var question_3 = $(".question_3.active").data('val');
			var question_4 = $(".question_4.active").data('val');
			var question_5 = $(".question_5.active").data('val');
			var question_6 = $(".question_6.active").data('val');
			var question_7 = $(".question_7.active").data('val');
			var question_8 = $(".question_8.active").data('val');
			var question_9 = $(".question_9.active").data('val');
			var question_10 = $(".question_10.active").data('val');
			var question_11 = $(".question_11.active").data('val');
			var question_12 = $(".question_12.active").data('val');
			var question_13 = $(".question_13.active").data('val');
			var reason_question_1 = $("#reason_question_1").val();
			var reason_question_2 = $("#reason_question_2").val();
			var reason_question_3 = $("#reason_question_3").val();
			var reason_question_4 = $("#reason_question_4").val();
			var reason_question_6 = $("#reason_question_6").val();
			var reason_question_7 = $("#reason_question_7").val();
			var reason_question_8 = $("#reason_question_8").val();
			var reason_question_9 = $("#reason_question_9").val();
			var reason_question_10 = $("#reason_question_10").val();
			var reason_question_12 = $("#reason_question_12").val();
			var reason_question_13 = $("#reason_question_13").val();
			// Dentro del click del botón
			var valid = validFormActData([
				{data: question_1, item: 'question_1', type: 'radio', obligatory: true},
				{data: question_2, item: 'question_2', type: 'radio', obligatory: true},
				{data: question_3, item: 'question_3', type: 'radio', obligatory: true},
				{data: question_4, item: 'question_4', type: 'radio', obligatory: true},
				{data: question_5, item: 'question_5', type: 'radio', obligatory: true},
				{data: question_6, item: 'question_6', type: 'radio', obligatory: (question_5 === "SI")},
				{data: question_7, item: 'question_7', type: 'radio', obligatory: (question_7 === "NO")},
				{data: question_8, item: 'question_8', type: 'radio', obligatory: true},
				{data: question_9, item: 'question_9', type: 'radio', obligatory: true},
				{data: question_10, item: 'question_10', type: 'radio', obligatory: true},
				{data: question_11, item: 'question_11', type: 'radio', obligatory: true},
				{data: question_12, item: 'question_12', type: 'radio', obligatory: (question_11 === "SI")},
				{data: question_13, item: 'question_13', type: 'radio', obligatory: (question_11 === "SI")}, // 🔹 Arreglado aquí
				
				{data: reason_question_1, item: 'question_1', type: 'radio', obligatory: (["M", "R"].includes(question_1))},
				{data: reason_question_2, item: 'question_2', type: 'radio', obligatory: (["M", "R"].includes(question_2))},
				{data: reason_question_3, item: 'question_3', type: 'radio', obligatory: (["M", "R"].includes(question_3))},
				{data: reason_question_4, item: 'question_4', type: 'radio', obligatory: (["M", "R"].includes(question_4))},
				{data: reason_question_6, item: 'question_6', type: 'radio', obligatory: (["M", "R"].includes(question_6))},
				{data: reason_question_7, item: 'question_7', type: 'radio', obligatory: (question_7 === "NO")},
				{data: reason_question_8, item: 'question_8', type: 'radio', obligatory: (["M", "R"].includes(question_8))},
				{data: reason_question_9, item: 'question_9', type: 'radio', obligatory: (["M", "R"].includes(question_9))},
				{data: reason_question_10, item: 'question_10', type: 'radio', obligatory: (["M", "R"].includes(question_10))},
				{data: reason_question_13, item: 'question_13', type: 'radio', obligatory: (question_13 === "NO")},
				{data: reason_question_12, item: 'question_12', type: 'radio', obligatory: (["3", "2", "1"].includes(question_12))}
			]);

						var validSave = true;
						if (valid["validate"]) {
							$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
							$("#btnModalLarge").attr('disabled', true);


							let TransportSend = submitTransport(num_survey,course,question_1,reason_question_1,question_2,reason_question_2,question_3,reason_question_3,question_4,reason_question_4,question_5,'',question_6,reason_question_6,question_7,reason_question_7,question_8,reason_question_8,question_9,reason_question_9,question_10,reason_question_10,question_11,'',question_12,reason_question_12,question_13,reason_question_13);

							$.when(TransportSend).done(function(response){
								$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
								$("#btnModalLarge").removeAttr('disabled');
								$(".labelCheck").remove();
								$(".celValue").each(function() {
									$(this).removeClass('labelInvalid');
									$(this).addClass('labelValid');
									$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
									$(this).removeClass("animated infinite pulse");
								});
								$("#ModalLargeObs").modal("hide");
							}).fail(function(response){
								console.log(response);
							});
						}else {
							validSave = false;
							$(".labelCheck").remove();
							$(".celValue").each(function() {
								$(this).removeClass('labelValid');
								$(this).removeClass('labelInvalid');
								$(this).removeClass('animated infinite pulse');
							});
							$.each(valid['items'],function(key,label) {
								$("#label_"+label).addClass('labelInvalid');
								$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
								$("#label_"+label).addClass("animated infinite pulse");
								$("#"+label).focus();
								$("."+label).focus();
							});
						}
						e.preventDefault();
					});

	});
	$("#ModalLargeObs").modal("show");
	/*$("#ModalLargeObs").off("hidden.bs.modal");
	$("#ModalLargeObs").on('hidden.bs.modal',function(){
		$("#bodyTagLarge").children().remove();
		$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
	});*/
}



function surveyResources(num_survey,course){
	$("#titleModalLarge").text("ENCUESTA RECURSOS ACADÉMICOS");
	$("#bodyNotice").load("views/adminView/surveyResources.html",function(){
		$(".optionQuestion").click(function(e) {
			optionRadio($(this));
			e.preventDefault();
		});
		$("#btnModalLarge").prop("onclick", null).off("click");
		$("#btnModalLarge").click(function(e) {
			var question_1 = $(".question_1.active").data('val');
			var question_2 = $(".question_2.active").data('val');
			var question_3 = $(".question_3.active").data('val');
			var question_4 = $(".question_4.active").data('val');
			var reason_question_3 = $("#reason_question_3").val();
			var observation = $("#observation").val();
			var valid = validFormActData([
						{'data':question_1,'item':'question_1','type':'radio', 'obligatory':true},
						{'data':question_2,'item':'question_2','type':'radio', 'obligatory':true},
						{'data':question_3,'item':'question_3','type':'radio', 'obligatory':true},
						{'data':question_4,'item':'question_4','type':'radio', 'obligatory':true},
						{'data':reason_question_3,'item':'question_3','type':'radio', 'obligatory':(question_3=="R")?true:false}
						]);
						var validSave = true;
						if (valid["validate"]) {
							$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
							$("#btnModalLarge").attr('disabled', true);
							let ResourcesSend = submitResources(num_survey,course,question_1,question_2,question_3,question_4,reason_question_3,observation);

							$.when(ResourcesSend).done(function(response){
								$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
								$("#btnModalLarge").removeAttr('disabled');
								$(".labelCheck").remove();
								$(".celValue").each(function() {
									$(this).removeClass('labelInvalid');
									$(this).addClass('labelValid');
									$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
									$(this).removeClass("animated infinite pulse");
								});
								$("#ModalLargeObs").modal("hide");
							}).fail(function(response){
								console.log(response);
							});
						}else {
							validSave = false;
							$(".labelCheck").remove();
							$(".celValue").each(function() {
								$(this).removeClass('labelValid');
								$(this).removeClass('labelInvalid');
								$(this).removeClass('animated infinite pulse');
							});
							$.each(valid['items'],function(key,label) {
								$("#label_"+label).addClass('labelInvalid');
								$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
								$("#label_"+label).addClass("animated infinite pulse");
								$("#"+label).focus();
								$("."+label).focus();
							});
						}
						e.preventDefault();
					});

	});
	$("#ModalLargeObs").modal("show");
}

function primary_Concept(num_survey,course){
	$("#titleModalLarge").text("ENCUESTA RECURSOS ACADÉMICOS ON LINE (1° a 5°)");
	$("#bodyNotice").load("views/adminView/surveyClose.html",function(){
	// $("#bodyNotice").load("views/adminView/primaryConcept.html",function(){
		$(".optionQuestion").click(function(e) {
			optionRadio_R_M($(this));
			e.preventDefault();
		});
		$("#btnModalLarge").prop("onclick", null).off("click");
		$("#btnModalLarge").click(function(e) {
			var subject_1 = $(".subject_1").data('val');
			var subject_2 = $(".subject_2").data('val');
			var subject_3 = $(".subject_3").data('val');
			var subject_4 = $(".subject_4").data('val');
			var subject_5 = $(".subject_5").data('val');
			// var subject_5 = '--';
			var question_1 = $(".question_1.active").data('val');
			var question_2 = $(".question_2.active").data('val');
			var question_3 = $(".question_3.active").data('val');
			var question_4 = $(".question_4.active").data('val');
			var question_5 = $(".question_5.active").data('val');
			// var question_5 = '--';
			var reason_question_1 = $("#reason_question_1").val();
			var reason_question_2 = $("#reason_question_2").val();
			var reason_question_3 = $("#reason_question_3").val();
			var reason_question_4 = $("#reason_question_4").val();
			var reason_question_5 = $("#reason_question_5").val();
			// var reason_question_5 = '--';
			var observation = $("#observation").val();
			var valid = validFormActData([
						{'data':question_1,'item':'question_1','type':'radio', 'obligatory':true},
						{'data':question_2,'item':'question_2','type':'radio', 'obligatory':true},
						{'data':question_3,'item':'question_3','type':'radio', 'obligatory':true},
						{'data':question_4,'item':'question_4','type':'radio', 'obligatory':true},
						{'data':question_5,'item':'question_5','type':'radio', 'obligatory':true},
						{'data':reason_question_1,'item':'question_1','type':'radio', 'obligatory':(question_1=="R"||question_1=="M")?true:false},
						{'data':reason_question_2,'item':'question_2','type':'radio', 'obligatory':(question_2=="R"||question_2=="M")?true:false},
						{'data':reason_question_3,'item':'question_3','type':'radio', 'obligatory':(question_3=="R"||question_3=="M")?true:false},
						{'data':reason_question_4,'item':'question_4','type':'radio', 'obligatory':(question_4=="R"||question_4=="M")?true:false},
						{'data':reason_question_5,'item':'question_5','type':'radio', 'obligatory':(question_5=="R"||question_5=="M")?true:false}
						]);
						var validSave = true;
						if (valid["validate"]) {
							$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
							$("#btnModalLarge").attr('disabled', true);
							let sendPrimaryConcept = submitPrimary_Concept(num_survey,course,subject_1,subject_2,subject_3,subject_4,subject_5,question_1,question_2,question_3,question_4,question_5,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,observation);
							$.when(sendPrimaryConcept).done(function(response){
								$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
								$("#btnModalLarge").removeAttr('disabled');
								$(".labelCheck").remove();
								$(".celValue").each(function() {
									$(this).removeClass('labelInvalid');
									$(this).addClass('labelValid');
									$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
									$(this).removeClass("animated infinite pulse");
								});
								$("#ModalLargeObs").modal("hide");
							}).fail(function(response){
								console.log(response);
							});
						}else {
							validSave = false;
							$(".labelCheck").remove();
							$(".celValue").each(function() {
								$(this).removeClass('labelValid');
								$(this).removeClass('labelInvalid');
								$(this).removeClass('animated infinite pulse');
							});
							$.each(valid['items'],function(key,label) {
								$("#label_"+label).addClass('labelInvalid');
								$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
								$("#label_"+label).addClass("animated infinite pulse");
								$("#"+label).focus();
								$("."+label).focus();
							});
						}
						e.preventDefault();
					});

	});
	$("#ModalLargeObs").modal("show");
}

function conceptSurvey(num_survey,course,type){
	if (type == 1) {
		$("#titleModalLarge").text("CONCEPTO DE PADRES Y ESTUDIANTES PREESCOLAR Y PRIMARIA SOBRE ACTIVIDADES ON LINE");
	}
	else if (type == 3 || type == 4) {
		$("#titleModalLarge").text("CONCEPTO DE PADRES Y ESTUDIANTES SOBRE ACTIVIDADES ON LINE");
	}
	$("#bodyNotice").load("views/adminView/surveyConceptParents.html",function(){
	
		getSubjectCourse().done(function(postSubjects){
			$("#label_question_1").html(createSelect(postSubjects["response"],'subject_1',1));
			$("#label_question_2").html(createSelect(postSubjects["response"],'subject_2',1));
			$("#label_question_3").html(createSelect(postSubjects["response"],'subject_3',1));
			$("#label_question_4").html(createSelect(postSubjects["response"],'subject_4',1));
			$("#label_question_5").html(createSelect(postSubjects["response"],'subject_5',1));
			$("#label_question_6").html(createSelect(postSubjects["response"],'subject_6',1));
			$("#label_question_7").html(createSelect(postSubjects["response"],'subject_7',1));
			$("#label_question_8").html(createSelect(postSubjects["response"],'subject_8',1));
			if (type == 1 && (course.includes("PJ") || course.includes("JA") || course.includes("TR"))) {
				//$("#label_question_5").parent().parent().addClass('d-none');
				$("#label_question_6").parent().parent().addClass('d-none');
				$("#label_question_7").parent().parent().addClass('d-none');
				$("#label_question_8").parent().parent().addClass('d-none');
			}else if (type == 4){
				$("#label_question_1").parent().parent().addClass('d-none');
				$("#label_question_2").parent().parent().addClass('d-none');
				$("#label_question_3").parent().parent().addClass('d-none');
				$("#label_question_4").parent().parent().addClass('d-none');
				$("#label_question_5").parent().parent().addClass('d-none');
				$("#label_question_6").parent().parent().addClass('d-none');
				$("#label_question_7").parent().parent().addClass('d-none');
				$("#label_question_8").parent().parent().addClass('d-none');
			}
			
				//$("#label_question_8").parent().parent().addClass('d-none');
			$(".optionQuestion").click(function(e) {
				optionRadio_R_M($(this));
				e.preventDefault();
			});
			$("#btnModalLarge").prop("onclick", null).off("click");
			$("#btnModalLarge").click(function(e) {
				var subject_1 = $(".subject_1").val();
				var subject_2 = $(".subject_2").val();
				var subject_3 = $(".subject_3").val();
				var subject_4 = $(".subject_4").val();
				var subject_5 = $(".subject_5").val();
				var subject_6 = $(".subject_6").val();
				var subject_7 = $(".subject_7").val();
				var subject_8 = $(".subject_8").val();
				var question_1 = $(".question_1.active").data('val');
				var question_2 = $(".question_2.active").data('val');
				var question_3 = $(".question_3.active").data('val');
				var question_4 = $(".question_4.active").data('val');
				var question_5 = $(".question_5.active").data('val');
				var question_6 = $(".question_6.active").data('val');
				var question_7 = $(".question_7.active").data('val');
				var question_8 = $(".question_8.active").data('val');
				var reason_question_1 = $("#reason_question_1").val();
				var reason_question_2 = $("#reason_question_2").val();
				var reason_question_3 = $("#reason_question_3").val();
				var reason_question_4 = $("#reason_question_4").val();
				var reason_question_5 = $("#reason_question_5").val();
				var reason_question_6 = $("#reason_question_6").val();
				var reason_question_7 = $("#reason_question_7").val();
				var reason_question_8 = $("#reason_question_8").val();
				var observation = $("#observation").val();
				var valid_question = (type == 1 )?false:true;
				var valid_pres = (type == 1 && (course.includes("PJ") || course.includes("JA") || course.includes("TR")))?false:true;
				//(type == 4)?valid_pres = false:valid_pres = true;
				var valid = validFormActData([
							{'data':subject_1,'item':'question_1','type':'select', 'obligatory':valid_pres},
							{'data':subject_2,'item':'question_2','type':'select', 'obligatory':valid_pres},
							{'data':subject_3,'item':'question_3','type':'select', 'obligatory':valid_pres},
							{'data':subject_4,'item':'question_4','type':'select', 'obligatory':valid_pres},
							{'data':subject_5,'item':'question_5','type':'select', 'obligatory':valid_pres},
							{'data':subject_6,'item':'question_6','type':'select', 'obligatory':valid_pres},
							{'data':subject_7,'item':'question_7','type':'select', 'obligatory':valid_pres},
							{'data':subject_8,'item':'question_8','type':'select', 'obligatory':valid_pres},
							{'data':question_1,'item':'question_1','type':'radio', 'obligatory':valid_pres},
							{'data':question_2,'item':'question_2','type':'radio', 'obligatory':valid_pres},
							{'data':question_3,'item':'question_3','type':'radio', 'obligatory':valid_pres},
							{'data':question_4,'item':'question_4','type':'radio', 'obligatory':valid_pres},
							{'data':question_5,'item':'question_5','type':'radio', 'obligatory':valid_pres},
							{'data':question_6,'item':'question_6','type':'radio', 'obligatory':valid_pres},
							{'data':question_7,'item':'question_7','type':'radio', 'obligatory':valid_pres},
							{'data':question_8,'item':'question_8','type':'radio', 'obligatory':valid_pres},
							{'data':reason_question_1,'item':'question_1','type':'text', 'obligatory':(question_1=="R" || question_1=="M")?true:false},
							{'data':reason_question_2,'item':'question_2','type':'text', 'obligatory':(question_2=="R" || question_2=="M")?true:false},
							{'data':reason_question_3,'item':'question_3','type':'text', 'obligatory':(question_3=="R" || question_3=="M")?true:false},
							{'data':reason_question_4,'item':'question_4','type':'text', 'obligatory':(question_4=="R" || question_4=="M")?true:false},
							{'data':reason_question_5,'item':'question_5','type':'text', 'obligatory':(question_5=="R" || question_5=="M")?true:false},
							{'data':reason_question_6,'item':'question_6','type':'text', 'obligatory':(question_6=="R" || question_6=="M")?true:false},
							{'data':reason_question_7,'item':'question_7','type':'text', 'obligatory':(question_7=="R" || question_7=="M")?true:false},
							{'data':reason_question_8,'item':'question_8','type':'text', 'obligatory':(question_8=="R" || question_8=="M")?true:false}]);
				var validSave = true;
				if (valid["validate"]) {
					$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
					$("#btnModalLarge").attr('disabled', true);
					let submitConceptParentsSurvey = submitConceptSurvey(num_survey,course,subject_1,subject_2,subject_3,subject_4,subject_5,subject_6,subject_7,subject_8,question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,reason_question_6,reason_question_7,reason_question_8,observation);
					$.when(submitConceptParentsSurvey).done(function(response){
						$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
						$("#btnModalLarge").removeAttr('disabled');
						$(".labelCheck").remove();
						$(".celValue").each(function() {
							$(this).removeClass('labelInvalid');
							$(this).addClass('labelValid');
							$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
							$(this).removeClass("animated infinite pulse");
						});
						$("#ModalLargeObs").modal("hide");
					}).fail(function(response){
						console.log(response);
					});
				}
				else {
					validSave = false;
					$(".labelCheck").remove();
					$(".celValue").each(function() {
						$(this).removeClass('labelValid');
						$(this).removeClass('labelInvalid');
						$(this).removeClass('animated infinite pulse');
					});
					$.each(valid['items'],function(key,label) {
						$("#label_"+label).addClass('labelInvalid');
						$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
						$("#label_"+label).addClass("animated infinite pulse");
						$("#"+label).focus();
						$("."+label).focus();
					});
				}
				e.preventDefault();
			});
		}).fail(function(response){
			console.log(response);
		});
	});
	$("#ModalLargeObs").modal("show");
}

function surveyBackToClass(num_survey,course,type){
	$("#titleModalLarge").text("Reanudación de Clases Presenciales");
	$("#bodyNotice").load("views/adminView/surveyBackToClass.html",function(){
		$(".btn_question").click(function(e) {
			optionRadioBack($(this));
			e.preventDefault();
		});
		$("#btnModalLarge").prop("onclick", null).off("click");
		$("#btnModalLarge").click(function(e) {
			var major_disease = $(".major_disease.active").data('val');
			var how_long_major_disease = $("#how_long_major_disease").val();
			var which_major_disease = $("#which_major_disease").val();
			var current_disease = $(".current_disease.active").data('val');
			var reason_current_disease = $("#reason_current_disease").val();
			var members_coexistence = $(".members_coexistence.active").data('val');
			var relationship_members_coexistence = $("#relationship_members_coexistence").val();
			var which_members_coexistence = $("#which_members_coexistence").val();
			var elderly = $(".elderly.active").data('val');
			var reason_elderly = $("#reason_elderly").val();
			var profesional_health = $(".profesional_health.active").data('val');
			var people_diagnosed = $(".people_diagnosed.active").data('val');
			var reason_people_diagnosed = $("#reason_people_diagnosed").val();
			var neighborhood = $("#neighborhood").val();
			var location = $("#location").val();
			var send_class = $(".send_class.active").data('val');
			var valid = validFormActData([
						{'data':major_disease,'item':'major_disease','type':'radio', 'obligatory':true},
						{'data':how_long_major_disease,'item':'how_long_major_disease','type':'text', 'obligatory':(major_disease=="Si")?true:false},
						{'data':which_major_disease,'item':'which_major_disease','type':'text', 'obligatory':(major_disease=="Si")?true:false},
						{'data':current_disease,'item':'current_disease','type':'radio', 'obligatory':true},
						{'data':reason_current_disease,'item':'reason_current_disease','type':'text', 'obligatory':(current_disease=="Si")?true:false},
						{'data':members_coexistence,'item':'members_coexistence','type':'radio', 'obligatory':true},
						{'data':relationship_members_coexistence,'item':'relationship_members_coexistence','type':'text', 'obligatory':(members_coexistence=="Si")?true:false},
						{'data':which_members_coexistence,'item':'which_members_coexistence','type':'text', 'obligatory':(members_coexistence=="Si")?true:false},
						{'data':elderly,'item':'elderly','type':'radio', 'obligatory':true},
						{'data':reason_elderly,'item':'reason_elderly','type':'text', 'obligatory':(elderly=="Si")?true:false},
						{'data':profesional_health,'item':'profesional_health','type':'radio', 'obligatory':true},
						{'data':people_diagnosed,'item':'people_diagnosed','type':'radio', 'obligatory':true},
						{'data':reason_people_diagnosed,'item':'reason_people_diagnosed','type':'text', 'obligatory':(people_diagnosed=="Si")?true:false},
						{'data':neighborhood,'item':'neighborhood','type':'text', 'obligatory':true},
						{'data':location,'item':'location','type':'text', 'obligatory':true},
						{'data':send_class,'item':'send_class','type':'radio', 'obligatory':true}]);
			var validSave = true;
			if (valid["validate"]) {
				$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
				$("#btnModalLarge").attr('disabled', true);
				let submitSurveyBackClass = submitBackToClass(num_survey,course,major_disease,how_long_major_disease,which_major_disease,current_disease,reason_current_disease,members_coexistence,relationship_members_coexistence,which_members_coexistence,elderly,reason_elderly,profesional_health,people_diagnosed,reason_people_diagnosed,neighborhood,location,send_class);
				$.when(submitSurveyBackClass).done(function(response){
					$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
					$("#btnModalLarge").removeAttr('disabled');
					$(".labelCheck").remove();
					$(".celValue").each(function() {
						$(this).removeClass('labelInvalid');
						$(this).addClass('labelValid');
						$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
						$(this).removeClass("animated infinite pulse");
					});
					$("#ModalLargeObs").modal("hide");
				}).fail(function(response){
					console.log(response);
				});
			}
			else {
				validSave = false;
				$(".labelCheck").remove();
				$(".celValue").each(function() {
					$(this).removeClass('labelValid');
					$(this).removeClass('labelInvalid');
					$(this).removeClass('animated infinite pulse');
				});
				$.each(valid['items'],function(key,label) {
					/*$("#label_"+label).addClass('labelInvalid');
					$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
					$("#label_"+label).addClass("animated infinite pulse");*/
					$("#"+label).parent().parent().addClass('labelInvalid');
					$("#"+label).parent().parent().append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
					$("#"+label).parent().parent().addClass("animated infinite pulse");
					$("."+label).parent().parent().addClass('labelInvalid');
					$("."+label).parent().parent().append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
					$("."+label).parent().parent().addClass("animated infinite pulse");
					$("#"+label).focus();
					$("."+label).focus();
				});
			}
			e.preventDefault();
		});
	});
	$("#ModalLargeObs").modal("show");
}

function conferenceSurvey(num_survey,course,type){
	$("#bodyNotice").load("views/adminView/conferenceSurvey.html",function(){
	/*if (course<1000) {
		$("#titleModalLarge").text("Conferencia Padres de Familia Grados 9°");
		$("#option_a").text("Potencializando habilidades  en casa y colegio");
		$("#option_b").text("Acompañamiento en la toma de decisiones de nuestros hijos ");
	}else{*/
		$("#titleModalLarge").text("Conferencia Padres de Familia   ");
		$("#option_a").text("Explorando nuevos campos profesionales para generación centenials");
		$("#option_b").text("Rol de los padres en el proceso de adaptación de sus hijos al mundo universitario");
	/*}*/
		$(".optionQuestion").click(function(e) {
			optionRadio($(this));
			e.preventDefault();
		});
		$("#btnModalLarge").prop("onclick", null).off("click");
		$("#btnModalLarge").click(function(e) {
			var question_1 = $(".question_1.active").data('val');
			var question_2 = $(".question_2.active").data('val');
			var question_3 = $(".question_3.active").data('val');
			var question_4 = $(".question_4.active").data('val');
			
			var reason_question_1 = $("#reason_question_1").val();
			var reason_question_2 = $("#reason_question_2").val();
			var reason_question_3 = $("#reason_question_3").val();
			
			
			
			var valid = validFormActData([
						{'data':question_1,'item':'question_1','type':'radio', 'obligatory':true},
						{'data':question_2,'item':'question_2','type':'radio', 'obligatory':true},
						{'data':question_3,'item':'question_3','type':'radio', 'obligatory':true},
						{'data':question_4,'item':'question_4','type':'radio', 'obligatory':true},
						
						{'data':reason_question_1,'item':'question_1','type':'radio', 'obligatory':(question_1=="R")?true:false},
						{'data':reason_question_2,'item':'question_2','type':'radio', 'obligatory':(question_2=="R")?true:false},
						{'data':reason_question_3,'item':'question_3','type':'radio', 'obligatory':(question_3=="R")?true:false}
						
						]);
						var validSave = true;
						if (valid["validate"]) {
							$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
							$("#btnModalLarge").attr('disabled', true);
							let sendconferenceSurvey = submitconferenceSurvey(num_survey,course,question_1,question_2,question_3,question_4,reason_question_1,reason_question_2,reason_question_3);
							$.when(sendconferenceSurvey).done(function(response){
								$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
								$("#btnModalLarge").removeAttr('disabled');
								$(".labelCheck").remove();
								$(".celValue").each(function() {
									$(this).removeClass('labelInvalid');
									$(this).addClass('labelValid');
									$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
									$(this).removeClass("animated infinite pulse");
								});
								$("#ModalLargeObs").modal("hide");
							}).fail(function(response){
								console.log(response);
							});
						}else {
							validSave = false;
							$(".labelCheck").remove();
							$(".celValue").each(function() {
								$(this).removeClass('labelValid');
								$(this).removeClass('labelInvalid');
								$(this).removeClass('animated infinite pulse');
							});
							$.each(valid['items'],function(key,label) {
								$("#label_"+label).addClass('labelInvalid');
								$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
								$("#label_"+label).addClass("animated infinite pulse");
								$("#"+label).focus();
								$("."+label).focus();
							});
						}
						e.preventDefault();
					});

	});
	$("#ModalLargeObs").modal("show");
}

function dataSurveySubjects(){
	var items = Array();
	var dataSend = {};
	$(".inputSubject").each(function() {
		var data_id = $(this).data('val');
		var reason = $("#reason_"+data_id).val();
		// items.push({'data':data_cord,'item':data_id,'type':'radio','obligatory':true});
		// items.push({'data':reason_forma,'item':data_id,'type':'text','obligatory':(data_forma=="R")?true:false});
		items.push({'data':reason,'item':data_id,'type':'text','obligatory':false});
		dataSend[data_id] = reason;
	});
	return {'items':items, 'dataSend':dataSend};
}

function surveyAccordingload(num_survey,course){
	$("#titleModalLarge").text("ENCUESTA DE PADRES Y ESTUDIANTES SOBRE ACTIVIDADES ON LINE");
	$("#bodyNotice").load("views/adminView/surveyAccordingloadOrig.html",function(){
		getTeachersCourse().done(function(postTeachers){
			var table = "<table class = 'table table-responsive table-sm table-hover table-bordered table-striped animated fadeIn' id='' style='font-size:16px;'><thead class='thead-active text-center'><tr><th scope='col' style='text-align: center;'>Asignatura</th><th scope='col' style='text-align: center;'>Observación</th></tr></thead><tbody class=''>";
		    $.each(postTeachers["response"], function(index, value) {
		    	var text_teacher = "";
		    	if (value["Subject"] != null) {
			    	// text_teacher = text_teacher+"<td class='celValue questionTeacher' data-val='"+value["id_subject"]+"_"+value["id_teacher"]+"'><b>"+value["Subject"]+":</b></td><td class='celValue text-center'><div class='btn-group' data-toggle='buttons'><label class='btn btn-outline-success btn-sm optionQuestion "+value["id_subject"]+"' data-val='1'><input class='form-control' type='radio' name='"+value["id_subject"]+"'>E <i class='fa fa-check' aria-hidden='true'></i></label></div><div class='input-group p-2 animated fadeInDown' id='div_"+value["id_subject"]+"'><textarea class='form-control' id='reason_"+value["id_subject"]+"' placeholder='Motivo' rows='2'></textarea></div></td>";
			    	text_teacher = text_teacher+"<td class='celValue questionTeacher' width='50px' data-val='"+value["id_subject"]+"'><b>"+value["Subject"]+":</b></td><td class='celValue text-center' width='150px'><div class='input-group p-2 animated fadeInDown' id='div_"+value["id_subject"]+"'><textarea class='form-control inputSubject' data-val='"+value["id_subject"]+"' id='reason_"+value["id_subject"]+"' placeholder='Motivo' rows='2'></textarea></div></td>";
					table = table+"<tr>"+text_teacher+"</tr>";
		    	}
		    });
			table = table+"</tbody></table>";
			$("#table_charge").append(table);
			/*$(".optionQuestion").click(function(e) {
				optionRadio($(this));
				e.preventDefault();
			});*/
			$("#btnPrintNotice").click(function(e) {
				printSurvey();
				e.preventDefault();
			});
			$("#btnModalLarge").prop("onclick", null).off("click");
			$("#btnModalLarge").click(function(e) {
				var dataSubjects = dataSurveySubjects();
				var validInfo = validFormActData(dataSubjects["items"]);
				if (validInfo["validate"]) {
					var infoSend = dataSubjects["dataSend"];
					let Accordingload = submitAccordingload(num_survey,course,infoSend);
					$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
					$("#btnModalLarge").attr('disabled', true);
					$.when(Accordingload).done(function(response){
						$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
						$("#btnModalLarge").removeAttr('disabled');
						$(".labelCheck").remove();
						$(".celValue").each(function() {
							$(this).removeClass('labelInvalid');
							$(this).addClass('labelValid');
							$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
							$(this).removeClass("animated infinite pulse");
						});
						$("#ModalLargeObs").modal("hide");
					}).fail(function(response){
						console.log(response);
					});
				}
				else {
					validSave = false;
					$(".labelCheck").remove();
					$(".celValue").each(function() {
						$(this).removeClass('labelValid');
						$(this).removeClass('labelInvalid');
						//$(this).removeClass('animated infinite pulse');
					});
					$.each(validInfo['items'],function(key,label) {
						$("#label_"+label).addClass('labelInvalid');
						$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
						//$("#label_"+label).addClass("animated infinite pulse");
						$("#"+label).focus();
						$("."+label).focus();
					});
				}
				e.preventDefault();
			});
			$("#ModalLargeObs").modal("show");
		}).fail(function(response){
			console.log(response);
		});
	});
	$("#ModalLargeObs").modal("show");
}

function surveySatisfactionparents(num_survey,course){

/*	getTeachersCourse().done(function(postTeachers){*/
	$("#titleModalLarge").text("ENCUESTA SATISFACCIÓN A PADRES");
	$("#bodyNotice").load("views/adminView/surveySatisfactionParents.html",function(){
		/* $("#section_3").prev().addClass('d-none');
		$("#section_3").addClass('d-none');
		$("#section_3").next().addClass('d-none');
		$("#section_3").prev().css('display','none');
		$("#section_3").css('display','none');
		$("#section_3").next().css('display','none');
		$("#section_3").next().next().html('<b>3. Opinión sobre el personal docente:</b>');
		$("#table_teachers").append(tableSurveyTeacher(postTeachers["response"]));
		*/
		$(".optionQuestion").click(function(e) {
			optionRadio_I_A($(this));
			e.preventDefault();
		});
		$(".showOptions").click(function(e) {
			showOptionsYN($(this));
			e.preventDefault();
		});
		//$("#semester").text("primer semestre del año 2020");
		$("#btnPrintNotice").click(function(e) {
			printSurvey();
			e.preventDefault();
		});
		$("#btnModalLarge").prop("onclick", null).off("click");
		$("#btnModalLarge").click(function(e) {
			var question_1 = $(".question_1.active").data('val');
			var question_2 = $(".question_2.active").data('val');
			var question_3 = $(".question_3.active").data('val');
			var question_4 = $(".question_4.active").data('val');
			var question_5 = $(".question_5.active").data('val');
			var question_10 = "N/A";
			var question_6 = ($(".options_question_6.active").data('val') == "Si")?$(".question_6.active").data('val'):$(".options_question_6.active").data('val');
			var question_7 = ($(".options_question_7.active").data('val') == "Si")?$(".question_7.active").data('val'):$(".options_question_7.active").data('val');
			var question_8 = ($(".options_question_8.active").data('val') == "Si")?$(".question_8.active").data('val'):$(".options_question_8.active").data('val');
			var question_9 = ($(".options_question_9.active").data('val') == "Si")?$(".question_9.active").data('val'):$(".options_question_9.active").data('val');
			
			var reason_question_1 = $("#reason_question_1").val();
			var reason_question_2 = $("#reason_question_2").val();
			var reason_question_3 = $("#reason_question_3").val();
			var reason_question_4 = $("#reason_question_4").val();
			var reason_question_5 = $("#reason_question_5").val();
			var reason_question_6 = $("#reason_question_6").val();
			var reason_question_7 = $("#reason_question_7").val();
			var reason_question_8 = $("#reason_question_8").val();
			var reason_question_9 = $("#reason_question_9").val();
			var reason_question_10 = $("#reason_question_10").val();
			
			var observation = $("#observation").val();
			var valid = validFormActData([{'data':question_1,'item':'question_1','type':'radio', 'obligatory':true},
						{'data':question_1,'item':'question_1','type':'radio', 'obligatory':true},
						{'data':question_2,'item':'question_2','type':'radio', 'obligatory':true},
						{'data':question_3,'item':'question_3','type':'radio', 'obligatory':true},
						{'data':question_4,'item':'question_4','type':'radio', 'obligatory':true},
						{'data':question_5,'item':'question_5','type':'radio', 'obligatory':true},
						{'data':question_6,'item':'question_6','type':'radio', 'obligatory':true},
						{'data':question_7,'item':'question_7','type':'radio', 'obligatory':true},
						{'data':question_8,'item':'question_8','type':'radio', 'obligatory':true},
						{'data':question_9,'item':'question_9','type':'radio', 'obligatory':true},
						{'data':question_10,'item':'question_10','type':'radio', 'obligatory':true},
						
						{'data':reason_question_1,'item':'question_1','type':'text', 'obligatory':(question_1=="I" || question_1=="A")?true:false},
						{'data':reason_question_2,'item':'question_2','type':'text', 'obligatory':(question_2=="I" || question_2=="A")?true:false},
						{'data':reason_question_3,'item':'question_3','type':'text', 'obligatory':(question_3=="I" || question_3=="A")?true:false},
						{'data':reason_question_4,'item':'question_4','type':'text', 'obligatory':(question_4=="I" || question_4=="A")?true:false},
						{'data':reason_question_5,'item':'question_5','type':'text', 'obligatory':(question_5=="I" || question_5=="A")?true:false},
						{'data':reason_question_6,'item':'question_6','type':'text', 'obligatory':(question_6=="I" || question_6=="A")?true:false},
						{'data':reason_question_7,'item':'question_7','type':'text', 'obligatory':(question_7=="I" || question_7=="A")?true:false},
						{'data':reason_question_8,'item':'question_8','type':'text', 'obligatory':(question_8=="I" || question_8=="A")?true:false},
						{'data':reason_question_9,'item':'question_9','type':'text', 'obligatory':(question_9=="I" || question_9=="A")?true:false},
						{'data':reason_question_10,'item':'question_10','type':'text', 'obligatory':(question_10=="I" || question_10=="A")?true:false}
						
						]);
			var validSave = true;
			if (valid["validate"]) {
				$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
				$("#btnModalLarge").attr('disabled', true);
				let submitSatisfaction = SubmitSatisfactionparents(num_survey,course,question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,question_10,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,reason_question_6,reason_question_7,reason_question_8,reason_question_9,reason_question_10,observation);
				$.when(submitSatisfaction).done(function(response){
					$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
					$("#btnModalLarge").removeAttr('disabled');
					$(".labelCheck").remove();
					$(".celValue").each(function() {
						$(this).removeClass('labelInvalid');
						$(this).addClass('labelValid');
						$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
						$(this).removeClass("animated infinite pulse");
					});
					$("#ModalLargeObs").modal("hide");
				}).fail(function(response){
					console.log(response);
				});
			}
			else {
				validSave = false;
				$(".labelCheck").remove();
				$(".celValue").each(function() {
					$(this).removeClass('labelValid');
					$(this).removeClass('labelInvalid');
					$(this).removeClass('animated infinite pulse');
				});
				$.each(valid['items'],function(key,label) {
					$("#label_"+label).addClass('labelInvalid');
					$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
					$("#label_"+label).addClass("animated infinite pulse");
					$("#"+label).focus();
					$("."+label).focus();
				});
			}
			e.preventDefault();
		});
	});
	$("#ModalLargeObs").modal("show");
}

// ENCUESTA DE VERIFICACIÓN DE SÍNTOMAS DIARIA INICIO

function surveySymptom(){

	$("#titleModalLarge").text("ENCUESTA");
	$("#bodyNotice").load("views/adminView/surveySymptom.html",function(){

			$(".optionQuestionYES").click(function(e) {
				optionRadioYN($(this));
				e.preventDefault();
			});

			$("#btnModalLarge").prop("onclick", null).off("click");
			$("#btnModalLarge").click(function(e) {
				var question_1 = $(".question_1.active").data('val');
				var question_2 = $(".question_2.active").data('val');
				var question_3 = $(".question_3.active").data('val');
				var question_4 = $(".question_4.active").data('val');
				var question_5 = $(".question_5.active").data('val');
				var question_6 = $(".question_6.active").data('val');
				var question_7 = $(".question_7.active").data('val');
				var question_8 = $(".question_8.active").data('val');
				var question_9 = $(".question_9.active").data('val');
				var question_10 = $(".question_10.active").data('val');
				var question_11 = $(".question_11.active").data('val');
				var question_12 = $(".question_12.active").data('val');
				var question_13 = $(".question_13.active").data('val');
				var question_14 = $(".question_14.active").data('val');
				var question_15 = $(".question_15.active").data('val');
				var question_16 = $(".question_16.active").data('val');
				var question_17 = $(".question_17.active").data('val');
				var question_18 = $(".question_18.active").data('val');

				
				var observation = $("#observation").val();
				var valid = validFormActData([
							{'data':question_1,'item':'question_1','type':'radio', 'obligatory':true},
							{'data':question_2,'item':'question_2','type':'radio', 'obligatory':true},
							{'data':question_3,'item':'question_3','type':'radio', 'obligatory':true},
							{'data':question_4,'item':'question_4','type':'radio', 'obligatory':true},
							{'data':question_5,'item':'question_5','type':'radio', 'obligatory':true},
							{'data':question_6,'item':'question_6','type':'radio', 'obligatory':true},
							{'data':question_7,'item':'question_7','type':'radio', 'obligatory':true},
							{'data':question_8,'item':'question_8','type':'radio', 'obligatory':true},
							{'data':question_9,'item':'question_9','type':'radio', 'obligatory':true},
							{'data':question_10,'item':'question_10','type':'radio', 'obligatory':true},
							{'data':question_11,'item':'question_11','type':'radio', 'obligatory':true},
							{'data':question_12,'item':'question_12','type':'radio', 'obligatory':true},
							{'data':question_13,'item':'question_13','type':'radio', 'obligatory':true},
							//{'data':question_14,'item':'question_14','type':'radio', 'obligatory':true},
							{'data':question_15,'item':'question_15','type':'radio', 'obligatory':true},
							{'data':question_16,'item':'question_16','type':'radio', 'obligatory':true},
							{'data':question_17,'item':'question_17','type':'radio', 'obligatory':true},
							{'data':question_18,'item':'question_18','type':'radio', 'obligatory':true}
							
							]);
				var validSave = true;
				if (valid["validate"]) {
					
					$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
					$("#btnModalLarge").attr('disabled', true);
					let send_SurveySymptom = sendSurveySymptom(question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,question_10,question_11,question_12,question_13,question_14,question_15,question_16,question_17,question_18);
					$.when(send_SurveySymptom).done(function(response){
						$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
						$("#btnModalLarge").removeAttr('disabled');
						$(".labelCheck").remove();
						$(".celValue").each(function() {
							$(this).removeClass('labelInvalid');
							$(this).addClass('labelValid');
							$(this).append('<span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
							$(this).removeClass("animated infinite pulse");
						});
						$("#ModalLargeObs").modal("hide");
					}).fail(function(response){
						console.log(response);
					});
				}
				else {
					validSave = false;
					$(".labelCheck").remove();
					$(".celValue").each(function() {
						$(this).removeClass('labelValid');
						$(this).removeClass('labelInvalid');
						$(this).removeClass('animated infinite pulse');
					});
					$.each(valid['items'],function(key,label) {
						$("#label_"+label).addClass('labelInvalid');
						$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
						$("#label_"+label).addClass("animated infinite pulse");
						$("#"+label).focus();
						$("."+label).focus();
					});
				}
				e.preventDefault();
			});
		});
		$("#ModalLargeObs").modal("show");
}

// ENCUESTA DE VERIFICACIÓN DE SÍNTOMAS DIARIA FIN

function surveyRegulationNoTransport(num_survey,names_student){
	var year_actual = parseInt(date.getFullYear());
	$("#titleModalLarge").text('REGLAMENTO PARA ESTUDIANTES QUE NO TOMAN EL SERVICIO DE TRANSPORTE CON EL COLEGIO EN EL AÑO ' + year_actual);
	$("#bodyNotice").load("views/adminView/surveyRegulationNoTransport.html",function(){
	// $("#bodyNotice").load("views/adminView/surveyRegulationNoTransport2022.html",function(){
		$(".optionQuestionYES").click(function(e) {
			optionRadioYN($(this));
			e.preventDefault();
		});
		$("#btnPrintNotice").addClass('d-none');
		$("#names_student").text(names_student);
		$("#btnModalLarge").text('Aceptar');
		// $('#ModalLargeObs').modal({backdrop: 'static', keyboard: false});
		// $("#ModalLargeObs").modal("show");
		$(".btnTransport").click(function(e) {
			var option = $(this).attr('data-val');
			var option_id = $(this).find('input').attr('name');
			if (option == "No") {
				$("#div_"+option_id).removeClass('d-none');
			}
			else if (option == "Si") {
				$("#div_"+option_id).addClass('d-none');
				$("#div_"+option_id).find('input').val("");
				$("#div_collect_1").addClass('d-none');
				$("#div_collect_1").find('input').val("");
				$("#div_collect_2").addClass('d-none');
				$("#div_collect_2").find('input').val("");
				$(".typeTransport").each(function() {
					$(this).removeClass('active');
				});
				$(".personAdd").each(function() {
					$(this).removeClass('active');
				});
			}
			e.preventDefault();
		});
		$(".add_person_1").click(function(e) {
			var option = $(this).attr('data-val');
			if (option == "Si") {
				$("#div_collect_1").removeClass('d-none');
			}
			else if (option == "No") {
				$("#div_collect_1").addClass('d-none');
				$("#div_collect_1").find('input').val("");
				$("#div_collect_2").addClass('d-none');
				$("#div_collect_2").find('input').val("");
				$(".add_person_2").each(function() {
					$(this).removeClass('active');
				});
			}
			e.preventDefault();
		});
		$(".add_person_2").click(function(e) {
			var option = $(this).attr('data-val');
			if (option == "Si") {
				$("#div_collect_2").removeClass('d-none');
			}
			else if (option == "No") {
				$("#div_collect_2").addClass('d-none');
				$("#div_collect_2").find('input').val("");
			}
			e.preventDefault();
		});
		$("#btnModalLarge").html("Guardar <i class='fa fa-floppy-o'></i>");
		$("#btnModalLarge").off();
		$("#btnModalLarge").click(function(e) {
			var authPersonal = $(".authPersonal.active").data('val');
			var authSecond = $(".add_person_1.active").data('val');
			var authThird = $(".add_person_2.active").data('val');
			var authName = $("#authName").val();
			var authDoc = $("#authDoc").val();
			var authMobile = $("#authMobile").val();
			var authName_1 = $("#authName_1").val();
			var authDoc_1 = $("#authDoc_1").val();
			var authMobile_1 = $("#authMobile_1").val();
			var authName_2 = $("#authName_2").val();
			var authDoc_2 = $("#authDoc_2").val();
			var authMobile_2 = $("#authMobile_2").val();
			var typeTransport = $(".typeTransport.active").data('val');
			var optRequire = (authPersonal == "No")?true:false;
			var optSecondAuth = (authSecond == "Si")?true:false;
			var optThirdAuth = (authThird == "Si")?true:false;
			var valid = validFormActData([
					{'data':authPersonal,'item':'authPersonal','type':'radio', 'obligatory':true},
					{'data':authName,'item':'authName','type':'text', 'obligatory':optRequire},
					{'data':authDoc,'item':'authDoc','type':'text', 'obligatory':optRequire},
					{'data':authMobile,'item':'authMobile','type':'text', 'obligatory':optRequire},
					{'data':authName_1,'item':'authName_1','type':'text', 'obligatory':optSecondAuth},
					{'data':authDoc_1,'item':'authDoc_1','type':'text', 'obligatory':optSecondAuth},
					{'data':authMobile_1,'item':'authMobile_1','type':'text', 'obligatory':optSecondAuth},
					{'data':authName_2,'item':'authName_2','type':'text', 'obligatory':optThirdAuth},
					{'data':authDoc_2,'item':'authDoc_2','type':'text', 'obligatory':optThirdAuth},
					{'data':authMobile_2,'item':'authMobile_2','type':'text', 'obligatory':optThirdAuth},
					{'data':typeTransport,'item':'typeTransport','type':'radio', 'obligatory':true}]);
			if (valid["validate"]) {
				$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
				$("#btnModalLarge").attr('disabled', true);
				submitRegulationNoTransport(num_survey,authPersonal,typeTransport,authName,authDoc,authMobile,authName_1,authDoc_1,authMobile_1,authName_2,authDoc_2,authMobile_2).done(function(response){

					//viewInfoStudent(respStudent[0]["response"][0],respBrother[0],respBrotherSchool[0]);
					$("#btnModalLarge").html('Aceptar');
					$("#btnModalLarge").removeAttr('disabled');
					$(".labelCheck").remove();
					$(".labelDiv.modalDiv").each(function() {
						$(this).removeClass('labelInvalid');
						$(this).addClass('labelValid');
					});
					//window.open("../documentos/PDF/generator/documento.php?pag=ZGVzcHJlbmRpYmxlLnBocA==","_blank");
					$("#ModalLargeObs").modal("hide");

				}).fail(function(response){
					console.log(response);
				});
			}
			else {
				$(".labelCheck").remove();
				$(".labelDiv.modalDiv").each(function() {
					$(this).removeClass('labelValid');
					$(this).removeClass('labelInvalid');
					$(this).removeClass('animated infinite pulse');
				});
				$.each(valid['items'],function(key,label) {
					$("#label_"+label).addClass('labelInvalid');
					$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
					$("#label_"+label).addClass("animated infinite pulse");
					$("#"+label).focus();
					$("."+label).focus();
				});
			}
			e.preventDefault();
		});
	});
	$("#ModalLargeObs").modal("show");
}

function surveySatisfactionClassrom(num_survey, course) {

	$("#titleModalLarge").text("Encuesta de satisfacción clases virtuales");
	$("#bodyNotice").load(
	  "views/adminView/surveySatisfactionClassrom.html",
	  function () {
		$(".optionQuestion").click(function (e) {
			optionRadio_SC($(this));
		  e.preventDefault();
		});
		$("#btnModalLarge").prop("onclick", null).off("click");
		$("#btnModalLarge").click(function (e) {
		  var question_1 = $(".question_1.active").data("val");
		  var question_2 = $(".question_2.active").data("val");
		  var question_3 = $(".question_3.active").data("val");
		  var question_4 = $(".question_4.active").data("val");
		  var question_5 = $(".question_5.active").data("val");
		  var question_6 = $(".question_6.active").data("val");
		  var reason_question_1 = $("#reason_question_1").val();
		  var reason_question_2 = $("#reason_question_2").val();
		  var reason_question_3 = $("#reason_question_3").val();
		  var reason_question_4 = $("#reason_question_4").val();
		  var reason_question_5 = $("#reason_question_5").val();
		  var reason_question_6 = $("#reason_question_6").val();
		  var valid = validFormActData([
			{data: question_1,item: "question_1",type: "radio",obligatory: true},
			{data: question_2,item: "question_2",type: "radio",obligatory: true},
			{data: question_3,item: "question_3", type: "radio",obligatory: true},
			{data: question_4,item: "question_4",type: "radio",obligatory: true},
			{data: question_5,item: "question_5",type: "radio",obligatory: true},
			{data: question_6,item: "question_6",type: "radio",obligatory: true},
			{data: reason_question_1,item: "question_1",type: "radio",obligatory: (question_1 == "Dificil"  || question_1 == "Muy_dificil")? true : false},
			{data: reason_question_2,item: "question_2",type: "radio",obligatory: (question_2 == "Dificil"  || question_2 == "Muy_dificil") ? true : false},
			{data: reason_question_3,item: "question_3",type: "radio",obligatory: (question_3 == "Poco_clara" || question_3 == "Confusa") ? true : false},
			{data: reason_question_4,item: "question_4",type: "radio",obligatory: (question_4 == "R" || question_4 == "M") ? true : false,},
			{data: reason_question_5,item: "question_5",type: "radio",obligatory: (question_5 == "R" || question_5 == "M") ? true : false},
			{data: reason_question_6,item: "question_6",type: "radio",obligatory: (question_6 == "Poco_convenientes" || question_6 == "Inconvenientes") ? true : false}
		  ]);
		  var validSave = true;
		  if (valid["validate"]) {
			$("#btnModalLarge").html(
			  "Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>"
			);
			$("#btnModalLarge").attr("disabled", true);
			let ProcessEnrollSend = submitSatisfactionClassVirtual(num_survey,question_1,question_2,question_3,question_4,question_5,question_6,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,reason_question_6)
			$.when(ProcessEnrollSend).done(function (response) {
				$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
				$("#btnModalLarge").removeAttr("disabled");
				$(".labelCheck").remove();
				$(".celValue").each(function () {
				  $(this).removeClass("labelInvalid");
				  $(this).addClass("labelValid");
				  $(this).append('<span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
				  $(this).removeClass("animated infinite pulse");
				});
				$("#ModalLargeObs").modal("hide");
			}).fail(function (response) {
				console.log(response);
			});
		  } else {
			validSave = false;
			$(".labelCheck").remove();
			$(".celValue").each(function () {
			  $(this).removeClass("labelValid");
			  $(this).removeClass("labelInvalid");
			  $(this).removeClass("animated infinite pulse");
			});
			$.each(valid["items"], function (key, label) {
			  $("#label_" + label).addClass("labelInvalid");
			  $("#label_" + label).append('<span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
			  $("#label_" + label).addClass("animated infinite pulse");
			  $("#" + label).focus();
			  $("." + label).focus();
			});
		  }
		  e.preventDefault();
		});
	  }
	);
	$("#ModalLargeObs").modal("show");
  }


function modalSurvey(num_survey,data_survey) {
	$("#bodyTagLarge").load("views/adminView/modalNotices.html",function(){
		$("#errorModalLarge").children().remove();
		var date = new Date();
		var dateNow= date.toISOString().split('T')[0]
		var dateStart = data_survey["Date_Start"];
		var dateEnd = data_survey["Date_End"];
		if (dateNow >= dateStart && dateNow <= dateEnd) {
			if (data_survey["Answer"] == "") {
				$("#btnModalLarge").removeClass('d-none');
				$("#btnModalLarge").removeAttr('disabled');
			}
			else {
				$("#btnModalLarge").addClass('d-none');
				$("#btnModalLarge").attr('disabled', true);
				$("#errorModalLarge").append("<pre class='alert alert-info'><p class='text-center'>Su información fue registrada correctamente.<p></pre>");
				$("#errorModalLarge").removeClass("infinite flash");
			}

		}else{
			$("#btnModalLarge").attr('disabled',true);
			$("#btnModalLarge").addClass('d-none');
			$("#errorModalLarge").append("<pre class='alert alert-info'><p class='text-center'>Encuesta cerrada.<p></pre>");
			$("#errorModalLarge").removeClass("infinite flash");
		}		
		$("#dateStart").text(data_survey["Date_Start"]);
		$("#dateEnd").text(data_survey["Date_End"]);
		switch (data_survey["Data_Info"]) {
			case "11":
				surveyParentsPres(num_survey,data_survey["Course"]);
				break;
			case "12":
				surveyFamilyWorkshop(num_survey,data_survey["Course"]);
				break;
			case "13":
				surveyFamilyPsychology(num_survey,data_survey["Course"]);
				break;
			case "16":
				surveyFamilyAdmissions(num_survey,data_survey["Course"]);
				break;
			case "19":
				surveyProcessEnroll(num_survey,data_survey["Course"]);
				break;
			case "20":
				surveyTransport(num_survey,data_survey["Course"]);
				break;
			case "21":
				surveyResources(num_survey,data_survey["Course"]);
				break;
			case "22":
				conceptSurvey(num_survey,data_survey["Course"],3);
				break;
			case "23":
				conceptSurvey(num_survey,data_survey["Course"],1);
				break;
			case "24":
				primary_Concept(num_survey,data_survey["Course"]);
				break;
			case "26":
				conferenceSurvey(num_survey,data_survey["Course"]);
				break;
			case "27":
				surveyBackToClass(num_survey,data_survey["Course"]);
				break;
			case "28":
				surveyParents(num_survey,data_survey["Course"]);
				break;
			case "29":
				conceptSurvey(num_survey,data_survey["Course"],4);
				break;
			case "30":
				surveyPsychologist(num_survey,data_survey["Course"],1);
				break;
			case "31":
				surveyAccordingload(num_survey,data_survey["Course"]);
				break;
			case "32":
				surveySatisfactionparents(num_survey,data_survey["Course"]);
				break;
			case "37":
				surveySymptom();
				break;
			case "40":
				surveyRegulationNoTransport(num_survey,data_survey["Names"]);
				break;
			case "41":
				surveyPsychologist(num_survey,data_survey["Course"],2);
				break;				
			case "42":
				surveyShowtheTalent(num_survey,data_survey["Course"]);
				break;
			case "43":
				surveyShowtheTalent2(num_survey,data_survey["Course"]);
				break;
			case "46":
				surveyParentsPresCorta(num_survey,data_survey["Course"]);
				break;
			case "47":
				surveyProcessEnrollNew2(num_survey,data_survey["Course"]);
				break;
			case "49":
				surveySatisfactionClassrom(num_survey,data_survey["Course"]);
				break;
			case "50":
				tenis(num_survey,data_survey["Course"]);
				break;
			default:
				console.log(data_survey);
				break;
		}
	});
	$("#ModalLargeObs").on('hidden.bs.modal',function(){
		$("#bodyTagLarge").children().remove();
		$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
		surveysView();
	});
}




function tenis(num_survey, course) {

	$("#titleModalLarge").text("Encuesta de satisfacción clases virtuales");
	$("#bodyNotice").load(
	  "views/adminView/surveySatisfactionClassrom.html",
	  function () {
		$(".optionQuestion").click(function (e) {
			optionRadio_SC($(this));
		  e.preventDefault();
		});
		$("#btnModalLarge").prop("onclick", null).off("click");
		$("#btnModalLarge").click(function (e) {
		  var question_1 = $(".question_1.active").data("val");
		  var question_2 = $(".question_2.active").data("val");
		  var question_3 = $(".question_3.active").data("val");
		  var question_4 = $(".question_4.active").data("val");
		  var question_5 = $(".question_5.active").data("val");
		  var question_6 = $(".question_6.active").data("val");
		  var reason_question_1 = $("#reason_question_1").val();
		  var reason_question_2 = $("#reason_question_2").val();
		  var reason_question_3 = $("#reason_question_3").val();
		  var reason_question_4 = $("#reason_question_4").val();
		  var reason_question_5 = $("#reason_question_5").val();
		  var reason_question_6 = $("#reason_question_6").val();
		  var valid = validFormActData([
			{data: question_1,item: "question_1",type: "radio",obligatory: true},
			{data: question_2,item: "question_2",type: "radio",obligatory: true},
			{data: question_3,item: "question_3", type: "radio",obligatory: true},
			{data: question_4,item: "question_4",type: "radio",obligatory: true},
			{data: question_5,item: "question_5",type: "radio",obligatory: true},
			{data: question_6,item: "question_6",type: "radio",obligatory: true},
			{data: reason_question_1,item: "question_1",type: "radio",obligatory: (question_1 == "Dificil"  || question_1 == "Muy_dificil")? true : false},
			{data: reason_question_2,item: "question_2",type: "radio",obligatory: (question_2 == "Dificil"  || question_2 == "Muy_dificil") ? true : false},
			{data: reason_question_3,item: "question_3",type: "radio",obligatory: (question_3 == "Poco_clara" || question_3 == "Confusa") ? true : false},
			{data: reason_question_4,item: "question_4",type: "radio",obligatory: (question_4 == "R" || question_4 == "M") ? true : false,},
			{data: reason_question_5,item: "question_5",type: "radio",obligatory: (question_5 == "R" || question_5 == "M") ? true : false},
			{data: reason_question_6,item: "question_6",type: "radio",obligatory: (question_6 == "Poco_convenientes" || question_6 == "Inconvenientes") ? true : false}
		  ]);
		  var validSave = true;
		  if (valid["validate"]) {
			$("#btnModalLarge").html(
			  "Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>"
			);
			$("#btnModalLarge").attr("disabled", true);
			let ProcessEnrollSend = submitSatisfactionClassVirtual(num_survey,question_1,question_2,question_3,question_4,question_5,question_6,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,reason_question_6)
			$.when(ProcessEnrollSend).done(function (response) {
				$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
				$("#btnModalLarge").removeAttr("disabled");
				$(".labelCheck").remove();
				$(".celValue").each(function () {
				  $(this).removeClass("labelInvalid");
				  $(this).addClass("labelValid");
				  $(this).append('<span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
				  $(this).removeClass("animated infinite pulse");
				});
				$("#ModalLargeObs").modal("hide");
			}).fail(function (response) {
				console.log(response);
			});
		  } else {
			validSave = false;
			$(".labelCheck").remove();
			$(".celValue").each(function () {
			  $(this).removeClass("labelValid");
			  $(this).removeClass("labelInvalid");
			  $(this).removeClass("animated infinite pulse");
			});
			$.each(valid["items"], function (key, label) {
			  $("#label_" + label).addClass("labelInvalid");
			  $("#label_" + label).append('<span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
			  $("#label_" + label).addClass("animated infinite pulse");
			  $("#" + label).focus();
			  $("." + label).focus();
			});
		  }
		  e.preventDefault();
		});
	  }
	);
	$("#ModalLargeObs").modal("show");
  }



function surveysView() {
	let notice = getNotices(true);
	let userInfo = getInfo();
	$.when(notice,userInfo).done(function(responseNotice,responseUser){
		$("#content").load("views/surveys.html",function(){
			$("#table_alert").append("<pre class='alert alert-info'><p class='text-info consul text-center'>Para diligenciar la encuesta, dé clic en el texto del asunto.<p></pre>");
			let table_notices = createTable("temp",responseNotice[0]["response"],false, false, 1,true);
			$("#table_survey").append(table_notices);
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
				var num_survey = atob($(this).data("val"));
				let consult = sendConsult(num_survey);
				let dataInfo = dataSurvey(num_survey);
				$.when(consult,dataInfo).done(function(responseCons,responseData){
					modalSurvey(num_survey,responseData[0]["response"][0]);
				}).fail(function(responseCons,responseData){
					console.log(responseCons);
				});
				e.preventDefault();
			});
		})

	}).fail(function(resp){
		console.log(resp);
	});
}