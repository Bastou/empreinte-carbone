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
        app.scene3D.init();
    }
};
