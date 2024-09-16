interface FeatureFlags {
    [key: string]: boolean;
    enablePacientes: boolean;
    enableCitas: boolean;
    enableReportes: boolean;
    enableManuales: boolean;
  }

export const featureFlags = {
    enablePacientes: true,
    enableCitas: true,
    enableReportes: true,
    enableManuales: true
};