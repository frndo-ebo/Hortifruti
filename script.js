// Espera todo o HTML da página carregar para o script não tentar pegar elementos que ainda não existem
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona o formulário de cadastro da tela
  const form = document.querySelector("form");

  // Ouve quando o usuário tenta enviar o formulário (clicando no botão ou dando Enter)
  form.addEventListener("submit", (event) => {
    // Para o envio padrão do HTML que iria dar um refresh na página inteira
    event.preventDefault();

    // Captura os valores de cada campo e o .trim() remove espaços extras bobos no início/fim
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const senha = document.getElementById("senha").value;

    // Validação básica de segurança para a senha não ser curta demais
    if (senha.length < 6) {
      alert("A senha precisa conter no mínimo 6 caracteres!");
      return; // Mata a execução da função bem aqui para não avançar no cadastro
    }

    // Monta o objeto com os dados limpos do novo usuário
    const dadosUsuario = {
      nome: nome,
      email: email,
      telefone: telefone,
      senha: senha
    };

    // Converte o objeto em texto (JSON) e guarda no banco local do navegador do cliente
    localStorage.setItem("usuarioCadastrado", JSON.stringify(dadosUsuario));

    // Alerta simpático avisando que deu tudo certo
    alert(`Sucesso! Os dados de ${nome} foram guardados localmente no seu navegador.`);
    // Redireciona o usuário para a página principal do site 
    window.location.href = "index.html";
  });
});
