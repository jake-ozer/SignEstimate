export type SignComponentType =
    | "Base"
    | "Dimensional Letters"
    | "Vinyl Plot"
    | "Large-Format Decal";

export interface BaseSignData {
    type: "Base";
    width: number;
    height: number;
    material: string;
    quantity: number;
}

export interface DimensionalLettersData {
    type: "Dimensional Letters";
    sentence: string;
    avgHeightPerLetter: number;
    material: string;
    quantity: number;
}

export interface VinylPlotData {
    type: "Vinyl Plot";
    width: number;
    height: number;
    material: string;
    quantity: number;
}

export interface LargeFormatDecalData {
    type: "Large-Format Decal";
    width: number;
    height: number;
    material: string;
    quantity: number;
}

export type SignComponentData =
    | BaseSignData
    | DimensionalLettersData
    | VinylPlotData
    | LargeFormatDecalData;
