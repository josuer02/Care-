interface FeatureFlags {
    [key: string]: boolean;
    enableConsultas: boolean;
    enableFacturacion: boolean;
    enableVentas: boolean;
    enableReportes: boolean;
    enableManuales: boolean;
  }

export const featureFlags = {
    enableConsultas: true,
    enableFacturacion: true,
    enableVentas: true,
    enableReportes: true,
    enableManuales: true
};