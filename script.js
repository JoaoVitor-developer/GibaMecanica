// Toggle menu mobile
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.classList.toggle('open');
    });
    menuToggle.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' ') {
        navMenu.classList.toggle('open');
        menuToggle.classList.toggle('open');
      }
    });

    // Scroll menu active link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (pageYOffset >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
          link.classList.add('active');
        }
      });
    });

    // Intersection Observer para animação fade-in
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.servico-card, .card, .sobre-nos, .depoimentos, .contact').forEach(el => {
      el.classList.add('hidden');
      observer.observe(el);
    });

// Botão voltar ao topo
    /*
    const topBtn = document.getElementById('topBtn');
    window.addEventListener('scroll', () => {
      topBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });
    topBtn.addEventListener('click', () => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
*/

    // Alerta de boas vindas na primeira visita
    window.addEventListener('DOMContentLoaded', () => {
      if (!sessionStorage.getItem('visited')) {
        alert('Bem-vindo à Garagem 347 - Mecânica Geral!');
        sessionStorage.setItem('visited', 'true');
      }
    });

    // Slider simples de depoimentos
    const depoimentos = document.querySelectorAll('.depoimento');
    let depoIndex = 0;

    function showDepoimento(index) {
      depoimentos.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    setInterval(() => {
      depoIndex = (depoIndex + 1) % depoimentos.length;
      showDepoimento(depoIndex);
    }, 7000);

    document.addEventListener('DOMContentLoaded', () => {
  const particlesContainer = document.querySelector('.particles');
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('span');
    
    // tamanho aleatório
    const size = Math.random() * 8 + 2; 
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // posição inicial aleatória
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // duração e atraso aleatórios
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 10;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    particlesContainer.appendChild(particle);
  }
});

document.querySelectorAll('.avaliacao').forEach(avaliacao => {
  const estrelas = avaliacao.querySelectorAll('.estrelas span');
  const textarea = avaliacao.querySelector('textarea');
  const btn = avaliacao.querySelector('.btn-avaliar');
  const comentariosDiv = avaliacao.querySelector('.comentarios');
  const serviceId = avaliacao.querySelector('.estrelas').dataset.serviceId;

  let rating = 0;

  // Atualiza visual das estrelas ao passar mouse
  estrelas.forEach(star => {
    star.addEventListener('mouseover', () => {
      clearHover();
      highlightStars(star.dataset.value);
    });
    star.addEventListener('mouseout', () => {
      clearHover();
      highlightStars(rating);
    });
    star.addEventListener('click', () => {
      rating = star.dataset.value;
      highlightStars(rating);
    });
  });

  function clearHover() {
    estrelas.forEach(star => star.classList.remove('hovered'));
  }

  function highlightStars(rating) {
    estrelas.forEach(star => {
      if(star.dataset.value <= rating) {
        star.classList.add('hovered');
      } else {
        star.classList.remove('hovered');
      }
    });
  }

  // Função para salvar comentário + nota
  btn.addEventListener('click', () => {
    if(rating === 0) {
      alert('Por favor, selecione uma nota.');
      return;
    }
    if(textarea.value.trim() === '') {
      alert('Por favor, escreva um comentário.');
      return;
    }

    const novaAvaliacao = {
      rating: Number(rating),
      comentario: textarea.value.trim(),
      data: new Date().toLocaleString()
    };

    let avaliacoes = JSON.parse(localStorage.getItem(`avaliacoes_${serviceId}`)) || [];
    avaliacoes.push(novaAvaliacao);
    localStorage.setItem(`avaliacoes_${serviceId}`, JSON.stringify(avaliacoes));

    textarea.value = '';
    rating = 0;
    highlightStars(rating);
    alert('Avaliação enviada!');

    mostrarAvaliacoes();
  });

  // Função para mostrar avaliações já salvas
  function mostrarAvaliacoes() {
    const avaliacoes = JSON.parse(localStorage.getItem(`avaliacoes_${serviceId}`)) || [];
    comentariosDiv.innerHTML = avaliacoes.map(av => `
      <div>
        <strong>${'★'.repeat(av.rating)}${'☆'.repeat(5 - av.rating)}</strong><br>
        <small><em>${av.data}</em></small>
        <p>${av.comentario}</p>
        <hr>
      </div>
    `).join('');
  }

  mostrarAvaliacoes();
});

 document.getElementById('form-contato').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Seu número de WhatsApp (substitua pelo seu número no formato 5511999999999)
        const seuNumeroWhatsApp = '5511972659272';
        
        // Coletando os dados do formulário
        const nome = encodeURIComponent(document.getElementById('nome-contato').value);
        const telefone = encodeURIComponent(document.getElementById('telefone-contato').value);
        const email = encodeURIComponent(document.getElementById('email-contato').value);
        const mensagem = encodeURIComponent(document.getElementById('mensagem-contato').value);
        
        // Criando a mensagem formatada
        const texto = `*Nova mensagem do site Mainichi Car Service:*%0A%0A*Nome:* ${nome}%0A*Telefone:* ${telefone}%0A*Email:* ${email}%0A*Mensagem:* ${mensagem}`;
        
        // Redirecionando para o WhatsApp
        window.location.href = `https://wa.me/${seuNumeroWhatsApp}?text=${texto}`;
    });


document.addEventListener('DOMContentLoaded', () => {
  const contatoLink = document.querySelector('a[href="#contato"]');
  const contatoModal = document.getElementById('contato');
  const overlay = document.getElementById('contato-overlay');
  const closeBtn = document.querySelector('#contato .close-btn');

  // Ao clicar em "Contato"
  contatoLink.addEventListener('click', (e) => {
    e.preventDefault();
    contatoModal.style.display = 'block';
    overlay.style.display = 'block';
  });

  // Ao clicar no botão de fechar
  closeBtn.addEventListener('click', () => {
    contatoModal.style.display = 'none';
    overlay.style.display = 'none';
  });

  // Clicar fora do formulário fecha também
  overlay.addEventListener('click', () => {
    contatoModal.style.display = 'none';
    overlay.style.display = 'none';
  });
});