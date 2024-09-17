interface FeatureFlags {
    [key: string]: boolean;
    enablePacientes: boolean;
    enableCitas: boolean;
    enableReportes: boolean;
    enableManuales: boolean;
  }

export const featureFlags = {
    enablePacientes: false,
    enableCitas: true,
    enableReportes: false,
    enableManuales: false
};