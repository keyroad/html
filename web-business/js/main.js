/*Patron de modulo*/
$(function(){
	var SliderModule = (function() {
		var pb = {};
		pb.element = $('#slider');
		pb.items  = {
			panel: pb.element.find('li')
		}
		//Variables necesarias
		var SliderInterval,
			currentSlider = 0,
			nextSlider = 1,
			lengthSlider = pb.items.panel.length;

		//Inicializar
		pb.init = function(settings) {
			this.settings = settings || {duration: 8000}
			var output = '';
			//Activamos el slider
			SliderInit();

			for(var i = 0; i<lengthSlider;i++){
				if (i == 0) {
					output += '<li class="active"></li>';
				} else {
					output += '<li></li>';
				}
			}

			
			//Controles del slider
			$('#slider-controls').html(output).on('click', 'li', function (e){
				var $this = $(this);
				if (currentSlider !== $this.index()) {
					changePanel($this.index());
				};
				
			});
		}

		var SliderInit = function(){
			SliderInterval = setInterval(pb.startSlider, pb.settings.duration);

		}

		pb.startSlider = function(){
			var panels = pb.items.panel,
				controls = $('#slider-controls li');

			/*Comprobamos si es la ultima imagen para regresar a la primera */ 
			if (nextSlider >= lengthSlider) {
				nextSlider = 0;
				currentSlider = lengthSlider-1;
			};
			//Efectos
			controls.removeClass('active').eq(nextSlider).addClass('active');
			panels.eq(currentSlider).fadeOut('slow');
			panels.eq(nextSlider).fadeIn('slow');

			//Actualizamos los datos
			currentSlider = nextSlider;
			nextSlider +=1;
		}

		//Funcion para constroles del slider
		var changePanel = function(id){
			clearInterval(SliderInterval);
			var panels = pb.items.panel,
				controls = $('#slider-controls li');
			//Comprobar el ID 
			if (id >= lengthSlider) {
				id = 0;
			} else if (id < 0){
				id = lengthSlider-1;
			}

			//Efectos
			controls.removeClass('active').eq(id).addClass('active');
			panels.eq(currentSlider).fadeOut('slow');
			panels.eq(id).fadeIn('slow');

			//Actualizamos nuestros datos
			currentSlider = id;
			nextSlider = id+1;

			//Reactivar slider
			SliderInit();
		}
		return pb;

	}());
	SliderModule.init({duration: 2000});
});