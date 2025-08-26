function getProfile(){
    return $.ajax({
        type:'POST',
        url:"controller/cont.php",
        dataType: 'json',
        data:{param:"getProfile",base:"caa"}
    });
}
function getNotices(surveys=false){
    return $.ajax({
        type:'POST',
        url:"controller/cont.php",
        dataType: 'json',
        data:{param:"getNotices",base:"comunidad",surveys}
    }); 
}
function getContent(notice){
    return $.ajax({
        type:'POST',
        url:"controller/cont.php",
        dataType: 'json',
        data:{param:"getNoticeContent",base:"comunidad", notice:notice}
    });   
}
function getInfo(){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"caa",param:"getInfo"}
    });
}
function sendInfoNotice(data,num_notice){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"comunidad",param:"sendInfoNotice", data, num_notice}
    });
}
function dataNotice(num_notice){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"comunidad",param:"dataNotice", num_notice}
    });
}
function dataSurvey(num_survey){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"comunidad",param:"dataSurvey", num_survey}
    });
}
function sendConsult(num_notice){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"comunidad",param:"sendConsult", num_notice}
    });
}
function moduleViews(){
    return $.ajax({
        url: '../controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"r",param:"getMain"}
    });
}
function submitParents(num_survey,course,question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,question_10,question_14,question_15,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,reason_question_7,reason_question_8,reason_question_10,observation,infoSend){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"submitParents",num_survey,course,question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,question_10,question_14,question_15,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,reason_question_7,reason_question_8,reason_question_10,observation,infoSend}
    });
}
function submitParentsPres(num_survey,course,question_1,question_2,question_3,question_6,question_7,question_8,question_9,question_10,question_11,question_12,question_13,question_14,question_15,reason_question_7,reason_question_8,reason_question_9,reason_question_10,reason_question_11,reason_question_13,observation,infoSend){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"submitParentsPres",num_survey,course,question_1,question_2,question_3,question_6,question_7,question_8,question_9,question_10,question_11,question_12,question_13,question_14,question_15,reason_question_7,reason_question_8,reason_question_9,reason_question_10,reason_question_11,reason_question_13,observation,infoSend}
    });
}

function submitFamilyWorkshop(num_survey,course,question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,reason_question_6,reason_question_7,observation){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"submitFamilyWorkshop",num_survey,course,question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,reason_question_6,reason_question_7,observation}
    });
}
function submitFamilyPsychology(num_survey,course,question_1,question_2,question_7,reason_question_1,reason_question_2,reason_question_7,observation){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"submitFamilyPsychology",num_survey,course,question_1,question_2,question_7,reason_question_1,reason_question_2,reason_question_7,observation}
    });
}
function submitFamilyAdmissions(num_survey,course,question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,question_10,question_11,question_12,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,reason_question_6,reason_question_7,reason_question_8,reason_question_9,reason_question_10,reason_question_11,reason_question_12,observation){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"submitFamilyAdmissions",num_survey,course,question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,question_10,question_11,question_12,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,reason_question_6,reason_question_7,reason_question_8,reason_question_9,reason_question_10,reason_question_11,reason_question_12,observation}
    });
}
function submitProcessEnroll(num_survey,course,question_1,question_2,question_3,question_4,question_5,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,observation){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"submitProcessEnroll",num_survey,course,question_1,question_2,question_3,question_4,question_5,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,observation}
    });
}
function submitTransport(num_survey,course,question_1,reason_question_1,question_2,reason_question_2,question_3,reason_question_3,question_4,reason_question_4,question_5,reason_question_5,question_6,reason_question_6,question_7,reason_question_7,question_8,reason_question_8,question_9,reason_question_9,question_10,reason_question_10,question_11,reason_question_11,question_12,reason_question_12,question_13,reason_question_13){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"submitTransport",num_survey,course,question_1,reason_question_1,question_2,reason_question_2,question_3,reason_question_3,question_4,reason_question_4,question_5,reason_question_5,question_6,reason_question_6,question_7,reason_question_7,question_8,reason_question_8,question_9,reason_question_9,question_10,reason_question_10,question_11,reason_question_11,question_12,reason_question_12,question_13,reason_question_13}
    });
}
function submitResources(num_survey,course,question_1,question_2,question_3,question_4,reason_question_3,observation){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"submitResources",num_survey,course,question_1,question_2,question_3,question_4,reason_question_3,observation}
    });
}
function submitPrimary_Concept(num_survey,course,subject_1,subject_2,subject_3,subject_4,subject_5,question_1,question_2,question_3,question_4,question_5,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,observation){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"submitPrimary_Concept",num_survey,course,subject_1,subject_2,subject_3,subject_4,subject_5,question_1,question_2,question_3,question_4,question_5,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,observation}
    });
}
function submitConceptSurvey(num_survey,course,subject_1,subject_2,subject_3,subject_4,subject_5,subject_6,subject_7,subject_8,question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,reason_question_6,reason_question_7,reason_question_8,observation){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"caa",param:"submitConceptSurvey",num_survey,course,subject_1,subject_2,subject_3,subject_4,subject_5,subject_6,subject_7,subject_8,question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,reason_question_6,reason_question_7,reason_question_8,observation}
    });
}
function getSubjectCourse(){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"caa",param:"getSubjectCourse"}
    });
}
function getTeachersCourse(){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"caa",param:"getTeachersCourse"}
    });
}
function submitconferenceSurvey(num_survey,course,question_1,question_2,question_3,question_4,reason_question_1,reason_question_2,reason_question_3){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"submit_conferenceSurvey",num_survey,course,question_1,question_2,question_3,question_4,reason_question_1,reason_question_2,reason_question_3}
    });
}
function submitBackToClass(num_survey,course,major_disease,how_long_major_disease,which_major_disease,current_disease,reason_current_disease,members_coexistence,relationship_members_coexistence,which_members_coexistence,elderly,reason_elderly,profesional_health,people_diagnosed,reason_people_diagnosed,neighborhood,location,send_class){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"submitBackToClass",num_survey,course,major_disease,how_long_major_disease,which_major_disease,current_disease,reason_current_disease,members_coexistence,relationship_members_coexistence,which_members_coexistence,elderly,reason_elderly,profesional_health,people_diagnosed,reason_people_diagnosed,neighborhood,location,send_class}
    });
}
function submitsurveyPsychologist(num_survey,course,question_1,question_2,question_3,reason_question_1,reason_question_2,reason_question_3,observation){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"submitsurveyPsychologist",num_survey,course,question_1,question_2,question_3,reason_question_1,reason_question_2,reason_question_3,observation}
    });
}
function getPsychologyAttention(){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"comunidad",param:"getPsychologyAttention"}
    });
}
function submitAccordingload(num_survey,course,infoSend){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"submitAccordingload",num_survey,course,infoSend}
    });
}
function SubmitSatisfactionparents(num_survey,course,question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,reason_question_6,reason_question_7,reason_question_8,reason_question_9,observation){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"SubmitSatisfactionparents",num_survey,course,question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,reason_question_1,reason_question_2,reason_question_3,reason_question_4,reason_question_5,reason_question_6,reason_question_7,reason_question_8,reason_question_9,observation}
    });
}
function submitRegulationNoTransport(num_survey,authPersonal,typeTransport,authName,authDoc,authMobile,authName_1,authDoc_1,authMobile_1,authName_2,authDoc_2,authMobile_2){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"submitRegulationNoTransport",num_survey,authPersonal,typeTransport,authName,authDoc,authMobile,authName_1,authDoc_1,authMobile_1,authName_2,authDoc_2,authMobile_2}
    });
}
function sendSurveySymptom(question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,question_10,question_11,question_12,question_13,question_14,question_15,question_16,question_17,question_18){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"sendSurveySymptom",question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,question_10,question_11,question_12,question_13,question_14,question_15,question_16,question_17,question_18}
    });
}
