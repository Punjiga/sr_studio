(() => {
      const toggle=document.getElementById('menu-toggle');
      const links=document.getElementById('nav-links');
      toggle.addEventListener('click',()=>{
        const open=links.classList.toggle('open');
        toggle.setAttribute('aria-expanded',String(open));
        toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
      });
      links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
      function closeMenu(){links.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú')}
      document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
      document.addEventListener('click',event=>{if(!event.target.closest('.nav'))closeMenu()});
      const items=document.querySelectorAll('.reveal');
      const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(!reducedMotion && 'IntersectionObserver' in window){const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -20px 0px'});items.forEach(el=>io.observe(el))}else{items.forEach(el=>el.classList.add('visible'))}
      document.querySelectorAll('[data-plan]').forEach(link=>link.addEventListener('click',()=>{
        const select=document.getElementById('tipo');
        if(select && [...select.options].some(option=>option.value===link.dataset.plan)) select.value=link.dataset.plan;
      }));
      document.getElementById('current-year').textContent=String(new Date().getFullYear());
      document.getElementById('brief-form').addEventListener('submit',(event)=>{
        event.preventDefault();
        const nombre=document.getElementById('nombre').value.trim();
        const negocio=document.getElementById('negocio').value.trim();
        const tipo=document.getElementById('tipo').value;
        const detalle=document.getElementById('detalle').value.trim();
        const mensaje=`Hola, Steven. Soy ${nombre}, de ${negocio}.\n\nMe interesa: ${tipo}.\n\n${detalle||'Me gustaría conversar sobre mi proyecto.'}`;
        const url='https://wa.me/50689862668?text='+encodeURIComponent(mensaje);
        document.getElementById('form-feedback').textContent='Abriendo WhatsApp con tu mensaje preparado…';
        window.location.assign(url);
      });
    })();