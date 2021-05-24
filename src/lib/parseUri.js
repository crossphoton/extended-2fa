function parseURI(uri) {
  // Quick sanity check
  if (typeof uri !== "string" || uri.length < 7) return null;

  // I would like to just use new URL(), but the behavior is different between node and browsers, so
  // we have to do some of the work manually with regex.
  const parts = /otpauth:\/\/([A-Za-z]+)\/([^?]+)\??(.*)?/i.exec(uri);

  if (!parts || parts.length < 3) {
    return null;
  }

  // eslint-disable-next-line no-unused-vars
  const [fullUri, type, fullLabel] = parts;

  // Sanity check type and label
  if (!type || !fullLabel) {
    return null;
  }

  // Parse the label
  const decodedLabel = decodeURIComponent(fullLabel);

  const labelParts = decodedLabel.split(/: ?/);

  const label =
    labelParts && labelParts.length === 2
      ? { issuer: labelParts[0], account: labelParts[1] }
      : { issuer: "", account: decodedLabel };

  // Parse query string
  const qs = parts[3] ? new URLSearchParams(parts[3]) : [];

  const query = [...qs].reduce((acc, [key, value]) => {
    acc[key] = value;

    return acc;
  }, {});

  // Returned the parsed parts of the URI
  return { type: type.toLowerCase(), label, query };
}

export default function verifyCredentials(url) {
  var valid = true;
  var result = {};
  const parsed = parseURI(url);
  result.secret = parsed.query.secret;
  result.issuer = parsed.query.issuer || parsed.label.issuer || "N/A";
  result.algorithm = parsed.query.algorithm || "sha1";
  result.digits = Number(parsed.query.digits) || 6;
  result.step = Number(parsed.query.period) || 30;
  result.label = parsed.label.account;
  result.algorithm = String(result.algorithm).toLowerCase();
  if (result.secret == null) valid = false;
  if (result.label == null) valid = false;
  if (!valid) return null;
  return result;
}
