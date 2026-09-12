import { useEffect, useRef } from "react";

const GOOGLE_SCRIPT_ID = "google-identity-services";

const SocialAuthOptions = ({ label = "or continue with", onProviderClick }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    const renderButton = () => {
      if (!window.google?.accounts?.id || !buttonRef.current) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: ({ credential }) => onProviderClick(credential),
      });
      buttonRef.current.replaceChildren();
      window.google.accounts.id.renderButton(buttonRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "rectangular",
      });
    };

    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID);
    if (existingScript) {
      renderButton();
      existingScript.addEventListener("load", renderButton);
      return () => existingScript.removeEventListener("load", renderButton);
    }

    const script = document.createElement("script");
    script.id = GOOGLE_SCRIPT_ID;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", renderButton);
    document.head.appendChild(script);
    return () => script.removeEventListener("load", renderButton);
  }, [onProviderClick]);

  return (
    <div className="flex flex-col items-center gap-3 mt-4 border-t pt-4 border-gray-200 text-sm text-gray-600 font-inter">
      <span>{label}</span>
      {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
        <div ref={buttonRef} />
      ) : (
        <span className="text-red-600">Google Client ID is not configured</span>
      )}
    </div>
  );
};

export default SocialAuthOptions;
