import { useMemo } from 'react';
import { useBudget } from '../hooks/useBudget';
import { ExpenseDetail } from './ExpenseDetail';

export default function ExpenseList() {
	const { state } = useBudget();

	const { expenses } = state;

	const isEmpty = useMemo(() => expenses.length === 0, [expenses]);
	return (
		<div className='mt-10'>
			{isEmpty ? (
				<p className='text-gray-600 text-2xl font-bold'>No hay gastos</p>
			) : (
				<>
					<p className='text-gray-600 font-bold text-2xl my-5'>
						Listado de Gastos
					</p>

					{expenses.map((expense) => (
						<ExpenseDetail
							key={expense.id}
							expense={expense}
						/>
					))}
				</>
			)}
		</div>
	);
}
