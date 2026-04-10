document.getElementById('auditForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener datos de la empresa
    const empresa = document.getElementById('empresa').value;
    const email = document.getElementById('email').value;
    const sector = document.getElementById('sector').value;
    const empleados = document.getElementById('empleados').value;
    
    console.log('🔍 INICIANDO PROCESO DE AUDITORÍA');
    console.log('================================');
    console.log('📧 Email a enviar:', email);
    console.log('🏢 Empresa:', empresa);
    console.log('📂 Sector:', sector);
    console.log('👥 Empleados:', empleados);
    
    // Calcular puntaje por sección
    let puntajeIncidentes = 0;
    let puntajeCambios = 0;
    let puntajeAccesos = 0;
    
    // Gestión de Incidentes (preguntas 1-4)
    for(let i = 1; i <= 4; i++) {
        const respuesta = document.querySelector(`input[name="q${i}"]:checked`);
        if(respuesta) {
            puntajeIncidentes += parseInt(respuesta.value);
            console.log(`Pregunta ${i} (Incidentes): ${respuesta.value} puntos`);
        }
    }
    
    // Gestión de Cambios (preguntas 5-7)
    for(let i = 5; i <= 7; i++) {
        const respuesta = document.querySelector(`input[name="q${i}"]:checked`);
        if(respuesta) {
            puntajeCambios += parseInt(respuesta.value);
            console.log(`Pregunta ${i} (Cambios): ${respuesta.value} puntos`);
        }
    }
    
    // Gestión de Accesos (preguntas 8-10)
    for(let i = 8; i <= 10; i++) {
        const respuesta = document.querySelector(`input[name="q${i}"]:checked`);
        if(respuesta) {
            puntajeAccesos += parseInt(respuesta.value);
            console.log(`Pregunta ${i} (Accesos): ${respuesta.value} puntos`);
        }
    }
    
    console.log('================================');
    console.log('📊 PUNTAJES TOTALES:');
    console.log('Incidentes:', puntajeIncidentes, '/ 8');
    console.log('Cambios:', puntajeCambios, '/ 6');
    console.log('Accesos:', puntajeAccesos, '/ 6');
    
    // Calcular puntajes máximos
    const maxIncidentes = 8;
    const maxCambios = 6;
    const maxAccesos = 6;
    const puntajeTotal = puntajeIncidentes + puntajeCambios + puntajeAccesos;
    const puntajeMaximo = maxIncidentes + maxCambios + maxAccesos;
    
    // Calcular porcentaje
    const porcentaje = (puntajeTotal / puntajeMaximo) * 100;
    
    console.log('📈 PORCENTAJE TOTAL:', porcentaje.toFixed(2), '%');
    console.log('================================');
    
    // Determinar nivel de madurez
    let nivel, claseNivel, descripcion;
    
    if(porcentaje < 30) {
        nivel = "Nivel 1 - Inicial";
        claseNivel = "level-1";
        descripcion = "Los procesos son ad-hoc, no documentados y dependen de individuos.";
    } else if(porcentaje < 50) {
        nivel = "Nivel 2 - Repetible";
        claseNivel = "level-2";
        descripcion = "Existen prácticas básicas pero inconsistentes entre proyectos.";
    } else if(porcentaje < 70) {
        nivel = "Nivel 3 - Definido";
        claseNivel = "level-3";
        descripcion = "Los procesos están documentados y estandarizados.";
    } else if(porcentaje < 90) {
        nivel = "Nivel 4 - Gestionado";
        claseNivel = "level-4";
        descripcion = "Los procesos son medidos y controlados con métricas.";
    } else {
        nivel = "Nivel 5 - Optimizado";
        claseNivel = "level-5";
        descripcion = "Mejora continua basada en medición y feedback.";
    }
    
    console.log('🎯 NIVEL DE MADUREZ:', nivel);
    console.log('================================');
    
    // Generar recomendaciones
    let recomendaciones = [];
    
    if(puntajeIncidentes < maxIncidentes * 0.5) {
        recomendaciones.push("🚨 Gestión de Incidentes: Implementar un sistema de tickets y definir SLA de respuesta.");
    }
    
    if(puntajeCambios < maxCambios * 0.5) {
        recomendaciones.push("🔄 Gestión de Cambios: Establecer un comité de cambios y documentar todas las modificaciones.");
    }
    
    if(puntajeAccesos < maxAccesos * 0.5) {
        recomendaciones.push("🔐 Gestión de Accesos: Revisar permisos de usuarios e implementar autenticación multifactor.");
    }
    
    if(recomendaciones.length === 0) {
        recomendaciones.push("✅ ¡Excelente! Mantenga los procesos actuales y continúe con la mejora continua.");
    }
    
    console.log('💡 RECOMENDACIONES:', recomendaciones.length);
    recomendaciones.forEach((rec, index) => {
        console.log(`${index + 1}. ${rec}`);
    });
    console.log('================================');
    
    // Mostrar resultados
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.style.display = 'block';
    
    resultadoDiv.innerHTML = `
        <h2>📊 Resultado del Diagnóstico</h2>
        
        <div class="info-empresa">
            <p><strong>Empresa:</strong> ${empresa}</p>
            <p><strong>Sector:</strong> ${sector}</p>
            <p><strong>Empleados:</strong> ${empleados}</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="maturity-level ${claseNivel}">
            ${nivel}
            <br><small>${porcentaje.toFixed(1)}% de madurez</small>
        </div>
        
        <p class="descripcion">${descripcion}</p>
        
        <div class="puntajes-detallados">
            <h3>📈 Puntajes por Proceso</h3>
            <ul>
                <li>Gestión de Incidentes: ${puntajeIncidentes}/${maxIncidentes} (${((puntajeIncidentes/maxIncidentes)*100).toFixed(1)}%)</li>
                <li>Gestión de Cambios: ${puntajeCambios}/${maxCambios} (${((puntajeCambios/maxCambios)*100).toFixed(1)}%)</li>
                <li>Gestión de Accesos: ${puntajeAccesos}/${maxAccesos} (${((puntajeAccesos/maxAccesos)*100).toFixed(1)}%)</li>
            </ul>
        </div>
        
        <div class="recommendations">
            <h3>💡 Recomendaciones Prioritarias</h3>
            <ul>
                ${recomendaciones.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
        
        <div class="cta">
            <h3>¿Necesita ayuda para implementar estas mejoras?</h3>
            <p>En <strong>Gestión TI Consultores S.A.S.</strong> podemos acompañarle en todo el proceso.</p>
            <p>📧 hannahmendoza05@outlook.com | 📱 +57 3138352546</p>
        </div>
        
        <button onclick="window.print()" class="btn-submit" style="margin-top:20px;">🖨️ Imprimir Reporte</button>
    `;
    
    // Scroll hacia el resultado
    resultadoDiv.scrollIntoView({ behavior: 'smooth' });
    
    // === ENVIAR EMAIL ===
    console.log('🚀 INICIANDO ENVÍO DE EMAIL...');
    if(email) {
        console.log('📧 Destinatario:', email);
        console.log('🔑 Service ID: service_skzdy1g');
        console.log('📝 Template ID: template_egpbxy7');
        
        const templateParams = {
            to_email: email,
            empresa: empresa,
            sector: sector,
            nivel: nivel,
            porcentaje: porcentaje.toFixed(1),
            recomendaciones: recomendaciones.join('\n• ')
        };
        
        console.log('📦 PARÁMETROS A ENVIAR:');
        console.log(JSON.stringify(templateParams, null, 2));
        console.log('================================');
        
        enviarReporteEmail(email, {
            empresa: empresa,
            sector: sector,
            nivel: nivel,
            porcentaje: porcentaje,
            recomendaciones: recomendaciones
        });
    } else {
        console.warn('⚠️ No se proporcionó email, no se enviará correo');
    }
    
    // === GUARDAR EN FIREBASE ===
    console.log('💾 GUARDANDO EN FIREBASE...');
    guardarAuditoriaFirebase({
        empresa: empresa,
        sector: sector,
        empleados: empleados,
        email: email,
        puntajeIncidentes: puntajeIncidentes,
        puntajeCambios: puntajeCambios,
        puntajeAccesos: puntajeAccesos,
        puntajeTotal: puntajeTotal,
        porcentaje: porcentaje,
        nivel: nivel,
        recomendaciones: recomendaciones
    });
});

// Función para enviar reporte por EmailJS
function enviarReporteEmail(email, datos) {
    console.log('📩 EmailJS.send() - Iniciando...');
    console.log('Service:', 'service_skzdy1g');
    console.log('Template:', 'template_egpbxy7');
    
    const templateParams = {
        to_email: email,
        empresa: datos.empresa,
        sector: datos.sector,
        nivel: datos.nivel,
        porcentaje: datos.porcentaje.toFixed(1),
        recomendaciones: datos.recomendaciones.join('\n• ')
    };
    
    console.log('Parámetros:', templateParams);
    
    emailjs.send('service_skzdy1g', 'template_egpbxy7', templateParams)
    .then(function(response) {
        console.log('✅ EMAIL ENVIADO EXITOSAMENTE!');
        console.log('Response status:', response.status);
        console.log('Response text:', response.text);
        alert('📧 Reporte enviado exitosamente a: ' + email);
    })
    .catch(function(error) {
        console.error('❌ ERROR AL ENVIAR EMAIL');
        console.error('================================');
        console.error('Status:', error.status);
        console.error('Text:', error.text);
        console.error('Error completo:', error);
        console.error('================================');
        console.error('🔍 POSIBLES CAUSAS:');
        console.error('1. El template no tiene las variables correctas (to_email, empresa, sector, nivel, porcentaje, recomendaciones)');
        console.error('2. El Service ID es incorrecto: service_skzdy1g');
        console.error('3. El Template ID es incorrecto: template_egpbxy7');
        console.error('4. La Public Key no está inicializada correctamente');
        console.error('5. Problemas de CORS o red');
        alert('⚠️ Error al enviar el correo. Revisa la consola (F12) para más detalles.');
    });
}

// Función para guardar auditoría en Firebase Firestore
async function guardarAuditoriaFirebase(datos) {
    console.log('🔥 Firebase - Intentando guardar...');
    try {
        const docRef = await db.collection('auditorias').add({
            empresa: datos.empresa,
            sector: datos.sector,
            empleados: datos.empleados,
            email: datos.email,
            puntajeIncidentes: datos.puntajeIncidentes,
            puntajeCambios: datos.puntajeCambios,
            puntajeAccesos: datos.puntajeAccesos,
            puntajeTotal: datos.puntajeTotal,
            porcentaje: datos.porcentaje,
            nivel: datos.nivel,
            recomendaciones: datos.recomendaciones,
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ Auditoría guardada en Firebase');
        console.log('Document ID:', docRef.id);
    } catch (error) {
        console.error('❌ Error guardando en Firebase:', error);
    }
}