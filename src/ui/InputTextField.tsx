import { InputText } from "primereact/inputtext";

function InputTextField({label, value, setValue, type = "text"}: {label: string, value: string, setValue: (value: string) => void, type?: string}) {
    return ( 
        <div>
            <label htmlFor={label} className="block text-sm font-medium text-gray-700">{label}</label>
            <InputText id={label} name={label} value={value} onChange={(e) => setValue(e.target.value)} type={type} />
        </div>
    );
}

export default InputTextField;