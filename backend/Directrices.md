# Sistema de Gestión para el Polideportivo Municipal de Villarejo del Río

## 1. Introducción

Este proyecto propone una solución digital para modernizar la gestión del Polideportivo Municipal de Villarejo del Río, actualmente basada en procesos manuales.  

El sistema desarrollado permite mejorar la organización interna, reducir errores operativos y ofrecer una experiencia más fiable tanto para el personal como para los usuarios.

El proyecto ha sido diseñado con una arquitectura modular y escalable, priorizando claridad estructural, usabilidad y coherencia técnica.

---

## 2. Problema Detectado

La gestión actual del polideportivo presenta las siguientes limitaciones:

- Reservas gestionadas manualmente en agenda física.
- Conflictos por duplicidad de franjas horarias.
- Ausencia de confirmación inmediata a los usuarios.
- Falta de control sobre el material deportivo prestado.
- Imposibilidad de obtener métricas agregadas de uso.
- Sobrecarga administrativa del personal de recepción.

Estas limitaciones generan incidencias frecuentes, pérdida de tiempo y dificultades en la planificación.

---

## 3. Solución Propuesta

Se propone un sistema digital de gestión que permita:

- Centralizar la gestión de reservas.
- Evitar solapamientos de horarios.
- Controlar el estado y préstamo del material deportivo.
- Proporcionar métricas básicas de uso.
- Mejorar la eficiencia administrativa.
- Aumentar la transparencia y fiabilidad del servicio.

---

## 4. Alcance del Proyecto

Dadas las condiciones del desarrollo:

- Tiempo limitado (4–5 horas).
- Evaluación basada en capturas del frontend.
- No ejecución del proyecto por parte del evaluador.

Se ha desarrollado una aplicación frontend completamente funcional con datos simulados (mock data).

El backend se define conceptualmente, pero no se implementa en esta versión.

---

## 5. Arquitectura del Sistema

### 5.1 Enfoque Arquitectónico

La aplicación sigue una arquitectura modular organizada por dominios funcionales.  

El sistema está preparado conceptualmente para evolucionar hacia una arquitectura empresarial basada en:

- Backend REST
- Arquitectura Clean
- Base de datos relacional
- Sistema de autenticación y autorización

---

### 5.2 Estructura del Proyecto
reto-ia/ 
│ 
├── frontend/ 
│       ├── src/ 
│       │   ├── app/
│       │   ├── modules/ 
│       │   ├── shared/
│       │   └── mock-data/
│       │
│       ├── public/
│       └── package.json
│
├── docs/
│   └── capturas/
│ 
└── README.md
---

## 6. Stack Tecnológico

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Arquitectura modular por funcionalidades
- Datos simulados en memoria

### Backend

No implementado en esta versión.  
La interacción con datos se simula mediante servicios internos que replican el comportamiento de una API REST.

---

## 7. Funcionalidades Implementadas

### 7.1 Dashboard

Pantalla principal con:

- Total de reservas activas.
- Indicadores de ocupación.
- Instalaciones más utilizadas.
- Material actualmente prestado.
- Métricas visuales mediante tarjetas informativas.

Permite a la dirección disponer de una visión global del estado del centro.

---

### 7.2 Gestión de Instalaciones

Listado de:

- Seis pistas polideportivas.
- Dos salas de fitness.
- Una piscina cubierta.

Funcionalidades:

- Visualización del estado.
- Consulta de disponibilidad.
- Asociación con reservas existentes.

---

### 7.3 Gestión de Reservas

Permite:

- Crear una nueva reserva.
- Seleccionar instalación, fecha y franja horaria.
- Visualizar reservas activas.
- Cancelar reservas.
- Simular validación de solapamientos.

Reduce el riesgo de duplicidad y mejora la organización.

---

### 7.4 Gestión de Material Deportivo

Control del inventario deportivo:

- Raquetas
- Balones
- Redes
- Conos
- Chalecos

Cada elemento incluye:

- Cantidad total y disponible.
- Estado actual.
- Registro de préstamo.
- Fecha estimada de devolución.
- Posibilidad de marcar como deteriorado.

Permite mejorar la trazabilidad y el control del equipamiento.

---

### 7.5 Gestión de Usuarios (Simulada)

Se contemplan roles conceptuales:

- Administrador
- Recepcionista
- Monitor

No se implementa autenticación real en esta versión.

---

## 8. Modelo de Datos Conceptual

### Entidad Base

Todas las entidades comparten un modelo conceptual común:
BaseEntity

id: string
createdAt: Date
updatedAt: Date
status: string


---

### Entidades Principales

**Facility**
- id
- name
- type
- status

**Reservation**
- id
- userId
- facilityId
- date
- startTime
- endTime
- status

**Equipment**
- id
- name
- quantity
- available
- condition

**EquipmentLoan**
- id
- equipmentId
- userId
- loanDate
- returnDate
- status

---

## 9. Diseño de Interfaz

El diseño prioriza:

- Claridad administrativa.
- Usabilidad.
- Organización visual.
- Estética institucional.

Elementos principales:

- Sidebar lateral de navegación.
- Barra superior informativa.
- Tarjetas de métricas.
- Tablas estructuradas.
- Distribución clara de contenidos.

El objetivo es simular un sistema real de gestión municipal.

---

## 10. Posibles Mejoras Futuras

En una evolución posterior el sistema podría incorporar:

- Backend REST con Node.js o NestJS.
- Base de datos PostgreSQL.
- Autenticación JWT.
- Control de roles y permisos real.
- Validación estricta de solapamientos.
- Exportación de informes.
- Panel de analítica avanzada.
- Despliegue en entorno cloud.

---

## 11. Conclusión

El proyecto presenta una solución digital coherente, estructurada y profesional para la gestión del Polideportivo Municipal de Villarejo del Río.

Aunque se trata de una versión inicial basada en frontend con datos simulados, la arquitectura propuesta permite una evolución natural hacia un sistema empresarial completo.

La solución aborda directamente los problemas detectados en el escenario original, mejorando la organización, reduciendo errores y proporcionando mayor visibilidad operativa.
