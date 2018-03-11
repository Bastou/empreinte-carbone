export default {
    data: function () {
        return {
            // State et pas count pour que toutes les mutations soient détectées
            state: store.state
        }
    },
    template: `
            <div class="intro_container">
                <div class="logo animated fadeInUp">
                    <img src="/assets/img/logo.svg" alt="logo" />
                    <h1>Empreinte Carbone</h1>
                </div>

                <p class="intro_p animated fadeInUp">Afin de rendre ça encore plus personnalisé,
nous avons besoin de votre pays de naissance :</p>
                <div class="input-field animated fadeInUp">
                    <v-select id="localisation" placeholder="ex:France" v-model.lazy="state.country" :options="state.countries"></v-select>
                </div>
                <div class="CTA animated fadeInUp "><a href="#" @click.prevent="switchToMain">Voir les résultats</a></div>
            </div>`,
    methods: {
        switchToMain: function () {
            this.state.currentView = 'Scene';
        }
    }
};