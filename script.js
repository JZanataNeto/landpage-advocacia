document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("my-form");
  const statusButton = form.querySelector('button[type="submit"]');
  const formUrl = "https://formspree.io/f/mldqabeb";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    statusButton.disabled = true;
    statusButton.textContent = "Enviando...";

    const formData = new FormData(form);

    try {
      const response = await fetch(formUrl, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert("Obrigado! Seu formulário foi enviado com sucesso.");
        form.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          alert(
            "Ocorreu um erro: " +
              data.errors
                .map((error) => error.field + " " + error.message)
                .join(", ")
          );
        } else {
          throw new Error("Houve um problema com o envio do formulário.");
        }
      }
    } catch (error) {
      console.error(error);
      alert(
        "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde."
      );
    } finally {
      statusButton.disabled = false;
      statusButton.textContent = "Enviar";
    }
  });
});
