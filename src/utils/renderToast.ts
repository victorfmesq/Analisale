import { toast } from "react-toastify";

const renderToast = (message: string) => {
  toast(`${message}`, {
    position: "top-center",
    autoClose: 3000,
    closeButton: false, // Remover o botão de fechar
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(0deg, #000 30%, #333 90%)", // Gradiente laranja e rosa
      color: "#fff", // Cor do texto
      borderRadius: "8px", // Borda arredondada
      padding: "20px", // Preenchimento interno
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra suave
      fontFamily: "Arial, sans-serif", // Fonte
    },
    bodyStyle: {
      fontSize: "1rem", // Tamanho da fonte do corpo
    },
  });
};

export default renderToast;
