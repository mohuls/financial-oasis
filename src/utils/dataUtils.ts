
import db from "../data/db.json";
import { toast } from "@/components/ui/sonner";

// Generate unique IDs for new entries
export const generateId = (prefix: string) => {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).substring(2, 5)}`;
};

// General function to fetch data
export const fetchData = <T,>(key: keyof typeof db): T => {
  try {
    // Try to get from localStorage first (for persistence between sessions)
    const localData = localStorage.getItem(`vip-finance-${key}`);
    if (localData) {
      return JSON.parse(localData) as T;
    }
    // Fall back to initial data
    return db[key] as unknown as T;
  } catch (error) {
    console.error(`Error fetching ${key} data:`, error);
    return db[key] as unknown as T;
  }
};

// General function to save data
export const saveData = <T,>(key: keyof typeof db, data: T): void => {
  try {
    localStorage.setItem(`vip-finance-${key}`, JSON.stringify(data));
    toast.success("נשמר בהצלחה", {
      description: "המידע עודכן בהצלחה",
    });
  } catch (error) {
    console.error(`Error saving ${key} data:`, error);
    toast.error("שגיאה בשמירת מידע", {
      description: "נא לנסות שוב מאוחר יותר",
    });
  }
};

// Income related functions
export interface Income {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

export const fetchIncome = (): Income[] => {
  return fetchData<Income[]>("income");
};

export const saveIncome = (income: Income[]): void => {
  saveData("income", income);
};

export const addIncome = (income: Omit<Income, "id">): Income => {
  const newIncome = { ...income, id: generateId("inc") };
  const currentIncome = fetchIncome();
  saveIncome([...currentIncome, newIncome]);
  return newIncome;
};

export const updateIncome = (income: Income): void => {
  const currentIncome = fetchIncome();
  const updatedIncome = currentIncome.map((item) => (item.id === income.id ? income : item));
  saveIncome(updatedIncome);
};

export const deleteIncome = (id: string): void => {
  const currentIncome = fetchIncome();
  const filteredIncome = currentIncome.filter((item) => item.id !== id);
  saveIncome(filteredIncome);
};

// Expenses related functions
export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

export const fetchExpenses = (): Expense[] => {
  return fetchData<Expense[]>("expenses");
};

export const saveExpenses = (expenses: Expense[]): void => {
  saveData("expenses", expenses);
};

export const addExpense = (expense: Omit<Expense, "id">): Expense => {
  const newExpense = { ...expense, id: generateId("exp") };
  const currentExpenses = fetchExpenses();
  saveExpenses([...currentExpenses, newExpense]);
  return newExpense;
};

export const updateExpense = (expense: Expense): void => {
  const currentExpenses = fetchExpenses();
  const updatedExpenses = currentExpenses.map((item) => (item.id === expense.id ? expense : item));
  saveExpenses(updatedExpenses);
};

export const deleteExpense = (id: string): void => {
  const currentExpenses = fetchExpenses();
  const filteredExpenses = currentExpenses.filter((item) => item.id !== id);
  saveExpenses(filteredExpenses);
};

// Advances related functions
export interface Advance {
  id: string;
  employeeName: string;
  amount: number;
  description: string;
  paymentMethod: string;
  date: string;
}

export const fetchAdvances = (): Advance[] => {
  return fetchData<Advance[]>("advances");
};

export const saveAdvances = (advances: Advance[]): void => {
  saveData("advances", advances);
};

export const addAdvance = (advance: Omit<Advance, "id">): Advance => {
  const newAdvance = { ...advance, id: generateId("adv") };
  const currentAdvances = fetchAdvances();
  saveAdvances([...currentAdvances, newAdvance]);
  return newAdvance;
};

export const updateAdvance = (advance: Advance): void => {
  const currentAdvances = fetchAdvances();
  const updatedAdvances = currentAdvances.map((item) => (item.id === advance.id ? advance : item));
  saveAdvances(updatedAdvances);
};

export const deleteAdvance = (id: string): void => {
  const currentAdvances = fetchAdvances();
  const filteredAdvances = currentAdvances.filter((item) => item.id !== id);
  saveAdvances(filteredAdvances);
};

// Field Worker Salaries related functions
export interface WorkerSalary {
  [worker: string]: number;
}

export interface DailySalary {
  date: string;
  workers: WorkerSalary;
}

export interface FieldWorkerSalaries {
  [yearMonth: string]: DailySalary[];
}

export const fetchFieldWorkerSalaries = (): FieldWorkerSalaries => {
  return fetchData<FieldWorkerSalaries>("fieldWorkerSalaries");
};

export const saveFieldWorkerSalaries = (salaries: FieldWorkerSalaries): void => {
  saveData("fieldWorkerSalaries", salaries);
};

export const addOrUpdateDailySalary = (yearMonth: string, dailySalary: DailySalary): void => {
  const currentSalaries = fetchFieldWorkerSalaries();
  const monthSalaries = currentSalaries[yearMonth] || [];
  const existingIndex = monthSalaries.findIndex((ds) => ds.date === dailySalary.date);

  if (existingIndex >= 0) {
    monthSalaries[existingIndex] = dailySalary;
  } else {
    monthSalaries.push(dailySalary);
  }

  const updatedSalaries = {
    ...currentSalaries,
    [yearMonth]: monthSalaries,
  };

  saveFieldWorkerSalaries(updatedSalaries);
};

// Outstanding Customers related functions
export interface OutstandingCustomer {
  id: string;
  customerName: string;
  amount: number;
  description: string;
  paymentDate: string;
}

export const fetchOutstandingCustomers = (): OutstandingCustomer[] => {
  return fetchData<OutstandingCustomer[]>("outstandingCustomers");
};

export const saveOutstandingCustomers = (customers: OutstandingCustomer[]): void => {
  saveData("outstandingCustomers", customers);
};

export const addOutstandingCustomer = (customer: Omit<OutstandingCustomer, "id">): OutstandingCustomer => {
  const newCustomer = { ...customer, id: generateId("oc") };
  const currentCustomers = fetchOutstandingCustomers();
  saveOutstandingCustomers([...currentCustomers, newCustomer]);
  return newCustomer;
};

export const updateOutstandingCustomer = (customer: OutstandingCustomer): void => {
  const currentCustomers = fetchOutstandingCustomers();
  const updatedCustomers = currentCustomers.map((item) => (item.id === customer.id ? customer : item));
  saveOutstandingCustomers(updatedCustomers);
};

export const deleteOutstandingCustomer = (id: string): void => {
  const currentCustomers = fetchOutstandingCustomers();
  const filteredCustomers = currentCustomers.filter((item) => item.id !== id);
  saveOutstandingCustomers(filteredCustomers);
};
