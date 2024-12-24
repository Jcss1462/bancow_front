import React from 'react';
import { useForm } from 'react-hook-form';

function CreateSimulationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Create/Update Simulation</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('title')}
          placeholder="Title"
        />
        <input
          type="number"
          {...register('amount', { required: true })}
          placeholder="Amount"
        />
        {errors.amount && <span>This field is required</span>}
        <select {...register('paymentTerm', { required: true })}>
          <option value="monthly">Monthly</option>
          <option value="annual">Annual</option>
        </select>
        <input type="date" {...register('startDate', { required: true })} />
        <input type="date" {...register('endDate', { required: true })} />
        <button type="submit">Calculate</button>
      </form>
    </div>
  );
}

export default CreateSimulationForm;
