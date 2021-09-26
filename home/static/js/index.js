
/**
 * Event Handler for the Window Load Event
 */
 window.onload = () => {

    /**
     * Prevent non-numeric inputs
     * @param {number} keyCode The Key Code returned by the Browser
     * @returns True indicates the input is numeric
     */
    const isNumeric = (keyCode) => Constant.Value.NUMERIC_INPUT.some(k => k === keyCode);

    /**
     * Event Handler for the Key Down Event
     * @param {event} event Then Event Object returned by the Browser
     * @returns True indicates the input is numeric, otherwise discard
     */
    const input_onkeydown = (event) => {

        Constant.HTMLElement.result.innerHTML = 'Press button to calculate the addition';
        if (isNumeric(event.keyCode) === false) { // Ensure value is numeric
            event.preventDefault();
            return false; // Discard input                    
        }
    }

    /**
     * Hide/Show animated Icon
     */
    const toggleVisibility = () => {
        if (Constant.HTMLElement.imgLoader.style.visibility === Constant.Value.HIDDEN) {
            Constant.HTMLElement.imgLoader.style.visibility = Constant.Value.VISIBLE;
        } else {
            Constant.HTMLElement.imgLoader.style.visibility = Constant.Value.HIDDEN;
        }
    }

    /**
     * Event Handler for the Click Event
     */
    const btn_onclick = () => {

        if (isValidateInput(Constant.HTMLElement.first, Constant.HTMLElement.second, Constant.HTMLElement.result)) {

            const operation = Constant.HTMLElement.cboOperation.value;
            //calculate(first.value, second.value, displayResult, eval(operation));

            calculate(first.value, second.value, displayResult, operation, csrfToken.innerText);

            Constant.HTMLElement.result.innerHTML = "Please wait ....";
            toggleVisibility();
        }
    }

    /**
     * Callback to display results
     * @param {number} rst The result of the operation
     */
    const displayResult = (rst) => {
        console.log('Entering callback');
        Constant.HTMLElement.result.innerHTML = `The result is <strong>${rst}</strong>`;
        console.log('Exiting callback');
        toggleVisibility();
    }

    /**
     * Verify that data is entered
     * @param {HTMLInputElement} fst First number (HTML Element Input text)
     * @param {HTMLInputElement} snd Second number (HTML Element Input text)
     * @param {HTMLParagraphElement} rst Result container (HTML Element)
     * @returns True indicates that both input are numeric
     */
    const isValidateInput = (fst, snd, rst) => {
        const arr = [snd, fst];
        let isOk = true;
        arr.forEach(item => {
            if (item.value.trim().length === 0) {
                rst.innerHTML = `The field <b>${item.id}</b> is invalid input`;
                item.focus();
                isOk = false;
            }
        });

        return isOk;
    }

    /**
     * Start the calculation asynchronized
     * @param {number} x First  number
     * @param {number} y Second number
     * @param {CallableFunction} callback The function that will display the result
     * @param {CallableFunction} operation To be performed (e.g., Add. Multiply ...)
     * @param {string} token CSRF Token
     */
    const calculate = (x, y, callback, operation, token) => {
        console.log('Entering calculating');

        setTimeout(() => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'calculate/');
    
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('X-CSRFToken', token);
            xhr.responseType = 'json';
            xhr.onload = () => {
    
                console.log(xhr.response);
                callback(xhr.response.result);
            }
    
            xhr.error = () => {
                alert(xhr.statusText);
            }
    
            const data = { 
                first: x, 
                second: y, 
                operation: operation
            };
            const parms = JSON.stringify(data);
    
            xhr.send(parms);  
        }, Constant.Value.ASYNC_DELAY);


        console.log('Exiting calculate');
    }

    
    /**
     * Hide/Display the image
     */
    toggleVisibility();

 

    /**
     * Attach Event Handlers
     */
    Constant.HTMLElement.first.onkeydown = input_onkeydown;
    Constant.HTMLElement.second.onkeydown = input_onkeydown;
    Constant.HTMLElement.btn.onclick = btn_onclick;

}