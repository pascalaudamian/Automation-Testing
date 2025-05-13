"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function FormsPage() {
  const { toast } = useToast();
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
    notifications: false,
    plan: "free",
    countryCode: "",
  });

  const [activeTab, setActiveTab] = useState("login");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form validation
    if (activeTab === "register" && formValues.password !== formValues.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }

    // Show success message
    setFormSubmitted(true);
    toast({
      title: "Form submitted successfully",
      description: `You submitted the ${activeTab} form`,
    });

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

  const countryCodes = [
    { value: "us", label: "United States (+1)" },
    { value: "uk", label: "United Kingdom (+44)" },
    { value: "ca", label: "Canada (+1)" },
    { value: "au", label: "Australia (+61)" },
    { value: "in", label: "India (+91)" },
  ];

  return (
    <div className="space-y-8" data-testid="forms-page">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" data-testid="page-title">Form Elements</h1>
        <p className="text-sm text-zinc-500" data-testid="page-description">
          Practice automation with various form inputs, validations, and submissions.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Test Controls</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="disable-forms"
                checked={formDisabled}
                onCheckedChange={(checked) => setFormDisabled(checked)}
                data-testid="disable-forms-switch"
              />
              <Label htmlFor="disable-forms">Disable Forms</Label>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setFormValues({
                  username: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  remember: false,
                  notifications: false,
                  plan: "free",
                  countryCode: "",
                });
                setFormSubmitted(false);
              }}
              data-testid="reset-button"
            >
              Reset All Forms
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Authentication Forms</CardTitle>
            <CardDescription>Practice with login and registration forms</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login" data-testid="login-tab">Login</TabsTrigger>
                <TabsTrigger value="register" data-testid="register-tab">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit} data-testid="login-form">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="username">Username or Email</Label>
                      <Input
                        id="username"
                        name="username"
                        placeholder="Enter your username or email"
                        value={formValues.username}
                        onChange={handleInputChange}
                        disabled={formDisabled || formSubmitted}
                        data-testid="username-input"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formValues.password}
                        onChange={handleInputChange}
                        disabled={formDisabled || formSubmitted}
                        data-testid="password-input"
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        name="remember"
                        checked={formValues.remember}
                        onCheckedChange={(checked) =>
                          setFormValues({ ...formValues, remember: !!checked })
                        }
                        disabled={formDisabled || formSubmitted}
                        data-testid="remember-checkbox"
                      />
                      <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={formDisabled || formSubmitted}
                      data-testid="login-submit"
                    >
                      {formSubmitted ? "Logged In Successfully!" : "Sign In"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleSubmit} data-testid="register-form">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="reg-username">Username</Label>
                      <Input
                        id="reg-username"
                        name="username"
                        placeholder="Choose a username"
                        value={formValues.username}
                        onChange={handleInputChange}
                        disabled={formDisabled || formSubmitted}
                        data-testid="reg-username-input"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        disabled={formDisabled || formSubmitted}
                        data-testid="email-input"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <Input
                        id="reg-password"
                        name="password"
                        type="password"
                        placeholder="Choose a password"
                        value={formValues.password}
                        onChange={handleInputChange}
                        disabled={formDisabled || formSubmitted}
                        data-testid="reg-password-input"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formValues.confirmPassword}
                        onChange={handleInputChange}
                        disabled={formDisabled || formSubmitted}
                        data-testid="confirm-password-input"
                        required
                      />
                    </div>
                    <div className="space-y-4">
                      <Label>Subscription Plan</Label>
                      <RadioGroup
                        defaultValue="free"
                        value={formValues.plan}
                        onValueChange={(value) => setFormValues({ ...formValues, plan: value })}
                        disabled={formDisabled || formSubmitted}
                        data-testid="plan-radio-group"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="free" id="free" data-testid="plan-free" />
                          <Label htmlFor="free">Free Plan</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pro" id="pro" data-testid="plan-pro" />
                          <Label htmlFor="pro">Pro Plan</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="enterprise" id="enterprise" data-testid="plan-enterprise" />
                          <Label htmlFor="enterprise">Enterprise Plan</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="country">Country Code</Label>
                      <Select
                        disabled={formDisabled || formSubmitted}
                        value={formValues.countryCode}
                        onValueChange={(value) => handleSelectChange("countryCode", value)}
                        data-testid="country-select"
                      >
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select your country code" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map((country) => (
                            <SelectItem
                              key={country.value}
                              value={country.value}
                              data-testid={`country-option-${country.value}`}
                            >
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="notifications"
                        name="notifications"
                        checked={formValues.notifications}
                        onCheckedChange={(checked) =>
                          setFormValues({ ...formValues, notifications: checked })
                        }
                        disabled={formDisabled || formSubmitted}
                        data-testid="notifications-switch"
                      />
                      <Label htmlFor="notifications">Receive email notifications</Label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={formDisabled || formSubmitted}
                      data-testid="register-submit"
                    >
                      {formSubmitted ? "Registered Successfully!" : "Create Account"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          {formSubmitted && (
            <CardFooter>
              <div className="w-full rounded-md bg-green-50 p-3 border border-green-200" data-testid="success-message">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Form submitted successfully! This message will disappear in 3 seconds.
                    </p>
                  </div>
                </div>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
