export default {
    data: function () {
        return {
            // State et pas count pour que toutes les mutations soient détectées
            state: store.state,
            textinstructionPays: i18n.t('message.instructionPays'),
        }
    },
    template: `
            <div class="intro_container">
                <div class="logo animated fadeInUp">
                    <img src="/assets/img/logo.svg" alt="logo" />
                    <h1>Empreinte Carbone</h1>
                </div>

                <p class="intro_p animated fadeInUp" v-html="textinstructionPays"></p>
                <div class="input-field animated fadeInUp">
                    <v-select id="localisation" placeholder="ex:France" v-model.lazy="state.country" :options="state.countries" @keyup.enter="switchToMain" autofocus></v-select>
                </div>
                <div class="animated fadeInUp">
                    <div class="CTA"><a href="#" @click.prevent="switchToMain">Voir les résultats</a></div>
                </div>
            </div>`,
    watch: {
        'state.country': function () {
            setTimeout(this.switchToMain, 80); // Little timeout to see input change
        }
    },
    methods: {
        switchToMain() {
            this.state.currentView = 'Scene';
        }
    },
    mounted() {
        // Store mounted
        store.onMounted();

        // const inputSearch = document.querySelectorAll('#localisation input')[0];
        // inputSearch.focus();
        // inputSearch.addEventListener("focus", function( event ) {
        //     event.target.style.background = "pink";
        // }, true);
        //this.$refs.VueSelect.$refs.search.focus()
    }
};