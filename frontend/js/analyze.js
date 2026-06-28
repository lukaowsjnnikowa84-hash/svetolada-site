function analyzeUser(data, options = {}) {
  const parsed = prepareBaseData(data);
  const calc = calculateAll(parsed);

  const result = {
    osnovnye_vibracii: generateBlockOsnovnyeVibracii(parsed, calc),
    karma_i_put_dushi: generateBlockKarmaIPutDushi(parsed, calc),
    psihologia_i_vnutrenniy_mir: generateBlockPsihologia(parsed, calc),
    telo_energia_zdorovie: generateBlockTeloEnergiaZdorovie(parsed, calc),
    realizacia_v_mire: generateBlockRealizaciaVMire(parsed, calc),
    otnoshenia_i_semya: generateBlockOtnosheniaISemya(parsed, calc),
    vremya_i_vyvod: generateBlockVremyaIVyvod(parsed, calc),
  };

  return filterResultByOptions(result, options);
}

function prepareBaseData(data) {
  const [year, month, day] = data.birthdate.split("-");
  const birthDateObj = new Date(+year, +month - 1, +day);

  let birthTimeObj = null;

  if (data.birthtime_exact) {
    const [h, m] = data.birthtime_exact.split(":");
    birthTimeObj = { hours: +h, minutes: +m };
  } else if (data.birthtime_period) {
    birthTimeObj = getMiddleOfInterval(data.birthtime_period);
  }

  return {
    name: data.name,
    birthDateObj,
    birthTimeObj,
    birthPlace: data.birthplace,
    partnerBirthDate: data.partner_birthdate || null,
  };
}

function getMiddleOfInterval(interval) {
  switch (interval) {
    case "morning":
      return { hours: 9, minutes: 0 };
    case "day":
      return { hours: 14, minutes: 0 };
    case "evening":
      return { hours: 19, minutes: 0 };
    case "night":
      return { hours: 1, minutes: 0 };
    default:
      return null;
  }
}
