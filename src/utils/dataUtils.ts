
import { toast } from "sonner";

// This file will contain utility functions for working with localStorage data

export const saveData = (key: string, data: any) => {
  try {
    localStorage.setItem(`vip-finance-${key}`, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error saving data:", error);
    toast.error("שגיאה בשמירת מידע", {
      description: "אירעה שגיאה בשמירת המידע. נסה שוב.",
    });
    return false;
  }
};

export const loadData = (key: string, defaultValue: any = null) => {
  try {
    const data = localStorage.getItem(`vip-finance-${key}`);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error("Error loading data:", error);
    toast.error("שגיאה בטעינת מידע", {
      description: "אירעה שגיאה בטעינת המידע.",
    });
    return defaultValue;
  }
};

export const removeData = (key: string) => {
  try {
    localStorage.removeItem(`vip-finance-${key}`);
    return true;
  } catch (error) {
    console.error("Error removing data:", error);
    return false;
  }
};

export const createFinancialEntry = (
  collection: string,
  entry: any,
  existingData: any[] = []
) => {
  const newEntry = {
    id: existingData.length > 0 ? Math.max(...existingData.map(item => item.id)) + 1 : 1,
    ...entry
  };
  
  const updatedData = [...existingData, newEntry];
  const saved = saveData(collection, updatedData);
  
  if (saved) {
    toast.success("בוצע בהצלחה", { description: "הנתונים נשמרו בהצלחה" });
  }
  
  return saved ? updatedData : existingData;
};

export const updateFinancialEntry = (
  collection: string,
  id: number,
  updatedEntry: any,
  existingData: any[] = []
) => {
  const updatedData = existingData.map(item => 
    item.id === id ? { ...item, ...updatedEntry } : item
  );
  
  const saved = saveData(collection, updatedData);
  
  if (saved) {
    toast.success("בוצע בהצלחה", { description: "הנתונים עודכנו בהצלחה" });
  }
  
  return saved ? updatedData : existingData;
};

export const deleteFinancialEntry = (
  collection: string,
  id: number,
  existingData: any[] = []
) => {
  const updatedData = existingData.filter(item => item.id !== id);
  
  const saved = saveData(collection, updatedData);
  
  if (saved) {
    toast.success("בוצע בהצלחה", { description: "הפריט נמחק בהצלחה" });
  }
  
  return saved ? updatedData : existingData;
};
