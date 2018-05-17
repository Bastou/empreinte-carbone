export default {
    data: function () {
        return {
            // State et pas count pour que toutes les mutations soient détectées
            state: store.state,
            inputYear: null,
            warnMessage: ""
        }
    },
    template: `<div class="intro_container">
                <div class="logo animated fadeInUp">
                    <img src="/assets/img/logo.svg" alt="logo" />
                    <h1>Empreinte Carbone</h1>
                </div>

                <p class="intro_p animated fadeInUp">Pour commencer, nous avons besoin de votre année de naissance :</p>
                <div class="input-field">
                    <input pouet="pouet" placeholder="ex:1994" id="birth_date" type="text" min="state.inputYear" max="state.maxYear" v-model.number="inputYear" @keyup.enter="switchToEntry2" @keyup="inputDateMask" class="animated fadeInUp">
                    <p class="input-warn-message">{{ warnMessage }}</p>
                </div>
                <div class="CTA animated fadeInUp"><a href="#" @click.prevent="switchToEntry2">Suivant</a></div>
            </div>`,
    methods: {
        inputDateMask(event) {
            //console.log(event);
            this.validateYear(event.target.value);
        },
        validateYear(year) {
            console.log(year);
            let textFormat = /^[0-9]+$/;
            if (year != 0) {

                if ((year != '') && (!textFormat.test(year))) {

                    this.warnMessage = 'Merci d\'entrer seulement des valeurs numériques';
                    //console.log("Please Enter Numeric Values Only");
                    return false;
                }

                if (year.length > 4) {
                    this.warnMessage = 'L\'année n\'est pas valide. Vérifiez à nouveau';
                    //console.log("Year is not proper. Please check");
                    return false;
                }
                let current_year=new Date().getFullYear();
                if(year.length === 4 && (year < this.state.minYear) || (year > this.state.maxYear))
                {
                    this.warnMessage = 'L\'année doit être comprise entre ' + this.state.minYear + ' et ' + this.state.maxYear;
                    //console.log("Year should be in range 1960 to 2017");
                    return false;
                }

                this.warnMessage = "";

                return true;
            }
        },
        switchToEntry2() {
            this.inputYear = Number(this.inputYear);
            if(typeof(this.inputYear) === 'number' && this.inputYear >= 1960 && this.inputYear < 2014) {
                this.state.minYear = this.inputYear;
                this.state.currentView = 'Entry2';
            } else {
                this.warnMessage = 'Year isn\'t valid';
            }
        }
    }
};