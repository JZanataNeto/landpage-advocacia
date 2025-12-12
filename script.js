document.addEventListener("DOMContentLoaded", () => {
  // Seleciona o formulário pelo ID
  const form = document.getElementById("my-form");
  // Seleciona o botão de envio
  const statusButton = form.querySelector('button[type="submit"]');
  // Define o endpoint do Formspree
  const formUrl = "https://formspree.io/f/mldqabeb"; // <- COLOQUE SUA URL AQUI

  form.addEventListener("submit", async (event) => {
    // Previne o comportamento padrão de submissão do formulário (recarregar a página)
    event.preventDefault();

    // Desabilita o botão para evitar envios duplicados
    statusButton.disabled = true;
    statusButton.textContent = "Enviando...";

    // Coleta os dados do formulário automaticamente
    const formData = new FormData(form);

    try {
      // Envia a requisição POST para o endpoint do Formspree usando fetch
      const response = await fetch(formUrl, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json", // Solicita uma resposta JSON
        },
      });

      if (response.ok) {
        // Sucesso: exibe mensagem e reseta o formulário
        alert("Obrigado! Seu formulário foi enviado com sucesso.");
        form.reset();
      } else {
        // Erro: tenta ler a resposta de erro e exibe uma mensagem
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
      // Captura erros de rede ou outros problemas
      console.error(error);
      alert(
        "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde."
      );
    } finally {
      // Reabilita o botão após a conclusão (sucesso ou falha)
      statusButton.disabled = false;
      statusButton.textContent = "Enviar";
    }
  });
});
