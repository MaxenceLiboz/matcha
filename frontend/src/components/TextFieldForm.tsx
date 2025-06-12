import { TextField } from "@mui/material";
import { FieldError } from "react-hook-form";

interface TextFieldFormProps {
    name: string;
    required: boolean;
    register: any;
    error: FieldError | undefined;
    serverError: any;
    isPending: boolean;
}

const TextFieldForm: React.FC<TextFieldFormProps> = ({
    name, 
    required, 
    register, 
    error, 
    serverError, 
    isPending 
}) => {

    return (
        <TextField
            label={name[0].toUpperCase() + name.slice(1)}
            type={name.toLowerCase() === 'password' ? 'password' : 'text'}
            fullWidth
            required={required}
            {...register(`${name.replaceAll(' ', '_').toLowerCase()}`, { required: `${name} is required` })}
            error={!!error || (!!serverError && (serverError.toLowerCase().includes({name})))}
            helperText={error?.message}
            disabled={isPending}
        />
    )
}

export default TextFieldForm;
