$(document).ready(function () {
	var base_url = location.origin;
	$.ajax({
		url: base_url + "/myrestservice/peliculas/" + $(location).attr("href").split('/').pop(),
		type: 'GET',
		success: function (data) {
			$.each(data,function(key,val){
				//console.log(data)
				//url = "https://www.youtube.com/embed/DKPsbe6uGxQ"
				url= val.url
				 $("#reproductor_pelicula").empty();
				  $("#reproductor_pelicula").append(
						"	<iframe class=\"col-md-7\" width=\"100%\" height=\"450\" src=\""+url+"\" frameborder=\"0\""
						 +"allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\""
						+ "allowfullscreen></iframe>"
				  );
				  
				  
				  $("#description_pelicula").append(
				  
					"<p><strong>Título: " +val.name + "</strong></p><br>" +
					"<p><strong>Año: " + val.year +"</strong></p><br>"+
					"<p><strong>Director: "+ val.director +"</strong></p><br>"+
					"<p><strong>Valoración: "+ val.assessment  +"/10 </strong></p><br>"+
					"<p><strong>Descripción: "+ val.description  +"</strong></p><br>"
				  
				  
				  );
			});
			
		}
	});
	   
});