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

interface CreatePinFormProps {
    form: any; // Replace with your form type
    form2: boolean // Indicates if the second form is active
    handleSavePin1: (value: string) => void; // Function to handle saving the first pin
    setForm2?: (value: boolean) => void; // Optional function to switch forms
}

const CreatePinForm = ({form, handleSavePin1, setForm2, form2}: CreatePinFormProps) => {
  return (
    <Form {...form}>
        <form
          className="flex items-center flex-col gap-y-4 w-full max-w-[1024px] px-4"
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
                Create transaction pin
            </h1>
            <h3 className="text-lg sm:text-xl text-center text-black-1 mb-6">
              please enter a 4-digit pin
            </h3>
          </div>
          <div className="flex flex-col gap-y-5 w-full max-w-[482px] items-center justify-center">
            <FormField
                control={form.control}
                name="pin1"
                render={({ field }) => (
                    <FormItem>
                    <FormControl >
                        <InputOTP 
                          autoFocus 
                          maxLength={4} 
                          {...field}
                          onChange={(value) => {
                            field.onChange(value); // Update form state
                            if (value.length === 4) {
                              handleSavePin1(value); // Save and switch form
                            }
                          }}
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
              type="button"
              onClick={() => {
                if (!form2) {
                  setForm2?.(true); // Switch to the second form if setForm2 is provided
                }
              }}
            >
                Create
            </Button>
          </div>
        </form>
      </Form>
  )
}

export default CreatePinForm