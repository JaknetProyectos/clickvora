"use client";

import { useMemo } from "react";
import { servicesSpanish, pricingCategoriesSpanish, pricingCategoriesEnglish, servicesEnglish } from "@/data/plans";
import { useLocale } from "next-intl";

interface UsePlansFilters {
    productId?: string;
    category?: string;
}

export function usePlans(filters?: UsePlansFilters) {
    const locale = useLocale()
    const services = locale == "es" ? servicesSpanish : servicesEnglish;
    const pricingCategories = locale == "es" ? pricingCategoriesSpanish : pricingCategoriesEnglish;

    // 1. Unificamos todas las colecciones de productos en un solo catálogo
    const allProducts = useMemo(() => {
        return [...services, ...pricingCategories];
    }, []);

    // 2. Extraemos y filtramos los planes según las necesidades
    const plans = useMemo(() => {
        if (filters?.productId) {
            // Si hay un filtro de producto específico, solo extraemos sus planes
            const targetProduct = allProducts.find((p) => p.id === filters.productId);
            return targetProduct ? targetProduct.plans : [];
        }

        // Si no hay filtro, aplanamos todos los planes de todos los productos
        return allProducts.flatMap((product) => product.plans);
    }, [allProducts, filters?.productId]);

    if (filters?.category == "plans") {
        return {
            plans: plans,
            productsList: pricingCategories
        }
    } else if (filters?.category == "services") {
        return {
            plans: plans,
            productsList: services
        }
    }

    return {
        plans,
        productsList: allProducts,
    };
}