const METRIC_FIELDS = [
  'NewConfirmed',
  'TotalConfirmed',
  'NewDeaths',
  'TotalDeaths',
  'NewRecovered',
  'TotalRecovered',
];

function hasMetrics(value) {
  return value !== null
    && typeof value === 'object'
    && METRIC_FIELDS.every(field => Number.isFinite(value[field]));
}

export function isValidSummary(summary) {
  return summary !== null
    && typeof summary === 'object'
    && hasMetrics(summary.Global)
    && Array.isArray(summary.Countries)
    && summary.Countries.every(country => (
      country !== null
      && typeof country === 'object'
      && typeof country.Country === 'string'
      && hasMetrics(country)
    ))
    && typeof summary.Date === 'string';
}
