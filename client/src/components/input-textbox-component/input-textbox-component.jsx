import React from 'react'
import './input-textbox.css'

function InputTextBox({placeholder = ''}) {
    return(
        <div className="inputTextBoxContainer">
            <input
                className="inputTextBox"
                type="text"
                placeholder={placeholder}
            />
        </div>
    );
}

export default InputTextBox