$(document).ready(function () {
		$.boton_eliminar = function(action,key,name){
			  $("#"+action+ key).click(function () {
                    alert("¿ Esta seguro de eliminar \"" + name + "\" ?");
                    $.ajax({
                        url: location.origin + "/myrestservice/perfiles/" + key,
                        type: 'DELETE',
                        success: function (data) {
                            //console.log("se ha eleminado correctamente!")
                        }
                    });
                    $("#usuario_" + key).remove();
                });
		}
});