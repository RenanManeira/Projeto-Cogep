class Validator {
    constructor() {
        this.validations = [
            'data-min-length',
        ];
    }

    // iniciar a validação de todos os campos
    validate(form) {
        // pegar os inputs
        let inputs = form.getElementsByTagName('input');

        // transformar uma HTMLCollection -> array
        let inputsArray = [...inputs];

        // loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function (input) {
            // loop em todas as validações existentes
            for (let i = 0; this.validations.length > i; i++) {
                if (input.getAttribute(this.validations[i]) !== null) {
                    let method = this.validations[i].replace('data-', '').replace('-', '');
                    let value = input.getAttribute(this.validations[i]);
                    this[method](input, value);
                }
            }
        }.bind(this)); // Vincula a instância da classe Validator ao callback
    }

    minlength(input, minValue) {
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if (inputLength < minValue) {
            console.log(errorMessage);
        }
    }
}

let form = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

// evento de envio do form, que valida os inputs
submit.addEventListener('click', function (e) {
    e.preventDefault();
    validator.validate(form);
});
