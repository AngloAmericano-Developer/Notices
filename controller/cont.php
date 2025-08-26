<?php 
	$root = realpath($_SERVER["DOCUMENT_ROOT"]);
	include("$root/funciones.php");
	include("$root/includes/sesion.inc");
	include("$root/controller/constants.php");
	include("queries.php");
	//require("Classes/PHPExcel.php");
	
	/*
	//solo para pruebas ambiente local
	$_SESSION['auth'] = 'yes';
	$_SESSION['id'] = 40058;
	$_SESSION['perfil'] = 53;
	//$_SESSION['perfil'] = 53;
	*/

	function isLoged($base_){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$return =array();
				if ($_SESSION['auth'] == "yes" || $_SESSION['id'] != NULL){
					$return['is_logged']=true;
					return $return; 
				}
				$return['is_logged']=false;
				return $return['is_logged'];
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

	function get_access($base){
		try{
			if(isset($base)){				
				$access = getAccess($base);
			    return json_encode($access);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function get_profile(){
		try{
			$array= array("psico"=>false,"coor"=>false);
			if($_SESSION["perfil"] == 52){
				$array["psico"] = true;
			}
			if($_SESSION["perfil"]== 53){
				$array["coor"] = true;
			}

			return json_encode(array("code"=>200,"response"=>$array));
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}		
	}

	function get_notices($base,$surveys){
		try{
			if(isset($base)){				
				$notices = getNotices($base,$surveys);
			    return json_encode($notices);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}	
	}

	function get_nc($base, $notice){
		try{
			if(isset($base) && isset($notice)){				
				$notice = getNoticeContent($base, $notice);
			    return json_encode($notice);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}	
	}

	function get_UserInfo($base_){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$modules = get_Uinfo($base);
				return json_encode($modules);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

	function send_InfoNotice($base_,$data,$num_notice){
		try
		{
			global $db;
			if(isset($base_) && isset($data) && isset($num_notice)){
				$base = $db[$base_];
				$sendNotice = sendInfoNotice($base,$data,$num_notice);
				return json_encode($sendNotice);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

	function data_Notice($base_,$num_notice){
		try
		{
			global $db;
			if(isset($base_) && isset($num_notice)){
				$base = $db[$base_];
				$dataNotice = dataNotice($base,$num_notice);
				return json_encode($dataNotice);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

	function data_Survey($base_,$num_survey){
		try
		{
			global $db;
			if(isset($base_) && isset($num_survey)){
				$base = $db[$base_];
				$dataSurvey = dataSurvey($base,$num_survey);
				return json_encode($dataSurvey);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}
	function send_Consult($base_,$num_notice){
		try
		{
			global $db;
			if(isset($base_) && isset($num_notice)){
				$base = $db[$base_];
				$consultNotice = sendConsult($base,$num_notice);
				return json_encode($consultNotice);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}



	function sumbit_ParentsPres($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_6,$question_7,$question_8,$question_9,$question_10,$question_11,$question_12,$question_13,$question_14,$question_15,$reason_question_7,$reason_question_8,$reason_question_9,$reason_question_10,$reason_question_11,$reason_question_13,$observation,$infoSend){
	
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$parentsPres = submitParentsPres($base,$num_survey,$course,$question_1,$question_2,$question_3,$question_6,$question_7,$question_8,$question_9,$question_10,$question_11,$question_12,$question_13,$question_14,$question_15,$reason_question_7,$reason_question_8,$reason_question_9,$reason_question_10,$reason_question_11,$reason_question_13,$observation,$infoSend);
				return json_encode($parentsPres);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

	function sumbit_ParentsPres_Corta($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_6,$question_7,$question_8,$question_9,$question_10,$question_11,$question_12,$question_13,$question_14,$question_15,$reason_question_7,$reason_question_8,$reason_question_9,$reason_question_10,$reason_question_11,$reason_question_13){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$parentsPres = submitParentsPresCorta($base,$num_survey,$course,$question_1,$question_2,$question_3,$question_6,$question_7,$question_8,$question_9,$question_10,$question_11,$question_12,$question_13,$question_14,$question_15,$reason_question_7,$reason_question_8,$reason_question_9,$reason_question_10,$reason_question_11,$reason_question_13);
				return json_encode($parentsPres);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

	function sumbit_Parents($base_,$periodo,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9,$question_10,$question_14,$question_15,$question_16,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$reason_question_5,$reason_question_7,$reason_question_8,$reason_question_10,$observation,$infoSend){
		try{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$parents = submitParents($base,$periodo,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9,$question_10,$question_14,$question_15,$question_16,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$reason_question_5,$reason_question_7,$reason_question_8,$reason_question_10,$observation,$infoSend);
				return json_encode($parents);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

	function submit_FamilyWorkshop($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9,$reason_question_6,$reason_question_7,$observation){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$FamilyWorkshop = submitFamilyWorkshop($base,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9,$reason_question_6,$reason_question_7,$observation);
				return json_encode($FamilyWorkshop);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}
	function submit_FamilyPsychology($base_,$num_survey,$course,$question_1,$question_2,$question_7,$reason_question_1,$reason_question_2,$reason_question_7,$observation){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$FamilyPsychology = submitFamilyPsychology($base_,$num_survey,$course,$question_1,$question_2,$question_7,$reason_question_1,$reason_question_2,$reason_question_7,$observation);
				return json_encode($FamilyPsychology);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}
	function submit_FamilyAdmissions($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9,$question_10,$question_11,$question_12,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$reason_question_5,$reason_question_6,$reason_question_8,$reason_question_9,$reason_question_10,$observation,$questions,$reason_questions){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$FamilyAdmissions = submitFamilyAdmissions($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9,$question_10,$question_11,$question_12,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$reason_question_5,$reason_question_6,$reason_question_8,$reason_question_9,$reason_question_10,$observation,$questions,$reason_questions);
				return json_encode($FamilyAdmissions);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}
	function submit_ProcessEnroll($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$question_5,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$reason_question_5,$observation){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$ProcessEnroll = submitProcessEnroll($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$question_5,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$reason_question_5,$observation);
				return json_encode($ProcessEnroll);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}
	function submit_Transport($base_,$num_survey,$course,$question_1,$reason_question_1,$question_2,$reason_question_2,$question_3,$reason_question_3,$question_4,$reason_question_4,$question_5,$reason_question_5,$question_6,$reason_question_6,$question_7,$reason_question_7,$question_8,$reason_question_8,$question_9,$reason_question_9,$question_10,$reason_question_10,$question_11,$reason_question_11,$question_12,$reason_question_12,$question_13,$reason_question_13){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$Transport = submitTransport($base_,$num_survey,$course,$question_1,$reason_question_1,$question_2,$reason_question_2,$question_3,$reason_question_3,$question_4,$reason_question_4,$question_5,$reason_question_5,$question_6,$reason_question_6,$question_7,$reason_question_7,$question_8,$reason_question_8,$question_9,$reason_question_9,$question_10,$reason_question_10,$question_11,$reason_question_11,$question_12,$reason_question_12,$question_13,$reason_question_13);
				return json_encode($Transport);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}


	function submit_Resources($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$reason_question_3,$observation){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$Resources = submitResources_($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$reason_question_3,$observation);
				return json_encode($Resources);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}
	function submitPrimary($base_,$num_survey,$course,$subject_1,$subject_2,$subject_3,$subject_4,$subject_5,$question_1,$question_2,$question_3,$question_4,$question_5,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$reason_question_5,$observation){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$Primary_Concept = submit_Primary_Concept($base,$num_survey,$course,$subject_1,$subject_2,$subject_3,$subject_4,$subject_5,$question_1,$question_2,$question_3,$question_4,$question_5,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$reason_question_5,$observation);
				return json_encode($Primary_Concept);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}
	function submit_concept_survey($base_,$num_survey,$course,$array_,$observation){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$conceptSurvey = submitConceptSurvey($base,$num_survey,$course,$array_,$observation);
				return json_encode($conceptSurvey);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}
	function get_subject_course($base_){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$subjects = getSubjectCourse($base);
				return json_encode($subjects);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}
	function get_teachers_course($base_){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$teachers = getTeachersCourse($base);
				return json_encode($teachers);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}
	function submitconference_Survey($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$reason_question_1,$reason_question_2,$reason_question_3){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$conference_Survey = submit_conference_Survey($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$reason_question_1,$reason_question_2,$reason_question_3);
				return json_encode($conference_Survey);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}
	function submit_back_to_class($base_,$num_survey,$course,$major_disease,$how_long_major_disease,$which_major_disease,$current_disease,$reason_current_disease,$members_coexistence,$relationship_members_coexistence,$which_members_coexistence,$elderly,$reason_elderly,$profesional_health,$people_diagnosed,$reason_people_diagnosed,$neighborhood,$location,$send_class){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$backClass = submitBackToClass($base_,$num_survey,$course,$major_disease,$how_long_major_disease,$which_major_disease,$current_disease,$reason_current_disease,$members_coexistence,$relationship_members_coexistence,$which_members_coexistence,$elderly,$reason_elderly,$profesional_health,$people_diagnosed,$reason_people_diagnosed,$neighborhood,$location,$send_class);
				return json_encode($backClass);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}
	function submitsurvey_Psychologist($base_,$num_survey,$course,$question_1,$question_2,$question_3,$reason_question_1,$reason_question_2,$reason_question_3,$observation){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$survey_Psychologist = submit_survey_Psychologist($base_,$num_survey,$course,$question_1,$question_2,$question_3,$reason_question_1,$reason_question_2,$reason_question_3,$observation);
				return json_encode($survey_Psychologist);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

	function submitsurvey_Ocupational($base_,$num_survey,$course,$question_1,$question_2,$question_3,$reason_question_1,$reason_question_2,$reason_question_3,$observation){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$survey_Psychologist = submit_survey_Ocupational($base_,$num_survey,$course,$question_1,$question_2,$question_3,$reason_question_1,$reason_question_2,$reason_question_3,$observation);
				return json_encode($survey_Psychologist);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

	function submitsurvey_ShowtheTalent($base_,$num_survey,$course,$question_1,$question_2,$question_3,$reason_question_1,$reason_question_2,$reason_question_3,$observation){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$survey_Show = submit_survey_ShowtheTalent($base_,$num_survey,$course,$question_1,$question_2,$question_3,$reason_question_1,$reason_question_2,$reason_question_3,$observation);
				return json_encode($survey_Show);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

	function get_psychology_attention($base_){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$attentionPsychology = getPsychologyAttention($base);
				return json_encode($attentionPsychology);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

		function get_psychology_attention_Actualization($base_){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$attentionPsychology = getPsychologyAttentionActualization($base);
				return json_encode($attentionPsychology);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

	function submit_Accordingload($base_,$num_survey,$course,$infoSend){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$Transport = submit_According_load($base_,$num_survey,$course,$infoSend);
				return json_encode($Transport);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}
	function Submit_Satisfactionparents($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9,$question_10,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$reason_question_5,$reason_question_6,$reason_question_7,$reason_question_8,$reason_question_9,$reason_question_10,$observation){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$Satisfactionparents = Submit_Satisfaction_parents($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9,$question_10,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$reason_question_5,$reason_question_6,$reason_question_7,$reason_question_8,$reason_question_9,$reason_question_10,$observation);
				return json_encode($Satisfactionparents);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}
	function send_Survey_Symptom($base_,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9,$question_10,$question_11,$question_12,$question_13,$question_14,$question_15,$question_16,$question_17,$question_18){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$Satisfactionparents = Survey_Symptom($base_,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9,$question_10,$question_11,$question_12,$question_13,$question_14,$question_15,$question_16,$question_17,$question_18);
				return json_encode($Satisfactionparents);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}
	function send_Survey_Consumer($base_,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$Satisfactionparents = Survey_Consumer($base_,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9);
				return json_encode($Satisfactionparents);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

	function submit_regulation_no_transport($base_,$num_survey,$authPersonal,$typeTransport,$authName,$authDoc,$authMobile,$authName_1,$authDoc_1,$authMobile_1,$authName_2,$authDoc_2,$authMobile_2){
		try{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];			
				$regulationNoTransport = submitRegulationNoTransport($base,$num_survey,$authPersonal,$typeTransport,$authName,$authDoc,$authMobile,$authName_1,$authDoc_1,$authMobile_1,$authName_2,$authDoc_2,$authMobile_2);
			    return json_encode($regulationNoTransport);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function submit_Satisfaction_ClassVirtual($base_,$num_survey,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$reason_question_5,$reason_question_6){
		try{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$ProcessEnroll = submitSatisfactionClassVirtual($base_,$num_survey,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$reason_question_5,$reason_question_6);
				return json_encode($ProcessEnroll);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

	function get_grado($base){
		try {
			if(isset($base)){
				$access = getGrado($base);
				return json_encode($access);
			}else{
				return json_encode(array("code"=>400,"error"=>"todos los datos son requeridos"));
			}
		} catch (Exception $th) {
			return json_encode(array("code" =>500,"error" =>$th->getMessage()));
		}
	}

	function Get_List($base_,$grado,$curso){
		if(isset($base_)){
			$base = $db[$base_];
			$dataUser = GetList($base_,$grado,$curso);
		    return json_encode($dataUser);
		}
		else{
			return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
		}		
	}


	$base = (!isset($_FILES['base']))?'caa':$_FILES['base'];
	$userLoged = isLoged($base);

	if($userLoged['is_logged']){
			
		$base=$db[$_POST['base']];
		switch ($_POST['param']) {
			case 'permission':
				echo get_access($base);
				break;
			case 'getProfile':
				echo get_profile();
				break;
			case 'getNotices':
				echo get_notices($base,$_POST['surveys']);
				break;
			case 'getNoticeContent':
				echo get_nc($base, $_POST['notice']);
				break;
			case 'getInfo':
				echo get_UserInfo($_POST['base']);	
				break;
			case 'GetList':
				echo Get_List($_POST['base'],$_POST['grado'],$_POST['curso']);	
				break;
			case 'getGrado':
				echo get_grado($base);
				break;
			case 'sendInfoNotice':
				echo send_InfoNotice($_POST['base'],$_POST['data'],$_POST['num_notice']);	
				break;
			case 'dataNotice':
				echo data_Notice($_POST['base'],$_POST['num_notice']);	
				break;
			case 'dataSurvey':
				echo data_Survey($_POST['base'],$_POST['num_survey']);	
				break;
			case 'sendConsult':
				echo send_Consult($_POST['base'],$_POST['num_notice']);	
				break;
			case 'submitParentsPres':
				echo sumbit_ParentsPres($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['question_6'],$_POST['question_7'],$_POST['question_8'],$_POST['question_9'],$_POST['question_10'],$_POST['question_11'],$_POST['question_12'],$_POST['question_13'],$_POST['question_14'],$_POST['question_15'],$_POST['reason_question_7'],$_POST['reason_question_8'],$_POST['reason_question_9'],$_POST['reason_question_10'],$_POST['reason_question_11'],$_POST['reason_question_13'],$_POST['observation'],$_POST['infoSend']);	
				break;
			case 'submitParentsPresCorta':
				echo sumbit_ParentsPres_Corta($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['question_6'],$_POST['question_7'],$_POST['question_8'],$_POST['question_9'],$_POST['question_10'],$_POST['question_11'],$_POST['question_12'],$_POST['question_13'],$_POST['question_14'],$_POST['question_15'],$_POST['reason_question_7'],$_POST['reason_question_8'],$_POST['reason_question_9'],$_POST['reason_question_10'],$_POST['reason_question_11'],$_POST['reason_question_13']);
				break;
			case 'submitParents':
				echo sumbit_Parents($_POST['base'],$_POST['periodo'],$_POST['num_survey'],$_POST['course'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['question_4'],$_POST['question_5'],$_POST['question_6'],$_POST['question_7'],$_POST['question_8'],$_POST['question_9'],$_POST['question_10'],$_POST['question_14'],$_POST['question_15'],$_POST['question_16'],$_POST['reason_question_1'],$_POST['reason_question_2'],$_POST['reason_question_3'],$_POST['reason_question_4'],$_POST['reason_question_5'],$_POST['reason_question_7'],$_POST['reason_question_8'],$_POST['reason_question_10'],$_POST['observation'],$_POST['infoSend']);	
				break;
			case 'submitFamilyWorkshop':
				echo submit_FamilyWorkshop($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['question_4'],$_POST['question_5'],$_POST['question_6'],$_POST['question_7'],$_POST['question_8'],$_POST['question_9'],$_POST['reason_question_6'],$_POST['reason_question_7'],$_POST['observation']);	
				break;
			case 'submitFamilyPsychology':
				echo submit_FamilyPsychology($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['question_1'],$_POST['question_2'],$_POST['question_7'],$_POST['reason_question_1'],$_POST['reason_question_2'],$_POST['reason_question_7'],$_POST['observation']);	
				break;
			case 'submitFamilyAdmissions':
				echo submit_FamilyAdmissions($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['question_4'],$_POST['question_5'],$_POST['question_6'],$_POST['question_7'],$_POST['question_8'],$_POST['question_9'],$_POST['question_10'],$_POST['question_11'],$_POST['question_12'],$_POST['reason_question_1'],$_POST['reason_question_2'],$_POST['reason_question_3'],$_POST['reason_question_4'],$_POST['reason_question_5'],$_POST['reason_question_6'],$_POST['reason_question_8'],$_POST['reason_question_9'],$_POST['reason_question_10'],$_POST['observation'],$_POST['questions'],$_POST['reason_questions']);	
				break;
			case 'submitProcessEnroll':
				echo submit_ProcessEnroll($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['question_4'],$_POST['question_5'],$_POST['reason_question_1'],$_POST['reason_question_2'],$_POST['reason_question_3'],$_POST['reason_question_4'],$_POST['reason_question_5'],$_POST['observation']);	
				break;
			case 'submitTransport':
				echo submit_Transport($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['question_1'],$_POST['reason_question_1'],$_POST['question_2'],$_POST['reason_question_2'],$_POST['question_3'],$_POST['reason_question_3'],$_POST['question_4'],$_POST['reason_question_4'],$_POST['question_5'],$_POST['reason_question_5'],$_POST['question_6'],$_POST['reason_question_6'],$_POST['question_7'],$_POST['reason_question_7'],$_POST['question_8'],$_POST['reason_question_8'],$_POST['question_9'],$_POST['reason_question_9'],$_POST['question_10'],$_POST['reason_question_10'],$_POST['question_11'],$_POST['reason_question_11'],$_POST['question_12'],$_POST['reason_question_12'],$_POST['question_13'],$_POST['reason_question_13']);
				break;
			case 'submitResources':
				echo submit_Resources($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['question_4'],$_POST['reason_question_3'],$_POST['observation']);	
				break;
			case 'submitPrimary_Concept':
				echo submitPrimary($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['subject_1'],$_POST['subject_2'],$_POST['subject_3'],$_POST['subject_4'],$_POST['subject_5'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['question_4'],$_POST['question_5'],$_POST['reason_question_1'],$_POST['reason_question_2'],$_POST['reason_question_3'],$_POST['reason_question_4'],$_POST['reason_question_5'],$_POST['observation']);	
				break;
			case 'submitConceptSurvey':
				//echo submit_concept_survey($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['subject_1'],$_POST['subject_2'],$_POST['subject_3'],$_POST['subject_4'],$_POST['subject_5'],$_POST['subject_6'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['question_4'],$_POST['question_5'],$_POST['question_6'],$_POST['reason_question_1'],$_POST['reason_question_2'],$_POST['reason_question_3'],$_POST['reason_question_4'],$_POST['reason_question_5'],$_POST['reason_question_6'],$_POST['observation']);	
				echo submit_concept_survey($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST,$_POST['observation']);	
				break;
			case 'getSubjectCourse':
				echo get_subject_course($_POST['base']);	
				break;
			case 'getTeachersCourse':
				echo get_teachers_course($_POST['base']);	
				break;
			case 'submit_conferenceSurvey':
				echo submitconference_Survey($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['question_4'],$_POST['reason_question_1'],$_POST['reason_question_2'],$_POST['reason_question_3']);	
				break;
			case 'submitBackToClass':
				echo submit_back_to_class($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['major_disease'],$_POST['how_long_major_disease'],$_POST['which_major_disease'],$_POST['current_disease'],$_POST['reason_current_disease'],$_POST['members_coexistence'],$_POST['relationship_members_coexistence'],$_POST['which_members_coexistence'],$_POST['elderly'],$_POST['reason_elderly'],$_POST['profesional_health'],$_POST['people_diagnosed'],$_POST['reason_people_diagnosed'],$_POST['neighborhood'],$_POST['location'],$_POST['send_class']);	
				break;
			case 'submitsurveyPsychologist':
				echo submitsurvey_Psychologist($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['reason_question_1'],$_POST['reason_question_2'],$_POST['reason_question_3'],$_POST['observation']);	
				break;
			case 'submitsurveyOcupational':
				echo submitsurvey_Ocupational($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['reason_question_1'],$_POST['reason_question_2'],$_POST['reason_question_3'],$_POST['observation']);	
				break;
			case 'submitsurveyShowtheTalent':
				echo submitsurvey_ShowtheTalent($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['reason_question_1'],$_POST['reason_question_2'],$_POST['reason_question_3'],$_POST['observation']);	
				break;
			case 'getPsychologyAttention':
				echo get_psychology_attention($_POST['base']);	
				break;
			case 'getPsychologyAttentionActualization':
				echo get_psychology_attention_Actualization($_POST['base']);	
				break;
			case 'submitAccordingload':
				echo submit_Accordingload($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['infoSend']);	
				break;
			case 'SubmitSatisfactionparents':
				echo Submit_Satisfactionparents($_POST['base'],$_POST['num_survey'],$_POST['course'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['question_4'],$_POST['question_5'],$_POST['question_6'],$_POST['question_7'],$_POST['question_8'],$_POST['question_9'],$_POST['question_10'],$_POST['reason_question_1'],$_POST['reason_question_2'],$_POST['reason_question_3'],$_POST['reason_question_4'],$_POST['reason_question_5'],$_POST['reason_question_6'],$_POST['reason_question_7'],$_POST['reason_question_8'],$_POST['reason_question_9'],$_POST['reason_question_10'],$_POST['observation']);	
				break;
			case 'sendSurveySymptom':
				echo send_Survey_Symptom($_POST['base'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['question_4'],$_POST['question_5'],$_POST['question_6'],$_POST['question_7'],$_POST['question_8'],$_POST['question_9'],$_POST['question_10'],$_POST['question_11'],$_POST['question_12'],$_POST['question_13'],$_POST['question_14'],$_POST['question_15'],$_POST['question_16'],$_POST['question_17'],$_POST['question_18']);	
				break;
			case 'sendSurveyConsumer':
				echo send_Survey_Consumer($_POST['base'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['question_4'],$_POST['question_5'],$_POST['question_6'],$_POST['question_7'],$_POST['question_8'],$_POST['question_9']);	
				break;
			case 'submitRegulationNoTransport':
				echo submit_regulation_no_transport($_POST["base"],$_POST["num_survey"],$_POST["authPersonal"],$_POST["typeTransport"],$_POST["authName"],$_POST["authDoc"],$_POST["authMobile"],$_POST["authName_1"],$_POST["authDoc_1"],$_POST["authMobile_1"],$_POST["authName_2"],$_POST["authDoc_2"],$_POST["authMobile_2"]);
				break;
			case 'submitSatisfactionClassVirtual':
					echo submit_Satisfaction_ClassVirtual($_POST['base'],$_POST['num_survey'],$_POST['question_1'],$_POST['question_2'],$_POST['question_3'],$_POST['question_4'],$_POST['question_5'],$_POST['question_6'],$_POST['reason_question_1'],$_POST['reason_question_2'],$_POST['reason_question_3'],$_POST['reason_question_4'],$_POST['reason_question_5'],$_POST['reason_question_6']);	
				break;
			default:
				echo "<h1 class='animated bounce'>not param given</h1>";
				break;
		}
			
	}
	else{
		echo json_encode(array("response"=>array("code"=>400,"error"=>"no ha iniciado sesión o caduco","modules"=>array())));
	}

?>