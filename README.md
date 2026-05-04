# Sistema de Gestión para el Polideportivo Municipal de Villarejo del Río  
Documentación ejecutiva (versión frontend con datos simulados)

---

## 1. Resumen ejecutivo

El “Sistema de Gestión para el Polideportivo Municipal de Villarejo del Río” es una solución digital orientada a modernizar la operativa diaria del centro deportivo municipal, sustituyendo procedimientos manuales por un entorno unificado de gestión.

Esta entrega corresponde a una aplicación frontend desarrollada con Next.js y TypeScript, con datos simulados para representar el comportamiento del sistema. El objetivo de la versión actual es validar el modelo de funcionamiento, la navegación y la experiencia de uso, dejando el backend definido a nivel conceptual para una fase posterior.

---

## 2. Problema inicial

En muchos entornos municipales, la gestión de un polideportivo se apoya en herramientas no integradas (agenda física, hojas de cálculo, comunicaciones informales) que generan:

- Duplicidades y conflictos en reservas por falta de control centralizado.
- Tiempos de atención elevados en mostrador por procesos repetitivos.
- Dificultad para disponer de una visión global (ocupación, instalaciones más demandadas, material prestado).
- Incidencias operativas con trazabilidad limitada.
- Menor capacidad de planificación y toma de decisiones basada en datos.

El resultado es una sobrecarga administrativa, mayor probabilidad de error y una experiencia menos predecible para la ciudadanía.

---

## 3. Solución propuesta

Se propone un sistema de gestión digital que permita:

- Centralizar la información operativa del polideportivo.
- Ordenar y asegurar la gestión de reservas evitando solapamientos.
- Gestionar recursos (instalaciones y material) con control de disponibilidad.
- Mejorar la trazabilidad de incidencias y actuaciones.
- Proporcionar indicadores para apoyar la gestión directiva.

Esta versión presenta una interfaz completa y coherente para demostrar el alcance funcional y el diseño de la experiencia de usuario.

---

## 4. Funcionalidades clave del sistema

El sistema se estructura en módulos funcionales alineados con la operativa municipal:

### 4.1 Dashboard ejecutivo
- Visión general del estado del centro mediante indicadores (reservas activas, ocupación, instalaciones destacadas, material en préstamo).
- Orientado a dirección y coordinación para seguimiento rápido de la actividad.

### 4.2 Gestión de instalaciones
- Consulta centralizada del inventario de instalaciones.
- Visualización de estado operativo y disponibilidad.
- Base para planificación y control del uso.

### 4.3 Gestión de reservas
- Alta y consulta de reservas.
- Selección de instalación, fecha y franja horaria.
- Cancelación y control de coherencia (simulación de validaciones).

### 4.4 Calendario semanal operativo
- Vista de planificación semanal para facilitar la organización del día a día.
- Permite identificar picos de ocupación y detectar conflictos operativos.

### 4.5 Gestión de material deportivo
- Inventario y disponibilidad.
- Registro de préstamos (simulado) y control de estado del material.
- Mejora de la trazabilidad y reducción de pérdidas o deterioros no reportados.

### 4.6 Gestión de usuarios (conceptual y simulada)
- Gestión visual de usuarios y roles previstos (administración, recepción, monitores).
- En esta versión no se incorpora autenticación real.

### 4.7 Panel de incidencias
- Centralización de situaciones que requieren atención (reservas canceladas, préstamos vencidos, material deteriorado).
- Enfoque orientado a la mejora del servicio y al control de calidad operativa.

---

## 5. Impacto organizativo esperado

La implantación progresiva de un sistema de estas características permite:

- Estandarizar procedimientos y reducir dependencia de conocimiento informal.
- Disminuir errores por duplicidad de reservas.
- Aumentar la transparencia interna mediante información consolidada.
- Mejorar la atención a la ciudadanía al acortar tiempos y aumentar fiabilidad.
- Facilitar la toma de decisiones con indicadores de uso y ocupación.
- Mejorar la coordinación entre recepción, monitores y responsables de instalaciones.

En términos operativos, se traduce en una gestión más predecible, medible y escalable, alineada con la modernización de servicios municipales.

---

## 6. Arquitectura conceptual (visión no técnica)

La solución se concibe con una arquitectura preparada para evolucionar de forma ordenada:

- **Capa de presentación (Frontend)**: interfaz y navegación del sistema, con módulos por área funcional.
- **Capa de servicios (API / Backend)**: prevista para centralizar reglas de negocio.
- **Capa de datos (Base de datos)**: repositorio único con trazabilidad y auditoría.
- **Seguridad y permisos**: autenticación y roles para separar responsabilidades.

En esta versión, la capa de servicios se simula internamente para demostrar la experiencia de uso y el flujo de trabajo.

---

## 7. Backend: definido conceptualmente, no implementado en esta entrega

Por alcance temporal, esta entrega no incluye un backend real ni una base de datos en producción.

- Los datos se gestionan mediante datos simulados y servicios internos que replican el comportamiento de una API.
- El sistema está preparado para incorporar en una fase posterior:
  - API REST.
  - Base de datos relacional.
  - Autenticación y autorización.
  - Auditoría y trazabilidad de operaciones.

Esta aproximación permite validar el modelo funcional antes de abordar una implementación completa.

---

## 8. Evidencias visuales

El funcionamiento del sistema puede observarse en las capturas incluidas en la carpeta: [docs/capturas](docs/capturas/)

Estas imágenes muestran:

- Dashboard ejecutivo con indicadores clave.
- Gestión de instalaciones.
- Flujo de creación y cancelación de reservas.
- Calendario semanal operativo.
- Gestión de material y préstamos.
- Panel de incidencias.
- Gestión de usuarios y roles.

Las capturas permiten validar la coherencia visual, la navegación y la experiencia administrativa del sistema.

---

## 9. Cómo ejecutar el proyecto

Esta entrega corresponde a una **versión frontend** con **datos simulados** (mock data) para validar navegación, experiencia de uso y coherencia funcional. No existe backend real en esta fase.

### Requisitos
- Node.js **>= 18**
- npm

### Instalación y ejecución (modo desarrollo)
```bash
cd frontend
npm install
npm run dev
```

---

## 10. Estructura del proyecto

Estructura de alto nivel del repositorio:

- **frontend/**: aplicación Next.js (interfaz del sistema).
- **backend/**: documentación de soporte (supuesto y directrices).
- **docs/capturas/**: evidencias visuales del funcionamiento.
- **README.md**: documentación ejecutiva del proyecto.

---

## 10. Evolución y mejoras futuras

Para convertir esta base en un sistema municipal plenamente operativo, se recomiendan las siguientes líneas de mejora:

1. Implementación de backend y base de datos con persistencia real.
2. Autenticación y control de permisos por perfiles municipales.
3. Motor robusto de validación de reservas y políticas de uso.
4. Gestión avanzada de incidencias con seguimiento histórico.
5. Informes y analítica avanzada de ocupación y demanda.
6. Integraciones municipales (notificaciones, identidad corporativa).
7. Accesibilidad y cumplimiento normativo.
8. Despliegue en entorno cloud con monitorización y copias de seguridad.

---

## 11. Valor estratégico del proyecto

Más allá de la digitalización operativa, esta propuesta representa:

- Un paso hacia la profesionalización de la gestión municipal.
- Una base tecnológica escalable y adaptable.
- Un modelo replicable en otras instalaciones deportivas.
- Un punto de partida para la planificación basada en datos reales de uso.

---

## 12. Conclusión

El proyecto ofrece una base sólida y presentable para la modernización del Polideportivo Municipal de Villarejo del Río. La aplicación frontend demuestra una propuesta funcional coherente, alineada con procesos reales y preparada para evolucionar hacia un sistema integral con backend y datos persistentes.

Esta documentación se presenta como entregable orientado a administración pública, priorizando claridad, impacto organizativo y visión estratégica.
