import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    google: any;
  }
}

function GoogleLoginButton() {
  const navigate = useNavigate();

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-login-button"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleGoogleResponse = async (response: any) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: response.credential }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Hacer una solicitud para obtener el perfil del usuario
      const userRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });
      console.log("this is token", data.access_token)
      if (!userRes.ok) {
        throw new Error("No se pudo obtener el perfil del usuario.");
      }

      const userData = await userRes.json();
      localStorage.setItem("user_id", userData.id); // Guardar el ID en localStorage

        // Aquí redirigimos siempre a /home después de login exitoso
        navigate("/home");
      } else {
        const errorText = await res.text();
        console.error("Error en el backend:", errorText);
      }
    } catch (error) {
      console.error("Error en login con Google:", error);
    }
  };

  return <div id="google-login-button"></div>;
}

export default GoogleLoginButton;
