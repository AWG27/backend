

$(document).ready(function () {
    var contenido = $.form_contenido();
    var base_url = location.origin;

    /*********************************************************************************************
     *********************************************************************************************
     VISTA PELICULAS
     *********************************************************************************************
     **********************************************************************************************/

    $("#peliculas").click(function () {
		$("#mensaje_administrador").remove();
        $("#boton-crear").replaceWith(
				$.form_boton_crear("añadir video")
            );

        var modal_titulo = $("#titulo-crear");
        modal_titulo.empty();
        modal_titulo.append("Video");

        var modal_cuerpo = $("#modal-cuerpo");
        modal_cuerpo.empty();
        modal_cuerpo.append(
            $.form_crear_pelicula()
        );


        var contenido_tabla = $("#contenido");
        contenido_tabla.replaceWith(contenido);
        contenido_tabla = $("#contenido");

        var csrftoken = $.cookie('csrftoken');
        function csrfSafeMethod(method) { return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method)); }

        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });

        $("#guardar_peli").click(function () {
            //console.log("guardar_peli")
            key = -1
            content = {
                "name": $('#crear_name_pelicula').val(),
                "year": $('#crear_year_pelicula').val(),
                "director": $('#crear_director_pelicula').val(),
                "assessment": $('#crear_assessment_pelicula').val(),
                "url": "" + $('#crear_url_pelicula').val(),
                "imagen": "" + $('#crear_imagen_pelicula').val(),
                "description": " " + $('#crear_description_pelicula').val(),
                "repartos": " " + $('#crear_repartos_pelicula').val()
            };
			//console.log(content)
					$.ajax({
						url: base_url + "/myrestservice/peliculas",
						type: 'PUT',
						contentType: 'application/json',
						data: JSON.stringify(content),
						success: function (data) {
							key = data.id
							contenido_tabla.append(
								$.contenido_modificar_video(data)
							);
							$("#boton-modificar-" + key).click(function () {
								var modal_modificar = $("#titulo-modificar");
								modal_modificar.empty();
								modal_modificar.append("Modificar " + data.name);
								var modal_cuerpo_modificar = $("#modal-cuerpo-modificar");
								modal_cuerpo_modificar.empty();
								modal_cuerpo_modificar.append(
											$.form_modificar_pelicula(data)
								);
								$("#mpguardar").click(function () {
									//console.log("modifcar: name=" + $("#modificar_name__pelicula").val())
									content = {
										"id": data.id,
										"year": $("#modificar_year_pelicula").val(),
										"name": $("#modificar_name__pelicula").val(),
										"director": $("#modificar_director_pelicula").val(),
										"assessment": $("#modificar_assessment_pelicula").val(),
										"url": $("#modificar_url_pelicula").val(),
										"imagen": "" + $('#modificar_imagen_pelicula').val(),
										"description": " " + $('#modificar_description_pelicula').val(),
										"repartos": " " + $('#modificar_repartos_pelicula').val()
									};
									$.ajax({
										url: base_url + "/myrestservice/peliculas/" + data.id,
										type: 'POST',
										contentType: 'application/json',
										data: JSON.stringify(content),
										success: function (data) {
											//console.log("POST modificar ok")
											$("#video_" + data.id).empty()
											$("#video_" + data.id).append(
												$.contenido_modificar_video_th(data,key)
											   )
										}
									});
								});
							});
							$("#boton-eliminar" + key).click(function () {
								alert("¿ Esta seguro de eliminar \"" + data.name + "\" ?");
								$.ajax({
									url: base_url + "/myrestservice/peliculas/" + key,
									type: 'DELETE',
									success: function (data) {
										//console.log("se ha eleminado correctamente!")
									}
								});
								$("#video_" + key).remove();
							});
						}
					});
        });


        $("#titulo-tabla").append("Videos");
        $.ajax({ url: base_url + "/myrestservice/peliculas/all" }).then(function (data) {
            //   $.getJSON("scripts/test_videos.json", function (data) {
				//console.log("wESTA" + data[0])
            $.each(data, function (key, val) {
                key = val.id
                //console.log("key: " + key + ", value:" + val.name);
                contenido_tabla.append(
					$.contenido_modificar_video(val)
                );

                $("#boton-modificar-" + key).click(function () {
                    var modal_modificar = $("#titulo-modificar");
                    modal_modificar.empty();
                    modal_modificar.append("Modificar " + val.name);
                    var modal_cuerpo_modificar = $("#modal-cuerpo-modificar");
                    modal_cuerpo_modificar.empty();
					//console.log("AQUI "+ val.description)
                    modal_cuerpo_modificar.append(
								$.form_modificar_pelicula(val)
                    );
                    $("#mpguardar").click(function () {
                        //console.log("modifcar: name=" + $("#modificar_name__pelicula").val())
                        content = {
                            "id": val.id,
                            "year": $("#modificar_year_pelicula").val(),
                            "name": $("#modificar_name__pelicula").val(),
                            "director": $("#modificar_director_pelicula").val(),
                            "assessment": $("#modificar_assessment_pelicula").val(),
                            "url": $("#modificar_url_pelicula").val(),
							"imagen": "" + $('#modificar_imagen_pelicula').val(),
							"description": " " + $('#modificar_description_pelicula').val(),
							"repartos": " " + $('#modificar_repartos_pelicula').val()
                        };
                        $.ajax({
                            url: base_url + "/myrestservice/peliculas/" + val.id,
                            type: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify(content),
                            success: function (data) {
                                //console.log("POST modificar ok")
                                $("#video_" + data.id).empty()
                                $("#video_" + data.id).append(
									$.contenido_modificar_video_th(data,key)
                                   )
                            }
                        });
                    });
                });

                $("#boton-eliminar" + key).click(function () {
                    alert("¿ Esta seguro de eliminar \"" + val.name + "\" ?");
                    $.ajax({
                        url: base_url + "/myrestservice/peliculas/" + key,
                        type: 'DELETE',
                        success: function (data) {
                            //console.log("se ha eleminado correctamente!")
                        }
                    });
                    $("#video_" + key).remove();
                });
                //console.log("hace algo 1")
            });
        });

    });


    /*********************************************************************************************
     *********************************************************************************************
     VISTA USUARIOS
     *********************************************************************************************
     *********************************************************************************************/

    $("#usuarios").click(function () {
		$("#mensaje_administrador").remove();
        $("#boton-crear").replaceWith(
		$.form_boton_crear("crear usuario"));

        var modal_titulo = $("#titulo-crear");
        modal_titulo.empty();
        modal_titulo.append("Usuario");

        var modal_cuerpo = $("#modal-cuerpo");
        modal_cuerpo.empty();
        modal_cuerpo.append(
            $.form_crear_usuario()
        );

        var contenido_tabla = $("#contenido");
        contenido_tabla.replaceWith(contenido);
        contenido_tabla = $("#contenido");

        var csrftoken = $.cookie('csrftoken');
        function csrfSafeMethod(method) { return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method)); }

        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });

        $("#guardar_usuario").click(function () {
            //console.log("guardar_usuario")
            key = -1
            content = {
                "name": $('#name_usuario').val(),
                "email": $('#email_usuario').val(),
                "password": $('#password_usuario').val(),
                "tipo": $('#tipo_usuario').val()
            };
            $.ajax({
                url: base_url + "/myrestservice/perfiles",
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(content),
                success: function (data) {
                    key = data.name
                    contenido_tabla.append(
                        $.contenido_modificar_usuario(data,key)
                    );
					
					$("#boton-modificar-" + key).click(function () {
                    var modal_modificar = $("#titulo-modificar");
                    modal_modificar.empty();
                    modal_modificar.append("Modificar " + data.name);
                    var modal_cuerpo_modificar = $("#modal-cuerpo-modificar");
                    modal_cuerpo_modificar.empty();
                    modal_cuerpo_modificar.append(
					$.form_modificar_usuario(data));
                    $("#muguardar").click(function () {
                        content = {
                            "name": $('#modificar_name_usuario').val(),
                            "email": $('#modificar_email_usuario').val(),
                            "password": $('#modificar_password_usuario').val(),
                            "tipo": $('#modificar_tipo_usuario').val()
                        };

                        $.ajax({
                            url: base_url + "/myrestservice/perfiles/" + data.name,
                            type: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify(content),
                            success: function (data) {
                                $("#usuario_" + key).remove();
                                contenido_tabla.append(
                                    $.contenido_modificar_usuario(data,data.name)
                                );
                                key = data.name;
                                $("#boton-eliminar" + key).click(function () {
                                    alert("¿ Esta seguro de eliminar \"" + data.name + "\" ?");
                                    $.ajax({
                                        url: base_url + "/myrestservice/perfiles/" + key,
                                        type: 'DELETE',
                                        success: function (data) {
                                            //console.log("se ha eleminado correctamente!")
                                        }
                                    });
                                    $("#usuario_" + key).remove();
                                });
                            }
                        });
                    });
                });
					
					$.boton_eliminar("boton-eliminar",key, data.name);
                }
            });// end ajax method PUT
        });


        $("#titulo-tabla").append("Videos");
        $.ajax({ url: base_url + "/myrestservice/perfiles/all" }).then(function (data) {
            //   $.getJSON("scripts/test_videos.json", function (data) {
            $.each(data, function (key, val) {
                key = val.name
                contenido_tabla.append(
                   $.contenido_modificar_usuario(val,val.name) 
                );

                $("#boton-modificar-" + key).click(function () {
                    var modal_modificar = $("#titulo-modificar");
                    modal_modificar.empty();
                    modal_modificar.append("Modificar " + val.name);
                    var modal_cuerpo_modificar = $("#modal-cuerpo-modificar");
                    modal_cuerpo_modificar.empty();
                    modal_cuerpo_modificar.append(
					$.form_modificar_usuario(val));
                    $("#muguardar").click(function () {
                        content = {
                            "name": $('#modificar_name_usuario').val(),
                            "email": $('#modificar_email_usuario').val(),
                            "password": $('#modificar_password_usuario').val(),
                            "tipo": $('#modificar_tipo_usuario').val()
                        };

                        $.ajax({
                            url: base_url + "/myrestservice/perfiles/" + val.name,
                            type: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify(content),
                            success: function (data) {
                                //console.log("POST modificar perfiles ok")
                                //console.log(data)
                                //console.log("entra " + data.name)
                                $("#usuario_" + key).remove();
                                contenido_tabla.append(
                                    $.contenido_modificar_usuario(data,data.name)
                                );
                                val.name = data.name;
                                key = data.name;
                                $("#boton-eliminar" + key).click(function () {
                                    alert("¿ Esta seguro de eliminar \"" + val.name + "\" ?");
                                    $.ajax({
                                        url: base_url + "/myrestservice/perfiles/" + key,
                                        type: 'DELETE',
                                        success: function (data) {
                                            //console.log("se ha eleminado correctamente!")
                                        }
                                    });
                                    $("#usuario_" + key).remove();
                                });
                            }
                        });
                    });
                });
				
				$.boton_eliminar("boton-eliminar",key, val.name);
            });
        });

    });
});
