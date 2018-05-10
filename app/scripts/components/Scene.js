export default  {
    data: function () {
        return {
            // State et pas count pour que toutes les mutations soient détectées
            state: store.state
        }
    },
    template: `
<div>
            <header>
                <div class="logo_main">
                    <img src="/assets/img/logo.svg" alt="Logo Empreinte Carbonne" />
                    <a href="index.html">Empreinte Carbone</a>
                </div>
                <div class="localisation">
                    <img src="/assets/img/pin_light.svg" alt="Localisation" />
                    <div class="input-field">
                        <v-select id="scene-localisation" placeholder="France" v-model.lazy="state.country" :options="state.countries"></v-select>
                    </div>

                </div>
            </header>
            <div class="value_container">
                
                <p>Emissions de CO2</p>
                <div class="timeline__value">{{ state.co2 }}</div>
                <p>Kilotonnes</p>
                
            </div>
            <div class="bigYear">{{ state.year }}</div>

            <timeline></timeline>

            <div class="galery_button">
               <img src="/assets/img/galerie.svg" alt="galerie" height="20" width="20"/>
                <a href="#">Galerie</a>
            </div>
            
            <div class="ctas">
                <div class="CTA animated fadeInUp"><a href="#">Exporter une image</a></div><br/>
                <div class="CTA animated fadeInUp"><a href="#">Imprimer en 3D</a></div>
            </div>
            <div id="scene"></div>
</div>`,
    mounted: function () {
    	// Get timeline dom
		store.$timeline = document.getElementById('timeline__range')
		store.$timeline.addEventListener("focus", () => {
			this.state.timelineUpdating = true;
			clearInterval(handleAnimateTl);
		});
		store.$timeline.addEventListener("blur", () => {
			this.state.timelineUpdating = false;
			console.log("blur");
		});

		// Handle Animate interval
		let handleAnimateTl = null;


		// Init 3d scene
        app.scene3D.init(() => {
			// if(this.state.timelineUpdating) return
			// setTimeout(() => {
			// 	handleAnimateTl = setInterval(() => {
			// 		let tlNextVal = parseInt(store.$timeline.value) + 1;
			// 		if(tlNextVal <= this.state.maxYear) {
			// 			//console.log(tlNextVal === parseInt(this.state.maxYear) - 1)
			// 			store.$timeline.value =  tlNextVal
			// 			this.state.year = tlNextVal
			// 			//console.log(tlNextVal)
			// 		} else {
			// 			clearInterval(handleAnimateTl)
			// 		}
			// 	},110)
			// }, 1500)
		});

        // Animate timeline

    }
};
