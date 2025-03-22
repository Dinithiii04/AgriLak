export interface GwetTopResponse {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    };
    properties: {
      parameter: {
        GWETTOP: Record<string, number>;
      };
    };
  }
  
  export interface MonthlySoilMoisture {
    month: string;
    moisture: number;
  }