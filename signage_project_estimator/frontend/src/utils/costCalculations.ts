import type { SignComponentData } from "../types/signComponent";

const SQ_INCHES_PER_SQ_FT = 144;

export interface MaterialCost {
    name: string;
    unitCost: number; // cost per sq ft
}

/** Calculate the area in square feet for a sign component */
export function getAreaSqFt(component: SignComponentData): number {
    switch (component.type) {
        case "Base":
        case "Vinyl Plot":
        case "Large-Format Decal": {
            // width and height are in inches
            const sqInches = component.width * component.height;
            return sqInches / SQ_INCHES_PER_SQ_FT;
        }
        case "Dimensional Letters": {
            // Estimate area: count of characters × average height per letter (inches)
            // Assume average letter width ≈ height (square-ish letters)
            const charCount = component.sentence.replace(/\s/g, "").length;
            const sqInches = charCount * component.avgHeightPerLetter * component.avgHeightPerLetter;
            return sqInches / SQ_INCHES_PER_SQ_FT;
        }
    }
}

/** Find the matching material cost by name */
export function findMaterialCost(materials: MaterialCost[], materialName: string): number {
    const found = materials.find((m) => m.name === materialName);
    return found?.unitCost ?? 0;
}

/** Calculate the total cost for a single sign component (including quantity) */
export function calculateComponentCost(
    component: SignComponentData,
    materials: MaterialCost[]
): number {
    const areaSqFt = getAreaSqFt(component);
    const unitCost = findMaterialCost(materials, component.material);
    return areaSqFt * unitCost * (component.quantity ?? 1);
}

/** Calculate costs for all sign components, returning an array of { name, cost } */
export function calculateAllCosts(
    components: SignComponentData[],
    materials: MaterialCost[]
): { name: string; cost: number }[] {
    return components.map((comp, i) => ({
        name: `Component #${i + 1}: ${comp.type}`,
        cost: calculateComponentCost(comp, materials),
    }));
}
