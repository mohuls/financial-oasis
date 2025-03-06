
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Sample data - this would come from your db.json in a real app
const monthlyData = [
  { month: "ינואר", income: 50000, expenses: 30000 },
  { month: "פברואר", income: 60000, expenses: 40000 },
  { month: "מרץ", income: 70000, expenses: 35000 },
  { month: "אפריל", income: 65000, expenses: 45000 },
  { month: "מאי", income: 80000, expenses: 50000 },
  { month: "יוני", income: 85000, expenses: 55000 },
];

const expenseBreakdown = [
  { name: "משכורות", value: 35 },
  { name: "החזרים", value: 10 },
  { name: "חומרים וציוד", value: 20 },
  { name: "שיווק ופיתוח", value: 15 },
  { name: "הוצאות לא נחוצות", value: 5 },
  { name: "הוצאות משרד", value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const fieldWorkers = [
  { name: "שלמה", salary: 7500 },
  { name: "אבי", salary: 8300 },
  { name: "שקד", salary: 7900 },
  { name: "מאיר", salary: 7200 },
  { name: "מאי", salary: 7800 },
  { name: "יעקב", salary: 8100 },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4 rtl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">לוח בקרה</h1>
          <p className="text-muted-foreground">ברוך הבא, {user?.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <select className="bg-background border border-input rounded px-3 py-2">
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
          <select className="bg-background border border-input rounded px-3 py-2">
            <option value="1">ינואר</option>
            <option value="2">פברואר</option>
            <option value="3">מרץ</option>
            <option value="4">אפריל</option>
            <option value="5">מאי</option>
            <option value="6">יוני</option>
            <option value="7">יולי</option>
            <option value="8">אוגוסט</option>
            <option value="9">ספטמבר</option>
            <option value="10">אוקטובר</option>
            <option value="11">נובמבר</option>
            <option value="12">דצמבר</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">סך הכנסות חודשיות</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₪85,000</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">סך הוצאות חודשיות</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₪55,000</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">סך מקדמות חודשיות</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₪12,500</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">חובות לקוחות</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₪23,750</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
          <TabsTrigger value="fieldworkers">משכורות עובדי שטח</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>הכנסות מול הוצאות</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip labelStyle={{ textAlign: 'right' }} />
                      <Area
                        type="monotone"
                        dataKey="income"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                        name="הכנסות"
                      />
                      <Area
                        type="monotone"
                        dataKey="expenses"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        name="הוצאות"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>פילוח הוצאות</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {expenseBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="fieldworkers">
          <Card>
            <CardHeader>
              <CardTitle>משכורות עובדי שטח - חודש נוכחי</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fieldWorkers.map((worker) => (
                  <div key={worker.name} className="flex items-center justify-between">
                    <span className="font-medium">{worker.name}</span>
                    <span className="font-bold">₪{worker.salary.toLocaleString()}</span>
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                  <span className="font-bold">סך הכל</span>
                  <span className="font-bold">
                    ₪{fieldWorkers.reduce((sum, worker) => sum + worker.salary, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
