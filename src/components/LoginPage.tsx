
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@cleanholdings.com");
  const [password, setPassword] = useState("0585676722");
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div className="w-full max-w-md px-4">
        <Card className="premium-card p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              מערכת ניהול פיננסית VIP
            </h1>
            <p className="text-muted-foreground">Clean Holdings</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">אימייל</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-right"
                placeholder="הכנס אימייל"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">סיסמה</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-right"
                placeholder="הכנס סיסמה"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="remember"
                  className="text-sm cursor-pointer select-none"
                >
                  זכור אותי
                </Label>
                <Checkbox
                  id="remember"
                  checked={rememberPassword}
                  onCheckedChange={(checked) => setRememberPassword(checked as boolean)}
                />
              </div>
              <Button
                type="button"
                variant="link"
                className="text-sm hover:text-primary"
                onClick={() => {
                  // TODO: Implement forgot password functionality
                }}
              >
                שכחת סיסמה?
              </Button>
            </div>

            <Button type="submit" className="w-full text-lg">
              התחבר
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
