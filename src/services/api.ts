
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

// Function to fetch data from API
export async function fetchData(endpoint: string) {
  try {
    console.log(`Fetching data from /api/${endpoint}`);
    const response = await fetch(`/api/${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Fetched ${endpoint} data:`, data);
    
    // Handle different response formats from MirageJS
    return data.models || data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    toast.error("שגיאה בטעינת הנתונים", {
      description: `לא ניתן לטעון ${endpoint}`,
    });
    return [];
  }
}

// Function to add data to API
export async function addData(endpoint: string, data: any) {
  try {
    console.log(`Adding data to /api/${endpoint}:`, data);
    const response = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Error adding ${endpoint}: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log(`Added ${endpoint} data:`, result);
    
    toast.success("בוצע בהצלחה", {
      description: "הנתונים נוספו בהצלחה",
    });
    
    return result;
  } catch (error) {
    console.error(`Failed to add ${endpoint}:`, error);
    toast.error("שגיאה בהוספת נתונים", {
      description: "אירעה שגיאה בהוספת הנתונים",
    });
    return null;
  }
}

// Function to update data in API
export async function updateData(endpoint: string, id: number, data: any) {
  try {
    console.log(`Updating ${endpoint}/${id}:`, data);
    const response = await fetch(`/api/${endpoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Error updating ${endpoint}: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log(`Updated ${endpoint} data:`, result);
    
    toast.success("בוצע בהצלחה", {
      description: "הנתונים עודכנו בהצלחה",
    });
    
    return result;
  } catch (error) {
    console.error(`Failed to update ${endpoint}:`, error);
    toast.error("שגיאה בעדכון נתונים", {
      description: "אירעה שגיאה בעדכון הנתונים",
    });
    return null;
  }
}

// Function to delete data from API
export async function deleteData(endpoint: string, id: number) {
  try {
    console.log(`Deleting ${endpoint}/${id}`);
    const response = await fetch(`/api/${endpoint}/${id}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error(`Error deleting ${endpoint}: ${response.statusText}`);
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
    console.log("Updating fieldWorkerSalaries:", data);
    const response = await fetch(`/api/fieldWorkerSalaries`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Error updating field worker salaries: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log("Updated fieldWorkerSalaries data:", result);
    
    toast.success("בוצע בהצלחה", {
      description: "נתוני המשכורות עודכנו בהצלחה",
    });
    
    return result;
  } catch (error) {
    console.error("Failed to update field worker salaries:", error);
    toast.error("שגיאה בעדכון נתונים", {
      description: "אירעה שגיאה בעדכון נתוני המשכורות",
    });
    return null;
  }
}
