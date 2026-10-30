# SR Studio

Portafolio de Steven Rojas · diseño y desarrollo web en Costa Rica.

## Estructura
- `index.html`: contenido principal, metadatos, enlaces y formularios.
- `styles/site.css`: sistema visual y diseño adaptable.
- `scripts/site.js`: menú, animaciones no esenciales y preparación del mensaje de WhatsApp.
- `favicon.png`: monograma SR optimizado (aportado por el propietario).
- `robots.txt`, `sitemap.xml`, `site.webmanifest`: descubrimiento y acceso.

Sin frameworks ni bibliotecas JavaScript de terceros. La página es estática y puede desplegarse en Vercel u hospedaje similar.

## Precios
Los montos publicados son precios de entrada **sujetos a alcances limitados** y a propuesta escrita. No incluyen automáticamente hosting, dominio, mantenimiento ni funcionalidades externas. Antes de publicar cambios comerciales se deben validar disponibilidad y condiciones fiscales aplicables.

## Contacto
El formulario abre WhatsApp con un mensaje precargado. El usuario debe confirmar el envío en WhatsApp. No existe backend ni almacenamiento de respuestas.

## Privacidad
Se retiró el script de Clarity hasta disponer de un aviso apropiado de privacidad y una configuración de consentimiento. No presentar el sitio como certificado WCAG sin pruebas completas.

## Copia de seguridad
Antes de la limpieza se conservó el histórico de Git y una rama de respaldo. Para recuperar archivos eliminados se puede consultar la rama `backup/portafolio-anterior-2026-10-30` y el commit anterior `b971cdf810ae62aa02748a607bd978b66afc2cee`.

## Comprobaciones pendientes tras desplegar
1. Abrir menú y formulario en móvil real; verificar todos los enlaces externos.
2. Ejecutar PageSpeed Insights/Lighthouse y comprobar teclado y lectores de pantalla.
3. Confirmar Vercel, DNS y capacidad de entrega a WhatsApp en condiciones reales.
