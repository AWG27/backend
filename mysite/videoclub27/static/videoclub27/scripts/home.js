$(document).ready(function () {
	base_url = location.origin
    var contenido = " <div id=\"contenido\">\n" +
        "        <div class=\"row\" id=\"fila_1\">\n" +
        "        </div>\n" +
        "    </div>";
		
	$("#boton_home_busqueda").click(function () {
		//console.log("boton busqueda")
		home_busqueda = $("#home_busqueda").val();
		if ( home_busqueda != undefined  && home_busqueda != null ) {
			$.ajax({
					url: base_url + "/myrestservice/home/peliculas/search/" + home_busqueda,
					type: 'GET',
					success: function (data) {
						//console.log("busqueda")
						//console.log(data)
						$("#fila_1").remove()
						$("#contenido").append(
								"        <div class=\"row\" id=\"fila_1\">\n" +
								"        </div>\n" 
							);
						if(data != undefined){
							//console.log("pasa aqui"+data)
										$.each(data, function (key, val) {
				
											resource_url = base_url + "/videoclub27/peliculas/" + val.id;
											var peli = $("#fila_1").append("<div class=\"col-sm-2\" id=\"peli_data_"+val.id+"\"></div>");

											peli = $("#peli_data_"+val.id);
											peli.append("<a class=\"logo\" href=\""+resource_url +"\">" +
															"<img class=\"icons\" src='"+val.imagen+"'>" + 
														"</a>")
											peli.append("<p><a class=\"btn btn-primary\" data-toggle=\"collapse\" href=\"#collapse_"+val.id+"\" role=\"button\" aria-expanded=\"false\" aria-controls=\"collapseExample\"> "
											+val.name+" </a></p>");
											
											peli.append(
											"<div class=\"collapse\" id=\"collapse_"+val.id+"\">"+
											"<div class=\"card card-body\" id=\"collapse_body_"+val.id+"\"> </div></div>"
											);
											
											peli = $("#collapse_body_"+val.id);
											peli.append("<h2>"+val.name+"</h2>");
											peli.append("Año: " + val.year+"</br>");
											peli.append("Director: "+ val.director+" </br>");
											peli.append("Valoración: " +val.assessment+ "</br>");
											peli.append("<p>" +
														"<a class=\"btn\" role=\"button\" href=\""+resource_url +"\">Ver película &raquo;</a>"+
														"</p>");
										});
						}else{
							$("#fila_1").remove()
							$("#contenido").append(
								"        <div class=\"row\" id=\"fila_1\">\n" +
								"		      <p>        No hay Resultados de la Búsqueda</p>" +
								"        </div>\n" 
							);
						}
					}
			});
		}else{
			$("#fila_1").remove()
			$("#contenido").append(
								"        <div class=\"row\" id=\"fila_1\">\n" +
								"		      <p>       No hay Resultados de la Búsqueda</p>" +
								"        </div>\n" 
							);
		}
	});
	$.ajax({
		url: base_url + "/myrestservice/peliculas/all",
		type: 'GET',
		success: function (data) {
			//console.log(data);
			$("#contenido").replaceWith(contenido);
			
			$.each(data, function (key, val) {
				
				resource_url = base_url + "/videoclub27/peliculas/" + val.id;
				var peli = $("#fila_1").append("<div class=\"col-sm-2\" id=\"peli_data_"+val.id+"\"></div>");

				peli = $("#peli_data_"+val.id);
				peli.append("<a class=\"logo\" href=\""+resource_url +"\">" +
								"<img class=\"icons\" src='"+val.imagen+"'>" + 
							"</a>")
				peli.append("<p><a class=\"btn btn-primary\" data-toggle=\"collapse\" href=\"#collapse_"+val.id+"\" role=\"button\" aria-expanded=\"false\" aria-controls=\"collapseExample\">"
				+val.name+" </a></p>");
				
				peli.append(
				"<div class=\"collapse\" id=\"collapse_"+val.id+"\">"+
				"<div class=\"card card-body\" id=\"collapse_body_"+val.id+"\"> </div></div>"
				);
				
				peli = $("#collapse_body_"+val.id);
				peli.append("<h2>"+val.name+"</h2>");
				peli.append("Año: " + val.year+"</br>");
				peli.append("Director: "+ val.director+" </br>");
				peli.append("Valoración: " +val.assessment+ "</br>");
				peli.append("<p>" +
							"<a class=\"btn\" role=\"button\" href=\""+resource_url +"\">Ver película &raquo;</a>"+
							"</p>");
			});
		}
	});
	
});