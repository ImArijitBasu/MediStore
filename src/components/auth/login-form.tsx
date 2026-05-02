"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Zap } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging into your account...");
      setIsLoading(true);
      try {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          callbackURL: typeof window !== "undefined" ? window.location.origin : "/",
        });

        if (error) {
          toast.error(error.message, { id: toastId });
          setIsLoading(false);
          return;
        }

        toast.success("Logged in successfully!", { id: toastId });

      } catch (err) {
        toast.error("Something went wrong! Please try again.", { id: toastId });
        setIsLoading(false);
      }
    },
  });

  // Demo login handler
  const handleDemoLogin = async () => {
    const toastId = toast.loading("Logging in with demo credentials...");
    setIsLoading(true);
    try {
      const { data, error } = await authClient.signIn.email({
        email: "medadmin@gmail.com",
        password: "password1234",
        callbackURL: typeof window !== "undefined" ? window.location.origin : "/",
      });

      if (error) {
        toast.error(error.message || "Demo login failed. Please try manual login.", { id: toastId });
        setIsLoading(false);
        return;
      }

      toast.success("Demo login successful!", { id: toastId });
    } catch (err) {
      toast.error("Demo login failed. Please try again.", { id: toastId });
      setIsLoading(false);
    }
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: typeof window !== "undefined" ? window.location.origin : "/",
      });
      if (error) {
        toast.error(error.message || "Google login failed.");
      }
    } catch (err) {
      toast.error("Google login failed. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-lg bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-xl">M</span>
          </div>
        </div>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>Sign in to your MediStore account</CardDescription>
      </CardHeader>

      <CardContent>
        {/* Demo Login Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full mb-4 gap-2 border-dashed border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          onClick={handleDemoLogin}
          disabled={isLoading}
        >
          <Zap className="h-4 w-4" />
          Quick Demo Login
        </Button>

        {/* Google Login Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full mb-4 gap-2"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading || isLoading}
        >
          {isGoogleLoading ? (
            <span className="animate-spin mr-1">⟳</span>
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          )}
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        <form
          id="login"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-4">
            {/* Email Field */}
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid = field.state.meta.errors.length > 0;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        id={field.name}
                        name={field.name}
                        placeholder="you@example.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Password Field */}
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid = field.state.meta.errors.length > 0;
                return (
                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Link
                        href="/auth/forgot-password"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        id={field.name}
                        name={field.name}
                        placeholder="••••••••"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="pl-10 pr-10"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button
          form="login"
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-foreground hover:underline font-medium"
          >
            Create account
          </Link>
        </div>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>By signing in, you agree to our</p>
          <div className="flex justify-center gap-3">
            <Link
              href="/terms"
              className="hover:text-foreground hover:underline"
            >
              Terms of Service
            </Link>
            <span>•</span>
            <Link
              href="/privacy"
              className="hover:text-foreground hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
