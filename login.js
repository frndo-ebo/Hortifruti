document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    // Busca o usuário que foi salvo lá no cadastro
    const usuarioCadastrado = JSON.parse(localStorage.getItem("usuarioCadastrado"));

    // Verifica se existe algum cadastro no localStorage
    if (!usuarioCadastrado) {
      alert("Nenhum usuário cadastrado neste navegador! Vá para a tela de cadastro.");
      return;
    }

    // Validação simples (Nível Técnico 1)
    if (email === usuarioCadastrado.email && senha === usuarioCadastrado.senha) {
      alert(`Bem-vindo de volta, ${usuarioCadastrado.nome}!`);
      
      // REDIRECIONAMENTO: Login correto, vai para a index
      window.location.href = "index.html";
    } else {
      alert("E-mail ou senha incorretos!");
    }
  });
});