import { Product } from "@/types/product";


export const servicesSpanish: Product[] = [
    {
        id: "desarrollo-apps",
        name: "Desarrollo de Aplicaciones Móviles",
        plans: [
            {
                id: "app-hibrida-starter",
                name: "App híbrida starter",
                features: ["App híbrida starter"],
                price: 15000,
                description: "App híbrida muy básica (una plataforma), 3-5 pantallas, navegación simple.",
            },
            {
                id: "app-hibrida-basica",
                name: "App híbrida básica",
                features: ["App híbrida básica"],
                price: 18000,
                description: "6-8 pantallas, formulario de contacto, menú sencillo.",
            },
            {
                id: "app-hibrida-multi",
                name: "App híbrida multiplataforma",
                features: ["App híbrida multiplataforma"],
                price: 20000,
                description: "Versión híbrida para ambas plataformas (iOS + Android).",
            },
            {
                id: "app-ui-personalizado",
                name: "App UI personalizado",
                features: ["App UI personalizado"],
                price: 22000,
                description: "App con diseño UI personalizado, 6-8 pantallas.",
            },
            {
                id: "app-completa",
                name: "App completa",
                features: ["App completa"],
                price: 25000,
                description: "Híbrida con características completas: login, sincronización.",
            },
            {
                id: "app-completa-soporte",
                name: "App completa + soporte",
                features: ["App completa + soporte"],
                price: 28000,
                description: "App híbrida pequeña con UI personalizada, pantalla de administrador.",
            },
        ],
    },
    {
        id: "opt-actualizacion",
        name: "Optimización y actualización de apps",
        plans: [
            {
                id: "opt-ajuste-rapido",
                name: "Ajuste rápido",
                features: ["Ajuste rápido"],
                price: 1000,
                description: "Optimización de carga de una pantalla, corregir bugs menores.",
            },
            {
                id: "opt-mejoras-uiux",
                name: "Mejoras de UI/UX",
                features: ["Mejoras de UI/UX"],
                price: 3000,
                description: "Rediseño de uno o dos flujos, actualización menor.",
            },
            {
                id: "opt-actualizaciones-multi",
                name: "Actualizaciones múltiples",
                features: ["Actualizaciones múltiples"],
                price: 5000,
                description: "Actualización de versiones, compatibilidad con nuevos sistemas.",
            },
            {
                id: "opt-integral",
                name: "Optimización integral",
                features: ["Optimización integral"],
                price: 8000,
                description: "Revisión completa de rendimiento y optimización.",
            },
        ],
    },
    {
        id: "integraciones-conectividad",
        name: "Integraciones y conectividad",
        plans: [
            {
                id: "int-pago-simple",
                name: "Pago simple",
                features: ["Pago simple"],
                price: 100,
                description: "Integrar un botón de pago simple o configurar el SDK.",
            },
            {
                id: "int-flujo-pago",
                name: "Flujo de pago",
                features: ["Flujo de pago"],
                price: 500,
                description: "Integración completa de pasarela de pago.",
            },
            {
                id: "int-crm-externo",
                name: "CRM externo",
                features: ["CRM externo"],
                price: 1000,
                description: "Conexión con CRM externo o sistema de gestión.",
            },
            {
                id: "int-completa",
                name: "Integración completa",
                features: ["Integración completa"],
                price: 2000,
                description: "Integración full con múltiples sistemas.",
            },
        ],
    },
];

export const pricingCategoriesSpanish: Product[] = [
    {
        id: "juegos-moviles",
        name: "Juegos móviles 2D y 3D",
        plans: [
            {
                id: "movil-2d-sencillo",
                name: "2D Sencillo",
                features: ["2D Sencillo"],
                price: 200,
                description: "Juego básico con mecánicas simples.",
            },
            {
                id: "movil-2d-intermedio",
                name: "2D Intermedio",
                features: ["2D Intermedio"],
                price: 3100,
                description: "Incluyendo niveles adicionales, animaciones básicas y efectos sonoros.",
            },
            {
                id: "movil-3d-basico",
                name: "3D Básico",
                features: ["3D básico"],
                price: 5000,
                description: "Adecuado para prototipos o juego con gráficos sencillos.",
            },
            {
                id: "movil-3d-avanzado",
                name: "3D Avanzado",
                features: ["3D avanzado"],
                price: 10000,
                description: "Juego con gráficos detallados, múltiples niveles y mecánicas complejas.",
            },
        ],
    },
    {
        id: "gamificacion-empresas",
        name: "Gamificación para empresas",
        plans: [
            {
                id: "gam-interactivo-basico",
                name: "Juego interactivo básico para empresas",
                features: ["Juego interactivo básico"],
                price: 500,
                description: "Ideal para capacitaciones o presentaciones interactivas.",
            },
            {
                id: "gam-experiencia-personalizada",
                name: "Experiencia gamificada personalizada",
                features: ["Experiencia gamificada personalizada"],
                price: 4500,
                description: "Adaptada a las necesidades específicas de la empresa.",
            },
            {
                id: "gam-plataforma-completa",
                name: "Plataforma de gamificación",
                features: ["Plataforma de gamificación"],
                price: 6100,
                description: "Para implementar sistemas de puntos, recompensas y seguimiento.",
            },
        ],
    },
    {
        id: "diseno-mecanicas",
        name: "Diseño de mecánicas de juego",
        plans: [
            {
                id: "mecanica-balanceo",
                name: "Balanceo de niveles",
                features: ["Balanceo de niveles"],
                price: 700,
                description: "Ajustando la dificultad y progresión del juego.",
            },
            {
                id: "mecanica-monetizacion",
                name: "Sistema de monetización",
                features: ["Sistema de monetización"],
                price: 3800,
                description: "Implementando anuncios, compras dentro de la app.",
            },
            {
                id: "mecanica-multijugador",
                name: "Experiencia multijugador",
                features: ["Experiencia multijugador"],
                price: 7400,
                description: "Para añadir modos multijugador en línea o local.",
            },
        ],
    },
    {
        id: "arte-diseno",
        name: "Arte y diseño para videojuegos",
        plans: [
            {
                id: "arte-ilustraciones-2d",
                name: "Ilustraciones 2D",
                features: ["Ilustraciones 2D"],
                price: 200,
                description: "Ilustración básica.",
            },
            {
                id: "arte-sprites-2d",
                name: "Sprite y animaciones 2D",
                features: ["Sprite y animaciones 2D"],
                price: 2800,
                description: "Dependiendo de la complejidad.",
            },
            {
                id: "arte-modelado-3d",
                name: "Modelado y animación 3D",
                features: ["Modelado y animación 3D"],
                price: 2600,
                description: "Para personajes y escenarios básicos.",
            },
            {
                id: "arte-ui-ux",
                name: "Diseño de interfaces (UI/UX)",
                features: ["Diseño de interfaces (UI/UX)"],
                price: 3500,
                description: "Adaptado a la estética del juego.",
            },
        ],
    },
];

export const servicesEnglish: Product[] = [
    {
        id: "desarrollo-apps",
        name: "Mobile Application Development",
        plans: [
            {
                id: "app-hibrida-starter",
                name: "Hybrid App Starter",
                features: ["Hybrid App Starter"],
                price: 15000,
                description: "Very basic hybrid app (one platform), 3-5 screens, simple navigation.",
            },
            {
                id: "app-hibrida-basica",
                name: "Basic Hybrid App",
                features: ["Basic Hybrid App"],
                price: 18000,
                description: "6-8 screens, contact form, simple menu.",
            },
            {
                id: "app-hibrida-multi",
                name: "Cross-Platform Hybrid App",
                features: ["Cross-Platform Hybrid App"],
                price: 20000,
                description: "Hybrid version for both platforms (iOS + Android).",
            },
            {
                id: "app-ui-personalizado",
                name: "Custom UI App",
                features: ["Custom UI App"],
                price: 22000,
                description: "App with custom UI design, 6-8 screens.",
            },
            {
                id: "app-completa",
                name: "Full App",
                features: ["Full App"],
                price: 25000,
                description: "Hybrid with complete features: login, synchronization.",
            },
            {
                id: "app-completa-soporte",
                name: "Full App + Support",
                features: ["Full App + Support"],
                price: 28000,
                description: "Small hybrid app with custom UI, admin dashboard.",
            },
        ],
    },
    {
        id: "opt-actualizacion",
        name: "App Optimization and Updates",
        plans: [
            {
                id: "opt-ajuste-rapido",
                name: "Quick Adjustment",
                features: ["Quick Adjustment"],
                price: 1000,
                description: "Optimization of one screen's loading, fix minor bugs.",
            },
            {
                id: "opt-mejoras-uiux",
                name: "UI/UX Improvements",
                features: ["UI/UX Improvements"],
                price: 3000,
                description: "Redesign of one or two flows, minor update.",
            },
            {
                id: "opt-actualizaciones-multi",
                name: "Multiple Updates",
                features: ["Multiple Updates"],
                price: 5000,
                description: "Version updates, compatibility with new systems.",
            },
            {
                id: "opt-integral",
                name: "Comprehensive Optimization",
                features: ["Comprehensive Optimization"],
                price: 8000,
                description: "Complete performance review and optimization.",
            },
        ],
    },
    {
        id: "integraciones-conectividad",
        name: "Integrations and Connectivity",
        plans: [
            {
                id: "int-pago-simple",
                name: "Simple Payment",
                features: ["Simple Payment"],
                price: 100,
                description: "Integrate a simple payment button or configure the SDK.",
            },
            {
                id: "int-flujo-pago",
                name: "Payment Flow",
                features: ["Payment Flow"],
                price: 500,
                description: "Complete payment gateway integration.",
            },
            {
                id: "int-crm-externo",
                name: "External CRM",
                features: ["External CRM"],
                price: 1000,
                description: "Connection with external CRM or management system.",
            },
            {
                id: "int-completa",
                name: "Full Integration",
                features: ["Full Integration"],
                price: 2000,
                description: "Full integration with multiple systems.",
            },
        ],
    },
];

export const pricingCategoriesEnglish: Product[] = [
    {
        id: "juegos-moviles",
        name: "2D and 3D Mobile Games",
        plans: [
            {
                id: "movil-2d-sencillo",
                name: "Simple 2D",
                features: ["Simple 2D"],
                price: 200,
                description: "Basic game with simple mechanics.",
            },
            {
                id: "movil-2d-intermedio",
                name: "Intermediate 2D",
                features: ["Intermediate 2D"],
                price: 3100,
                description: "Including additional levels, basic animations, and sound effects.",
            },
            {
                id: "movil-3d-basico",
                name: "Basic 3D",
                features: ["Basic 3D"],
                price: 5000,
                description: "Suitable for prototypes or games with simple graphics.",
            },
            {
                id: "movil-3d-avanzado",
                name: "Advanced 3D",
                features: ["Advanced 3D"],
                price: 10000,
                description: "Game with detailed graphics, multiple levels, and complex mechanics.",
            },
        ],
    },
    {
        id: "gamificacion-empresas",
        name: "Gamification for Businesses",
        plans: [
            {
                id: "gam-interactivo-basico",
                name: "Basic Interactive Game for Businesses",
                features: ["Basic Interactive Game"],
                price: 500,
                description: "Ideal for training or interactive presentations.",
            },
            {
                id: "gam-experiencia-personalizada",
                name: "Custom Gamified Experience",
                features: ["Custom Gamified Experience"],
                price: 4500,
                description: "Tailored to the company's specific needs.",
            },
            {
                id: "gam-plataforma-completa",
                name: "Gamification Platform",
                features: ["Gamification Platform"],
                price: 6100,
                description: "To implement points, rewards, and tracking systems.",
            },
        ],
    },
    {
        id: "diseno-mecanicas",
        name: "Game Mechanics Design",
        plans: [
            {
                id: "mecanica-balanceo",
                name: "Level Balancing",
                features: ["Level Balancing"],
                price: 700,
                description: "Adjusting game difficulty and progression.",
            },
            {
                id: "mecanica-monetizacion",
                name: "Monetization System",
                features: ["Monetization System"],
                price: 3800,
                description: "Implementing ads, in-app purchases.",
            },
            {
                id: "mecanica-multijugador",
                name: "Multiplayer Experience",
                features: ["Multiplayer Experience"],
                price: 7400,
                description: "To add online or local multiplayer modes.",
            },
        ],
    },
    {
        id: "arte-diseno",
        name: "Art and Design for Video Games",
        plans: [
            {
                id: "arte-ilustraciones-2d",
                name: "2D Illustrations",
                features: ["2D Illustrations"],
                price: 200,
                description: "Basic illustration.",
            },
            {
                id: "arte-sprites-2d",
                name: "2D Sprites and Animations",
                features: ["2D Sprites and Animations"],
                price: 2800,
                description: "Depending on complexity.",
            },
            {
                id: "arte-modelado-3d",
                name: "3D Modeling and Animation",
                features: ["3D Modeling and Animation"],
                price: 2600,
                description: "For basic characters and scenarios.",
            },
            {
                id: "arte-ui-ux",
                name: "Interface Design (UI/UX)",
                features: ["Interface Design (UI/UX)"],
                price: 3500,
                description: "Adapted to the game's aesthetics.",
            },
        ],
    },
];