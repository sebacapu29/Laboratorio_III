var xhr;
function traerPersonas() {

  xhr = new XMLHttpRequest();
  ocultarMostrarSpinner("block");
  xhr.onreadystatechange = manejadorRespuesta;
  var url = "http://localhost:3000/traer?collection=personas";

  xhr.open('GET',url,true);
  xhr.send();
}

function guardarPersona(persona) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = manejadorRespuesta2;

    var body ={'collection':'personas', 'objeto':persona};
    var url = "http://localhost:3000/agregar";
    
    xhr.open('POST',url,true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(body);
    xhr.send(JSON.stringify(body));
  }

function eliminarPersona(id) {
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = manejadorRespuesta2;

  var body ={'collection':'personas', 'id':id};
  var url = "http://localhost:3000/eliminar";
  xhr.open('POST',url,true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(body));
 }

function modificarPersona(persona) {
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = manejadorRespuesta2;

  var body ={'collection':'personas', 'objeto':persona};
  var url = "http://localhost:3000/modificar";
  xhr.open('POST',url,true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(body));
  console.log(body);
}
