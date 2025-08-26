<?php
	/**
	 * Created by PhpStorm.
	 * User: Felipe Garcia
	 * Date: 19/06/2018
	 * Time: 08:00 AM
	 *
	 * this module has all function to get OP actions
	 */

	header('Content-Type: text/html; charset=UTF-8');
	$root = realpath($_SERVER["DOCUMENT_ROOT"]);


	function response($result){
	    /**
	     * this function return an array with status code and response of action
	     *
	     * params:
	     * $result: array returned by database actions
	     * $client: object that contain all information of request response
	     */
	    if (!isset($result)){
	        return array('code'=>500, 'response' => "error request");
	    } else if (empty(array_values($result))) {
	        return array('code'=>400, 'response' => "response empty");
	    } else {
	        return array('code'=>200,'response' => $result);
	    }
	}

	function cmp($a, $b)
	{
        if(isset($a["NOMBRE"]) && isset($b["NOMBRE"])){
            return strcmp($a["NOMBRE"], $b["NOMBRE"]);
        }
	}



	function getAccess($base){
		try {
			global $modules;
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $procedure = "CALL getUserAccess($id)"; 
	        $query = mysql_query($procedure,$link);
         
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	if(isset($modules[$data['module']])){
	             		array_push($result,$data['module']);
	             	}
	            }
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}
	
	function getNotices($base,$surveys){
		try {
			$link = conectar_db($base);
			$text = ($surveys == "false")?"Autorización":"Contestada";
	        $id = $_SESSION["id"];
	        $filter = ($surveys == "false")?"AND dc.tipo != 5":"AND dc.tipo = 5";
	        $statement = "SELECT dc.numero as NUM,dc.tipo as TYPE,dc.asunto AS SUBJECT, concat(dc.dia_envio,'/',dc.mes_envio,'/',dc.ano_envio) AS DATE_SEND, concat(dc.dia_cierre,'/',dc.mes_cierre,'/',dc.ano_cierre) AS DATE_CLOSE, d_ec.estado_consu as STATE, d_ec.primera_fecha_consu AS FIRST_DATE, d_ec.ultima_fecha_consu AS LAST_DATE, d_ec.autorizacion as AUTH, IFNULL(bd.id,0) as DATA_REST
	        		  FROM datos_circular as dc
	        		  LEFT JOIN datos_envio_cir as d_ec on d_ec.num_circular = dc.numero LEFT JOIN bd_extendidas as bd ON (dc.numero = bd.circular AND d_ec.id = bd.id)
	        		  WHERE d_ec.id = $id $filter AND d_ec.estado_envio = 1
	        		  ORDER BY NUM DESC";
	      	$query = mysql_query($statement,$link);
	      	if (mysql_num_rows($query) > 0) {
	        	$result =array("keys"=>array("Circular","Asunto","Envío","Estado","Última consulta",$text));
		       	while($data = mysql_fetch_assoc($query)){
		       		$first_date = split(" ",$data["FIRST_DATE"]);
		       		$last_date = split(" ",$data["LAST_DATE"]);
		       		array_push($result, array("circular"=>$data["NUM"],"DATA_VAL"=>$data["NUM"],"subject"=>$data["SUBJECT"],"date_send"=>$data["DATE_SEND"],"date_close"=>$data["DATE_CLOSE"],"state"=>$data["STATE"],"first_date"=>$first_date[0],"last_date"=>$last_date[0],"type"=>$data["TYPE"],"auth"=>$data["AUTH"]));
		       	}
	      	}
	      	
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}	
	}

	function getNoticeContent($base, $notice){
		try {
			$link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $notice = base64_decode($notice);
	        $notice = "SELECT dc.numero as NUM,dc.asunto AS SUBJECT, dc.cuerpo AS BODY, dc.desprendible AS FOOTER, dc.dat_sta AS DATE_START, dc.dat_end AS DATE_END, cp.c2 AS CODE_JV, dc.tipo as TYPE_NOT, dc.data_info as DATA_INFO, CURDATE() AS CUR_DATE
	        		  FROM datos_circular as dc LEFT JOIN codigosphp as cp ON dc.numero = cp.numero
	        		  WHERE dc.numero = $notice";

	      	$query = mysql_query($notice,$link);
	      	$result = mysql_fetch_assoc($query);
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}	
	}

	function get_Uinfo($base){
		try {
			$link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        //$id = 2016054;
	        $query_ = "SELECT us.id as codigo, concat(us.apellidos,' ',us.nombres) as NOMBRE, us.id_perfil as ID_P, us.id_tipo_usuario as ID_TU, p.descripcion as PERFIL, tu.descripcion as TIPO_USUARIO, concat(gr.descripcion,' ',cr.descripcion) as CURSO
	        			FROM usuarios as us
	        			LEFT JOIN grados as gr on gr.id_grado = us.id_grado
	        			LEFT JOIN cursos as cr on cr.id = us.curso
	        			LEFT JOIN perfil as p on p.id_perfil = us.id_perfil
	        			LEFT JOIN tipo_usuario as tu on tu.id_tipo_usuario = us.id_tipo_usuario
	        			WHERE us.id_estado = 1
	        			AND us.id = $id";

	        $query = mysql_query($query_,$link);
			$data = mysql_fetch_assoc($query);
			if (($data['ID_P'] == 2 && $data['ID_TU'] == 1) || ($data['ID_P'] == 3 && $data['ID_TU'] == 2)){
        		array_push($result,array("CODIGO" =>$data['codigo'], "NOMBRE"=>$data['NOMBRE'],"PERFIL"=>$data['PERFIL'],"TIPO_USUARIO"=>$data['TIPO_USUARIO'],"CURSO"=>$data['CURSO']));
			}
			else{
        		array_push($result,array("NOMBRE"=>$data['NOMBRE'],"PERFIL"=>$data['PERFIL'],"TIPO_USUARIO"=>$data['TIPO_USUARIO']));
			}

	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function sendInfoNotice($base,$data,$num_notice){
		try {
			$link = conectar_db($base);
			mysql_set_charset('utf8',$link);
	        $result =array();
	        $id = $_SESSION["id"];
	        if ($data != "") {
	        	$data_form = str_replace("%20", " ", $data);
	        	//print_r($data_form);
	        	$fields = split("&", $data_form);
	        	foreach ($fields as $key => $value) {
	        		$item = split("=", $value);
		        	if ($item[0] == "autorizacion") {
		        		$val_auth = $item = $item[1];
		        		$date_auth = date("d/m/Y H:i:s");
		        		$queryAuth_ = "UPDATE datos_envio_cir SET autorizacion = IF((SELECT D.tipo FROM datos_circular as D WHERE D.numero = $num_notice) = 1,'$val_auth',''), fecha_autoriza = IF((SELECT D.tipo FROM datos_circular as D WHERE D.numero = $num_notice) = 1,'$date_auth','') WHERE id = $id AND num_circular = '$num_notice'";
		        		$queryAuth = mysql_query($queryAuth_,$link);
		        		unset($fields[$key]);
		        	}
	        	}
	        	$num_fields = sizeof($fields);
	        	//print_r($num_fields);
	        	if ($num_fields > 0) {
			        $queryEntry_ = "INSERT INTO bd_extendidas (id, circular) VALUES ($id, $num_notice)";
			        $queryEntry = mysql_query($queryEntry_,$link);
			        $queryUpdt_ = "UPDATE bd_extendidas SET ";
			        $counter = 1;
			        foreach ($fields as $key => $value) {
			        	$item = split("=", $value);
			        	$queryUpdt_ = ($item[1] != "")?$queryUpdt_.$item[0]." = '".utf8_decode($item[1])."'":$queryUpdt_;
			        	$queryUpdt_ = ($item[1] != "")?(($counter == $num_fields)?$queryUpdt_." ":$queryUpdt_.", "):$queryUpdt_;
			        	$counter++;
			        }
			        if (substr($queryUpdt_, -2) == ", ") {
			        	$queryUpdt_ = substr($queryUpdt_, 0, -2)." ";
			        	// print_r($queryUpdt_);
			        }
			        $queryUpdt_ = $queryUpdt_."WHERE id = $id AND circular = $num_notice";
			        $query = mysql_query($queryUpdt_,$link);
					if (mysql_affected_rows() > 0){
		        		array_push($result,true);
					}
					else{
		        		array_push($result,false);
					}
	        	}
	        }
			else{
        		array_push($result,false);
			}
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function followAcademic($id,$periodo,$link){
		$array = array();
		$cadenaSeg=" presenta dificultades en la(s) siguiente(s) asignatura(s): ";
		$nAsig=0;
		$consultaseguimientos = mysql_query("SELECT DISTINCT x_historial.id_asignatura, asignaturas.asignatura, estudiante.curso
				FROM asignaturas JOIN x_historial ON asignaturas.id_asignatura = x_historial.id_asignatura JOIN estudiante ON x_historial.id_estudiante = estudiante.id
				WHERE x_historial.id_estudiante='$id' AND x_historial.periodo='$periodo'  AND x_historial.tipo_x='sa'  
				ORDER BY asignaturas.asignatura",$link);
		while($resultado_seguimientos=mysql_fetch_assoc($consultaseguimientos)){
			$nAsig++;
			$curso = $resultado_seguimientos["curso"];
			if($nAsig==mysql_num_rows($consultaseguimientos)){
				$cadenaSeg.=$resultado_seguimientos['asignatura'].".";
				$cadenaSeg1.=$resultado_seguimientos['asignatura'].".";

			}
				
			else{
				$cadenaSeg.=$resultado_seguimientos['asignatura'].", ";
				$cadenaSeg1.=$resultado_seguimientos['asignatura'].",";

			}
				

			if( intval($curso) > 100 &&  intval($curso) < 200 ){
				$cadenaSeg=" debe reforzar en la(s) siguiente(s) asignatura(s): ";
				$cadenaSeg.=$cadenaSeg1."";
			}

		}

		if (intval($curso) > 100 &&  intval($curso) < 300 ){
			if($nAsig==1){
				$cadParra="Les informamos que el colegio le está brindando una ayuda especial para que pueda superar sus dificultades. En caso de querer ampliar la información puede solicitarlo por el módulo de comunicación de la comunidad virtual para dialogar telefónicamente con el docente o solicitar una cita presencial.";
			}else{
				$cadParra="Les informamos que el colegio le está brindando una ayuda especial para que pueda superar sus dificultades. Con el propósito de ampliar la información y acordar estrategias de apoyo casa-colegio, la directora de curso les estará enviando una citación, teniendo en cuenta su horario de atención a padres.";
			}

		}else{
			if($nAsig==1 || $nAsig==2){
				$cadParra="Les informamos que el colegio le está brindando una ayuda especial para que pueda superar sus dificultades, sin embargo les  recomendamos asignarle con carácter urgente un horario de estudio diario en casa supervisado por ustedes. Si tienen inquietudes al respecto, les pedimos el favor de acordar una cita con  el profesor de la asignatura correspondiente, teniendo en cuenta su horario de atención a padres. ";
			}else{
				$cadParra="Les informamos que el colegio le está brindando una ayuda especial para que pueda superar sus dificultades, sin embargo les  recomendamos asignarle con carácter urgente un horario de estudio diario en casa supervisado por ustedes. El director de curso les estará enviando una citación, teniendo en cuenta su horario de atención a padre; cuando se requiera. Se realizará atención conjunta con la Coordinadora de Sección."; 	
		
			}
		}



		/*if($nAsig>=3){

			$cadParra="Con el propósito de acordar estrategias de apoyo, les informamos que serán citados al colegio por el/la Director(a) de curso. Dado el carácter urgente de esta citación, esperamos sin falta su asistencia. Solicitamos su colaboración para que su hijo(a) supere las dificultades.";
		}
		else if( intval($curso) > 100 &&  intval($curso) < 200 ){

			$cadParra="Les informamos que el colegio le está brindando una ayuda especial para que pueda superar sus dificultades. En caso de querer ampliar la información puede solicitarlo por le módulo de comunicaciones de la comunidad virtual para dialogar telefónicamente con el docente o solicitar una cita presencial";
			
			
			Con el propósito de ampliar la información y acordar estrategias de apoyo casa-colegio, la directora de curso les estará enviando una citación, teniendo en cuenta su horario de atención a padres.";
		}
		else{

			$cadParra="Les informamos que el colegio le está brindando una ayuda especial para que pueda superar sus dificultades, sin embargo les recomendamos asignarle con carácter urgente un horario de estudio diario en casa supervisado por ustedes. Si tienen inquietudes al respecto, les pedimos el favor de acordar una cita con  el profesor de la asignatura correspondiente, teniendo en cuenta su horario de atención a padres. ";
		}*/
		$array["cadenaSeg"] = $cadenaSeg;
		$array["cadParra"] = $cadParra;
		$array["curso"] = $curso;
		return $array;
	}


	function submitTransport($base_,$num_survey,$course,$question_1,$reason_question_1,$question_2,$reason_question_2,$question_3,$reason_question_3,$question_4,$reason_question_4,$question_5,$reason_question_5,$question_6,$reason_question_6,$question_7,$reason_question_7,$question_8,$reason_question_8,$question_9,$reason_question_9,$question_10,$reason_question_10,$question_11,$reason_question_11,$question_12,$reason_question_12,$question_13,$reason_question_13){
		try {
			$link = conectar_db($base_);
	        $result =array();
	        $id = $_SESSION["id"];
	        $date = date("d/m/Y H:i:s");
	        $query_ = "INSERT INTO `transporte` 
			(`id`, `p1`, `razon1`, `p2`, `razon2`, `p3`, `razon3`, `p4`, `razon4`, `p5`, `razon5`, `p6`, `razon6`, `p7`, `razon7`, `p8`, `razon8`, `p9`, `razon9`, `p10`, `razon10`, `p11`, `razon11`, `p12`, `razon12`, `p13`, `razon13`, `fecha`, `fechacreacion`) 
			VALUES 
			('$id', '$question_1', '$reason_question_1', '$question_2', '$reason_question_2', '$question_3', '$reason_question_3', '$question_4', '$reason_question_4', '$question_5', '$reason_question_5', '$question_6', '$reason_question_6', '$question_7', '$reason_question_7', '$question_8', '$reason_question_8', '$question_9', '$reason_question_9', '$question_10', '$reason_question_10', '$question_11', '$reason_question_11', '$question_12', '$reason_question_12', '$question_13', '$reason_question_13', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()) 
			ON DUPLICATE KEY UPDATE 
			`p1` = VALUES(`p1`),
			`razon1` = VALUES(`razon1`),
			`p2` = VALUES(`p2`),
			`razon2` = VALUES(`razon2`),
			`p3` = VALUES(`p3`),
			`razon3` = VALUES(`razon3`),
			`p4` = VALUES(`p4`),
			`razon4` = VALUES(`razon4`),
			`p5` = VALUES(`p5`),
			`razon5` = VALUES(`razon5`),
			`p6` = VALUES(`p6`),
			`razon6` = VALUES(`razon6`),
			`p7` = VALUES(`p7`),
			`razon7` = VALUES(`razon7`),
			`p8` = VALUES(`p8`),
			`razon8` = VALUES(`razon8`),
			`p9` = VALUES(`p9`),
			`razon9` = VALUES(`razon9`),
			`p10` = VALUES(`p10`),
			`razon10` = VALUES(`razon10`),
			`p11` = VALUES(`p11`),
			`razon11` = VALUES(`razon11`),
			`p12` = VALUES(`p12`),
			`razon12` = VALUES(`razon12`),
			`p13` = VALUES(`p13`),
			`razon13` = VALUES(`razon13`),
			`fecha` = CURRENT_TIMESTAMP()";

	        // print_r($query_);
	        $query = mysql_query($query_,$link);
	        $queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";
	        //print_r($queryUpd_);
	        $queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function postFollow($id,$periodo,$link){
		$array = array();
		$mysql= "SELECT E.nombre, E.apellido, E.curso, E.id, A.asignatura, A.id_asignatura,D.id_frase,D.curso 
		FROM avance_segui AS D JOIN estudiante AS E ON E.id=D.id_estudiante JOIN asignaturas AS A ON A.id_asignatura=D.id_asignatura
		WHERE D.id_estudiante='$id' AND D.periodo='$periodo'
		GROUP BY A.id_asignatura
		ORDER BY D.curso, E.apellido, A.id_asignatura ";
		$tabla = "<table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"1\"><tr><td colspan=\"2\" bgcolor=\"#0f5b7d\"><div align=\"center\" style=\"font-size:14px\"><b></b></div><div align=\"center\" style=\"font-size: 14px; color: #FFF;\"> NOMBRE<b></b></div></td>
		        <td width=\"160\" bgcolor=\"#0f5b7d\"><div align=\"center\" style=\"font-size: 14px; color: #FFF;\" ><b>ASIGNATURA</b></div></td>
		        <td bgcolor=\"#0f5b7d\"><div align=\"center\" style=\"font-size: 14px; color: #FFF;\"><b></b>OBSERVACIÓN</div></td>
		        <td bgcolor=\"#0f5b7d\"><div align=\"center\" style=\"font-size: 14px; color: #FFF;\"><b></b></div></td>
		        <td bgcolor=\"#0f5b7d\"><div align=\"center\" style=\"font-size: 14px; color: #FFF;\"><b></b></div></td>
		        <td bgcolor=\"#0f5b7d\"></thead></td>";
        $query=mysql_query($mysql,$link);
        $contarmysql=mysql_num_rows($query)+1;
        $consulta=mysql_fetch_array($query);
        $nombrecompleto = $consulta["nombre"]." ".$consulta["apellido"];
        $curso = $consulta["curso"];
        $tabla = $tabla."</tr><tr><td rowspan=\"$contarmysql\">$nombrecompleto</td><td rowspan=\"$contarmysql\">$curso</td></tr>";
	    $id_estudiante=$consulta['id'];
	    if(mysql_num_rows($query) > 0)
	    	mysql_data_seek($query, 0);
	    while ($consulta=mysql_fetch_array($query)){
		    $id_asignatura =  $consulta['id_asignatura'];   
		    $mysql2="SELECT  F.descripcion 
				    FROM `avance_segui` AS D JOIN `frases_seg_seg` AS F ON F.id_frase=D.id_frase
				    WHERE D.id_estudiante= '$id' AND D.periodo='$periodo' AND D.id_asignatura=' $id_asignatura'
				    GROUP BY D.id_frase";
		    $query2=mysql_query($mysql2,$link);
		    $contar=mysql_num_rows($query2);
		    $tabla = $tabla."<tr><td>".$consulta['asignatura']."</td>";
	        while ($consulta_asig=mysql_fetch_array($query2)){
	        	$tabla = $tabla."<td>".$consulta_asig['descripcion']."</td>";
	        }
	        for ($i=0;$i<=(3-$contar);$i++){//termina de imprimir los td que hacen falta para completar la tabla
	        	$tabla = $tabla."<td></td>";
	        }
	        $tabla = $tabla."</tr>";
	    }
	    $tabla = $tabla."</table>";
	    $array["tabla"] = $tabla;
	    return $array;
	}

	function classSportArts($id,$semester,$link){
		global $db;
		$array = array();
		$bd_caa = "cvuser_".$db["caa"];
		$estudioartes = mysql_query( "SELECT E.asignatura, CONCAT(U.apellidos, ' ',U.nombres) as profesor, E.hora, E.aula FROM estudiodirigidoartes as E LEFT JOIN $bd_caa.usuarios as U ON E.profesor = U.id WHERE E.id = '$id' AND E.semestre='$semester'",$link);
		$resultado_estudioartes=mysql_fetch_assoc($estudioartes);
		$array["asignatura"] = ($resultado_estudioartes['asignatura'] == null)?"":$resultado_estudioartes['asignatura'];
		$array["aula"] = ($resultado_estudioartes['aula'] == null)?"":$resultado_estudioartes['aula'];
		$array["hora"] = ($resultado_estudioartes['hora'] == null)?"":$resultado_estudioartes['hora'];
		$array["profesor"] = ($resultado_estudioartes['profesor'] == null)?"":$resultado_estudioartes['profesor'];
		$estudiodeportes = mysql_query( "SELECT E.asignatura2, CONCAT(U.apellidos, ' ',U.nombres) as profesor2, E.hora2, E.aula2 FROM estudiodirigidodeportes as E LEFT JOIN $bd_caa.usuarios as U ON E.profesor2 = U.id WHERE E.id = '$id' AND E.semestre='$semester'",$link);
		$resultado_estudiodeportes=mysql_fetch_assoc($estudiodeportes);
		$array["asignatura2"] = ($resultado_estudiodeportes['asignatura2'] == null)?"":$resultado_estudiodeportes['asignatura2'];
		$array["aula2"] = ($resultado_estudiodeportes['aula2'] == null)?"":$resultado_estudiodeportes['aula2'];
		$array["hora2"] = ($resultado_estudiodeportes['hora2'] == null)?"":$resultado_estudiodeportes['hora2'];
		$array["profesor2"] = ($resultado_estudiodeportes['profesor2'] == null)?"":$resultado_estudiodeportes['profesor2'];
		return $array;
	}

	function interviewCitation($id,$link){
		$array = array();
		$inicioTabla = "<table align=\"center\" cellspacing=\"0\" cellpadding=\"0\" border=\"1\">
		    <tbody>
		        <tr>
		            <td width=\"160\" valign=\"top\">
		            <p align=\"center\"><strong>NOMBRES Y APELLIDOS </strong></p>
		            </td>
		            <td width=\"76\" valign=\"top\">
		            <p align=\"center\"><strong>GRADO</strong></p>
		            </td>
		            <td width=\"115\" valign=\"top\">
		            <p align=\"center\"><strong>FECHA </strong></p>
		            </td>
		            <td width=\"89\" valign=\"top\">
		            <p align=\"center\"><strong>TURNO</strong></p>
		            </td>
		        </tr>";
		$contenidoTabla = "";
		$finTabla = "</tbody></table>";
		$sqlRecomendados = "SELECT * FROM recomendados WHERE id = '$id'";
		$queryRecomendados = mysql_query($sqlRecomendados, $link);
		while($run = mysql_fetch_array($queryRecomendados)){
			$nombreRecomendado = strtoupper($run['p1']);
			$gradoRecomendado = strtoupper($run['p2']);
			$fechaParentesco = strtoupper($run['fecha']);
			$turnoParentesco = strtoupper($run['turno']);
			$contenidoTabla .= " <tr>
				<td width=\"160\" valign=\"top\">
					<p align=\"center\">$nombreRecomendado</p>
				</td>
				<td width=\"76\" valign=\"top\">
					<p align=\"center\">$gradoRecomendado</p>
				</td>
				<td width=\"115\" valign=\"top\">
					<p align=\"center\">$fechaParentesco</p>
				</td>
				<td width=\"89\" valign=\"top\">
					<p align=\"center\">$turnoParentesco</p>
					</td>
			</tr>
			";
		}
		$tablaRecomendado = $inicioTabla.$contenidoTabla.$finTabla;
		$array["tablaRecomendado"] = $tablaRecomendado;
	}

	function infoAdditional($num_circular,$link){
		$query_ = "SELECT F.id as Bim, F.inicio as Inicio, (SELECT data_info FROM datos_circular WHERE numero = '$num_circular') as Data_Info FROM fechas_bimetrales F
					WHERE (SELECT CONCAT(D.ano_envio,'-',D.mes_envio,'-',D.dia_envio) as Fecha FROM datos_circular as D WHERE D.numero = '$num_circular') BETWEEN F.inicio AND F.fin  ORDER BY `Bim` DESC";
		$query = mysql_query($query_,$link);
		//print_r($query_);
		$rest = mysql_fetch_assoc($query);
		$bimester = $rest["Bim"];
		$date_start = $rest["Inicio"];
		$dataInfo = $rest["Data_Info"];
		if ($date_start <= date("Y")."07-01") {
			$semester = 1;
		}
		else if ($date_start >= date("Y")."07-01") {
			$semester = 2;
		}
		return array($bimester,$semester,$dataInfo);
	}

	function directedStudyAdvance($id,$periodo,$link){
		global $db;
		$array = array();
		$periodo_ = $periodo.$periodo.$periodo;
		$bd_caa = "cvuser_".$db["caa"];
		$query_ = "SELECT E.asignatura as materia, E.aula as aula, M.estado as estado
				FROM estudiodirigido as E LEFT JOIN $bd_caa.mat_serviciosEstu as M ON E.id = M.id AND M.id_tipo_servicio = 3  
				WHERE E.id = '$id' AND E.periodo = '1'";
		$query = mysql_query($query_,$link);
		if (mysql_num_rows($query) > 0) {
			$rest = mysql_fetch_assoc($query);
			$materia = $rest["materia"];
			$aula = $rest["aula"];
			$estado = $rest["estado"];
			$array["materia"] = $materia;
			$array["aula"] = $aula;
			if ($estado == 0) {
				$query_data_ = "SELECT U.id as Codigo, CONCAT(U.apellidos, ' ',U.nombres) as Nombres, P.authPersonal as Autoriza_Salir_Solo, P.transport as Transporte, authName as Persona_1, authDoc as Documento_1, authMobile as Celular_1
					FROM $bd_caa.usuarios as U INNER JOIN $bd_caa.peatonal_estudiante as P ON U.id = P.id_student 
					WHERE U.id = '$id'";
				$query_data = mysql_query($query_data_,$link);
				$data = mysql_fetch_assoc($query_data);
				$codigo = $data["Codigo"];
				$nombres = $data["Nombres"];
				$transporte = $data["Transporte"];
				$autoriza_solo = $data["Autoriza_Salir_Solo"];
				$persona_1 = $data["Persona_1"];
				$documento_1 = $data["Documento_1"];
				$celular_1 = $data["Celular_1"];
				$info_adicional = "<table align='center'  border='1'><thead><tr><th>AUTORIZADO PARA SALIR SOLO</th><th>TRANSPORTE</th><th>PERSONA AUTORIZADA</th><th>DOCUMENTO</th><th>CELULAR</th></tr></thead><tbody><tr><td>$autoriza_solo</td><td>$transporte</td><td>$persona_1</td><td>$documento_1</td><td>$celular_1</td></tr></tbody></table>";
				$array["info_adicional"] = $info_adicional;
			}
			else if ($estado == 1) {
				$query_data_ = "SELECT U.id as Codigo, CONCAT(U.apellidos, ' ',U.nombres) as Nombres, E.num_route as Ruta_Extra, E.recorrido as Recorrido, E.mobile as Celular_Monitora, P.paradero as Paradero, R.authPersonal as Autoriza_Recoger, authName as Persona_1, authDoc as Documento_1, authMobile as Celular_1, CONCAT(M.apellidos, ' ',M.nombres) as Monitor
					FROM $bd_caa.usuarios as U INNER JOIN $bd_caa.rutas_estudiante as R ON U.id = R.id_student INNER JOIN $bd_caa.rutas_extra as E ON R.route_extra = E.id_route INNER JOIN $bd_caa.paraderos_extra as P ON R.bus_stop = P.id_paradero LEFT JOIN $bd_caa.usuarios as M ON E.id_monitor = M.id 
					WHERE U.id = '$id'";
				$query_data = mysql_query($query_data_,$link);
				$data = mysql_fetch_assoc($query_data);
				$codigo = $data["Codigo"];
				$nombres = $data["Nombres"];
				$ruta_extra = $data["Ruta_Extra"];
				$recorrido = $data["Recorrido"];
				$paradero = $data["Paradero"];
				$celular_monitora = $data["Celular_Monitora"];
				$autoriza_recoger = $data["Autoriza_Recoger"];
				$persona_1 = $data["Persona_1"];
				$documento_1 = $data["Documento_1"];
				$celular_1 = $data["Celular_1"];
				$monitor = $data["Monitor"];
				$info_adicional = "<table align='center'  border='1'><thead><tr><th>RUTA EXTRAESCOLAR</th><th>RECORRIDO</th><th>MONITORA</th><th>CELULAR</th><th>PARADERO</th><th>PERSONA AUTORIZADA</th><th>DOCUMENTO</th><th>CELULAR</th></tr></thead><tbody><tr><td>$ruta_extra</td><td>$recorrido</td><td>$monitor</td><td>$celular_monitora</td><td>$paradero</td><td>$persona_1</td><td>$documento_1</td><td>$celular_1</td></tr></tbody></table>";
				$array["info_adicional"] = $info_adicional;
			}
		}
		return $array;
	}


	// CAMBIO DE ESTUDIO DIRIGIDO
	function directedStudy($id,$periodo,$link,$num_circular){
		global $db;
		$array = array();
		$bd_caa = "cvuser_" . $db["caa"];
		$query_data = "SELECT c1 FROM codigosphp WHERE numero = $num_circular";
		$res_data = mysql_query($query_data, $link);
		$row = mysql_fetch_assoc($res_data);
		$data = $row['c1'];
		
		// Inicializa periodos
		$periodo1 = null;
		$periodo2 = null;
		
		if (!empty($data)) {
			$partes = explode(',', $data);
			$periodo1 = isset($partes[0]) ? (int) trim($partes[0]) : null;
			$periodo2 = isset($partes[1]) ? (int) trim($partes[1]) : null;
		}
		
		$query_ = "SELECT
			E.id, 
			MAX(CASE WHEN E.periodo = $periodo1 THEN E.asignatura ELSE NULL END) AS materia,
			MAX(CASE WHEN E.periodo = $periodo1 THEN E.aula ELSE NULL END) AS aula,
			MAX(CASE WHEN E.periodo = $periodo1 THEN M.estado ELSE NULL END) AS estado,
			MAX(CASE WHEN E.periodo = $periodo2 THEN E.asignatura ELSE NULL END) AS materia2,
			MAX(CASE WHEN E.periodo = $periodo2 THEN E.aula ELSE NULL END) AS aula2,
			MAX(CASE WHEN E.periodo = $periodo2 THEN M.estado ELSE NULL END) AS estado_p4
		FROM
			estudiodirigido as E
		LEFT JOIN
				cvuser_caa2025.mat_serviciosEstu as M ON E.id = M.id AND M.id_tipo_servicio = 3
		WHERE
			E.id = '$id'
			AND E.periodo in ($periodo1,$periodo2) GROUP BY
			E.id";
		$query = mysql_query($query_,$link);
		if (mysql_num_rows($query) > 0) {
			$rest = mysql_fetch_assoc($query);
			$materia = ($rest["materia"] === null) ? '' : $rest["materia"];
			$materia2 = ($rest["materia2"] === null) ? '' : $rest["materia2"];
			$aula = $rest["aula"];
			$aula2 = $rest["aula2"];
			$estado = $rest["estado"];
			$array["materia"] = $materia;
			$array["aula"] = $aula;
			$array["materia2"] = $materia2;
			if ($estado == 0) {
				$query_data_ = "SELECT U.id as Codigo, CONCAT(U.apellidos, ' ',U.nombres) as Nombres, P.authPersonal as Autoriza_Salir_Solo, P.transport as Transporte, authName as Persona_1, authDoc as Documento_1, authMobile as Celular_1
					FROM $bd_caa.usuarios as U INNER JOIN $bd_caa.peatonal_estudiante as P ON U.id = P.id_student 
					WHERE U.id = '$id'";
				$query_data = mysql_query($query_data_,$link);
				$data = mysql_fetch_assoc($query_data);
				$codigo = $data["Codigo"];
				$nombres = $data["Nombres"];
				$transporte = $data["Transporte"];
				$autoriza_solo = $data["Autoriza_Salir_Solo"];
				$persona_1 = $data["Persona_1"];
				$documento_1 = $data["Documento_1"];
				$celular_1 = $data["Celular_1"];
				$info_adicional = "<table align='center'  border='1'><thead><tr><th>AUTORIZADO PARA SALIR SOLO</th><th>PERSONA AUTORIZADA</th><th>DOCUMENTO</th><th>CELULAR</th></tr></thead><tbody><tr><td>$autoriza_solo</td><td>$persona_1</td><td>$documento_1</td><td>$celular_1</td></tr></tbody></table>";
				$array["info_adicional"] = $info_adicional;
			}
			else if ($estado == 1) {
				$query_data_ = "SELECT U.id as Codigo, CONCAT(U.apellidos, ' ',U.nombres) as Nombres, E.num_route as Ruta_Extra, E.recorrido as Recorrido, E.mobile as Celular_Monitora, P.paradero as Paradero, R.authPersonal as Autoriza_Recoger, authName as Persona_1, authDoc as Documento_1, authMobile as Celular_1, CONCAT(M.apellidos, ' ',M.nombres) as Monitor
					FROM $bd_caa.usuarios as U INNER JOIN $bd_caa.rutas_estudiante as R ON U.id = R.id_student INNER JOIN $bd_caa.rutas_extra as E ON R.route_extra = E.id_route INNER JOIN $bd_caa.paraderos_extra as P ON R.bus_stop = P.id_paradero LEFT JOIN $bd_caa.usuarios as M ON E.id_monitor = M.id 
					WHERE U.id = '$id'";
				$query_data = mysql_query($query_data_,$link);
				$data = mysql_fetch_assoc($query_data);
				$codigo = $data["Codigo"];
				$nombres = $data["Nombres"];
				$ruta_extra = $data["Ruta_Extra"];
				$recorrido = $data["Recorrido"];
				$paradero = $data["Paradero"];
				$celular_monitora = $data["Celular_Monitora"];
				$autoriza_recoger = $data["Autoriza_Recoger"];
				$persona_1 = $data["Persona_1"];
				$documento_1 = $data["Documento_1"];
				$celular_1 = $data["Celular_1"];
				$monitor = $data["Monitor"];
				$info_adicional = "<table align='center'  border='1'><thead><tr><th>RUTA EXTRAESCOLAR</th><th>RECORRIDO</th><th>MONITORA</th><th>CELULAR</th><th>PARADERO</th><th>PERSONA AUTORIZADA</th><th>DOCUMENTO</th><th>CELULAR</th></tr></thead><tbody><tr><td>$ruta_extra</td><td>$recorrido</td><td>$monitor</td><td>$celular_monitora</td><td>$paradero</td><td>$persona_1</td><td>$documento_1</td><td>$celular_1</td></tr></tbody></table>";
				$array["info_adicional"] = $info_adicional;
			}
		}
		return $array;
	}




	function directedStudySeguimiento($id,$periodo,$link){
		global $db;
		$array = array();
		$bd_caa = "cvuser_".$db["caa"];
		$query_ = "SELECT E.asignatura as materia, E.aula as aula, E.asignatura_2 as materia2, E.aula_2 as aula2, M.estado as estado
				FROM estudiodirigido as E LEFT JOIN cvuser_caa2025.mat_serviciosEstu as M ON E.id = M.id AND M.id_tipo_servicio = 3  
				WHERE E.id = '$id' AND E.periodo = '2'";
		$query = mysql_query($query_,$link);
		if (mysql_num_rows($query) > 0) {
			$rest = mysql_fetch_assoc($query);
			$materia = $rest["materia"];
			$materia2 = $rest["materia2"];
			$aula = $rest["aula"];
			$aula2 = $rest["aula2"];
			$estado = $rest["estado"];
			$array["materia"] = $materia;
			$array["aula"] = $aula;
			$array["materia2"] = $materia2;
		}
		return $array;
	}


	function extraSchoolWednesday($id,$periodo,$link){
		global $db;
		$array = array();
		$bd_caa = "cvuser_".$db["caa"];
		$periodo = ($periodo == 1 )?"PRIMER SEMESTRE":"SEGUNDO SEMESTRE";
		$query_ = "SELECT E.materia, M.estado as estado 
				FROM acti_miercoles as E LEFT JOIN $bd_caa.mat_serviciosEstu as M ON E.id = M.id AND M.id_tipo_servicio = 3  
				WHERE E.id = '$id' AND E.periodo = '$periodo'";
		$query = mysql_query($query_,$link);
		if (mysql_num_rows($query) > 0) {
			$rest = mysql_fetch_assoc($query);
			$materia = $rest["materia"];
			$estado = $rest["estado"];
			$array["materia"] = $materia;
			if ($estado == 0) {
				$query_data_ = "SELECT U.id as Codigo, CONCAT(U.apellidos, ' ',U.nombres) as Nombres, P.authPersonal as Autoriza_Salir_Solo, P.transport as Transporte, authName as Persona_1, authDoc as Documento_1, authMobile as Celular_1
					FROM $bd_caa.usuarios as U INNER JOIN $bd_caa.peatonal_estudiante as P ON U.id = P.id_student 
					WHERE U.id = '$id'";
				$query_data = mysql_query($query_data_,$link);
				$data = mysql_fetch_assoc($query_data);
				$codigo = $data["Codigo"];
				$nombres = $data["Nombres"];
				$transporte = $data["Transporte"];
				$autoriza_solo = $data["Autoriza_Salir_Solo"];
				$persona_1 = $data["Persona_1"];
				$documento_1 = $data["Documento_1"];
				$celular_1 = $data["Celular_1"];
				$info_adicional = "<table align='center'  border='1'><thead><tr><th>AUTORIZADO PARA SALIR SOLO</th><th>PERSONA AUTORIZADA</th><th>DOCUMENTO</th><th>CELULAR</th></tr></thead><tbody><tr><td>$autoriza_solo</td><td>$persona_1</td><td>$documento_1</td><td>$celular_1</td></tr></tbody></table>";
				$array["info_adicional"] = $info_adicional;
			}
			else if ($estado == 1) {
				$query_data_ = "SELECT U.id as Codigo, CONCAT(U.apellidos, ' ',U.nombres) as Nombres, E.num_route as Ruta_Extra, E.recorrido as Recorrido, E.mobile as Celular_Monitora, P.paradero as Paradero, R.authPersonal as Autoriza_Recoger, authName as Persona_1, authDoc as Documento_1, authMobile as Celular_1, CONCAT(M.apellidos, ' ',M.nombres) as Monitor
					FROM $bd_caa.usuarios as U INNER JOIN $bd_caa.rutas_estudiante as R ON U.id = R.id_student INNER JOIN $bd_caa.rutas_extra as E ON R.route_extra = E.id_route INNER JOIN $bd_caa.paraderos_extra as P ON R.bus_stop = P.id_paradero LEFT JOIN $bd_caa.usuarios as M ON E.id_monitor = M.id 
					WHERE U.id = '$id'";
				$query_data = mysql_query($query_data_,$link);
				$data = mysql_fetch_assoc($query_data);
				$codigo = $data["Codigo"];
				$nombres = $data["Nombres"];
				$ruta_extra = $data["Ruta_Extra"];
				$recorrido = $data["Recorrido"];
				$paradero = $data["Paradero"];
				$celular_monitora = $data["Celular_Monitora"];
				$autoriza_recoger = $data["Autoriza_Recoger"];
				$persona_1 = $data["Persona_1"];
				$documento_1 = $data["Documento_1"];
				$celular_1 = $data["Celular_1"];
				$monitor = $data["Monitor"];
				$info_adicional = "<table align='center'  border='1'><thead><tr><th>RUTA EXTRAESCOLAR</th><th>RECORRIDO</th><th>MONITORA</th><th>CELULAR</th><th>PARADERO</th><th>PERSONA AUTORIZADA</th><th>DOCUMENTO</th><th>CELULAR</th></tr></thead><tbody><tr><td>$ruta_extra</td><td>$recorrido</td><td>$monitor</td><td>$celular_monitora</td><td>$paradero</td><td>$persona_1</td><td>$documento_1</td><td>$celular_1</td></tr></tbody></table>";
				$array["info_adicional"] = $info_adicional;
			}
		}
		return $array;
	}

	function extraSchoolThursday($id,$periodo,$link){
		global $db;
		$array = array();
		$bd_caa = "cvuser_".$db["caa"];
		$periodo = ($periodo == 1 )?"PRIMER SEMESTRE":"SEGUNDO SEMESTRE";
		$query_ = "SELECT E.materia, M.estado as estado 
				FROM acti_jueves as E LEFT JOIN $bd_caa.mat_serviciosEstu as M ON E.id = M.id AND M.id_tipo_servicio = 3  
				WHERE E.id = '$id' AND E.periodo = '$periodo'";
		$query = mysql_query($query_,$link);
		if (mysql_num_rows($query) > 0) {
			$rest = mysql_fetch_assoc($query);
			$materia = $rest["materia"];
			$estado = $rest["estado"];
			$array["materia"] = $materia;
			if ($estado == 0) {
				$query_data_ = "SELECT U.id as Codigo, CONCAT(U.apellidos, ' ',U.nombres) as Nombres, P.authPersonal as Autoriza_Salir_Solo, P.transport as Transporte, authName as Persona_1, authDoc as Documento_1, authMobile as Celular_1
					FROM $bd_caa.usuarios as U INNER JOIN $bd_caa.peatonal_estudiante as P ON U.id = P.id_student 
					WHERE U.id = '$id'";
				$query_data = mysql_query($query_data_,$link);
				$data = mysql_fetch_assoc($query_data);
				$codigo = $data["Codigo"];
				$nombres = $data["Nombres"];
				$transporte = $data["Transporte"];
				$autoriza_solo = $data["Autoriza_Salir_Solo"];
				$persona_1 = $data["Persona_1"];
				$documento_1 = $data["Documento_1"];
				$celular_1 = $data["Celular_1"];
				$info_adicional = "<table align='center'  border='1'><thead><tr><th>AUTORIZADO PARA SALIR SOLO</th><th>PERSONA AUTORIZADA</th><th>DOCUMENTO</th><th>CELULAR</th></tr></thead><tbody><tr><td>$autoriza_solo</td><td>$persona_1</td><td>$documento_1</td><td>$celular_1</td></tr></tbody></table>";
				$array["info_adicional"] = $info_adicional;
			}
			else if ($estado == 1) {
				$query_data_ = "SELECT U.id as Codigo, CONCAT(U.apellidos, ' ',U.nombres) as Nombres, E.num_route as Ruta_Extra, E.recorrido as Recorrido, E.mobile as Celular_Monitora, P.paradero as Paradero, R.authPersonal as Autoriza_Recoger, authName as Persona_1, authDoc as Documento_1, authMobile as Celular_1, CONCAT(M.apellidos, ' ',M.nombres) as Monitor
					FROM $bd_caa.usuarios as U INNER JOIN $bd_caa.rutas_estudiante as R ON U.id = R.id_student INNER JOIN $bd_caa.rutas_extra as E ON R.route_extra = E.id_route INNER JOIN $bd_caa.paraderos_extra as P ON R.bus_stop = P.id_paradero LEFT JOIN $bd_caa.usuarios as M ON E.id_monitor = M.id 
					WHERE U.id = '$id'";
				$query_data = mysql_query($query_data_,$link);
				$data = mysql_fetch_assoc($query_data);
				$codigo = $data["Codigo"];
				$nombres = $data["Nombres"];
				$ruta_extra = $data["Ruta_Extra"];
				$recorrido = $data["Recorrido"];
				$paradero = $data["Paradero"];
				$celular_monitora = $data["Celular_Monitora"];
				$autoriza_recoger = $data["Autoriza_Recoger"];
				$persona_1 = $data["Persona_1"];
				$documento_1 = $data["Documento_1"];
				$celular_1 = $data["Celular_1"];
				$monitor = $data["Monitor"];
				$info_adicional = "<table align='center'  border='1'><thead><tr><th>RUTA EXTRAESCOLAR</th><th>RECORRIDO</th><th>MONITORA</th><th>CELULAR</th><th>PARADERO</th><th>PERSONA AUTORIZADA</th><th>DOCUMENTO</th><th>CELULAR</th></tr></thead><tbody><tr><td>$ruta_extra</td><td>$recorrido</td><td>$monitor</td><td>$celular_monitora</td><td>$paradero</td><td>$persona_1</td><td>$documento_1</td><td>$celular_1</td></tr></tbody></table>";
				$array["info_adicional"] = $info_adicional;
			}
		}
		return $array;
	}

	function extraSchool($id,$link){
		global $db;
		$array = array();
		$bd_caa = "cvuser_".$db["caa"];
		$query_ = "SELECT M.estado as estado 
				FROM $bd_caa.mat_serviciosEstu as M 
				WHERE M.id = '$id' AND M.id_tipo_servicio = 3";
		$query = mysql_query($query_,$link);
		if (mysql_num_rows($query) > 0) {
			$rest = mysql_fetch_assoc($query);
			$estado = $rest["estado"];
			if ($estado == 0) {
				$query_data_ = "SELECT U.id as Codigo, CONCAT(U.apellidos, ' ',U.nombres) as Nombres, P.authPersonal as Autoriza_Salir_Solo, P.transport as Transporte, authName as Persona_1, authDoc as Documento_1, authMobile as Celular_1
					FROM $bd_caa.usuarios as U INNER JOIN $bd_caa.peatonal_estudiante as P ON U.id = P.id_student 
					WHERE U.id = '$id'";
				$query_data = mysql_query($query_data_,$link);
				$data = mysql_fetch_assoc($query_data);
				$codigo = $data["Codigo"];
				$nombres = $data["Nombres"];
				$transporte = $data["Transporte"];
				$autoriza_solo = $data["Autoriza_Salir_Solo"];
				$persona_1 = $data["Persona_1"];
				$documento_1 = $data["Documento_1"];
				$celular_1 = $data["Celular_1"];
				$info_adicional = "<table align='center'  border='1'><thead><tr><th>AUTORIZADO PARA SALIR SOLO</th><th>PERSONA AUTORIZADA</th><th>DOCUMENTO</th><th>CELULAR</th></tr></thead><tbody><tr><td>$autoriza_solo</td><td>$persona_1</td><td>$documento_1</td><td>$celular_1</td></tr></tbody></table>";
				$array["info_adicional"] = $info_adicional;
			}
			else if ($estado == 1) {
				$query_data_ = "SELECT U.id as Codigo, CONCAT(U.apellidos, ' ',U.nombres) as Nombres, E.num_route as Ruta_Extra, E.recorrido as Recorrido, E.mobile as Celular_Monitora, P.paradero as Paradero, R.authPersonal as Autoriza_Recoger, authName as Persona_1, authDoc as Documento_1, authMobile as Celular_1, CONCAT(M.apellidos, ' ',M.nombres) as Monitor
					FROM $bd_caa.usuarios as U INNER JOIN $bd_caa.rutas_estudiante as R ON U.id = R.id_student INNER JOIN $bd_caa.rutas_extra as E ON R.route_extra = E.id_route INNER JOIN $bd_caa.paraderos_extra as P ON R.bus_stop = P.id_paradero LEFT JOIN $bd_caa.usuarios as M ON E.id_monitor = M.id 
					WHERE U.id = '$id'";
				$query_data = mysql_query($query_data_,$link);
				$data = mysql_fetch_assoc($query_data);
				$codigo = $data["Codigo"];
				$nombres = $data["Nombres"];
				$ruta_extra = $data["Ruta_Extra"];
				$recorrido = $data["Recorrido"];
				$paradero = $data["Paradero"];
				$celular_monitora = $data["Celular_Monitora"];
				$autoriza_recoger = $data["Autoriza_Recoger"];
				$persona_1 = $data["Persona_1"];
				$documento_1 = $data["Documento_1"];
				$celular_1 = $data["Celular_1"];
				$monitor = $data["Monitor"];
				$info_adicional = "<table align='center'  border='1'><thead><tr><th>RUTA EXTRAESCOLAR</th><th>RECORRIDO</th><th>MONITORA</th><th>CELULAR</th><th>PARADERO</th><th>PERSONA AUTORIZADA</th><th>DOCUMENTO</th><th>CELULAR</th></tr></thead><tbody><tr><td>$ruta_extra</td><td>$recorrido</td><td>$monitor</td><td>$celular_monitora</td><td>$paradero</td><td>$persona_1</td><td>$documento_1</td><td>$celular_1</td></tr></tbody></table>";
				$array["info_adicional"] = $info_adicional;
			}
		}
		return $array;
	}

	function credentialsEmail($id,$link){
		global $db;
		$array = array();
		$bd_caa = "cvuser_".$db["caa"];
		$query_ = "SELECT E.email as email, E.password as password, U.id_grado as id_grado 
				FROM $bd_caa.usuarios as U INNER JOIN $bd_caa.email_student as E ON U.id = E.id_student 
				WHERE U.id = '$id'";
				// print_r($query_);
		$query = mysql_query($query_,$link);
		if (mysql_num_rows($query) > 0) {
			$rest = mysql_fetch_assoc($query);
			$email = $rest["email"];
			$password = $rest["password"];
			if ($rest["id_grado"] >= 1 && $rest["id_grado"] <= 8) {
				$image_link = "<span style='font-size: small;'><a href='https://www.comunidadvirtualcaa.co/imagenes/TEAMS_2021_C25.mp4' target='_blank'><span style='font-family: Arial;'><img src='https://www.comunidadvirtualcaa.co/images/video_tutorial.png' alt=' height='200' width='300' /></span></a><br /></span>";
			}
			else if ($rest["id_grado"] >= 9 && $rest["id_grado"] <= 14) {
				$image_link = "<span style='font-size: small;'><a href='https://www.comunidadvirtualcaa.co/imagenes/TEAMS_2021_C25.mp4' target='_blank'><span style='font-family: Arial;'><img src='https://www.comunidadvirtualcaa.co/images/video_tutorial.png' alt=' height='200' width='300' /></span></a><br /></span>";
			}
			$info_adicional = "<table align='center' align='center' border='1'><thead><tr><th>CORREO</th><th>CONTRASEÑA</th></tr></thead><tbody><tr><td>$email</td><td>$password</td></tr></tbody></table>";
			$array["image_link"] = $image_link;
			$array["info_adicional"] = $info_adicional;
		}
		return $array;
	}
	

	function credentialsStudent($id,$link){
		global $db;
		$array = array();
		$bd_caa = "cvuser_".$db["caa"];
		$query_ = "SELECT usuario as username, clave as password FROM $bd_caa.usuarios WHERE id = '$id'";
		$query = mysql_query($query_,$link);
		if (mysql_num_rows($query) > 0) {
			$rest = mysql_fetch_assoc($query);
			$array["username"] = $rest["username"];
			$array["password"] = $rest["password"];
		}
		return $array;
	}

	function dataNotice($base,$num_circular_){
		try {
			$link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        //$id = 2016054;
	        $num_circular = base64_decode($num_circular_);
	        $infoAdd = infoAdditional($num_circular,$link);
	        list($periodo,$semester,$data_spec) = $infoAdd;
	        if ($data_spec == 0) {
	        	return false;
	        }
	        switch ($data_spec) {
	        	case '1':
	        		//$query_ = "SELECT materia FROM acti_miercoles WHERE id = '$id' AND periodo = '$periodo'";
	        		$result = extraSchoolWednesday($id,$periodo,$link);
	        		break;
	        	case '2':
	        		$query_ = "SELECT valor as valor_deuda FROM datacredito WHERE id = '$id' AND periodo='$periodo'";
	        		break;
	        	case '3':
	        		$result = followAcademic($id,$periodo,$link);
	        		break;
	        	case '4':
	        		$result = postFollow($id,$periodo,$link);
	        		break;
	        	case '5':
	        		$result = directedStudyAdvance($id,$periodo,$link);
	        		break;
	        	case '6':
	        		/*$periodo = 1;*/
	        		$result = directedStudy($id,$periodo,$link,$num_circular);
					
	        		break;
	        	case '7':
	        		$result = classSportArts($id,$semester,$link);
	        		break;
	        	case '8':
	        		$query_ = "SELECT dia as dia_queja, mes as mes_queja, ano as ano_queja, comentario as comentario FROM cir_quejas WHERE id = '$id' AND num_cir='$num_circular'";
	        		break;
	        	case '9':
	        		$query_ = "SELECT hora1 as horainicio, hora2 as horafinal FROM horarioboletin WHERE id = '$id' AND periodo = '$periodo'";
	        		// $query_ = "SELECT hora1 as horainicio, hora2 as horafinal FROM horarioboletin WHERE id = '$id' AND periodo = '2'";
	        		break;
	        	case '10':
	        		$result = interviewCitation($id,$link);
	        		break;
	        	case '14':
	        		$query_ = "SELECT IFNULL(complementaria1,'---------') as asignatura1, IFNULL(complementaria2,'---------') as asignatura2
							FROM estudiante as E LEFT JOIN complementariasfinano as C  ON C.id = E.id 
							WHERE E.id = '$id'";
	        		break;
	        	case '15':
	        		break;
	        	case '18':
	        		$result = extraSchool($id,$link);
	        		break;
	        	case '25':
	        		$result = credentialsEmail($id,$link);
	        		break;
	        	case '34':
	        		$result = credentialsStudent($id,$link);
	        		break;
	        	case '35':
	        		$query_ = "SELECT CONCAT(U.nombres,' ',U.apellidos) as nombre, L.curso,L.horaingreso,L.horasalida,L.salon,L.ingresoporteria,CONCAT(D.apellido,' ',D.nombre) AS docente FROM listatomafoto_2020 AS L INNER JOIN cvuser_caa2021.usuarios AS U ON L.id = U.id INNER JOIN datos_profesor AS D ON L.docenteresponsable = D.id_profesor WHERE L.id ='$id'";
	        		break;
	        	case '36':
	        		$query_ = "SELECT CONCAT(hora1,':',min1,' ',am_pm1) as hora
	        				FROM citacionfinano
	        				WHERE id ='$id'";
	        		break;
				case '44':
					$result = extraSchoolThursday($id,$periodo,$link);
					break;
				case '45':
					$query_ = "SELECT id,valor FROM estudiante_moroso_2024 WHERE id = '$id'";
					break;
				case '48':
					$result = directedStudySeguimiento($id,$periodo,$link);
					break;
				
	        	default:
	        		break;
	        }
	        if (isset($query_)) {
	        	$query = mysql_query($query_,$link);
	        	if (mysql_num_rows($query) > 0) {
	        		$result = mysql_fetch_assoc($query);
	        	}
	        	else {
	        		array_push($result, false);
	        	}
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function sendConsult($base,$num_circular){
		try {
			$link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
			$ip = obtenerIpUsuario();
	        $date_consult = date("d/m/Y H:i:s");
	        $query_ = "CALL consultNotice($id,$num_circular,'$date_consult','$ip');";
	        $query = mysql_query($query_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function dataSurvey($base,$num_survey){
		try {
			$link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $query_ = "SELECT DC.data_info as Data_Info, DC.dat_sta as Date_Start, DC.dat_end as Date_End, DE.autorizacion as Answer, E.curso as Course, CONCAT(E.apellido, ' ',E.nombre) as Names
					FROM datos_circular as DC INNER JOIN datos_envio_cir as DE ON DC.numero = DE.num_circular INNER JOIN estudiante as E ON DE.id = E.id
					WHERE DE.id = '$id' AND DC.numero = '$num_survey'";
	        $query = mysql_query($query_,$link);
	        if (mysql_num_rows($query) > 0) {
	        	while($data = mysql_fetch_assoc($query)){
	        		array_push($result,array("Data_Info"=>$data['Data_Info'],"Date_Start"=>$data['Date_Start'],"Date_End"=>$data['Date_End'],"Answer"=>$data['Answer'],"Course"=>$data['Course'],"Names"=>$data['Names']));
	        	}
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}
        
	function submitParentsPres($base,$num_survey,$course,$question_1,$question_2,$question_3,$question_6,$question_7,$question_8,$question_9,$question_10,$question_11,$question_12,$question_13,$question_14,$question_15,$reason_question_7,$reason_question_8,$reason_question_9,$reason_question_10,$reason_question_11,$reason_question_13,$observation,$infoSend){

		try {
			$link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $queryObs_ = "INSERT INTO obs_padres (id,observacion,fecha) VALUES ('$id','$observation',NOW())"; 
	        $queryObs = mysql_query($queryObs_,$link);
	        $query_ = "INSERT INTO preguntas_padres (id,num_p,respuesta,razon_respuesta,curso) VALUES 
	        		('$id',1,'$question_1','','$course'),
	        		('$id',2,'$question_2','','$course'),
	        		('$id',3,'$question_3','','$course'),
	        		('$id',6,'$question_6','','$course'),
	        		('$id',7,'$question_7','$reason_question_7','$course'),
	        		('$id',8,'$question_8','$reason_question_8','$course'),
	        		('$id',9,'$question_9','$reason_question_9','$course'),
	        		('$id',10,'$question_10','$reason_question_10','$course'),
	        		('$id',11,'$question_11','$reason_question_11','$course'),
	        		('$id',12,'$question_12','','$course'),
	        		('$id',13,'$question_13','$reason_question_13','$course'),
	        		('$id',14,'$question_14','','$course'),
	        		('$id',15,'$question_15','','$course')";
	        	
	        $query = mysql_query($query_,$link);
	        foreach ($infoSend as $key => $value) {
	        	$data_id = split("_", $key);
	        	$id_subject = $data_id[0];
	        	$id_teacher = $data_id[1];
	        	$cordiality = $value["cord"];
	        	$reason_cordiality = $value["reason_cord"];
	        	$academic = $value["acad"];
	        	$reason_academic = $value["reason_acad"];
	        	$sql = "INSERT INTO padresdefamilia(id, id_profesor, id_asignatura, cordialidad, r_cordialidad, academico, r_academico, formativo, r_formativo) VALUES ('$id','$id_teacher','$id_subject','$cordiality','$reason_cordiality','$academic','$reason_academic','','')";
	        	$query_teachers = mysql_query($sql,$link);
	        }
	        $date_answer = date("d/m/Y H:i:s");
	        $queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date_answer' WHERE id = '$id' AND num_circular = '$num_survey'";
	        //print_r($queryUpd_);
	        $queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	        
	function submitParentsPresCorta($base,$num_survey,$course,$question_1,$question_2,$question_3,$question_6,$question_7,$question_8,$question_9,$question_10,$question_11,$question_12,$question_13,$question_14,$question_15,$reason_question_7,$reason_question_8,$reason_question_9,$reason_question_10,$reason_question_11,$reason_question_13){

		try {
			$link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $query_ = "INSERT INTO preguntas_padresCorta (id,num_p,respuesta,razon_respuesta,curso) VALUES 
	        		('$id',1,'$question_1','','$course'),
	        		('$id',2,'$question_2','','$course'),
	        		('$id',3,'$question_3','','$course'),
	        		('$id',4,'$question_6','','$course'),
	        		('$id',5,'$question_7','$reason_question_7','$course'),
	        		('$id',6,'$question_8','$reason_question_8','$course'),
	        		('$id',7,'$question_9','$reason_question_9','$course'),
	        		('$id',8,'$question_10','$reason_question_10','$course'),
	        		('$id',9,'$question_11','$reason_question_11','$course'),
	        		('$id',10,'$question_12','','$course'),
	        		('$id',11,'$question_13','$reason_question_13','$course'),
	        		('$id',12,'$question_14','','$course'),
	        		('$id',13,'$question_15','','$course')"; 	
	        $query = mysql_query($query_,$link);
	        $date_answer = date("d/m/Y H:i:s");
	        $queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date_answer' WHERE id = '$id' AND num_circular = '$num_survey'";
	        //print_r($queryUpd_);
	        $queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}
       
        
	function submitParents($base,$periodo,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9,$question_10,$question_14,$question_15,$question_16,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$reason_question_5,$reason_question_7,$reason_question_8,$reason_question_10,$observation,$infoSend){
		try {
			$link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $queryObs_ = "INSERT INTO obs_padres (id,periodo,observacion,fecha) VALUES ('$id','$periodo','$observation',NOW())"; 
	        $queryObs = mysql_query($queryObs_,$link);
	        $query_ = "INSERT INTO preguntas_padres (id,periodo,num_p,respuesta,razon_respuesta,curso) VALUES 
	        		('$id','$periodo',1,'$question_1','$reason_question_1','$course'),
	        		('$id','$periodo',2,'$question_2','$reason_question_2','$course'),
	        		('$id','$periodo',3,'$question_3','$reason_question_3','$course'),
	        		('$id','$periodo',4,'$question_4','$reason_question_4','$course'),
	        		('$id','$periodo',5,'$question_5','$reason_question_5','$course'),
	        		('$id','$periodo',6,'$question_6','','$course'),
	        		('$id','$periodo',7,'$question_7','$reason_question_7','$course'),
	        		('$id','$periodo',8,'$question_8','$reason_question_8','$course'),
	        		('$id','$periodo',9,'$question_9','','$course'),
	        		('$id','$periodo',10,'$question_10','$reason_question_10','$course'),
	        		('$id','$periodo',14,'$question_14','','$course'),
	        		('$id','$periodo',15,'$question_15','','$course'),
					('$id','$periodo',16,'$question_16','','$course')";
	        $query = mysql_query($query_,$link);
	        foreach ($infoSend as $key => $value) {
	        	$data_id = split("_", $key);
	        	$id_subject = $data_id[0];
	        	$id_teacher = $data_id[1];
	        	$cordiality = $value["cord"];
	        	$reason_cordiality = $value["reason_cord"];
	        	/*$academic = $value["acad"];
	        	$reason_academic = $value["reason_acad"];
	        	$formative = $value["forma"];
	        	$reason_formative = $value["reason_forma"];*/
	        	$sql = "INSERT INTO padresdefamilia(id,periodo, id_profesor, id_asignatura, cordialidad, r_cordialidad, academico, r_academico, formativo, r_formativo) VALUES ('$id','$periodo','$id_teacher','$id_subject','$cordiality','$reason_cordiality','','','','')";
	        	$query_teachers = mysql_query($sql,$link);
	        }
	        $date_answer = date("d/m/Y H:i:s");
	        $queryUpd_ = " UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date_answer' WHERE id = '$id' AND num_circular = '$num_survey'";
	        //print_r($queryUpd_);
	        $queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function submitFamilyWorkshop($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9,$reason_question_6,$reason_question_7,$observation){
		try {
			$link = conectar_db($base_);
	        $result =array();
	        $id = $_SESSION["id"];
	        $date = date("d/m/Y H:i:s");
	        $query_ = "INSERT INTO encuesta_autoestima(id, curso, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, pregunta6, respuesta6, pregunta7, respuesta7, pregunta8, pregunta9, observaciones, encuesta, fecha) VALUES ('$id','$course','$question_1','$question_2','$question_3','$question_4','$question_5','$question_6','$reason_question_6','$question_7','$reason_question_7','$question_8','$question_9','$observation','$num_survey',CURRENT_TIMESTAMP())";
	        $query = mysql_query($query_,$link);
	        $queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";
	        //print_r($queryUpd_);
	        $queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function submitFamilyPsychology($base_,$num_survey,$course,$question_1,$question_2,$question_7,$reason_question_1,$reason_question_2,$reason_question_7,$observation){
		try {
			$link = conectar_db($base_);
	        $result =array();
	        $id = $_SESSION["id"];
	        $date = date("d/m/Y H:i:s");
	        $query_ = "INSERT INTO psicologia(id, curso, circular, pregunta1, respuesta1, pregunta2, respuesta2, pregunta3, respuesta3, observaciones, fecha) VALUES ('$id','$course','$num_survey','$question_1','$reason_question_1','$question_2','$reason_question_2','$question_7','$reason_question_7','$observation',CURRENT_TIMESTAMP())";
	        $query = mysql_query($query_,$link);
	        $queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";
	        //print_r($queryUpd_);
	        $queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	/*==================================================================================================================================================
funcion que recoge los datos de surjey de la entrevista de admisiones y los guarda en la base de datos 
=======================================================================================================================================================*/

	function submitFamilyAdmissions($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9,$question_10,$question_11,$question_12,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,
	$reason_question_5,$reason_question_6,$reason_question_8,$reason_question_9,$reason_question_10,$observation,$questions,$reason_questions){

		try {

			$question_12 = $questions[0];
			$question_13 = $questions[1];
			$question_14 = $questions[2];
			$question_15 = $questions[3];
			$question_16 = $questions[4];
			$question_17 = $questions[5];
			$question_18 = $questions[6];
			$question_19 = $questions[7];
			$question_20 = $questions[8];
			$question_21 = $questions[9];
			$question_22 = $questions[10];
			$question_23 = $questions[11];
			$question_24 = $questions[12];

			$reason_question_12 = $reason_questions[0];
			$reason_question_14 = $reason_questions[1];
			$reason_question_15 = $reason_questions[2];
			$reason_question_16 = $reason_questions[3];
			$reason_question_17 = $reason_questions[4];
			$reason_question_19 = $reason_questions[5];
			$reason_question_20 = $reason_questions[6];
			$reason_question_25 = $reason_questions[7];

				$link = conectar_db($base_);
				$result =array();
				$id = $_SESSION["id"];
				$date = date("d/m/Y H:i:s");
			
				$query_ = "INSERT INTO admisiones (id, p1, r1, p2, r2, p3, r3, p4, r4, p5, r5, p6, r6, p7, r7, p8, r8, p9, r9, p10, r10, p11, r11, p12, r12, p13, r13, 
				p14, r14, p15, r15, p16, r16, p17, r17,p18,r18,p19,r19,p20,r20,p21,p22,p23,p24,p25, obs, fec) VALUES ('$id','$question_1','$reason_question_1','$question_2','$reason_question_2','$question_3','$reason_question_3',
				'$question_4','$reason_question_4','$question_5','$reason_question_5','$question_6','$reason_question_6','$question_7','$reason_question_7',
				'$question_8','$reason_question_8','$question_9','$reason_question_9','$question_10','$reason_question_10','$question_11','$reason_question_11',
				'$question_12','$reason_question_12','$question_13','$reason_question_13','$question_14','$reason_question_14','$question_15','$reason_question_15',
				'$question_16','$reason_question_16','$question_17','$reason_question_17','$question_18','$reason_question_18','$question_19','$reason_question_19','$question_20','$reason_question_20',
				'$question_21','$question_22','$question_23','$question_24','$reason_question_25','$observation',CURRENT_TIMESTAMP())";
				$query = mysql_query($query_,$link);

				$queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";

				//*print_r($queryUpd_);
				$queryUpd = mysql_query($queryUpd_,$link);

				if (mysql_affected_rows() > 0) {
					array_push($result,true);
				}
				else {
					array_push($result,false);
				}

				mysql_close($link);
				return response($result);

			}

			catch (Exception $e) {
				$error = $e->getMessage();
				return array('code'=>500,'response'=>$error);

			}

		}

function submitProcessEnroll($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$questions){

		try {

			$reason_question_5 = $questions[0];
			$reason_question_6 = $questions[1];
			$question_7 = $questions[2];
			$reason_question_7 = $questions[3];
			$question_8 = $questions[5];
			$question_9 = $questions[6];
			$reason_question_9 = $questions[7];
			$observation = $questions[4];


			$link = conectar_db($base_);

	        $result =array();

	        $id = $_SESSION["id"];

	        $date = date("d/m/Y H:i:s");

			
			$query_ = "INSERT INTO matriculas (id, p1, razon1, p2, razon2, p3, razon3, p4, razon4, p5, razon5, p6, razon6, p7, razon7, p8, p9, razon9, observaciones, fecha) VALUES ('$id', '$question_1', '$reason_question_1', '$question_2', '$reason_question_2', '$question_3', '$reason_question_3', '$question_4', '$reason_question_4', '$question_5', '$reason_question_5', '$question_6', '$reason_question_6', '$question_7', '$reason_question_7', '$question_8', '$question_9', '$reason_question_9', '$observation', CURRENT_TIMESTAMP())";

	        $query = mysql_query($query_,$link);

	      $queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";

	        // print_r($queryUpd_);

	        $queryUpd = mysql_query($queryUpd_,$link);

	        if (mysql_affected_rows() > 0) {

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	


	function submitResources_($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$reason_question_3,$observation){
		try {
			$link = conectar_db($base_);
	        $result =array();
	        $id = $_SESSION["id"];
	        $date = date("d/m/Y H:i:s");
	        //$query_ = "INSERT INTO resources(id, survey, course, question_1, question_2, question_3, question_4, r_question_3, observation, date)   VALUES ('$id','$num_survey','$course','$question_1','$question_2','$question_3','$question_4','$reason_question_3','$observation',CURRENT_TIMESTAMP())";
	        $query = mysql_query($query_,$link);
	        //$queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";
	        //print_r($queryUpd_);
	        $queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function submit_Primary_Concept($base_,$num_survey,$course,$subject_1,$subject_2,$subject_3,$subject_4,$subject_5,$question_1,$question_2,$question_3,$question_4,$question_5,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$reason_question_5,$observation){
		try {
			$link = conectar_db($base_);
	        $result =array();
	        $id = $_SESSION["id"];
	        $date = date("d/m/Y H:i:s");
	        $query_ = "INSERT INTO concepts_activity(id_student, num_circular, curso, asignatura1, pregunta1, razon1, asignatura2, pregunta2, razon2, asignatura3, pregunta3, razon3, asignatura4, pregunta4, razon4, asignatura5, pregunta5, razon5, observaciones, fecha) VALUES ('$id','$num_survey','$course','$subject_1','$question_1','$reason_question_1','$subject_2','$question_2','$reason_question_2','$subject_3','$question_3','$reason_question_3','$subject_4','$question_4','$reason_question_4','$subject_5','$question_5','$reason_question_5','$observation', NOW())";
	        $query = mysql_query($query_,$link);
	        $queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";
	        //print_r($queryUpd_);
	        $queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}
    
	function submitConceptSurvey($base,$num_survey,$course,$array_,$observation){
		try {
			$link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $date = date("d/m/Y H:i:s");
	        $query_ = "INSERT INTO cvuser_encuestas.concepts_obs(id_student, num_circular, course, observation, date_entry) VALUES ('$id','$num_survey','$course','$observation', NOW());";
	        $query = mysql_query($query_,$link);
	        for ($num = 1; $num <= 8; $num++) { 
				$subject = '';
	        	$answer = '';
	        	$reason = '';
	        	$subject = $array_["subject_".$num]; 
	        	$answer = $array_["question_".$num]; 
	        	$reason = $array_["reason_question_".$num]; 
	        	$sql_teacher = "SELECT T.id as id_teacher
				FROM usuarios as U INNER JOIN charge_academic as C ON U.id_grado = C.id_grade AND U.curso = C.id_course INNER JOIN subjects as S ON C.id_subject = S.id_subject INNER JOIN usuarios as T ON C.id_user = T.id
				WHERE U.id = '$id' AND C.id_subject = '$subject'
				GROUP BY S.id_subject";
				$query_teacher = mysql_query($sql_teacher,$link);
				if (mysql_num_rows($query_teacher) > 0) {
					$data = mysql_fetch_assoc($query_teacher);
					$teacher = $data["id_teacher"];
			        $sql = "INSERT INTO cvuser_encuestas.concepts_subject(id_student, num_circular, subject, teacher, answer, reason) VALUES ('$id','$num_survey','$subject','$teacher','$answer','$reason')";
			        $proced = mysql_query($sql,$link);
				}
	        }
	        $queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";
	        $queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}
        
	function getSubjectCourse($base){
		try {
			$link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        /*$query_ = "SELECT S.id_subject, S.description as Subject
				FROM usuarios as U INNER JOIN charge_academic as C ON U.id_grado = C.id_grade AND U.curso = C.id_course INNER JOIN subjects as S ON C.id_subject = S.id_subject
				WHERE U.id = '$id' AND ((U.id_grado BETWEEN 1 AND 3 AND S.id_subject IN (21,22,42,43,58,59,60)) OR (U.id_grado BETWEEN 9 AND 14 AND S.id_subject IN (1,3,4,5,6,7,8,9,10,12,13,21,22,29,30,31,32,33,34,35,36,37,39,40,49,50,72)))
				GROUP BY S.id_subject";*/
			$query_ = "SELECT S.id_subject, S.description as Subject
					FROM usuarios as U INNER JOIN charge_academic as C ON U.id_grado = C.id_grade AND U.curso = C.id_course INNER JOIN subjects as S ON C.id_subject = S.id_subject
					WHERE U.id = '$id' AND ((U.id_grado BETWEEN 1 AND 3 AND S.id_subject IN (12,14,15,16,17,18,19,21,22,24,36,41,42,43,44,46,47,49,50,51,58,59,60,64,65,67,71)) OR (U.id_grado BETWEEN 4 AND 14))
					GROUP BY S.id_subject";
	        $query = mysql_query($query_,$link);
	        if (mysql_num_rows($query) > 0) {
	        	while($data = mysql_fetch_assoc($query)){
	            	array_push($result,array("id"=>$data["id_subject"],"description"=>$data["Subject"]));
		        }
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}  	

	function getTeachersCourse($base){
		try {
			$link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
		
			$query_ = "
			SELECT 'Rectora' as id_subject, NULL as Subject, T.id as id_teacher, CONCAT(T.apellidos, ' ',T.nombres) as Teacher, TP.descripcion as Profile
			FROM usuarios as T INNER JOIN tipo_usuario as TP ON T.id_tipo_usuario = TP.id_tipo_usuario
			WHERE T.id_tipo_usuario = 9
			UNION
			SELECT 'Coordinadora' as id_subject, NULL as Subject, T.id as id_teacher, CONCAT(T.apellidos, ' ',T.nombres) as Teacher, P.descripcion as Profile
			FROM usuarios as T INNER JOIN perfil as P ON T.id_perfil = P.id_perfil INNER JOIN correo_jefatura as J ON T.id = J.id_user
			WHERE FIND_IN_SET((SELECT U.id_grado FROM usuarios as U WHERE U.id = '$id'),J.id_grados) AND T.id_perfil = 12
			UNION
			SELECT DU.id_area as id_subject, NULL as Subject, T.id as id_teacher, CONCAT(T.apellidos, ' ',T.nombres) as Teacher, CONCAT(IF(PJ.descripcion = 'SUDO','JEFE',PJ.descripcion), ' DEPTO. DE ',DS.descripcion) as Profile
			FROM usuarios as T INNER JOIN perfil as PJ ON T.id_perfil = PJ.id_perfil INNER JOIN depto_users as DU ON T.id = DU.id_usuario AND DU.tipo_user = 2 INNER JOIN depto_society as DS ON DU.id_area = DS.id_area AND DS.area_work = 1
			WHERE FIND_IN_SET (T.id,
				(SELECT GROUP_CONCAT(D.id_usuario)
				FROM depto_users as D INNER JOIN depto_society as S ON D.id_area = S.id_area
				WHERE S.area_work = 1 AND D.tipo_user = 1 AND D.id_area IN (SELECT DC.id_area FROM depto_users as DC WHERE DC.tipo_user = 2 AND DC.id_usuario = (SELECT C.id 
					FROM usuarios as C INNER JOIN perfil as P ON C.id_perfil = P.id_perfil INNER JOIN correo_jefatura as J ON C.id = J.id_user
					WHERE FIND_IN_SET((SELECT U.id_grado FROM usuarios as U WHERE U.id = '$id'),J.id_grados) AND C.id_perfil = 12))))
			UNION
			SELECT A.id_asignatura as id_subject, A.descripcion as Subject, C.id_profesor as id_teacher, CONCAT(T.apellidos, ' ',T.nombres) as Teacher, 'DOCENTE' as Profile 
			FROM usuarios as U INNER JOIN asignaturas as A ON U.id_grado = A.id_grado INNER JOIN cargas as C ON A.id_asignatura = C.id_asignatura AND U.curso = C.curso INNER JOIN usuarios as T ON C.id_profesor = T.id
			WHERE U.id = '$id' AND A.estado = 1 AND A.id_tipo_asignatura = 1 AND A.descripcion  NOT IN ('COMPORTAMIENTO','CIENCIAS POLÍTICAS','APROVECHAMIENTO DEL TIEMPO LIBRE') -- AND A.descripcion  NOT IN ('COMPORTAMIENTO','CIENCIAS POLÍTICAS','APROVECHAMIENTO TIEMPO LIBRE','LECTOESCRITURA Y EXPRESIÓN ORAL','ESTIMULACIÓN PSICOMOTRIZ')
			UNION
			SELECT A.id_asignatura as id_subject, A.descripcion as Subject, C.id_profesor as id_teacher, CONCAT(T.apellidos, ' ',T.nombres) as Teacher, 'DOCENTE' as Profile 
			FROM usuarios as U INNER JOIN asignaturas as A ON U.id_grado = A.id_grado INNER JOIN cargas as C ON A.id_asignatura = C.id_asignatura AND U.curso = C.curso INNER JOIN usuarios as T ON C.id_profesor = T.id INNER JOIN electivas as E ON U.id = E.id_estudiante AND A.id_asignatura = E.id_asignatura AND T.id = E.id_profesor 
			WHERE U.id = '$id' AND A.estado = 1 AND A.id_tipo_asignatura = 2
			ORDER BY FIELD (id_subject,'Rectora','Coordinadora') DESC, Subject";
			/* Consulta de Carga Academica de las tablas de parcelación */
			/*$query = "SELECT S.id_subject, S.description as Subject, C.id_user as id_teacher, CONCAT(T.apellidos, ' ',T.nombres) as Teacher, 'DOCENTE' as Profile
					FROM usuarios as U INNER JOIN charge_academic as C ON U.id_grado = C.id_grade AND U.curso = C.id_course INNER JOIN subjects as S ON C.id_subject = S.id_subject INNER JOIN usuarios as T ON C.id_user = T.id
					WHERE U.id = '$id'
					ORDER BY id_subject";*/
	        $query = mysql_query($query_,$link);
	        if (mysql_num_rows($query) > 0) {
	        	while($data = mysql_fetch_assoc($query)){
	            	array_push($result,array("id_subject"=>$data["id_subject"],"Subject"=>$data["Subject"],"id_teacher"=>$data["id_teacher"],"Teacher"=>$data["Teacher"],"Profile"=>$data["Profile"]));
		        }
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}    
	function submit_conference_Survey($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$reason_question_1,$reason_question_2,$reason_question_3){
		try {
			$link = conectar_db($base_);
	        $result =array();
	        $id = $_SESSION["id"];
	        $query_ = " INSERT INTO cvuser_encuestas.conference_Survey(id_student, num_survey, course, question_1, question_2, question_3, question_4, reason_question_1, reason_question_2, reason_question_3, date_entry) VALUES ('$id','$num_survey','$course','$question_1','$question_2','$question_3','$question_4','$reason_question_1','$reason_question_2','$reason_question_3',NOW())";
	        $query = mysql_query($query_,$link);
	         $queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";
	        $queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}
    function submitBackToClass($base_,$num_survey,$course,$major_disease,$how_long_major_disease,$which_major_disease,$current_disease,$reason_current_disease,$members_coexistence,$relationship_members_coexistence,$which_members_coexistence,$elderly,$reason_elderly,$profesional_health,$people_diagnosed,$reason_people_diagnosed,$neighborhood,$location,$send_class){
		try {
			$link = conectar_db($base_);
	        $result =array();
	        $id = $_SESSION["id"];
	        $query_ = " INSERT INTO information_back(id_student, num_survey, course, major_disease, how_long_major_disease, which_major_disease, current_disease, reason_current_disease, members_coexistence, relationship_members_coexistence, which_members_coexistence, elderly, reason_elderly, profesional_health, people_diagnosed, reason_people_diagnosed, neighborhood, location, send_class, date_send) VALUES ('$id','$num_survey','$course','$major_disease','$how_long_major_disease','$which_major_disease','$current_disease','$reason_current_disease','$members_coexistence','$relationship_members_coexistence','$which_members_coexistence','$elderly','$reason_elderly','$profesional_health','$people_diagnosed','$reason_people_diagnosed','$neighborhood','$location','$send_class',NOW())";
	        $query = mysql_query($query_,$link);
	         $queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";
	        $queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}
	function submit_survey_Psychologist($base_,$num_survey,$course,$question_1,$question_2,$question_3,$reason_question_1,$reason_question_2,$reason_question_3,$observation){
		try {
			$link = conectar_db($base_);
	        $result =array();
	        $id = $_SESSION["id"];
	        $date = date("d/m/Y H:i:s");
	        $query_ = " INSERT INTO sicologia (id, p1, razon1, p2, razon2, p3, razon3, obs, fecha, curso) VALUES ('$id','$question_1','$reason_question_1','$question_2','$reason_question_2','$question_3','$reason_question_3','$observation',NOW(),'$course')";
	        $query = mysql_query($query_,$link);
	         $queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";
	        $queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function submit_survey_Ocupational($base_,$num_survey,$course,$question_1,$question_2,$question_3,$reason_question_1,$reason_question_2,$reason_question_3,$observation){
		try {
			$link = conectar_db($base_);
	        $result =array();
	        $id = $_SESSION["id"];
	        $date = date("d/m/Y H:i:s");
	        $query_ = " INSERT INTO terapiaocupacional (id, p1, razon1, p2, razon2, p3, razon3, obs, fecha, curso) VALUES ('$id','$question_1','$reason_question_1','$question_2','$reason_question_2','$question_3','$reason_question_3','$observation',NOW(),'$course')";
	        $query = mysql_query($query_,$link);
	         $queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";
	        $queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function submit_survey_ShowtheTalent($base_,$num_survey,$course,$question_1,$question_2,$question_3,$reason_question_1,$reason_question_2,$reason_question_3,$observation){
		try {
			$link = conectar_db($base_);
	        $result =array();
	        $id = $_SESSION["id"];
	        $date = date("d/m/Y H:i:s");
	        $query_ = " INSERT INTO show_talent2024 (id, p1, razon1, p2, razon2, p3, razon3, obs, fecha, curso) VALUES ('$id','$question_1','$reason_question_1','$question_2','$reason_question_2','$question_3','$reason_question_3','$observation',NOW(),'$course')";
	        $query = mysql_query($query_,$link);
	         $queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";
	        $queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}
    
	function getPsychologyAttention($base){
		try {
			global $db;
			$link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $date = date("d/m/Y H:i:s");
	        $bd_caa = "cvuser_".$db["caa"];
	        $sql = "SELECT C.id_psicologa, CONCAT(PS.nombres, ' ',PS.apellidos) as psicologa
					FROM  	  `psico_remision_int` 	 		AS P
					INNER JOIN  `psico_calendario` 	 		AS C 	ON 		P.id_rem_int = C.id_rem_int
					INNER JOIN  `estudiante`       	 		AS E 	ON 		E.id = P.id_remitido
					INNER JOIN  `psico_sesiones`       		AS S 	ON 		(S.id_rem_int = C.id_rem_int) AND (S.num_sesion=C.num_sesion)
					LEFT JOIN   `psico_tipo_categoria` 		AS PC 	ON 		PC.id_categoria=P.id_categoria
					INNER JOIN  `psico_tipo_persona`   		AS TP 	ON  	TP.id_tipo_persona=P.id_tipo_persona 
					INNER JOIN  `$bd_caa`.`usuarios` 			AS U 	ON		U.id=E.id
					INNER JOIN  `$bd_caa`.`cursos` 				AS CU 	ON		CU.id=U.curso
					INNER JOIN  `$bd_caa`.`grados` 				AS GR 	ON		GR.id_grado=U.id_grado 
					INNER JOIN  `$bd_caa`.`usuarios` AS PS ON C.id_psicologa = PS.id
					WHERE E.id = '$id'
					ORDER BY C.fec DESC
					LIMIT 1";
	        $query = mysql_query($sql,$link);
	        //print_r($sql);
	        if (mysql_num_rows($query) > 0) {
	        	while ($data = mysql_fetch_assoc($query)) {
	        		//array_push($result, array("id_psicologa"=>$data["id_psicologa"],"psicologa"=>$data["psicologa"]));
	        		$result = array("id_psicologa"=>$data["id_psicologa"],"psicologa"=>$data["psicologa"]);
	        	}
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}
    
function submit_According_load($base,$num_survey,$course,$infoSend){
		try {
			$link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        foreach ($infoSend as $key => $value) {
	        	if ($value != '') {
	        		$sql = " INSERT INTO Accordingload(id_student, num_circular, course, id_asig, observation, date_entry) VALUES ('$id','$num_survey','$course','$key','$value',NOW())";
	        		$query_teachers = mysql_query($sql,$link);
	        	}
	        }
	        $queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";
	        	$queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}
	function Submit_Satisfaction_parents($base_,$num_survey,$course,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9,$question_10,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$reason_question_5,$reason_question_6,$reason_question_7,$reason_question_8,$reason_question_9,$reason_question_10,$observation){
		try {
			$link = conectar_db($base_);
	        $result =array();
	        $id = $_SESSION["id"];
	        $date = date("d/m/Y H:i:s");
	        
	        $query_ = "INSERT INTO satisfaction_parents(id_student, num_circular, course, question_1, question_2, question_3, question_4, question_5, question_6, question_7, question_8, question_9, question_10, reason_question_1, reason_question_2, reason_question_3, reason_question_4, reason_question_5, reason_question_6, reason_question_7, reason_question_8, reason_question_9, reason_question_10, observation, date_entry) VALUES ('$id','$num_survey','$course','$question_1','$question_2','$question_3','$question_4','$question_5','$question_6','$question_7','$question_8','$question_9','$question_10','$reason_question_1','$reason_question_2','$reason_question_3','$reason_question_4','$reason_question_5','$reason_question_6','$reason_question_7','$reason_question_8','$reason_question_9','$reason_question_10','$observation',NOW())";
	        $query = mysql_query($query_,$link);
	        $queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";
	        $queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}
	function submitRegulationNoTransport($base,$num_survey,$authPersonal,$typeTransport,$authName,$authDoc,$authMobile,$authName_1,$authDoc_1,$authMobile_1,$authName_2,$authDoc_2,$authMobile_2){
		try {
			$link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $date = date("d/m/Y H:i:s");
	        $query_ = "INSERT INTO peatonal_estudiante(id_student, transport, authPersonal, authName, authDoc, authMobile, 
    		authName_2, authDoc_2, authMobile_2, authName_3, authDoc_3, authMobile_3, date_register) 
			VALUES ('$id','$typeTransport','$authPersonal','$authName','$authDoc','$authMobile',
				'$authName_1','$authDoc_1','$authMobile_1','$authName_2','$authDoc_2','$authMobile_2',NOW()) 
			ON DUPLICATE KEY UPDATE 
				transport = VALUES(transport), 
				authPersonal = VALUES(authPersonal), 
				authName = VALUES(authName), 
				authDoc = VALUES(authDoc), 
				authMobile = VALUES(authMobile), 
				authName_2 = VALUES(authName_2), 
				authDoc_2 = VALUES(authDoc_2), 
				authMobile_2 = VALUES(authMobile_2), 
				authName_3 = VALUES(authName_3), 
				authDoc_3 = VALUES(authDoc_3), 
				authMobile_3 = VALUES(authMobile_3), 
				date_register = NOW();";
	        $query = mysql_query($query_,$link);
	        $queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";
	        $queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}
	function Survey_Symptom($base_,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9,$question_10,$question_11,$question_12,$question_13,$question_14,$question_15,$question_16,$question_17,$question_18){
		try {
			$link = conectar_db($base_);
	        $result =array();
	        $id = $_SESSION["id"];
	        $date_actual = date("Y-m-d");
	        $hour_actual = date("G");
	        if ($hour_actual >= 18) {
	        	$date_add = strtotime('+1 day',strtotime($date_actual));
	        	$date_entry = date("Y-m-d",$date_add);
	        }
	        else {
	        	$date_entry = $date_actual;
	        }
	        $query_ = "INSERT INTO SurveySymptom (id_student, date_int, question_1, question_2, question_3, question_4, question_5, question_6, question_7, question_8, question_9, question_10, question_11, question_12, question_13, question_14, question_15, question_16, question_17, question_18) VALUES ('$id', '$date_entry', '$question_1','$question_2','$question_3','$question_4','$question_5','$question_6','$question_7','$question_8','$question_9','$question_10','$question_11','$question_12','$question_13','$question_14','$question_15','$question_16','$question_17','$question_18')";
	        $query = mysql_query($query_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}
	function Survey_Consumer($base_,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$question_7,$question_8,$question_9){
		try {
			$link = conectar_db($base_);
	        $result =array();
	        $id = $_SESSION["id"];
	        $date_actual = date("Y-m-d");
	        $query_ = "INSERT INTO SurveyConsumer (id_student, date_int, question_1, question_2, question_3, question_4, question_5, question_6, question_7, question_8, question_9) VALUES ('$id', '$date_entry', '$question_1','$question_2','$question_3','$question_4','$question_5','$question_6','$question_7','$question_8','$question_9')";
	        $query = mysql_query($query_,$link);
	        if (mysql_affected_rows() > 0) {
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}


	function getPsychologyAttentionActualization($base){
		try {
			global $db;
			$link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $date = date("d/m/Y H:i:s");
	        $bd_caa = "cvuser_".$db["caa"];
	        $sql = "SELECT P.id_psico AS id_psicologa, CONCAT(U.nombres,' ',U.apellidos) AS psicologa 
					FROM psico_encuesta_atencion AS P 
					INNER JOIN `$bd_caa`.`usuarios` AS U ON P.id_psico = U.id
					WHERE P.id_student = '$id'";

	        $query = mysql_query($sql,$link);
	        //print_r($sql);
	        if (mysql_num_rows($query) > 0) {
	        	while ($data = mysql_fetch_assoc($query)) {
	        		//array_push($result, array("id_psicologa"=>$data["id_psicologa"],"psicologa"=>$data["psicologa"]));
	        		$result = array("id_psicologa"=>$data["id_psicologa"],"psicologa"=>$data["psicologa"]);
	        	}
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function submitSatisfactionClassVirtual($base_,$num_survey,$question_1,$question_2,$question_3,$question_4,$question_5,$question_6,$reason_question_1,$reason_question_2,$reason_question_3,$reason_question_4,$reason_question_5,$reason_question_6){
		try {
			$link = conectar_db($base_);
			$result =array();
			$id = $_SESSION["id"];
			$date = date("d/m/Y H:i:s");
			$query_ = "INSERT INTO satisfactionclassvirtual (id, p1, razon1, p2, razon2, p3, razon3, p4, razon4, p5, razon5, p6, razon6, fecha) VALUES ('$id', '$question_1', '$reason_question_1', '$question_2', '$reason_question_2', '$question_3', '$reason_question_3', '$question_4', '$reason_question_4', '$question_5', '$reason_question_5', '$question_6', '$reason_question_6', CURRENT_TIMESTAMP())";
			$query = mysql_query($query_,$link);
			$queryUpd_ = "UPDATE cvuser_comunidadvirtual.datos_envio_cir SET autorizacion = 'Diligenciada', fecha_autoriza = '$date' WHERE id = '$id' AND num_circular = '$num_survey'";
			$queryUpd = mysql_query($queryUpd_,$link);
	        if (mysql_affected_rows() > 0) {
				array_push($result,true);
			}else {
				array_push($result,false);

	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function getGrado($base){
		try {
			$link = conectar_db($base);
	        $result =array();
			$procedure = "SELECT DISTINCT  u.curso, g.descripcion, g.id_grado  FROM `usuarios` as u
							LEFT JOIN grados as g
								on g.id_grado = u.id_grado
							WHERE id_tipo_usuario = 2 AND id_estado = 1";
			$query = mysql_query($procedure,$link);
			if(mysql_num_rows($query) >0){
				while($data = mysql_fetch_assoc($query)){
					array_push($result, array("curso" => $data["curso"], "descripcion" => $data["descripcion"], "id_grado" => $data["id_grado"]));
				}
				mysql_close($link);
				return response($result);
			}else{
				$data_result = false;
				return $data_result;
			}
		} catch (Exception $th) {
			$data_result = $th->getMessage();
			return array('code'=>500,'response'=>$data_result);
		}
	}

	
	function GetList($base,$grado,$curso){
	try {
		global $db;
		$link = conectar_db($base);
		if (!$link) {
			return array("code" => 500, "response" => "Error conectando a la base: dani " . mysql_error());
		}
		$result =array();
		if ($curso == "--"){
			$procedure = "SELECT u.id, CONCAT(u.apellidos, ' ', u.nombres) as nombre_estudiante, e.curso 
			FROM `usuarios` as u
			LEFT JOIN cvuser_comunidadvirtual.estudiante as e on e.id = u.id
			WHERE u.id_estado = 1 AND u.id_tipo_usuario = 2 
			AND u.id_grado = $grado ORDER BY u.apellidos ASC";
		}else{
			$procedure = "SELECT u.id, CONCAT(u.apellidos, ' ', u.nombres) as nombre_estudiante, e.curso 
			FROM `usuarios` as u
			LEFT JOIN cvuser_comunidadvirtual.estudiante as e on e.id = u.id
			WHERE u.id_estado = 1 AND u.id_tipo_usuario = 2 
			AND u.id_grado = $grado AND u.curso = $curso ORDER BY 
    		u.apellidos ASC";
		}

		$query = mysql_query($procedure,$link);
		if(mysql_num_rows($query)>0){
			while($data = mysql_fetch_assoc($query)){
				array_push($result, array("id" => $data["id"], "nombre_estudiante" => $data["nombre_estudiante"], "curso" => $data["curso"]));
			}
		}
		else {
			array_push($result, false);
		}
		mysql_close($link);
		return response($result);
	}
	catch (Exception $e) {
		$error = $e->getMessage();
		return array('code'=>500,'response'=>$error);
	}
}




?>
