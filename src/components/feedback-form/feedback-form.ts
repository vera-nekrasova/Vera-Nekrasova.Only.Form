import Component, { ComponentProps } from '../../app/js/component';
import Input from '../input/input';
import Textarea from '../textarea/textarea';
const axios = require('axios');

export default class FeedbackForm extends Component.Default {
    nInputs: Input[];
    nTextarea: Textarea[]; //обычно в форме бывает только один textarea, но мало ли, пусть будет массив
    nButton: HTMLElement;

    constructor(element: ComponentProps) {
        super(element);
        this.nInputs = this.getElements('input').map(input => new Input(input));
        this.nTextarea = this.getElements('textarea').map(el => new Textarea(el));
        this.nButton = this.getElement('button').component;
        this.nButton.addEventListener('click', this.collectData);
    }

    collectData = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();

        const data: any = {};
        let error: boolean = false;

        this.nInputs.forEach(link => {
            if (!link.getValidate()) {
                data[link.getName()] = link.getValue();
            } else {
                error = true;
            }
        });
        this.nTextarea.forEach(el => {
            if (!el.checkField()) {
                data[el.getName()] = el.getMessage();
            } else {
                error = true;
            }
        });
        
        if (!error) this.sendData(data);
    }

    sendData = (data: object) => {
        axios.post('/', data)
            .then((response: any) => console.log(response))
            .catch((error: any) => console.log(error))
    }


    destroy = () => {
        // Destroy functions
    }
}