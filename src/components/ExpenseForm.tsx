import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';

import { categories } from '../data/categories';
import { useBudget } from '../hooks/useBudget';
import { DraftExpense, Value } from '../types';
import ErrorMessage from './ErrorMessage';

export const ExpenseForm = () => {
	const [expense, setExpense] = useState<DraftExpense>({
		amount: 0,
		expenseName: '',
		category: '',
		date: new Date(),
	});

	const [error, setError] = useState('');
	const { dispatch, state } = useBudget();

	useEffect(() => {
		if (state.editingId) {
			const editingExpense = state.expenses.filter(
				(currentExpense) => currentExpense.id === state.editingId
			)[0];
			setExpense(editingExpense);
		}
	}, [state.editingId, state.expenses]);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		const isAmountField = ['amount'].includes(name);

		setExpense({
			...expense,
			[name]: isAmountField ? parseInt(value) : value,
		});
	};

	const handleDateChange = (value: Value) => {
		setExpense({
			...expense,
			date: value,
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (Object.values(expense).includes('')) {
			setError('Todos los campos son obligatorios');
			return;
		}

		if (state.editingId) {
			dispatch({
				type: 'update-expense',
				payload: { expense: { id: state.editingId, ...expense } },
			});
		} else {
			dispatch({ type: 'add-expense', payload: { expense } });
		}
		setExpense({
			amount: 0,
			expenseName: '',
			category: '',
			date: new Date(),
		});
	};

	return (
		<form
			className='space-y-5'
			onSubmit={handleSubmit}>
			<legend className='uppercase text-center text-2xl font-black border-b-4 py-2 border-blue-500'>
				{state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}
			</legend>

			{error && <ErrorMessage>{error}</ErrorMessage>}

			<div className='flex flex-col gap-2'>
				<label
					htmlFor='expenseName'
					className='text-xl'>
					Nombre Gasto:
				</label>

				<input
					type='text'
					id='expenseName'
					placeholder='Añade el nombre del gasto'
					className='bg-slate-100 p-2'
					name='expenseName'
					value={expense.expenseName}
					onChange={handleChange}
					required
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<label
					htmlFor='amount'
					className='text-xl'>
					Cantidad:
				</label>

				<input
					type='number'
					id='amount'
					placeholder='Añade la cantidad del gasto: ej. 300'
					className='bg-slate-100 p-2'
					name='amount'
					value={expense.amount}
					onChange={handleChange}
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<label
					htmlFor='category'
					className='text-xl'>
					Categoría:
				</label>

				<select
					id='category'
					className='bg-slate-100 p-2'
					name='category'
					value={expense.category}
					onChange={handleChange}
					required>
					<option value=''>--- Seleccione ---</option>
					{categories.map(({ name, id }) => (
						<option
							value={id}
							key={id}>
							{name}
						</option>
					))}
				</select>
			</div>

			<div className='flex flex-col gap-2'>
				<label
					htmlFor='amount'
					className='text-xl'>
					Fecha Gasto:
				</label>

				<DatePicker
					className='bg-slate-100 border-0 p-2'
					value={expense.date}
					onChange={handleDateChange}
					required
				/>
			</div>

			<input
				type='submit'
				value={state.editingId ? 'Actualizar Gasto' : 'Guardar Gasto'}
				className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
			/>
		</form>
	);
};
