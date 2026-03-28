'use client';

import { Instagram, Facebook, Linkedin, Plus } from 'lucide-react';
import { EmailInput, PasswordInput } from '@/components/ui/auth-input';
import {
  AuthShell,
  AuthHero,
  AuthBody,
  AuthTitle,
  AuthSubtitle,
  AuthCtaButton,
  SocialIconButton,
  AuthLink,
} from '@/components/auth';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop';

const LogoMark = (
  <div className="w-16 h-16 bg-[#ff6b00] rounded-[18px] flex items-center justify-center shadow-md">
    <Plus size={36} className="text-white" strokeWidth={3.5} />
  </div>
);

export default function SignInPage() {
  return (
    <AuthShell withHero>
      <AuthHero
        imageSrc={HERO_IMAGE}
        imageAlt="Gym equipment background"
        logoMark={LogoMark}
      />

      {/* Main Content */}
      <AuthBody>
        <AuthTitle className="mb-1">Sign In To Sandow</AuthTitle>
        <AuthSubtitle className="mb-10">
          Let's personalize your fitness with AI
        </AuthSubtitle>

        {/* Form Container */}
        <div className="w-full max-w-sm space-y-5">
          <EmailInput
            label="Email Address"
            placeholder="elementary221b@gmail.com"
          />

          <PasswordInput
            label="Password"
            placeholder="***********"
          />

          {/* Sign In Button */}
          <AuthCtaButton className="mt-6">
            Sign In
          </AuthCtaButton>

          {/* Social Logins */}
          <div className="flex justify-center gap-4 pt-4">
            <SocialIconButton
              icon={<Instagram size={24} className="text-slate-700" />}
              label="Sign in with Instagram"
            />
            <SocialIconButton
              icon={<Facebook size={24} className="text-slate-700" />}
              label="Sign in with Facebook"
            />
            <SocialIconButton
              icon={<Linkedin size={24} className="text-slate-700" />}
              label="Sign in with LinkedIn"
            />
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-4 pt-6 pb-2">
            <div className="text-[15px] font-medium text-slate-500">
              Don't have an account?{" "}
              <AuthLink href="/auth/sign-up">Sign Up.</AuthLink>
            </div>
            <AuthLink href="/auth/forgot-password">Forgot Password</AuthLink>
          </div>
        </div>
      </AuthBody>
    </AuthShell>
  );
}