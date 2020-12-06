import Component, { ComponentProps } from '../../app/js/component';

export default class Textarea extends Component.Default {
    nTextarea: HTMLTextAreaElement;
    name: string = '';
    divError: HTMLElement;
    hasError: boolean;
    
    constructor(element: ComponentProps) {
        super(element);
        this.nTextarea = this.nRoot.querySelector('textarea');
        this.name = this.nTextarea.name;
        this.divError = this.getElement('error').component;
        this.hasError = false;

        this.nTextarea.addEventListener('input', this.checkField);
    }

    checkField = () => {
        let message = this.nTextarea.value.trim();

        if (this.nTextarea.required) {
            if (message == '') {
                this.divError.classList.add('show');
                this.hasError = true;
                this.nTextarea.classList.add('err');
                this.divError.innerHTML = 'Заполните форму';
                this.nTextarea.classList.remove('fill');
            } else {
                this.nTextarea.classList.add('fill');
                this.divError.classList.remove('show');
                this.nTextarea.classList.remove('err');
                this.divError.innerHTML = '';
                this.hasError = false;
            }
        }

        return this.hasError;
    }

    getMessage = (): string => this.nTextarea.value.trim();

    getName = (): string => this.nTextarea.name;

    destroy = () => {
        // Destroy functions
    }
}