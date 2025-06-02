import ReactCountryFlag from "react-country-flag";

const countryNames: Record<string, string> = {
  AF: "Afganistán",
  DE: "Alemania",
  AR: "Argentina",
  AU: "Australia",
  BR: "Brasil",
  CA: "Canadá",
  CL: "Chile",
  CN: "China",
  CO: "Colombia",
  KR: "Corea del Sur",
  CU: "Cuba",
  DK: "Dinamarca",
  EC: "Ecuador",
  EG: "Egipto",
  SV: "El Salvador",
  ES: "España",
  US: "Estados Unidos",
  FR: "Francia",
  GR: "Grecia",
  GT: "Guatemala",
  HN: "Honduras",
  IN: "India",
  ID: "Indonesia",
  IE: "Irlanda",
  IT: "Italia",
  JP: "Japón",
  MX: "México",
  NI: "Nicaragua",
  NO: "Noruega",
  PA: "Panamá",
  PY: "Paraguay",
  PE: "Perú",
  PL: "Polonia",
  PT: "Portugal",
  GB: "Reino Unido",
  DO: "República Dominicana",
  RU: "Rusia",
  SE: "Suecia",
  CH: "Suiza",
  TH: "Tailandia",
  TR: "Turquía",
  UY: "Uruguay",
  VE: "Venezuela",
  VN: "Vietnam"
};

function getCountryName(code: string): string {
  return countryNames[code] || code;
}

export default function CountryName({ code }: { code: string }) {
  return (
    <div className="flex items-center space-x-2">
      <ReactCountryFlag
        countryCode={code}
        svg
        style={{ width: "1.5em", height: "1.5em" }}
        title={code}
      />
      <span>{getCountryName(code)}</span>
    </div>
  );
}
