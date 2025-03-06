
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

// Sample data - would come from your db.json in real app
const expensesData = [
  { id: 1, amount: 15000, description: "משכורות עובדים", category: "משכורות", date: "2025-06-02" },
  { id: 2, amount: 2500, description: "החזר ללקוח - תיקון דלת", category: "החזרים ללקוחות", date: "2025-06-08" },
  { id: 3, amount: 5000, description: "רכישת חומרי ניקוי", category: "חומרים, ציוד ותיקונים", date: "2025-06-12" },
  { id: 4, amount: 3500, description: "פרסום בפייסבוק", category: "שיווק ופיתוח", date: "2025-06-18" },
  { id: 5, amount: 1200, description: "ארוחות צוות", category: "הוצאות לא נחוצות", date: "2025-06-22" },
  { id: 6, amount: 2000, description: "ציוד משרדי", category: "הוצאות משרד", date: "2025-06-25" },
];

const categoryOptions = [
  "משכורות",
  "החזרים ללקוחות",
  "חומרים, ציוד ותיקונים",
  "שיווק ופיתוח",
  "הוצאות לא נחוצות",
  "הוצאות משרד",
];

const Expenses = () => {
  const [expenses, setExpenses] = useState(expensesData);
  const [newExpense, setNewExpense] = useState({
    amount: "",
    description: "",
    category: "משכורות",
    date: new Date().toISOString().split("T")[0],
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.description || !newExpense.date) {
      toast.error("שגיאה", { description: "נא למלא את כל השדות" });
      return;
    }

    const expenseToAdd = {
      id: expenses.length + 1,
      amount: Number(newExpense.amount),
      description: newExpense.description,
      category: newExpense.category,
      date: newExpense.date,
    };

    setExpenses([...expenses, expenseToAdd]);
    setNewExpense({
      amount: "",
      description: "",
      category: "משכורות",
      date: new Date().toISOString().split("T")[0],
    });
    setIsAddDialogOpen(false);
    toast.success("בוצע בהצלחה", { description: "הוצאה נוספה בהצלחה" });
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id));
    toast.success("בוצע בהצלחה", { description: "הוצאה נמחקה בהצלחה" });
  };

  const handleEditExpense = () => {
    if (!editingExpense) return;

    const updatedExpenses = expenses.map((item) => 
      item.id === editingExpense.id ? editingExpense : item
    );
    
    setExpenses(updatedExpenses);
    setIsEditDialogOpen(false);
    setEditingExpense(null);
    toast.success("בוצע בהצלחה", { description: "הוצאה עודכנה בהצלחה" });
  };

  return (
    <div className="container mx-auto p-4 rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">הוצאות</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>הוסף הוצאה חדשה</Button>
          </DialogTrigger>
          <DialogContent className="rtl">
            <DialogHeader>
              <DialogTitle>הוסף הוצאה חדשה</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">סכום (₪)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  placeholder="הכנס סכום"
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">תיאור</Label>
                <Input
                  id="description"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  placeholder="הכנס תיאור"
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">קטגוריה</Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="בחר קטגוריה" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">תאריך</Label>
                <Input
                  id="date"
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddExpense}>הוסף</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>רשימת הוצאות</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">תאריך</TableHead>
                <TableHead className="text-right">תיאור</TableHead>
                <TableHead className="text-right">קטגוריה</TableHead>
                <TableHead className="text-right">סכום (₪)</TableHead>
                <TableHead className="text-right">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {new Date(item.date).toLocaleDateString("he-IL")}
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="font-bold">₪{item.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingExpense(item);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          ערוך
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteExpense(item.id)}
                        >
                          מחק
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>ערוך הוצאה</DialogTitle>
          </DialogHeader>
          {editingExpense && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-amount">סכום (₪)</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={editingExpense.amount}
                  onChange={(e) =>
                    setEditingExpense({ ...editingExpense, amount: Number(e.target.value) })
                  }
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">תיאור</Label>
                <Input
                  id="edit-description"
                  value={editingExpense.description}
                  onChange={(e) =>
                    setEditingExpense({ ...editingExpense, description: e.target.value })
                  }
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">קטגוריה</Label>
                <Select
                  value={editingExpense.category}
                  onValueChange={(value) =>
                    setEditingExpense({ ...editingExpense, category: value })
                  }
                >
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="בחר קטגוריה" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-date">תאריך</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editingExpense.date}
                  onChange={(e) =>
                    setEditingExpense({ ...editingExpense, date: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={handleEditExpense}>שמור שינויים</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Expenses;
