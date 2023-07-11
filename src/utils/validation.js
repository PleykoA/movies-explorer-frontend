import { useState, useCallback } from 'react';

export function useFormValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: evt.target.validationMessage });
        setIsValid(evt.target.closest('form').checkValidity());
    };

    const resetValidation = useCallback(
        (values = {}, errors = {}, valid = false) => {
            setValues(values);
            setErrors(errors);
            setIsValid(valid);
        },
        [setValues, setIsValid, setErrors]
    );

    return {
        values,
        handleChange,
        errors,
        isValid,
        resetValidation,
        setValues,
        setIsValid
    };
}