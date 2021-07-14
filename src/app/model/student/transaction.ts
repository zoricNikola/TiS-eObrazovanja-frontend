import { TRANSACTION_TYPE } from "./transaction-type";
import { FinancialCard } from './financial-card';

export interface Transaction {
    id?: number;
    ammount: number;
    date?: Date;
    description: string;
    type: TRANSACTION_TYPE;
    financialCard: FinancialCard;
}