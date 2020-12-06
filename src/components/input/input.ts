import Component, { ComponentProps } from '../../app/js/component';

export default class Input extends Component.Default {
    name: string = '';
    nInput: HTMLInputElement;
    divError: HTMLElement;
    hasError: boolean;
    regs: object;
    textErr: object;

    constructor(element: ComponentProps) {
        super(element);
        this.nInput = this.nRoot.querySelector('input');
        this.name = this.nInput.name;
        this.divError = this.getElement('error').component;
        this.hasError = false;

        this.regs = {
            name : /[А-Я]?[а-я]+\s[А-Я]?[а-я]+/,
            tel : /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
            email : /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        }

        this.textErr = {
            name: 'Некорректное имя',
            tel: 'Некорректный номер телефона',
            email: 'Некорректный адрес почты'
        }

        this.nInput.addEventListener('input', this.getValidate);
    }

    getValidate = () => {
        if (this.nInput.required) {
            const type = this.name as keyof object;
            if (this.regs[type]) {
                return this.validate(this.regs[type]);
            } else {
                return this.defaultValidate();
            }
        }
        
        return this.hasError;
    }

    validate = (reg: RegExp) => {
        let value = this.nInput.value.trim();
        const check = reg.test(value);

        if (!check) {
            this.divError.classList.add('show');
            this.hasError = true;
            this.nInput.classList.add('err');
            let text = this.name as keyof object;
            this.nInput.classList.remove('fill');
            if (value == '') {
                this.divError.innerHTML = 'Заполните поле';
            } else {
                this.divError.innerHTML = `${this.textErr[text]}`;
            }
        } else {
            this.deleteError();
        }

        return this.hasError;
    }

    defaultValidate = () => {
        const value = this.nInput.value.trim();

        if (value == "") {
            this.divError.classList.add('show');
            this.nInput.classList.remove('fill');
            this.hasError = true;
            this.nInput.classList.add('err');
            this.divError.innerHTML = 'Заполните поле';
        } else {
            this.deleteError();
        }

        return this.hasError;
    }

    deleteError = () => {
        this.nInput.classList.add('fill');
        this.divError.classList.remove('show');
        this.nInput.classList.remove('err');
        this.divError.innerHTML = '';
        this.hasError = false;
    }

    getName = (): string => this.nInput.name;

    getValue = (): string => this.nInput.value.trim();

    destroy = () => {
        // Destroy functions
    }
}


        // switch (this.name) {
        //     case 'email':
        //         this.emailValidate(this.nInput);
        //         break;
        //     case 'tel':
        //         this.telValidate(this.nInput);
        //         break;
        //     case 'name':
        //         this.nameValidate(this.nInput);
        //         break;
        //     default:
        //         this.defaultValidate(this.nInput);
        //         break;}

    // emailValidate = (input: any) => {
    //     const reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    //     const value = input.value.trim();
    //     const check = reg.test(value);

    //     if (!check) {
    //         this.hasError = true;
    //         this.nInput.classList.add('err');
    //         this.divError.classList.add('show');
    //         this.divError.innerHTML = 'Некорректная почта';

    //     }
    // }

    // telValidate = (input: any) => {
    //     const reg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    //     const value = input.value.trim();
    //     const check = reg.test(value);

    //     if (!check) {
    //         this.hasError = true;
    //         this.nInput.classList.add('err');
    //         this.divError.classList.add('show');
    //         this.divError.innerHTML = 'Некорректный телефон';
    //     }
    // }

    // nameValidate = (input: any) => {
    //     const reg = /[А-Я][а-я]+\s[А-Я][а-я]+/;

    //     const value = input.value.trim();
    //     const check = reg.test(value);

    //     if (!check) {
    //         this.hasError = true;
    //         this.nInput.classList.add('err');
    //         this.divError.classList.add('show');
    //         this.divError.innerHTML = 'Некорректное имя и фамилия';
    //     }
    // }