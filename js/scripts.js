class Validator {
    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-email-validate',
            'data-equal',
            'data-password-validate',
        ];
    }

    // iniciar a validação de todos os campos
    validate(form) {

        //resgatar  as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);

        }
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
            this.printMessage(input, errorMessage);
        }
    }

    //método de validação de email
    emailvalidate(input){

        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um e-mail no padrão @gmail.com ou @outlook.com`;

        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }

    }

    //verifica se o input é requerido
    required(input) {

        let inputValue = input.value;

        if(inputValue === '') {
            let errorMessage = `O campo é obrigatório`;

            this.printMessage(input, errorMessage,)
        }
    }

    //Verifica se os dois campos de senhas foram preenchidos iguais
    equal(input, inputName) {

        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Este campo precisa estar igual ao da ${inputName}.`;

        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    //Valida o campo de senha
    passwordvalidate(input) {
        let charArr = input.value.split('');

        let uppercases = 0;
        let numbers = 0;
    

        for(let i = 0; charArr.length > i; i++){
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            } else if(!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }

        if(uppercases === 0 || numbers === 0) {
            let errorMessage = `A senha precisa de um caractere maiúsculo e um número`

            this.printMessage(input, errorMessage);
        }
    }

    //método para imprimir os erros na tela
    printMessage(input,msg) {

        let errorsQty = input.parentNode.querySelector('.error-validation');

        if(errorsQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }
    }

    //Limpa as validações da tela
    cleanValidations(validations) {
        validations.forEach(e1 => e1.remove());
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
