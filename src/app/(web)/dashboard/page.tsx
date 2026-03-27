import React from 'react';

export default function WebAppPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-s-white">
      <h1 className="text-4xl font-bold font-heading text-s-orange mb-4">Jellow Web App</h1>
      <p className="text-lg text-s-dark-gray text-center max-w-2xl">
        This is a placeholder for the secondary web application interface, distinct from the mobile-native app.
      </p>
    </div>
  );
}
