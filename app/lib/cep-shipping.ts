export type CepShippingOption = {
  carrier: string;
  service: string;
  price: number;
  days: string;
  logo: string | null;
};

export type CepShippingResult =
  | { ok: true; city: string; state: string; options: CepShippingOption[] }
  | { ok: false; error: string };
