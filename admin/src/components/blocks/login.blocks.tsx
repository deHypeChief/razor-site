import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from '@iconify-icon/react';
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { cn } from "@/utils/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
})


export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate()
    const { adminLogin } = useAuth()


    const { mutateAsync: signAdminMutation, isPending } = useMutation({
        mutationFn: adminLogin,
        onSuccess: () => {
            navigate({ to: "/overview" })
        },
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await signAdminMutation(values)
    }


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-xl font-bold">Welcome to Razor</h1>
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/auth/registerAdmin" className="underline underline-offset-4">
                            Sign up
                        </Link>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col gap-1">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@mail.com" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" type="password" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isPending}>Login</Button>
                    </form>
                </Form>


                <div className="relative flex items-center my-2">
                    <div className="flex-grow border-t-2" style={{ borderColor: "var(--alt-background-color)" }} />
                    <span className="mx-4 text-muted-foreground text-sm">Or</span>
                    <div className="flex-grow border-t-2" style={{ borderColor: "var(--alt-background-color)" }} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Button variant="outline" type="button" className="w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                fill="currentColor"
                            />
                        </svg>
                        Continue with Apple
                    </Button>
                    <Button variant="outline" type="button" className="w-full">
                        <Icon icon="flat-color-icons:google" width="19" height="19" />
                        Continue with Google
                    </Button>
                </div>
            </div>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
