"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { LoginForm, loginSchemaForm } from "@/validations/auth-validation";
import { INITIAL_LOGIN_FORM, INITIAL_STATE_LOGIN_FORM } from "@/constants/auth-constant";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/common/form-input";
import { Form, Loader2 } from "lucide-react";
import { startTransition, use, useActionState, useEffect,} from "react";
import { initialize } from "next/dist/server/lib/render-server";
import { login } from "../action";
import { start } from "repl";

export default function Login() {

    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchemaForm),
        defaultValues: INITIAL_LOGIN_FORM,
    });

    const [loginState, loginAction, isPendingLogin] = useActionState(
        login, 
        INITIAL_STATE_LOGIN_FORM
    );

    const onSubmit = form.handleSubmit(async (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        startTransition(() => {
            loginAction(formData);
        });
    });

    useEffect(() => {
        if(loginState?.status === 'error') { 
            startTransition(() => {
                loginAction(null)
            })
        }
    }, [loginState])

    console.log(loginState);

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <CardDescription>
                    Please enter your credentials to access your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="login-form" onSubmit={onSubmit} className="space-y-4">
                    <FormInput form={form} name="email" label="Email" type="email" placeholder="Enter your email"/>
                    <FormInput form={form} name="password" label="Password" type="password" placeholder="******"/>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal" >
                    <Button type="submit" className="w-full" form ="login-form">
                        {isPendingLogin ? <Loader2 className="animate-spin" /> : 'Login'}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}