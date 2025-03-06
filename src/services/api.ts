
import { toast } from "sonner";

// Define base types for financial data
export interface FinancialItem {
  id: number;
  amount: number;
  description: string;
  date: string;
}

export interface IncomeItem extends FinancialItem {
  category: string;
}

export interface ExpenseItem extends FinancialItem {
  category: string;
}

export interface AdvanceItem extends FinancialItem {
  employee: string;
  method: string;
}

export interface OutstandingCustomerItem {
  id: number;
  name: string;
  amount: number;
  description: string;
  dueDate: string;
}

export interface FieldWorkerData {
  [year: string]: {
    [month: string]: {
      workers: string[];
      data: {
        [date: string]: {
          [worker: string]: number;
        };
      };
    };
  };
}

// Function to fetch data from db.json
export async function fetchData(endpoint: string) {
  try {
    const response = await fetch(`/api/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error fetching ${endpoint}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    toast.error("שגיאה בטעינת הנתונים", {
      description: `לא ניתן לטעון ${endpoint}`,
    });
    return [];
  }
}

// Function to add data to db.json
export async function addData(endpoint: string, data: any) {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error adding ${endpoint}`);
    }
    toast.success("בוצע בהצלחה", {
      description: "הנתונים נוספו בהצלחה",
    });
    return await response.json();
  } catch (error) {
    console.error(`Failed to add ${endpoint}:`, error);
    toast.error("שגיאה בהוספת נתונים", {
      description: "אירעה שגיאה בהוספת הנתונים",
    });
    return null;
  }
}

// Function to update data in db.json
export async function updateData(endpoint: string, id: number, data: any) {
  try {
    const response = await fetch(`/api/${endpoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error updating ${endpoint}`);
    }
    toast.success("בוצע בהצלחה", {
      description: "הנתונים עודכנו בהצלחה",
    });
    return await response.json();
  } catch (error) {
    console.error(`Failed to update ${endpoint}:`, error);
    toast.error("שגיאה בעדכון נתונים", {
      description: "אירעה שגיאה בעדכון הנתונים",
    });
    return null;
  }
}

// Function to delete data from db.json
export async function deleteData(endpoint: string, id: number) {
  try {
    const response = await fetch(`/api/${endpoint}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error deleting ${endpoint}`);
    }
    toast.success("בוצע בהצלחה", {
      description: "המחיקה בוצעה בהצלחה",
    });
    return true;
  } catch (error) {
    console.error(`Failed to delete ${endpoint}:`, error);
    toast.error("שגיאה במחיקת נתונים", {
      description: "אירעה שגיאה במחיקת הנתונים",
    });
    return false;
  }
}

// Function to update field worker salaries
export async function updateFieldWorkerSalaries(data: FieldWorkerData) {
  try {
    const response = await fetch(`/api/fieldWorkerSalaries`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error updating field worker salaries");
    }
    toast.success("בוצע בהצלחה", {
      description: "נתוני המשכורות עודכנו בהצלחה",
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to update field worker salaries:", error);
    toast.error("שגיאה בעדכון נתונים", {
      description: "אירעה שגיאה בעדכון נתוני המשכורות",
    });
    return null;
  }
}
