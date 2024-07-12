import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useBudget } from '../hooks/useBudget';
import AmountDisplay from './AmountDisplay';

export default function BudgetTracker() {
	const { remainingBudget, totalExpense, state, dispatch } = useBudget();
	const percentage = +((totalExpense / state.budget) * 100).toFixed(2);

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
			<div className='flex justify-center'>
				<CircularProgressbar
					value={percentage}
					styles={buildStyles({
						pathColor: percentage === 100 ? '#D62626' : '#3b82f6',
						trailColor: '#F5F5F5',
						textSize: 8,
						textColor: percentage === 100 ? '#D62626' : '#3b82f6',
					})}
					text={`${percentage}%`}
				/>
			</div>

			<div className='flex flex-col justify-center items-center gap-8'>
				<button
					className='bg-red-600 w-full p-2 text-white uppercase font-bold rounded-lg'
					onClick={() => dispatch({ type: 'reset-app' })}>
					Resetear App
				</button>

				<AmountDisplay
					label='Presupuesto'
					amount={state.budget}
				/>
				<AmountDisplay
					label='Disponible'
					amount={remainingBudget}
				/>
				<AmountDisplay
					label='Gastado'
					amount={totalExpense}
				/>
			</div>
		</div>
	);
}
