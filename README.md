# Sistema de Gestión para el Polideportivo Municipal de Villarejo del Río  
**Documentación ejecutiva (versión frontend con datos simulados)**

## 1. Resumen ejecutivo
El “Sistema de Gestión para el Polideportivo Municipal de Villarejo del Río” es una solución digital orientada a modernizar la operativa diaria del centro deportivo municipal, sustituyendo procedimientos manuales por un entorno unificado de gestión.

Esta entrega corresponde a una **aplicación frontend** desarrollada con **Next.js + TypeScript**, con **datos simulados** para representar el comportamiento del sistema. El objetivo de la versión actual es **validar el modelo de funcionamiento, la navegación y la experiencia de uso**, dejando el backend definido a nivel conceptual para una fase posterior.

---

## 2. Problema inicial
En muchos entornos municipales, la gestión de un polideportivo se apoya en herramientas no integradas (agenda física, hojas de cálculo, comunicaciones informales) que generan:

- Duplicidades y conflictos en reservas por falta de control centralizado.
- Tiempos de atención elevados en mostrador por procesos repetitivos.
- Dificultad para disponer de una visión global (ocupación, instalaciones más demandadas, material prestado).
- Incidencias operativas con trazabilidad limitada (mantenimiento, averías, quejas).
- Menor capacidad de planificación y toma de decisiones basada en datos.

El resultado es una **sobrecarga administrativa**, mayor probabilidad de error y una experiencia menos predecible para la ciudadanía.

---

## 3. Solución propuesta
Se propone un sistema de gestión digital que permita:

- **Centralizar** la información operativa del polideportivo.
- **Ordenar y asegurar** la gestión de reservas evitando solapamientos.
- **Gestionar recursos** (instalaciones y material) con control de disponibilidad.
- **Mejorar la trazabilidad** de incidencias y actuaciones.
- **Proporcionar indicadores** para apoyar la gestión directiva.

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
- Mejora de la trazabilidad y reducción de pérdidas/deterioros no reportados.

### 4.6 Gestión de usuarios (conceptual y simulada)
- Gestión visual de usuarios y roles previstos (p. ej. administración, recepción, monitores).
- En esta versión no se incorpora autenticación real, por tratarse de un prototipo funcional.

### 4.7 Panel de incidencias
- Registro y seguimiento de incidencias (mantenimiento, averías, observaciones operativas).
- Enfoque orientado a la mejora del servicio y al control de calidad.

---

## 5. Impacto organizativo esperado
La implantación progresiva de un sistema de estas características permite:

- **Estandarizar procedimientos** y reducir dependencia de conocimiento informal.
- **Disminuir errores** por duplicidad de reservas y falta de control de disponibilidad.
- **Aumentar la transparencia interna** mediante información consolidada.
- **Mejorar la atención a la ciudadanía** al acortar tiempos y aumentar fiabilidad.
- **Facilitar la toma de decisiones** con indicadores de uso y ocupación.
- **Mejorar la coordinación** entre recepción, monitores y responsables de instalaciones.

En términos operativos, se traduce en una gestión más predecible, medible y escalable, alineada con la modernización de servicios municipales.

---

## 6. Arquitectura conceptual (visión no técnica)
La solución se concibe con una arquitectura preparada para evolucionar de forma ordenada:

- **Capa de presentación (Frontend)**: interfaz y navegación del sistema, con módulos por área funcional.
- **Capa de servicios (API / Backend)**: prevista para centralizar reglas de negocio (reservas, disponibilidad, incidencias, inventario).
- **Capa de datos (Base de datos)**: repositorio único de información con trazabilidad y auditoría.
- **Seguridad y permisos**: autenticación y roles para separar responsabilidades (dirección, recepción, monitores).

En esta versión, la capa de servicios se simula internamente para demostrar la experiencia de uso y el flujo de trabajo.

---

## 7. Backend: definido conceptualmente, no implementado en esta entrega
Por alcance temporal, esta entrega **no incluye un backend real** ni una base de datos en producción.

- Los datos se gestionan mediante **mock data** (datos simulados) y servicios internos que replican el comportamiento de una API.
- La solución está preparada para incorporar, en una fase posterior, un backend con:
  - API (REST u otros enfoques según decisión técnica).
  - Base de datos relacional (p. ej., PostgreSQL).
  - Autenticación y autorización (roles/perfiles).
  - Auditoría y trazabilidad de operaciones.

Esto permite que la fase actual sirva como **validación funcional y de experiencia** antes de la inversión completa en integración y despliegue.

---

## 8. Estructura del proyecto
Estructura de alto nivel del repositorio:

- **frontend/**: aplicación Next.js (interfaz del sistema).
  - **src/app/**: páginas y navegación principal.
  - **src/modules/**: módulos funcionales por dominio (dashboard, instalaciones, reservas, material, usuarios).
  - **src/shared/**: componentes y layout reutilizables (tablas, tarjetas, cabeceras, shell).
  - **src/mock-data/**: datos simulados utilizados por los servicios.
  - **public/**: recursos estáticos.
- **docs/capturas/**: evidencias visuales (capturas) del funcionamiento del frontend.
- **backend/**: documentación de soporte (directrices y supuestos del ejercicio).

---

## 9. Evolución y mejoras futuras (hoja de ruta)
Para convertir esta base en un sistema municipal plenamente operativo, se recomiendan las siguientes líneas de mejora:

1. **Implementación de backend y base de datos** con reglas de negocio y persistencia real.
2. **Autenticación y control de permisos** por perfiles municipales (dirección, recepción, monitores).
3. **Motor robusto de validación de reservas**, solapamientos y políticas (anticipación, cancelación, penalizaciones).
4. **Gestión avanzada de incidencias** (estados, asignación, SLA, histórico de actuaciones).
5. **Informes y analítica** (ocupación, demanda por instalación, horarios punta, rotación de material).
6. **Integraciones municipales** (notificaciones, correo/SMS, identidad corporativa si aplica).
7. **Accesibilidad y cumplimiento normativo** (mejora continua en UX y criterios de accesibilidad).
8. **Despliegue y operación** (entorno cloud o municipal, copias de seguridad, monitorización).

---

## 10. Conclusión
El proyecto ofrece una base sólida y presentable para la modernización del Polideportivo Municipal de Villarejo del Río. La aplicación frontend demuestra una propuesta funcional coherente, alineada con procesos reales y preparada para evolucionar hacia un sistema integral con backend y datos persistentes.

Esta documentación se presenta como entregable orientado a administración pública, priorizando claridad, impacto organizativo y visión de evolución.
