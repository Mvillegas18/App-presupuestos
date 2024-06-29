import { useState } from 'react';

export default function BudgetForm() {
	const [budget, setBudget] = useState(0);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBudget(e.target.valueAsNumber);
	};

	return (
		<form className='space-y-5'>
			<div className='flex flex-col space-y-5'>
				<label
					htmlFor='budget'
					className='text-4xl text-blue-600 font-bold text-center'>
					Definir presupuesto
				</label>

				<input
					id='budget'
					type='number'
					className='w-full bg-white border border-gray-200 p-2'
					placeholder='Ejemplo: 3000'
					name='budget'
					value={budget}
					onChange={handleChange}
				/>
			</div>

			<input
				type='submit'
				value='Definir presupuesto'
				className='bg-blue-600 hover:bg-blue-700 w-full text-white p-2 cursor-pointer font-black uppercase'
			/>
		</form>
	);
}
