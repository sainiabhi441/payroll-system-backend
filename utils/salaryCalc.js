// utils/salaryCalc.js

function calcGross(basicInput, designation) {
  const basic = Number(basicInput) || 0;

  const rules = {
    je:  { hra: 0.20, da: 0.10, pf: 0.12 },
    se:  { hra: 0.22, da: 0.12, pf: 0.12 },
    asm: { hra: 0.18, da: 0.09, pf: 0.11 },
    me:  { hra: 0.20, da: 0.10, pf: 0.11 },
    cs:  { hra: 0.16, da: 0.08, pf: 0.10 },
    ca:  { hra: 0.18, da: 0.09, pf: 0.10 },
  };

  const r = rules[designation.toLowerCase()] || rules.je;

  const hra = Math.round(basic * r.hra);
  const da = Math.round(basic * r.da);
  const pf = Math.round(basic * r.pf);

  const gross = basic + hra + da - pf;

  return { basic, hra, da, pf, gross };
}

module.exports = { calcGross };
