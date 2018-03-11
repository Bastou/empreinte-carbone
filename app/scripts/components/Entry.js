export default {
    data: function () {
        return {
            // State et pas count pour que toutes les mutations soient détectées
            state: store.state
        }
    },
    template: `<div class="intro_container">
                <div class="logo animated fadeInUp">
                    <img src="/assets/img/logo.svg" alt="logo" />
                    <h1>Empreinte Carbone</h1>
                </div>

                <p class="intro_p animated fadeInUp">Pour commencer, nous avons besoin de votre année de naissance :</p>
                <div class="input-field">
                    <input placeholder="ex:1994" id="birth_date" type="text" v-model.lazy="state.minYear"  class="animated fadeInUp">
                </div>
                <div class="CTA animated fadeInUp"><a href="#" @click.prevent="switchToEntry2">Suivant</a></div>
            </div>`,
    methods: {
        switchToEntry2: function () {
            let inputYear = Number(this.state.minYear);
            if(typeof(inputYear) === "number" && inputYear >= 1960 && inputYear < 2014) {
                this.state.minYear = inputYear;
                this.state.currentView = 'Entry2';
            }
        }
    }
};