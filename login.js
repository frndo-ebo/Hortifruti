// Espera a árvore do HTML carregar 100% antes de mexer com qualquer elemento
document.addEventListener("DOMContentLoaded", () => {
  // Captura o formulário de login para podermos controlar o evento de envio
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    // Interrompe o refresh automático da página que o HTML faz por padrão
    event.preventDefault();

    // Pega as strings dos inputs. O .trim() mata espaços extras que o usuário digita sem querer
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    // Tenta buscar a string do usuário que salvamos lá na tela de cadastro através do LocalStorage
    const usuarioCadastrado = JSON.parse(localStorage.getItem("usuarioCadastrado"));

    // Validação de segurança: se o cara limpou o histórico ou nunca se cadastrou neste navegador
    if (!usuarioCadastrado) {
      alert("Nenhum usuário cadastrado neste navegador! Vá para a tela de cadastro.");
      return; // Para a execução do código bem aqui
    }

    // Compara se o e-mail e a senha digitados batem exatamente com o que está guardado
    if (email === usuarioCadastrado.email && senha === usuarioCadastrado.senha) {
      // Deu bom! Saudação personalizada usando o nome que foi registrado lá atrás
      alert(`Bem-vindo de volta, ${usuarioCadastrado.nome}!`);
      
      // Manda o usuário autenticado direto para a home do site
      window.location.href = "index.html";
    } else {
      // Se qualquer um dos dois dados estiver errado, joga o erro genérico (boa prática de segurança)
      alert("E-mail ou senha incorretos!");
    }
  });
});
