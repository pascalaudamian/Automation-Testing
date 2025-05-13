"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function DialogsPage() {
  const { toast } = useToast();
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });
  const [confirmationResult, setConfirmationResult] = useState<string | null>(null);
  const [alertCount, setAlertCount] = useState(0);

  const toggleDialog = (id: string, isOpen: boolean) => {
    setOpenDialogs((prev) => ({ ...prev, [id]: isOpen }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Validate form
    if (!formValues.name || !formValues.email) {
      toast({
        title: "Validation Error",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }

    // Show success message
    toast({
      title: "Form Submitted",
      description: `Thank you, ${formValues.name}!`,
    });

    // Close dialog
    toggleDialog("form", false);

    // Reset form
    setFormValues({ name: "", email: "" });
  };

  const showConfirmationResult = (result: string) => {
    setConfirmationResult(result);
    toggleDialog("confirmation", false);

    // Clear result after 3 seconds
    setTimeout(() => {
      setConfirmationResult(null);
    }, 3000);
  };

  const showAlertToast = () => {
    setAlertCount((prev) => prev + 1);
    toast({
      title: `Alert ${alertCount + 1}`,
      description: "This is a toast notification alert",
    });
  };

  return (
    <div className="space-y-8" data-testid="dialogs-page">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" data-testid="page-title">Dialogs & Popups</h1>
        <p className="text-sm text-zinc-500" data-testid="page-description">
          Practice with modal dialogs, popups, and toast notifications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Dialog Card */}
        <Card>
          <CardHeader>
            <CardTitle>Simple Dialogs</CardTitle>
            <CardDescription>Basic modal dialogs with different content types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Dialog open={openDialogs.basic} onOpenChange={(isOpen) => toggleDialog("basic", isOpen)}>
                <DialogTrigger asChild>
                  <Button data-testid="open-basic-dialog">Open Basic Dialog</Button>
                </DialogTrigger>
                <DialogContent data-testid="basic-dialog-content">
                  <DialogHeader>
                    <DialogTitle>Basic Dialog</DialogTitle>
                    <DialogDescription>
                      This is a basic dialog with title and description.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p>This is the content area of the dialog where you can put any content.</p>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => toggleDialog("basic", false)} data-testid="basic-dialog-close">
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={openDialogs.form} onOpenChange={(isOpen) => toggleDialog("form", isOpen)}>
                <DialogTrigger asChild>
                  <Button data-testid="open-form-dialog">Open Form Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]" data-testid="form-dialog-content">
                  <DialogHeader>
                    <DialogTitle>Form Dialog</DialogTitle>
                    <DialogDescription>
                      Fill out this form and submit it.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div className="grid grid-cols-4 items-center gap-2">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        className="col-span-3"
                        value={formValues.name}
                        onChange={handleInputChange}
                        data-testid="name-input"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-2">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        className="col-span-3"
                        value={formValues.email}
                        onChange={handleInputChange}
                        data-testid="email-input"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => toggleDialog("form", false)} data-testid="form-dialog-cancel">
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} data-testid="form-dialog-submit">
                      Submit
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Dialog Card */}
        <Card>
          <CardHeader>
            <CardTitle>Confirmation Dialogs</CardTitle>
            <CardDescription>Dialogs that ask for user confirmation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Dialog open={openDialogs.confirmation} onOpenChange={(isOpen) => toggleDialog("confirmation", isOpen)}>
              <DialogTrigger asChild>
                <Button data-testid="open-confirmation-dialog">Open Confirmation Dialog</Button>
              </DialogTrigger>
              <DialogContent data-testid="confirmation-dialog-content">
                <DialogHeader>
                  <DialogTitle>Confirm Action</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to perform this action?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex space-x-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => showConfirmationResult("Action Cancelled")}
                    data-testid="confirmation-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => showConfirmationResult("Action Confirmed")}
                    data-testid="confirmation-confirm"
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {confirmationResult && (
              <div
                className={`mt-4 p-3 border rounded-md ${
                  confirmationResult.includes("Confirmed")
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-amber-50 border-amber-200 text-amber-700"
                }`}
                data-testid="confirmation-result"
              >
                Result: {confirmationResult}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Nested Dialogs Card */}
        <Card>
          <CardHeader>
            <CardTitle>Nested Dialogs</CardTitle>
            <CardDescription>Dialog that opens another dialog</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={openDialogs.nested1} onOpenChange={(isOpen) => toggleDialog("nested1", isOpen)}>
              <DialogTrigger asChild>
                <Button data-testid="open-nested-dialog">Open First Dialog</Button>
              </DialogTrigger>
              <DialogContent data-testid="nested-dialog-1">
                <DialogHeader>
                  <DialogTitle>First Dialog</DialogTitle>
                  <DialogDescription>
                    This dialog contains another dialog trigger.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Dialog open={openDialogs.nested2} onOpenChange={(isOpen) => toggleDialog("nested2", isOpen)}>
                    <DialogTrigger asChild>
                      <Button data-testid="open-second-dialog">Open Second Dialog</Button>
                    </DialogTrigger>
                    <DialogContent data-testid="nested-dialog-2">
                      <DialogHeader>
                        <DialogTitle>Second Dialog</DialogTitle>
                        <DialogDescription>
                          This is a nested dialog inside the first one.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => toggleDialog("nested2", false)} data-testid="close-second-dialog">
                          Close Second Dialog
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <DialogFooter>
                  <Button onClick={() => toggleDialog("nested1", false)} data-testid="close-first-dialog">
                    Close First Dialog
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Toast Notifications Card */}
        <Card>
          <CardHeader>
            <CardTitle>Toast Notifications</CardTitle>
            <CardDescription>Non-modal notifications that appear temporarily</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={showAlertToast} data-testid="show-toast">
                Show Toast Notification
              </Button>
              <Button
                onClick={() => {
                  toast({
                    title: "Action Required",
                    description: "This toast requires a user action to dismiss.",
                    duration: 10000, // 10 seconds
                  });
                }}
                variant="outline"
                data-testid="show-long-toast"
              >
                Show Long Toast (10s)
              </Button>
              <Button
                onClick={() => {
                  toast({
                    title: "Success",
                    description: "Operation completed successfully!",
                    variant: "default",
                  });
                }}
                className="bg-green-600 hover:bg-green-700"
                data-testid="show-success-toast"
              >
                Success Toast
              </Button>
              <Button
                onClick={() => {
                  toast({
                    title: "Error",
                    description: "Something went wrong. Please try again.",
                    variant: "destructive",
                  });
                }}
                variant="destructive"
                data-testid="show-error-toast"
              >
                Error Toast
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-zinc-500">
              Toast count: <span data-testid="toast-count">{alertCount}</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
