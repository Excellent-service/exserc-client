import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";

interface ConfirmPinFormProps {
    form: any; // Replace with your form type
    loading: boolean;
    onSubmit: (data: any) => void; // Replace with your submit function type
}

const ConfirmPinForm = ({form, loading, onSubmit}: ConfirmPinFormProps) => {
  return (
    <Form {...form}>
        <form
          className="flex items-center flex-col gap-y-4 w-full max-w-[1024px] px-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-full items-center gap-2">
            <div>
              <Link href="/">
                <div className="w-12 h-12 rounded-md overflow-hidden">
                  <Image
                    src="/assets/images/favicon.png"
                    className="block w-full h-full object-cover"
                    alt="logo"
                    width={50}
                    height={50}
                  />
                </div>
              </Link>
            </div>
            <h1 className="font-bold text-2xl sm:text-3xl text-center text-black-1 mb-2">
                Confirm transaction pin
            </h1>
            <h3 className="text-lg sm:text-xl text-center text-black-1 mb-6">
              please enter a 4-digit pin
            </h3>
          </div>
          <div className="flex flex-col gap-y-5 w-full max-w-[482px] items-center justify-center">
            <FormField
                control={form.control}
                name="pin2"
                render={({ field }) => (
                    <FormItem>
                    <FormControl >
                        <InputOTP 
                          autoFocus 
                          maxLength={4} 
                          {...field}
                          >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        </InputOTP>
                    </FormControl>
                    <FormMessage className="text-center" />
                    </FormItem>
                )}
                />

          </div>
          <div className="mt-4 flex flex-col gap-y-4 w-full max-w-[482px] items-center">
            <Button
              variant="default"
              className="w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Confirm Pin"}
            </Button>
          </div>
        </form>
      </Form>
  )
}

export default ConfirmPinForm