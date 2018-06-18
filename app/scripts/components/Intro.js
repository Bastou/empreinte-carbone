export default  {
    data: function () {
        return {
            // State et pas count pour que toutes les mutations soient détectées
            state: store.state,
            textIntro: i18n.t('message.intro'),
            textBtnStart: i18n.t('message.boutonDemarrer'),
        }
    },
    template: `
            <div class="intro_container intro">
                <div class="logo animated fadeInUp"> 
                   <img src="/assets/img/gif_logo.gif" alt="logo" />
                    <h1>Empreinte Carbone</h1>
                </div>
                <p class="intro_p animated fadeInUp" v-html="textIntro"><p>
                <div class="animated fadeInUp">
                    <div ref="cta" class="CTA" @click="switchToEntry"><a href="#" v-html="textBtnStart"></a></div>
                </div>
            </div>`,
    methods: {
        switchToEntry() {
            this.state.currentView = 'Entry';
        },
        // attractButton() {
        //     const btn = this.$refs.cta;
        //     new AttractButton(btn);
        // }
    },
    mounted() {
        // Store mounted
        store.onMounted();

        console.log(i18n.t('message.greeting', { name: 'kazupon' })); // -> hola kazupon
        console.log(window.i18n.tc('message.pain'));
    }
};