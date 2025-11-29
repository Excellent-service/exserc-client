"use client";

import { useState } from "react";
import { useToast } from "./use-toast";
import { Toast } from "@/components/Toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import { Alert } from "@/components/ui/alert";

interface fetchParams {
  role?: "seeker" | "provider";
  schema?: z.ZodSchema;
  action: (formData: FormData, context: any) => Promise<any>;
  checked?: boolean;
  path?: string;
  contextAction?: any
}

export const useAuth = ({
  role,
  schema,
  action,
  checked = true,
  path,
  contextAction
}: fetchParams) => {
  const { toast } = useToast();
  // get router path
  const pathname = usePathname();

  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof schema | any>>({
    resolver: zodResolver(schema!),
    defaultValues: {
      role: role,
    },
  });

  const successMessage = ({ message }: { message?: string }) => {
    if ((pathname.endsWith("seeker") || pathname.endsWith('provider')) && pathname.includes('signup')) {
      return `Registration successful!`;
    } else if (pathname.endsWith("login")) {
      return `Welcome back ${message}!`;
    } else {
      return message;
    }
  }

  const onSubmit = async (values: z.infer<typeof schema | any>) => {
    // Do not submit if the terms checkbox is not checked
    if (!checked) {
      Toast.error("Please accept the terms and conditions to proceed.");
      return;
    }
    try {
      setLoading(true);
      // create form data from values
      const formData = new FormData();
      if (values) {
        Object?.entries(values)?.forEach(([key, value]) => {
          formData?.set(key, value as string);
        });
      }
      const res = await action(formData, contextAction);
      if (res?.message) {
        // Handle error response from the server
        Toast.error(res.message)
        // alert(res.message)
      } else {
        // route to the specified path if provided
        Toast.success("Success ✅")
        if (path) {
          router.push(path)
        }
      }
    } catch (error) {
      // Handle unexpected errors
      Toast.error("Something went wrong: " + error);
    } finally {
      setLoading(false);
    }
  };

  // return state and handlers
  return {
    form,
    onSubmit,
    loading,
  };
};
