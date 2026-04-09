'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { EmailInput, PasswordInput, ConfirmPasswordInput } from '@/components/ui/auth-input';
import { authClient } from '@/lib/auth-client';
import {
  AuthShell,
  AuthHero,
  AuthBody,
  AuthTitle,
  AuthSubtitle,
  AuthCtaButton,
  AuthLink,
} from '@/components/auth';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop';

const PASSWORD_MISMATCH_ERROR = "ERROR: Password Don't Match!";

const LogoMark = (
  <div className="w-16 h-16 bg-[#ff6b00] rounded-[18px] flex items-center justify-center shadow-md">
    <Plus size={36} className="text-white" strokeWidth={3.5} />
  </div>
);

/**
 * Sign-up screen molecule.
 * Composes AuthShell, AuthHero, three AuthInput fields (email, password,
 * confirm-password), an AuthCTA, and a footer AuthLink.
 * Validates password match on confirm-password blur and on CTA press.
 */
export function SignUpScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = password === confirmPassword;
  const allFieldsFilled = email.trim() !== '' && password !== '' && confirmPassword !== '';
  const isCtaDisabled = !allFieldsFilled || !passwordsMatch;

  const handleConfirmBlur = () => {
    if (confirmPassword !== '' && !passwordsMatch) {
      setConfirmError(PASSWORD_MISMATCH_ERROR);
    } else {
      setConfirmError('');
    }
  };

  const handleSignUp = async () => {
    if (!passwordsMatch) {
      setConfirmError(PASSWORD_MISMATCH_ERROR);
      return;
    }
    setConfirmError('');
    setGeneralError('');
    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email: email.trim(),
        password,
        name: email.trim().split('@')[0],
      });

      if (error) {
        setGeneralError(error.message ?? 'Sign-up failed. Please try again.');
        return;
      }

      router.push('/');
      router.refresh();
    } catch {
      setGeneralError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell withHero>
      <AuthHero
        imageSrc={HERO_IMAGE}
        imageAlt="Background"
        logoMark={LogoMark}
      />

      <AuthBody>
        <AuthTitle className="mb-1">Sign Up For Free</AuthTitle>
        <AuthSubtitle className="mb-10">
          Quickly make your account in 1 minute
        </AuthSubtitle>

        <div className="w-full max-w-sm space-y-5">
          {generalError && (
            <p className="text-sm text-red-500 text-center" role="alert">
              {generalError}
            </p>
          )}

          <EmailInput
            label="Email Address"
            placeholder="elementary221b@gmail.com"
            value={email}
            onChange={setEmail}
          />

          <PasswordInput
            label="Password"
            placeholder="***********"
            value={password}
            onChange={setPassword}
          />

          <ConfirmPasswordInput
            label="Confirm Password"
            placeholder="***********"
            value={confirmPassword}
            onChange={(val) => {
              setConfirmPassword(val);
              if (confirmError && val === password) {
                setConfirmError('');
              }
            }}
            isInvalid={confirmError !== ''}
            errorMessage={confirmError}
            onBlur={handleConfirmBlur}
          />

          <AuthCtaButton
            className="mt-6"
            isLoading={isLoading}
            isDisabled={isCtaDisabled || isLoading}
            onClick={handleSignUp}
          >
            Sign Up
          </AuthCtaButton>

          <div className="flex flex-col items-center gap-4 pt-6 pb-2">
            <div className="text-[15px] font-medium text-slate-500">
              Already have an account?{' '}
              <AuthLink href="/auth/sign-in">Sign In.</AuthLink>
            </div>
          </div>
        </div>
      </AuthBody>
    </AuthShell>
  );
}
