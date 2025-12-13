document.addEventListener('DOMContentLoaded', function () {
    //------------------- PANTALLA DE BIENVENIDA --------------------------
    const pantallaWelcome = document.getElementById('pantallaWelcome');
    const welcomePortfolioBtn = document.getElementById('welcomePortfolioBtn');
    const toggleWelcome = document.getElementById('toggleWelcome');
    const toggleMain = document.getElementById('toggle');
    const welcomeCvBtn = document.getElementById('welcomeCvBtn');
    const parallaxBg = document.querySelector('.welcome-parallax-bg');

    // Sincronizar idioma guardado en localStorage
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang === 'en') {
        if (toggleWelcome) toggleWelcome.checked = true;
        if (toggleMain) toggleMain.checked = true;
    }

    // Parallax en el fondo de bienvenida
    if (pantallaWelcome && parallaxBg) {
        pantallaWelcome.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            parallaxBg.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // Sincronizar toggle de welcome con toggle principal
    if (toggleWelcome) {
        toggleWelcome.addEventListener('change', () => {
            const nuevoIdioma = toggleWelcome.checked ? 'en' : 'es';
            localStorage.setItem('preferredLang', nuevoIdioma);

            // Sincronizar con toggle principal
            if (toggleMain) toggleMain.checked = toggleWelcome.checked;

            // Actualizar textos y CV en welcome screen con transición suave
            actualizarWelcomeScreenIdioma(nuevoIdioma, true);
        });
    }

    // Función para actualizar textos de welcome screen con transición suave
    function actualizarWelcomeScreenIdioma(idioma, conTransicion = false) {
        const welcomeContent = document.querySelector('.welcome-content');

        function aplicarTextos() {
            const rutaJSON = `./JS/lang/${idioma}.json`;
            fetch(rutaJSON)
                .then(res => res.json())
                .then(textos => {
                    // Actualizar textos con data-lang en welcome screen
                    pantallaWelcome.querySelectorAll('[data-lang]').forEach(el => {
                        const clave = el.getAttribute('data-lang');
                        if (textos[clave]) {
                            el.innerHTML = textos[clave];
                        }
                    });

                    // Actualizar enlace de CV
                    if (welcomeCvBtn) {
                        if (idioma === 'es') {
                            welcomeCvBtn.href = './assets/curriculum-steven-rojas.pdf';
                            welcomeCvBtn.download = 'Curriculum-Steven-Rojas.pdf';
                        } else {
                            welcomeCvBtn.href = './assets/resume-steven-rojas.pdf';
                            welcomeCvBtn.download = 'Resume-Steven-Rojas.pdf';
                        }
                    }

                    // Fade in después de actualizar textos
                    if (conTransicion && welcomeContent) {
                        setTimeout(() => {
                            welcomeContent.style.opacity = '1';
                        }, 50);
                    }
                })
                .catch(err => console.error('Error cargando idioma en welcome:', err));
        }

        // Si es con transición, hacer fade out primero
        if (conTransicion && welcomeContent) {
            welcomeContent.style.transition = 'opacity 0.3s ease';
            welcomeContent.style.opacity = '0';
            setTimeout(aplicarTextos, 300);
        } else {
            aplicarTextos();
        }
    }

    // Cargar idioma inicial para welcome screen
    if (pantallaWelcome) {
        const idiomaInicial = savedLang || 'es';
        actualizarWelcomeScreenIdioma(idiomaInicial);
    }

    // Botón "Visitar Portafolio" - oculta la pantalla de bienvenida
    if (welcomePortfolioBtn && pantallaWelcome) {
        welcomePortfolioBtn.addEventListener('click', () => {
            pantallaWelcome.classList.add('oculta');
        });
    }
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
    //------------------- ANIMACIÓN HEADER --------------------------
    const palabrasPorIdioma = {
        es: ["Web", "Foto", "Video"],
        en: ["Web", "Photo", "Video"]
    };
    let idiomaActual = localStorage.getItem('preferredLang') || 'es';
    let currentTextos = {}; // Store current translations globally

    const cambiadorId = "cambiador";
    let intervaloCambiador = null;
    function iniciarAnimacionCambiador() {
        const cambiador = document.getElementById(cambiadorId);
        if (!cambiador) return;

        cambiador.style.transition = "opacity 0.5s ease-in-out";
        cambiador.style.opacity = "1";

        let palabras;
        if (idiomaActual === 'es') {
            palabras = palabrasPorIdioma.es;
        } else {
            palabras = palabrasPorIdioma.en;
        }

        if (intervaloCambiador) {
            clearInterval(intervaloCambiador);
            intervaloCambiador = null;
        }

        let indexCambiador = palabras.indexOf(cambiador.textContent.trim());
        if (indexCambiador < 0) {
            indexCambiador = 0;
        }
        cambiador.textContent = palabras[indexCambiador];

        intervaloCambiador = setInterval(() => {
            const el = document.getElementById(cambiadorId);
            if (!el) {
                clearInterval(intervaloCambiador);
                intervaloCambiador = null;
                return;
            }
            el.style.opacity = "0";
            setTimeout(() => {
                indexCambiador = (indexCambiador + 1) % palabras.length;
                el.textContent = palabras[indexCambiador];
                el.style.opacity = "1";
            }, 500);
        }, 2500);
    }
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
    //------------------- BARRA PROYECTOS --------------------------
    const radios = document.querySelectorAll('.radio-container input[name="project"]');
    const glider = document.querySelector('.radio-container .glider');
    radios.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            if (radio.checked && glider) {
                glider.style.transform = `translateY(${index * 100}%)`;
            }
        });
    });
    //------------------- CAMBIO DE PROYECTOS -------------------------
    const titulo = document.getElementById("projectTitle");
    const circle = document.querySelector(".circleProject");
    const btn = document.getElementById("visitBtn");

    let projectTimeout;

    function updateProjectContent() {
        const selectedRadio = document.querySelector("input[name='project']:checked");
        if (!selectedRadio) return;

        // Elementos para animar
        const elementsToAnimate = [titulo, circle];

        // Desvanecer (Fade out)
        elementsToAnimate.forEach(el => { if (el) el.style.opacity = '0'; });

        if (projectTimeout) clearTimeout(projectTimeout);

        projectTimeout = setTimeout(() => {
            // Helper para obtener texto o fallback
            const getTitle = (key, fallback) => currentTextos[key] || fallback;

            if (selectedRadio.id === "proj1") {
                if (titulo) titulo.textContent = getTitle('project_1_title', "Congreso de Café");
                if (circle) {
                    circle.style.backgroundImage = "url('./assets/imgs/project-1.png')";
                    circle.href = "https://congreso-de-cafe.vercel.app/";
                }
                if (btn) btn.href = "https://congreso-de-cafe.vercel.app/";
            } else if (selectedRadio.id === "proj2") {
                if (titulo) titulo.textContent = getTitle('project_2_title', "Fit Force");
                if (circle) {
                    circle.style.backgroundImage = "url('./assets/imgs/project-2.png')";
                    circle.href = "https://fit-force-final.vercel.app/";
                }
                if (btn) btn.href = "https://fit-force-final.vercel.app/";
            } else if (selectedRadio.id === "proj3") {
                if (titulo) titulo.textContent = getTitle('project_3_title', "Bonfire Lit");
                if (circle) {
                    circle.style.backgroundImage = "url('./assets/imgs/project-3.png')";
                    circle.href = "https://bonfire-lit.vercel.app/";
                }
                if (btn) btn.href = "https://bonfire-lit.vercel.app/";
            } else if (selectedRadio.id === "proj4") {
                if (titulo) titulo.textContent = getTitle('project_4_title', "Delivery Counter");
                if (circle) {
                    circle.style.backgroundImage = "url('./assets/imgs/project-4.png')";
                    circle.href = "https://delivery-counter.vercel.app/";
                }
                if (btn) btn.href = "https://delivery-counter.vercel.app/";
            }
            // Aparecer (Fade in)
            elementsToAnimate.forEach(el => { if (el) el.style.opacity = '1'; });
        }, 300);
    }

    document.querySelectorAll("input[name='project']").forEach(input => {
        input.addEventListener("change", updateProjectContent);
    });

    if (titulo) titulo.textContent = "Congreso de Café";
    if (circle) circle.style.backgroundImage = "url('./assets/imgs/project-1.png')";
    if (btn) btn.href = "https://congreso-de-cafe.vercel.app/";
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
                    confirmButtonColor: 'var(--color-ctas)'
                });
                return;
            }
            emailjs.sendForm("service_imnngtd", "template_gj5v8t2", form)
                .then(() => {
                    Swal.fire({
                        title: 'Mensaje enviado',
                        html: 'Te responderé en <span style="color: var(--color-ctas)"><b>menos de 48 horas</b></span>.',
                        icon: 'success',
                        confirmButtonColor: 'var(--color-ctas)'
                    });
                    form.reset();
                    actualizarBtn();
                })
                .catch(() => {
                    Swal.fire({
                        title: 'Error al enviar',
                        text: 'Intenta nuevamente más tarde.',
                        icon: 'error',
                        confirmButtonColor: 'var(--color-ctas)'
                    });
                });
        });
    }
    //------------------- VIDEO (FACADE + IDIOMA) -------------------------
    function loadVideo(container) {
        const videoId = container.getAttribute('data-video-id');
        if (!videoId) return;
        container.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1"
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen
            </iframe>`;
    }
    window.loadVideo = loadVideo;
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

        // Sincronizar con toggle de welcome screen
        const toggleWelcomeSync = document.getElementById('toggleWelcome');
        if (toggleWelcomeSync) toggleWelcomeSync.checked = (nuevoIdioma === 'en');

        setTimeout(() => {
            idiomaActual = nuevoIdioma;
            cargarTextosDelIdioma(idiomaActual);
            document.documentElement.setAttribute('lang', idiomaActual);
            document.body.classList.remove('cambiando-idioma');
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
                currentTextos = textos; // Save translations
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
                // Actualizar enlace del CV
                const cvLink = document.getElementById('cvDownloadLink');
                if (cvLink) {
                    if (codigoIdioma === 'es') {
                        cvLink.href = './assets/curriculum-steven-rojas.pdf';
                        cvLink.download = 'Curriculum-Steven-Rojas.pdf';
                        cvLink.setAttribute('aria-label', 'Descargar CV en español');
                    } else {
                        cvLink.href = './assets/resume-steven-rojas.pdf';
                        cvLink.download = 'Resume-Steven-Rojas.pdf';
                        cvLink.setAttribute('aria-label', 'Download CV in English');
                    }
                }
                // Actualizar video según idioma
                const facade = document.getElementById('video-facade');
                if (facade) {
                    const iframe = facade.querySelector('iframe');
                    let videoId, thumbUrl, ariaLabel;
                    if (codigoIdioma === 'es') {
                        videoId = 'EVg6SpPAvN4';
                        thumbUrl = 'https://img.youtube.com/vi/EVg6SpPAvN4/maxresdefault.jpg';
                        ariaLabel = 'Reproducir video';
                    } else {
                        videoId = 'IiTgIV8UyYk';
                        thumbUrl = 'https://img.youtube.com/vi/IiTgIV8UyYk/maxresdefault.jpg';
                        ariaLabel = 'Play video';
                    }
                    if (iframe) {
                        facade.innerHTML = `
                            <img src="${thumbUrl}" alt="Video de Steven Rojas" loading="lazy">
                            <button class="btnPlay flex animation" aria-label="${ariaLabel}">
                                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </button>
                        `;
                        facade.setAttribute('data-video-id', videoId);
                        facade.setAttribute('tabindex', '0');
                        facade.addEventListener('click', function () {
                            loadVideo(facade);
                        });
                    } else {
                        const img = facade.querySelector('img');
                        if (img) img.src = thumbUrl;
                        facade.setAttribute('data-video-id', videoId);
                        const btn = facade.querySelector('.btnPlay');
                        if (btn) btn.setAttribute('aria-label', ariaLabel);
                    }
                }
                updateProjectContent(); // Update project title with new language
                // Reiniciar animación del header
                iniciarAnimacionCambiador();
            })
            .catch(err => {
                console.error('Error al cargar idioma:', err);
                // Opcional: usar fallback o mantener contenido actual
                iniciarAnimacionCambiador();
            });
    }
    //------------------- CHATBOT --------------------------
    const botContainer = document.getElementById('bot-container');
    const botIframe = document.getElementById('bot-iframe');
    let chatOpen = false;
    if (botContainer && botIframe) {
        botContainer.addEventListener('click', () => {
            if (chatOpen) {
                botIframe.style.display = 'none';
                chatOpen = false;
            } else {
                botIframe.style.display = 'block';
                botIframe.style.position = 'fixed';
                botIframe.style.bottom = '100px';
                botIframe.style.right = '20px';
                botIframe.style.zIndex = '10000';
                chatOpen = true;
            }
        });
        // Cierra al click fuera
        document.addEventListener('click', (e) => {
            if (!botContainer.contains(e.target) && !botIframe.contains(e.target) && chatOpen) {
                botIframe.style.display = 'none';
                chatOpen = false;
            }
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
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right');
    animatedElements.forEach(el => observer.observe(el));
});
