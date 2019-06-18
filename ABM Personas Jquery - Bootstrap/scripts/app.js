var btnAlta;
var divFrm;
var lista;
var newDiv;

$(function(){
    Inicializar();
})
function Inicializar(){
    traerPersonas();
    $("#divFrm").hide();
    $("#btnAlta").click(function (){
        limpiarElementosHijos();
        $("#divFrm").show();
        mostrarPersonaEnFormulario(3,"alta")});
}
function traducirDescripcion(datoLabel){
    var datoAux = datoLabel.toString().toLowerCase();
    if(datoAux == "first_name")
    {
        datoLabel = "Nombre: ";
    }
    else if(datoAux == "last_name"){
        datoLabel = "Apellido: ";
    }
    else if(datoAux == "email"){
        datoLabel = "Email: ";
    }
    return datoLabel;
}
function actualizarTabla(lista) {
    var tablaList = $("#tablaLista");

        for (var i = 0; i < lista.length; i++) {
            var fila = $("<tr></tr>");
            for (var key in lista[i]) {
                var celda = $("<td></td>").text(lista[i][key]);
                celda.click((e)=>{
                    limpiarElementosHijos();
                    $("#divFrm").show();
                    mostrarPersonaEnFormulario(parseInt(e.target.parentNode.firstChild.textContent),"modificar");
                });
                fila.append(celda);
                if(key=='active')
                {
                    celda.css("display","none");
                }
               }
               tablaList.append(fila);
        }
}
function limpiarElementosHijos(){
    var elemento = $("#divFrm");

    elemento.find("*").remove(); 
}
function mostrarPersonaEnFormulario(id, operacion) {

    for (var i = 0; i < lista.length; i++) {
        for (var key in lista[i]) {
            if(lista[i][key] == id)
            {
                cargarCamposPersona(lista[i],operacion);
            }
        }
    }
    crearBotones(id,operacion);
}
function crearBotones(id,operacion)
{
    var form = $("#divFrm");
    var divContainer = $("<div></div>").attr("class","formgroup");//.css({"background-color":"blue"});
    if(operacion=="modificar")
    {
        var botonModificar = $("<input></input>");
        botonModificar.attr({"type":"button","value":"Modificar","class":"btn btn-primary"});
        botonModificar.css({"margin-left":"20px","margin-bottom":"10px"});

        botonModificar.click(()=>{
            var personaModificar = obtenerPersonaDelForm(); 
            modificarPersona(personaModificar);
        });
    
        var botonEliminar = $("<input></input>");
        botonEliminar.attr({"type":"button","value":"Eliminar","class":"btn btn-danger"});
        botonEliminar.css({"margin-left":"20px","margin-bottom":"10px"});
        botonEliminar.click(()=>{eliminarPersona(id);})
        botonEliminar.css({"display":"inline","margin-left":"20px","margin-right":"20px","margin-bottom":"10px"});

        divContainer.append(botonModificar);
        divContainer.append(botonEliminar);
    }
    else{
        var botonEnviar = $("<input></input>");
        botonEnviar.attr({"type":"button","value":"Dar de Alta","class":"btn btn-primary"});
        botonEnviar.click((e)=>{
            var persona = obtenerPersonaDelForm();                  
            guardarPersona(persona,e);
        });
        divContainer.append(botonEnviar);
    }
        var botonCerrar = $("<input></input>");
        botonCerrar.attr({"type":"button","value":"Cancelar","class":"btn btn-secondary"});
        botonCerrar.css({"margin-left":"20px","margin-bottom":"10px"});
 
        botonCerrar.click(()=>{ $("#divFrm").hide() });
        divContainer.append(botonCerrar);
        form.append(divContainer);
}
function obtenerPersonaDelForm()
{
    var id = parseInt($("#id").val());
    var active = $("#active").val();
    var nombre = $("#first_name").val();
    var apellido = $("#last_name").val();
    var email = $("#email").val();
    var genderF = $("#genderF");
    var sexo = genderF.is(":checked") ? "Famele" : "Male";;
    console.log(sexo);
    var persona = new Persona(nombre,apellido,email,sexo);

    persona.id = id;
    persona.active = active;

    console.log(persona);
    return persona;
}
function Persona(nombre,apellido,email,sexo){
    this.id=0;
    this.first_name = nombre;
    this.last_name = apellido;
    this.email = email;
    this.gender = sexo;
    this.active="false";
}
function cargarCamposPersona(persona, operacion){
    var genderF;
    var genderM;
    var datoInput;
    var form = $("#divFrm");
    var divContainer = $("<div></div>");
    divContainer.css({"background-color":"blue","opacity":"0.9","display":"block"});
    divContainer.addClass("formgroup col-md-6");
    for (var key in persona) {

    var label = $("<label></label>");
    label.css("display","inline");

    if(key!="gender")
    {
        var datoEspaniol = traducirDescripcion(key);
        label.text(datoEspaniol);
        label.css({"margin-bottom":"5px","margin-top":"40px","margin-left":"40px"});
        label.attr("id","lbl"+key);
        divContainer.append(label);
    }

    if(key=="gender")
    {
        var divGender = $("<div></div>").css("padding","20px");     

        genderF = $("<input/>&nbsp &nbspF</br>");
        genderF.attr({"type":"radio","name":"gender","id":"genderF","value":"F"});
        genderF.css({"padding":"10px","margin-top":"10px","display":"inline","margin-left":"30px"});

        genderM = $("<input/>&nbsp &nbsp M</br>");
        genderM.attr({"type":"radio","name":"gender","id":"genderM","value":"M"});
        genderM.css({"padding":"10px","margin-top":"10px","display":"inline","margin-left":"30px"});

        genderF.attr('checked',persona[key]== "Female" ? true:false);
        genderM.attr('checked',persona[key]== "Male" ? true:false);

        divGender.append(genderF);
        divGender.append(genderM);
        divContainer.append(divGender);
    }
    else
    {
        datoInput = $("<input></input>");
        datoInput.attr({"id":key,"required":true});
        datoInput.addClass("form-control");

        var datoPersona = operacion=="alta" ? " " : persona[key];
        datoInput.val(datoPersona);
        divContainer.append(datoInput);
    }
        if(key=="id" || key=="active")
        {
            label.css("display","none");
            datoInput.css("display","none");
        }            
    }
    form.append(divContainer);
}
function manejadorFormulario(claseAbrir,claseCerrar)
{
        var form = $("#divFrm");
        form.removeClass(claseCerrar);
        form.addClass(claseAbrir);
}