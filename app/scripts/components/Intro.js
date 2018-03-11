export default  {
    data: function () {
        return {
            // State et pas count pour que toutes les mutations soient détectées
            state: store.state
        }
    },
    template: `
            <div class="intro_container intro">
                <div class="logo animated fadeInUp"> 
                   <img src="/assets/img/gif_logo.gif" alt="logo" />
                    <h1>Empreinte Carbone</h1>
                </div>

                <p class="intro_p animated fadeInUp">On ne cesse de parler de l’augmentation du CO2 autour du globe, mais vous, où vous placez-vous dans tout ça ?<br/><br/> Reliez votre naissance à l’évolution de la courbe du CO2 pour générer quelque chose d’unique.</p>
                <div class="CTA animated fadeInUp" @click="switchToEntry"><a href="#">Démarrer</a></div>
            </div>`,
    methods: {
        switchToEntry: function () {
            this.state.currentView = 'Entry';
        }
    }
};