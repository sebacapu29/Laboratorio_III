var xhr;
function traerPersonas(){

  $.ajax({
    url: "http://localhost:3000/traer?collection=personas",
    type: 'GET',
    success:function(resp){
      lista= resp.data;
      actualizarTabla(resp.data);
    },
    beforeSend:function(){
      $("#spinner").html('<img src="./images/spinner.gif" alt="preloader"/>');
    },
    complete: function(hr,status){
      $("#spinner").hide();
  }
   });
}

function guardarPersona(persona) {
  var body ={'collection':'personas', 'objeto':persona};
  
  console.log(persona);
  console.log(body);

  $.ajax({
    url: "http://localhost:3000/agregar",
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(body),
  
    });
  }

function eliminarPersona(id) {
  
  var body ={'collection':'personas', 'id':id};

  $.ajax({
    url: "http://localhost:3000/eliminar",
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(body),
  
  }).done(function (data) {
  }).always(function(data){
  });
 }

function modificarPersona(persona) {

  var body ={'collection':'personas', 'objeto':persona};

  $.ajax({
    url: "http://localhost:3000/modificar",
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(body),
   });
}
