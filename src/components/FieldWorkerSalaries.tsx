
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Sample data - would come from your db.json in real app
const initialWorkers = ["שלמה", "אבי", "שקד", "מאיר", "מאי", "יעקב"];

const FieldWorkerSalaries = () => {
  const [currentMonth, setCurrentMonth] = useState("6"); // June
  const [currentYear, setCurrentYear] = useState("2025");
  const [workers, setWorkers] = useState(initialWorkers);
  
  // Generate dates for the current month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };
  
  const daysInMonth = getDaysInMonth(parseInt(currentYear), parseInt(currentMonth));
  
  // Initialize salary data structure
  const [salaryData, setSalaryData] = useState(() => {
    const data = {};
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentYear}-${currentMonth.padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      data[dateKey] = {};
      
      workers.forEach(worker => {
        // Generate random values between 250-310 for sample data
        data[dateKey][worker] = Math.floor(Math.random() * (310 - 250 + 1)) + 250;
      });
    }
    
    return data;
  });

  const handleSalaryChange = (date, worker, value) => {
    const numValue = value === "" ? "" : Number(value);
    
    setSalaryData(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [worker]: numValue
      }
    }));
  };

  const calculateTotalForWorker = (worker) => {
    let total = 0;
    Object.keys(salaryData).forEach(date => {
      const value = salaryData[date][worker];
      if (typeof value === 'number') {
        total += value;
      }
    });
    return total;
  };

  const calculateTotalForDate = (date) => {
    let total = 0;
    Object.keys(salaryData[date] || {}).forEach(worker => {
      const value = salaryData[date][worker];
      if (typeof value === 'number') {
        total += value;
      }
    });
    return total;
  };

  const calculateGrandTotal = () => {
    let total = 0;
    workers.forEach(worker => {
      total += calculateTotalForWorker(worker);
    });
    return total;
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  const addNewWorker = () => {
    const name = prompt("הכנס שם עובד חדש:");
    if (name && name.trim() !== "") {
      setWorkers([...workers, name.trim()]);
      
      // Add the new worker to each date in salaryData with default 0
      const updatedSalaryData = { ...salaryData };
      Object.keys(updatedSalaryData).forEach(date => {
        updatedSalaryData[date][name.trim()] = 0;
      });
      
      setSalaryData(updatedSalaryData);
      toast.success("בוצע בהצלחה", { description: "עובד חדש נוסף בהצלחה" });
    }
  };

  const saveChanges = () => {
    // Here you would typically save to your database or localStorage
    toast.success("בוצע בהצלחה", { description: "נתוני משכורות נשמרו בהצלחה" });
  };

  return (
    <div className="container mx-auto p-4 rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">משכורות עובדי שטח</h1>
        <div className="flex items-center gap-4">
          <Select value={currentYear} onValueChange={setCurrentYear}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="בחר שנה" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
          <Select value={currentMonth} onValueChange={setCurrentMonth}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="בחר חודש" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">ינואר</SelectItem>
              <SelectItem value="2">פברואר</SelectItem>
              <SelectItem value="3">מרץ</SelectItem>
              <SelectItem value="4">אפריל</SelectItem>
              <SelectItem value="5">מאי</SelectItem>
              <SelectItem value="6">יוני</SelectItem>
              <SelectItem value="7">יולי</SelectItem>
              <SelectItem value="8">אוגוסט</SelectItem>
              <SelectItem value="9">ספטמבר</SelectItem>
              <SelectItem value="10">אוקטובר</SelectItem>
              <SelectItem value="11">נובמבר</SelectItem>
              <SelectItem value="12">דצמבר</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <Button onClick={addNewWorker}>הוסף עובד חדש</Button>
        <Button onClick={saveChanges}>שמור שינויים</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>טבלת משכורות יומיות - {`${currentMonth}/${currentYear}`}</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">תאריך</TableHead>
                {workers.map(worker => (
                  <TableHead key={worker} className="text-right">{worker}</TableHead>
                ))}
                <TableHead className="text-right">סה"כ יומי</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Generate rows for each day of the month */}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const dateStr = `${currentYear}-${currentMonth.padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                return (
                  <TableRow key={dateStr}>
                    <TableCell className="font-medium">{formatDate(dateStr)}</TableCell>
                    {workers.map(worker => (
                      <TableCell key={`${dateStr}-${worker}`}>
                        <Input
                          type="number"
                          value={salaryData[dateStr]?.[worker] || ""}
                          onChange={(e) => handleSalaryChange(dateStr, worker, e.target.value)}
                          className="w-20 text-right"
                        />
                      </TableCell>
                    ))}
                    <TableCell className="font-bold">
                      ₪{calculateTotalForDate(dateStr).toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
              {/* Total row */}
              <TableRow className="bg-muted/50">
                <TableCell className="font-bold">סה"כ</TableCell>
                {workers.map(worker => (
                  <TableCell key={`total-${worker}`} className="font-bold">
                    ₪{calculateTotalForWorker(worker).toLocaleString()}
                  </TableCell>
                ))}
                <TableCell className="font-bold text-lg">
                  ₪{calculateGrandTotal().toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FieldWorkerSalaries;
