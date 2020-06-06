$(document).ready(function () {
	
		  $.form_contenido = function(){
			return " <table id=\"contenido\">\
							<tr>\
                                <th id=\"titulo-tabla\"></th>\
                                <th>Acción</th>\
                            </tr>\
                      </table>";
		  }
		  $.form_boton_crear = function(nombre){
			 return "<div class=\"row\" id=\"boton-crear\">\
                        <a class=\"btn\" data-toggle=\"modal\" data-target=\"#modal-boton-crear\"> \
                            "+nombre+" \
                            <span class=\"glyphicon glyphicon-plus\"></span> \
                        </a>\
                    </div>";
		  };
          $.form_modificar_pelicula = function(val){
			  return 	"<form>\n" +
                        "  <div class=\"form-group\">\n" +
                        "    <label>Nombre de la pelicula</label>\n" +
                        "    <input type=\"text\" class=\"form-control\" id=\"modificar_name__pelicula\" value=\""+val.name+"\" placeholder=\"" + val.name + "\">\n" +
                        "  </div>\n" +
                        "  <div class=\"form-group\">\n" +
                        "    <label>Url del contenido</label>\n" +
                        "    <input type=\"text\" class=\"form-control\" id=\"modificar_url_pelicula\" value=\""+val.url+"\" placeholder=\"" + val.url + "\">\n" +
                        "  </div>\n" +

                        "  <div class=\"form-group\">\n" +
                        "    <label>Año</label>\n" +
                        "    <input type=\"text\" class=\"form-control\" id=\"modificar_year_pelicula\" value=\""+val.year+"\" placeholder=\"" + val.year + "\">\n" +
                        "  </div>\n" +

                        "  <div class=\"form-group\">\n" +
                        "    <label>Director</label>\n" +
                        "    <input type=\"text\" class=\"form-control\" id=\"modificar_director_pelicula\" value=\""+val.director+"\" placeholder=\"" + val.director + "\">\n" +
                        "  </div>\n" +

                        "  <div class=\"form-group\">\n" +
                        "    <label>Valoracion</label>\n" +
                        "    <input type=\"text\" class=\"form-control\" id=\"modificar_assessment_pelicula\" value=\""+val.assessment+"\" placeholder=\"" + val.assessment + "\">\n" +
                        "  </div>\n" +
						
					    "  <div class=\"form-group\">\n" +
                        "    <label>Url de la portada</label>\n" +
                        "    <input type=\"text\" class=\"form-control\" id=\"modificar_imagen_pelicula\" value=\""+val.imagen+"\" placeholder=\"" + val.imagen + "\">\n" +
                        "  </div>\n" +
						
						"  <div class=\"form-group\">\n" +
                        "    <label>Repartos</label>\n" +
                        "    <textarea type=\"text\" class=\"form-control\" id=\"modificar_repartos_pelicula\" value=\""+val.repartos+"\" placeholder=\"" + val.repartos + "\" ></textarea>\n" +
                        "  </div>\n" +
						
						"  <div class=\"form-group\">\n" +
                        "    <label>Descripción</label>\n" +
                        "    <textarea type=\"text\" class=\"form-control\" id=\"modificar_description_pelicula\" value=\""+val.description+"\" placeholder=\"" + val.description + "\" ></textarea>\n" +
                        "  </div>\n" +

                        " <button type=\"submit\" class=\"btn\" data-dismiss=\"modal\" id=\"mpguardar\">Modificar</button>\n" +
                        "</form>";
						
		  };
		  $.form_crear_pelicula = function(){
			  return "<form>\n" +
						"  <div class=\"form-group\">\n" +
						"    <label>Nombre de la pelicula</label>\n" +
						"    <input type=\"text\" class=\"form-control\" id=\"crear_name_pelicula\" name='name' placeholder=\"insertar título\">\n" +
						"  </div>\n" +
						"  <div class=\"form-group\">\n" +
						"    <label>Url del contenido</label>\n" +
						"    <input type=\"text\" class=\"form-control\" id=\"crear_url_pelicula\" name='url' placeholder=\"url embeded *iframe*\">\n" +
						"  </div>\n" +

						"  <div class=\"form-group\">\n" +
						"    <label>Año</label>\n" +
						"    <input type=\"text\" class=\"form-control\" id=\"crear_year_pelicula\" name='year' placeholder=\"" + "\">\n" +
						"  </div>\n" +

						"  <div class=\"form-group\">\n" +
						"    <label>Director</label>\n" +
						"    <input type=\"text\" class=\"form-control\" id=\"crear_director_pelicula\" name='director' placeholder=\"" + "\">\n" +
						"  </div>\n" +

						"  <div class=\"form-group\">\n" +
						"    <label>Valoracion</label>\n" +
						"    <input type=\"text\" class=\"form-control\" id=\"crear_assessment_pelicula\" name='assessment' placeholder=\"0-10" + "\">\n" +
						"  </div>\n" +
						
						"  <div class=\"form-group\">\n" +
                        "    <label>Url de la portada</label>\n" +
                        "    <input type=\"text\" class=\"form-control\" id=\"crear_imagen_pelicula\" name='imagen'  placeholder=\" url de la portada" + "\">\n" +
                        "  </div>\n" +
						
						"  <div class=\"form-group\">\n" +
                        "    <label>Repartos</label>\n" +
                        "    <textarea  class=\"form-control\" id=\"crear_repartos_pelicula\"  name='repartos' placeholder=\"repartos" + "\"></textarea>\n" +
                        "  </div>\n" +
						
						"  <div class=\"form-group\">\n" +
                        "    <label>Descripción</label>\n" +
                        "    <textarea  class=\"form-control\" id=\"crear_description_pelicula\"  name='description' placeholder=\"descripcion" + "\"></textarea>\n" +
                        "  </div>\n" +
						" <button type=\"submit\" class=\"btn\" data-dismiss=\"modal\" id=\"guardar_peli\">Añadir</button>\n" +
						"</form>";
		  };
		  
		  $.form_crear_usuario =  function(){         
					  return "<form>\n" +
						"  <div class=\"form-group\">\n" +
						"    <label>Nombre</label>\n" +
						"    <input type=\"text\" class=\"form-control\" id=\"name_usuario\" placeholder=\"introducir nombre\">\n" +
						"  </div>\n" +
						"  <div class=\"form-group\">\n" +
						"    <label >Correo electrónico</label>\n" +
						"    <input type=\"email\" class=\"form-control\" id=\"email_usuario\" aria-describedby=\"emailHelp\" placeholder=\"example@correoelectronico.com\">\n" +
						"  </div>\n" +
						"  <div class=\"form-group\">\n" +
						"    <label>Contraseña</label>\n" +
						"    <input type=\"password\" class=\"form-control\" id=\"password_usuario\" placeholder=\"contraseña\">\n" +
						"  </div>\n" +
						"  <div class=\"form-group\">\n" +
						"    <label>Tipo [user-admin]</label>\n" +
						"    <input type=\"text\" class=\"form-control\" id=\"tipo_usuario\" placeholder=\"admin/user \">\n" +
						"  </div>\n" +
						" <button type=\"submit\" class=\"btn\" data-dismiss=\"modal\" id=\"guardar_usuario\">Guardar</button>\n" +
						"</form>";
		  };
		  
		  $.form_modificar_usuario =  function(val){ 
				return "<form>\n" +
                        "  <div class=\"form-group\">\n" +
                        "    <label>Nombre</label>\n" +
                        "    <input type=\"text\" class=\"form-control\" id=\"modificar_name_usuario\" value=\""+val.name+"\" placeholder=\"" + val.name + "\">\n" +
                        "  </div>\n" +
                        "  <div class=\"form-group\">\n" +
                        "    <label >Correo electrónico</label>\n" +
                        "    <input type=\"email\" class=\"form-control\" id=\"modificar_email_usuario\" " +
                        "aria-describedby=\"emailHelp\" value=\""+val.email+"\" placeholder=\"" + val.email + "\">\n" +
                        "  </div>\n" +
                        "  <div class=\"form-group\">\n" +
                        "    <label>Contraseña</label>\n" +
                        "    <input type=\"password\" class=\"form-control\" id=\"modificar_password_usuario\" placeholder=\"contraseña\">\n" +
                        "  </div>\n" +
                        "  <div class=\"form-group\">\n" +
                        "    <label>Tipo [user-admin]</label>\n" +
                        "    <input type=\"text\" class=\"form-control\" id=\"modificar_tipo_usuario\" value=\""+val.tipo+"\" placeholder=\"admin/user\">\n" +
                        "  </div>\n" +
                        " <button type=\"submit\" class=\"btn\" data-dismiss=\"modal\" id=\"muguardar\">Modificar</button>\n" +
                        "</form>";
		  };
		  $.contenido_modificar_video =  function(data){ 
		    return " <tr class=\"highlight\" id=\"video_" + data.id + "\">\
						 <td>" + data.name + "</td>\
						 <td>\
						 <a class=\"btn boton-moficar\" id=\"boton-modificar-"+ data.id + "\" data-toggle=\"modal\" data-target=\"#modal-boton-modificar\">modificar</a>\
						 \<a class=\"btn boton\" id=\"boton-eliminar"+ data.id + "\">eliminar</a> \
						 </td>\
						 </tr>";
		  };
		  $.contenido_modificar_usuario =  function(data,key){ 
		    return   " <tr class=\"highlight\" id=\"usuario_" + key + "\">\
				 <td>" + data.name + "</td>\
				 <td>\
				 <a class=\"btn boton-moficar\" id=\"boton-modificar-"+ key + "\" data-toggle=\"modal\" data-target=\"#modal-boton-modificar\">modificar</a>\
				 \<a class=\"btn boton\" id=\"boton-eliminar"+ key + "\">eliminar</a> \
				 </td>\
				 </tr>"
		  };
		  $.contenido_modificar_video_th = function(data,key){ 
		  return " <td>" + data.name + "</td>\
		                           <td>\
		                               <a class=\"btn boton-moficar\" id=\"boton-modificar-"+ key + "\" data-toggle=\"modal\" data-target=\"#modal-boton-modificar\">modificar</a>\
		                               \<a class=\"btn boton\" id=\"boton-eliminar" + key + "\">eliminar</a> \
		                           </td>\
		                       </tr>";
		  };
		  
						
});