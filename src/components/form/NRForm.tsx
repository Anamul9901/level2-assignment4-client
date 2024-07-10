/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';

const NRForm = ({onSubmit, children}: any) => {
    const {handleSubmit} = useForm();
    return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
};

export default NRForm;