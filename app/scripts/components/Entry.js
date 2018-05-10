export default {
    data: function () {
        return {
            // State et pas count pour que toutes les mutations soient détectées
            state: store.state,
			inputYear: null
        }
    },
    template: `<div class="intro_container">
                <div class="logo animated fadeInUp">
                    <img src="/assets/img/logo.svg" alt="logo" />
                    <h1>Empreinte Carbone</h1>
                </div>

                <p class="intro_p animated fadeInUp">Pour commencer, nous avons besoin de votre année de naissance :</p>
                <div class="input-field">
                    <input placeholder="ex:1994" id="birth_date" type="text" min="state.inputYear" max="state.maxYear" v-model.number="inputYear"  class="animated fadeInUp">
                </div>
                <div class="CTA animated fadeInUp"><a href="#" @click.prevent="switchToEntry2">Suivant</a></div>
            </div>`,
    methods: {
        switchToEntry2: function () {
			this.inputYear = Number(this.inputYear);
            if(typeof(this.inputYear) === "number" && this.inputYear >= 1960 && this.inputYear < 2014) {
                this.state.minYear = this.inputYear;
                this.state.currentView = 'Entry2';
            }
        }
    }
};