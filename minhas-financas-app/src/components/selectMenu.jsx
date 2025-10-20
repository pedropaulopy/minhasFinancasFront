import React from "react";

function SelectMenu(props){
    const options = props.Lista.map(option => {
        return(
            <option key={option.value} value={option.value}>{option.label}</option>
        )
    })
        return (
            <select {...props}>
                {options}
            </select>
        )
}

export default SelectMenu