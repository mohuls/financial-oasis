
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
const incomeData = [
  { id: 1, amount: 25000, description: "תקבול חודשי - לקוח א", category: "סיכום חודשי", date: "2025-06-01" },
  { id: 2, amount: 3500, description: "עבודה חד פעמית", category: "סיכום יומי", date: "2025-06-05" },
  { id: 3, amount: 18000, description: "פרויקט שיפוץ", category: "סיכום חודשי", date: "2025-06-10" },
  { id: 4, amount: 5500, description: "עבודת ניקיון", category: "סיכום יומי", date: "2025-06-15" },
  { id: 5, amount: 33000, description: "חוזה חודשי - לקוח ב", category: "סיכום חודשי", date: "2025-06-20" },
];

const Income = () => {
  const [income, setIncome] = useState(incomeData);
  const [newIncome, setNewIncome] = useState({
    amount: "",
    description: "",
    category: "סיכום יומי",
    date: new Date().toISOString().split("T")[0],
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddIncome = () => {
    if (!newIncome.amount || !newIncome.description || !newIncome.date) {
      toast.error("שגיאה", { description: "נא למלא את כל השדות" });
      return;
    }

    const incomeToAdd = {
      id: income.length + 1,
      amount: Number(newIncome.amount),
      description: newIncome.description,
      category: newIncome.category,
      date: newIncome.date,
    };

    setIncome([...income, incomeToAdd]);
    setNewIncome({
      amount: "",
      description: "",
      category: "סיכום יומי",
      date: new Date().toISOString().split("T")[0],
    });
    setIsAddDialogOpen(false);
    toast.success("בוצע בהצלחה", { description: "הכנסה נוספה בהצלחה" });
  };

  const handleDeleteIncome = (id) => {
    setIncome(income.filter((item) => item.id !== id));
    toast.success("בוצע בהצלחה", { description: "הכנסה נמחקה בהצלחה" });
  };

  const handleEditIncome = () => {
    if (!editingIncome) return;

    const updatedIncome = income.map((item) => 
      item.id === editingIncome.id ? editingIncome : item
    );
    
    setIncome(updatedIncome);
    setIsEditDialogOpen(false);
    setEditingIncome(null);
    toast.success("בוצע בהצלחה", { description: "הכנסה עודכנה בהצלחה" });
  };

  return (
    <div className="container mx-auto p-4 rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">הכנסות</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>הוסף הכנסה חדשה</Button>
          </DialogTrigger>
          <DialogContent className="rtl">
            <DialogHeader>
              <DialogTitle>הוסף הכנסה חדשה</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">סכום (₪)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newIncome.amount}
                  onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
                  placeholder="הכנס סכום"
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">תיאור</Label>
                <Input
                  id="description"
                  value={newIncome.description}
                  onChange={(e) => setNewIncome({ ...newIncome, description: e.target.value })}
                  placeholder="הכנס תיאור"
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">קטגוריה</Label>
                <Select
                  value={newIncome.category}
                  onValueChange={(value) => setNewIncome({ ...newIncome, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="בחר קטגוריה" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="סיכום יומי">סיכום יומי</SelectItem>
                    <SelectItem value="סיכום חודשי">סיכום חודשי</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">תאריך</Label>
                <Input
                  id="date"
                  type="date"
                  value={newIncome.date}
                  onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddIncome}>הוסף</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>רשימת הכנסות</CardTitle>
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
              {income
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
                            setEditingIncome(item);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          ערוך
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteIncome(item.id)}
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
            <DialogTitle>ערוך הכנסה</DialogTitle>
          </DialogHeader>
          {editingIncome && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-amount">סכום (₪)</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={editingIncome.amount}
                  onChange={(e) =>
                    setEditingIncome({ ...editingIncome, amount: Number(e.target.value) })
                  }
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">תיאור</Label>
                <Input
                  id="edit-description"
                  value={editingIncome.description}
                  onChange={(e) =>
                    setEditingIncome({ ...editingIncome, description: e.target.value })
                  }
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">קטגוריה</Label>
                <Select
                  value={editingIncome.category}
                  onValueChange={(value) =>
                    setEditingIncome({ ...editingIncome, category: value })
                  }
                >
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="בחר קטגוריה" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="סיכום יומי">סיכום יומי</SelectItem>
                    <SelectItem value="סיכום חודשי">סיכום חודשי</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-date">תאריך</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editingIncome.date}
                  onChange={(e) =>
                    setEditingIncome({ ...editingIncome, date: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={handleEditIncome}>שמור שינויים</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Income;
