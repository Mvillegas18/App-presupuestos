import { useMemo } from 'react';
import { useBudget } from '../hooks/useBudget';
import AmountDisplay from './AmountDisplay';

export default function BudgetTracker() {
	const { state } = useBudget();

	const totalExpense = useMemo(
		() => state.expenses.reduce((total, expense) => expense.amount + total, 0),
		[state.expenses]
	);

	const reminingBudget = state.budget - totalExpense;

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
			<div className='flex justify-center'>
				<img
					src='/grafico.jpg'
					alt='Grafico que identifica el porcentaje de los gastos'
				/>
			</div>

			<div className='flex flex-col justify-center items-center gap-8'>
				<button className='bg-red-600 w-full p-2 text-white uppercase font-bold rounded-lg'>
					Resetear App
				</button>

				<AmountDisplay
					label='Presupuesto'
					amount={state.budget}
				/>
				<AmountDisplay
					label='Disponible'
					amount={reminingBudget}
				/>
				<AmountDisplay
					label='Gastado'
					amount={totalExpense}
				/>
			</div>
		</div>
	);
}
