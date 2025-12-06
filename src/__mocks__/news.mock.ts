import News from "../news/types/News";

export const mockNewsData: News[] = [
  {
    title:
      "Nexus Battle IV: Vizla — Un recordatorio de que los fracasos también enseñan",
    projectName: "Nexus Battle IV: Vizla",
    groupMembers: [
      "Daniel Felipe Aguilar Latorre",
      "Pablo Antonio Bravo Vergara",
      "Santiago Gomez Cadena",
      "David Ricardo Hernandez Carranza",
      "Carlos Fernando Ortiz Vargas",
      "Andres Felipe Pico Garcia",
    ],
    subject: "Proyecto Integrador II",
    shortDescription:
      "El equipo Vizla presentó su módulo de usuarios alojado en Google Cloud. A pesar de las buenas intenciones técnicas, el proyecto no logró consolidar un producto funcional, convirtiéndose en una valiosa lección sobre disciplina y trabajo colaborativo.",
    content:
      "Durante la jornada Nexus Battle IV: “A New Hope”, el equipo Vizla presentó su proyecto enfocado en el desarrollo del módulo de usuarios desplegado en Google Cloud. Su propuesta técnica incluía tres servicios integrados y una base de datos no relacional enlazada mediante un directorio activo. Aunque la idea era ambiciosa, el equipo reconoció dificultades en la ejecución y falta de compromiso durante los sprints.\n\nLos jurados enfatizaron la importancia de la autocrítica. El profesor Briceño señaló la ausencia de un producto tangible y la falta de aplicación de los valores de SCRUM. La profesora principal cuestionó la presentación, instando al equipo a dejar de justificar los fallos y asumirlos como parte del aprendizaje. Finalmente, Sandra destacó la valentía del grupo al presentarse pese al fracaso, resaltando que este tipo de experiencias sirven de ejemplo para el resto.\n\nVizla deja una reflexión importante: en ingeniería, el error no define el talento, sino la disposición para aprender de él.",
    mainImage: "proyecto1.jpg",
    date: new Date("2025-10-28T23:38:09.500Z"),
    quotes: [
      {
        quote:
          "No hay producto, cuáles son los valores de SCRUM, no se ven reflejados.",
        quoteAuthor: "Briceño",
        quoteImage: "briceno.jpg",
      },
      {
        quote:
          "El presentar, así sea un fracaso, es un ejemplo para los demás grupos. Me gustaría que digieran qué fue esa reflexión del proyecto.",
        quoteAuthor: "Sandra",
        quoteImage: "sandra.jpg",
      },
    ],
  },
  {
    title:
      "Centro de Desarrollo de Software: un esfuerzo visible, pero sin enfoque",
    projectName: "Centro de Desarrollo de Software",
    groupMembers: [
      "Pinzon Camacho Andres Felipe",
      "Garcia Bernate Erick David",
      "Savadera Martinez Hansel Santiago",
      "Vargas Prado Miguel Angel",
      "Guerra Suarez Sergio Ivan",
    ],
    subject: "Proyecto Integrador I",
    shortDescription:
      "El Centro de Desarrollo de Software mostró evidencias de trabajo y comprensión técnica, pero su exposición careció de foco y presentó fallas en la comunicación, evidenciando una débil cohesión en su discurso final.",
    content:
      "El equipo del Centro de Desarrollo de Software presentó su propuesta dentro del marco de Proyecto Integrador I. Su objetivo fue ofrecer una solución de infraestructura tecnológica basada en un entorno de servicios de red, comunicación y DNS. Basaron su trabajo en la metodología SCRUM, adaptándola a su ritmo de trabajo y destacando el uso de herramientas como GitHub y Visual Studio Code para la coordinación.\n\nDurante la presentación, el grupo mostró evidencias claras de su esfuerzo: diagramas, videos y registros de las herramientas SCRUM. No obstante, los jurados cuestionaron la coherencia del discurso y la falta de precisión en el diseño de sus diagramas. Briceño enfatizó la confusión entre roles y la carencia de claridad en las soluciones software propuestas. Ali, Danith y Sandra también criticaron la falta de evidencia técnica en pruebas e infraestructura.\n\nEl equipo logró demostrar su trabajo, pero no consiguió comunicarlo con claridad. Un proyecto con buena base técnica, opacado por una presentación desordenada y una débil narrativa conclusiva.",
    mainImage: "proyecto21.jpg",
    date: new Date("2025-10-29T14:40:00Z"),
    quotes: [
      {
        quote:
          "Según lo que tengo aquí ustedes son el centro de software, porque me dan soluciones de software, ¿quién desarrolló la página? No alcanzo a ver el diagrama de casos de uso, no se entiende.",
        quoteAuthor: "Briceño",
        quoteImage: "briceno.jpg",
      },
      {
        quote:
          "El objetivo general está perfecto, este es lo más cercano a un contrato, pero las conclusiones no reflejan la experiencia.",
        quoteAuthor: "Ali",
        quoteImage: "ali.jpg",
      },
    ],
  },
  {
    title: "Blesshealth24/7 — Tecnología con propósito humano",
    projectName: "Blesshealth24/7",
    groupMembers: [
      "Emmanuel Manjova Acosta Cordes",
      "Sergio David Mesa Pelaez",
      "Juan David Muzo Rojas",
      "David Santiago Niño Arenas",
    ],
    subject: "Proyecto Integrador III",
    shortDescription:
      "El equipo Blesshealth24/7 presentó una aplicación móvil para gestionar insumos médicos. Aunque la idea es solidaria y con enfoque social, la ejecución técnica dejó vacíos importantes en organización y dominio del tema.",
    content:
      "El equipo Blesshealth24/7 se presentó bajo el lema 'Blesshealth siempre piensa en el prójimo'. Su proyecto propone una aplicación móvil que facilite la gestión de compras de insumos para pacientes, respondiendo a necesidades detectadas en centros médicos de Santander. La metodología utilizada fue la de prototipado, buscando validación continua con el cliente, y el marco de trabajo fue SCRUM.\n\nDurante la presentación, los estudiantes explicaron sus roles y cómo cada sprint contribuyó al progreso del proyecto. Mostraron su marco conceptual, los patrones de diseño y las técnicas empleadas, aunque se notó la falta de referencias en el marco tecnológico y poca claridad en los diagramas. El ritmo de exposición disminuyó hacia el final, evidenciando desorden y escasa preparación.\n\nLos jurados cuestionaron el dominio técnico del grupo, especialmente en conceptos como el sobreajuste, optimizadores y uso de librerías. Aun así, reconocieron la intención de crear una herramienta con impacto positivo en el sector salud. Blesshealth24/7 deja una enseñanza importante: la buena voluntad debe ir acompañada de rigor técnico y claridad metodológica.",
    mainImage: "proyecto32.jpg",
    date: new Date("2025-10-30T10:30:00.000Z"),
    quotes: [
      {
        quote:
          "¿Qué significa capa de sobreajuste? ¿Overfitting? ¿Qué optimizador usan?",
        quoteAuthor: "Briseño",
        quoteImage: "proyecto6-quote1.jpg",
      },
      {
        quote:
          "Mucha paz mundial; la ley es la ley; ¿por qué es importante el modelo de datos?",
        quoteAuthor: "Lenin",
        quoteImage: "lenin.jpg",
      },
    ],
  },
  {
    title: "PicLab — Procesamiento distribuido para el manejo de imágenes",
    projectName: "PicLab",
    groupMembers: ["Nelson Y. Diaz Gomez"],
    subject: "Sistemas Distribuidos",
    shortDescription:
      "PicLab presenta una arquitectura distribuida para almacenar imágenes mediante SOAP, RMI y REST. Un esfuerzo técnico individual que evidencia comprensión del diseño de sistemas distribuidos.",
    content:
      "El proyecto PicLab, desarrollado en el marco de la asignatura de Sistemas Distribuidos, propone una solución técnica centrada en el almacenamiento y gestión de imágenes mediante servicios distribuidos. Su arquitectura integra múltiples protocolos: SOAP para la comunicación entre el cliente y el servidor de aplicación, RMI para la interacción entre nodos y REST para la interoperabilidad general del sistema.\n\nEl desarrollo fue acompañado por el uso del marco de trabajo Kanbas, y se destacó la conexión entre el servidor de aplicación y la base de datos principal. A pesar de ser un proyecto individual, demuestra dominio en la implementación de servicios distribuidos y una estructura coherente.\n\nLos jurados cuestionaron la secuencia de diseño y la justificación del uso de SOAP frente a REST, resaltando la necesidad de mayor precisión conceptual. PicLab muestra que incluso proyectos individuales pueden reflejar un entendimiento técnico sólido cuando se abordan con disciplina y claridad.",
    mainImage: "proyecto34.jpg",
    date: new Date("2025-10-30T11:30:00.000Z"),
    quotes: [
      {
        quote:
          "¿Por qué decidió primero el producto y luego la ingeniería? REST es un estilo arquitectónico, no un protocolo.",
        quoteAuthor: "Ali",
        quoteImage: "ali.jpg",
      },
      {
        quote: "¿Por qué usas SOAP? 'Comunica con REST' requiere precisión.",
        quoteAuthor: "Lenin",
        quoteImage: "lenin.jpg",
      },
    ],
  },
  {
    title: "Histofy — Digitalizando las historias clínicas con visión médica",
    projectName: "Histofy",
    groupMembers: [
      "Camilo Alfonso Castro Ortiz",
      "Juan Angel Gomez Bueno",
      "Antonella Meneses Rojas",
      "Valentina Tellez Salazar",
      "Angie Lorena Villareal Vasquez",
    ],
    subject: "Proyecto Integrador III",
    shortDescription:
      "Histofy busca mejorar la gestión y protección de historias clínicas mediante una aplicación móvil y de escritorio con OCR, CI/CD y monitoreo en la nube.",
    content:
      "Histofy surge como respuesta a los problemas recurrentes en la gestión de historias clínicas dentro del sector médico. El equipo diseñó una aplicación móvil para los profesionales de salud y una versión de escritorio destinada a la administración de datos. El proyecto utiliza un servicio de OCR para extraer información relevante y se apoya en un entorno de nube AWS.\n\nDurante la exposición, los estudiantes explicaron su aplicación de las seis etapas del ciclo de vida del software, bajo la metodología Kanban. También presentaron un sistema de CI/CD y un componente de monitoreo capaz de generar métricas de rendimiento. Sin embargo, el diagrama de casos de uso no cumplió con los estándares UML, y el marco tecnológico fue abordado superficialmente.\n\nLos jurados coincidieron en que la propuesta tiene gran potencial, pero necesita mayor precisión y mejor administración del tiempo. Histofy demuestra cómo la ingeniería puede aplicarse a contextos clínicos reales, donde la responsabilidad técnica y ética se entrelazan en cada línea de código.",
    mainImage: "proyecto35.jpg",
    date: new Date("2025-10-30T14:00:00.000Z"),
    quotes: [
      {
        quote:
          "Proyecto bueno, pero manejo del tiempo; si introducen nueva simbología, definanla; la ley contempla protección de datos sensibles.",
        quoteAuthor: "Ali",
        quoteImage: "ali.jpg",
      },
      {
        quote:
          "Mucho drama con el tiempo para no demostrar; aplicación deficiente y sin coordinación; no parece PI3.",
        quoteAuthor: "Lenin",
        quoteImage: "lenin.jpg",
      },
    ],
  },
];
