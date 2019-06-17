var btnAlta;
var divFrm;
var person;
var divContainer;
var lista;

window.onload = asignarEventos;

function asignarEventos() {
    divFrm= document.getElementById("divFrm");
    divFrm.style.position="absolute";
    crearSpinner();
    manejadorFormulario("hide","show");
    traerPersonas();
    btnAlta = document.getElementById('btnAlta');

    btnAlta.onclick = function () {
        limpiarElementosHijos("divFrm");
        mostrarPersonaEnFormulario(lista[0]["id"],"alta");
        manejadorFormulario("show","hide");
    }
}
function manejadorFormulario(claseAbrir,claseCerrar)
{
        var form = document.getElementById("divFrm");
        form.classList.remove(claseCerrar);
        form.classList.add(claseAbrir);
}
function mostrarPersonaEnFormulario(id,operacion) {
    var form = document.getElementById("divFrm");

    for (var i = 0; i < lista.length; i++) {
        for (var key in lista[i]) {
            if(lista[i][key] ==id)
            {
                cargarCamposPersona(lista[i],operacion);
            }
        }
    }
    crearBotones(id,operacion);
}
function crearBotones(id,operacion)
{
    var form = document.getElementById("divFrm");
    if(operacion=="modificar")
    {
        var botonModificar = document.createElement("input");
        botonModificar.setAttribute("type","button");
        botonModificar.setAttribute("value","Modificar");
        botonModificar.style.marginLeft= "20px";
        botonModificar.style.marginBottom="10px";
        botonModificar.addEventListener("click",()=>{
            var personaModificar = obtenerPersonaDelForm(); 
            modificarPersona(personaModificar);
        })
    
        var botonEliminar = document.createElement("input");
        botonEliminar.setAttribute("type","button");
        botonEliminar.setAttribute("value","Eliminar");
        botonEliminar.style.marginLeft= "20px";
        botonEliminar.style.marginBottom="10px";
        botonEliminar.addEventListener("click",()=>{eliminarPersona(id);})
        
        divContainer.appendChild(botonModificar);
        divContainer.appendChild(botonEliminar);
    }
    else{
        var botonEnviar = document.createElement("input");
        botonEnviar.setAttribute("type","button");
        botonEnviar.setAttribute("value","Dar de Alta");
        botonEnviar.addEventListener("click",()=>{
            var persona = obtenerPersonaDelForm();
            
            guardarPersona(persona);
        });
        botonEnviar.style.display="inline";
        botonEnviar.style.marginLeft= "20px";
        botonEnviar.style.marginRight= "20px";
        botonEnviar.style.marginBottom="10px";
        divContainer.appendChild(botonEnviar);
    
    }
        var botonCerrar = document.createElement("input");
        botonCerrar.setAttribute("type","button");
        botonCerrar.setAttribute("value","Cancelar");
        botonCerrar.addEventListener('click',()=>{ manejadorFormulario("hide","show") });
        botonCerrar.style.marginLeft= "20px";
        botonCerrar.style.marginBottom="10px";  
        divContainer.appendChild(botonCerrar);
        form.appendChild(divContainer);
        manejadorFormulario("show","hide");
}
function limpiarElementosHijos(idElemento){
    var elemento = document.getElementById(idElemento);

    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}
function datosFormularioRequeridos(){

    var form = document.getElementById("divFrm");

    var nombre = document.getElementById("first_name");
    var apellido = document.getElementById("last_name");
    var email = document.getElementById("email");

    if(nombre.value == " "){
        alert("Nombre Requerido");
        nombre.focus();
        return false;
    }
    if(apellido.value == " "){
        alert("Apellido Requerido");
        apellido.focus();
        return false;
    }
    if(email.value == " "){
        alert("Email Requerido");
        email.focus();
        return false;
    }
    return true;
}
function obtenerPersonaDelForm()
{
    var id = document.getElementById("id").value;
    var active = document.getElementById("active").value;
    var nombre =document.getElementById("first_name").value;
    var apellido =document.getElementById("last_name").value;
    var email =document.getElementById("email").value;   
    var genderF =document.getElementById("genderF").value;
    var sexo = genderF.checked ? "Famele" : "Male";;
    var persona = new Persona(nombre,apellido,email,sexo);

    persona.id = id;
    persona.active = active;

    return persona;
}
function cargarCamposPersona(persona,operacion){
    var form = document.getElementById("divFrm");
    divContainer = document.createElement("div");
    divContainer.style.backgroundColor = "blue";
    divContainer.style.opacity  = "0.7";
    divContainer.style.display="block";
    divContainer.style.width="50%";
    divContainer.style.position="absolute";
    for (var key in persona) {
    
    var newDiv = document.createElement("div");
    newDiv.style.padding = "5px";

    var label = document.createElement("label");
    label.style.display="inline";

    if(key!="gender")
    {
        var datoLabelEspaniol = traducirDescripcion(key);
        var txtElement = document.createTextNode(datoLabelEspaniol);
        label.appendChild(txtElement);
        label.style.marginBottom= "5px";
        label.style.marginTop = "40px";
        label.style.marginLeft="40px";
        newDiv.appendChild(label);
    }
    var genderF;
    var genderM;
    var datoInput;
    if(key=="gender")
    {
        var divGender = document.createElement("div");
        divGender.style.padding="20px";
        var descripcionGenderF = document.createTextNode("F");
        var descripcionGenderM = document.createTextNode("M");

        genderF = document.createElement("input");
        genderF.type = "radio";
        genderF.name = "gender";
        genderF.id="genderF";
        genderF.style.padding="10px";
        genderF.marginTop="10px";

        genderM = document.createElement("input");
        genderM.type = "radio";
        genderM.name = "gender";
        genderM.value = "genderM";
        genderM.id="genderF";
        genderM.style.padding="10px";
        genderM.marginTop="10px";

        genderF.style.display="inline";
        genderM.style.display="inline";
        genderF.style.marginLeft="30px";
        genderM.style.marginLeft="30px";

        genderF.checked = persona[key]== "Female" ? true:false;
        genderM.checked = persona[key]== "Male" ? true:false;

        divGender.appendChild(genderF);
        divGender.appendChild(descripcionGenderF);
        divGender.appendChild(genderM);
        divGender.appendChild(descripcionGenderM);
        newDiv.appendChild(divGender);
    }
    else
    {
        datoInput = document.createElement("input");
        datoInput.setAttribute("type","text");
        datoInput.setAttribute("id",key);
        datoInput.style.display="inline-block";
       
        datoInput.style.marginLeft="40px";
        var datoPersona = operacion=="alta" ? " " : persona[key];
        datoInput.value = datoPersona;
        newDiv.appendChild(datoInput);
    }
        if(key=="id" || key=="active")
        {
            label.style.display="none";
            datoInput.style.display="none";
        }
        newDiv.style.display = "block";
        
        divContainer.appendChild(newDiv);
    }
    form.appendChild(divContainer);
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
function crearSpinner(){

    var imgspinner = document.createElement("img");
    imgspinner.setAttribute("src","../images/spinner.gif");
    imgspinner.style.position="relative";
    imgspinner.style.top="240px";
    imgspinner.style.left="45%"; 
    imgspinner.style.display="none";
    imgspinner.setAttribute("id","spin");
    var divSpinner = document.getElementById("spinner");
    divSpinner.appendChild(imgspinner);
    
}
function ocultarMostrarSpinner(display){
    var imgspinner = document.getElementById("spin");
    imgspinner.style.display=display;
}
function actualizarTabla(lista) {

    var tablaList = document.getElementById("tablaLista");
    var divTabla = document.getElementById("divTabla");

        for (var i = 0; i < lista.length; i++) {
            var fila = document.createElement("tr");

            for (var key in lista[i]) {

                var celda = document.createElement("td");
                var dato = document.createTextNode(lista[i][key]);
                celda.appendChild(dato);
                celda.addEventListener('click',(e)=>{
                    limpiarElementosHijos("divFrm");
                    mostrarPersonaEnFormulario(parseInt(e.target.parentNode.firstChild.textContent),"modificar");
                });
                fila.appendChild(celda);
                if(key=='active')
                {
                    celda.style.display="none";
                }
               }
               tablaList.appendChild(fila);

        }
}
function manejadorRespuesta(){

    if(xhr.readyState == 4)
    {
        if(xhr.status ==200){
            var arrayPersonas = JSON.parse(xhr.responseText);
            lista = arrayPersonas.data;
            console.log("dasdas");
            actualizarTabla(arrayPersonas.data);
            ocultarMostrarSpinner("none");
        }
    }
}
function manejadorRespuesta2(){

        if(xhr.readyState == 4)
        {
            if(xhr.status ==200){
                var arrayPersonas = JSON.parse(xhr.responseText);
                lista = arrayPersonas.data;
                traerPersonas();
                // actualizarTabla(arrayPersonas.data);
            }
        }
    }

function Persona(nombre,apellido,email,sexo){
    this.id=0;
    this.first_name = nombre;
    this.last_name = apellido;
    this.email = email;
    this.gender = sexo;
    this.active="false";
}




