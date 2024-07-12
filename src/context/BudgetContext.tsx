import { createContext, Dispatch, ReactNode, useMemo, useReducer } from 'react';
import {
	type BudgetActions,
	budgetReducer,
	type BudgetState,
	initialState,
} from '../reducers/budget-reducer';

type BudgetContextProps = {
	state: BudgetState;
	dispatch: Dispatch<BudgetActions>;
	totalExpense: number;
	remainingBudget: number;
};

type BudgetProviderProps = {
	children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export function BudgetProvider({ children }: BudgetProviderProps) {
	const [state, dispatch] = useReducer(budgetReducer, initialState);

	const totalExpense = useMemo(
		() => state.expenses.reduce((total, expense) => expense.amount + total, 0),
		[state.expenses]
	);

	const remainingBudget = state.budget - totalExpense;

	return (
		<BudgetContext.Provider
			value={{
				state,
				dispatch,
				totalExpense,
				remainingBudget,
			}}>
			{children}
		</BudgetContext.Provider>
	);
}
