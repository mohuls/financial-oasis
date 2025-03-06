
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { fetchData, addData, updateData, deleteData, AdvanceItem } from "../services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const employeeOptions = ["צח", "בן", "רועי", "אוראל"];
const paymentMethodOptions = ["מזומן", "צ'ק", "אשראי", "העברה בנקאית"];

const Advances = () => {
  const [newAdvance, setNewAdvance] = useState({
    employee: "צח",
    amount: "",
    description: "",
    method: "מזומן",
    date: new Date().toISOString().split("T")[0],
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAdvance, setEditingAdvance] = useState<AdvanceItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const queryClient = useQueryClient();
  
  // Fetch advances data
  const { data: advances = [], isLoading } = useQuery({
    queryKey: ['advances'],
    queryFn: () => fetchData('advances'),
  });

  // Add advance mutation
  const addAdvanceMutation = useMutation({
    mutationFn: (newItem: Omit<AdvanceItem, "id">) => {
      return addData('advances', newItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advances'] });
      setIsAddDialogOpen(false);
      setNewAdvance({
        employee: "צח",
        amount: "",
        description: "",
        method: "מזומן",
        date: new Date().toISOString().split("T")[0],
      });
    }
  });

  // Update advance mutation
  const updateAdvanceMutation = useMutation({
    mutationFn: (advance: AdvanceItem) => {
      return updateData('advances', advance.id, advance);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advances'] });
      setIsEditDialogOpen(false);
      setEditingAdvance(null);
    }
  });

  // Delete advance mutation
  const deleteAdvanceMutation = useMutation({
    mutationFn: (id: number) => {
      return deleteData('advances', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advances'] });
    }
  });

  const handleAddAdvance = () => {
    if (!newAdvance.amount || !newAdvance.description || !newAdvance.date) {
      toast.error("שגיאה", { description: "נא למלא את כל השדות" });
      return;
    }

    const advanceToAdd = {
      employee: newAdvance.employee,
      amount: Number(newAdvance.amount),
      description: newAdvance.description,
      method: newAdvance.method,
      date: newAdvance.date,
    };

    addAdvanceMutation.mutate(advanceToAdd);
  };

  const handleDeleteAdvance = (id: number) => {
    deleteAdvanceMutation.mutate(id);
  };

  const handleEditAdvance = () => {
    if (!editingAdvance) return;
    updateAdvanceMutation.mutate(editingAdvance);
  };

  return (
    <div className="container mx-auto p-4 rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">מקדמות</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>הוסף מקדמה חדשה</Button>
          </DialogTrigger>
          <DialogContent className="rtl">
            <DialogHeader>
              <DialogTitle>הוסף מקדמה חדשה</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="employee">שם עובד</Label>
                <Select
                  value={newAdvance.employee}
                  onValueChange={(value) => setNewAdvance({ ...newAdvance, employee: value })}
                >
                  <SelectTrigger id="employee">
                    <SelectValue placeholder="בחר עובד" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeOptions.map((employee) => (
                      <SelectItem key={employee} value={employee}>
                        {employee}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">סכום (₪)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newAdvance.amount}
                  onChange={(e) => setNewAdvance({ ...newAdvance, amount: e.target.value })}
                  placeholder="הכנס סכום"
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">תיאור</Label>
                <Input
                  id="description"
                  value={newAdvance.description}
                  onChange={(e) => setNewAdvance({ ...newAdvance, description: e.target.value })}
                  placeholder="הכנס תיאור"
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="method">אמצעי תשלום</Label>
                <Select
                  value={newAdvance.method}
                  onValueChange={(value) => setNewAdvance({ ...newAdvance, method: value })}
                >
                  <SelectTrigger id="method">
                    <SelectValue placeholder="בחר אמצעי תשלום" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethodOptions.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
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
                  value={newAdvance.date}
                  onChange={(e) => setNewAdvance({ ...newAdvance, date: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={handleAddAdvance}
                disabled={addAdvanceMutation.isPending}
              >
                {addAdvanceMutation.isPending ? "מוסיף..." : "הוסף"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>רשימת מקדמות</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center p-4">טוען נתונים...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">תאריך</TableHead>
                  <TableHead className="text-right">שם עובד</TableHead>
                  <TableHead className="text-right">תיאור</TableHead>
                  <TableHead className="text-right">אמצעי תשלום</TableHead>
                  <TableHead className="text-right">סכום (₪)</TableHead>
                  <TableHead className="text-right">פעולות</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {advances
                  .sort((a: AdvanceItem, b: AdvanceItem) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((item: AdvanceItem) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {new Date(item.date).toLocaleDateString("he-IL")}
                      </TableCell>
                      <TableCell>{item.employee}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.method}</TableCell>
                      <TableCell className="font-bold">₪{item.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingAdvance(item);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            ערוך
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteAdvance(item.id)}
                            disabled={deleteAdvanceMutation.isPending}
                          >
                            מחק
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>ערוך מקדמה</DialogTitle>
          </DialogHeader>
          {editingAdvance && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-employee">שם עובד</Label>
                <Select
                  value={editingAdvance.employee}
                  onValueChange={(value) =>
                    setEditingAdvance({ ...editingAdvance, employee: value })
                  }
                >
                  <SelectTrigger id="edit-employee">
                    <SelectValue placeholder="בחר עובד" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeOptions.map((employee) => (
                      <SelectItem key={employee} value={employee}>
                        {employee}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-amount">סכום (₪)</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={editingAdvance.amount}
                  onChange={(e) =>
                    setEditingAdvance({ ...editingAdvance, amount: Number(e.target.value) })
                  }
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">תיאור</Label>
                <Input
                  id="edit-description"
                  value={editingAdvance.description}
                  onChange={(e) =>
                    setEditingAdvance({ ...editingAdvance, description: e.target.value })
                  }
                  className="text-right"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-method">אמצעי תשלום</Label>
                <Select
                  value={editingAdvance.method}
                  onValueChange={(value) =>
                    setEditingAdvance({ ...editingAdvance, method: value })
                  }
                >
                  <SelectTrigger id="edit-method">
                    <SelectValue placeholder="בחר אמצעי תשלום" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethodOptions.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
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
                  value={editingAdvance.date}
                  onChange={(e) =>
                    setEditingAdvance({ ...editingAdvance, date: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button 
              onClick={handleEditAdvance}
              disabled={updateAdvanceMutation.isPending}
            >
              {updateAdvanceMutation.isPending ? "שומר..." : "שמור שינויים"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Advances;
