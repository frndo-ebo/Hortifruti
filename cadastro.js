// Garante que o JavaScript só vai rodar DEPOIS que todo o HTML estiver montado na tela
document.addEventListener("DOMContentLoaded", () => {
  // Captura o formulário da página pra gente conseguir controlar o evento de envio
  const form = document.querySelector("form");

  // Intercepta o clique no botão de submit ou o "Enter" dentro do formulário
  form.addEventListener("submit", (event) => {
    // Evita o comportamento padrão do HTML, que seria atualizar a página inteira
    event.preventDefault();

    // Pega o que foi digitado em cada campo. O .trim() limpa espaços vazios acidentais no início/fim
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const senha = document.getElementById("senha").value;

    // Regra de segurança básica: se a senha tiver menos de 6 dígitos, cancela tudo aqui
    if (senha.length < 6) {
      alert("A senha precisa conter no mínimo 6 caracteres!");
      return; // Esse return vazio mata a função e não deixa o código continuar para baixo
    }

    // Cria um objeto organizado com as informações que o usuário digitou
    const dadosUsuario = {
      nome: nome,
      email: email,
      telefone: telefone,
      senha: senha
    };

    // Salva a string do objeto no LocalStorage do navegador (simula um banco de dados local provisório)
    localStorage.setItem("usuarioCadastrado", JSON.stringify(dadosUsuario));

    // Alerta de sucesso bem amigável usando Template Literals pra mostrar o nome da pessoa
    alert(`Sucesso! Os dados de ${nome} foram guardados.`);
    
    // Redireciona o usuário direto para a página inicial do e-commerce pós-cadastro
    window.location.href = "index.html";
  });
});
