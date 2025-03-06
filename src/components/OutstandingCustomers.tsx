
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

// Sample data - would come from your db.json in real app
const customersData = [
  { id: 1, name: "מלון הים התיכון", amount: 12500, description: "תשלום על שירותי ניקיון מיוחדים", dueDate: "2025-07-15" },
  { id: 2, name: "משרדי אופק", amount: 4800, description: "יתרת חוב על עבודות תחזוקה", dueDate: "2025-07-10" },
  { id: 3, name: "מרכז קניות רמת אביב", amount: 8750, description: "חוב עבור שירותי ניקיון חודשיים", dueDate: "2025-07-25" },
  { id: 4, name: "בניין משרדים הרצליה פיתוח", amount: 6200, description: "תשלום עבור עבודות מיוחדות", dueDate: "2025-08-05" },
];

const OutstandingCustomers = () => {
  const [customers, setCustomers] = useState(customersData);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    amount: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.amount || !newCustomer.description || !newCustomer.dueDate) {
      toast.error("שגיאה", { description: "נא למלא את כל השדות" });
      return;
    }

    const customerToAdd = {
      id: customers.length + 1,
      name: newCustomer.name,
      amount: Number(newCustomer.amount),
      description: newCustomer.description,
      dueDate: newCustomer.dueDate,
    };

    setCustomers([...customers, customerToAdd]);
    setNewCustomer({
      name: "",
      amount: "",
      description: "",
      dueDate: new Date().toISOString().split("T")[0],
    });
    setIsAddDialogOpen(false);
    toast.success("בוצע בהצלחה", { description: "לקוח נוסף בהצלחה" });
  };

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter((item) => item.id !== id));
    toast.success("בוצע בהצלחה", { description: "לקוח נמחק בהצלחה" });
  };

  const handleEditCustomer = () => {
    if (!editingCustomer) return;

    const updatedCustomers = customers.map((item) => 
      item.id === editingCustomer.id ? editingCustomer : item
    );
    
    setCustomers(updatedCustomers);
    setIsEditDialogOpen(false);
    setEditingCustomer(null);
    toast.success("בוצע בהצלחה", { description: "פרטי לקוח עודכנו בהצלחה" });
  };

  return (
    <div className="container mx-auto p-4 rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">לקוחות עם חובות</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>הוסף לקוח חדש</Button>
          </DialogTrigger>
          <DialogContent className="rtl">
            <DialogHeader>
              <DialogTitle>הוסף לקוח חדש עם חוב</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">שם לקוח</Label>
                <Input
                  id="name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="הכנס שם לקוח"
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">סכום חוב (₪)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newCustomer.amount}
                  onChange={(e) => setNewCustomer({ ...newCustomer, amount: e.target.value })}
                  placeholder="הכנס סכום"
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">תיאור</Label>
                <Input
                  id="description"
                  value={newCustomer.description}
                  onChange={(e) => setNewCustomer({ ...newCustomer, description: e.target.value })}
                  placeholder="הכנס תיאור"
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">תאריך תשלום</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newCustomer.dueDate}
                  onChange={(e) => setNewCustomer({ ...newCustomer, dueDate: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddCustomer}>הוסף</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>רשימת לקוחות עם חובות</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">שם לקוח</TableHead>
                <TableHead className="text-right">תיאור</TableHead>
                <TableHead className="text-right">תאריך תשלום</TableHead>
                <TableHead className="text-right">סכום חוב (₪)</TableHead>
                <TableHead className="text-right">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{new Date(item.dueDate).toLocaleDateString("he-IL")}</TableCell>
                    <TableCell className="font-bold">₪{item.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingCustomer(item);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          ערוך
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteCustomer(item.id)}
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
            <DialogTitle>ערוך פרטי לקוח</DialogTitle>
          </DialogHeader>
          {editingCustomer && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">שם לקוח</Label>
                <Input
                  id="edit-name"
                  value={editingCustomer.name}
                  onChange={(e) =>
                    setEditingCustomer({ ...editingCustomer, name: e.target.value })
                  }
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-amount">סכום חוב (₪)</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={editingCustomer.amount}
                  onChange={(e) =>
                    setEditingCustomer({ ...editingCustomer, amount: Number(e.target.value) })
                  }
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">תיאור</Label>
                <Input
                  id="edit-description"
                  value={editingCustomer.description}
                  onChange={(e) =>
                    setEditingCustomer({ ...editingCustomer, description: e.target.value })
                  }
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-dueDate">תאריך תשלום</Label>
                <Input
                  id="edit-dueDate"
                  type="date"
                  value={editingCustomer.dueDate}
                  onChange={(e) =>
                    setEditingCustomer({ ...editingCustomer, dueDate: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={handleEditCustomer}>שמור שינויים</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OutstandingCustomers;
