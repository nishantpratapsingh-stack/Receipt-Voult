import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AUTH_CREDENTIALS,
  getAuthenticatedUser,
  isAuthenticated,
  logout,
} from "@/lib/auth";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(AUTH_CREDENTIALS.username);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  useEffect(() => {
    document.title = "Account - Receipt Vault";

    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
      return;
    }

    setUsername(getAuthenticatedUser() ?? AUTH_CREDENTIALS.username);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const userInitial = (username.trim().charAt(0) || "N").toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container pb-12 pt-28 md:pt-32">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <Card className="rounded-xl p-0 shadow-md transition-smooth hover:shadow-card">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <Avatar className="h-24 w-24 border border-border">
                    <AvatarFallback className="bg-primary text-3xl font-bold text-primary-foreground">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h1 className="font-display text-3xl font-bold tracking-tight">{username}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Manage your account and preferences
                    </p>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-md transition-smooth hover:shadow-card">
            <CardHeader className="p-6 pb-0">
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Basic details linked to your profile</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 p-6 md:grid-cols-2">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Username
                </p>
                <p className="text-base font-medium text-foreground">{username}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Email
                </p>
                <p className="text-base font-medium text-foreground">nishant@mail.com</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Role</p>
                <p className="text-base font-medium text-foreground">User</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-md transition-smooth hover:shadow-card">
            <CardHeader className="p-6 pb-0">
              <CardTitle>Account Status</CardTitle>
              <CardDescription>Current state of your account and plan</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 p-6 md:grid-cols-3">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Status
                </p>
                <Badge variant="default" className="w-fit">
                  Active
                </Badge>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Plan</p>
                <p className="text-base font-medium text-foreground">Free Plan</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Joined Date
                </p>
                <p className="text-base font-medium text-foreground">January 12, 2026</p>
              </div>
            </CardContent>
          </Card>

          <Card
            id="settings"
            className="rounded-xl shadow-md transition-smooth hover:shadow-card"
          >
            <CardHeader className="p-6 pb-0">
              <CardTitle>Security</CardTitle>
              <CardDescription>Password and authentication controls</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 p-6 md:grid-cols-2">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Password
                </p>
                <p className="text-base font-medium text-foreground">********</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Change Password
                </Button>
              </div>

              <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">Two-factor authentication</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Add an extra verification step to your account
                  </p>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                  aria-label="Toggle two-factor authentication"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-md transition-smooth hover:shadow-card">
            <CardHeader className="p-6 pb-0">
              <CardTitle>Session</CardTitle>
              <CardDescription>Current login activity</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 p-6 md:grid-cols-2">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Last Login
                </p>
                <p className="text-base font-medium text-foreground">Today, 9:42 AM</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Device
                </p>
                <p className="text-base font-medium text-foreground">Web Browser</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-destructive/30 shadow-md transition-smooth hover:shadow-card">
            <CardHeader className="p-6 pb-0">
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Sign out from your current session</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Account;
