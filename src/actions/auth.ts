import { ForgotPasswordSchema, LoginFormSchema, Otp, Pin, ResetPasswordSchema, SignupFormSchema } from '@/lib/definitions'
import { createSession, deleteSession, getSession, updateSession } from '@/lib/session'





/** REGISTRATION 
 * functions Below:
 * signup, verifyRegistrationOtp, requestRegistrationOtp, (createSeekerProfile), (createProviderProfile)
*/

// This function handles user registration
// It validates the form data, sends a registration request to the API, and creates a session
/**
 * 
 * @param formData - The form data containing user registration details
 * @param formData.full_name - The full name of the user
 * @returns 
 * This function returns an object containing either the data or errors from the registration process.
 * If the registration is successful, it returns the user's role.
 * If there are validation errors, it returns the errors and a message indicating that the form fields were not validated.
 * If the registration fails, it returns a message indicating the failure and any errors from the server.
 */
export async function signup(formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    full_name: formData.get('full_name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
    role: formData.get('role')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Form fields not validated',
    };
  }

  const validatedData = validatedFields.data;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: 'POST',
      body: JSON.stringify(validatedData),
      headers: {
        'Content-Type': 'application/json',
      },
    });


    const responseBody = await res.json();
    if (!res.ok) {
      // Server-side validation failed
      return {
        message: responseBody.message || 'Registration failed. Please check your input.',
        errors: responseBody.errors || null,
      };
    }

    const {
      email, role, id
    }: {
      email: string; role: 'seeker' | 'provider'; id: number
    } = responseBody.data;

    console.log("Creating VERIFICATION session with payload:", { email, role, id });
    await createSession('VERIFICATION', { email, role, id });
    console.log("Session creation attempted");

    return {
      data: role,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: 'Something went wrong! Please try again later.',
        error: error.message,
      };
    }
  }
}


  // This function verifies the registration OTP
  // It retrieves the session data, validates the OTP, sends a request to the API to verify the OTP, and returns the response
  /**
   * 
   * @param formData - The form data containing the OTP
   * @param formData.otp - The OTP entered by the user
   * @returns 
   * This function returns an object containing either the data or errors from the OTP verification process.
   * If the OTP verification is successful, it returns a success message.
   * If there are validation errors, it returns the errors and a message indicating that the form fields were not validated.
   * If the verification fails, it returns a message indicating the failure and any errors from the server.
   */
  export async function verifyRegistrationOtp(formData: FormData) {

    console.log("Started")
    // get session data
    const session = await getSession('VERIFICATION');
    if (!session) {
      console.log("no session found, go back request OTP")
      return {
        message: 'Session not found. Please log in again.',
        errors: { session: 'Session not found' },
      };
    }
    // 1. Validate form fields
    const validatedFields = Otp.safeParse({
      email: session.email,
      otp: formData.get('otp'),
    });

    if (!validatedFields.success) {
      console.log('Form fields not validated')
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Form fields not validated',
      };
    }

    const validatedData = validatedFields.data;


    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp/${session?.id}`, {
        method: 'POST',
        body: JSON.stringify(validatedData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseBody = await res.json();
      if (!res.ok) {
        // Server-side validation failed
        console.log("OTP verification failed. Please check your input.")
        return {
          message: responseBody.message || 'OTP verification failed. Please check your input.',
          errors: responseBody.errors || null,
        };
      }

      console.log("OTP verified successfully!")
      return {
        data: responseBody.message || 'OTP verified successfully!',
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Something went wrong! Please try again later.")
        return {
          message: 'Something went wrong! Please try again later.',
          error: error?.message || error,
        };
      }
    }
  }


  // This function requests a registration OTP
  // It retrieves the session data, sends a request to the API to resend the OTP, and returns the response
  /**
    * @returns 
    * This function returns an object containing either the data or errors from the OTP request process.
    * If the OTP request is successful, it returns a success message.
    * If there are validation errors, it returns the errors and a message indicating that the session was not found.
    * If the OTP request fails, it returns a message indicating the failure and any errors from the server.
   */
  export async function requestRegistrationOtp() {
    // get session data
    const session = await getSession('VERIFICATION');
    if (!session) {
      return {
        message: 'Session not found. Please log in again.',
        errors: { session: 'Session not found' },
      };
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp/${session?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session.email }),
      });

      const responseBody = await res.json();
      if (!res.ok) {
        // Server-side validation failed
        return {
          message: responseBody.message || 'OTP request failed. Please try again.',
          errors: responseBody.errors || null,
        };
      }

      return {
        data: responseBody.message || 'OTP sent successfully!',
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          message: 'Something went wrong! Please try again later.',
          error: error?.message || error,
        };
      }
    }
  }


  /** 
   * Functions for createSeekerProfile & createProviderProfile can found in /actions/user.ts 
  */






  /** LOGIN 
   * functions Below: 
   * login, requestForgotPasswordOtp, resendForgotPasswordOtp, verifyForgotPasswordOtp, resetPassword
  */

  // This function handles user login
  // It validates the form data, sends a login request to the API, and creates a session
  /**
   * 
   * @param formData - The form data containing user login details
   * @returns 
   * This function returns an object containing either the data or errors from the login process.
   * If the login is successful, it returns the user's first name.
   * If there are validation errors, it returns the errors and a message indicating that the form fields were not validated.
   * If the login fails, it returns a message indicating the failure and any errors from the server.
   */
  export async function loginApi(formData: FormData, contextAction: (data: unknown, response: unknown) => void) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const responseBody = await res.json()
      if (!res.ok) {
        return {
          message: responseBody.message || 'Login request failed',
          error: responseBody.error
        }
      }

      contextAction(responseBody?.data?.user, responseBody?.data?.user?.id);

      createSession('USER', {
        email: responseBody?.data?.user?.email,
        role: responseBody?.data?.user?.role,
        id: responseBody?.data?.user?.id
      });

      return {
        success: true,
        data: responseBody?.data?.user?.first_name || 'User',
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          success: false,
          message: 'Something went wrong! Please try again later.',
          error: error?.message || error,
        };
      }
    }
  }


  // This function requests a forgot password OTP
  // It validates the form data, sends a request to the API to send the OTP, and returns the response
  /** 
   * @param formData - The form data containing the email address
    * @returns 
    * This function returns an object containing either the data or errors from the OTP request process.
    * creates a session with the email address to be used later for verification.
    * If the OTP request is successful, it returns a success message.
    * If there are validation errors, it returns the errors and a message indicating that the form fields were not validated.
    * If the OTP request fails, it returns a message indicating the failure and any errors from the server.
    */
  export async function requestForgotPasswordOtp(formData: FormData) {
    // get session data
    const validatedFields = ForgotPasswordSchema.safeParse({
      email: formData.get('email'),
    });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedFields.data),
      });

      const responseBody = await res.json();
      if (!res.ok) {
        // Server-side validation failed
        return {
          message: responseBody.message || 'OTP request failed. Please try again.',
          errors: responseBody.errors || null,
        };
      }

      // create session
      createSession('VERIFICATION', {
        email: formData.get('email')?.toString() || '',
        reset_token: responseBody?.data?.reset_token
      });

      return {
        data: responseBody.message || 'OTP sent successfully!',
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          message: 'Something went wrong! Please try again later.',
          error: error?.message || error,
        };
      }
    }
  }


  // This function resends the forgot password OTP
  // It validates the form data, sends a request to the API to resend the OTP, and
  /**
   * 
   * @returns 
   * This function returns an object containing either the data or errors from the OTP resend process.
   * If the OTP resend is successful, it returns a success message.
   * If there are validation errors, it returns the errors and a message indicating that the form fields were not validated.
   * If the resend fails, it returns a message indicating the failure and any errors from the server
   */
  export async function resendForgotPasswordOtp() {
    // get session data
    const session = await getSession('VERIFICATION');
    if (!session) {
      return {
        message: 'Session not found. try again later.',
        errors: { session: 'Session not found' },
      };
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp-forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.email,
        }),
      });

      const responseBody = await res.json();
      if (!res.ok) {
        // Server-side validation failed
        return {
          message: responseBody.message || 'OTP request failed. Please try again.',
          errors: responseBody.errors || null,
        };
      }

      updateSession('VERIFICATION', {
        reset_token: responseBody?.data?.reset_token
      });

      return {
        data: responseBody.message || 'OTP sent successfully!',
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          message: 'Something went wrong! Please try again later.',
          error: error?.message || error,
        };
      }
    }
  }


  // This function verifies the forgot password OTP
  // It validates the form data, sends a request to the API to verify the OTP, and returns the response
  /**
   * 
   * @param formData - The form data containing the OTP
   * @param formData.otp - The OTP entered by the user
   * @returns 
   * This function returns an object containing either the data or errors from the OTP verification process.
   * If the OTP verification is successful, it returns a success message.
   * If there are validation errors, it returns the errors and a message indicating that the form fields were not validated.
   * If the verification fails, it returns a message indicating the failure and any errors from the server.
   */
  export async function verifyForgotPasswordOtp(formData: FormData) {
    // 1. Validate form fields
    const validatedFields = Otp.safeParse({
      otp: formData.get('otp'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Form fields not validated',
      };
    }

    // get session 
    const session = await getSession('VERIFICATION')

    const validatedData = validatedFields.data;


    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp-forgot-password`, {
        method: 'POST',
        body: JSON.stringify(validatedData),
        headers: {
          'Content-Type': 'application/json',
          'reset-token': String(session?.reset_token || '')
        }
      });

      const responseBody = await res.json();
      if (!res.ok) {
        // Server-side validation failed
        return {
          message: responseBody.message || 'OTP verification failed. Please check your input.',
          errors: responseBody.errors || null,
        };
      }

      updateSession('VERIFICATION', {
        reset_token: responseBody?.data?.reset_token
      })

      return {
        data: responseBody.message || 'OTP verified successfully!',
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          message: 'Something went wrong! Please try again later.',
          error: error?.message || error,
        };
      }
    }
  }


  // This function resets the password
  // It validates the form data, sends a request to the API to reset the password, and returns the response
  /**
   * 
   * @param formData - The form data containing the new password and confirmation
   * @param formData.new_password - The new password entered by the user
   * @param formData.confirm_password - The confirmation of the new password entered by the user
   * * @returns
   * This function returns an object containing either the data or errors from the password reset process.
   * If the password reset is successful, it returns a success message.
   * If there are validation errors, it returns the errors and a message indicating that the form fields were not validated.
   * If the reset fails, it returns a message indicating the failure and any errors from the server
   */
  export async function resetPassword(formData: FormData) {
    const validatedData = ResetPasswordSchema.safeParse({
      new_password: formData.get('new_password'),
      confirm_password: formData.get('confirm_password')
    })

    if (!validatedData.success) {
      return {
        error: validatedData.error.flatten().fieldErrors,
        message: 'form validated successfully'
      }
    }

    const session = await getSession('VERIFICATION')

    if (!session) return {
      message: 'no token found, try forgot password again.'
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
      method: 'POST',
      body: JSON.stringify(validatedData.data),
      headers: {
        'Content-Type': 'application/json',
        'reset-token': String(session?.reset_token || '')
      }
    })

    const response = await res.json()

    if (!res.ok) {
      return {
        message: response.message || 'Password rest failed',
        error: response?.error || null
      }
    }

    await deleteSession('VERIFICATION')

    return {
      data: response?.message || 'password reset successfully, login with new password.'
    }
  }


















  // This function creates a transaction pin
  // It validates the form data, sends a request to the API to set the transaction pin, 
  // and returns the response
  /**
   * 
   * @param formData - The form data containing the transaction pin
   * @param formData.pin1 - The first pin entered by the user
   * @param formData.pin2 - The confirmation of the pin entered by the user
   * 
   * @returns 
   * This function returns an object containing either the data or errors from the pin creation process.
   * If the pin creation is successful, it returns a success message.
   * If there are validation errors, it returns the errors and a message indicating that the form fields were not validated.
   * If the pin creation fails, it returns a message indicating the failure and any errors from the server.
   */
  export async function createPin(formData: FormData) {
    // get session data
    const session = await getSession('VERIFICATION');
    if (!session) {
      return {
        message: 'Session not found. Please log in again.',
        errors: { session: 'Session not found' },
      };
    }

    // 1. Validate form fields
    const validatedFields = Pin.safeParse({
      pin1: formData.get('pin1'),
      pin2: formData.get('pin2'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Form fields not validated',
      };
    }

    const validatedData = validatedFields.data;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/set-transaction-pin/${session?.id}`, {
        method: 'POST',
        body: JSON.stringify(validatedData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseBody = await res.json();
      console.log("respponseBody", responseBody);
      if (!res.ok) {
        // Server-side validation failed
        return {
          message: responseBody.message || 'Pin creation failed. Please check your input.',
          errors: responseBody.errors || null,
        };
      }

      await deleteSession('VERIFICATION')
      return {
        data: responseBody.message || 'Pin created successfully!',
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
        message: 'Something went wrong! Please try again later.',
        error: error?.message || error,
      };
      }
    }
  }