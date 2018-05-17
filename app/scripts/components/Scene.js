export default  {
    data: function () {
        return {
            // State et pas count pour que toutes les mutations soient détectées
            state: store.state,
            hasNoCo2: false
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
                <div class="timeline__value__wrapper" v-bind:class="{ noCo2: hasNoCo2 }">
                    <div class="timeline__value">{{ state.co2 }}</div>
                    <div class="timeline__value-message">{{ state.messages.noCo2 }}</div>
                </div>
                
                <p>Kilotonnes</p>
                
            </div>
            <div class="bigYear">{{ state.year }}</div>

            <timeline ref="timeline"></timeline>

            <div class="galery_button disabled" title="bientôt disponible ! 🤘">
               <img src="/assets/img/galerie.svg" alt="galerie" height="20" width="20"/>
                <a href="#">Galerie</a>
            </div>
            
            <div class="ctas">
                <div class="CTA animated fadeInUp"><a href="#">Exporter une image</a></div><br/>
                <!--<div class="CTA animated fadeInUp"><a href="#">Imprimer en 3D</a></div>-->
            </div>
            <div id="scene"></div>
</div>`,
    methods: {
      timelinePulsate() {
          console.log();
          let handleAnimPulsate = setInterval(() => {
              if (!this.state.timelineUpdating) {
                  this.$refs.timeline.$el.classList.add("pulsatethumb");
                  setTimeout(() => {
                      this.$refs.timeline.$el.classList.remove("pulsatethumb");
                  }, 300);
              } else {
                  clearInterval(handleAnimPulsate);
              }
          }, 2000)
      },
        timelinePlay() {
            // Handle Animate interval
            let handleAnimateTl = null;
            const btnPlay = this.$refs.timeline.$refs.tlPlayBtn; //.$refs.tlPlayBtn.$el;
            if(this.state.timelineUpdating) return;

            btnPlay.addEventListener('click', () => {
                if(btnPlay.classList.contains("active")) {
                    stopTlPlay();
                } else {
                    btnPlay.classList.add("active");
                    handleAnimateTl = setInterval(() => {
                        if (this.state.timelineUpdating) {
                            console.log('clear handle animate');
                            stopTlPlay();
                        }

                    	let tlNextVal = parseInt(store.$timeline.value) + 1;
                    	if(tlNextVal <= this.state.maxYear) {
                    		//console.log(tlNextVal === parseInt(this.state.maxYear) - 1)
                    		store.$timeline.value =  tlNextVal;
                    		this.state.year = tlNextVal;
                    		//console.log(tlNextVal)
                    	} else {
                            stopTlPlay();
                    	}
                    },110)
                }
            });

            function stopTlPlay() {
                clearInterval(handleAnimateTl);
                btnPlay.classList.remove("active");
            }

            // handleAnimateTl = setInterval(() => {
            // 	let tlNextVal = parseInt(store.$timeline.value) + 1;
            // 	if(tlNextVal <= this.state.maxYear) {
            // 		//console.log(tlNextVal === parseInt(this.state.maxYear) - 1)
            // 		store.$timeline.value =  tlNextVal
            // 		this.state.year = tlNextVal
            // 		//console.log(tlNextVal)
            // 	} else {
            // 		clearInterval(handleAnimateTl)
            // 	}
            // },110)
        },
        manageCo2Display(val) {
            if(val === 0 && this.year !== 0) {
                this.hasNoCo2 = true;
            } else {
                this.hasNoCo2 = false;
            }
        }
    },
    watch: {
        'state.co2': function (val) {
            console.log('watch co2');
            this.manageCo2Display(val);
        }
    },
    mounted: function () {
        //
        // if(this.state.co2 === 0 && this.year !== 0) {
        //     this.state.co2 = this.state.messages.noCo2;
        // }
        this.manageCo2Display(this.state.co2);

        this.timelinePulsate();
        this.timelinePlay();

    	// Get timeline dom
		store.$timeline = document.getElementById('timeline__range')
		store.$timeline.addEventListener("focus", () => {
			this.state.timelineUpdating = true;
			//clearInterval(handleAnimateTl);
		});
		store.$timeline.addEventListener("blur", () => {
			this.state.timelineUpdating = false;
			console.log("blur");
		});



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
