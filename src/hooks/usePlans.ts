"use client";

import { useMemo } from "react";
import { servicesSpanish, pricingCategoriesSpanish, pricingCategoriesEnglish, servicesEnglish } from "@/data/plans";
import { useLocale } from "next-intl";


export function usePlan(planId: string) {
    const locale = useLocale()
    const services = locale == "es" ? servicesSpanish: servicesEnglish;
    const pricingCategories = locale == "es"? pricingCategoriesSpanish: pricingCategoriesEnglish;
    
    // Unificamos el catálogo completo de productos
    const allProducts = useMemo(() => {
        return [...services, ...pricingCategories];
    }, []);

    // Buscamos el plan específico y su producto contenedor de forma simultánea
    const result = useMemo(() => {
        if (!planId) return { plan: null, product: null, relatedPlans: [] };

        for (const product of allProducts) {
            const foundPlan = product.plans.find((p) => p.id === planId);

            if (foundPlan) {
                // Los planes relacionados son todos los del mismo producto MENOS el plan actual
                const relatedPlans = product.plans.filter((p) => p.id !== planId);

                return {
                    plan: foundPlan,
                    product: product,
                    relatedPlans: relatedPlans,
                };
            }
        }

        // Retorno por defecto si no se encuentra el ID
        return { plan: null, product: null, relatedPlans: [] };
    }, [allProducts, planId]);

    return result;
}