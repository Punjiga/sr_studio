document.addEventListener('DOMContentLoaded', function () {
    //------------------- MENU HAMBURGUESA --------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const menuList = document.getElementById('menu');
    const closeBtn = document.querySelector('.close-menu');
    function openMenu() {
        menuToggle.classList.add('open');
        menuList.classList.add('active');
    }
    function closeMenu() {
        menuToggle.classList.remove('open');
        menuList.classList.remove('active');
    }
    menuToggle.addEventListener('click', () => {
        if (menuToggle.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }
    document.querySelectorAll('#menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    //------------------- FONDO ANIMADO --------------------------
    if (window.loadParticles) {
        loadParticles("tsparticles");
    }
    //------------------- HERO TYPING ANIMATION --------------------------
    const heroTyped = document.getElementById('heroTyped');
    const frasesPorIdioma = {
        es: [
            "Diseñamos tu web...",
            "Atraemos clientes...",
            "Resultados reales."
        ],
        en: [
            "We design your site...",
            "We attract clients...",
            "Real results."
        ]
    };
    let idiomaActual = localStorage.getItem('preferredLang') || 'es';
    let typingInterval = null;
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeAnimation() {
        if (!heroTyped) return;
        const frases = frasesPorIdioma[idiomaActual] || frasesPorIdioma.es;
        const currentPhrase = frases[currentPhraseIndex];

        if (!isDeleting) {
            heroTyped.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            if (currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else {
                typingSpeed = 80;
            }
        } else {
            heroTyped.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 40;
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % frases.length;
                typingSpeed = 500; // Pause before next phrase
            }
        }

        clearTimeout(typingInterval);
        typingInterval = setTimeout(typeAnimation, typingSpeed);
    }

    function startTyping() {
        currentPhraseIndex = 0;
        currentCharIndex = 0;
        isDeleting = false;
        if (heroTyped) heroTyped.textContent = '';
        clearTimeout(typingInterval);
        typingInterval = setTimeout(typeAnimation, 500);
    }

    startTyping();

    //------------------- FLECHA ARRIBA --------------------------
    const goUp = document.getElementById('goUp');
    window.addEventListener('scroll', () => {
        if (!goUp) return;
        if (window.scrollY > 50) {
            goUp.classList.add('show');
        } else {
            goUp.classList.remove('show');
        }
    });
    if (goUp) {
        goUp.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
    //------------------- FORMULARIO -------------------------
    if (window.emailjs) {
        emailjs.init("_SC3QrHOmpfnC4f8J");
    }
    const form = document.getElementById("mi-form");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("correo");
    const mensaje = document.getElementById("mensaje");
    const enviarBtn = form ? form.querySelector("button[type='submit']") : null;
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    function validarForm() {
        if (!nombre || !email || !mensaje) return false;
        if (nombre.value.trim().length < 2) return false;
        if (!validarEmail(email.value.trim())) return false;
        if (mensaje.value.trim().length < 10) return false;
        return true;
    }
    function actualizarBtn() {
        if (!enviarBtn) return;
        if (validarForm()) {
            enviarBtn.disabled = false;
            enviarBtn.style.opacity = "1";
            enviarBtn.style.cursor = "pointer";
        } else {
            enviarBtn.disabled = true;
            enviarBtn.style.opacity = "0.5";
            enviarBtn.style.cursor = "not-allowed";
        }
    }
    if (enviarBtn) {
        enviarBtn.disabled = true;
        enviarBtn.style.opacity = "0.5";
        enviarBtn.style.cursor = "not-allowed";
    }
    [nombre, email, mensaje].forEach(input => {
        if (input) {
            input.addEventListener("input", actualizarBtn);
        }
    });
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!validarForm()) {
                Swal.fire({
                    title: 'Formulario incompleto',
                    html: 'Revisa que tu <b>nombre</b> tenga al menos 2 caracteres, tu <b>email</b> sea válido y el <b>mensaje</b> tenga al menos 10 caracteres.',
                    icon: 'error',
                    confirmButtonColor: '#E8E8E8'
                });
                return;
            }
            emailjs.sendForm("service_imnngtd", "template_gj5v8t2", form)
                .then(() => {
                    Swal.fire({
                        title: 'Mensaje enviado',
                        html: 'Te responderé en <span style="color: #E8E8E8; font-weight: bold;">menos de 24 horas</span>.',
                        icon: 'success',
                        confirmButtonColor: '#E8E8E8'
                    });
                    form.reset();
                    actualizarBtn();
                })
                .catch(() => {
                    Swal.fire({
                        title: 'Error al enviar',
                        text: 'Intenta nuevamente más tarde.',
                        icon: 'error',
                        confirmButtonColor: '#E8E8E8'
                    });
                });
        });
    }
    //------------------- CAMBIO DE IDIOMA -------------------------
    const interruptorIdioma = document.getElementById('toggle');
    const elementosTraducibles = document.querySelectorAll('[data-lang]');

    // Sincronizar toggle principal con idioma guardado
    if (interruptorIdioma && idiomaActual === 'en') {
        interruptorIdioma.checked = true;
    }

    cargarTextosDelIdioma(idiomaActual);
    if (interruptorIdioma) {
        interruptorIdioma.addEventListener('change', () => {
            let nuevoIdioma = interruptorIdioma.checked ? 'en' : 'es';
            if (nuevoIdioma !== idiomaActual) {
                cambiarIdioma(nuevoIdioma);
            }
        });
    }
    function cambiarIdioma(nuevoIdioma) {
        document.body.classList.add('cambiando-idioma');
        localStorage.setItem('preferredLang', nuevoIdioma);

        setTimeout(() => {
            idiomaActual = nuevoIdioma;
            cargarTextosDelIdioma(idiomaActual);
            document.documentElement.setAttribute('lang', idiomaActual);
            document.body.classList.remove('cambiando-idioma');
            // Restart typing animation with new language
            startTyping();
        }, 300);
    }
    function cargarTextosDelIdioma(codigoIdioma) {
        const rutaJSON = `./JS/lang/${codigoIdioma}.json`;
        fetch(rutaJSON)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`No se pudo cargar ${rutaJSON}`);
                }
                return res.json();
            })
            .then(textos => {
                // Traducir elementos con data-lang
                elementosTraducibles.forEach(el => {
                    const clave = el.getAttribute('data-lang');
                    if (textos[clave]) {
                        el.innerHTML = textos[clave];
                    }
                });
                // Traducir placeholders del formulario
                const camposFormulario = [
                    { id: 'nombre', key: 'form_name_placeholder' },
                    { id: 'correo', key: 'form_email_placeholder' },
                    { id: 'mensaje', key: 'form_message_placeholder' }
                ];
                for (let i = 0; i < camposFormulario.length; i++) {
                    const item = camposFormulario[i];
                    const input = document.getElementById(item.id);
                    if (input && textos[item.key]) {
                        input.placeholder = textos[item.key];
                    }
                }
            })
            .catch(err => {
                console.error('Error al cargar idioma:', err);
            });
    }

    //------------------- ANIMACIONES SCROLL (INTERSECTION OBSERVER) -------------------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right');
    animatedElements.forEach(el => observer.observe(el));
});
