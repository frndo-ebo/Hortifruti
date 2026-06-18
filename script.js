document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const senha = document.getElementById("senha").value;

    if (senha.length < 6) {
      alert("A senha precisa conter no mínimo 6 caracteres!");
      return;
    }

    const dadosUsuario = {
      nome: nome,
      email: email,
      telefone: telefone,
      senha: senha
    };

    localStorage.setItem("usuarioCadastrado", JSON.stringify(dadosUsuario));

    alert(`Sucesso! Os dados de ${nome} foram guardados localmente no seu navegador.`);
    
    form.reset();
  });
});