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

export interface T2MResponse {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    parameter: {
      T2M: Record<string, number>;
    };
  };
}

export interface MonthlyTemperature {
  month: string;
  temp: number;
}