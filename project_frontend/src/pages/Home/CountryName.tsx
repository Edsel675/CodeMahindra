import ReactCountryFlag from "react-country-flag";

const countryNames: Record<string, string> = {
  AR: "Argentina",
  BR: "Brasil",
  CL: "Chile",
  CO: "Colombia",
  ES: "España",
  US: "Estados Unidos",
  MX: "México",
  PE: "Perú",
  VE: "Venezuela",
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
