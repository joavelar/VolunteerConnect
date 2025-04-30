import React from 'react'
import './input-textbox.css'

function InputTextBox({placeholder = ''}) {
    return(
            <input
                className="inputTextBox"
                type="text"
                placeholder={placeholder}
            />
    );
}

export default InputTextBox