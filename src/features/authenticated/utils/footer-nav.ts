export type VisiMisi = "PRESIDENT" | "DPM" | "FACULTY_GOVERNOR";

export type NavTarget =
  | {
      to: "/";
      search: { steps: number; visiMisi: VisiMisi };
      label: string;
    }
  | { to: "/selesai"; label: string };

const VISI_MISI_ORDER: VisiMisi[] = ["DPM", "PRESIDENT", "FACULTY_GOVERNOR"];

const VISI_MISI_LABEL: Record<VisiMisi, string> = {
  DPM: "DPM KM",
  PRESIDENT: "Presiden BEM KM",
  FACULTY_GOVERNOR: "Gubernur BEM Fakultas",
};

const STEP_LABEL: Record<number, string> = {
  2: "Dashboard",
  3: "Visi & Misi",
  4: "Pemilihan Universitas",
  5: "Pemilihan Fakultas",
};

export function getNext(steps: number, visiMisi: VisiMisi): NavTarget {
  if (steps === 3) {
    const idx = VISI_MISI_ORDER.indexOf(visiMisi);
    const next = VISI_MISI_ORDER[idx + 1];
    if (next) {
      return {
        to: "/",
        search: { steps: 3, visiMisi: next },
        label: VISI_MISI_LABEL[next],
      };
    }
    return {
      to: "/",
      search: { steps: 4, visiMisi },
      label: STEP_LABEL[4],
    };
  }

  if (steps === 5) {
    return { to: "/selesai", label: "Selesai" };
  }

  return {
    to: "/",
    search: { steps: steps + 1, visiMisi },
    label: STEP_LABEL[steps + 1] ?? "Lanjut",
  };
}

export function getPrev(steps: number, visiMisi: VisiMisi): NavTarget | null {
  if (steps <= 2) return null;

  if (steps === 3) {
    const idx = VISI_MISI_ORDER.indexOf(visiMisi);
    const prev = VISI_MISI_ORDER[idx - 1];
    if (prev) {
      return {
        to: "/",
        search: { steps: 3, visiMisi: prev },
        label: VISI_MISI_LABEL[prev],
      };
    }
    return {
      to: "/",
      search: { steps: 2, visiMisi },
      label: STEP_LABEL[2],
    };
  }

  if (steps === 4) {
    return {
      to: "/",
      search: { steps: 3, visiMisi: "FACULTY_GOVERNOR" },
      label: VISI_MISI_LABEL.FACULTY_GOVERNOR,
    };
  }

  return {
    to: "/",
    search: { steps: steps - 1, visiMisi },
    label: STEP_LABEL[steps - 1] ?? "Kembali",
  };
}
