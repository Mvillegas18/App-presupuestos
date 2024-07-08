import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import {
	type BudgetActions,
	budgetReducer,
	type BudgetState,
	initialState,
} from '../reducers/budget-reducer';

type BudgetContextProps = {
	state: BudgetState;
	dispatch: Dispatch<BudgetActions>;
};

type BudgetProviderProps = {
	children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export function BudgetProvider({ children }: BudgetProviderProps) {
	const [state, dispatch] = useReducer(budgetReducer, initialState);

	return (
		<BudgetContext.Provider
			value={{
				state,
				dispatch,
			}}>
			{children}
		</BudgetContext.Provider>
	);
}
