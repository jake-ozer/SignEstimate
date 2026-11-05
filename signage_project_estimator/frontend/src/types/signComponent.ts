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
}

export interface DimensionalLettersData {
    type: "Dimensional Letters";
    sentence: string;
    avgHeightPerLetter: number;
    material: string;
}

export interface VinylPlotData {
    type: "Vinyl Plot";
    width: number;
    height: number;
    material: string;
}

export interface LargeFormatDecalData {
    type: "Large-Format Decal";
    width: number;
    height: number;
    material: string;
}

export type SignComponentData =
    | BaseSignData
    | DimensionalLettersData
    | VinylPlotData
    | LargeFormatDecalData;
